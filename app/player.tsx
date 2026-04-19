import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { Body, Eyebrow, Heading, Label } from "@/components/Type";
import { PillButton } from "@/components/PillButton";
import { usePlayer } from "@/hooks/usePlayer";
import { useAppContext } from "@/store/AppContext";
import { palette } from "@/theme/palette";
import { spacing } from "@/theme/spacing";

const RATES = [0.85, 0.95, 1.0, 1.1, 1.25];

export default function PlayerScreen() {
  const { selectedDailyLesson, getLessonVariantId } = useAppContext();
  const player = usePlayer();
  const [voicePickerOpen, setVoicePickerOpen] = useState(false);
  const [speedOpen, setSpeedOpen] = useState(false);
  const pulse = useRef(new Animated.Value(0)).current;
  const lineRefs = useRef<Record<number, View | null>>({});
  const scrollRef = useRef<ScrollView | null>(null);

  const variantId = getLessonVariantId(selectedDailyLesson);
  const variant = useMemo(() => {
    return selectedDailyLesson.variants?.find((v) => v.id === variantId);
  }, [selectedDailyLesson, variantId]);

  const lessonChunks = useMemo(() => {
    if (variant) {
      return [variant.spokenIntro, variant.spokenBody, variant.spokenWrap];
    }
    return [
      selectedDailyLesson.spokenIntro,
      `Key point: ${selectedDailyLesson.keyPoints.join(". Key point: ")}.`,
      `Diagram cue: ${selectedDailyLesson.diagramCue}`,
      `Walk practice: ${selectedDailyLesson.walkPractice}`,
      selectedDailyLesson.spokenWrap
    ];
  }, [selectedDailyLesson, variant]);

  useEffect(() => {
    player.loadChunks(lessonChunks);
  }, [lessonChunks]);

  useEffect(() => {
    if (player.status === "playing") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1,
            duration: 1400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
          }),
          Animated.timing(pulse, {
            toValue: 0,
            duration: 1400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true
          })
        ])
      ).start();
    } else {
      pulse.stopAnimation();
      pulse.setValue(0);
    }
  }, [player.status]);

  useEffect(() => {
    const node = lineRefs.current[player.currentLine];
    if (node && scrollRef.current) {
      node.measureLayout(
        scrollRef.current as unknown as number,
        (_x, y) => {
          scrollRef.current?.scrollTo({ y: Math.max(0, y - 120), animated: true });
        },
        () => {}
      );
    }
  }, [player.currentLine]);

  const pulseScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.12] });
  const pulseOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.7] });

  const progress = player.lines.length === 0 ? 0 : ((player.currentLine + 1) / player.lines.length) * 100;

  const availableEnglish = useMemo(
    () => player.voices.filter((v) => v.language?.startsWith("en")),
    [player.voices]
  );

  const currentVoiceLabel = useMemo(() => {
    const v = player.voices.find((voice) => voice.identifier === player.voiceId);
    if (!v) return "Default";
    const q = (v.quality ?? "").toLowerCase();
    const tag = q.includes("premium") ? "Premium" : q.includes("enhanced") ? "Enhanced" : "";
    return tag ? `${v.name} · ${tag}` : v.name;
  }, [player.voices, player.voiceId]);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <LinearGradient
        colors={["#0b5d66", "#07343c"]}
        end={{ x: 1, y: 1 }}
        style={styles.topGradient}
      >
        <View style={styles.topBar}>
          <Pressable onPress={() => router.back()} style={styles.iconBtn} hitSlop={12}>
            <Ionicons name="chevron-down" size={22} color={palette.surfaceRaised} />
          </Pressable>
          <View style={styles.topBarCenter}>
            <Eyebrow style={styles.topBarEyebrow}>
              {variant ? `${variant.label} path` : selectedDailyLesson.level}
            </Eyebrow>
            <Label style={styles.topBarTitle} numberOfLines={1}>
              {selectedDailyLesson.title}
            </Label>
          </View>
          <Pressable onPress={() => setVoicePickerOpen((v) => !v)} style={styles.iconBtn} hitSlop={12}>
            <Ionicons name="mic-outline" size={20} color={palette.surfaceRaised} />
          </Pressable>
        </View>

        <View style={styles.miniHero}>
          <View style={styles.pulseWrap}>
            <Animated.View
              style={[
                styles.pulseRing,
                { transform: [{ scale: pulseScale }], opacity: pulseOpacity }
              ]}
            />
            <View style={styles.pulseCore}>
              <Ionicons name="walk" size={22} color={palette.surfaceRaised} />
            </View>
          </View>
          <Body style={styles.miniHeroBody} numberOfLines={2}>
            {variant ? variant.description : selectedDailyLesson.objective}
          </Body>
        </View>

        <View style={styles.progressWrap}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </LinearGradient>

      {voicePickerOpen ? (
        <View style={styles.voicePanel}>
          <Label style={styles.voicePanelTitle}>Voice</Label>
          <Body style={styles.voicePanelHint}>
            iOS Premium and Enhanced voices sound best. Download more in Settings → Accessibility → Spoken Content → Voices.
          </Body>
          <ScrollView style={styles.voiceList} contentContainerStyle={styles.voiceListContent}>
            {availableEnglish.map((v) => {
              const q = (v.quality ?? "").toLowerCase();
              const tag = q.includes("premium") ? "Premium" : q.includes("enhanced") ? "Enhanced" : "";
              const selected = v.identifier === player.voiceId;
              return (
                <Pressable
                  key={v.identifier}
                  onPress={() => {
                    player.setVoiceId(v.identifier);
                    setVoicePickerOpen(false);
                    if (player.status === "playing") player.play();
                  }}
                  style={[styles.voiceRow, selected && styles.voiceRowSelected]}
                >
                  <View style={{ flex: 1 }}>
                    <Label>{v.name}</Label>
                    <Body style={styles.voiceRowMeta}>{v.language}{tag ? ` · ${tag}` : ""}</Body>
                  </View>
                  {selected ? <Ionicons name="checkmark" size={18} color={palette.accentDeep} /> : null}
                </Pressable>
              );
            })}
          </ScrollView>
          <PillButton
            title="Close"
            variant="secondary"
            onPress={() => setVoicePickerOpen(false)}
          />
        </View>
      ) : (
        <ScrollView
          ref={scrollRef}
          style={styles.transcript}
          contentContainerStyle={styles.transcriptContent}
        >
          {player.lines.map((line, idx) => (
            <Pressable
              key={`${idx}-${line.slice(0, 16)}`}
              onPress={() => player.jumpTo(idx)}
              ref={(node) => {
                lineRefs.current[idx] = node as unknown as View | null;
              }}
              style={[
                styles.transcriptLine,
                idx === player.currentLine && styles.transcriptLineActive
              ]}
            >
              <Body
                style={[
                  styles.transcriptText,
                  idx === player.currentLine && styles.transcriptTextActive,
                  idx < player.currentLine && styles.transcriptTextRead
                ]}
              >
                {line}
              </Body>
            </Pressable>
          ))}
          <View style={styles.diagramCue}>
            <Label>Diagram cue</Label>
            <Body>{selectedDailyLesson.diagramCue}</Body>
          </View>
          <View style={styles.diagramCue}>
            <Label>Walk practice</Label>
            <Body>{selectedDailyLesson.walkPractice}</Body>
          </View>
        </ScrollView>
      )}

      <View style={styles.controlBar}>
        {speedOpen ? (
          <View style={styles.rateRow}>
            {RATES.map((r) => (
              <Pressable
                key={r}
                onPress={() => {
                  player.setRate(r);
                  setSpeedOpen(false);
                }}
                style={[styles.ratePill, player.rate === r && styles.ratePillActive]}
              >
                <Label
                  style={[
                    styles.rateText,
                    player.rate === r && styles.rateTextActive
                  ]}
                >
                  {r.toFixed(2).replace(/0$/, "")}x
                </Label>
              </Pressable>
            ))}
          </View>
        ) : null}
        <View style={styles.buttonRow}>
          <Pressable
            style={styles.secondaryBtn}
            onPress={() => setSpeedOpen((s) => !s)}
            hitSlop={8}
          >
            <Label style={styles.secondaryText}>
              {player.rate.toFixed(2).replace(/0$/, "")}x
            </Label>
          </Pressable>
          <Pressable style={styles.ctrlBtn} onPress={player.skipBack} hitSlop={8}>
            <Ionicons name="play-skip-back" size={22} color={palette.ink} />
          </Pressable>
          <Pressable style={styles.playBtn} onPress={player.toggle} hitSlop={8}>
            <Ionicons
              name={player.status === "playing" ? "pause" : "play"}
              size={28}
              color={palette.surfaceRaised}
              style={player.status === "playing" ? undefined : { marginLeft: 3 }}
            />
          </Pressable>
          <Pressable style={styles.ctrlBtn} onPress={player.skipForward} hitSlop={8}>
            <Ionicons name="play-skip-forward" size={22} color={palette.ink} />
          </Pressable>
          <View style={styles.secondaryBtn} pointerEvents="none">
            <Label style={styles.secondaryTextMuted} numberOfLines={1}>
              {currentVoiceLabel.split(" · ")[0]}
            </Label>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.canvas },
  topGradient: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xs,
    paddingBottom: spacing.md,
    gap: spacing.sm,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.sm
  },
  topBarCenter: { flex: 1, alignItems: "center" },
  topBarEyebrow: { color: "rgba(255,253,249,0.7)", fontSize: 10 },
  topBarTitle: { color: palette.surfaceRaised, fontSize: 15 },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center"
  },
  miniHero: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingTop: spacing.xs
  },
  pulseWrap: {
    width: 52,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  },
  pulseRing: {
    position: "absolute",
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(217,143,43,0.35)"
  },
  pulseCore: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: palette.accentWarm,
    alignItems: "center",
    justifyContent: "center"
  },
  miniHeroBody: {
    flex: 1,
    color: "rgba(255,253,249,0.85)",
    fontSize: 13,
    lineHeight: 18
  },
  progressWrap: {
    height: 3,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.18)",
    overflow: "hidden"
  },
  progressFill: {
    height: 3,
    backgroundColor: palette.accentWarm
  },
  transcript: { flex: 1 },
  transcriptContent: {
    padding: spacing.lg,
    gap: spacing.xs,
    paddingBottom: spacing.xl
  },
  transcriptLine: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 14
  },
  transcriptLineActive: {
    backgroundColor: palette.accentFog
  },
  transcriptText: {
    fontSize: 16,
    lineHeight: 24,
    color: palette.ink
  },
  transcriptTextActive: {
    color: palette.accentDeep,
    fontWeight: "600"
  },
  transcriptTextRead: {
    color: palette.muted
  },
  diagramCue: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: 22,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
    gap: spacing.xs
  },
  controlBar: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    borderTopWidth: 1,
    borderTopColor: palette.border,
    backgroundColor: palette.surfaceRaised,
    gap: spacing.sm
  },
  rateRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.xs
  },
  ratePill: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border
  },
  ratePillActive: {
    backgroundColor: palette.accentDeep,
    borderColor: palette.accentDeep
  },
  rateText: { fontSize: 12 },
  rateTextActive: { color: palette.surfaceRaised },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm
  },
  secondaryBtn: {
    minWidth: 52,
    height: 36,
    paddingHorizontal: spacing.sm,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center"
  },
  secondaryText: {
    fontSize: 13,
    color: palette.ink,
    fontWeight: "600"
  },
  secondaryTextMuted: {
    fontSize: 11,
    color: palette.muted
  },
  ctrlBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center"
  },
  playBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: palette.accentDeep,
    alignItems: "center",
    justifyContent: "center"
  },
  voicePanel: {
    flex: 1,
    padding: spacing.lg,
    gap: spacing.md
  },
  voicePanelTitle: { fontSize: 20 },
  voicePanelHint: { color: palette.muted },
  voiceList: { flex: 1 },
  voiceListContent: { gap: spacing.sm, paddingBottom: spacing.md },
  voiceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.md,
    borderRadius: 16,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border
  },
  voiceRowSelected: {
    backgroundColor: palette.accentFog,
    borderColor: palette.accent
  },
  voiceRowMeta: { color: palette.muted, fontSize: 13 }
});
