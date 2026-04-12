import { StyleSheet, View } from "react-native";

import { ProgressBar } from "@/components/ProgressBar";
import { PillButton } from "@/components/PillButton";
import { Screen } from "@/components/Screen";
import { SectionCard } from "@/components/SectionCard";
import { Body, Eyebrow, Heading, Label } from "@/components/Type";
import { useAppContext } from "@/store/AppContext";
import { palette } from "@/theme/palette";
import { spacing } from "@/theme/spacing";

const statusLabel: Record<string, string> = {
  adopt: "Adopt now",
  experiment: "Try next",
  watch: "Watch closely",
  avoid: "Avoid for now"
};

const statusValue: Record<string, number> = {
  adopt: 100,
  experiment: 70,
  watch: 45,
  avoid: 20
};

export default function FrontierScreen() {
  const { frontierBriefs, generateMissionFromFrontierId } = useAppContext();

  return (
    <Screen>
      <SectionCard>
        <Eyebrow>Frontier</Eyebrow>
        <Heading>Track what is new without getting lost in hype.</Heading>
        <Body>
          This surface keeps you current on AI engineering, tool integration, evals, and production strategy.
        </Body>
      </SectionCard>

      {frontierBriefs.map((brief) => (
        <SectionCard key={brief.id}>
          <View style={styles.headerRow}>
            <Eyebrow>{brief.category}</Eyebrow>
            <Label>{statusLabel[brief.status]}</Label>
          </View>
          <Heading style={styles.title}>{brief.title}</Heading>
          <Body>{brief.summary}</Body>
          <Body>{brief.whyItMatters}</Body>
          <ProgressBar color={palette.accentWarm} value={statusValue[brief.status]} />
          <View style={styles.stack}>
            <Label>Questions to answer</Label>
            {brief.keyQuestions.map((question) => (
              <Body key={question}>• {question}</Body>
            ))}
            <Label>Time to review</Label>
            <Body>{brief.effortMinutes} minutes</Body>
          </View>
          <PillButton title="Generate mission" variant="secondary" onPress={() => generateMissionFromFrontierId(brief.id)} />
        </SectionCard>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md
  },
  title: {
    fontSize: 24,
    lineHeight: 30
  },
  stack: {
    gap: spacing.xs
  }
});
