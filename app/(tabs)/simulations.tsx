import { Alert, StyleSheet, View } from "react-native";

import { PillButton } from "@/components/PillButton";
import { Screen } from "@/components/Screen";
import { SectionCard } from "@/components/SectionCard";
import { Body, Eyebrow, Heading, Label } from "@/components/Type";
import { useAppContext } from "@/store/AppContext";
import { spacing } from "@/theme/spacing";

export default function SimulationsScreen() {
  const { weeklySimulations } = useAppContext();

  const openSimulation = (title: string, firstTask: string) => {
    Alert.alert(title, `Start with: ${firstTask}`);
  };

  return (
    <Screen>
      <SectionCard style={styles.heroCard}>
        <Eyebrow>Weekly labs</Eyebrow>
        <Heading>Practice the real conversations and decisions.</Heading>
        <Body>
          These are longer reps designed to simulate principal-level work: ambiguous systems, business constraints, and real operational trade-offs.
        </Body>
      </SectionCard>

      {weeklySimulations.map((simulation) => (
        <SectionCard key={simulation.id}>
          <Eyebrow>Week {simulation.week}</Eyebrow>
          <Heading style={styles.title}>{simulation.title}</Heading>
          <Body>{simulation.scenario}</Body>
          <View style={styles.stack}>
            <Label>Constraints</Label>
            <Body>{simulation.constraints.join(" • ")}</Body>
            <Label>What you need to do</Label>
            <Body>{simulation.tasks.join(" • ")}</Body>
            <Label>How great answers are judged</Label>
            <Body>
              {simulation.scoringRubric.map((item) => `${item.dimension}: ${item.whatGreatLooksLike}`).join(" • ")}
            </Body>
          </View>
          <PillButton
            title="Start simulation"
            variant="secondary"
            onPress={() => openSimulation(simulation.title, simulation.tasks[0] ?? "Review the scenario and constraints")}
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
    fontSize: 23,
    lineHeight: 29
  },
  stack: {
    gap: spacing.sm
  }
});
