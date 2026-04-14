import { Alert, StyleSheet, View } from "react-native";

import { PillButton } from "@/components/PillButton";
import { Screen } from "@/components/Screen";
import { SectionCard } from "@/components/SectionCard";
import { Body, Eyebrow, Heading, Label } from "@/components/Type";
import { useAppContext } from "@/store/AppContext";
import { spacing } from "@/theme/spacing";

export default function BuildLabScreen() {
  const { buildMissions, latestGeneratedMission } = useAppContext();
  const generatedMissions = buildMissions.filter((mission) => mission.origin === "generated");
  const seedMissions = buildMissions.filter((mission) => mission.origin !== "generated");

  const openMission = (title: string, durationMinutes: number, firstStep: string) => {
    Alert.alert(title, `${durationMinutes} minute mission\n\nStart with: ${firstStep}`);
  };

  return (
    <Screen>
      <SectionCard style={styles.heroCard}>
        <Eyebrow>Build lab</Eyebrow>
        <Heading>Turn new tech into a small finished thing.</Heading>
        <Body>
          These missions are designed for fast reward loops: one focused problem, visible output, and a clear finish line.
        </Body>
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <Label>{seedMissions.length} core missions</Label>
          </View>
          <View style={styles.badge}>
            <Label>{generatedMissions.length} generated from frontier</Label>
          </View>
        </View>
      </SectionCard>

      {latestGeneratedMission ? (
        <SectionCard style={styles.generatedCard}>
          <Eyebrow>Latest generated mission</Eyebrow>
          <Heading style={styles.title}>{latestGeneratedMission.title}</Heading>
          <Body>{latestGeneratedMission.outcome}</Body>
          <Body>{latestGeneratedMission.reward}</Body>
        </SectionCard>
      ) : null}

      {generatedMissions.length > 1 ? (
        <SectionCard>
          <Eyebrow>Generated queue</Eyebrow>
          <Body>{generatedMissions.length} missions synthesized from frontier topics.</Body>
        </SectionCard>
      ) : null}

      {seedMissions.map((mission) => (
        <SectionCard key={mission.id}>
          <Eyebrow>{mission.category}</Eyebrow>
          <Heading style={styles.title}>{mission.title}</Heading>
          <Body>{mission.outcome}</Body>
          <Label>Mission steps</Label>
          <View style={styles.stack}>
            {mission.steps.map((step) => (
              <View key={step.title} style={styles.step}>
                <Label>{step.title}</Label>
                <Body>{step.detail}</Body>
              </View>
            ))}
          </View>
          <Label>Why it feels rewarding</Label>
          <Body>{mission.reward}</Body>
          <Label>Success signals</Label>
          <Body>{mission.successSignals.join(" • ")}</Body>
          <PillButton
            title={`${mission.durationMinutes}-minute mission`}
            variant="secondary"
            onPress={() => openMission(mission.title, mission.durationMinutes, mission.steps[0]?.title ?? "Review the brief")}
          />
        </SectionCard>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: "#fff9f1"
  },
  title: {
    fontSize: 24,
    lineHeight: 30
  },
  stack: {
    gap: spacing.sm
  },
  step: {
    gap: spacing.xs
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: "#ffffffcc"
  },
  generatedCard: {
    backgroundColor: "#f8fcfb"
  }
});
