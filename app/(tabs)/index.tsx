import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, View } from "react-native";

import { ChoiceCard } from "@/components/ChoiceCard";
import { MetricTile } from "@/components/MetricTile";
import { PillButton } from "@/components/PillButton";
import { ProgressBar } from "@/components/ProgressBar";
import { Screen } from "@/components/Screen";
import { SectionCard } from "@/components/SectionCard";
import { Body, Eyebrow, Heading, Label } from "@/components/Type";
import { useAppContext } from "@/store/AppContext";
import { palette } from "@/theme/palette";
import { spacing } from "@/theme/spacing";

export default function TodayScreen() {
  const {
    answerChallenge,
    answerOnboardingQuestion,
    challengeChoices,
    completeOnboarding,
    completionPercent,
    frontierBriefs,
    dailyChallenges,
    buildMissions,
    hasCompletedOnboarding,
    onboardingAnswers,
    onboardingQuestions,
    profile,
    selectedDailyLesson,
    sessionSummary,
    streak,
    weakSkill
  } = useAppContext();

  const nextQuestion = onboardingQuestions.find((question) => !onboardingAnswers[question.id]);
  const featuredChallenge = dailyChallenges[0]!;
  const selectedChoice = challengeChoices[featuredChallenge.id];
  const featuredFrontier = frontierBriefs[0]!;
  const featuredMission = buildMissions.find((mission) => mission.origin === "generated") ?? buildMissions[0]!;

  return (
    <Screen>
      <LinearGradient colors={["#fff6db", "#dff3ef"]} style={styles.hero}>
        <Eyebrow>Principal path</Eyebrow>
        <Heading>Train engineering judgment on your walk.</Heading>
        <Body>
          {hasCompletedOnboarding
            ? `Today's focus is ${weakSkill?.domain.replaceAll("_", " ") ?? "architecture"} so we can close the biggest confidence gap next.`
            : "This first version is built around short, audio-first reps that target system design, reliability, and leadership judgment."}
        </Body>
        <View style={styles.metricRow}>
          <MetricTile label="Streak" value={`${streak.current} days`} helper="Momentum compounds" />
          <MetricTile label="Today's XP" value={`${sessionSummary.xpEarned}`} helper="From one full walk" />
        </View>
      </LinearGradient>

      {!hasCompletedOnboarding && nextQuestion ? (
        <SectionCard>
          <Eyebrow>Onboarding</Eyebrow>
          <Heading style={styles.sectionTitle}>{nextQuestion.title}</Heading>
          <Body>{nextQuestion.prompt}</Body>
          <ProgressBar value={completionPercent} />
          <View style={styles.stack}>
            {nextQuestion.options.map((option) => (
              <ChoiceCard
                key={option.id}
                title={option.label}
                description={option.helpText}
                selected={onboardingAnswers[nextQuestion.id] === option.id}
                onPress={() => answerOnboardingQuestion(nextQuestion.id, option.id)}
              />
            ))}
          </View>
          <PillButton
            title={completionPercent >= 80 ? "Finish setup" : "Save and continue"}
            onPress={() => {
              if (completionPercent >= 80) {
                completeOnboarding();
              }
            }}
          />
        </SectionCard>
      ) : null}

      <SectionCard>
        <Eyebrow>Daily walk mode</Eyebrow>
        <Heading style={styles.sectionTitle}>{selectedDailyLesson.title}</Heading>
        <Body>{selectedDailyLesson.hook}</Body>
        <View style={styles.stack}>
          <Label>Lesson objective</Label>
          <Body>{selectedDailyLesson.objective}</Body>
          <Label>Walk prompt</Label>
          <Body>{selectedDailyLesson.walkPractice}</Body>
        </View>
        <PillButton title={`Play ${selectedDailyLesson.durationMinutes}-minute audio lesson`} />
      </SectionCard>

      <SectionCard>
        <Eyebrow>Challenge rep</Eyebrow>
        <Heading style={styles.sectionTitle}>{featuredChallenge.title}</Heading>
        <Body>{featuredChallenge.scenario}</Body>
        <Body>{featuredChallenge.prompt}</Body>
        <View style={styles.stack}>
          {featuredChallenge.choices?.map((choice) => (
            <ChoiceCard
              key={choice}
              title={choice}
              selected={selectedChoice === choice}
              onPress={() => answerChallenge(featuredChallenge.id, choice)}
            />
          ))}
        </View>
        {selectedChoice ? (
          <View style={styles.feedback}>
            <Label>Your instinct: {selectedChoice}</Label>
            <Body>{featuredChallenge.whyItMatters}</Body>
            <Body>Strong signals to listen for: {featuredChallenge.idealSignals.join(" • ")}</Body>
          </View>
        ) : null}
      </SectionCard>

      <SectionCard>
        <Eyebrow>Session recap</Eyebrow>
        <Heading style={styles.sectionTitle}>What today moved forward</Heading>
        <View style={styles.metricRow}>
          <MetricTile label="Avg score" value={`${Math.round(sessionSummary.averageScore)}`} helper="Across today's reps" />
          <MetricTile label="Challenges" value={`${sessionSummary.challengesCompleted}`} helper="Short, high-signal" />
        </View>
        <Body>
          {profile.displayName}, your strongest momentum today came from operational judgment and architecture trade-off quality.
        </Body>
      </SectionCard>

      <SectionCard>
        <Eyebrow>Fresh edge</Eyebrow>
        <Heading style={styles.sectionTitle}>{featuredFrontier.title}</Heading>
        <Body>{featuredFrontier.summary}</Body>
        <Body>{featuredFrontier.whyItMatters}</Body>
      </SectionCard>

      <SectionCard>
        <Eyebrow>Next build</Eyebrow>
        <Heading style={styles.sectionTitle}>{featuredMission.title}</Heading>
        <Body>{featuredMission.outcome}</Body>
        <Body>Fast reward: {featuredMission.reward}</Body>
      </SectionCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: 28,
    padding: spacing.xl,
    gap: spacing.md
  },
  sectionTitle: {
    fontSize: 24,
    lineHeight: 30
  },
  metricRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md
  },
  stack: {
    gap: spacing.sm
  },
  feedback: {
    gap: spacing.sm,
    backgroundColor: "#f5fbfa",
    borderRadius: 18,
    padding: spacing.md
  }
});
