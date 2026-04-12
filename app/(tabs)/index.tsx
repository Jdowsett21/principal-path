import { useMemo, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import * as Speech from "expo-speech";
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

  const [isSpeaking, setIsSpeaking] = useState(false);

  const nextQuestion = onboardingQuestions.find((question) => !onboardingAnswers[question.id]);
  const featuredChallenge = dailyChallenges[0]!;
  const selectedChoice = challengeChoices[featuredChallenge.id];
  const featuredFrontier = frontierBriefs[0]!;
  const featuredMission = buildMissions.find((mission) => mission.origin === "generated") ?? buildMissions[0]!;

  const lessonScript = useMemo(() => {
    const partList = [
      selectedDailyLesson.spokenIntro,
      `Objective: ${selectedDailyLesson.objective}`,
      ...selectedDailyLesson.keyPoints.map((point) => `Key point: ${point}`),
      `Diagram cue: ${selectedDailyLesson.diagramCue}`,
      `Walk practice: ${selectedDailyLesson.walkPractice}`,
      selectedDailyLesson.spokenWrap
    ];

    return partList.join(" ");
  }, [selectedDailyLesson]);

  const speakLesson = () => {
    Speech.stop();
    setIsSpeaking(true);
    Speech.speak(lessonScript, {
      rate: 0.96,
      pitch: 1,
      onDone: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false)
    });
  };

  const stopLesson = () => {
    Speech.stop();
    setIsSpeaking(false);
  };

  return (
    <Screen>
      <LinearGradient colors={["#fff0ca", "#def0ed"]} style={styles.hero}>
        <View style={styles.heroTopRow}>
          <Eyebrow>Principal Path</Eyebrow>
          <Label>{streak.current} day streak</Label>
        </View>
        <Heading>Train engineering judgment while you walk.</Heading>
        <Body>
          {hasCompletedOnboarding
            ? `Today's focus is ${weakSkill?.domain.replaceAll("_", " ") ?? "architecture"} so we can close the biggest confidence gap next.`
            : "This first pass uses short, audio-first lessons that can be heard over headphones and answered with a few taps."}
        </Body>
        <View style={styles.metricRow}>
          <MetricTile label="Streak" value={`${streak.current} days`} helper="Momentum compounds" />
          <MetricTile label="Today's XP" value={`${sessionSummary.xpEarned}`} helper="From one full walk" />
        </View>
      </LinearGradient>

      {!hasCompletedOnboarding && nextQuestion ? (
        <SectionCard>
          <Eyebrow>Setup</Eyebrow>
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
        <View style={styles.lessonHeader}>
          <View style={styles.lessonHeaderCopy}>
            <Eyebrow>Walk session</Eyebrow>
            <Heading style={styles.sectionTitle}>{selectedDailyLesson.title}</Heading>
            <Body>{selectedDailyLesson.hook}</Body>
          </View>
          <View style={styles.pillStack}>
            <View style={styles.infoPill}>
              <Label>{selectedDailyLesson.durationMinutes} min</Label>
            </View>
            <View style={styles.infoPill}>
              <Label>{selectedDailyLesson.level}</Label>
            </View>
            <View style={styles.infoPill}>
              <Label>{selectedDailyLesson.format}</Label>
            </View>
          </View>
        </View>

        <View style={styles.actionRow}>
          <PillButton title={isSpeaking ? "Playing lesson..." : "Play lesson aloud"} onPress={speakLesson} />
          <PillButton title="Stop audio" variant="secondary" onPress={stopLesson} />
        </View>

        <View style={styles.sequence}>
          {selectedDailyLesson.steps.map((step, index) => (
            <View key={step.title} style={styles.sequenceItem}>
              <View style={styles.sequenceIndex}>
                <Label>{index + 1}</Label>
              </View>
              <View style={styles.sequenceCopy}>
                <Label>{step.title}</Label>
                <Body>{step.detail}</Body>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.callout}>
          <Label>Diagram cue</Label>
          <Body>{selectedDailyLesson.diagramCue}</Body>
        </View>

        <View style={styles.callout}>
          <Label>Walk practice</Label>
          <Body>{selectedDailyLesson.walkPractice}</Body>
        </View>

        <View style={styles.callout}>
          <Label>Reflection prompt</Label>
          <Body>{selectedDailyLesson.reflectionPrompt}</Body>
        </View>
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
          <MetricTile
            label="Avg score"
            value={`${Math.round(sessionSummary.averageScore)}`}
            helper="Across today's reps"
          />
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
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
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
  lessonHeader: {
    gap: spacing.md
  },
  lessonHeaderCopy: {
    gap: spacing.sm
  },
  pillStack: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  infoPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 999,
    backgroundColor: "#f3ede2",
    borderWidth: 1,
    borderColor: palette.border
  },
  actionRow: {
    flexDirection: "row",
    gap: spacing.sm,
    flexWrap: "wrap"
  },
  sequence: {
    gap: spacing.sm
  },
  sequenceItem: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "flex-start",
    padding: spacing.md,
    borderRadius: 18,
    backgroundColor: "#faf6ef",
    borderWidth: 1,
    borderColor: palette.border
  },
  sequenceIndex: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.ink
  },
  sequenceCopy: {
    flex: 1,
    gap: spacing.xs
  },
  callout: {
    gap: spacing.xs,
    padding: spacing.md,
    borderRadius: 18,
    backgroundColor: "#f5fbfa"
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
