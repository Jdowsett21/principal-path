import { StyleSheet, View } from "react-native";

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

  return (
    <Screen>
      <SectionCard>
        <Eyebrow>Build lab</Eyebrow>
        <Heading>Turn new tech into a small finished thing.</Heading>
        <Body>
          These missions are designed for fast reward loops: one focused problem, visible output, and a clear finish line.
        </Body>
      </SectionCard>

      {latestGeneratedMission ? (
        <SectionCard>
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
          <PillButton title={`${mission.durationMinutes}-minute mission`} variant="secondary" />
        </SectionCard>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    lineHeight: 30
  },
  stack: {
    gap: spacing.sm
  },
  step: {
    gap: spacing.xs
  }
});
