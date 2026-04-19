import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { Body, Eyebrow, Heading, Label } from "@/components/Type";
import { PillButton } from "@/components/PillButton";
import { palette } from "@/theme/palette";
import { spacing } from "@/theme/spacing";
import { flatLessons, useCurriculumProgress } from "@/store/curriculumProgress";
import { navigateToLesson } from "@/lib/lessonNav";

const STAGE_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  walk: "headset",
  "deep-dive": "headset",
  "case-study": "git-branch",
  "mastery-check": "checkmark-done",
};

export default function CurriculumScreen() {
  const { isComplete, nextLesson, completedCount, total } = useCurriculumProgress();
  const pct = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.topBar}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="chevron-back" size={22} color={palette.ink} />
        </Pressable>
        <Label>Curriculum</Label>
        <View style={{ width: 22 }} />
      </View>

      <View style={styles.progressHeader}>
        <View style={styles.progressInfo}>
          <Heading style={styles.pctText}>{pct}%</Heading>
          <Body>
            {completedCount}/{total} lessons complete
          </Body>
        </View>
        <View style={styles.progressBarOuter}>
          <View style={[styles.progressBarFill, { width: `${pct}%` }]} />
        </View>
      </View>

      {nextLesson ? (
        <View style={styles.continueWrap}>
          <PillButton
            title={completedCount === 0 ? "Start Learning" : "Continue"}
            onPress={() => navigateToLesson(nextLesson)}
          />
          <Body style={styles.continueHint}>
            Up next: {nextLesson.stage.title}
          </Body>
        </View>
      ) : (
        <View style={styles.continueWrap}>
          <Heading style={styles.doneText}>All done.</Heading>
          <Body style={styles.continueHint}>
            You've completed every lesson in the curriculum so far.
          </Body>
        </View>
      )}

      <ScrollView style={styles.list} contentContainerStyle={styles.listContent}>
        <Eyebrow style={styles.listLabel}>All Lessons</Eyebrow>
        {flatLessons.map((lesson, i) => {
          const done = isComplete(lesson.key);
          const isCurrent = lesson.key === nextLesson?.key;
          const isNewUnit =
            i === 0 || flatLessons[i - 1]!.unitId !== lesson.unitId;

          return (
            <View key={lesson.key}>
              {isNewUnit ? (
                <View style={styles.unitHeader}>
                  <View
                    style={[
                      styles.unitDot,
                      { backgroundColor: lesson.phase.accent },
                    ]}
                  />
                  <Label style={styles.unitTitle}>
                    {lesson.unit.title}
                  </Label>
                </View>
              ) : null}

              <Pressable
                onPress={() => navigateToLesson(lesson)}
                style={[
                  styles.lessonRow,
                  isCurrent && styles.lessonRowCurrent,
                ]}
              >
                <View style={styles.lessonLeft}>
                  {done ? (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color={palette.success}
                    />
                  ) : (
                    <Ionicons
                      name={STAGE_ICONS[lesson.stage.type] ?? "ellipse-outline"}
                      size={20}
                      color={isCurrent ? palette.accent : palette.muted}
                    />
                  )}
                </View>
                <View style={styles.lessonCopy}>
                  <Label
                    style={done ? styles.lessonTitleDone : undefined}
                    numberOfLines={1}
                  >
                    {lesson.stage.title}
                  </Label>
                  <Body style={styles.lessonMeta}>
                    ~{lesson.stage.durationMinutes} min
                  </Body>
                </View>
                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color={palette.muted}
                />
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
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
  progressHeader: {
    paddingHorizontal: spacing.lg,
    gap: spacing.xs,
  },
  progressInfo: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: spacing.sm,
  },
  pctText: { fontSize: 28 },
  progressBarOuter: {
    height: 6,
    borderRadius: 3,
    backgroundColor: palette.border,
    overflow: "hidden",
  },
  progressBarFill: {
    height: 6,
    backgroundColor: palette.success,
    borderRadius: 3,
  },
  continueWrap: {
    padding: spacing.lg,
    gap: spacing.xs,
  },
  continueHint: { textAlign: "center", color: palette.muted, fontSize: 13 },
  doneText: { textAlign: "center", fontSize: 24 },
  list: { flex: 1 },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: 2,
  },
  listLabel: { marginBottom: spacing.sm },
  unitHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingTop: spacing.md,
    paddingBottom: spacing.xs,
  },
  unitDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  unitTitle: { fontSize: 13, color: palette.muted },
  lessonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: 14,
  },
  lessonRowCurrent: {
    backgroundColor: palette.accentFog,
  },
  lessonLeft: { width: 24, alignItems: "center" },
  lessonCopy: { flex: 1, gap: 1 },
  lessonTitleDone: { color: palette.muted },
  lessonMeta: { fontSize: 12, color: palette.muted },
});
