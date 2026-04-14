import { useMemo, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Speech from "expo-speech";

import { ChoiceCard } from "@/components/ChoiceCard";
import { PillButton } from "@/components/PillButton";
import { ProgressBar } from "@/components/ProgressBar";
import { Screen } from "@/components/Screen";
import { SectionCard } from "@/components/SectionCard";
import { Body, Eyebrow, Heading, Label } from "@/components/Type";
import { useAppContext } from "@/store/AppContext";
import { palette } from "@/theme/palette";
import { spacing } from "@/theme/spacing";

type SessionStage = {
  id: string;
  label: string;
  detail: string;
  state: "ready" | "live" | "done";
};

function buildRecallPrompt(topic: string, fallback: string) {
  return `Can you explain ${topic.toLowerCase()} from memory, without reaching for notes? ${fallback}`;
}

export default function TodayScreen() {
  const {
    answerChallenge,
    buildMissions,
    challengeChoices,
    dailyChallenges,
    frontierBriefs,
    generateMissionFromFrontierId,
    lessonRecall,
    lessons,
    profile,
    rateLessonRecall,
    recommendations,
    selectedDailyLesson,
    sessionSummary,
    streak,
    weakSkill
  } = useAppContext();

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);

  const featuredChallenge = dailyChallenges[0]!;
  const selectedChoice = challengeChoices[featuredChallenge.id];
  const featuredFrontier = frontierBriefs[0]!;
  const featuredMission = buildMissions.find((mission) => mission.origin === "generated") ?? buildMissions[0]!;
  const recommendedNextMove = recommendations[0];

  const recallLessons = useMemo(() => {
    const lessonPriority = (lessonId: string) => {
      const status = lessonRecall[lessonId];
      if (status === "review") return 0;
      if (!status) return 1;
      return 2;
    };

    return [...lessons]
      .filter((lesson) => lesson.id !== selectedDailyLesson.id)
      .sort((a, b) => lessonPriority(a.id) - lessonPriority(b.id))
      .slice(0, 2);
  }, [lessonRecall, lessons, selectedDailyLesson.id]);

  const recallCoverage = recallLessons.filter((lesson) => lessonRecall[lesson.id]).length;

  const lessonScript = useMemo(() => {
    const parts = [
      selectedDailyLesson.spokenIntro,
      `Objective: ${selectedDailyLesson.objective}`,
      ...selectedDailyLesson.keyPoints.map((point) => `Key point: ${point}`),
      `Diagram cue: ${selectedDailyLesson.diagramCue}`,
      `Walk practice: ${selectedDailyLesson.walkPractice}`,
      selectedDailyLesson.spokenWrap
    ];

    return parts.join(" ");
  }, [selectedDailyLesson]);

  const startGuidedSession = () => {
    setSessionStarted(true);
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

  const createMissionFromFrontier = () => {
    generateMissionFromFrontierId(featuredFrontier.id);
    Alert.alert("Mission added", "Today's build mission queue now includes a new frontier-driven project brief.");
  };

  const stages: SessionStage[] = [
    {
      id: "walk",
      label: "Walk",
      detail: selectedDailyLesson.title,
      state: sessionStarted ? "live" : "ready"
    },
    {
      id: "recall",
      label: "Recall",
      detail: recallCoverage > 0 ? `${recallCoverage}/${recallLessons.length} touchpoints answered` : "Keep older lessons sticky",
      state: recallCoverage === recallLessons.length && recallLessons.length > 0 ? "done" : "ready"
    },
    {
      id: "decision",
      label: "Decision",
      detail: featuredChallenge.title,
      state: selectedChoice ? "done" : "ready"
    },
    {
      id: "Build",
      label: "Build",
      detail: featuredMission.title,
      state: "ready"
    }
  ];

  return (
    <Screen>
      <LinearGradient colors={["#11424a", "#0b5d66", "#d98f2b"]} end={{ x: 1, y: 1 }} style={styles.hero}>
        <View style={styles.heroTopRow}>
          <View style={styles.badge}>
            <Eyebrow style={styles.badgeText}>Principal Path</Eyebrow>
          </View>
          <View style={styles.metaPill}>
            <Label style={styles.metaText}>{streak.current} day streak</Label>
          </View>
        </View>

        <View style={styles.heroCopy}>
          <Heading style={styles.heroTitle}>One guided session. One sharper engineering instinct.</Heading>
          <Body style={styles.heroBody}>
            Today is tuned toward {weakSkill?.domain.replaceAll("_", " ") ?? "system design"} so the loop feels like a
            coached walk, not a noisy dashboard.
          </Body>
        </View>

        <View style={styles.heroStats}>
          <View style={styles.heroStat}>
            <Label style={styles.heroStatLabel}>Primary lesson</Label>
            <Heading style={styles.heroStatValue}>{selectedDailyLesson.durationMinutes} min</Heading>
            <Body style={styles.heroStatHelper}>{selectedDailyLesson.format}</Body>
          </View>
          <View style={styles.heroStat}>
            <Label style={styles.heroStatLabel}>Last session</Label>
            <Heading style={styles.heroStatValue}>{Math.round(sessionSummary.averageScore)}</Heading>
            <Body style={styles.heroStatHelper}>avg decision score</Body>
          </View>
        </View>

        <PillButton title={isSpeaking ? "Playing guided walk..." : "Start today's guided walk"} onPress={startGuidedSession} />
      </LinearGradient>

      <SectionCard style={styles.stageCard}>
        <View style={styles.stageHeader}>
          <View style={styles.headerCopy}>
            <Eyebrow>Session path</Eyebrow>
            <Heading style={styles.sectionTitle}>Launch, recall, apply, build</Heading>
          </View>
          <View style={styles.statusBubble}>
            <Label>{selectedChoice ? "Applied" : sessionStarted ? "In session" : "Ready to launch"}</Label>
          </View>
        </View>

        <View style={styles.stageRow}>
          {stages.map((stage) => (
            <View key={stage.id} style={styles.stagePill}>
              <View
                style={[
                  styles.stageDot,
                  stage.state === "live" && styles.stageDotLive,
                  stage.state === "done" && styles.stageDotDone
                ]}
              />
              <View style={styles.stageCopy}>
                <Label>{stage.label}</Label>
                <Body>{stage.detail}</Body>
              </View>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard style={styles.lessonCard}>
        <View style={styles.sectionHeader}>
          <View style={styles.headerCopy}>
            <Eyebrow>Stage 1</Eyebrow>
            <Heading style={styles.sectionTitle}>{selectedDailyLesson.title}</Heading>
            <Body>{selectedDailyLesson.objective}</Body>
          </View>
          <View style={styles.lessonMeta}>
            <View style={styles.infoPill}>
              <Label>{selectedDailyLesson.level}</Label>
            </View>
            <View style={styles.infoPill}>
              <Label>{selectedDailyLesson.durationMinutes} min</Label>
            </View>
          </View>
        </View>

        <View style={styles.focusBlock}>
          <Label>Spoken intro</Label>
          <Body>{selectedDailyLesson.spokenIntro}</Body>
        </View>

        <View style={styles.timeline}>
          {selectedDailyLesson.steps.map((step, index) => (
            <View key={step.title} style={styles.timelineItem}>
              <View style={styles.timelineRail}>
                <View style={styles.timelineIndex}>
                  <Label style={styles.timelineIndexText}>{index + 1}</Label>
                </View>
                {index < selectedDailyLesson.steps.length - 1 ? <View style={styles.timelineLine} /> : null}
              </View>
              <View style={styles.timelineCopy}>
                <Label>{step.title}</Label>
                <Body>{step.detail}</Body>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.promptGrid}>
          <View style={styles.promptCard}>
            <Label>Diagram cue</Label>
            <Body>{selectedDailyLesson.diagramCue}</Body>
          </View>
          <View style={styles.promptCard}>
            <Label>Walk practice</Label>
            <Body>{selectedDailyLesson.walkPractice}</Body>
          </View>
          <View style={styles.promptCard}>
            <Label>Reflection prompt</Label>
            <Body>{selectedDailyLesson.reflectionPrompt}</Body>
          </View>
        </View>

        <View style={styles.inlineActions}>
          <PillButton title={isSpeaking ? "Replay lesson" : "Play audio"} onPress={startGuidedSession} />
          <PillButton title="Stop audio" variant="secondary" onPress={stopLesson} />
        </View>
      </SectionCard>

      <SectionCard style={styles.recallCard}>
        <View style={styles.sectionHeader}>
          <View style={styles.headerCopy}>
            <Eyebrow>Stage 2</Eyebrow>
            <Heading style={styles.sectionTitle}>Retention touchpoints</Heading>
            <Body>Older lessons should keep dripping back until they feel automatic under pressure.</Body>
          </View>
          <View style={styles.recallMeter}>
            <Label>{recallCoverage}/{recallLessons.length} checked</Label>
            <ProgressBar value={recallLessons.length === 0 ? 0 : (recallCoverage / recallLessons.length) * 100} />
          </View>
        </View>

        <View style={styles.recallStack}>
          {recallLessons.map((lesson) => (
            <View key={lesson.id} style={styles.recallPrompt}>
              <View style={styles.recallPromptCopy}>
                <Label>{lesson.title}</Label>
                <Body>{buildRecallPrompt(lesson.title, lesson.keyPoints[0] ?? lesson.diagramCue)}</Body>
              </View>
              <View style={styles.recallActions}>
                <PillButton title="I remember it" variant="secondary" onPress={() => rateLessonRecall(lesson.id, "solid")} />
                <PillButton title="Bring it back soon" onPress={() => rateLessonRecall(lesson.id, "review")} />
              </View>
            </View>
          ))}
        </View>
      </SectionCard>

      <SectionCard style={styles.challengeCard}>
        <Eyebrow>Stage 3</Eyebrow>
        <Heading style={styles.sectionTitle}>{featuredChallenge.title}</Heading>
        <Body>{featuredChallenge.scenario}</Body>
        <Body>{featuredChallenge.prompt}</Body>

        <View style={styles.choiceStack}>
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
          <View style={styles.feedbackCard}>
            <Label>Decision captured</Label>
            <Body>{featuredChallenge.whyItMatters}</Body>
            <Body>Signals to remember: {featuredChallenge.idealSignals.join(" • ")}</Body>
          </View>
        ) : null}
      </SectionCard>

      <SectionCard style={styles.buildCard}>
        <View style={styles.sectionHeader}>
          <View style={styles.headerCopy}>
            <Eyebrow>Stage 4</Eyebrow>
            <Heading style={styles.sectionTitle}>{featuredMission.title}</Heading>
            <Body>{featuredMission.outcome}</Body>
          </View>
          <View style={styles.infoPill}>
            <Label>{featuredMission.durationMinutes} min mission</Label>
          </View>
        </View>

        <View style={styles.missionStack}>
          {featuredMission.steps.slice(0, 3).map((step) => (
            <View key={step.title} style={styles.missionStep}>
              <Label>{step.title}</Label>
              <Body>{step.detail}</Body>
            </View>
          ))}
        </View>

        <View style={styles.inlineActions}>
          <PillButton title="Add frontier-powered mission" onPress={createMissionFromFrontier} />
          <PillButton title="Why this topic now" variant="secondary" onPress={() => Alert.alert(featuredFrontier.title, featuredFrontier.whyItMatters)} />
        </View>
      </SectionCard>

      <SectionCard style={styles.nextMoveCard}>
        <Eyebrow>Next move</Eyebrow>
        <Heading style={styles.sectionTitle}>{recommendedNextMove?.title ?? "Keep your loop tight tomorrow"}</Heading>
        <Body>{recommendedNextMove?.reason ?? "Repeat the walk-decision-build loop until your weak areas stop feeling expensive."}</Body>
        <Body>
          {profile.displayName}, the goal is not just exposure. It is remembering the right concepts quickly enough to use them under real pressure.
        </Body>
      </SectionCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: 34,
    padding: spacing.xl,
    gap: spacing.lg
  },
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.md
  },
  badge: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs
  },
  badgeText: {
    color: palette.surfaceRaised
  },
  metaPill: {
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs
  },
  metaText: {
    color: palette.surfaceRaised
  },
  heroCopy: {
    gap: spacing.sm,
    maxWidth: 720
  },
  heroTitle: {
    color: palette.surfaceRaised,
    fontSize: 38,
    lineHeight: 44
  },
  heroBody: {
    color: "rgba(255,253,249,0.82)",
    fontSize: 16,
    lineHeight: 25
  },
  heroStats: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md
  },
  heroStat: {
    flex: 1,
    minWidth: 160,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 24,
    padding: spacing.md,
    gap: spacing.xs
  },
  heroStatLabel: {
    color: "rgba(255,253,249,0.7)"
  },
  heroStatValue: {
    color: palette.surfaceRaised,
    fontSize: 28,
    lineHeight: 32
  },
  heroStatHelper: {
    color: "rgba(255,253,249,0.8)"
  },
  stageCard: {
    backgroundColor: "#f7fcfb"
  },
  stageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: spacing.md,
    flexWrap: "wrap"
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: spacing.md,
    flexWrap: "wrap"
  },
  headerCopy: {
    flex: 1,
    minWidth: 240,
    gap: spacing.xs
  },
  statusBubble: {
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: palette.accentFog,
    borderWidth: 1,
    borderColor: palette.border
  },
  sectionTitle: {
    fontSize: 26,
    lineHeight: 31
  },
  stageRow: {
    gap: spacing.sm
  },
  stagePill: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "flex-start",
    borderRadius: 24,
    padding: spacing.md,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border
  },
  stageDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 6,
    backgroundColor: palette.borderStrong
  },
  stageDotLive: {
    backgroundColor: palette.accentWarm
  },
  stageDotDone: {
    backgroundColor: palette.success
  },
  stageCopy: {
    flex: 1,
    gap: spacing.xs
  },
  lessonCard: {
    backgroundColor: "#fffdf9"
  },
  lessonMeta: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  infoPill: {
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.borderStrong
  },
  focusBlock: {
    borderRadius: 24,
    padding: spacing.md,
    backgroundColor: palette.accentFog,
    borderWidth: 1,
    borderColor: palette.border,
    gap: spacing.xs
  },
  timeline: {
    gap: spacing.md
  },
  timelineItem: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "stretch"
  },
  timelineRail: {
    alignItems: "center"
  },
  timelineIndex: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.accentDeep
  },
  timelineIndexText: {
    color: palette.surfaceRaised
  },
  timelineLine: {
    width: 2,
    flex: 1,
    minHeight: 24,
    marginTop: spacing.xs,
    backgroundColor: palette.border
  },
  timelineCopy: {
    flex: 1,
    gap: spacing.xs,
    borderRadius: 22,
    padding: spacing.md,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border
  },
  promptGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md
  },
  promptCard: {
    flex: 1,
    minWidth: 220,
    borderRadius: 22,
    padding: spacing.md,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
    gap: spacing.xs
  },
  inlineActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  recallCard: {
    backgroundColor: "#fffaf4"
  },
  recallMeter: {
    width: 180,
    gap: spacing.sm
  },
  recallStack: {
    gap: spacing.md
  },
  recallPrompt: {
    borderRadius: 24,
    padding: spacing.md,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
    gap: spacing.md
  },
  recallPromptCopy: {
    gap: spacing.xs
  },
  recallActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  challengeCard: {
    backgroundColor: palette.surfaceRaised
  },
  choiceStack: {
    gap: spacing.sm
  },
  feedbackCard: {
    borderRadius: 22,
    padding: spacing.md,
    backgroundColor: palette.accentFog,
    borderWidth: 1,
    borderColor: palette.border,
    gap: spacing.xs
  },
  buildCard: {
    backgroundColor: "#fff9f1"
  },
  missionStack: {
    gap: spacing.md
  },
  missionStep: {
    borderRadius: 22,
    padding: spacing.md,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
    gap: spacing.xs
  },
  nextMoveCard: {
    backgroundColor: "#f7fcfb"
  }
});
