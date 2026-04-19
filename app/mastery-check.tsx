import { useCallback, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { Body, Eyebrow, Heading, Label } from "@/components/Type";
import { PillButton } from "@/components/PillButton";
import { palette } from "@/theme/palette";
import { spacing } from "@/theme/spacing";
import type { MasteryCheckStage } from "@/data/curriculum.types";
import { aiEngineeringUnits } from "@/data/units/ai-engineering";
import { useCurriculumProgress } from "@/store/curriculumProgress";
import { getNextLesson, navigateToLesson } from "@/lib/lessonNav";

function resolveStage(unitId: string, stageIndex: number): MasteryCheckStage | null {
  const unit = aiEngineeringUnits.find((u) => u.id === unitId);
  if (!unit) return null;
  const stage = unit.stages[stageIndex];
  if (!stage || stage.type !== "mastery-check") return null;
  return stage;
}

export default function MasteryCheckScreen() {
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
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const questions = stage?.questions ?? [];
  const q = questions[currentQ];

  const handleAnswer = useCallback(() => {
    if (selected === null || !q) return;
    setAnswered(true);
    if (selected === q.correctIndex) {
      setScore((s) => s + 1);
    }
  }, [selected, q]);

  const handleNext = useCallback(() => {
    if (currentQ + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  }, [currentQ, questions.length]);

  if (!stage || questions.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <Body>Mastery check not found.</Body>
      </SafeAreaView>
    );
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    const passed = pct >= 75;
    return (
      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        <ScrollView contentContainerStyle={styles.finishContent}>
          <Eyebrow>Mastery Check</Eyebrow>
          <Heading style={styles.finishHeading}>
            {passed ? "Solid." : "Keep studying."}
          </Heading>
          <View style={styles.scoreBadge}>
            <Label
              style={[
                styles.scoreNum,
                { color: passed ? palette.success : palette.danger },
              ]}
            >
              {score}/{questions.length}
            </Label>
            <Body style={styles.scorePct}>{pct}%</Body>
          </View>
          <Body style={styles.finishBody}>
            {passed
              ? "You've got a solid grasp. Move on to the next unit when ready."
              : "Review the walk and deep dive, then try again. Repetition is how this sticks."}
          </Body>
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

  const isCorrect = selected === q!.correctIndex;

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="close" size={22} color={palette.ink} />
        </Pressable>
        <Eyebrow>
          {currentQ + 1} of {questions.length}
        </Eyebrow>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.progressRow}>
        {questions.map((_, i) => (
          <View
            key={i}
            style={[
              styles.progressDot,
              i < currentQ && { backgroundColor: palette.success },
              i === currentQ && styles.progressDotActive,
            ]}
          />
        ))}
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        <Label style={styles.question}>{q!.question}</Label>

        <View style={styles.choicesWrap}>
          {q!.choices.map((c, i) => {
            const isThis = selected === i;
            let borderColor: string = palette.border;
            let bg: string = palette.surface;
            if (answered) {
              if (i === q!.correctIndex) {
                borderColor = palette.success;
                bg = "#eaf5ef";
              } else if (isThis && !isCorrect) {
                borderColor = palette.danger;
                bg = "#fdf0ef";
              }
            } else if (isThis) {
              borderColor = palette.accent;
              bg = palette.accentFog;
            }
            return (
              <Pressable
                key={i}
                onPress={answered ? undefined : () => setSelected(i)}
                style={[styles.choiceCard, { borderColor, backgroundColor: bg }]}
              >
                <View style={[styles.choiceDotOuter, { borderColor }]}>
                  {isThis ? (
                    <View
                      style={[styles.choiceDotInner, { backgroundColor: borderColor }]}
                    />
                  ) : null}
                </View>
                <Body style={styles.choiceText}>{c}</Body>
                {answered && i === q!.correctIndex ? (
                  <Ionicons name="checkmark-circle" size={20} color={palette.success} />
                ) : null}
              </Pressable>
            );
          })}
        </View>

        {answered ? (
          <View style={styles.explanationCard}>
            <View style={styles.explanationHeader}>
              <Ionicons
                name={isCorrect ? "checkmark-circle" : "close-circle"}
                size={20}
                color={isCorrect ? palette.success : palette.danger}
              />
              <Label style={{ color: isCorrect ? palette.success : palette.danger }}>
                {isCorrect ? "Correct" : "Not quite"}
              </Label>
            </View>
            <Body>{q!.explanation}</Body>
          </View>
        ) : null}
      </ScrollView>

      <View style={styles.bottomBar}>
        {answered ? (
          <PillButton
            title={currentQ + 1 >= questions.length ? "See Results" : "Next Question"}
            onPress={handleNext}
          />
        ) : (
          <PillButton
            title="Check Answer"
            onPress={handleAnswer}
            variant={selected === null ? "secondary" : "primary"}
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
    paddingBottom: spacing.md,
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
  scroll: { flex: 1 },
  scrollContent: {
    padding: spacing.lg,
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  question: {
    fontSize: 18,
    lineHeight: 28,
    color: palette.ink,
  },
  choicesWrap: { gap: spacing.sm },
  choiceCard: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "flex-start",
    borderWidth: 2,
    borderRadius: 20,
    padding: spacing.md,
  },
  choiceDotOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  choiceDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  choiceText: { flex: 1, color: palette.ink },
  explanationCard: {
    padding: spacing.md,
    borderRadius: 20,
    backgroundColor: palette.surfaceRaised,
    borderWidth: 1,
    borderColor: palette.border,
    gap: spacing.sm,
  },
  explanationHeader: {
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
  finishContent: {
    flex: 1,
    padding: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
  },
  finishHeading: { textAlign: "center" },
  scoreBadge: { alignItems: "center", gap: 2, paddingVertical: spacing.md },
  scoreNum: { fontSize: 48, fontWeight: "800" },
  scorePct: { color: palette.muted, fontSize: 16 },
  finishBody: { textAlign: "center", maxWidth: 280 },
});
