import { StyleSheet, View } from "react-native";

import { ProgressBar } from "@/components/ProgressBar";
import { Screen } from "@/components/Screen";
import { SectionCard } from "@/components/SectionCard";
import { Body, Eyebrow, Heading, Label } from "@/components/Type";
import { useAppContext } from "@/store/AppContext";
import { spacing } from "@/theme/spacing";

export default function SkillMapScreen() {
  const { getTrackMastery, tracks } = useAppContext();

  return (
    <Screen>
      <SectionCard style={styles.heroCard}>
        <Eyebrow>Skill map</Eyebrow>
        <Heading>Build the kind of depth AI will not replace.</Heading>
        <Body>
          This map focuses on judgment-heavy capabilities: architecture, reliability, data, distributed systems, and leadership.
        </Body>
      </SectionCard>

      {tracks.map((track) => {
        const mastery = getTrackMastery(track.id);

        return (
          <SectionCard key={track.id} style={{ backgroundColor: `${track.color}10` }}>
            <Eyebrow>{track.title}</Eyebrow>
            <Heading style={styles.cardTitle}>{mastery}% mastered</Heading>
            <Body>{track.summary}</Body>
            <ProgressBar color={track.accent} value={mastery} />
            <View style={styles.stack}>
              {track.modules.map((module) => (
                <View key={module.id} style={styles.module}>
                  <Label>{module.title}</Label>
                  <Body>{module.outcomes.join(" • ")}</Body>
                </View>
              ))}
            </View>
          </SectionCard>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: "#f8fcfb"
  },
  cardTitle: {
    fontSize: 24,
    lineHeight: 30
  },
  stack: {
    gap: spacing.md
  },
  module: {
    gap: spacing.xs
  }
});
