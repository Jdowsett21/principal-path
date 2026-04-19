import { useEffect, useMemo, useRef, useState } from "react";
import { Animated, Easing, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { Body, Eyebrow, Label } from "@/components/Type";
import { PillButton } from "@/components/PillButton";
import { usePlayer } from "@/hooks/usePlayer";
import { palette } from "@/theme/palette";
import { spacing } from "@/theme/spacing";
import { phases } from "@/data/phases";
import { aiEngineeringUnits } from "@/data/units/ai-engineering";
import type { AudioStage } from "@/data/curriculum.types";
import { useCurriculumProgress } from "@/store/curriculumProgress";
import { getNextLesson, navigateToLesson } from "@/lib/lessonNav";

const allUnits = [...aiEngineeringUnits];

function resolveStage(unitId: string, stageIndex: number): AudioStage | null {
  const unit = allUnits.find((u) => u.id === unitId);
  if (!unit) return null;
  const stage = unit.stages[stageIndex];
  if (!stage || (stage.type !== "walk" && stage.type !== "deep-dive")) return null;
  return stage;
}

const RATES = [0.85, 0.95, 1.0, 1.1, 1.25];

export default function UnitAudioScreen() {
  const { unitId, stageIndex } = useLocalSearchParams<{
    unitId: string;
    stageIndex: string;
  }>();
  const stageIdx = Number(stageIndex ?? 0);
  const unit = useMemo(() => allUnits.find((u) => u.id === unitId), [unitId]);
  const stage = useMemo(
    () => resolveStage(unitId ?? "", stageIdx),
    [unitId, stageIdx]
  );
  const phase = useMemo(
    () => phases.find((p) => p.id === unit?.phaseId),
    [unit]
  );

  const player = usePlayer();
  const { markComplete } = useCurriculumProgress();
  const lessonKey = `${unitId}:${stageIdx}`;
  const next = useMemo(() => getNextLesson(lessonKey), [lessonKey]);
  const [speedOpen, setSpeedOpen] = useState(false);
  const pulse = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<ScrollView | null>(null);
  const lineRefs = useRef<Record<number, View | null>>({});

  const chunks = useMemo(() => {
    if (!stage) return [];
    return [stage.spokenIntro, stage.spokenBody, stage.spokenWrap];
  }, [stage]);

  useEffect(() => {
    if (chunks.length > 0) player.loadChunks(chunks);
  }, [chunks]);

  useEffect(() => {
    if (player.status === "playing") {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1,
            duration: 1400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 0,
            duration: 1400,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
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
          scrollRef.current?.scrollTo({
            y: Math.max(0, y - 120),
            animated: true,
          });
        },
        () => {}
      );
    }
  }, [player.currentLine]);

  const pulseScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.12],
  });
  const pulseOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const progress =
    player.lines.length === 0
      ? 0
      : ((player.currentLine + 1) / player.lines.length) * 100;

  if (!stage || !unit || !phase) {
    return (
      <SafeAreaView style={styles.safe}>
        <Body>Stage not found.</Body>
      </SafeAreaView>
    );
  }

  const stageLabel = stage.type === "walk" ? "Walk" : "Deep Dive";

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <LinearGradient
        colors={[phase.color, `${phase.color}cc`]}
        end={{ x: 1, y: 1 }}
        style={styles.topGradient}
      >
        <View style={styles.topBar}>
          <Pressable onPress={() => router.back()} style={styles.iconBtn} hitSlop={12}>
            <Ionicons name="chevron-down" size={22} color="#fff" />
          </Pressable>
          <View style={styles.topBarCenter}>
            <Eyebrow style={styles.topBarEyebrow}>{stageLabel}</Eyebrow>
            <Label style={styles.topBarTitle} numberOfLines={1}>
              {stage.title}
            </Label>
          </View>
          <View style={{ width: 36 }} />
        </View>

        <View style={styles.miniHero}>
          <View style={styles.pulseWrap}>
            <Animated.View
              style={[
                styles.pulseRing,
                { transform: [{ scale: pulseScale }], opacity: pulseOpacity },
              ]}
            />
            <View style={styles.pulseCore}>
              <Ionicons
                name={stage.type === "walk" ? "footsteps" : "library"}
                size={20}
                color="#fff"
              />
            </View>
          </View>
          <Body style={styles.miniHeroBody} numberOfLines={2}>
            {unit.objective}
          </Body>
        </View>

        <View style={styles.progressWrap}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </LinearGradient>

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
              idx === player.currentLine && styles.transcriptLineActive,
            ]}
          >
            <Body
              style={[
                styles.transcriptText,
                idx === player.currentLine && styles.transcriptTextActive,
                idx < player.currentLine && styles.transcriptTextRead,
              ]}
            >
              {line}
            </Body>
          </Pressable>
        ))}

        {stage.keyPoints.length > 0 ? (
          <View style={styles.keyPointsCard}>
            <Label>Key Points</Label>
            {stage.keyPoints.map((kp, i) => (
              <Body key={i} style={styles.keyPoint}>
                • {kp}
              </Body>
            ))}
          </View>
        ) : null}

        {stage.diagramCue ? (
          <View style={styles.keyPointsCard}>
            <Label>Diagram Cue</Label>
            <Body>{stage.diagramCue}</Body>
          </View>
        ) : null}
      </ScrollView>

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
                    player.rate === r && styles.rateTextActive,
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
              color="#fff"
              style={player.status === "playing" ? undefined : { marginLeft: 3 }}
            />
          </Pressable>
          <Pressable style={styles.ctrlBtn} onPress={player.skipForward} hitSlop={8}>
            <Ionicons name="play-skip-forward" size={22} color={palette.ink} />
          </Pressable>
          <View style={styles.secondaryBtn} />
        </View>
        {player.status === "done" ? (
          <PillButton
            title={next ? "Next Lesson" : "Done"}
            onPress={() => {
              markComplete(lessonKey);
              if (next) {
                router.back();
                setTimeout(() => navigateToLesson(next), 100);
              } else {
                router.back();
              }
            }}
          />
        ) : null}
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
    borderBottomRightRadius: 24,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.sm,
  },
  topBarCenter: { flex: 1, alignItems: "center" },
  topBarEyebrow: { color: "rgba(255,255,255,0.6)", fontSize: 10 },
  topBarTitle: { color: "#fff", fontSize: 15 },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  miniHero: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingTop: spacing.xs,
  },
  pulseWrap: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  pulseRing: {
    position: "absolute",
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  pulseCore: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  miniHeroBody: {
    flex: 1,
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    lineHeight: 18,
  },
  progressWrap: {
    height: 3,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.18)",
    overflow: "hidden",
  },
  progressFill: { height: 3, backgroundColor: "rgba(255,255,255,0.8)" },
  transcript: { flex: 1 },
  transcriptContent: {
    padding: spacing.lg,
    gap: spacing.xs,
    paddingBottom: spacing.xl,
  },
  transcriptLine: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 14,
  },
  transcriptLineActive: { backgroundColor: palette.accentFog },
  transcriptText: { fontSize: 16, lineHeight: 24, color: palette.ink },
  transcriptTextActive: { color: palette.accentDeep, fontWeight: "600" },
  transcriptTextRead: { color: palette.muted },
  keyPointsCard: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: 22,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
    gap: spacing.xs,
  },
  keyPoint: { color: palette.ink },
  controlBar: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    borderTopWidth: 1,
    borderTopColor: palette.border,
    backgroundColor: palette.surfaceRaised,
    gap: spacing.sm,
  },
  rateRow: { flexDirection: "row", justifyContent: "center", gap: spacing.xs },
  ratePill: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
  },
  ratePillActive: {
    backgroundColor: palette.accentDeep,
    borderColor: palette.accentDeep,
  },
  rateText: { fontSize: 12 },
  rateTextActive: { color: "#fff" },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  secondaryBtn: {
    minWidth: 52,
    height: 36,
    paddingHorizontal: spacing.sm,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryText: { fontSize: 13, color: palette.ink, fontWeight: "600" },
  ctrlBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  playBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: palette.accentDeep,
    alignItems: "center",
    justifyContent: "center",
  },
});
