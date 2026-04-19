import { useCallback, useEffect, useRef, useState } from "react";
import * as Speech from "expo-speech";
import { Audio } from "expo-av";

import { hasOpenAiKey, synthesizeLine, OPENAI_VOICES, type OpenAiVoice } from "@/lib/openaiTts";

export type PlayerStatus = "idle" | "playing" | "paused" | "done";

type VoiceOption = {
  identifier: string;
  name: string;
  language: string;
  quality?: string;
};

function splitIntoLines(script: string): string[] {
  return script
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+(?=[A-Z])/g)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

const OPENAI_VOICE_OPTIONS: VoiceOption[] = OPENAI_VOICES.map((v) => ({
  identifier: `openai:${v}`,
  name: `OpenAI · ${v[0]!.toUpperCase() + v.slice(1)}`,
  language: "en-US",
  quality: "Neural"
}));

export function usePlayer() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [status, setStatus] = useState<PlayerStatus>("idle");
  const [rate, setRate] = useState(1.0);
  const [voices, setVoices] = useState<VoiceOption[]>([]);
  const [voiceId, setVoiceId] = useState<string | undefined>(
    hasOpenAiKey() ? "openai:nova" : undefined
  );

  const shouldAdvanceRef = useRef(true);
  const sessionRef = useRef(0);
  const currentLineRef = useRef(0);
  const linesRef = useRef<string[]>([]);
  const rateRef = useRef(rate);
  const voiceIdRef = useRef(voiceId);
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    currentLineRef.current = currentLine;
  }, [currentLine]);
  useEffect(() => {
    linesRef.current = lines;
  }, [lines]);
  useEffect(() => {
    rateRef.current = rate;
  }, [rate]);
  useEffect(() => {
    voiceIdRef.current = voiceId;
  }, [voiceId]);

  useEffect(() => {
    let active = true;
    Speech.getAvailableVoicesAsync()
      .then((list) => {
        if (!active) return;
        const systemMapped: VoiceOption[] = list.map((v) => ({
          identifier: v.identifier,
          name: v.name,
          language: v.language,
          quality: (v as { quality?: string }).quality
        }));
        setVoices(hasOpenAiKey() ? [...OPENAI_VOICE_OPTIONS, ...systemMapped] : systemMapped);
      })
      .catch(() => {
        if (active && hasOpenAiKey()) setVoices(OPENAI_VOICE_OPTIONS);
      });
    return () => {
      active = false;
      Speech.stop();
      soundRef.current?.unloadAsync().catch(() => {});
    };
  }, []);

  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true
    }).catch(() => {});
  }, []);

  const unloadSound = useCallback(async () => {
    const s = soundRef.current;
    soundRef.current = null;
    if (s) {
      try {
        await s.stopAsync();
      } catch {}
      try {
        await s.unloadAsync();
      } catch {}
    }
  }, []);

  const prefetchAhead = useCallback((fromIndex: number, voice: OpenAiVoice) => {
    const ls = linesRef.current;
    const t = ls[fromIndex];
    if (t) synthesizeLine(t, voice).catch(() => {});
  }, []);

  const speakOpenAi = useCallback(
    async (index: number, voiceKey: string, mySession: number) => {
      const ls = linesRef.current;
      const text = ls[index];
      if (!text) {
        setStatus("done");
        return;
      }
      const voice = voiceKey.replace(/^openai:/, "") as OpenAiVoice;
      prefetchAhead(index + 1, voice);
      let fileUri: string;
      try {
        fileUri = await synthesizeLine(text, voice);
      } catch (err) {
        console.error("[Player] OpenAI TTS failed, falling back to system voice:", err);
        if (mySession !== sessionRef.current) return;
        speakSystem(index, true, mySession);
        return;
      }
      if (mySession !== sessionRef.current) return;

      await unloadSound();
      if (mySession !== sessionRef.current) return;

      const { sound } = await Audio.Sound.createAsync(
        { uri: fileUri },
        { shouldPlay: true, rate: rateRef.current, shouldCorrectPitch: true }
      );
      if (mySession !== sessionRef.current) {
        sound.unloadAsync().catch(() => {});
        return;
      }
      soundRef.current = sound;
      sound.setOnPlaybackStatusUpdate((st) => {
        if (mySession !== sessionRef.current) return;
        if (!st.isLoaded) return;
        if (st.didJustFinish) {
          if (!shouldAdvanceRef.current) return;
          const next = index + 1;
          setCurrentLine(next);
          if (next >= linesRef.current.length) {
            setStatus("done");
            unloadSound();
            return;
          }
          const cur = voiceIdRef.current;
          if (cur && cur.startsWith("openai:")) {
            speakOpenAi(next, cur, mySession);
          } else {
            speakSystem(next, false, mySession);
          }
        }
      });
    },
    [unloadSound]
  );

  const speakSystem = useCallback(
    (index: number, forceDefaultVoice: boolean, mySession: number) => {
      const ls = linesRef.current;
      const text = ls[index];
      if (!text) {
        setStatus("done");
        return;
      }
      const sysVoice =
        !forceDefaultVoice && voiceIdRef.current && !voiceIdRef.current.startsWith("openai:")
          ? voiceIdRef.current
          : undefined;
      Speech.speak(text, {
        rate: rateRef.current,
        pitch: 1.0,
        voice: sysVoice,
        onDone: () => {
          if (mySession !== sessionRef.current) return;
          if (!shouldAdvanceRef.current) return;
          const next = index + 1;
          setCurrentLine(next);
          if (next >= linesRef.current.length) {
            setStatus("done");
            return;
          }
          const cur = voiceIdRef.current;
          if (cur && cur.startsWith("openai:")) {
            speakOpenAi(next, cur, mySession);
          } else {
            speakSystem(next, false, mySession);
          }
        },
        onError: () => {
          if (mySession !== sessionRef.current) return;
          setStatus("idle");
        }
      });
    },
    [speakOpenAi]
  );

  const startSpeaking = useCallback(
    (index: number) => {
      const mySession = ++sessionRef.current;
      const cur = voiceIdRef.current;
      if (cur && cur.startsWith("openai:")) {
        speakOpenAi(index, cur, mySession);
      } else {
        speakSystem(index, false, mySession);
      }
    },
    [speakOpenAi, speakSystem]
  );

  const stopAll = useCallback(() => {
    sessionRef.current++;
    Speech.stop();
    unloadSound();
  }, [unloadSound]);

  const load = useCallback(
    (script: string) => {
      stopAll();
      shouldAdvanceRef.current = false;
      const parsed = splitIntoLines(script);
      setLines(parsed);
      linesRef.current = parsed;
      setCurrentLine(0);
      currentLineRef.current = 0;
      setStatus("idle");
    },
    [stopAll]
  );

  const loadChunks = useCallback(
    (chunks: string[]) => {
      stopAll();
      shouldAdvanceRef.current = false;
      const cleaned = chunks.map((c) => c.replace(/\s+/g, " ").trim()).filter((c) => c.length > 0);
      setLines(cleaned);
      linesRef.current = cleaned;
      setCurrentLine(0);
      currentLineRef.current = 0;
      setStatus("idle");
    },
    [stopAll]
  );

  const play = useCallback(() => {
    if (linesRef.current.length === 0) return;
    shouldAdvanceRef.current = true;
    setStatus("playing");
    stopAll();
    startSpeaking(currentLineRef.current);
  }, [startSpeaking, stopAll]);

  const pause = useCallback(() => {
    shouldAdvanceRef.current = false;
    stopAll();
    setStatus("paused");
  }, [stopAll]);

  const resume = useCallback(() => {
    if (status === "done") {
      setCurrentLine(0);
      currentLineRef.current = 0;
    }
    shouldAdvanceRef.current = true;
    setStatus("playing");
    startSpeaking(status === "done" ? 0 : currentLineRef.current);
  }, [startSpeaking, status]);

  const toggle = useCallback(() => {
    if (status === "playing") pause();
    else if (status === "paused") resume();
    else play();
  }, [status, play, pause, resume]);

  const goToLine = useCallback(
    (target: number, autoplay: boolean) => {
      const clamped = Math.max(0, Math.min(target, linesRef.current.length - 1));
      shouldAdvanceRef.current = false;
      stopAll();
      currentLineRef.current = clamped;
      setCurrentLine(clamped);
      if (autoplay && linesRef.current.length > 0) {
        shouldAdvanceRef.current = true;
        setStatus("playing");
        startSpeaking(clamped);
      }
    },
    [startSpeaking, stopAll]
  );

  const skipForward = useCallback(() => {
    goToLine(currentLineRef.current + 1, status === "playing");
  }, [goToLine, status]);

  const skipBack = useCallback(() => {
    goToLine(currentLineRef.current - 1, status === "playing");
  }, [goToLine, status]);

  const jumpTo = useCallback(
    (index: number) => {
      goToLine(index, true);
    },
    [goToLine]
  );

  const stop = useCallback(() => {
    shouldAdvanceRef.current = false;
    stopAll();
    setStatus("idle");
    setCurrentLine(0);
    currentLineRef.current = 0;
  }, [stopAll]);

  return {
    lines,
    currentLine,
    status,
    rate,
    setRate,
    voices,
    voiceId,
    setVoiceId,
    load,
    loadChunks,
    play,
    pause,
    resume,
    toggle,
    skipForward,
    skipBack,
    jumpTo,
    stop
  };
}
