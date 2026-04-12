import { StyleSheet, View } from "react-native";

import { MetricTile } from "@/components/MetricTile";
import { PillButton } from "@/components/PillButton";
import { ProgressBar } from "@/components/ProgressBar";
import { Screen } from "@/components/Screen";
import { SectionCard } from "@/components/SectionCard";
import { Body, Eyebrow, Heading, Label } from "@/components/Type";
import { useAppContext } from "@/store/AppContext";
import { palette } from "@/theme/palette";
import { spacing } from "@/theme/spacing";

export default function ProgressScreen() {
  const {
    enableDailyReminder,
    notificationPermissionStatus,
    reminderTime,
    recommendations,
    sessionSummary,
    skillStates,
    streak,
    strongestSkill,
    weakSkill
  } = useAppContext();

  return (
    <Screen>
      <SectionCard>
        <Eyebrow>Progress</Eyebrow>
        <Heading>Make growth visible enough to trust.</Heading>
        <View style={styles.metricRow}>
          <MetricTile label="Current streak" value={`${streak.current}`} helper="days in a row" />
          <MetricTile label="Longest streak" value={`${streak.longest}`} helper="best rhythm so far" />
        </View>
      </SectionCard>

      <SectionCard>
        <Eyebrow>Signals</Eyebrow>
        <Heading style={styles.sectionTitle}>Where you are leveling up</Heading>
        <Body>Strongest domain: {strongestSkill?.domain.replaceAll("_", " ")}</Body>
        <Body>Needs the most reps: {weakSkill?.domain.replaceAll("_", " ")}</Body>
        <View style={styles.stack}>
          {skillStates.map((skill) => (
            <View key={skill.skillId} style={styles.skillRow}>
              <View style={styles.skillHeader}>
                <Label>{skill.domain.replaceAll("_", " ")}</Label>
                <Label>{Math.round(skill.mastery)}%</Label>
              </View>
              <ProgressBar color={palette.accentWarm} value={skill.mastery} />
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard>
        <Eyebrow>Recommendations</Eyebrow>
        <Heading style={styles.sectionTitle}>Best next moves</Heading>
        <View style={styles.stack}>
          {recommendations.map((recommendation) => (
            <View key={recommendation.id} style={styles.recommendation}>
              <Label>{recommendation.title}</Label>
              <Body>{recommendation.reason}</Body>
              <Body>
                {recommendation.actionLabel} • {recommendation.estimatedMinutes} min
              </Body>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard>
        <Eyebrow>Latest session</Eyebrow>
        <Heading style={styles.sectionTitle}>One walk, real movement</Heading>
        <Body>
          {sessionSummary.challengesCompleted} reps completed across {sessionSummary.domainsTouched.length} domains with a best score
          of {Math.round(sessionSummary.bestScore)}.
        </Body>
      </SectionCard>

      <SectionCard>
        <Eyebrow>Reminder</Eyebrow>
        <Heading style={styles.sectionTitle}>Daily walk notification</Heading>
        <Body>
          Remind me at {reminderTime}. Status: {notificationPermissionStatus}.
        </Body>
        <PillButton title="Enable reminder" onPress={() => void enableDailyReminder()} />
      </SectionCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  metricRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md
  },
  sectionTitle: {
    fontSize: 24,
    lineHeight: 30
  },
  stack: {
    gap: spacing.md
  },
  skillRow: {
    gap: spacing.xs
  },
  skillHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md
  },
  recommendation: {
    gap: spacing.xs,
    paddingBottom: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: palette.border
  }
});
