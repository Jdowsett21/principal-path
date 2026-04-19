import { router } from "expo-router";
import type { FlatLesson } from "@/store/curriculumProgress";
import { flatLessons } from "@/store/curriculumProgress";

export function navigateToLesson(lesson: FlatLesson) {
  const { unitId, stageIndex, stage } = lesson;
  if (stage.type === "walk" || stage.type === "deep-dive") {
    router.push({
      pathname: "/unit-audio",
      params: { unitId, stageIndex: String(stageIndex) },
    });
  } else if (stage.type === "case-study") {
    router.push({
      pathname: "/case-study",
      params: { unitId, stageIndex: String(stageIndex) },
    });
  } else if (stage.type === "mastery-check") {
    router.push({
      pathname: "/mastery-check",
      params: { unitId, stageIndex: String(stageIndex) },
    });
  }
}

export function getNextLesson(currentKey: string): FlatLesson | null {
  const idx = flatLessons.findIndex((l) => l.key === currentKey);
  if (idx === -1 || idx + 1 >= flatLessons.length) return null;
  return flatLessons[idx + 1]!;
}
