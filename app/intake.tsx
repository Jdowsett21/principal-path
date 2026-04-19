import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { PillButton } from "@/components/PillButton";
import { Body, Eyebrow, Heading, Label } from "@/components/Type";
import { skillIntakeSections } from "@/data/skillIntake";
import { useAppContext } from "@/store/AppContext";
import type { TopicRatingLevel, TopicRatings } from "@/store/persistence";
import { palette } from "@/theme/palette";
import { spacing } from "@/theme/spacing";

const LEVELS: { id: TopicRatingLevel; label: string; detail: string }[] = [
  { id: "none", label: "Never heard", detail: "New to me" },
  { id: "heard", label: "Heard of it", detail: "Couldn't explain" },
  { id: "know", label: "Can explain", detail: "Haven't used deeply" },
  { id: "deep", label: "Used in prod", detail: "Could teach it" }
];

export default function IntakeScreen() {
  const { topicRatings, saveTopicRatings } = useAppContext();
  const [ratings, setRatings] = useState<TopicRatings>(topicRatings);

  const totalTopics = useMemo(
    () => skillIntakeSections.reduce((sum, s) => sum + s.topics.length, 0),
    []
  );
  const answered = Object.keys(ratings).length;
  const complete = answered === totalTopics;

  const onSave = () => {
    saveTopicRatings(ratings);
    router.back();
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <LinearGradient
        colors={["#11424a", "#0b5d66"]}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerTop}>
          <Pressable onPress={() => router.back()} style={styles.closeBtn} hitSlop={12}>
            <Label style={styles.closeText}>Close</Label>
          </Pressable>
          <Label style={styles.progressLabel}>
            {answered} / {totalTopics}
          </Label>
        </View>
        <Eyebrow style={styles.headerEyebrow}>Skill intake</Eyebrow>
        <Heading style={styles.headerTitle}>
          How deep are you, honestly?
        </Heading>
        <Body style={styles.headerBody}>
          Rate each topic. Lying only shapes worse lessons — no one else sees this. We use your answers to pick whether a lesson starts from first principles or skips straight to the tradeoffs.
        </Body>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.body}>
        {skillIntakeSections.map((section) => (
          <View key={section.trackId} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Heading style={styles.sectionTitle}>{section.title}</Heading>
              <Body style={styles.sectionIntro}>{section.intro}</Body>
            </View>
            {section.topics.map((topic) => {
              const selected = ratings[topic.key];
              return (
                <View key={topic.key} style={styles.topicCard}>
                  <Label style={styles.topicLabel}>{topic.label}</Label>
                  <Body style={styles.topicDescription}>{topic.description}</Body>
                  <View style={styles.levelRow}>
                    {LEVELS.map((lvl) => {
                      const isSelected = selected === lvl.id;
                      return (
                        <Pressable
                          key={lvl.id}
                          onPress={() =>
                            setRatings((prev) => ({ ...prev, [topic.key]: lvl.id }))
                          }
                          style={[styles.levelChip, isSelected && styles.levelChipActive]}
                        >
                          <Label
                            style={[
                              styles.levelLabel,
                              isSelected && styles.levelLabelActive
                            ]}
                          >
                            {lvl.label}
                          </Label>
                          <Body
                            style={[
                              styles.levelDetail,
                              isSelected && styles.levelDetailActive
                            ]}
                          >
                            {lvl.detail}
                          </Body>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
        ))}
        <View style={styles.footer}>
          <Body style={styles.footerHint}>
            {complete
              ? "All set. Save to lock these in — you can retake any time."
              : `Answer ${totalTopics - answered} more to save.`}
          </Body>
          <PillButton
            title={complete ? "Save and shape my lessons" : "Save what I have"}
            onPress={onSave}
          />
        </View>
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
    gap: spacing.sm,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  closeBtn: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs
  },
  closeText: { color: palette.surfaceRaised },
  progressLabel: { color: "rgba(255,253,249,0.8)" },
  headerEyebrow: { color: "rgba(255,253,249,0.75)" },
  headerTitle: { color: palette.surfaceRaised, fontSize: 28, lineHeight: 34 },
  headerBody: { color: "rgba(255,253,249,0.85)", fontSize: 15, lineHeight: 22 },
  body: { padding: spacing.lg, gap: spacing.lg, paddingBottom: spacing.xl },
  section: { gap: spacing.md },
  sectionHeader: { gap: 4 },
  sectionTitle: { fontSize: 20, lineHeight: 26 },
  sectionIntro: { color: palette.muted },
  topicCard: {
    borderRadius: 22,
    padding: spacing.md,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
    gap: spacing.sm
  },
  topicLabel: { fontSize: 16 },
  topicDescription: { color: palette.muted, fontSize: 14, lineHeight: 20 },
  levelRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs
  },
  levelChip: {
    flex: 1,
    minWidth: 130,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: 14,
    backgroundColor: palette.surfaceRaised,
    borderWidth: 1,
    borderColor: palette.border,
    gap: 2
  },
  levelChipActive: {
    backgroundColor: palette.accentDeep,
    borderColor: palette.accentDeep
  },
  levelLabel: { fontSize: 13 },
  levelLabelActive: { color: palette.surfaceRaised },
  levelDetail: { fontSize: 11, color: palette.muted, lineHeight: 14 },
  levelDetailActive: { color: "rgba(255,253,249,0.8)" },
  footer: { gap: spacing.sm, paddingTop: spacing.md },
  footerHint: { color: palette.muted, textAlign: "center" }
});
