import { useMemo } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { Body, Eyebrow, Heading, Label } from "@/components/Type";
import { PillButton } from "@/components/PillButton";
import { palette } from "@/theme/palette";
import { spacing } from "@/theme/spacing";
import { phases } from "@/data/phases";
import { aiEngineeringUnits } from "@/data/units/ai-engineering";
import type { UnitStage } from "@/data/curriculum.types";

const allUnits = [...aiEngineeringUnits];

const STAGE_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  walk: "footsteps",
  "deep-dive": "library",
  "case-study": "git-branch",
  "mastery-check": "checkmark-done",
};

const STAGE_LABELS: Record<string, string> = {
  walk: "Walk",
  "deep-dive": "Deep Dive",
  "case-study": "Case Study",
  "mastery-check": "Mastery Check",
};

function navigateToStage(unitId: string, stageIndex: number, stage: UnitStage) {
  if (stage.type === "walk" || stage.type === "deep-dive") {
    router.push({
      pathname: "/unit-audio",
      params: { unitId, stageIndex: String(stageIndex) },
    });
  } else if (stage.type === "case-study") {
    router.push({
      pathname: "/case-study",
      params: { unitId, stageIndex: String(stageIndex) },
    });
  } else if (stage.type === "mastery-check") {
    router.push({
      pathname: "/mastery-check",
      params: { unitId, stageIndex: String(stageIndex) },
    });
  }
}

export default function UnitScreen() {
  const { unitId } = useLocalSearchParams<{ unitId: string }>();
  const unit = useMemo(() => allUnits.find((u) => u.id === unitId), [unitId]);
  const phase = useMemo(
    () => phases.find((p) => p.id === unit?.phaseId),
    [unit]
  );

  if (!unit || !phase) {
    return (
      <SafeAreaView style={styles.safe}>
        <Body>Unit not found.</Body>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <LinearGradient
        colors={[phase.color, `${phase.color}cc`]}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </Pressable>
        <Eyebrow style={styles.phaseLabel}>{phase.title}</Eyebrow>
        <Heading style={styles.unitTitle}>{unit.title}</Heading>
        <Body style={styles.objective}>{unit.objective}</Body>
        <View style={styles.metaRow}>
          <Ionicons name="time-outline" size={14} color="rgba(255,255,255,0.7)" />
          <Body style={styles.metaText}>~{unit.durationMinutes} min</Body>
          <Body style={styles.metaText}>·</Body>
          <Body style={styles.metaText}>{unit.stages.length} stages</Body>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Label style={styles.sectionLabel}>Stages</Label>
        {unit.stages.map((stage, i) => (
          <Pressable
            key={i}
            onPress={() => navigateToStage(unit.id, i, stage)}
            style={({ pressed }) => [styles.stageCard, pressed && styles.stagePressed]}
          >
            <View
              style={[styles.stageIcon, { backgroundColor: `${phase.accent}22` }]}
            >
              <Ionicons
                name={STAGE_ICONS[stage.type] ?? "help"}
                size={20}
                color={phase.color}
              />
            </View>
            <View style={styles.stageCopy}>
              <Label>{stage.title}</Label>
              <Body>
                {STAGE_LABELS[stage.type]} · ~{stage.durationMinutes} min
              </Body>
            </View>
            <Ionicons name="chevron-forward" size={18} color={palette.muted} />
          </Pressable>
        ))}

        {unit.stages[0] ? (
          <PillButton
            title="Start Walk"
            onPress={() => navigateToStage(unit.id, 0, unit.stages[0]!)}
          />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.canvas },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    gap: spacing.xs,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  phaseLabel: {
    color: "rgba(255,255,255,0.6)",
    marginTop: spacing.sm,
  },
  unitTitle: {
    color: "#fff",
    fontSize: 24,
    lineHeight: 30,
  },
  objective: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 14,
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: spacing.xs,
  },
  metaText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
  },
  scroll: { flex: 1 },
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.sm,
    paddingBottom: spacing.xl,
  },
  sectionLabel: {
    marginBottom: spacing.xs,
  },
  stageCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: 20,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
  },
  stagePressed: {
    opacity: 0.92,
    transform: [{ translateY: 1 }],
  },
  stageIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  stageCopy: { flex: 1, gap: 2 },
});
