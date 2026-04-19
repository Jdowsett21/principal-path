import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

import { phases } from "@/data/phases";
import { aiEngineeringUnits } from "@/data/units/ai-engineering";
import type { Unit, UnitStage, Phase } from "@/data/curriculum.types";

// ── Flat lesson list ────────────────────────────────────────────────

export type FlatLesson = {
  key: string; // "ai-eng-01:0"
  unitId: string;
  stageIndex: number;
  stage: UnitStage;
  unit: Unit;
  phase: Phase;
};

const allUnits: Unit[] = [...aiEngineeringUnits];

function buildFlatLessons(): FlatLesson[] {
  const sorted = [...allUnits].sort((a, b) => {
    const pa = phases.find((p) => p.id === a.phaseId);
    const pb = phases.find((p) => p.id === b.phaseId);
    const phaseOrder = (pa?.order ?? 0) - (pb?.order ?? 0);
    if (phaseOrder !== 0) return phaseOrder;
    return a.order - b.order;
  });

  const flat: FlatLesson[] = [];
  for (const unit of sorted) {
    const phase = phases.find((p) => p.id === unit.phaseId);
    if (!phase) continue;
    for (let i = 0; i < unit.stages.length; i++) {
      flat.push({
        key: `${unit.id}:${i}`,
        unitId: unit.id,
        stageIndex: i,
        stage: unit.stages[i]!,
        unit,
        phase,
      });
    }
  }
  return flat;
}

export const flatLessons = buildFlatLessons();

export function getUnit(unitId: string): Unit | undefined {
  return allUnits.find((u) => u.id === unitId);
}

// ── Persistence ─────────────────────────────────────────────────────

const PROGRESS_KEY = "career-builder.curriculum-progress.v1";

export type CurriculumProgressData = {
  completed: string[]; // list of FlatLesson keys
};

async function loadProgress(): Promise<CurriculumProgressData> {
  try {
    const raw = await AsyncStorage.getItem(PROGRESS_KEY);
    if (!raw) return { completed: [] };
    return JSON.parse(raw) as CurriculumProgressData;
  } catch {
    return { completed: [] };
  }
}

async function saveProgress(data: CurriculumProgressData): Promise<void> {
  await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(data));
}

// ── Hook ────────────────────────────────────────────────────────────

export function useCurriculumProgress() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadProgress().then((data) => {
      setCompleted(new Set(data.completed));
      setLoaded(true);
    });
  }, []);

  const markComplete = useCallback(
    async (key: string) => {
      setCompleted((prev) => {
        const next = new Set(prev);
        next.add(key);
        saveProgress({ completed: Array.from(next) });
        return next;
      });
    },
    []
  );

  const isComplete = useCallback(
    (key: string) => completed.has(key),
    [completed]
  );

  const nextLesson: FlatLesson | null =
    flatLessons.find((l) => !completed.has(l.key)) ?? null;

  const completedCount = flatLessons.filter((l) => completed.has(l.key)).length;

  return { loaded, completed, markComplete, isComplete, nextLesson, completedCount, total: flatLessons.length };
}
