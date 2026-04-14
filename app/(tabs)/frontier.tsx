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
  const adoptCount = frontierBriefs.filter((brief) => brief.status === "adopt").length;
  const experimentCount = frontierBriefs.filter((brief) => brief.status === "experiment").length;

  return (
    <Screen>
      <SectionCard style={styles.heroCard}>
        <Eyebrow>Frontier</Eyebrow>
        <Heading>Track what matters without drowning in hype cycles.</Heading>
        <Body>
          This surface keeps you current on AI engineering, tool integration, evals, and production strategy.
        </Body>
        <View style={styles.metrics}>
          <View style={styles.metricPill}>
            <Label>{adoptCount} ready to adopt</Label>
          </View>
          <View style={styles.metricPill}>
            <Label>{experimentCount} worth piloting</Label>
          </View>
        </View>
      </SectionCard>

      {frontierBriefs.map((brief) => (
        <SectionCard key={brief.id} style={styles.briefCard}>
          <View style={styles.headerRow}>
            <Eyebrow>{brief.category}</Eyebrow>
            <View style={styles.statusPill}>
              <Label>{statusLabel[brief.status]}</Label>
            </View>
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
  heroCard: {
    backgroundColor: "#f7fcfb"
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
    alignItems: "center",
    flexWrap: "wrap"
  },
  title: {
    fontSize: 24,
    lineHeight: 30
  },
  stack: {
    gap: spacing.xs
  },
  metrics: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  metricPill: {
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: palette.accentFog,
    borderWidth: 1,
    borderColor: palette.border
  },
  briefCard: {
    backgroundColor: palette.surfaceRaised
  },
  statusPill: {
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.borderStrong
  }
});
