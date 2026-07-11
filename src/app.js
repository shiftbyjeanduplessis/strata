const APP_VERSION = "STRATA v1.4.6";
const STORE_KEY = "strata:personal:v1";
const MEDIA_DB_NAME = "strata-personal-media-v1";
const MEDIA_STORE = "photos";

const PROGRAM = {
  upper: {
    id: "upper",
    title: "Upper Hypertrophy",
    day: "Monday",
    description: "Free-weight focused upper day with drop sets on isolation work.",
    exercises: [
      {
        id: "upper-bench",
        name: "Bench press",
        sets: 3,
        reps: "8–12",
        muscle: "Chest",
        type: "compound",
        variants: [
          { id: "barbell-bench", name: "Barbell bench press", loadLabel: "kg", loadMultiplier: 1 },
          { id: "dumbbell-bench", name: "Dumbbell bench press", loadLabel: "kg / hand", loadMultiplier: 2 }
        ]
      },
      {
        id: "upper-row",
        name: "Row",
        sets: 3,
        reps: "8–12",
        muscle: "Back",
        type: "compound",
        variants: [
          { id: "barbell-row", name: "Barbell row", loadLabel: "kg", loadMultiplier: 1 },
          { id: "dumbbell-row", name: "Dumbbell row", loadLabel: "kg / hand", loadMultiplier: 2 }
        ]
      },
      {
        id: "upper-shoulder-press",
        name: "Dumbbell shoulder press",
        sets: 3,
        reps: "8–12",
        muscle: "Shoulders",
        type: "compound",
        loadLabel: "kg / hand",
        loadMultiplier: 2
      },
      {
        id: "upper-pull",
        name: "Vertical pull",
        sets: 3,
        reps: "8–12",
        muscle: "Back",
        type: "compound",
        variants: [
          { id: "lat-pulldown", name: "Lat pulldown", loadLabel: "kg", loadMultiplier: 1 },
          { id: "pull-up", name: "Pull-up", loadLabel: "added kg", loadMultiplier: 1, volumeMode: "bodyweightAdded", allowZeroWeight: true }
        ]
      },
      {
        id: "upper-lateral-raise",
        name: "Dumbbell lateral raise",
        sets: 2,
        reps: "8–12 + drop",
        muscle: "Side delts",
        type: "isolation",
        drop: true,
        loadLabel: "kg / hand",
        loadMultiplier: 2
      },
      {
        id: "upper-triceps",
        name: "Triceps extension",
        sets: 2,
        reps: "8–12 + drop",
        muscle: "Triceps",
        type: "isolation",
        drop: true,
        variants: [
          { id: "cable-triceps", name: "Cable triceps extension", loadLabel: "kg", loadMultiplier: 1 },
          { id: "dumbbell-triceps", name: "Dumbbell triceps extension", loadLabel: "total kg", loadMultiplier: 1 }
        ]
      },
      {
        id: "upper-curl",
        name: "Bicep curl",
        sets: 2,
        reps: "8–12 + drop",
        muscle: "Biceps",
        type: "isolation",
        drop: true,
        variants: [
          { id: "dumbbell-curl", name: "Dumbbell bicep curl", loadLabel: "kg / hand", loadMultiplier: 2 },
          { id: "cable-curl", name: "Cable bicep curl", loadLabel: "kg", loadMultiplier: 1 }
        ]
      }
    ]
  },
  lower: {
    id: "lower",
    title: "Lower Hypertrophy",
    day: "Wednesday",
    description: "Lower day without squats: leg press, lunges, extensions, curls, back extensions and calves.",
    exercises: [
      { id: "lower-leg-press", name: "Leg press", sets: 3, reps: "8–12", muscle: "Quads", type: "machine", loadLabel: "kg", loadMultiplier: 1 },
      { id: "lower-lunges", name: "Walking lunges with sandbag", sets: 3, reps: "8–12 per leg", muscle: "Glutes / legs", type: "unilateral", loadLabel: "sandbag kg", loadMultiplier: 1, repMultiplier: 2 },
      { id: "lower-leg-extension", name: "Leg extension", sets: 3, reps: "8–12", muscle: "Quads", type: "isolation", loadLabel: "kg", loadMultiplier: 1 },
      {
        id: "lower-leg-curl",
        name: "Leg curl",
        sets: 3,
        reps: "8–12",
        muscle: "Hamstrings",
        type: "isolation",
        variants: [
          { id: "seated-leg-curl", name: "Seated leg curl", loadLabel: "kg", loadMultiplier: 1 },
          { id: "lying-leg-curl", name: "Lying leg curl", loadLabel: "kg", loadMultiplier: 1 }
        ]
      },
      { id: "lower-back-extension", name: "Back extension", sets: 3, reps: "10–15", muscle: "Posterior chain", type: "hinge", loadLabel: "added kg", loadMultiplier: 1, allowZeroWeight: true },
      {
        id: "lower-calf-raise",
        name: "Calf raise",
        sets: 3,
        reps: "10–15",
        muscle: "Calves",
        type: "isolation",
        variants: [
          { id: "standing-calf", name: "Standing calf raise", loadLabel: "kg", loadMultiplier: 1 },
          { id: "seated-calf", name: "Seated calf raise", loadLabel: "kg", loadMultiplier: 1 }
        ]
      }
    ]
  },
  strengthPush: {
    id: "strengthPush",
    title: "Strength Week 1 — Push",
    day: "Friday rotation",
    description: "Two barbell push lifts plus cable fly.",
    exercises: [
      { id: "strength-push-bench", name: "Barbell bench press", sets: 4, reps: "5–8", muscle: "Chest", type: "strength", loadLabel: "kg", loadMultiplier: 1 },
      { id: "strength-push-ohp", name: "Barbell overhead press", sets: 3, reps: "5–8", muscle: "Shoulders", type: "strength", loadLabel: "kg", loadMultiplier: 1 },
      { id: "strength-push-fly", name: "Standing cable fly", sets: 3, reps: "8–12", muscle: "Chest", type: "accessory", loadLabel: "kg", loadMultiplier: 1 }
    ]
  },
  strengthPull: {
    id: "strengthPull",
    title: "Strength Week 2 — Pull",
    day: "Friday rotation",
    description: "Deadlift, T-bar row and cable bicep curl.",
    exercises: [
      { id: "strength-pull-deadlift", name: "Deadlift", sets: 4, reps: "5–8", muscle: "Posterior chain", type: "strength", loadLabel: "kg", loadMultiplier: 1 },
      { id: "strength-pull-tbar", name: "T-bar row", sets: 3, reps: "6–10", muscle: "Back", type: "strength", loadLabel: "kg", loadMultiplier: 1 },
      { id: "strength-pull-curl", name: "Cable bicep curl", sets: 3, reps: "8–12", muscle: "Biceps", type: "accessory", loadLabel: "kg", loadMultiplier: 1 }
    ]
  },
  strengthLegs: {
    id: "strengthLegs",
    title: "Strength Week 3 — Legs",
    day: "Friday rotation",
    description: "Barbell hinge work plus cable pull-through.",
    exercises: [
      { id: "strength-legs-rdl", name: "Barbell Romanian deadlift", sets: 4, reps: "6–8", muscle: "Hamstrings", type: "strength", loadLabel: "kg", loadMultiplier: 1 },
      {
        id: "strength-legs-secondary",
        name: "Secondary hinge",
        sets: 3,
        reps: "8–10",
        muscle: "Posterior chain",
        type: "strength",
        variants: [
          { id: "good-morning", name: "Barbell good morning", loadLabel: "kg", loadMultiplier: 1 },
          { id: "hip-thrust", name: "Barbell hip thrust", loadLabel: "kg", loadMultiplier: 1 }
        ]
      },
      { id: "strength-legs-pullthrough", name: "Cable pull-through", sets: 3, reps: "10–12", muscle: "Glutes", type: "accessory", loadLabel: "kg", loadMultiplier: 1 }
    ]
  }
};

const ROUTE_TITLES = {
  today: "Today",
  training: "Training Strata",
  body: "Body Strata",
  physique: "Physique Strata",
  history: "History"
};

let state = loadState();
let route = "today";
let deferredInstallPrompt = null;
let restTimerInterval = null;
let restTimerEndAt = 0;
let audioContext = null;
let mediaDbPromise = null;
let activeObjectUrls = new Set();
let previewObjectUrls = new Map();
let sessionClockInterval = null;
let exerciseDialogMode = "add";
let exerciseDialogIndex = null;

const view = document.querySelector("#view");
const pageTitle = document.querySelector("#page-title");
const installBtn = document.querySelector("#install-btn");
const navButtons = Array.from(document.querySelectorAll(".nav-item"));
const appNotice = document.querySelector("#app-notice");
const restTimer = document.querySelector("#rest-timer");
const restTimerExercise = document.querySelector("#rest-timer-exercise");
const restTimerTime = document.querySelector("#rest-timer-time");
const restTimerStatus = document.querySelector("#rest-timer-status");
const restTimerDismiss = document.querySelector("#rest-timer-dismiss");
const addExerciseDialog = document.querySelector("#add-exercise-dialog");
const addExerciseForm = document.querySelector("#add-exercise-form");
const savedExerciseSelect = document.querySelector("#saved-exercise-select");
const exerciseHistoryDialog = document.querySelector("#exercise-history-dialog");
const exerciseHistoryContent = document.querySelector("#exercise-history-content");

function defaultState() {
  return {
    schemaVersion: 4,
    createdAt: new Date().toISOString(),
    settings: {
      name: "",
      startDate: todayISO(),
      fridayRotationIndex: 0,
      exerciseChoices: {},
      exerciseSetup: {},
      customExercises: [],
      workoutLayouts: {},
      effortScale: "rpe",
      lastBackupAt: null
    },
    weights: [],
    photoSets: [],
    sessions: [],
    activeSession: null,
    notes: []
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    const defaults = defaultState();
    return {
      ...defaults,
      ...parsed,
      settings: { ...defaults.settings, ...(parsed.settings || {}) }
    };
  } catch (error) {
    console.warn("Could not load STRATA state", error);
    return defaultState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
    return true;
  } catch (error) {
    console.error("Could not save STRATA state", error);
    showNotice("STRATA could not save your latest change. Export a backup and check browser storage.", "danger", 0);
    return false;
  }
}


function normalizeExistingData() {
  state.settings = { ...defaultState().settings, ...(state.settings || {}) };
  state.weights = Array.isArray(state.weights) ? state.weights : [];
  state.photoSets = Array.isArray(state.photoSets) ? state.photoSets : [];
  state.settings.workoutLayouts = state.settings.workoutLayouts || {};
  state.sessions = Array.isArray(state.sessions) ? state.sessions : [];
  const sessions = [...state.sessions, ...(state.activeSession ? [state.activeSession] : [])];
  sessions.forEach((session) => {
    session.logs = Array.isArray(session.logs) ? session.logs : [];
    session.logs.forEach((log) => {
      log.loadLabel = log.loadLabel || "kg";
      log.loadMultiplier = Number(log.loadMultiplier || 1);
      log.repMultiplier = Number(log.repMultiplier || 1);
      log.volumeMode = log.volumeMode || "external";
      log.bodyweight = Number(log.bodyweight || session.bodyweight || 0);
      log.feedback = log.feedback || { target: "", joints: "", execution: "" };
      (log.sets || []).forEach((set, setIndex) => {
        if (set.completed === undefined) set.completed = (set.rir !== "" && set.rir !== undefined) || (set.rpe !== "" && set.rpe !== undefined);
        set.setType = set.setType || (setIndex === 0 && log.type === "strength" ? "top" : "work");
        if (set.rpe === undefined) set.rpe = "";
      });
      if (log.drop) {
        if (log.drop.completed === undefined) log.drop.completed = (log.drop.rir !== "" && log.drop.rir !== undefined) || (log.drop.rpe !== "" && log.drop.rpe !== undefined);
        log.drop.setType = "drop";
        if (log.drop.rpe === undefined) log.drop.rpe = "";
      }
    });
  });
}

function showNotice(message, tone = "info", timeout = 4200) {
  if (!appNotice) return;
  appNotice.textContent = message;
  appNotice.className = `app-notice ${tone}`;
  appNotice.hidden = false;
  if (timeout) {
    window.setTimeout(() => {
      if (appNotice.textContent === message) appNotice.hidden = true;
    }, timeout);
  }
}

function todayISO() {
  return localDateISO(new Date());
}

function localDateISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function niceDate(value) {
  if (!value) return "—";
  return new Date(`${value}T12:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function niceDateTime(value) {
  if (!value) return "Not yet";
  return new Date(value).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

function weekdayIndex() {
  return new Date().getDay();
}

function kg(value) {
  const number = Number(value || 0);
  return number.toLocaleString(undefined, { maximumFractionDigits: 1 });
}

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function setRoute(nextRoute) {
  releaseObjectUrls();
  route = nextRoute;
  pageTitle.textContent = ROUTE_TITLES[route] || "STRATA";
  navButtons.forEach((button) => button.classList.toggle("active", button.dataset.route === route));
  syncShellMode();
  render();
}

function syncShellMode() {
  document.body.classList.toggle("workout-mode", Boolean(state.activeSession && route === "training"));
  if (!(state.activeSession && route === "training")) stopSessionClock();
}

navButtons.forEach((button) => button.addEventListener("click", () => setRoute(button.dataset.route)));

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installBtn.hidden = false;
});

installBtn?.addEventListener("click", async () => {
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  installBtn.hidden = true;
});

function getTodaysWorkoutKey() {
  const day = weekdayIndex();
  if (day === 1) return "upper";
  if (day === 3) return "lower";
  if (day === 5) return fridayWorkoutKey();
  return null;
}

function getNextScheduledWorkout() {
  const now = new Date();
  const today = now.getDay();
  const schedule = [
    { day: 1, workoutId: "upper" },
    { day: 3, workoutId: "lower" },
    { day: 5, workoutId: fridayWorkoutKey() }
  ];
  let best = null;
  for (const item of schedule) {
    let offset = (item.day - today + 7) % 7;
    if (offset === 0 && !getTodaysWorkoutKey()) offset = 7;
    if (!best || offset < best.offset) best = { ...item, offset };
  }
  const date = new Date(now);
  date.setDate(now.getDate() + best.offset);
  return { workout: PROGRAM[best.workoutId], date: localDateISO(date), offset: best.offset };
}

function fridayWorkoutKey() {
  const keys = ["strengthPush", "strengthPull", "strengthLegs"];
  return keys[state.settings.fridayRotationIndex % keys.length];
}

function getLatestWeight() {
  return [...state.weights].sort((a, b) => b.date.localeCompare(a.date))[0] || null;
}

function getWeightForDate(date) {
  return state.weights.find((entry) => entry.date === date);
}

function latestPhotoSet() {
  return [...state.photoSets].sort((a, b) => b.date.localeCompare(a.date))[0] || null;
}

function daysSince(date) {
  if (!date) return Infinity;
  const start = new Date(`${date}T00:00:00`).getTime();
  const now = new Date(`${todayISO()}T00:00:00`).getTime();
  return Math.floor((now - start) / 86400000);
}

function currentWeekSessions() {
  const now = new Date();
  const day = now.getDay() || 7;
  const monday = new Date(now);
  monday.setHours(12, 0, 0, 0);
  monday.setDate(now.getDate() - day + 1);
  const start = localDateISO(monday);
  return state.sessions.filter((session) => session.date >= start);
}

function previousSession(workoutId, excludeId = null) {
  return [...state.sessions]
    .filter((session) => session.workoutId === workoutId && session.id !== excludeId)
    .sort((a, b) => String(b.completedAt || "").localeCompare(String(a.completedAt || "")))[0] || null;
}

function getSelectedVariant(exercise) {
  if (!exercise.variants?.length) {
    return {
      id: exercise.id,
      name: exercise.name,
      loadLabel: exercise.loadLabel || "kg",
      loadMultiplier: exercise.loadMultiplier ?? 1,
      repMultiplier: exercise.repMultiplier ?? 1,
      volumeMode: exercise.volumeMode || "external",
      allowZeroWeight: Boolean(exercise.allowZeroWeight)
    };
  }
  const chosenId = state.settings.exerciseChoices?.[exercise.id];
  const variant = exercise.variants.find((item) => item.id === chosenId) || exercise.variants[0];
  return {
    id: variant.id,
    name: variant.name,
    loadLabel: variant.loadLabel || "kg",
    loadMultiplier: variant.loadMultiplier ?? 1,
    repMultiplier: variant.repMultiplier ?? exercise.repMultiplier ?? 1,
    volumeMode: variant.volumeMode || exercise.volumeMode || "external",
    allowZeroWeight: Boolean(variant.allowZeroWeight ?? exercise.allowZeroWeight)
  };
}


function exerciseIdentity(item) {
  return String(item?.variantId || item?.exerciseId || item?.id || item?.name || "").trim().toLowerCase();
}

function loadModeFromValues(loadLabel, loadMultiplier, repMultiplier, volumeMode, allowZeroWeight) {
  if (volumeMode === "bodyweightAdded") return "bodyweightAdded";
  if (Number(loadMultiplier) === 2) return "pair";
  if (Number(repMultiplier) === 2) return "perLeg";
  if (allowZeroWeight || String(loadLabel || "").includes("added")) return "external";
  return "total";
}

function blueprintFromProgramExercise(exercise) {
  const variant = getSelectedVariant(exercise);
  return {
    exerciseId: exercise.id,
    variantId: variant.id,
    custom: false,
    name: variant.name,
    muscle: exercise.muscle || "Other",
    type: exercise.type || "isolation",
    sets: Number(exercise.sets || 3),
    reps: exercise.reps || "8–12",
    loadLabel: variant.loadLabel || "kg",
    loadMultiplier: Number(variant.loadMultiplier || 1),
    repMultiplier: Number(variant.repMultiplier || 1),
    volumeMode: variant.volumeMode || "external",
    allowZeroWeight: Boolean(variant.allowZeroWeight),
    restSeconds: Number(exercise.restSeconds || defaultRestSeconds(exercise.type)),
    plannedDrop: Boolean(exercise.drop)
  };
}

function blueprintFromCustomExercise(exercise) {
  const volume = loadModeConfig(exercise.loadMode || "total");
  return {
    exerciseId: exercise.id,
    variantId: exercise.id,
    custom: true,
    name: exercise.name,
    muscle: exercise.muscle || "Other",
    type: exercise.type || "isolation",
    sets: Number(exercise.sets || 3),
    reps: exercise.reps || "8–12",
    loadLabel: volume.loadLabel,
    loadMultiplier: Number(volume.loadMultiplier || 1),
    repMultiplier: Number(volume.repMultiplier || 1),
    volumeMode: volume.volumeMode || "external",
    allowZeroWeight: Boolean(volume.allowZeroWeight),
    restSeconds: Number(exercise.restSeconds || defaultRestSeconds(exercise.type)),
    plannedDrop: Boolean(exercise.plannedDrop)
  };
}

function blueprintFromLog(log) {
  return {
    exerciseId: log.exerciseId,
    variantId: log.variantId,
    custom: Boolean(log.custom),
    name: log.name,
    muscle: log.muscle || "Other",
    type: log.type || "isolation",
    sets: Number(log.targetSets || (log.sets || []).filter((set) => set.setType !== "warmup").length || 1),
    reps: log.targetReps || "8–12",
    loadLabel: log.loadLabel || "kg",
    loadMultiplier: Number(log.loadMultiplier || 1),
    repMultiplier: Number(log.repMultiplier || 1),
    volumeMode: log.volumeMode || "external",
    allowZeroWeight: Boolean(log.allowZeroWeight),
    restSeconds: Number(log.restSeconds || defaultRestSeconds(log.type)),
    plannedDrop: Boolean(log.plannedDrop)
  };
}

function getWorkoutBlueprints(workoutId) {
  const saved = state.settings.workoutLayouts?.[workoutId];
  if (Array.isArray(saved) && saved.length) return saved.map((item) => ({ ...item }));
  return (PROGRAM[workoutId]?.exercises || []).map(blueprintFromProgramExercise);
}

function saveActiveWorkoutLayout() {
  if (!state.activeSession) return;
  state.settings.workoutLayouts = state.settings.workoutLayouts || {};
  state.settings.workoutLayouts[state.activeSession.workoutId] = state.activeSession.logs.map(blueprintFromLog);
}

function exerciseLibraryItems() {
  const items = [];
  Object.values(PROGRAM).forEach((workout) => {
    (workout.exercises || []).forEach((exercise) => {
      if (exercise.variants?.length) {
        exercise.variants.forEach((variant) => {
          items.push({
            ...blueprintFromProgramExercise({ ...exercise, variants: [variant] }),
            libraryLabel: `${variant.name} · ${exercise.muscle}`
          });
        });
      } else {
        const item = blueprintFromProgramExercise(exercise);
        items.push({ ...item, libraryLabel: `${item.name} · ${item.muscle}` });
      }
    });
  });
  (state.settings.customExercises || []).forEach((exercise) => {
    const item = blueprintFromCustomExercise(exercise);
    items.push({ ...item, libraryLabel: `${item.name} · ${item.muscle}` });
  });
  const seen = new Set();
  return items.filter((item) => {
    const key = exerciseIdentity(item);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).sort((a, b) => String(a.name).localeCompare(String(b.name)));
}

function exerciseHistoryEntries(target) {
  const key = exerciseIdentity(target);
  if (!key) return [];
  return state.sessions
    .flatMap((session) => (session.logs || [])
      .filter((log) => exerciseIdentity(log) === key)
      .map((log) => ({ session, log })))
    .sort((a, b) => String(b.session.completedAt || "").localeCompare(String(a.session.completedAt || "")));
}

function latestExerciseHistoryLog(target) {
  return exerciseHistoryEntries(target)[0]?.log || null;
}

function buildSessionLog(blueprint, bodyweight) {
  const previousLog = latestExerciseHistoryLog(blueprint);
  const previousWarmups = (previousLog?.sets || []).filter((set) => set.setType === "warmup");
  const previousWorking = (previousLog?.sets || []).filter((set) => set.setType !== "warmup");
  const warmupCount = defaultWarmupSetCount(blueprint.type);
  const warmupSets = Array.from({ length: warmupCount }, (_, setIndex) => ({
    weight: previousWarmups?.[setIndex]?.weight ?? "",
    reps: "",
    rir: "",
    rpe: "",
    setType: "warmup",
    completed: false,
    previousWeight: previousWarmups?.[setIndex]?.weight ?? "",
    previousReps: previousWarmups?.[setIndex]?.reps ?? ""
  }));
  const workingSets = Array.from({ length: Number(blueprint.sets || 3) }, (_, setIndex) => ({
    weight: previousWorking?.[setIndex]?.weight ?? "",
    reps: "",
    rir: "",
    rpe: "",
    setType: previousWorking?.[setIndex]?.setType || (setIndex === 0 && blueprint.type === "strength" ? "top" : "work"),
    completed: false,
    previousWeight: previousWorking?.[setIndex]?.weight ?? "",
    previousReps: previousWorking?.[setIndex]?.reps ?? ""
  }));
  return {
    exerciseId: blueprint.exerciseId,
    variantId: blueprint.variantId || blueprint.exerciseId,
    custom: Boolean(blueprint.custom),
    name: blueprint.name,
    muscle: blueprint.muscle || "Other",
    type: blueprint.type || "isolation",
    targetSets: Number(blueprint.sets || 3),
    targetReps: blueprint.reps || "8–12",
    loadLabel: blueprint.loadLabel || "kg",
    loadMultiplier: Number(blueprint.loadMultiplier || 1),
    repMultiplier: Number(blueprint.repMultiplier || 1),
    volumeMode: blueprint.volumeMode || "external",
    allowZeroWeight: Boolean(blueprint.allowZeroWeight),
    bodyweight: Number(bodyweight || 0),
    restSeconds: Number(blueprint.restSeconds || defaultRestSeconds(blueprint.type)),
    plannedDrop: Boolean(blueprint.plannedDrop),
    drop: blueprint.plannedDrop ? {
      weight: previousLog?.drop?.weight ?? "",
      reps: "",
      rir: "",
      rpe: "",
      setType: "drop",
      completed: false,
      previousWeight: previousLog?.drop?.weight ?? "",
      previousReps: previousLog?.drop?.reps ?? ""
    } : null,
    feedback: { target: "", joints: "", execution: "" },
    setupNote: state.settings.exerciseSetup?.[blueprint.variantId || blueprint.exerciseId] || "",
    sets: [...warmupSets, ...workingSets]
  };
}

function findPreviousLog(session, exerciseId, variantId, name) {
  if (!session?.logs) return null;
  return session.logs.find((log) => {
    if (log.exerciseId && exerciseId) {
      return log.exerciseId === exerciseId && (!log.variantId || !variantId || log.variantId === variantId);
    }
    return log.name === name;
  }) || null;
}

function calcSetVolume(set, log) {
  if (!set?.completed) return 0;
  const reps = Number(set.reps || 0);
  if (!reps) return 0;
  const enteredLoad = Number(set.weight || 0);
  const load = log.volumeMode === "bodyweightAdded"
    ? Number(log.bodyweight || 0) + enteredLoad
    : enteredLoad;
  return load * reps * Number(log.loadMultiplier || 1) * Number(log.repMultiplier || 1);
}

function calcExerciseVolume(log) {
  const regular = (log.sets || [])
    .filter((set) => set.setType !== "warmup")
    .reduce((sum, set) => sum + calcSetVolume(set, log), 0);
  const drop = log.drop ? calcSetVolume(log.drop, log) : 0;
  return regular + drop;
}

function calcSessionVolume(session) {
  return (session.logs || []).reduce((sum, log) => sum + calcExerciseVolume(log), 0);
}

function lastExerciseVolume(log, workoutId) {
  const found = latestExerciseHistoryLog(log);
  return found ? calcExerciseVolume(found) : 0;
}

function countPlannedSets(session) {
  return (session.logs || []).reduce((sum, log) => sum + (log.sets?.length || 0) + (log.drop ? 1 : 0), 0);
}

function countCompletedSets(session) {
  return (session.logs || []).reduce((sum, log) => {
    const regular = (log.sets || []).filter((set) => set.completed).length;
    return sum + regular + (log.drop?.completed ? 1 : 0);
  }, 0);
}

const SET_TYPES = [
  { id: "warmup", short: "WU", label: "Warm-up" },
  { id: "work", short: "W", label: "Working" },
  { id: "top", short: "T", label: "Top set" },
  { id: "backoff", short: "B", label: "Back-off" },
  { id: "restpause", short: "RP", label: "Rest-pause" },
  { id: "myorep", short: "MYO", label: "Myo-rep" }
];

function setTypeInfo(type) {
  return SET_TYPES.find((item) => item.id === type) || SET_TYPES[1];
}

function defaultWarmupSetCount(type) {
  if (type === "strength") return 3;
  if (["compound", "hinge", "machine"].includes(type)) return 1;
  return 0;
}

function effortAsRir(set) {
  if (!set) return 0;
  if (set.rir !== "" && set.rir !== undefined) return set.rir === "4+" ? 4 : Number(set.rir || 0);
  if (set.rpe !== "" && set.rpe !== undefined) return Math.max(0, Math.min(4, 10 - Number(set.rpe || 10)));
  return 0;
}

function isHardSet(set) {
  return Boolean(set?.completed && set.setType !== "warmup");
}

function countHardSets(session) {
  return (session.logs || []).reduce((sum, log) => sum + (log.sets || []).filter(isHardSet).length + (log.drop?.completed ? 1 : 0), 0);
}

function completedExercise(log) {
  const planned = (log.sets?.length || 0) + (log.drop ? 1 : 0);
  const done = (log.sets || []).filter((set) => set.completed).length + (log.drop?.completed ? 1 : 0);
  return planned > 0 && done >= planned;
}

function matchedProgress(log, previousLog) {
  if (!previousLog) return { tone: "neutral", label: "First recorded session", detail: "Build your baseline today." };
  const currentSets = (log.sets || []).filter(isHardSet);
  const priorSets = (previousLog.sets || []).filter(isHardSet);
  const matchCount = Math.min(currentSets.length, priorSets.length);
  if (!matchCount) return { tone: "neutral", label: "No matched hard sets yet", detail: "Complete working sets to compare." };
  let improved = 0;
  let maintained = 0;
  let loadWins = 0;
  let repWins = 0;
  let rirWins = 0;
  for (let i = 0; i < matchCount; i += 1) {
    const current = currentSets[i];
    const prior = priorSets[i];
    const cw = Number(current.weight || 0);
    const pw = Number(prior.weight || 0);
    const cr = Number(current.reps || 0);
    const pr = Number(prior.reps || 0);
    const cRir = effortAsRir(current);
    const pRir = effortAsRir(prior);
    if (cw > pw && cr >= pr - 1 && cRir >= pRir - 1) { improved += 1; loadWins += 1; continue; }
    if (cw === pw && cr > pr && cRir >= pRir - 1) { improved += 1; repWins += 1; continue; }
    if (cw === pw && cr === pr && cRir > pRir) { improved += 1; rirWins += 1; continue; }
    if (cw === pw && cr === pr && cRir === pRir) maintained += 1;
  }
  const parts = [];
  if (loadWins) parts.push(`${loadWins} load`);
  if (repWins) parts.push(`${repWins} rep`);
  if (rirWins) parts.push(`${rirWins} RIR`);
  if (improved) return { tone: "positive", label: `${improved}/${matchCount} matched sets progressed`, detail: `${parts.join(" · ")} improvement${improved === 1 ? "" : "s"}.` };
  if (maintained === matchCount) return { tone: "neutral", label: `Performance maintained`, detail: `${matchCount} matched hard set${matchCount === 1 ? "" : "s"}.` };
  return { tone: "negative", label: `Below previous matched performance`, detail: `Review load, reps, RIR and recovery before changing the plan.` };
}


function hardSetsForLog(log) {
  const sets = (log.sets || []).filter(isHardSet);
  if (log.drop?.completed) sets.push(log.drop);
  return sets;
}

function setRpeValue(set) {
  if (set?.rpe !== "" && set?.rpe !== undefined) return Number(set.rpe);
  if (set?.rir !== "" && set?.rir !== undefined) {
    const rir = set.rir === "4+" ? 4 : Number(set.rir || 0);
    return Math.max(6, 10 - rir);
  }
  return null;
}

function adjustedSetLoad(set, log) {
  const entered = Number(set?.weight || 0);
  const base = log.volumeMode === "bodyweightAdded" ? Number(log.bodyweight || 0) + entered : entered;
  return base * Number(log.loadMultiplier || 1);
}

function setPerformanceScore(set, log) {
  const load = adjustedSetLoad(set, log);
  const reps = Number(set?.reps || 0);
  return load * (1 + reps / 30);
}

function bestSetForLog(log) {
  return hardSetsForLog(log).reduce((best, set) => {
    if (!best || setPerformanceScore(set, log) > setPerformanceScore(best, log)) return set;
    return best;
  }, null);
}

function formatEffort(set) {
  if (!set) return "";
  if (set.rpe !== "" && set.rpe !== undefined) return `RPE ${set.rpe}`;
  if (set.rir !== "" && set.rir !== undefined) return `RIR ${set.rir}`;
  return "Effort not logged";
}

function formatSetResult(set, log) {
  if (!set) return "—";
  const load = set.weight === "" || set.weight === undefined ? "—" : `${set.weight} ${log.loadLabel || "kg"}`;
  return `${load} × ${set.reps || "—"}${formatEffort(set) ? ` · ${formatEffort(set)}` : ""}`;
}

function averageRpeForSets(sets) {
  const values = sets.map(setRpeValue).filter((value) => Number.isFinite(value));
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null;
}

function exerciseHistoryStats(target) {
  const entries = exerciseHistoryEntries(target);
  const recent = entries.slice(0, 5);
  const allSets = entries.flatMap(({ log }) => hardSetsForLog(log).map((set) => ({ set, log })));
  const best = allSets.reduce((winner, item) => {
    if (!winner || setPerformanceScore(item.set, item.log) > setPerformanceScore(winner.set, winner.log)) return item;
    return winner;
  }, null);
  const latest = entries[0];
  const prior = entries[1];
  const progression = latest ? matchedProgress(latest.log, prior?.log || null) : null;
  let matchedLoad = null;
  let matchedReps = null;
  if (latest) {
    const latestBest = bestSetForLog(latest.log);
    if (latestBest) {
      const load = Number(latestBest.weight || 0);
      const reps = Number(latestBest.reps || 0);
      const olderSets = entries.slice(1).flatMap(({ log }) => hardSetsForLog(log).map((set) => ({ set, log })));
      const sameLoad = olderSets.filter(({ set }) => Number(set.weight || 0) === load).sort((a, b) => Number(b.set.reps || 0) - Number(a.set.reps || 0))[0];
      const sameReps = olderSets.filter(({ set }) => Number(set.reps || 0) === reps).sort((a, b) => Number(b.set.weight || 0) - Number(a.set.weight || 0))[0];
      if (sameLoad) matchedLoad = { load, previousReps: Number(sameLoad.set.reps || 0), currentReps: reps };
      if (sameReps) matchedReps = { reps, previousLoad: Number(sameReps.set.weight || 0), currentLoad: load };
    }
  }
  return { entries, recent, best, latest, prior, progression, matchedLoad, matchedReps };
}

function openExerciseHistoryByTarget(target) {
  if (!exerciseHistoryDialog || !exerciseHistoryContent) return;
  const stats = exerciseHistoryStats(target);
  const name = stats.latest?.log?.name || target?.name || "Exercise";
  const muscle = stats.latest?.log?.muscle || target?.muscle || "";
  const maxVolume = Math.max(1, ...stats.recent.map(({ log }) => calcExerciseVolume(log)));
  exerciseHistoryContent.innerHTML = `
    <header class="history-dialog-head">
      <div><span>EXERCISE HISTORY</span><h2>${escapeHtml(name)}</h2><p>${escapeHtml(muscle)} · ${stats.entries.length} recorded session${stats.entries.length === 1 ? "" : "s"}</p></div>
      <button class="dialog-close" data-action="close-history-dialog" type="button" aria-label="Close">×</button>
    </header>
    ${stats.latest ? `
      <section class="history-signal ${stats.progression?.tone || "neutral"}">
        <span>LATEST SIGNAL</span><strong>${escapeHtml(stats.progression?.label || "Baseline")}</strong><p>${escapeHtml(stats.progression?.detail || "Build more sessions to reveal the trend.")}</p>
      </section>
      <section class="history-metrics-grid">
        <div><span>BEST SET</span><strong>${stats.best ? escapeHtml(formatSetResult(stats.best.set, stats.best.log)) : "—"}</strong></div>
        <div><span>AVG EFFORT</span><strong>${(() => { const avg = averageRpeForSets(stats.latest ? hardSetsForLog(stats.latest.log) : []); return avg !== null ? `RPE ${avg.toFixed(1)}` : "—"; })()}</strong></div>
        <div><span>MATCHED LOAD</span><strong>${stats.matchedLoad ? `${stats.matchedLoad.load} kg: ${stats.matchedLoad.previousReps} → ${stats.matchedLoad.currentReps} reps` : "Need a repeated load"}</strong></div>
        <div><span>MATCHED REPS</span><strong>${stats.matchedReps ? `${stats.matchedReps.reps} reps: ${stats.matchedReps.previousLoad} → ${stats.matchedReps.currentLoad} kg` : "Need a repeated rep count"}</strong></div>
      </section>
    ` : `<p class="muted">No completed history for this exercise yet.</p>`}
    <section class="exercise-history-chart">
      <header><span>LAST FIVE SESSIONS</span><strong>Completed-set volume</strong></header>
      <div class="history-bars">${stats.recent.slice().reverse().map(({ session, log }) => {
        const volume = calcExerciseVolume(log);
        const height = Math.max(8, Math.round((volume / maxVolume) * 100));
        return `<div><i style="--history-height:${height}%"></i><small>${new Date(`${session.date}T12:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</small><b>${kg(volume)}</b></div>`;
      }).join("") || `<p class="muted">No sessions yet.</p>`}</div>
    </section>
    <section class="history-session-list">
      ${stats.recent.map(({ session, log }) => {
        const best = bestSetForLog(log);
        const avg = averageRpeForSets(hardSetsForLog(log));
        return `<article><div><span>${niceDate(session.date)}</span><strong>${formatSetResult(best, log)}</strong></div><div><b>${kg(calcExerciseVolume(log))} kg</b><small>${hardSetsForLog(log).length} hard sets${avg !== null ? ` · RPE ${avg.toFixed(1)}` : ""}</small></div></article>`;
      }).join("")}
    </section>
  `;
  exerciseHistoryContent.querySelector("[data-action='close-history-dialog']")?.addEventListener("click", closeExerciseHistoryDialog);
  if (typeof exerciseHistoryDialog.showModal === "function") exerciseHistoryDialog.showModal();
  else exerciseHistoryDialog.setAttribute("open", "");
}

function openExerciseHistory(index) {
  const log = state.activeSession?.logs?.[index];
  if (log) openExerciseHistoryByTarget(log);
}

function closeExerciseHistoryDialog() {
  if (!exerciseHistoryDialog) return;
  if (typeof exerciseHistoryDialog.close === "function") exerciseHistoryDialog.close();
  else exerciseHistoryDialog.removeAttribute("open");
}

function progressionCounts(session, beforeIso = null) {
  const counts = { positive: 0, neutral: 0, negative: 0, baseline: 0 };
  (session.logs || []).forEach((log) => {
    const histories = exerciseHistoryEntries(log).filter(({ session: item }) => item.id !== session.id && (!beforeIso || String(item.completedAt || "") < beforeIso));
    const previousLog = histories[0]?.log || null;
    if (!previousLog) counts.baseline += 1;
    else counts[matchedProgress(log, previousLog).tone] += 1;
  });
  return counts;
}

function sessionBestSet(session) {
  return (session.logs || []).flatMap((log) => hardSetsForLog(log).map((set) => ({ set, log }))).reduce((best, item) => {
    if (!best || setPerformanceScore(item.set, item.log) > setPerformanceScore(best.set, best.log)) return item;
    return best;
  }, null);
}

function exerciseDropoffPercent(log) {
  const sets = hardSetsForLog(log);
  if (sets.length < 2) return null;
  const first = calcSetVolume(sets[0], log);
  const last = calcSetVolume(sets[sets.length - 1], log);
  if (!first) return null;
  return ((first - last) / first) * 100;
}

function sessionDropoffPercent(session) {
  const values = (session.logs || []).map(exerciseDropoffPercent).filter((value) => Number.isFinite(value));
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null;
}

function sessionAverageRpe(session) {
  return averageRpeForSets((session.logs || []).flatMap(hardSetsForLog));
}

function sessionJointFlags(session) {
  return (session.logs || []).filter((log) => ["mild", "problem"].includes(log.feedback?.joints));
}

function sessionMuscleBreakdown(session) {
  const map = new Map();
  (session.logs || []).forEach((log) => {
    const muscle = log.muscle || "Other";
    map.set(muscle, (map.get(muscle) || 0) + hardSetsForLog(log).length);
  });
  return [...map.entries()].sort((a, b) => b[1] - a[1]);
}

function currentWeekStartISO() {
  const now = new Date();
  const day = now.getDay() || 7;
  const monday = new Date(now);
  monday.setHours(12, 0, 0, 0);
  monday.setDate(now.getDate() - day + 1);
  return localDateISO(monday);
}

function plannedWeeklyWorkouts() {
  const weekSessions = currentWeekSessions();
  const completedFriday = weekSessions.find((session) => String(session.workoutId).startsWith("strength"));
  return ["upper", "lower", completedFriday?.workoutId || fridayWorkoutKey()];
}

function weeklyMuscleWorkload() {
  const start = currentWeekStartISO();
  const sessions = state.sessions.filter((session) => session.date >= start);
  if (state.activeSession && state.activeSession.date >= start) sessions.push(state.activeSession);
  const completed = new Map();
  sessions.forEach((session) => {
    (session.logs || []).forEach((log) => {
      const muscle = log.muscle || "Other";
      const item = completed.get(muscle) || { completed: 0, efforts: [], dates: new Set() };
      const hard = hardSetsForLog(log);
      item.completed += hard.length;
      item.efforts.push(...hard.map(setRpeValue).filter((value) => Number.isFinite(value)));
      if (hard.length) item.dates.add(session.date);
      completed.set(muscle, item);
    });
  });
  const planned = new Map();
  plannedWeeklyWorkouts().forEach((workoutId) => {
    getWorkoutBlueprints(workoutId).forEach((blueprint) => {
      const muscle = blueprint.muscle || "Other";
      planned.set(muscle, (planned.get(muscle) || 0) + Number(blueprint.sets || 0) + (blueprint.plannedDrop ? 1 : 0));
    });
  });
  const muscles = new Set([...planned.keys(), ...completed.keys()]);
  return [...muscles].map((muscle) => {
    const item = completed.get(muscle) || { completed: 0, efforts: [], dates: new Set() };
    return {
      muscle,
      completed: item.completed,
      planned: planned.get(muscle) || 0,
      frequency: item.dates.size,
      averageRpe: item.efforts.length ? item.efforts.reduce((sum, value) => sum + value, 0) / item.efforts.length : null
    };
  }).sort((a, b) => b.completed - a.completed || b.planned - a.planned || a.muscle.localeCompare(b.muscle));
}

function sessionProgressSummary(session, beforeIso = null) {
  let improved = 0;
  let compared = 0;
  (session.logs || []).forEach((log) => {
    let prevSession;
    if (beforeIso) {
      prevSession = [...state.sessions]
        .filter((item) => item.workoutId === session.workoutId && String(item.completedAt || "") < beforeIso)
        .sort((a, b) => String(b.completedAt || "").localeCompare(String(a.completedAt || "")))[0];
    } else {
      prevSession = previousSession(session.workoutId, session.id);
    }
    const previousLog = findPreviousLog(prevSession, log.exerciseId, log.variantId, log.name);
    const result = matchedProgress(log, previousLog);
    if (previousLog) compared += 1;
    if (result.tone === "positive") improved += 1;
  });
  if (!compared) return "Baseline session";
  return `${improved}/${compared} exercises progressed`;
}

function formatElapsed(startedAt) {
  const seconds = Math.max(0, Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return hours ? `${hours}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}` : `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function startSessionClock() {
  stopSessionClock();
  const update = () => {
    const target = document.querySelector("#session-elapsed");
    if (target && state.activeSession) target.textContent = formatElapsed(state.activeSession.startedAt);
  };
  update();
  sessionClockInterval = setInterval(update, 1000);
}

function stopSessionClock() {
  if (sessionClockInterval) clearInterval(sessionClockInterval);
  sessionClockInterval = null;
}

function sevenDayAverage(endDate = todayISO()) {
  const end = new Date(`${endDate}T12:00:00`);
  const start = new Date(end);
  start.setDate(end.getDate() - 6);
  const startISO = localDateISO(start);
  const entries = state.weights.filter((entry) => entry.date >= startISO && entry.date <= endDate);
  if (!entries.length) return null;
  return entries.reduce((sum, entry) => sum + Number(entry.weight), 0) / entries.length;
}

function previousSevenDayAverage() {
  const end = new Date();
  end.setDate(end.getDate() - 7);
  return sevenDayAverage(localDateISO(end));
}

function render() {
  if (route === "today") renderToday();
  if (route === "training") renderTraining();
  if (route === "body") renderBody();
  if (route === "physique") renderPhysique();
  if (route === "history") renderHistory();
}

function renderToday() {
  const today = todayISO();
  const todaysWeight = getWeightForDate(today);
  const latestPhotos = latestPhotoSet();
  const photoDue = daysSince(latestPhotos?.date) >= 7;
  const workoutKey = getTodaysWorkoutKey();
  const workout = workoutKey ? PROGRAM[workoutKey] : null;
  const next = getNextScheduledWorkout();
  const weekSessions = currentWeekSessions();
  const weekVolume = weekSessions.reduce((sum, session) => sum + calcSessionVolume(session), 0);
  const latestWeight = getLatestWeight();
  const activeWorkout = state.activeSession ? PROGRAM[state.activeSession.workoutId] : null;

  view.innerHTML = `
    ${activeWorkout ? `
      <section class="card active-session-card">
        <p class="label">Workout in progress</p>
        <h2>${activeWorkout.title}</h2>
        <p class="muted">${countCompletedSets(state.activeSession)} of ${countPlannedSets(state.activeSession)} sets logged.</p>
        <button class="primary full" data-route-jump="training" type="button">Continue workout</button>
      </section>
    ` : workout ? `
      <section class="card">
        <p class="label">Today</p>
        <h2>${workout.title}</h2>
        <p class="muted">${workout.description}</p>
        <button class="primary full" data-action="start-workout" data-workout="${workout.id}" type="button">Start workout</button>
      </section>
    ` : `
      <section class="card rest-day-card">
        <p class="label">Today</p>
        <h2>Rest day</h2>
        <p class="muted">Next session: ${next.workout.title} · ${niceDate(next.date)}</p>
        <button class="ghost full" data-route-jump="training" type="button">Open Training</button>
      </section>
    `}

    <section class="card">
      <div class="card-head">
        <div>
          <p class="label">Daily bodyweight</p>
          <h2>${todaysWeight ? `${kg(todaysWeight.weight)} kg` : "Log today's weight"}</h2>
        </div>
        <span class="pill ${todaysWeight ? "good" : "warn"}">${todaysWeight ? "done" : "due"}</span>
      </div>
      <form data-form="quick-weight">
        <label class="field"><span>Weight kg</span><input name="weight" type="number" step="0.1" inputmode="decimal" value="${todaysWeight?.weight || ""}" required /></label>
        <button class="secondary full" type="submit">Save weight</button>
      </form>
    </section>

    <section class="metric-grid">
      <div class="metric"><span class="label">Latest weight</span><strong>${latestWeight ? `${kg(latestWeight.weight)} kg` : "—"}</strong><span class="muted">${latestWeight ? niceDate(latestWeight.date) : "No entries yet"}</span></div>
      <div class="metric"><span class="label">Week volume</span><strong>${kg(weekVolume)} kg</strong><span class="muted">completed sets only</span></div>
      <div class="metric"><span class="label">Photos</span><strong>${latestPhotos ? niceDate(latestPhotos.date) : "Due"}</strong><span class="muted">front / back / side</span></div>
      <div class="metric"><span class="label">Friday cycle</span><strong>${PROGRAM[fridayWorkoutKey()].title.replace("Strength ", "")}</strong><span class="muted">change in Training</span></div>
    </section>
  `;
  attachCommonHandlers();
}

function renderTraining() {
  if (state.activeSession) return renderActiveSession();
  const friday = fridayWorkoutKey();
  view.innerHTML = `
    <section class="card dark">
      <p class="label">Training Strata</p>
      <h2>Three sessions. Fast set logging.</h2>
      <p class="muted">Only completed sets count toward volume. Previous loads are pre-filled and shown under each set.</p>
    </section>
    <section class="program-list">
      ${[PROGRAM.upper, PROGRAM.lower, PROGRAM[friday]].map((workout) => workoutButton(workout)).join("")}
    </section>
    ${exerciseChoicesMarkup()}
    <section class="card">
      <p class="label">Friday rotation</p>
      <h2>Current: ${PROGRAM[friday].title}</h2>
      <div class="button-row">
        <button class="ghost" data-action="rotate-friday" data-dir="-1" type="button">Previous</button>
        <button class="secondary" data-action="rotate-friday" data-dir="1" type="button">Next</button>
      </div>
    </section>
  `;
  attachCommonHandlers();
}

function workoutButton(workout) {
  const last = previousSession(workout.id);
  const volume = last ? calcSessionVolume(last) : 0;
  return `
    <button class="program-card" data-action="start-workout" data-workout="${workout.id}" type="button">
      <strong>${workout.title}</strong>
      <span class="muted">${workout.day} · ${workout.exercises.length} exercises</span>
      <span class="pill-row" style="margin-top:10px"><span class="pill">Previous: ${last ? `${kg(volume)} kg` : "none yet"}</span></span>
    </button>
  `;
}

function exerciseChoicesMarkup() {
  const configurable = Object.values(PROGRAM).flatMap((workout) =>
    workout.exercises.filter((exercise) => exercise.variants?.length).map((exercise) => ({ workout, exercise }))
  );
  return `
    <details class="card program-settings">
      <summary>
        <span><span class="label">Programme setup</span><strong>Exercise choices</strong></span>
        <span class="muted">${configurable.length} choices</span>
      </summary>
      <p class="muted setup-copy">Choose the exact movement you actually use. STRATA only compares like with like.</p>
      <div class="choice-list">
        ${configurable.map(({ workout, exercise }) => {
          const selected = getSelectedVariant(exercise);
          return `
            <label class="field choice-field">
              <span>${workout.title} · ${exercise.name}</span>
              <select data-exercise-choice="${exercise.id}">
                ${exercise.variants.map((variant) => `<option value="${variant.id}" ${variant.id === selected.id ? "selected" : ""}>${variant.name}</option>`).join("")}
              </select>
            </label>
          `;
        }).join("")}
      </div>
    </details>
  `;
}

function startWorkout(workoutId) {
  const workout = PROGRAM[workoutId];
  if (!workout) return;
  const last = previousSession(workoutId);
  const bodyweight = Number(getWeightForDate(todayISO())?.weight || getLatestWeight()?.weight || 0);
  state.activeSession = {
    id: uid(),
    workoutId,
    date: todayISO(),
    startedAt: new Date().toISOString(),
    activeExerciseIndex: 0,
    bodyweight,
    logs: workout.exercises.map((exercise) => {
      const variant = getSelectedVariant(exercise);
      const previousLog = findPreviousLog(last, exercise.id, variant.id, variant.name);
      const previousWarmups = (previousLog?.sets || []).filter((set) => set.setType === "warmup");
      const previousWorking = (previousLog?.sets || []).filter((set) => set.setType !== "warmup");
      const warmupCount = defaultWarmupSetCount(exercise.type);
      const warmupSets = Array.from({ length: warmupCount }, (_, setIndex) => ({
        weight: previousWarmups?.[setIndex]?.weight ?? "",
        reps: "",
        rir: "",
        rpe: "",
        setType: "warmup",
        completed: false,
        previousWeight: previousWarmups?.[setIndex]?.weight ?? "",
        previousReps: previousWarmups?.[setIndex]?.reps ?? ""
      }));
      const workingSets = Array.from({ length: exercise.sets }, (_, setIndex) => ({
        weight: previousWorking?.[setIndex]?.weight ?? "",
        reps: "",
        rir: "",
        rpe: "",
        setType: previousWorking?.[setIndex]?.setType || (setIndex === 0 && exercise.type === "strength" ? "top" : "work"),
        completed: false,
        previousWeight: previousWorking?.[setIndex]?.weight ?? "",
        previousReps: previousWorking?.[setIndex]?.reps ?? ""
      }));
      return {
        exerciseId: exercise.id,
        variantId: variant.id,
        name: variant.name,
        muscle: exercise.muscle,
        type: exercise.type,
        targetSets: exercise.sets,
        targetReps: exercise.reps,
        loadLabel: variant.loadLabel,
        loadMultiplier: variant.loadMultiplier,
        repMultiplier: variant.repMultiplier,
        volumeMode: variant.volumeMode,
        allowZeroWeight: variant.allowZeroWeight,
        bodyweight,
        drop: exercise.drop ? {
          weight: previousLog?.drop?.weight ?? "",
          reps: "",
          rir: "",
          rpe: "",
          setType: "drop",
          completed: false,
          previousWeight: previousLog?.drop?.weight ?? "",
          previousReps: previousLog?.drop?.reps ?? ""
        } : null,
        feedback: { target: "", joints: "", execution: "" },
        setupNote: state.settings.exerciseSetup?.[variant.id] || "",
        sets: [...warmupSets, ...workingSets]
      };
    }),
    notes: ""
  };
  saveState();
  setRoute("training");
}

function renderActiveSession() {
  const session = state.activeSession;
  const workout = PROGRAM[session.workoutId];
  const prev = previousSession(session.workoutId, session.id);
  const previousVolume = prev ? calcSessionVolume(prev) : 0;
  const currentVolume = calcSessionVolume(session);
  const delta = currentVolume - previousVolume;
  const planned = countPlannedSets(session);
  const completed = countCompletedSets(session);
  const progress = planned ? Math.round((completed / planned) * 100) : 0;
  const activeIndex = Math.min(Number(session.activeExerciseIndex || 0), session.logs.length - 1);

  view.innerHTML = `
    <header class="workout-command">
      <div class="workout-command-top">
        <button class="workout-icon-button" data-action="minimize-session" type="button" aria-label="Minimize workout">⌄</button>
        <div class="workout-title-block">
          <span class="workout-kicker">LIVE SESSION</span>
          <strong>${workout.title}</strong>
        </div>
        <button class="workout-finish-button" data-action="finish-session" type="button">Finish</button>
      </div>
      <div class="workout-command-stats">
        <span><b id="session-elapsed">${formatElapsed(session.startedAt)}</b><small>elapsed</small></span>
        <span><b><i id="completed-set-count">${completed}</i>/${planned}</b><small>sets</small></span>
        <span><b id="session-current-volume">${kg(currentVolume)}</b><small>kg volume</small></span>
        <span><b id="session-delta-volume" class="${delta >= 0 ? "positive" : "negative"}">${delta >= 0 ? "+" : ""}${kg(delta)}</b><small>vs last</small></span>
      </div>
      <div class="workout-progress"><span id="session-progress-bar" style="width:${progress}%"></span></div>
      <div class="effort-scale-toggle" aria-label="Effort scale">
        <span>EFFORT</span>
        <button class="${state.settings.effortScale === "rpe" ? "active" : ""}" data-action="set-effort-scale" data-scale="rpe" type="button">RPE</button>
        <button class="${state.settings.effortScale === "rir" ? "active" : ""}" data-action="set-effort-scale" data-scale="rir" type="button">RIR</button>
      </div>
    </header>

    <section id="active-log" class="active-workout-log">
      ${session.logs.map((log, index) => exerciseLogCard(log, index, session.workoutId)).join("")}
    </section>

    <section class="add-exercise-panel">
      <button class="add-exercise-button" data-action="add-exercise" type="button"><span>＋</span><strong>Add another exercise</strong><small>Add it to this workout and keep it for next time.</small></button>
    </section>

    <section class="session-notes-panel">
      <label class="field"><span>Session notes</span><textarea id="session-notes" placeholder="Recovery, execution, pain, equipment or anything to remember.">${escapeHtml(session.notes || "")}</textarea></label>
      <button class="ghost full" data-action="cancel-session" type="button">Discard workout</button>
    </section>

    <nav class="workout-dock" aria-label="Workout controls">
      <button data-action="jump-exercise" data-dir="-1" type="button">← <span>Prev</span></button>
      <div class="workout-dock-status"><strong id="dock-exercise-number">${activeIndex + 1}/${session.logs.length}</strong><span>exercise</span></div>
      <button data-action="add-set" data-ex="${activeIndex}" type="button">＋ <span>Set</span></button>
      <button data-action="jump-exercise" data-dir="1" type="button"><span>Next</span> →</button>
    </nav>
  `;
  attachCommonHandlers();
  view.querySelectorAll("input[data-log]").forEach((input) => {
    input.addEventListener("change", updateActiveSessionField);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") event.currentTarget.blur();
    });
    input.addEventListener("focus", () => setActiveExercise(Number(input.dataset.ex)));
  });
  view.querySelector("#session-notes")?.addEventListener("input", (event) => {
    state.activeSession.notes = event.target.value;
    saveState();
  });
  view.querySelectorAll("[data-exercise-index]").forEach((card) => {
    card.addEventListener("pointerdown", () => setActiveExercise(Number(card.dataset.exerciseIndex)), { passive: true });
  });
  startSessionClock();
}

function exerciseLogCard(log, index, workoutId) {
  const previousLog = latestExerciseHistoryLog(log);
  const previous = previousLog ? calcExerciseVolume(previousLog) : 0;
  const current = calcExerciseVolume(log);
  const delta = current - previous;
  const progression = matchedProgress(log, previousLog);
  const allComplete = completedExercise(log);
  return `
    <article class="exercise-block" data-exercise-index="${index}" id="exercise-${index}">
      <header class="exercise-block-head">
        <div>
          <span class="exercise-number">${String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3>${log.name}</h3>
            <p>${log.muscle} · ${(log.sets || []).filter((set) => set.setType === "warmup").length} warm-up · ${(log.sets || []).filter((set) => set.setType !== "warmup").length}${log.drop ? "+1" : ""} work · ${log.targetReps} · ${restSecondsForExercise(workoutId, index)}s rest</p>
          </div>
        </div>
        <div class="exercise-head-actions">
          <button class="exercise-mini-action" data-action="exercise-history" data-ex="${index}" type="button">History</button>
          <button class="exercise-mini-action" data-action="move-exercise" data-dir="-1" data-ex="${index}" type="button" ${index === 0 ? "disabled" : ""} aria-label="Move exercise up">↑</button>
          <button class="exercise-mini-action" data-action="move-exercise" data-dir="1" data-ex="${index}" type="button" ${index === state.activeSession.logs.length - 1 ? "disabled" : ""} aria-label="Move exercise down">↓</button>
          <span class="exercise-volume" data-exercise-volume="${index}">${kg(current)} kg</span>
        </div>
      </header>
      <div class="exercise-intelligence ${progression.tone}" data-exercise-intelligence="${index}">
        <strong>${progression.label}</strong><span>${progression.detail}</span>
      </div>
      <details class="exercise-setup" ${log.setupNote ? "" : ""}>
        <summary><span>SETUP / CUE</span><strong>${escapeHtml(log.setupNote || "Add machine, seat, grip or execution cue")}</strong></summary>
        <textarea data-setup-note data-ex="${index}" placeholder="Example: Seat 3 · neutral grip · scapula fixed · drive elbows inward">${escapeHtml(log.setupNote || "")}</textarea>
      </details>
      <div class="set-table">
        <div class="set-table-head"><span>TYPE</span><span>PREVIOUS</span><span>KG</span><span>REPS</span><span>LOG</span></div>
        ${log.sets.map((set, setIndex) => setEntryMarkup(set, index, setIndex, log)).join("")}
        ${log.drop ? dropSetMarkup(log.drop, index, log) : ""}
      </div>
      <footer class="exercise-footer">
        <div><span>Previous total</span><strong>${previous ? `${kg(previous)} kg` : "Baseline"}</strong></div>
        <div><span>Current change</span><strong data-exercise-delta="${index}" class="${delta >= 0 ? "positive" : "negative"}">${delta >= 0 ? "+" : ""}${kg(delta)} kg</strong></div>
        <div class="exercise-set-controls">
          <button class="exercise-add-set" data-action="remove-set" data-ex="${index}" type="button">− last</button>
          <button class="exercise-add-set warmup-control" data-action="add-warmup-set" data-ex="${index}" type="button">+ warm-up</button>
          <button class="exercise-add-set" data-action="add-set" data-ex="${index}" type="button">+ work</button>
          <button class="exercise-add-set drop-control ${log.drop ? "has-drop" : ""}" data-action="${log.drop ? "remove-drop-set" : "add-drop-set"}" data-ex="${index}" type="button">${log.drop ? "− drop" : "+ drop set"}</button>
          <button class="exercise-add-set substitute-control" data-action="replace-exercise" data-ex="${index}" type="button">↔ substitute</button>
          <button class="exercise-add-set danger-control" data-action="remove-exercise" data-ex="${index}" type="button">Remove exercise</button>
        </div>
      </footer>
      ${exerciseFeedbackMarkup(log, index, allComplete)}
    </article>
  `;
}

function volumeRuleText(log) {
  if (log.volumeMode === "bodyweightAdded") return `Volume uses bodyweight (${kg(log.bodyweight)} kg) + added load.`;
  if (Number(log.loadMultiplier) === 2) return "Volume doubles the entered load for both hands/sides.";
  if (Number(log.repMultiplier) === 2) return "Volume doubles reps because the target is per leg.";
  if (log.allowZeroWeight) return "Enter external load only; 0 kg is valid for bodyweight work.";
  return "Volume = load × reps for completed sets.";
}

function setEntryMarkup(set, exerciseIndex, setIndex, log) {
  const completed = Boolean(set.completed);
  const type = setTypeInfo(set.setType);
  const previousText = set.previousWeight !== "" || set.previousReps !== ""
    ? `${set.previousWeight === "" ? "—" : set.previousWeight} × ${set.previousReps || "—"}`
    : "—";
  return `
    <div class="set-row ${completed ? "is-complete" : ""}" data-set-entry data-ex="${exerciseIndex}" data-set="${setIndex}">
      <button class="set-type type-${type.id}" data-action="cycle-set-type" data-ex="${exerciseIndex}" data-set="${setIndex}" title="${type.label}" type="button">${type.short}</button>
      <span class="set-last">${previousText}</span>
      <input aria-label="${log.loadLabel}" data-log="weight" data-ex="${exerciseIndex}" data-set="${setIndex}" type="number" inputmode="decimal" step="0.5" value="${set.weight ?? ""}">
      <input aria-label="Reps" data-log="reps" data-ex="${exerciseIndex}" data-set="${setIndex}" type="number" inputmode="numeric" step="1" value="${set.reps ?? ""}">
      <button class="set-check ${completed ? "complete" : ""}" data-action="${completed ? "edit-set" : "log-set"}" data-ex="${exerciseIndex}" data-set="${setIndex}" type="button" aria-label="${completed ? "Edit completed set" : "Log set"}">${completed ? "✓" : "○"}</button>
      ${effortChipsMarkup(set, exerciseIndex, setIndex, completed, false)}
    </div>
  `;
}

function dropSetMarkup(drop, exerciseIndex, log) {
  const completed = Boolean(drop.completed);
  const previousText = drop.previousWeight !== "" || drop.previousReps !== ""
    ? `${drop.previousWeight === "" ? "—" : drop.previousWeight} × ${drop.previousReps || "—"}`
    : "—";
  return `
    <div class="set-row drop-row ${completed ? "is-complete" : ""}" data-drop-entry data-ex="${exerciseIndex}">
      <span class="set-type type-drop">D</span>
      <span class="set-last">${previousText}</span>
      <input aria-label="Drop ${log.loadLabel}" data-log="dropWeight" data-ex="${exerciseIndex}" type="number" inputmode="decimal" step="0.5" value="${drop.weight ?? ""}">
      <input aria-label="Drop reps" data-log="dropReps" data-ex="${exerciseIndex}" type="number" inputmode="numeric" step="1" value="${drop.reps ?? ""}">
      <button class="set-check ${completed ? "complete" : ""}" data-action="${completed ? "edit-drop" : "log-drop"}" data-ex="${exerciseIndex}" type="button" aria-label="${completed ? "Edit completed drop set" : "Log drop set"}">${completed ? "✓" : "○"}</button>
      ${effortChipsMarkup(drop, exerciseIndex, null, completed, true)}
    </div>
  `;
}

function effortChipsMarkup(set, exerciseIndex, setIndex, visible, isDrop) {
  if (set?.setType === "warmup") {
    return `<div class="warmup-logged ${visible ? "" : "hidden"}">Warm-up logged · excluded from work volume</div>`;
  }
  const scale = state.settings.effortScale === "rir" ? "rir" : "rpe";
  const values = scale === "rpe" ? ["6", "7", "8", "9", "10"] : ["0", "1", "2", "3", "4+"];
  const selected = scale === "rpe" ? String(set?.rpe ?? "") : (String(set?.rir) === "4" ? "4+" : String(set?.rir ?? ""));
  return `
    <div class="rir-strip ${visible ? "" : "hidden"}" data-rir-panel>
      <span>${scale.toUpperCase()}</span>
      ${values.map((value) => `<button class="rir-chip ${selected === value ? "selected" : ""}" data-action="set-effort" data-ex="${exerciseIndex}" ${isDrop ? 'data-drop="true"' : `data-set="${setIndex}"`} data-scale="${scale}" data-value="${value}" type="button" aria-pressed="${selected === value}">${value}</button>`).join("")}
    </div>
  `;
}


function exerciseFeedbackMarkup(log, exerciseIndex, visible) {
  const feedback = log.feedback || {};
  const group = (label, field, options) => `
    <div class="feedback-group"><span>${label}</span><div>${options.map(([value, text]) => `<button class="feedback-chip ${feedback[field] === value ? "selected" : ""}" data-action="exercise-feedback" data-field="${field}" data-value="${value}" data-ex="${exerciseIndex}" type="button">${text}</button>`).join("")}</div></div>`;
  return `<section class="exercise-feedback ${visible ? "" : "locked"}" data-feedback-panel="${exerciseIndex}">
    <div class="feedback-title"><span>POST-EXERCISE READ</span><strong>${visible ? "Capture quality, not just load" : "Complete all sets to unlock"}</strong></div>
    ${visible ? [
      group("Target muscle", "target", [["poor", "Poor"], ["good", "Good"], ["excellent", "Excellent"]]),
      group("Joints", "joints", [["clear", "Clear"], ["mild", "Mild"], ["problem", "Problem"]]),
      group("Execution", "execution", [["stable", "Stable"], ["adjust", "Adjust"]])
    ].join("") : ""}
  </section>`;
}

function setActiveExercise(index) {
  if (!state.activeSession || !Number.isFinite(index)) return;
  state.activeSession.activeExerciseIndex = Math.max(0, Math.min(index, state.activeSession.logs.length - 1));
  saveState();
  const status = document.querySelector("#dock-exercise-number");
  if (status) status.textContent = `${state.activeSession.activeExerciseIndex + 1}/${state.activeSession.logs.length}`;
  const dockAdd = document.querySelector(".workout-dock [data-action='add-set']");
  if (dockAdd) dockAdd.dataset.ex = String(state.activeSession.activeExerciseIndex);
}

function jumpExercise(direction) {
  if (!state.activeSession) return;
  const current = Number(state.activeSession.activeExerciseIndex || 0);
  const next = Math.max(0, Math.min(state.activeSession.logs.length - 1, current + direction));
  setActiveExercise(next);
  document.querySelector(`#exercise-${next}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function cycleSetType(exerciseIndex, setIndex, button) {
  const set = state.activeSession?.logs?.[exerciseIndex]?.sets?.[setIndex];
  if (!set || set.completed) return;
  const currentIndex = SET_TYPES.findIndex((item) => item.id === set.setType);
  const next = SET_TYPES[(currentIndex + 1) % SET_TYPES.length];
  set.setType = next.id;
  saveState();
  button.textContent = next.short;
  button.title = next.label;
  button.className = `set-type type-${next.id}`;
}

function addWarmupSet(exerciseIndex) {
  const log = state.activeSession?.logs?.[exerciseIndex];
  if (!log) return;
  const previous = previousSession(state.activeSession.workoutId, state.activeSession.id);
  const previousLog = findPreviousLog(previous, log.exerciseId, log.variantId, log.name);
  const previousWarmups = (previousLog?.sets || []).filter((set) => set.setType === "warmup");
  const currentWarmupCount = (log.sets || []).filter((set) => set.setType === "warmup").length;
  const prior = previousWarmups[currentWarmupCount] || {};
  const warmup = {
    weight: prior.weight ?? "",
    reps: "",
    rir: "",
    rpe: "",
    setType: "warmup",
    completed: false,
    previousWeight: prior.weight ?? "",
    previousReps: prior.reps ?? ""
  };
  const firstWorkingIndex = log.sets.findIndex((set) => set.setType !== "warmup");
  if (firstWorkingIndex === -1) log.sets.push(warmup);
  else log.sets.splice(firstWorkingIndex, 0, warmup);
  saveState();
  renderActiveSession();
  setActiveExercise(exerciseIndex);
  requestAnimationFrame(() => document.querySelector(`#exercise-${exerciseIndex}`)?.scrollIntoView({ block: "center" }));
}

function addSet(exerciseIndex) {
  const log = state.activeSession?.logs?.[exerciseIndex];
  if (!log) return;
  const last = log.sets[log.sets.length - 1] || {};
  log.sets.push({
    weight: last.weight || "",
    reps: "",
    rir: "",
    rpe: "",
    setType: last.setType === "warmup" ? "work" : (last.setType || "work"),
    completed: false,
    previousWeight: "",
    previousReps: ""
  });
  saveState();
  renderActiveSession();
  setActiveExercise(exerciseIndex);
  requestAnimationFrame(() => document.querySelector(`#exercise-${exerciseIndex}`)?.scrollIntoView({ block: "center" }));
}

function suggestedDropWeight(log) {
  const completedWorking = (log.sets || []).filter((set) => set.setType !== "warmup" && set.completed && Number(set.weight || 0) > 0);
  const working = completedWorking.length
    ? completedWorking[completedWorking.length - 1]
    : [...(log.sets || [])].reverse().find((set) => set.setType !== "warmup" && Number(set.weight || 0) > 0);
  if (!working) return "";
  const raw = Number(working.weight) * 0.75;
  return String(Math.round(raw * 2) / 2);
}

function addDropSet(exerciseIndex) {
  const log = state.activeSession?.logs?.[exerciseIndex];
  if (!log || log.drop) return;
  const previous = previousSession(state.activeSession.workoutId, state.activeSession.id);
  const previousLog = findPreviousLog(previous, log.exerciseId, log.variantId, log.name);
  const previousDrop = previousLog?.drop || {};
  log.drop = {
    weight: previousDrop.weight ?? suggestedDropWeight(log),
    reps: "",
    rir: "",
    rpe: "",
    setType: "drop",
    completed: false,
    previousWeight: previousDrop.weight ?? "",
    previousReps: previousDrop.reps ?? ""
  };
  saveState();
  renderActiveSession();
  setActiveExercise(exerciseIndex);
  requestAnimationFrame(() => {
    const row = document.querySelector(`#exercise-${exerciseIndex} [data-drop-entry]`);
    row?.scrollIntoView({ behavior: "smooth", block: "center" });
    row?.querySelector('input[data-log="dropWeight"]')?.focus();
  });
  showNotice("Drop set added. Adjust the load, then log it after the final working set.", "good");
}

function removeDropSet(exerciseIndex) {
  const log = state.activeSession?.logs?.[exerciseIndex];
  if (!log?.drop) return;
  if (log.drop.completed && !confirm("Remove this completed drop set?")) return;
  log.drop = null;
  saveState();
  renderActiveSession();
  setActiveExercise(exerciseIndex);
  requestAnimationFrame(() => document.querySelector(`#exercise-${exerciseIndex}`)?.scrollIntoView({ block: "center" }));
}


function removeSet(exerciseIndex) {
  const log = state.activeSession?.logs?.[exerciseIndex];
  if (!log || log.sets.length <= 1) {
    showNotice("Each exercise needs at least one set.", "warn");
    return;
  }
  const last = log.sets[log.sets.length - 1];
  if (last.completed && !confirm("Remove the last completed set from this exercise?")) return;
  log.sets.pop();
  saveState();
  renderActiveSession();
  setActiveExercise(exerciseIndex);
  requestAnimationFrame(() => document.querySelector(`#exercise-${exerciseIndex}`)?.scrollIntoView({ block: "center" }));
}

function saveSetupNote(exerciseIndex, value) {
  const log = state.activeSession?.logs?.[exerciseIndex];
  if (!log) return;
  log.setupNote = value;
  state.settings.exerciseSetup = state.settings.exerciseSetup || {};
  state.settings.exerciseSetup[log.variantId || log.exerciseId] = value;
  saveState();
}

function setExerciseFeedback(exerciseIndex, field, value, button) {
  const log = state.activeSession?.logs?.[exerciseIndex];
  if (!log) return;
  log.feedback = log.feedback || {};
  log.feedback[field] = value;
  saveState();
  button.closest(".feedback-group")?.querySelectorAll(".feedback-chip").forEach((chip) => chip.classList.toggle("selected", chip === button));
}

function updateActiveSessionField(event) {
  if (!state.activeSession) return;
  const input = event.currentTarget;
  writeLogInputToState(input);
  saveState();
  updateActiveSessionSummary(Number(input.dataset.ex));
}

function writeLogInputToState(input) {
  const exIndex = Number(input.dataset.ex);
  const setIndex = input.dataset.set !== undefined ? Number(input.dataset.set) : null;
  const field = input.dataset.log;
  const log = state.activeSession?.logs?.[exIndex];
  if (!log) return;
  if (["weight", "reps"].includes(field) && log.sets[setIndex]) log.sets[setIndex][field] = input.value;
  if (field === "dropWeight" && log.drop) log.drop.weight = input.value;
  if (field === "dropReps" && log.drop) log.drop.reps = input.value;
}

function commitSetInputs(exerciseIndex, setIndex, isDrop = false) {
  const selector = isDrop
    ? `[data-drop-entry][data-ex="${exerciseIndex}"] input[data-log]`
    : `[data-set-entry][data-ex="${exerciseIndex}"][data-set="${setIndex}"] input[data-log]`;
  view.querySelectorAll(selector).forEach(writeLogInputToState);
}

function commitAllActiveInputs() {
  if (!state.activeSession) return;
  view.querySelectorAll("input[data-log]").forEach(writeLogInputToState);
  saveState();
}

function validateSet(log, target) {
  const reps = Number(target.reps);
  const hasWeight = target.weight !== "" && target.weight !== null && target.weight !== undefined;
  const weight = Number(target.weight || 0);
  if (!Number.isFinite(reps) || reps <= 0) return "Enter the reps you completed.";
  if (!log.allowZeroWeight && log.volumeMode !== "bodyweightAdded" && (!hasWeight || !Number.isFinite(weight) || weight <= 0)) {
    return `Enter the ${log.loadLabel} used.`;
  }
  if ((log.allowZeroWeight || log.volumeMode === "bodyweightAdded") && hasWeight && (!Number.isFinite(weight) || weight < 0)) {
    return `Enter a valid ${log.loadLabel}.`;
  }
  if (log.volumeMode === "bodyweightAdded" && !Number(log.bodyweight || 0)) {
    return "Log bodyweight first so pull-up volume can be calculated.";
  }
  return "";
}

function completeSet(exerciseIndex, setIndex, isDrop, button) {
  const log = state.activeSession?.logs?.[exerciseIndex];
  if (!log) return;
  commitSetInputs(exerciseIndex, setIndex, isDrop);
  const target = isDrop ? log.drop : log.sets?.[setIndex];
  if (!target) return;
  const error = validateSet(log, target);
  if (error) {
    showNotice(error, "warn");
    const entry = button.closest(isDrop ? "[data-drop-entry]" : "[data-set-entry]");
    const firstEmpty = Array.from(entry?.querySelectorAll("input") || []).find((input) => !input.value);
    firstEmpty?.focus();
    return;
  }
  target.completed = true;
  target.completedAt = new Date().toISOString();
  saveState();

  const entry = button.closest(isDrop ? "[data-drop-entry]" : "[data-set-entry]");
  entry?.classList.add("is-complete");
  entry?.querySelector("[data-rir-panel]")?.classList.remove("hidden");
  const editButton = button.cloneNode(true);
  editButton.dataset.action = isDrop ? "edit-drop" : "edit-set";
  editButton.classList.add("complete");
  editButton.textContent = "✓";
  editButton.addEventListener("click", () => editSet(exerciseIndex, setIndex, isDrop, editButton));
  button.replaceWith(editButton);

  updateActiveSessionSummary(exerciseIndex);
  if (completedExercise(log)) {
    const panel = view.querySelector(`[data-feedback-panel="${exerciseIndex}"]`);
    if (panel) panel.outerHTML = exerciseFeedbackMarkup(log, exerciseIndex, true);
    attachFeedbackHandlers(exerciseIndex);
  }
  const restSeconds = target.setType === "warmup"
    ? Math.min(90, restSecondsForExercise(state.activeSession.workoutId, exerciseIndex))
    : restSecondsForExercise(state.activeSession.workoutId, exerciseIndex);
  startRestTimer(restSeconds, log.name);
}

function attachFeedbackHandlers(exerciseIndex) {
  view.querySelectorAll(`[data-feedback-panel="${exerciseIndex}"] [data-action="exercise-feedback"]`).forEach((button) => button.addEventListener("click", () => setExerciseFeedback(exerciseIndex, button.dataset.field, button.dataset.value, button)));
}

function editSet(exerciseIndex, setIndex, isDrop, button) {
  const log = state.activeSession?.logs?.[exerciseIndex];
  const target = isDrop ? log?.drop : log?.sets?.[setIndex];
  if (!target) return;
  target.completed = false;
  target.rir = "";
  target.rpe = "";
  delete target.completedAt;
  saveState();
  const entry = button.closest(isDrop ? "[data-drop-entry]" : "[data-set-entry]");
  entry?.classList.remove("is-complete");
  entry?.querySelector("[data-rir-panel]")?.classList.add("hidden");
  const logButton = button.cloneNode(true);
  logButton.dataset.action = isDrop ? "log-drop" : "log-set";
  logButton.classList.remove("complete");
  logButton.textContent = "○";
  logButton.addEventListener("click", () => completeSet(exerciseIndex, setIndex, isDrop, logButton));
  button.replaceWith(logButton);
  updateActiveSessionSummary(exerciseIndex);
  if (!completedExercise(log)) {
    const panel = view.querySelector(`[data-feedback-panel="${exerciseIndex}"]`);
    if (panel) panel.outerHTML = exerciseFeedbackMarkup(log, exerciseIndex, false);
  }
}

function setEffort(exerciseIndex, setIndex, scale, value, isDrop, button) {
  const log = state.activeSession?.logs?.[exerciseIndex];
  const target = isDrop ? log?.drop : log?.sets?.[setIndex];
  if (!target?.completed) return;
  if (scale === "rpe") {
    target.rpe = value;
    target.rir = "";
  } else {
    target.rir = value;
    target.rpe = "";
  }
  saveState();
  updateActiveSessionSummary(exerciseIndex);
  const group = button.closest(".rir-strip");
  group?.querySelectorAll(".rir-chip").forEach((chip) => {
    const selected = chip === button;
    chip.classList.toggle("selected", selected);
    chip.setAttribute("aria-pressed", String(selected));
  });
}

function setEffortScale(scale) {
  state.settings.effortScale = scale === "rir" ? "rir" : "rpe";
  saveState();
  renderActiveSession();
}

function updateActiveSessionSummary(exerciseIndex = null) {
  if (!state.activeSession) return;
  const prev = previousSession(state.activeSession.workoutId, state.activeSession.id);
  const previousVolume = prev ? calcSessionVolume(prev) : 0;
  const currentVolume = calcSessionVolume(state.activeSession);
  const delta = currentVolume - previousVolume;
  const planned = countPlannedSets(state.activeSession);
  const completed = countCompletedSets(state.activeSession);
  const progress = planned ? Math.round((completed / planned) * 100) : 0;

  const currentEl = document.querySelector("#session-current-volume");
  const deltaEl = document.querySelector("#session-delta-volume");
  const finishButton = document.querySelector("#finish-session-btn");
  const completedCount = document.querySelector("#completed-set-count");
  const completedPercent = document.querySelector("#completed-set-percent");
  const progressBar = document.querySelector("#session-progress-bar");
  if (currentEl) currentEl.textContent = kg(currentVolume);
  if (deltaEl) {
    deltaEl.textContent = `${delta >= 0 ? "+" : ""}${kg(delta)}`;
    deltaEl.classList.toggle("positive", delta >= 0);
    deltaEl.classList.toggle("negative", delta < 0);
  }
  if (finishButton) finishButton.textContent = "Finish";
  if (completedCount) completedCount.textContent = String(completed);
  if (completedPercent) completedPercent.textContent = `${progress}%`;
  if (progressBar) progressBar.style.width = `${progress}%`;

  if (exerciseIndex !== null) {
    const log = state.activeSession.logs[exerciseIndex];
    const current = calcExerciseVolume(log);
    const previous = lastExerciseVolume(log, state.activeSession.workoutId);
    const exerciseDelta = current - previous;
    const volumeEl = view.querySelector(`[data-exercise-volume="${exerciseIndex}"]`);
    const exerciseDeltaEl = view.querySelector(`[data-exercise-delta="${exerciseIndex}"]`);
    if (volumeEl) volumeEl.textContent = `${kg(current)} kg`;
    if (exerciseDeltaEl) {
      exerciseDeltaEl.textContent = `${exerciseDelta >= 0 ? "+" : ""}${kg(exerciseDelta)} kg`;
      exerciseDeltaEl.classList.toggle("positive", exerciseDelta >= 0);
      exerciseDeltaEl.classList.toggle("negative", exerciseDelta < 0);
    }
    const previousLog = latestExerciseHistoryLog(log);
    const progression = matchedProgress(log, previousLog);
    const intelligence = view.querySelector(`[data-exercise-intelligence="${exerciseIndex}"]`);
    if (intelligence) {
      intelligence.className = `exercise-intelligence ${progression.tone}`;
      intelligence.dataset.exerciseIntelligence = String(exerciseIndex);
      intelligence.innerHTML = `<strong>${progression.label}</strong><span>${progression.detail}</span>`;
    }
  }
}

function defaultRestSeconds(type) {
  if (type === "strength") return 180;
  if (["compound", "hinge"].includes(type)) return 150;
  if (["machine", "unilateral"].includes(type)) return 120;
  if (type === "accessory") return 90;
  if (type === "isolation") return 75;
  return 90;
}

function restSecondsForExercise(workoutId, exerciseIndex) {
  const activeLog = state.activeSession?.workoutId === workoutId ? state.activeSession.logs?.[exerciseIndex] : null;
  if (Number(activeLog?.restSeconds) > 0) return Number(activeLog.restSeconds);
  const exercise = PROGRAM[workoutId]?.exercises?.[exerciseIndex];
  return defaultRestSeconds(activeLog?.type || exercise?.type || "");
}

function customExerciseOptions() {
  return exerciseLibraryItems()
    .map((exercise) => `<option value="${escapeHtml(exerciseIdentity(exercise))}">${escapeHtml(exercise.libraryLabel || `${exercise.name} · ${exercise.muscle || "Other"}`)}</option>`)
    .join("");
}

function resetAddExerciseForm() {
  if (!addExerciseForm) return;
  addExerciseForm.reset();
  addExerciseForm.elements.sets.value = "3";
  addExerciseForm.elements.reps.value = "8–12";
  addExerciseForm.elements.type.value = "isolation";
  addExerciseForm.elements.loadMode.value = "total";
  addExerciseForm.elements.restSeconds.value = "";
  if (savedExerciseSelect) savedExerciseSelect.innerHTML = `<option value="">New exercise</option>${customExerciseOptions()}`;
}

function setExerciseDialogCopy() {
  const title = document.querySelector("#add-exercise-title");
  const note = addExerciseForm?.querySelector(".dialog-note");
  const submit = addExerciseForm?.querySelector('button[type="submit"]');
  if (exerciseDialogMode === "replace") {
    if (title) title.textContent = "Substitute exercise";
    if (note) note.textContent = "The new movement replaces this exercise in the current workout and becomes the saved routine order. Its own history remains separate.";
    if (submit) submit.textContent = "Replace exercise";
  } else {
    if (title) title.textContent = "Add exercise";
    if (note) note.textContent = "The exercise is added after your current exercise and saved into this workout for next time.";
    if (submit) submit.textContent = "Add to workout";
  }
}

function openAddExerciseDialog() {
  if (!state.activeSession || !addExerciseDialog || !addExerciseForm) return;
  exerciseDialogMode = "add";
  exerciseDialogIndex = null;
  resetAddExerciseForm();
  setExerciseDialogCopy();
  if (typeof addExerciseDialog.showModal === "function") addExerciseDialog.showModal();
  else addExerciseDialog.setAttribute("open", "");
  requestAnimationFrame(() => savedExerciseSelect?.focus());
}

function openReplaceExerciseDialog(index) {
  if (!state.activeSession || !addExerciseDialog || !addExerciseForm) return;
  const log = state.activeSession.logs[index];
  if (!log) return;
  const completed = (log.sets || []).some((set) => set.completed) || Boolean(log.drop?.completed);
  if (completed && !confirm(`Replace ${log.name}? Its completed sets in this active workout will be removed.`)) return;
  exerciseDialogMode = "replace";
  exerciseDialogIndex = index;
  resetAddExerciseForm();
  setExerciseDialogCopy();
  if (typeof addExerciseDialog.showModal === "function") addExerciseDialog.showModal();
  else addExerciseDialog.setAttribute("open", "");
  requestAnimationFrame(() => savedExerciseSelect?.focus());
}

function closeAddExerciseDialog() {
  if (!addExerciseDialog) return;
  if (typeof addExerciseDialog.close === "function") addExerciseDialog.close();
  else addExerciseDialog.removeAttribute("open");
}

function findLibraryExercise(id) {
  return exerciseLibraryItems().find((item) => exerciseIdentity(item) === String(id || "").toLowerCase()) || null;
}

function fillExerciseFormFromSaved(id) {
  if (!addExerciseForm) return;
  const exercise = findLibraryExercise(id);
  if (!exercise) {
    const selected = savedExerciseSelect?.value || "";
    const mode = exerciseDialogMode;
    const index = exerciseDialogIndex;
    resetAddExerciseForm();
    exerciseDialogMode = mode;
    exerciseDialogIndex = index;
    setExerciseDialogCopy();
    if (savedExerciseSelect) savedExerciseSelect.value = selected;
    return;
  }
  addExerciseForm.elements.name.value = exercise.name || "";
  addExerciseForm.elements.muscle.value = exercise.muscle || "";
  addExerciseForm.elements.type.value = exercise.type || "isolation";
  addExerciseForm.elements.sets.value = String(exercise.sets || 3);
  addExerciseForm.elements.reps.value = exercise.reps || "8–12";
  addExerciseForm.elements.loadMode.value = loadModeFromValues(exercise.loadLabel, exercise.loadMultiplier, exercise.repMultiplier, exercise.volumeMode, exercise.allowZeroWeight);
  addExerciseForm.elements.restSeconds.value = exercise.restSeconds ? String(exercise.restSeconds) : "";
}

function loadModeConfig(mode) {
  if (mode === "pair") return { loadLabel: "kg / hand", loadMultiplier: 2, repMultiplier: 1, allowZeroWeight: false };
  if (mode === "perLeg") return { loadLabel: "kg", loadMultiplier: 1, repMultiplier: 2, allowZeroWeight: false };
  if (mode === "bodyweightAdded") return { loadLabel: "added kg", loadMultiplier: 1, repMultiplier: 1, volumeMode: "bodyweightAdded", allowZeroWeight: true };
  if (mode === "external") return { loadLabel: "added kg", loadMultiplier: 1, repMultiplier: 1, allowZeroWeight: true };
  return { loadLabel: "kg", loadMultiplier: 1, repMultiplier: 1, allowZeroWeight: false };
}

function blueprintFromExerciseForm(form) {
  const name = String(form.get("name") || "").trim();
  const muscle = String(form.get("muscle") || "Other").trim() || "Other";
  const type = String(form.get("type") || "isolation");
  const sets = Math.max(1, Math.min(12, Number(form.get("sets") || 3)));
  const reps = String(form.get("reps") || "8–12").trim() || "8–12";
  const loadMode = String(form.get("loadMode") || "total");
  const restSeconds = Number(form.get("restSeconds") || 0) || defaultRestSeconds(type);
  const selected = findLibraryExercise(String(form.get("savedExercise") || ""));
  const volume = loadModeConfig(loadMode);
  let exerciseId = selected?.exerciseId;
  let variantId = selected?.variantId;
  let custom = Boolean(selected?.custom);
  if (!selected) {
    exerciseId = `custom-${uid()}`;
    variantId = exerciseId;
    custom = true;
  }
  const blueprint = {
    exerciseId,
    variantId,
    custom,
    name,
    muscle,
    type,
    sets,
    reps,
    loadLabel: volume.loadLabel,
    loadMultiplier: volume.loadMultiplier,
    repMultiplier: volume.repMultiplier,
    volumeMode: volume.volumeMode || "external",
    allowZeroWeight: Boolean(volume.allowZeroWeight),
    restSeconds,
    plannedDrop: false
  };
  if (custom) {
    const libraryExercise = { id: exerciseId, name, muscle, type, sets, reps, loadMode, restSeconds };
    state.settings.customExercises = state.settings.customExercises || [];
    const savedIndex = state.settings.customExercises.findIndex((item) => item.id === exerciseId);
    if (savedIndex >= 0) state.settings.customExercises[savedIndex] = libraryExercise;
    else state.settings.customExercises.push(libraryExercise);
  }
  return blueprint;
}

function handleExerciseFormSubmit(event) {
  event.preventDefault();
  if (!state.activeSession || !addExerciseForm) return;
  const form = new FormData(addExerciseForm);
  const name = String(form.get("name") || "").trim();
  if (!name) {
    showNotice("Enter an exercise name.", "warn");
    addExerciseForm.elements.name?.focus();
    return;
  }
  const blueprint = blueprintFromExerciseForm(form);
  const duplicateIndex = state.activeSession.logs.findIndex((log, index) => exerciseIdentity(log) === exerciseIdentity(blueprint) && index !== exerciseDialogIndex);
  if (duplicateIndex >= 0) {
    closeAddExerciseDialog();
    setActiveExercise(duplicateIndex);
    requestAnimationFrame(() => document.querySelector(`#exercise-${duplicateIndex}`)?.scrollIntoView({ behavior: "smooth", block: "center" }));
    showNotice(`${name} is already in this workout.`, "warn");
    return;
  }
  const bodyweight = Number(state.activeSession.bodyweight || getLatestWeight()?.weight || 0);
  const log = buildSessionLog(blueprint, bodyweight);
  let targetIndex;
  if (exerciseDialogMode === "replace" && Number.isInteger(exerciseDialogIndex)) {
    targetIndex = exerciseDialogIndex;
    state.activeSession.logs.splice(targetIndex, 1, log);
  } else {
    targetIndex = Math.min(Number(state.activeSession.activeExerciseIndex || 0) + 1, state.activeSession.logs.length);
    state.activeSession.logs.splice(targetIndex, 0, log);
  }
  state.activeSession.activeExerciseIndex = targetIndex;
  saveActiveWorkoutLayout();
  saveState();
  closeAddExerciseDialog();
  renderActiveSession();
  setActiveExercise(targetIndex);
  requestAnimationFrame(() => document.querySelector(`#exercise-${targetIndex}`)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  showNotice(exerciseDialogMode === "replace" ? `${name} substituted. Its history remains separate.` : `${name} added and saved to this workout.`, "good");
}

function moveExercise(index, direction) {
  if (!state.activeSession) return;
  const next = index + direction;
  if (next < 0 || next >= state.activeSession.logs.length) return;
  const [log] = state.activeSession.logs.splice(index, 1);
  state.activeSession.logs.splice(next, 0, log);
  state.activeSession.activeExerciseIndex = next;
  saveActiveWorkoutLayout();
  saveState();
  renderActiveSession();
  requestAnimationFrame(() => document.querySelector(`#exercise-${next}`)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  showNotice("Exercise order saved for this workout.", "good");
}

function removeExercise(index) {
  if (!state.activeSession || state.activeSession.logs.length <= 1) {
    showNotice("A workout needs at least one exercise.", "warn");
    return;
  }
  const log = state.activeSession.logs[index];
  if (!log) return;
  const completed = (log.sets || []).some((set) => set.completed) || Boolean(log.drop?.completed);
  const message = completed
    ? `Remove ${log.name} and its completed sets from this active workout?`
    : `Remove ${log.name} from this workout and future versions of this routine?`;
  if (!confirm(message)) return;
  state.activeSession.logs.splice(index, 1);
  state.activeSession.activeExerciseIndex = Math.max(0, Math.min(index, state.activeSession.logs.length - 1));
  saveActiveWorkoutLayout();
  saveState();
  renderActiveSession();
  showNotice(`${log.name} removed from this workout.`, "good");
}

function prepareAudio() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  if (!audioContext) audioContext = new AudioContextClass();
  if (audioContext.state === "suspended") audioContext.resume().catch(() => {});
}

function playTimerBeep() {
  prepareAudio();
  if (!audioContext) return;
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
  gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.18, audioContext.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.22);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.24);
}

function startRestTimer(seconds, exerciseName) {
  prepareAudio();
  clearInterval(restTimerInterval);
  restTimerEndAt = Date.now() + seconds * 1000;
  restTimer?.classList.remove("hidden");
  document.body.classList.add("rest-timer-active");
  if (restTimerExercise) restTimerExercise.textContent = exerciseName;
  if (restTimerStatus) restTimerStatus.textContent = "Resting";
  if (restTimerDismiss) restTimerDismiss.textContent = "Skip";
  updateRestTimerDisplay();
  restTimerInterval = setInterval(updateRestTimerDisplay, 250);
}

function updateRestTimerDisplay() {
  if (!restTimerEndAt) return;
  const remaining = Math.max(0, Math.ceil((restTimerEndAt - Date.now()) / 1000));
  if (restTimerTime) restTimerTime.textContent = formatTimer(remaining);
  if (remaining <= 0) completeRestTimer();
}

function formatTimer(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function adjustRestTimer(seconds) {
  if (!restTimerEndAt) return;
  restTimerEndAt = Math.max(Date.now(), restTimerEndAt + seconds * 1000);
  updateRestTimerDisplay();
}

function completeRestTimer() {
  clearInterval(restTimerInterval);
  restTimerInterval = null;
  restTimerEndAt = 0;
  if (restTimerTime) restTimerTime.textContent = "00:00";
  if (restTimerStatus) restTimerStatus.textContent = "Rest complete";
  if (restTimerDismiss) restTimerDismiss.textContent = "Dismiss";
  if (navigator.vibrate) navigator.vibrate([160, 80, 160]);
  playTimerBeep();
}

function dismissRestTimer() {
  clearInterval(restTimerInterval);
  restTimerInterval = null;
  restTimerEndAt = 0;
  restTimer?.classList.add("hidden");
  document.body.classList.remove("rest-timer-active");
}

restTimer?.querySelectorAll("[data-timer-adjust]").forEach((button) => {
  button.addEventListener("click", () => adjustRestTimer(Number(button.dataset.timerAdjust)));
});
restTimerDismiss?.addEventListener("click", dismissRestTimer);

function finishSession() {
  if (!state.activeSession) return;
  commitAllActiveInputs();
  const completed = countCompletedSets(state.activeSession);
  const planned = countPlannedSets(state.activeSession);
  if (!completed) {
    showNotice("Log at least one completed set before finishing the workout.", "warn");
    return;
  }
  if (completed < planned && !confirm(`${planned - completed} planned set${planned - completed === 1 ? " is" : "s are"} not logged. Finish anyway? Only completed sets will count.`)) return;

  dismissRestTimer();
  const finished = {
    ...state.activeSession,
    notes: view.querySelector("#session-notes")?.value || state.activeSession.notes || "",
    completedAt: new Date().toISOString()
  };
  const prev = previousSession(finished.workoutId, finished.id);
  const prevVolume = prev ? calcSessionVolume(prev) : 0;
  const currentVolume = calcSessionVolume(finished);
  finished.previousVolume = prevVolume;
  finished.deltaVolume = currentVolume - prevVolume;
  state.sessions.push(finished);
  if (finished.workoutId.startsWith("strength")) state.settings.fridayRotationIndex = (state.settings.fridayRotationIndex + 1) % 3;
  state.activeSession = null;
  saveState();
  syncShellMode();
  renderWorkoutComplete(finished);
}

function renderWorkoutComplete(session) {
  const workout = PROGRAM[session.workoutId];
  const volume = calcSessionVolume(session);
  const delta = volume - (session.previousVolume || 0);
  const durationMinutes = Math.max(1, Math.round((new Date(session.completedAt) - new Date(session.startedAt)) / 60000));
  const counts = progressionCounts(session, session.completedAt);
  const averageRpe = sessionAverageRpe(session);
  const dropoff = sessionDropoffPercent(session);
  const best = sessionBestSet(session);
  const jointFlags = sessionJointFlags(session);
  const muscles = sessionMuscleBreakdown(session);
  document.body.classList.remove("workout-mode");
  stopSessionClock();
  pageTitle.textContent = "Workout Complete";
  view.innerHTML = `
    <section class="completion-hero">
      <span>SESSION COMPLETE</span>
      <h2>${workout?.title || session.workoutId}</h2>
      <div class="completion-primary"><strong>${kg(volume)}</strong><small>kg completed volume</small></div>
      <div class="completion-strip completion-strip-advanced">
        <div><strong>${durationMinutes}</strong><span>minutes</span></div>
        <div><strong>${countHardSets(session)}</strong><span>hard sets</span></div>
        <div><strong>${averageRpe !== null ? averageRpe.toFixed(1) : "—"}</strong><span>avg RPE</span></div>
        <div><strong>${dropoff !== null ? `${dropoff >= 0 ? "" : "+"}${dropoff.toFixed(0)}%` : "—"}</strong><span>set drop-off</span></div>
      </div>
      <div class="completion-progress-counts">
        <div class="positive"><strong>${counts.positive}</strong><span>progressed</span></div>
        <div><strong>${counts.neutral}</strong><span>maintained</span></div>
        <div class="negative"><strong>${counts.negative}</strong><span>regressed</span></div>
        ${counts.baseline ? `<div><strong>${counts.baseline}</strong><span>baseline</span></div>` : ""}
      </div>
      <div class="completion-volume-delta ${delta >= 0 ? "positive" : "negative"}">${delta >= 0 ? "+" : ""}${kg(delta)} kg versus previous same workout</div>
    </section>
    ${best ? `<section class="completion-highlight"><span>BEST PERFORMANCE SET</span><h3>${escapeHtml(best.log.name)}</h3><strong>${escapeHtml(formatSetResult(best.set, best.log))}</strong></section>` : ""}
    <section class="completion-muscles">
      <header><span>MUSCLE WORKLOAD</span><strong>Direct completed hard sets</strong></header>
      <div>${muscles.map(([muscle, sets]) => `<span><b>${sets}</b>${escapeHtml(muscle)}</span>`).join("")}</div>
    </section>
    ${jointFlags.length ? `<section class="completion-joint-alert"><span>JOINT FLAGS</span><strong>${jointFlags.map((log) => `${escapeHtml(log.name)}: ${escapeHtml(log.feedback.joints)}`).join(" · ")}</strong></section>` : ""}
    <section class="completion-exercises">
      <header><span>EXERCISE READOUT</span><strong>Load, reps and effort compared like-for-like</strong></header>
      ${session.logs.map((log) => {
        const previousLog = exerciseHistoryEntries(log).find(({ session: item }) => item.id !== session.id && String(item.completedAt || "") < session.completedAt)?.log || null;
        const result = matchedProgress(log, previousLog);
        const feedback = log.feedback || {};
        const bestSet = bestSetForLog(log);
        const exerciseDropoff = exerciseDropoffPercent(log);
        const avg = averageRpeForSets(hardSetsForLog(log));
        return `<article class="completion-exercise ${result.tone}">
          <div><h3>${escapeHtml(log.name)}</h3><p>${escapeHtml(result.label)}</p></div>
          <span>${escapeHtml(result.detail)}</span>
          <div class="completion-exercise-metrics">
            <small>Best: ${escapeHtml(formatSetResult(bestSet, log))}</small>
            <small>${hardSetsForLog(log).length} hard sets${avg !== null ? ` · RPE ${avg.toFixed(1)}` : ""}${exerciseDropoff !== null ? ` · ${exerciseDropoff.toFixed(0)}% drop-off` : ""}</small>
          </div>
          ${(feedback.target || feedback.joints || feedback.execution) ? `<small>Target: ${feedback.target || "—"} · Joints: ${feedback.joints || "—"} · Execution: ${feedback.execution || "—"}</small>` : ""}
        </article>`;
      }).join("")}
    </section>
    <button class="primary full" data-route-jump="today" type="button">Return to Today</button>
  `;
  view.querySelector("[data-route-jump]")?.addEventListener("click", () => setRoute("today"));
}

function lastExerciseVolumeFromBefore(log, workoutId, beforeIso) {
  const last = [...state.sessions]
    .filter((session) => session.workoutId === workoutId && String(session.completedAt || "") < beforeIso)
    .sort((a, b) => String(b.completedAt || "").localeCompare(String(a.completedAt || "")))[0];
  const found = findPreviousLog(last, log.exerciseId, log.variantId, log.name);
  return found ? calcExerciseVolume(found) : 0;
}

function renderBody() {
  const weights = [...state.weights].sort((a, b) => b.date.localeCompare(a.date));
  const today = todayISO();
  const entry = getWeightForDate(today);
  const latest = getLatestWeight();
  const average = sevenDayAverage();
  const priorAverage = previousSevenDayAverage();
  const averageDelta = average !== null && priorAverage !== null ? average - priorAverage : null;
  view.innerHTML = `
    <section class="strata-page-head body-head">
      <span>BODY STRATA</span>
      <h2>Daily input. Weekly signal.</h2>
      <p>The seven-day average matters more than a single morning.</p>
    </section>
    <section class="body-dashboard">
      <div class="body-main-stat"><span>7-DAY AVERAGE</span><strong>${average !== null ? `${kg(average)} kg` : "—"}</strong><small>${averageDelta !== null ? `${averageDelta >= 0 ? "+" : ""}${kg(averageDelta)} kg vs previous 7 days` : "Log enough days to establish the trend"}</small></div>
      <div class="body-side-stat"><span>TODAY</span><strong>${latest ? `${kg(latest.weight)} kg` : "—"}</strong><small>${latest ? niceDate(latest.date) : "No entry"}</small></div>
    </section>
    <section class="weight-entry-panel">
      <form data-form="quick-weight">
        <div><label for="body-weight">TODAY'S WEIGHT</label><input id="body-weight" name="weight" type="number" step="0.1" inputmode="decimal" value="${entry?.weight || ""}" required><span>kg</span></div>
        <button class="primary" type="submit">Save</button>
      </form>
    </section>
    <section class="weight-log-panel">
      <header><span>RECENT WEIGH-INS</span><strong>${weights.length} total entries</strong></header>
      <div class="weight-sparkline" aria-label="Recent bodyweight trend">${weights.slice(0, 14).reverse().map((item) => `<i style="--h:${Math.max(12, Math.min(100, 35 + (Number(item.weight) - Number(average || item.weight)) * 18))}%" title="${niceDate(item.date)}: ${kg(item.weight)} kg"></i>`).join("")}</div>
      <div class="compact-log">
        ${weights.slice(0, 14).map((weightEntry) => `<div><span>${niceDate(weightEntry.date)}</span><strong>${kg(weightEntry.weight)} kg</strong><button data-action="delete-weight" data-date="${weightEntry.date}" type="button">×</button></div>`).join("") || `<p class="muted">No weights logged yet.</p>`}
      </div>
    </section>
  `;
  attachCommonHandlers();
}

function saveWeight(date, weight) {
  const numeric = Number(weight);
  if (!date || !Number.isFinite(numeric) || numeric <= 0) {
    showNotice("Enter a valid bodyweight.", "warn");
    return;
  }
  const existing = state.weights.find((entry) => entry.date === date);
  if (existing) existing.weight = numeric;
  else state.weights.push({ date, weight: numeric });
  state.weights.sort((a, b) => a.date.localeCompare(b.date));
  if (state.activeSession?.date === date) {
    state.activeSession.bodyweight = numeric;
    state.activeSession.logs.forEach((log) => {
      if (log.volumeMode === "bodyweightAdded") log.bodyweight = numeric;
    });
  }
  saveState();
  showNotice("Weight saved.", "good");
  render();
}

function renderPhysique() {
  releaseObjectUrls();
  const latest = latestPhotoSet();
  const due = daysSince(latest?.date) >= 7;
  view.innerHTML = `
    <section class="strata-page-head physique-head">
      <span>PHYSIQUE STRATA</span>
      <h2>Same poses. Same evidence.</h2>
      <p>Front, back and side every week. Photos stay on this device.</p>
      <b class="${due ? "due" : "current"}">${due ? "WEEKLY SET DUE" : `CURRENT · ${niceDate(latest.date)}`}</b>
    </section>
    <section class="card">
      <form data-form="photos">
        <div class="photo-grid">
          ${photoInput("front", "Front")}
          ${photoInput("back", "Back")}
          ${photoInput("side", "Side")}
        </div>
        <label class="field"><span>Photo notes</span><textarea name="notes" placeholder="Lighting, pump, morning/evening, anything that affects comparison."></textarea></label>
        <button class="primary full" type="submit">Save weekly photo set</button>
      </form>
      <p id="storage-summary" class="muted storage-summary">Checking device storage…</p>
    </section>
    <section class="card">
      <p class="label">Photo timeline</p>
      <div class="timeline">
        ${[...state.photoSets].sort((a, b) => b.date.localeCompare(a.date)).map(photoSetCard).join("") || `<p class="muted">No photo sets yet.</p>`}
      </div>
    </section>
  `;
  attachCommonHandlers();
  view.querySelectorAll("input[type=file]").forEach((input) => input.addEventListener("change", previewFile));
  hydratePhotoImages();
  updateStorageSummary();
}

function photoInput(id, label) {
  return `
    <label class="photo-capture-tile">
      <input name="${id}" type="file" accept="image/*" capture="environment" />
      <span class="photo-orientation">${label.toUpperCase()}</span>
      <div class="pose-guide"><i></i><i></i><i></i></div>
      <strong>Capture ${label}</strong>
      <small>Tap to take or choose photo</small>
      <img class="photo-preview" data-preview="${id}" alt="${label} preview" />
    </label>
  `;
}

function photoSetCard(set) {
  return `
    <article class="card compact">
      <div class="card-head">
        <div><h3>${niceDate(set.date)}</h3><p class="muted">${escapeHtml(set.notes || "No notes")}</p></div>
        <button class="ghost small" data-action="delete-photos" data-id="${set.id}" type="button">Delete</button>
      </div>
      <div class="thumb-row">
        ${["front", "back", "side"].map((key) => {
          const photoId = set.photoKeys?.[key];
          return photoId
            ? `<img data-photo-id="${photoId}" alt="${key} ${set.date}">`
            : `<div class="metric"><span class="label">${key}</span><span class="muted">missing</span></div>`;
        }).join("")}
      </div>
    </article>
  `;
}

function previewFile(event) {
  const input = event.target;
  const preview = view.querySelector(`[data-preview="${input.name}"]`);
  const file = input.files?.[0];
  if (!file || !preview) return;
  const old = previewObjectUrls.get(input.name);
  if (old) URL.revokeObjectURL(old);
  const url = URL.createObjectURL(file);
  previewObjectUrls.set(input.name, url);
  preview.src = url;
}

async function compressImageToBlob(file) {
  let source;
  let width;
  let height;
  if ("createImageBitmap" in window) {
    source = await createImageBitmap(file);
    width = source.width;
    height = source.height;
  } else {
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    source = await new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = dataUrl;
    });
    width = source.naturalWidth;
    height = source.naturalHeight;
  }
  const maxSide = 1200;
  const scale = Math.min(1, maxSide / Math.max(width, height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width * scale));
  canvas.height = Math.max(1, Math.round(height * scale));
  const context = canvas.getContext("2d", { alpha: false });
  context.drawImage(source, 0, 0, canvas.width, canvas.height);
  source.close?.();
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Could not compress photo")), "image/jpeg", 0.78);
  });
}

async function savePhotoSet(form) {
  const files = Object.fromEntries(["front", "back", "side"].map((key) => [key, form.elements[key]?.files?.[0] || null]));
  if (!files.front && !files.back && !files.side) {
    showNotice("Add at least one photo before saving.", "warn");
    return;
  }
  const button = form.querySelector("button[type=submit]");
  button.disabled = true;
  button.textContent = "Saving photos…";
  const date = todayISO();
  const existing = state.photoSets.find((set) => set.date === date);
  const setId = existing?.id || uid();
  const photoKeys = { ...(existing?.photoKeys || {}) };
  const writtenIds = [];
  try {
    for (const key of ["front", "back", "side"]) {
      if (!files[key]) continue;
      const blob = await compressImageToBlob(files[key]);
      const photoId = `photo:${setId}:${key}`;
      await putPhotoBlob(photoId, blob, setId, key);
      photoKeys[key] = photoId;
      writtenIds.push(photoId);
    }
    if (existing) {
      existing.photoKeys = photoKeys;
      existing.notes = form.elements.notes.value || existing.notes || "";
    } else {
      state.photoSets.push({ id: setId, date, notes: form.elements.notes.value || "", photoKeys });
    }
    if (!saveState()) throw new Error("Metadata save failed");
    showNotice(existing ? "Today's photo set updated." : "Photo set saved.", "good");
    renderPhysique();
  } catch (error) {
    console.error(error);
    if (!existing) await Promise.all(writtenIds.map((id) => deletePhotoBlob(id).catch(() => {})));
    showNotice("Photos could not be saved. Check available device storage.", "danger", 0);
    button.disabled = false;
    button.textContent = "Save weekly photo set";
  }
}

function openMediaDb() {
  if (!window.indexedDB) return Promise.reject(new Error("IndexedDB unavailable"));
  if (mediaDbPromise) return mediaDbPromise;
  mediaDbPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(MEDIA_DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(MEDIA_STORE)) db.createObjectStore(MEDIA_STORE, { keyPath: "id" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Could not open photo database"));
  });
  return mediaDbPromise;
}

async function runPhotoTransaction(mode, callback) {
  const db = await openMediaDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(MEDIA_STORE, mode);
    const store = tx.objectStore(MEDIA_STORE);
    let result;
    try {
      result = callback(store);
    } catch (error) {
      reject(error);
      return;
    }
    tx.oncomplete = () => resolve(result);
    tx.onerror = () => reject(tx.error || new Error("Photo database transaction failed"));
    tx.onabort = () => reject(tx.error || new Error("Photo database transaction aborted"));
  });
}

async function putPhotoBlob(id, blob, setId, viewName) {
  return runPhotoTransaction("readwrite", (store) => store.put({ id, blob, setId, viewName, updatedAt: new Date().toISOString() }));
}

async function getPhotoRecord(id) {
  const db = await openMediaDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(MEDIA_STORE, "readonly");
    const request = tx.objectStore(MEDIA_STORE).get(id);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => reject(request.error);
  });
}

async function getAllPhotoRecords() {
  const db = await openMediaDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(MEDIA_STORE, "readonly");
    const request = tx.objectStore(MEDIA_STORE).getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

async function deletePhotoBlob(id) {
  return runPhotoTransaction("readwrite", (store) => store.delete(id));
}

async function clearPhotoDb() {
  return runPhotoTransaction("readwrite", (store) => store.clear());
}

async function hydratePhotoImages() {
  const images = Array.from(view.querySelectorAll("img[data-photo-id]"));
  await Promise.all(images.map(async (image) => {
    try {
      const record = await getPhotoRecord(image.dataset.photoId);
      if (!record?.blob || !image.isConnected) return;
      const url = URL.createObjectURL(record.blob);
      activeObjectUrls.add(url);
      image.src = url;
    } catch (error) {
      image.alt = "Photo unavailable";
    }
  }));
}

function releaseObjectUrls() {
  activeObjectUrls.forEach((url) => URL.revokeObjectURL(url));
  activeObjectUrls.clear();
  previewObjectUrls.forEach((url) => URL.revokeObjectURL(url));
  previewObjectUrls.clear();
}

async function updateStorageSummary() {
  const target = view.querySelector("#storage-summary");
  if (!target) return;
  try {
    const records = await getAllPhotoRecords();
    const bytes = records.reduce((sum, record) => sum + Number(record.blob?.size || 0), 0);
    const estimate = await navigator.storage?.estimate?.();
    const quotaText = estimate?.quota ? ` of about ${(estimate.quota / 1048576).toFixed(0)} MB available to this browser` : "";
    target.textContent = `${records.length} stored photo${records.length === 1 ? "" : "s"} · ${(bytes / 1048576).toFixed(1)} MB used${quotaText}.`;
  } catch (error) {
    target.textContent = "Photo storage status unavailable.";
  }
}

function dataUrlToBlob(dataUrl) {
  const [header, data] = dataUrl.split(",");
  const type = /data:(.*?);/.exec(header)?.[1] || "image/jpeg";
  const binary = atob(data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type });
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function migrateLegacyPhotos() {
  let changed = false;
  for (const set of state.photoSets || []) {
    if (!set.photos) continue;
    const photoKeys = { ...(set.photoKeys || {}) };
    for (const key of ["front", "back", "side"]) {
      const dataUrl = set.photos[key];
      if (!dataUrl) continue;
      const id = `photo:${set.id}:${key}`;
      await putPhotoBlob(id, dataUrlToBlob(dataUrl), set.id, key);
      photoKeys[key] = id;
    }
    set.photoKeys = photoKeys;
    delete set.photos;
    changed = true;
  }
  if (changed) {
    saveState();
    showNotice("Existing photos were moved into safer device storage.", "good");
  }
}

function renderHistory() {
  const sessions = [...state.sessions].sort((a, b) => String(b.completedAt || "").localeCompare(String(a.completedAt || "")));
  const workload = weeklyMuscleWorkload();
  const unique = new Map();
  sessions.forEach((session) => (session.logs || []).forEach((log) => {
    const key = exerciseIdentity(log);
    if (!unique.has(key)) unique.set(key, log);
  }));
  const exercises = [...unique.values()].sort((a, b) => String(a.name).localeCompare(String(b.name)));
  view.innerHTML = `
    <section class="history-hero">
      <span>TRAINING INTELLIGENCE</span>
      <h2>History that explains progression.</h2>
      <p>Exercise performance, weekly muscle workload and session-level signals.</p>
    </section>
    <section class="muscle-workload-panel">
      <header><div><span>THIS WEEK</span><h3>Muscle workload</h3></div><strong>Completed / planned direct hard sets</strong></header>
      <div class="muscle-workload-list">
        ${workload.map((item) => {
          const percent = item.planned ? Math.min(100, Math.round((item.completed / item.planned) * 100)) : (item.completed ? 100 : 0);
          return `<article>
            <div><strong>${escapeHtml(item.muscle)}</strong><span>${item.frequency} session${item.frequency === 1 ? "" : "s"}${item.averageRpe !== null ? ` · RPE ${item.averageRpe.toFixed(1)}` : ""}</span></div>
            <div class="muscle-set-count"><b>${item.completed}</b><span>/ ${item.planned || "—"}</span></div>
            <i><span style="width:${percent}%"></span></i>
          </article>`;
        }).join("") || `<p class="muted">Complete a workout to build this week’s muscle readout.</p>`}
      </div>
    </section>
    <section class="exercise-history-panel">
      <header><div><span>EXERCISES</span><h3>Performance history</h3></div><strong>${exercises.length} tracked movements</strong></header>
      <div class="exercise-history-grid">
        ${exercises.map((log) => {
          const stats = exerciseHistoryStats(log);
          const latest = stats.latest;
          const best = stats.best;
          return `<button class="exercise-history-card" data-action="open-exercise-history" data-identity="${escapeHtml(exerciseIdentity(log))}" type="button">
            <div><span>${escapeHtml(log.muscle || "Other")}</span><h4>${escapeHtml(log.name)}</h4></div>
            <strong>${best ? escapeHtml(formatSetResult(best.set, best.log)) : "No completed sets"}</strong>
            <small>${latest ? `${niceDate(latest.session.date)} · ${stats.progression?.label || "Baseline"}` : "No history"}</small>
          </button>`;
        }).join("") || `<p class="muted">No exercise history yet.</p>`}
      </div>
    </section>
    <section class="card session-history-panel">
      <p class="label">Sessions</p>
      ${sessions.map(sessionHistoryCard).join("") || `<p class="muted">No workouts finished yet.</p>`}
    </section>
    <section class="card">
      <p class="label">Data safety</p>
      <div class="button-row">
        <button class="secondary" data-action="export-data" type="button">Export full backup</button>
        <button class="ghost" data-action="import-data" type="button">Import</button>
      </div>
      <input id="import-file" class="hidden" type="file" accept="application/json" />
      <p class="muted backup-status">Last backup: <strong>${niceDateTime(state.settings.lastBackupAt)}</strong></p>
      <p class="muted">The backup includes workouts, weights and IndexedDB photos.</p>
    </section>
  `;
  attachCommonHandlers();
}

function sessionHistoryCard(session) {
  const workout = PROGRAM[session.workoutId];
  const volume = calcSessionVolume(session);
  const delta = session.deltaVolume ?? volume - (session.previousVolume || 0);
  const counts = progressionCounts(session, session.completedAt);
  const avg = sessionAverageRpe(session);
  return `
    <article class="history-session">
      <div><span>${niceDate(session.date)}</span><h3>${workout?.title || session.workoutId}</h3><p>${counts.positive} progressed · ${counts.neutral} maintained · ${counts.negative} regressed${avg !== null ? ` · RPE ${avg.toFixed(1)}` : ""}</p></div>
      <div><strong>${kg(volume)} kg</strong><small>${countHardSets(session)} hard sets</small><b class="${delta >= 0 ? "positive" : "negative"}">${delta >= 0 ? "+" : ""}${kg(delta)}</b></div>
      ${session.notes ? `<p class="history-note">${escapeHtml(session.notes)}</p>` : ""}
    </article>
  `;
}

function attachCommonHandlers() {
  view.querySelectorAll("[data-action='start-workout']").forEach((button) => button.addEventListener("click", () => startWorkout(button.dataset.workout)));
  view.querySelectorAll("[data-route-jump]").forEach((button) => button.addEventListener("click", () => setRoute(button.dataset.routeJump)));
  view.querySelectorAll("[data-action='minimize-session']").forEach((button) => button.addEventListener("click", () => setRoute("today")));
  view.querySelectorAll("[data-action='jump-exercise']").forEach((button) => button.addEventListener("click", () => jumpExercise(Number(button.dataset.dir))));
  view.querySelectorAll("[data-action='add-set']").forEach((button) => button.addEventListener("click", () => addSet(Number(button.dataset.ex))));
  view.querySelectorAll("[data-action='add-drop-set']").forEach((button) => button.addEventListener("click", () => addDropSet(Number(button.dataset.ex))));
  view.querySelectorAll("[data-action='remove-drop-set']").forEach((button) => button.addEventListener("click", () => removeDropSet(Number(button.dataset.ex))));
  view.querySelectorAll("[data-action='add-exercise']").forEach((button) => button.addEventListener("click", openAddExerciseDialog));
  view.querySelectorAll("[data-action='replace-exercise']").forEach((button) => button.addEventListener("click", () => openReplaceExerciseDialog(Number(button.dataset.ex))));
  view.querySelectorAll("[data-action='move-exercise']").forEach((button) => button.addEventListener("click", () => moveExercise(Number(button.dataset.ex), Number(button.dataset.dir))));
  view.querySelectorAll("[data-action='remove-exercise']").forEach((button) => button.addEventListener("click", () => removeExercise(Number(button.dataset.ex))));
  view.querySelectorAll("[data-action='exercise-history']").forEach((button) => button.addEventListener("click", () => openExerciseHistory(Number(button.dataset.ex))));
  view.querySelectorAll("[data-action='open-exercise-history']").forEach((button) => button.addEventListener("click", () => {
    const target = state.sessions.flatMap((session) => session.logs || []).find((log) => exerciseIdentity(log) === button.dataset.identity);
    if (target) openExerciseHistoryByTarget(target);
  }));
  view.querySelectorAll("[data-action='remove-set']").forEach((button) => button.addEventListener("click", () => removeSet(Number(button.dataset.ex))));
  view.querySelectorAll("[data-action='add-warmup-set']").forEach((button) => button.addEventListener("click", () => addWarmupSet(Number(button.dataset.ex))));
  view.querySelectorAll("[data-action='cycle-set-type']").forEach((button) => button.addEventListener("click", () => cycleSetType(Number(button.dataset.ex), Number(button.dataset.set), button)));
  view.querySelectorAll("[data-setup-note]").forEach((input) => input.addEventListener("change", () => saveSetupNote(Number(input.dataset.ex), input.value.trim())));
  view.querySelectorAll("[data-action='exercise-feedback']").forEach((button) => button.addEventListener("click", () => setExerciseFeedback(Number(button.dataset.ex), button.dataset.field, button.dataset.value, button)));
  view.querySelectorAll("[data-action='rotate-friday']").forEach((button) => button.addEventListener("click", () => {
    const dir = Number(button.dataset.dir || 1);
    state.settings.fridayRotationIndex = (state.settings.fridayRotationIndex + dir + 3) % 3;
    saveState();
    renderTraining();
  }));
  view.querySelectorAll("[data-exercise-choice]").forEach((select) => select.addEventListener("change", () => {
    state.settings.exerciseChoices[select.dataset.exerciseChoice] = select.value;
    saveState();
    showNotice("Exercise choice saved.", "good");
  }));
  view.querySelectorAll("[data-action='cancel-session']").forEach((button) => button.addEventListener("click", () => {
    if (!confirm("Discard this active workout? Logged set data will be removed.")) return;
    dismissRestTimer();
    stopSessionClock();
    state.activeSession = null;
    saveState();
    syncShellMode();
    renderTraining();
  }));
  view.querySelectorAll("[data-action='log-set']").forEach((button) => button.addEventListener("click", () => completeSet(Number(button.dataset.ex), Number(button.dataset.set), false, button)));
  view.querySelectorAll("[data-action='log-drop']").forEach((button) => button.addEventListener("click", () => completeSet(Number(button.dataset.ex), null, true, button)));
  view.querySelectorAll("[data-action='edit-set']").forEach((button) => button.addEventListener("click", () => editSet(Number(button.dataset.ex), Number(button.dataset.set), false, button)));
  view.querySelectorAll("[data-action='edit-drop']").forEach((button) => button.addEventListener("click", () => editSet(Number(button.dataset.ex), null, true, button)));
  view.querySelectorAll("[data-action='set-effort']").forEach((button) => button.addEventListener("click", () => {
    setEffort(Number(button.dataset.ex), button.dataset.set !== undefined ? Number(button.dataset.set) : null, button.dataset.scale, button.dataset.value, button.dataset.drop === "true", button);
  }));
  view.querySelectorAll("[data-action='set-effort-scale']").forEach((button) => button.addEventListener("click", () => setEffortScale(button.dataset.scale)));
  view.querySelectorAll("[data-action='finish-session']").forEach((button) => button.addEventListener("click", finishSession));
  view.querySelectorAll("form[data-form='quick-weight']").forEach((form) => form.addEventListener("submit", (event) => {
    event.preventDefault();
    saveWeight(todayISO(), form.elements.weight.value);
  }));
  view.querySelectorAll("form[data-form='photos']").forEach((form) => form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await savePhotoSet(form);
  }));
  view.querySelectorAll("[data-action='delete-weight']").forEach((button) => button.addEventListener("click", () => {
    state.weights = state.weights.filter((entry) => entry.date !== button.dataset.date);
    saveState();
    renderBody();
  }));
  view.querySelectorAll("[data-action='delete-photos']").forEach((button) => button.addEventListener("click", async () => {
    const set = state.photoSets.find((item) => item.id === button.dataset.id);
    if (!set || !confirm(`Delete the photo set from ${niceDate(set.date)}?`)) return;
    await Promise.all(Object.values(set.photoKeys || {}).map((id) => deletePhotoBlob(id).catch(() => {})));
    state.photoSets = state.photoSets.filter((item) => item.id !== set.id);
    saveState();
    renderPhysique();
  }));
  view.querySelectorAll("[data-action='export-data']").forEach((button) => button.addEventListener("click", () => exportData(button)));
  view.querySelectorAll("[data-action='import-data']").forEach((button) => button.addEventListener("click", () => view.querySelector("#import-file")?.click()));
  view.querySelector("#import-file")?.addEventListener("change", importData);
}

async function exportData(button) {
  const original = button?.textContent;
  if (button) {
    button.disabled = true;
    button.textContent = "Preparing…";
  }
  try {
    const records = await getAllPhotoRecords();
    const photos = {};
    for (const record of records) photos[record.id] = await blobToDataUrl(record.blob);
    state.settings.lastBackupAt = new Date().toISOString();
    saveState();
    const backup = {
      format: "strata-personal-backup-v2",
      appVersion: APP_VERSION,
      exportedAt: state.settings.lastBackupAt,
      state,
      photos
    };
    const blob = new Blob([JSON.stringify(backup)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `strata-personal-backup-${todayISO()}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showNotice("Full backup exported.", "good");
    renderHistory();
  } catch (error) {
    console.error(error);
    showNotice("Backup could not be created.", "danger", 0);
    if (button) {
      button.disabled = false;
      button.textContent = original;
    }
  }
}

function importData(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async () => {
    try {
      const parsed = JSON.parse(reader.result);
      const incomingState = parsed.format === "strata-personal-backup-v2" ? parsed.state : parsed;
      if (!incomingState || !Array.isArray(incomingState.sessions) || !Array.isArray(incomingState.weights)) throw new Error("Invalid backup");
      if (!confirm("Import this backup and replace the current STRATA data on this device?")) return;
      await clearPhotoDb();
      if (parsed.photos) {
        for (const [id, dataUrl] of Object.entries(parsed.photos)) {
          const match = /^photo:([^:]+):(front|back|side)$/.exec(id);
          await putPhotoBlob(id, dataUrlToBlob(dataUrl), match?.[1] || "imported", match?.[2] || "photo");
        }
      }
      const defaults = defaultState();
      state = {
        ...defaults,
        ...incomingState,
        settings: { ...defaults.settings, ...(incomingState.settings || {}) }
      };
      await migrateLegacyPhotos();
      saveState();
      showNotice("Backup imported.", "good");
      renderHistory();
    } catch (error) {
      console.error(error);
      showNotice("Could not import that backup file.", "danger", 0);
    }
  };
  reader.readAsText(file);
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));
}

savedExerciseSelect?.addEventListener("change", () => fillExerciseFormFromSaved(savedExerciseSelect.value));
addExerciseForm?.addEventListener("submit", handleExerciseFormSubmit);
document.querySelector("#add-exercise-cancel")?.addEventListener("click", closeAddExerciseDialog);
addExerciseDialog?.addEventListener("click", (event) => {
  if (event.target === addExerciseDialog) closeAddExerciseDialog();
});
exerciseHistoryDialog?.addEventListener("click", (event) => {
  if (event.target === exerciseHistoryDialog) closeExerciseHistoryDialog();
});

async function initializeApp() {
  normalizeExistingData();
  try {
    await openMediaDb();
    await migrateLegacyPhotos();
  } catch (error) {
    console.error(error);
    showNotice("Photo storage is not available in this browser. Workouts and weights will still work.", "danger", 0);
  }
  syncShellMode();
  render();
}

if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});

initializeApp();
