import { useCallback, useMemo, useState } from "react";
import { Animated, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { Body, Eyebrow, Heading, Label } from "@/components/Type";
import { PillButton } from "@/components/PillButton";
import { palette } from "@/theme/palette";
import { spacing } from "@/theme/spacing";
import type { CaseStudyStage, DecisionNode } from "@/data/curriculum.types";
import { aiEngineeringUnits } from "@/data/units/ai-engineering";
import { useCurriculumProgress } from "@/store/curriculumProgress";
import { getNextLesson, navigateToLesson } from "@/lib/lessonNav";

type PathEntry = {
  nodeId: string;
  choiceIndex: number;
  quality: "good" | "okay" | "poor";
};

function resolveStage(unitId: string, stageIndex: number): CaseStudyStage | null {
  const unit = aiEngineeringUnits.find((u) => u.id === unitId);
  if (!unit) return null;
  const stage = unit.stages[stageIndex];
  if (!stage || stage.type !== "case-study") return null;
  return stage;
}

const QUALITY_COLORS = {
  good: palette.success,
  okay: palette.accentWarm,
  poor: palette.danger,
} as const;

const QUALITY_LABELS = {
  good: "Strong move",
  okay: "Workable, but not ideal",
  poor: "Risky choice",
} as const;

export default function CaseStudyScreen() {
  const { unitId, stageIndex } = useLocalSearchParams<{
    unitId: string;
    stageIndex: string;
  }>();
  const stage = useMemo(
    () => resolveStage(unitId ?? "", Number(stageIndex ?? 0)),
    [unitId, stageIndex]
  );

  const { markComplete } = useCurriculumProgress();
  const lessonKey = `${unitId}:${Number(stageIndex ?? 0)}`;
  const next = useMemo(() => getNextLesson(lessonKey), [lessonKey]);
  const [currentNodeId, setCurrentNodeId] = useState(stage?.startNodeId ?? "start");
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showConsequence, setShowConsequence] = useState(false);
  const [path, setPath] = useState<PathEntry[]>([]);
  const [finished, setFinished] = useState(false);

  const nodeMap = useMemo(() => {
    const m = new Map<string, DecisionNode>();
    for (const n of stage?.nodes ?? []) m.set(n.id, n);
    return m;
  }, [stage]);

  const currentNode = nodeMap.get(currentNodeId);

  const handleConfirm = useCallback(() => {
    if (selectedChoice === null || !currentNode) return;
    const choice = currentNode.choices[selectedChoice]!;
    setPath((p) => [
      ...p,
      { nodeId: currentNodeId, choiceIndex: selectedChoice, quality: choice.quality },
    ]);
    setShowConsequence(true);
  }, [selectedChoice, currentNode, currentNodeId]);

  const handleNext = useCallback(() => {
    if (selectedChoice === null || !currentNode) return;
    const choice = currentNode.choices[selectedChoice]!;
    if (!choice.nextNodeId) {
      setFinished(true);
      return;
    }
    const nextNode = nodeMap.get(choice.nextNodeId);
    if (!nextNode || nextNode.situation === "complete") {
      setFinished(true);
      return;
    }
    setCurrentNodeId(choice.nextNodeId);
    setSelectedChoice(null);
    setShowConsequence(false);
  }, [selectedChoice, currentNode, nodeMap]);

  if (!stage) {
    return (
      <SafeAreaView style={styles.safe}>
        <Body>Case study not found.</Body>
      </SafeAreaView>
    );
  }

  const goodCount = path.filter((p) => p.quality === "good").length;
  const totalDecisions = path.length;

  if (finished) {
    return (
      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          <Eyebrow>Case Study Complete</Eyebrow>
          <Heading style={styles.debriefHeading}>Debrief</Heading>

          <View style={styles.scoreRow}>
            <View style={styles.scoreBadge}>
              <Label style={styles.scoreNum}>
                {goodCount}/{totalDecisions}
              </Label>
              <Body style={styles.scoreLabel}>strong decisions</Body>
            </View>
          </View>

          <View style={styles.pathReview}>
            <Label style={styles.pathTitle}>Your path</Label>
            {path.map((entry, i) => {
              const node = nodeMap.get(entry.nodeId);
              const choice = node?.choices[entry.choiceIndex];
              return (
                <View key={i} style={styles.pathEntry}>
                  <View
                    style={[
                      styles.pathDot,
                      { backgroundColor: QUALITY_COLORS[entry.quality] },
                    ]}
                  />
                  <View style={styles.pathContent}>
                    <Label numberOfLines={2}>{choice?.label ?? "Choice"}</Label>
                    <Body style={{ color: QUALITY_COLORS[entry.quality] }}>
                      {QUALITY_LABELS[entry.quality]}
                    </Body>
                  </View>
                </View>
              );
            })}
          </View>

          {stage.debrief ? (
            <View style={styles.debriefCard}>
              <Label>What to take away</Label>
              <Body>{stage.debrief}</Body>
            </View>
          ) : null}

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
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="close" size={22} color={palette.ink} />
        </Pressable>
        <Eyebrow>{stage.title}</Eyebrow>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.progressRow}>
        {(stage.nodes ?? [])
          .filter((n) => n.situation !== "complete")
          .map((n, i) => {
            const done = path.some((p) => p.nodeId === n.id);
            const active = n.id === currentNodeId;
            return (
              <View
                key={n.id}
                style={[
                  styles.progressDot,
                  done && { backgroundColor: palette.success },
                  active && styles.progressDotActive,
                ]}
              />
            );
          })}
      </View>

      {path.length === 0 ? (
        <View style={styles.scenarioCard}>
          <Label style={styles.scenarioTitle}>Scenario</Label>
          <Body>{stage.scenario}</Body>
        </View>
      ) : null}

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {currentNode ? (
          <>
            <Body style={styles.situation}>{currentNode.situation}</Body>

            {showConsequence && selectedChoice !== null ? (
              <View
                style={[
                  styles.consequenceCard,
                  {
                    borderColor:
                      QUALITY_COLORS[currentNode.choices[selectedChoice]!.quality],
                  },
                ]}
              >
                <View style={styles.consequenceHeader}>
                  <Ionicons
                    name={
                      currentNode.choices[selectedChoice]!.quality === "good"
                        ? "checkmark-circle"
                        : currentNode.choices[selectedChoice]!.quality === "okay"
                          ? "alert-circle"
                          : "close-circle"
                    }
                    size={20}
                    color={
                      QUALITY_COLORS[currentNode.choices[selectedChoice]!.quality]
                    }
                  />
                  <Label
                    style={{
                      color:
                        QUALITY_COLORS[currentNode.choices[selectedChoice]!.quality],
                    }}
                  >
                    {QUALITY_LABELS[currentNode.choices[selectedChoice]!.quality]}
                  </Label>
                </View>
                <Body>{currentNode.choices[selectedChoice]!.consequence}</Body>
              </View>
            ) : null}

            {!showConsequence ? (
              <View style={styles.choicesWrap}>
                {currentNode.choices.map((c, i) => (
                  <Pressable
                    key={i}
                    onPress={() => setSelectedChoice(i)}
                    style={[
                      styles.choiceCard,
                      selectedChoice === i && styles.choiceSelected,
                    ]}
                  >
                    <View style={styles.choiceDotOuter}>
                      {selectedChoice === i ? (
                        <View style={styles.choiceDotInner} />
                      ) : null}
                    </View>
                    <Body style={styles.choiceText}>{c.label}</Body>
                  </Pressable>
                ))}
              </View>
            ) : null}
          </>
        ) : null}
      </ScrollView>

      <View style={styles.bottomBar}>
        {showConsequence ? (
          <PillButton title="Continue" onPress={handleNext} />
        ) : (
          <PillButton
            title="Confirm Choice"
            onPress={handleConfirm}
            variant={selectedChoice === null ? "secondary" : "primary"}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: palette.canvas },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  progressRow: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    paddingBottom: spacing.sm,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: palette.border,
  },
  progressDotActive: {
    backgroundColor: palette.accent,
    width: 24,
    borderRadius: 4,
  },
  scenarioCard: {
    marginHorizontal: spacing.lg,
    padding: spacing.md,
    borderRadius: 20,
    backgroundColor: palette.accentFog,
    borderWidth: 1,
    borderColor: palette.accentSoft,
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  scenarioTitle: { color: palette.accent },
  scroll: { flex: 1 },
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  situation: {
    fontSize: 16,
    lineHeight: 26,
    color: palette.ink,
  },
  choicesWrap: { gap: spacing.sm },
  choiceCard: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 20,
    padding: spacing.md,
    backgroundColor: palette.surface,
  },
  choiceSelected: {
    borderColor: palette.accent,
    backgroundColor: palette.accentFog,
  },
  choiceDotOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: palette.accent,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  choiceDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: palette.accent,
  },
  choiceText: { flex: 1, color: palette.ink },
  consequenceCard: {
    padding: spacing.md,
    borderRadius: 20,
    backgroundColor: palette.surfaceRaised,
    borderWidth: 2,
    gap: spacing.sm,
  },
  consequenceHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  bottomBar: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: palette.border,
    backgroundColor: palette.surfaceRaised,
  },
  debriefHeading: { marginTop: spacing.sm },
  scoreRow: {
    alignItems: "center",
    paddingVertical: spacing.md,
  },
  scoreBadge: {
    alignItems: "center",
    gap: 2,
  },
  scoreNum: {
    fontSize: 36,
    fontWeight: "800",
    color: palette.success,
  },
  scoreLabel: { color: palette.muted },
  pathReview: {
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  pathTitle: { marginBottom: spacing.xs },
  pathEntry: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  pathDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 6,
  },
  pathContent: { flex: 1, gap: 2 },
  debriefCard: {
    padding: spacing.md,
    borderRadius: 20,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
});
