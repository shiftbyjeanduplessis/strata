const APP_VERSION = "STRATA v1.5.11";
const STORE_KEY = "strata:personal:v1";
const MEDIA_DB_NAME = "strata-personal-media-v1";
const MEDIA_STORE = "photos";
const DEFAULT_SUPABASE_URL = "https://yifjzpbmftaocanmayyc.supabase.co";
const DEFAULT_SUPABASE_KEY = "sb_publishable_fmtBHOcbDr2Xs2_l1Fnh8w_H74_QLhV";
const CLOUD_TABLE = "strata_cloud_backups";
let cloudSyncTimer = null;
let cloudBootstrapped = false;

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


PROGRAM.adhoc = {
  id: "adhoc",
  title: "Workout on the fly",
  day: "Any time",
  description: "Start blank, add exercises as you train, and save it as a separate session.",
  exercises: []
};

const ROUTE_TITLES = {
  today: "Today",
  training: "Training Strata",
  body: "Body Strata",
  physique: "Physique Strata",
  account: "Account"
};

let state = loadState();
const APP_SHELL = document.body?.dataset?.shell || "mobile-app";
const IS_DESKTOP_PAGE = APP_SHELL === "desktop-builder";
const IS_MOBILE_PAGE = !IS_DESKTOP_PAGE;
let route = IS_DESKTOP_PAGE ? "builder" : "today";
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
let supabaseClient = null;
let supabaseUser = null;
let cloudBusy = false;

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
      lastBackupAt: null,
      cloud: {
        url: DEFAULT_SUPABASE_URL,
        anonKey: DEFAULT_SUPABASE_KEY,
        userEmail: "",
        lastSyncAt: null,
        lastRestoreAt: null,
        autoSync: true,
        lastCloudStatus: "Not signed in"
      }
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
  state.settings.cloud = { ...defaultState().settings.cloud, ...(state.settings.cloud || {}) };
  if (!state.settings.cloud.url) state.settings.cloud.url = DEFAULT_SUPABASE_URL;
  if (!state.settings.cloud.anonKey) state.settings.cloud.anonKey = DEFAULT_SUPABASE_KEY;
  if (state.settings.cloud.autoSync === undefined) state.settings.cloud.autoSync = true;
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
  if (IS_DESKTOP_PAGE && nextRoute === "today") {
    window.location.href = "index.html";
    return;
  }
  if (IS_MOBILE_PAGE && nextRoute === "builder") {
    window.location.href = "desktop.html";
    return;
  }
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
    plannedDrop: false
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
    plannedDrop: false
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
  state.settings.cloud = { ...defaultState().settings.cloud, ...(state.settings.cloud || {}) };
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
    previousReps: previousWarmups?.[setIndex]?.reps ?? "",
    drops: []
  }));
  const workingSets = Array.from({ length: Number(blueprint.sets || 3) }, (_, setIndex) => ({
    weight: previousWorking?.[setIndex]?.weight ?? "",
    reps: "",
    rir: "",
    rpe: "",
    setType: previousWorking?.[setIndex]?.setType || (setIndex === 0 && blueprint.type === "strength" ? "top" : "work"),
    completed: false,
    previousWeight: previousWorking?.[setIndex]?.weight ?? "",
    previousReps: previousWorking?.[setIndex]?.reps ?? "",
    drops: []
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
    plannedDrop: false,
    drop: null,
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

function dropSetsForLog(log) {
  const attached = (log.sets || []).flatMap((set) => Array.isArray(set.drops) ? set.drops : []);
  if (log.drop) attached.push(log.drop);
  return attached;
}

function calcExerciseVolume(log) {
  const regular = (log.sets || [])
    .filter((set) => set.setType !== "warmup")
    .reduce((sum, set) => sum + calcSetVolume(set, log), 0);
  const drops = dropSetsForLog(log).reduce((sum, drop) => sum + calcSetVolume(drop, log), 0);
  return regular + drops;
}

function calcSessionVolume(session) {
  return (session.logs || []).reduce((sum, log) => sum + calcExerciseVolume(log), 0);
}

function lastExerciseVolume(log, workoutId) {
  const found = latestExerciseHistoryLog(log);
  return found ? calcExerciseVolume(found) : 0;
}

function countPlannedSets(session) {
  return (session.logs || []).reduce((sum, log) => {
    const setCount = log.sets?.length || 0;
    const dropCount = dropSetsForLog(log).length;
    return sum + setCount + dropCount;
  }, 0);
}

function countCompletedSets(session) {
  return (session.logs || []).reduce((sum, log) => {
    const regular = (log.sets || []).filter((set) => set.completed).length;
    const drops = dropSetsForLog(log).filter((drop) => drop.completed).length;
    return sum + regular + drops;
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
  return (session.logs || []).reduce((sum, log) => sum + (log.sets || []).filter(isHardSet).length + dropSetsForLog(log).filter((drop) => drop.completed).length, 0);
}

function completedExercise(log) {
  const planned = (log.sets?.length || 0) + dropSetsForLog(log).length;
  const done = (log.sets || []).filter((set) => set.completed).length + dropSetsForLog(log).filter((drop) => drop.completed).length;
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

function repRangeBounds(text) {
  const nums = String(text || "").match(/\d+/g)?.map(Number) || [];
  if (!nums.length) return { min: null, max: null };
  if (nums.length === 1) return { min: nums[0], max: nums[0] };
  return { min: nums[0], max: nums[1] };
}

function workingSetsForProgression(log) {
  return (log.sets || []).filter((set) => set.completed && !["warmup"].includes(set.setType));
}

function doubleProgressionSignal(log) {
  const { max } = repRangeBounds(log.targetReps);
  const sets = workingSetsForProgression(log).filter((set) => set.setType !== "drop");
  if (!max || !sets.length) return { ready: false, label: "Progression check pending", detail: "Complete working sets to evaluate double progression." };
  const targetSets = Number(log.targetSets || sets.length);
  const completedBaseSets = sets.filter((set) => set.setType !== "drop");
  const completeEnough = completedBaseSets.length >= targetSets;
  const allAtTop = completeEnough && completedBaseSets.every((set) => Number(set.reps || 0) >= max);
  if (allAtTop) {
    return { ready: true, label: "Ready to progress next time", detail: `All ${completedBaseSets.length} work sets hit ${max}+ reps. Increase load about 5–10% and build back up.` };
  }
  const best = completedBaseSets.reduce((winner, set) => Math.max(winner, Number(set.reps || 0)), 0);
  return { ready: false, label: "Stay at this load", detail: `Top target is ${max} reps across all work sets. Best set today: ${best || "—"}.` };
}

function previousWorkSetText(log) {
  const previousLog = latestExerciseHistoryLog(log);
  const work = (previousLog?.sets || []).filter((set) => set.setType !== "warmup");
  if (!work.length) return "No previous work sets";
  return work.map((set) => `${set.weight || "—"}×${set.reps || "—"}`).join(" · ");
}

function exerciseVolumeDeltaText(log, previousLog) {
  const current = calcExerciseVolume(log);
  const previous = previousLog ? calcExerciseVolume(previousLog) : 0;
  const delta = current - previous;
  return { current, previous, delta, text: `${kg(current)} kg vs ${previous ? `${kg(previous)} kg` : "baseline"} (${delta >= 0 ? "+" : ""}${kg(delta)} kg)` };
}

function alternativeOptionsForLog(log) {
  const currentKey = exerciseIdentity(log);
  const library = exerciseLibraryItems();
  const sameExercise = library.filter((item) => item.exerciseId === log.exerciseId && exerciseIdentity(item) !== currentKey);
  const sameMuscle = library.filter((item) => item.muscle === log.muscle && item.exerciseId !== log.exerciseId && exerciseIdentity(item) !== currentKey).slice(0, 4);
  return [...sameExercise, ...sameMuscle].slice(0, 5);
}

function hardSetsForLog(log) {
  const sets = (log.sets || []).filter(isHardSet);
  dropSetsForLog(log).forEach((drop) => { if (drop.completed) sets.push(drop); });
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

function repRangeBucket(reps) {
  const value = Number(reps || 0);
  if (!value) return "No reps";
  if (value <= 5) return "1–5";
  if (value <= 8) return "6–8";
  if (value <= 12) return "9–12";
  if (value <= 15) return "13–15";
  return "16+";
}

function intensityLabel(avgRpe) {
  if (!Number.isFinite(avgRpe)) return "Effort missing";
  if (avgRpe < 7) return "Low";
  if (avgRpe < 8) return "Moderate";
  if (avgRpe < 9) return "Hard";
  return "Near limit";
}

function intensityTone(avgRpe) {
  if (!Number.isFinite(avgRpe)) return "missing";
  if (avgRpe < 7) return "low";
  if (avgRpe < 8) return "moderate";
  if (avgRpe < 9) return "hard";
  return "near-limit";
}

function volumeLabel(sets) {
  if (!sets) return "No volume";
  if (sets <= 2) return "Low volume";
  if (sets <= 5) return "Solid volume";
  return "High volume";
}

function stimulusConclusion(item) {
  if (!item.sets) return "No useful stimulus recorded";
  if (item.sets <= 2 && item.avgRpe !== null && item.avgRpe >= 9) return "Low volume, very high intensity — still a hard stimulus.";
  if (item.sets <= 2) return "Low volume — check whether this was enough stimulus.";
  if (item.sets >= 3 && item.avgRpe !== null && item.avgRpe >= 8.5) return "Strong stimulus — volume and intensity both count.";
  if (item.avgRpe !== null && item.avgRpe < 7) return "Volume logged, but intensity was light.";
  return "Useful stimulus recorded.";
}

function stimulusSegmentTone(avgRpe, range) {
  const tone = intensityTone(avgRpe);
  return `stimulus-${tone}`;
}

function sessionMuscleStimulusSummary(session) {
  const map = new Map();
  (session.logs || []).forEach((log) => {
    const muscle = log.muscle || "Other";
    const item = map.get(muscle) || { muscle, sets: 0, volume: 0, reps: [], rpes: [], ranges: new Map() };
    hardSetsForLog(log).forEach((set) => {
      item.sets += 1;
      item.volume += calcSetVolume(set, log);
      const reps = Number(set.reps || 0);
      if (reps) item.reps.push(reps);
      const rpe = setRpeValue(set);
      if (Number.isFinite(rpe)) item.rpes.push(rpe);
      const bucket = repRangeBucket(reps);
      item.ranges.set(bucket, (item.ranges.get(bucket) || 0) + 1);
    });
    map.set(muscle, item);
  });
  return [...map.values()]
    .filter((item) => item.sets > 0)
    .map((item) => {
      const avgRpe = item.rpes.length ? item.rpes.reduce((sum, value) => sum + value, 0) / item.rpes.length : null;
      const avgReps = item.reps.length ? item.reps.reduce((sum, value) => sum + value, 0) / item.reps.length : null;
      const ranges = [...item.ranges.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
      const primaryRange = ranges[0]?.[0] || "—";
      return {
        ...item,
        avgRpe,
        avgReps,
        ranges,
        primaryRange,
        intensity: intensityLabel(avgRpe),
        intensityTone: intensityTone(avgRpe),
        volumeLabel: volumeLabel(item.sets)
      };
    })
    .sort((a, b) => b.sets - a.sets || b.volume - a.volume || a.muscle.localeCompare(b.muscle));
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
  if (route === "account") renderAccount();
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

    ${!state.activeSession ? `
      <section class="card quick-workout-card">
        <p class="label">Workout on the fly</p>
        <h2>Need a second session or unscheduled workout?</h2>
        <p class="muted">Start blank, add exercises as you train, and save it as its own workout for today.</p>
        <button class="secondary full" data-action="start-workout" data-workout="adhoc" type="button">Start on-the-fly workout</button>
      </section>
    ` : ""}

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
      <button class="program-card on-the-fly-workout-card" data-action="start-workout" data-workout="adhoc" type="button">
        <strong>Workout on the fly</strong>
        <span class="muted">Any time · blank session · add exercises as you train</span>
        <span class="pill-row" style="margin-top:10px"><span class="pill">Supports second daily workouts</span></span>
      </button>
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

    <section class="workout-focus-bar" aria-label="Current workout focus">
      <div>
        <span>FOCUS MODE</span>
        <strong>${activeIndex + 1}/${session.logs.length} · ${session.logs[activeIndex]?.name || "Exercise"}</strong>
      </div>
      <div class="focus-bar-actions">
        <button data-action="jump-exercise" data-dir="-1" type="button" ${activeIndex === 0 ? "disabled" : ""}>Prev</button>
        <button data-action="jump-exercise" data-dir="1" type="button" ${activeIndex === session.logs.length - 1 ? "disabled" : ""}>Next</button>
      </div>
    </section>

    <section id="active-log" class="active-workout-log focus-only">
      ${exerciseLogCard(session.logs[activeIndex], activeIndex, session.workoutId)}
    </section>

    <details class="exercise-queue-panel">
      <summary><span>Workout queue</span><strong>${completed}/${planned} sets logged</strong></summary>
      <div class="exercise-queue-list">
        ${session.logs.map((log, index) => `<button class="queue-item ${index === activeIndex ? "active" : ""}" data-action="open-exercise" data-ex="${index}" type="button"><span>${String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(log.name)}</strong><small>${countCompletedSets({ logs: [log] })}/${countPlannedSets({ logs: [log] })} sets</small></button>`).join("")}
      </div>
    </details>

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
            <p>${log.muscle} · ${(log.sets || []).filter((set) => set.setType === "warmup").length} warm-up · ${(log.sets || []).filter((set) => set.setType !== "warmup").length} work · ${dropSetsForLog(log).length} optional drop · ${log.targetReps} · ${restSecondsForExercise(workoutId, index)}s rest</p>
            <small class="previous-workline">Last work: ${escapeHtml(previousWorkSetText(log))}</small>
          </div>
        </div>
        <div class="exercise-head-actions">
          <button class="exercise-mini-action" data-action="exercise-history" data-ex="${index}" type="button">Past</button>
          <button class="exercise-mini-action" data-action="move-exercise" data-dir="-1" data-ex="${index}" type="button" ${index === 0 ? "disabled" : ""} aria-label="Move exercise up">↑</button>
          <button class="exercise-mini-action" data-action="move-exercise" data-dir="1" data-ex="${index}" type="button" ${index === state.activeSession.logs.length - 1 ? "disabled" : ""} aria-label="Move exercise down">↓</button>
          <span class="exercise-volume" data-exercise-volume="${index}">${kg(current)} kg</span>
        </div>
      </header>
      <div class="exercise-intelligence ${progression.tone}" data-exercise-intelligence="${index}">
        <strong>${progression.label}</strong><span>${progression.detail}</span>
      </div>
      ${(() => { const signal = doubleProgressionSignal(log); return `<div class="double-progression ${signal.ready ? "ready" : "hold"}"><strong>${escapeHtml(signal.label)}</strong><span>${escapeHtml(signal.detail)}</span></div>`; })()}
      ${currentSetCueMarkup(log)}
      ${(() => { const alternatives = alternativeOptionsForLog(log); return alternatives.length ? `<div class="alternative-strip"><span>Swap:</span>${alternatives.map((item) => `<button data-action="quick-swap-exercise" data-ex="${index}" data-alt="${escapeHtml(exerciseIdentity(item))}" type="button">${escapeHtml(item.name)}</button>`).join("")}</div>` : ""; })()}
      <details class="exercise-setup" ${log.setupNote ? "" : ""}>
        <summary><span>SETUP / CUE</span><strong>${escapeHtml(log.setupNote || "Add machine, seat, grip or execution cue")}</strong></summary>
        <textarea data-setup-note data-ex="${index}" placeholder="Example: Seat 3 · neutral grip · scapula fixed · drive elbows inward">${escapeHtml(log.setupNote || "")}</textarea>
      </details>
      <div class="set-table">
        <div class="set-table-head"><span>TYPE</span><span>PREVIOUS</span><span>KG</span><span>REPS</span><span>LOG</span></div>
        ${log.sets.map((set, setIndex) => setEntryMarkup(set, index, setIndex, log)).join("")}
        ${log.drop ? legacyDropSetMarkup(log.drop, index, log) : ""}
      </div>
      <footer class="exercise-footer">
        <div><span>Previous total</span><strong>${previous ? `${kg(previous)} kg` : "Baseline"}</strong></div>
        <div><span>Current change</span><strong data-exercise-delta="${index}" class="${delta >= 0 ? "positive" : "negative"}">${delta >= 0 ? "+" : ""}${kg(delta)} kg</strong></div>
        <div class="exercise-set-controls">
          <button class="exercise-add-set" data-action="remove-set" data-ex="${index}" type="button">− last</button>
          <button class="exercise-add-set warmup-control" data-action="add-warmup-set" data-ex="${index}" type="button">+ warm-up</button>
          <button class="exercise-add-set" data-action="add-set" data-ex="${index}" type="button">+ work</button>
          <button class="exercise-add-set substitute-control" data-action="replace-exercise" data-ex="${index}" type="button">↔ more swaps</button>
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

function currentLogTarget(log) {
  const sets = log?.sets || [];
  for (let setIndex = 0; setIndex < sets.length; setIndex += 1) {
    const set = sets[setIndex];
    if (!set.completed) return { kind: "set", setIndex };
    const dropIndex = (set.drops || []).findIndex((drop) => !drop.completed);
    if (dropIndex >= 0) return { kind: "drop", setIndex, dropIndex };
  }
  if (log?.drop && !log.drop.completed) return { kind: "legacyDrop", setIndex: null, dropIndex: null };
  return null;
}

function currentSetCueMarkup(log) {
  const target = currentLogTarget(log);
  if (!target) {
    return `<section class="current-set-panel complete"><span>CURRENT FOCUS</span><strong>Exercise complete</strong><p>Review execution, add an optional drop if needed, or move to the next exercise.</p></section>`;
  }
  const set = target.kind === "set" ? log.sets[target.setIndex] : getDropTarget(log, target.setIndex, target.dropIndex);
  const type = setTypeInfo(set?.setType || "work");
  const previous = set?.previousWeight !== "" || set?.previousReps !== "" ? `${set.previousWeight || "—"} × ${set.previousReps || "—"}` : "No previous data";
  const label = target.kind === "drop" ? `Optional drop after set ${target.setIndex + 1}` : `${type.label} ${target.setIndex + 1}`;
  return `<section class="current-set-panel"><span>CURRENT SET</span><strong>${escapeHtml(label)}</strong><p>Previous: ${escapeHtml(previous)} · Target: ${escapeHtml(log.targetReps || "work range")}</p></section>`;
}

function setEntryMarkup(set, exerciseIndex, setIndex, log) {
  const completed = Boolean(set.completed);
  const type = setTypeInfo(set.setType);
  const previousText = set.previousWeight !== "" || set.previousReps !== ""
    ? `${set.previousWeight === "" ? "—" : set.previousWeight} × ${set.previousReps || "—"}`
    : "—";
  const drops = Array.isArray(set.drops) ? set.drops : [];
  const current = currentLogTarget(log);
  const isCurrent = current?.kind === "set" && current.setIndex === setIndex;
  return `
    <div class="set-row ${completed ? "is-complete" : ""} ${isCurrent ? "current-set" : ""}" data-set-entry data-ex="${exerciseIndex}" data-set="${setIndex}">
      <button class="set-type type-${type.id}" data-action="cycle-set-type" data-ex="${exerciseIndex}" data-set="${setIndex}" title="${type.label}" type="button">${type.short}</button>
      <span class="set-last">${previousText}</span>
      <input aria-label="${log.loadLabel}" data-log="weight" data-ex="${exerciseIndex}" data-set="${setIndex}" type="number" inputmode="decimal" step="0.5" value="${set.weight ?? ""}">
      <input aria-label="Reps" data-log="reps" data-ex="${exerciseIndex}" data-set="${setIndex}" type="number" inputmode="numeric" step="1" value="${set.reps ?? ""}">
      <button class="set-check ${completed ? "complete" : ""}" data-action="${completed ? "edit-set" : "log-set"}" data-ex="${exerciseIndex}" data-set="${setIndex}" type="button" aria-label="${completed ? "Edit completed set" : "Log set"}">${completed ? "✓" : "○"}</button>
      ${effortChipsMarkup(set, exerciseIndex, setIndex, completed, false)}
    </div>
    ${completed && set.setType !== "warmup" ? `<div class="drop-invite"><button data-action="add-drop-to-set" data-ex="${exerciseIndex}" data-set="${setIndex}" type="button">+ optional drop from set ${setIndex + 1}</button><span>extra work; does not replace the set</span></div>` : ""}
    ${drops.map((drop, dropIndex) => dropSetMarkup(drop, exerciseIndex, setIndex, dropIndex, log)).join("")}
  `;
}

function dropSetMarkup(drop, exerciseIndex, setIndex, dropIndex, log) {
  const completed = Boolean(drop.completed);
  const previousText = drop.previousWeight !== "" || drop.previousReps !== ""
    ? `${drop.previousWeight === "" ? "—" : drop.previousWeight} × ${drop.previousReps || "—"}`
    : "—";
  const current = currentLogTarget(log);
  const isCurrent = current?.kind === "drop" && current.setIndex === setIndex && current.dropIndex === dropIndex;
  return `
    <div class="set-row drop-row ${completed ? "is-complete" : ""} ${isCurrent ? "current-set" : ""}" data-drop-entry data-ex="${exerciseIndex}" data-set="${setIndex}" data-drop-index="${dropIndex}">
      <span class="set-type type-drop">D</span>
      <span class="set-last">${previousText}</span>
      <input aria-label="Drop ${log.loadLabel}" data-log="dropWeight" data-ex="${exerciseIndex}" data-set="${setIndex}" data-drop-index="${dropIndex}" type="number" inputmode="decimal" step="0.5" value="${drop.weight ?? ""}">
      <input aria-label="Drop reps" data-log="dropReps" data-ex="${exerciseIndex}" data-set="${setIndex}" data-drop-index="${dropIndex}" type="number" inputmode="numeric" step="1" value="${drop.reps ?? ""}">
      <button class="set-check ${completed ? "complete" : ""}" data-action="${completed ? "edit-drop" : "log-drop"}" data-ex="${exerciseIndex}" data-set="${setIndex}" data-drop-index="${dropIndex}" type="button" aria-label="${completed ? "Edit completed drop set" : "Log drop set"}">${completed ? "✓" : "○"}</button>
      ${effortChipsMarkup(drop, exerciseIndex, setIndex, completed, true, dropIndex)}
      <button class="drop-remove" data-action="remove-drop-from-set" data-ex="${exerciseIndex}" data-set="${setIndex}" data-drop-index="${dropIndex}" type="button" aria-label="Remove drop set">×</button>
    </div>
  `;
}

function legacyDropSetMarkup(drop, exerciseIndex, log) {
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

function effortChipsMarkup(set, exerciseIndex, setIndex, visible, isDrop, dropIndex = null) {
  if (set?.setType === "warmup") {
    return `<div class="warmup-logged ${visible ? "" : "hidden"}">Warm-up logged · excluded from work volume</div>`;
  }
  const scale = state.settings.effortScale === "rir" ? "rir" : "rpe";
  const values = scale === "rpe" ? ["6", "7", "8", "9", "10"] : ["0", "1", "2", "3", "4+"];
  const selected = scale === "rpe" ? String(set?.rpe ?? "") : (String(set?.rir) === "4" ? "4+" : String(set?.rir ?? ""));
  return `
    <div class="rir-strip ${visible ? "" : "hidden"}" data-rir-panel>
      <span>${scale.toUpperCase()}</span>
      ${values.map((value) => `<button class="rir-chip ${selected === value ? "selected" : ""}" data-action="set-effort" data-ex="${exerciseIndex}" ${isDrop ? `data-drop="true" ${setIndex !== null ? `data-set="${setIndex}"` : ""} ${dropIndex !== null ? `data-drop-index="${dropIndex}"` : ""}` : `data-set="${setIndex}"`} data-scale="${scale}" data-value="${value}" type="button" aria-pressed="${selected === value}">${value}</button>`).join("")}
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

function openExercise(index) {
  if (!state.activeSession) return;
  setActiveExercise(index);
  renderActiveSession();
  requestAnimationFrame(() => document.querySelector(`#exercise-${state.activeSession.activeExerciseIndex}`)?.scrollIntoView({ block: "start" }));
}

function jumpExercise(direction) {
  if (!state.activeSession) return;
  const current = Number(state.activeSession.activeExerciseIndex || 0);
  const next = Math.max(0, Math.min(state.activeSession.logs.length - 1, current + direction));
  openExercise(next);
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

function suggestedDropWeightFromSet(set) {
  if (!set || !Number(set.weight || 0)) return "";
  const raw = Number(set.weight) * 0.75;
  return String(Math.round(raw * 2) / 2);
}

function addDropToSet(exerciseIndex, setIndex) {
  const log = state.activeSession?.logs?.[exerciseIndex];
  const set = log?.sets?.[setIndex];
  if (!log || !set) return;
  if (!set.completed || set.setType === "warmup") {
    showNotice("Complete the work set first, then add the optional drop.", "warn");
    return;
  }
  set.drops = Array.isArray(set.drops) ? set.drops : [];
  const previous = previousSession(state.activeSession.workoutId, state.activeSession.id);
  const previousLog = findPreviousLog(previous, log.exerciseId, log.variantId, log.name);
  const previousDrop = previousLog?.sets?.[setIndex]?.drops?.[set.drops.length] || previousLog?.drop || {};
  set.drops.push({
    weight: previousDrop.weight ?? suggestedDropWeightFromSet(set) ?? suggestedDropWeight(log),
    reps: "",
    rir: "",
    rpe: "",
    setType: "drop",
    completed: false,
    previousWeight: previousDrop.weight ?? "",
    previousReps: previousDrop.reps ?? ""
  });
  saveState();
  renderActiveSession();
  setActiveExercise(exerciseIndex);
  requestAnimationFrame(() => {
    const row = document.querySelector(`#exercise-${exerciseIndex} [data-drop-entry][data-set="${setIndex}"][data-drop-index="${set.drops.length - 1}"]`);
    row?.scrollIntoView({ behavior: "smooth", block: "center" });
    row?.querySelector('input[data-log="dropWeight"]')?.focus();
  });
  showNotice("Optional drop set added. It is extra work and does not replace the completed set.", "good");
}

function removeDropFromSet(exerciseIndex, setIndex, dropIndex) {
  const log = state.activeSession?.logs?.[exerciseIndex];
  const drops = log?.sets?.[setIndex]?.drops;
  if (!Array.isArray(drops) || !drops[dropIndex]) return;
  if (drops[dropIndex].completed && !confirm("Remove this completed optional drop set?")) return;
  drops.splice(dropIndex, 1);
  saveState();
  renderActiveSession();
  setActiveExercise(exerciseIndex);
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

function getDropTarget(log, setIndex, dropIndex) {
  if (setIndex !== null && Number.isFinite(Number(setIndex))) {
    return log?.sets?.[Number(setIndex)]?.drops?.[Number(dropIndex || 0)] || null;
  }
  return log?.drop || null;
}

function writeLogInputToState(input) {
  const exIndex = Number(input.dataset.ex);
  const setIndex = input.dataset.set !== undefined ? Number(input.dataset.set) : null;
  const dropIndex = input.dataset.dropIndex !== undefined ? Number(input.dataset.dropIndex) : null;
  const field = input.dataset.log;
  const log = state.activeSession?.logs?.[exIndex];
  if (!log) return;
  if (["weight", "reps"].includes(field) && log.sets[setIndex]) log.sets[setIndex][field] = input.value;
  const drop = getDropTarget(log, setIndex, dropIndex);
  if (field === "dropWeight" && drop) drop.weight = input.value;
  if (field === "dropReps" && drop) drop.reps = input.value;
}

function commitSetInputs(exerciseIndex, setIndex, isDrop = false, dropIndex = null) {
  const selector = isDrop
    ? (setIndex !== null ? `[data-drop-entry][data-ex="${exerciseIndex}"][data-set="${setIndex}"][data-drop-index="${dropIndex || 0}"] input[data-log]` : `[data-drop-entry][data-ex="${exerciseIndex}"] input[data-log]`)
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

function completeSet(exerciseIndex, setIndex, isDrop, button, dropIndex = null) {
  const log = state.activeSession?.logs?.[exerciseIndex];
  if (!log) return;
  commitSetInputs(exerciseIndex, setIndex, isDrop, dropIndex);
  const target = isDrop ? getDropTarget(log, setIndex, dropIndex) : log.sets?.[setIndex];
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
  editButton.addEventListener("click", () => editSet(exerciseIndex, setIndex, isDrop, editButton, dropIndex));
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

function editSet(exerciseIndex, setIndex, isDrop, button, dropIndex = null) {
  const log = state.activeSession?.logs?.[exerciseIndex];
  const target = isDrop ? getDropTarget(log, setIndex, dropIndex) : log?.sets?.[setIndex];
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
  logButton.addEventListener("click", () => completeSet(exerciseIndex, setIndex, isDrop, logButton, dropIndex));
  button.replaceWith(logButton);
  updateActiveSessionSummary(exerciseIndex);
  if (!completedExercise(log)) {
    const panel = view.querySelector(`[data-feedback-panel="${exerciseIndex}"]`);
    if (panel) panel.outerHTML = exerciseFeedbackMarkup(log, exerciseIndex, false);
  }
}

function setEffort(exerciseIndex, setIndex, scale, value, isDrop, button, dropIndex = null) {
  const log = state.activeSession?.logs?.[exerciseIndex];
  const target = isDrop ? getDropTarget(log, setIndex, dropIndex) : log?.sets?.[setIndex];
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

function quickSwapExercise(index, identity) {
  if (!state.activeSession) return;
  const current = state.activeSession.logs[index];
  if (!current) return;
  const completed = (current.sets || []).some((set) => set.completed) || dropSetsForLog(current).some((drop) => drop.completed);
  const blueprint = findLibraryExercise(identity);
  if (!blueprint) return;
  if (completed && !confirm(`Swap ${current.name}? Completed sets for this exercise in the active workout will be removed.`)) return;
  const log = buildSessionLog(blueprint, state.activeSession.bodyweight);
  state.activeSession.logs.splice(index, 1, log);
  state.activeSession.activeExerciseIndex = index;
  saveActiveWorkoutLayout();
  saveState();
  renderActiveSession();
  setActiveExercise(index);
  requestAnimationFrame(() => document.querySelector(`#exercise-${index}`)?.scrollIntoView({ behavior: "smooth", block: "start" }));
  showNotice(`${blueprint.name} swapped in. Its history is kept separate.`, "good");
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
  if (state.activeSession && route === "training") renderActiveSession();
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
  const muscleStimulus = sessionMuscleStimulusSummary(session);
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
    <section class="completion-stimulus">
      <header><span>MUSCLE STIMULUS MAP</span><strong>Rep range × intensity</strong></header>
      <div class="stimulus-list stimulus-map-list">
        ${muscleStimulus.map((item) => {
          const totalRangeSets = item.ranges.reduce((sum, [, count]) => sum + count, 0) || item.sets || 1;
          return `<article class="stimulus-card stimulus-card-${escapeHtml(item.intensityTone)}">
            <div class="stimulus-card-head">
              <div>
                <h3>${escapeHtml(item.muscle)}</h3>
                <p>${item.sets} hard set${item.sets === 1 ? "" : "s"} · ${kg(item.volume)} kg · ${escapeHtml(item.volumeLabel)}</p>
              </div>
              <strong>${item.avgRpe !== null ? `RPE ${item.avgRpe.toFixed(1)}` : "—"}</strong>
            </div>
            <div class="stimulus-matrix" aria-label="Rep range and intensity map for ${escapeHtml(item.muscle)}">
              <div class="stimulus-axis"><span>Lower reps</span><span>Higher reps</span></div>
              <div class="stimulus-track">
                ${item.ranges.map(([range, count]) => `<span class="stimulus-segment stimulus-${escapeHtml(item.intensityTone)}" style="--w:${Math.max(10, Math.round((count / totalRangeSets) * 100))}%"><b>${count}</b><em>${escapeHtml(range)}</em></span>`).join("")}
              </div>
              <div class="stimulus-legend"><span>${escapeHtml(item.intensity)} intensity</span><span>${escapeHtml(item.primaryRange)} focus${item.avgReps !== null ? ` · ${item.avgReps.toFixed(1)} avg reps` : ""}</span></div>
            </div>
            <p class="stimulus-conclusion">${escapeHtml(stimulusConclusion(item))}</p>
          </article>`;
        }).join("") || `<p class="muted">No hard-set muscle stimulus recorded.</p>`}
      </div>
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
        const volumeDelta = exerciseVolumeDeltaText(log, previousLog);
        const dp = doubleProgressionSignal(log);
        return `<article class="completion-exercise ${result.tone} ${dp.ready ? "ready-progress" : ""}">
          <div><h3>${escapeHtml(log.name)}</h3><p>${escapeHtml(result.label)}</p></div>
          <span>${escapeHtml(result.detail)}</span>
          <div class="completion-exercise-metrics">
            <small>Volume: ${escapeHtml(volumeDelta.text)}</small>
            <small>Best: ${escapeHtml(formatSetResult(bestSet, log))}</small>
            <small>${hardSetsForLog(log).length} hard sets${avg !== null ? ` · RPE ${avg.toFixed(1)}` : ""}${exerciseDropoff !== null ? ` · ${exerciseDropoff.toFixed(0)}% drop-off` : ""}</small>
          </div>
          <div class="progression-callout ${dp.ready ? "ready" : "hold"}"><strong>${escapeHtml(dp.label)}</strong><span>${escapeHtml(dp.detail)}</span></div>
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
  queueCloudBackup();
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

function renderCloudMiniStatus() {
  const cloud = getSupabaseSettings();
  const signedIn = Boolean(supabaseUser);
  const last = cloud.lastSyncAt ? `Last sync: ${niceDateTime(cloud.lastSyncAt)}` : "Not synced yet";
  return `<section class="card cloud-mini-card ${signedIn ? "is-signed-in" : "is-signed-out"}">
    <p class="label">Cloud backup</p>
    <h3>${signedIn ? "Signed in" : "Sign in once on this device"}</h3>
    <p class="muted">${signedIn ? `Backing up as ${escapeHtml(supabaseUser.email || cloud.userEmail || "your account")}. ${last}` : "Your Supabase project is already built into this app. Sign in on this device to enable automatic backup."}</p>
    <button class="${signedIn ? "secondary" : "primary"}" data-route-jump="account" type="button">${signedIn ? "Backup settings" : "Sign in / restore"}</button>
  </section>`;
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
    ${renderCloudBackupCard()}
    <section class="card">
      <p class="label">Local backup</p>
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
  view.querySelectorAll("[data-action='open-exercise']").forEach((button) => button.addEventListener("click", () => openExercise(Number(button.dataset.ex))));
  view.querySelectorAll("[data-action='add-set']").forEach((button) => button.addEventListener("click", () => addSet(Number(button.dataset.ex))));
  view.querySelectorAll("[data-action='add-drop-set']").forEach((button) => button.addEventListener("click", () => addDropSet(Number(button.dataset.ex))));
  view.querySelectorAll("[data-action='remove-drop-set']").forEach((button) => button.addEventListener("click", () => removeDropSet(Number(button.dataset.ex))));
  view.querySelectorAll("[data-action='add-drop-to-set']").forEach((button) => button.addEventListener("click", () => addDropToSet(Number(button.dataset.ex), Number(button.dataset.set))));
  view.querySelectorAll("[data-action='remove-drop-from-set']").forEach((button) => button.addEventListener("click", () => removeDropFromSet(Number(button.dataset.ex), Number(button.dataset.set), Number(button.dataset.dropIndex))));
  view.querySelectorAll("[data-action='quick-swap-exercise']").forEach((button) => button.addEventListener("click", () => quickSwapExercise(Number(button.dataset.ex), button.dataset.alt)));
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
  view.querySelectorAll("[data-action='log-drop']").forEach((button) => button.addEventListener("click", () => completeSet(Number(button.dataset.ex), button.dataset.set !== undefined ? Number(button.dataset.set) : null, true, button, button.dataset.dropIndex !== undefined ? Number(button.dataset.dropIndex) : null)));
  view.querySelectorAll("[data-action='edit-set']").forEach((button) => button.addEventListener("click", () => editSet(Number(button.dataset.ex), Number(button.dataset.set), false, button)));
  view.querySelectorAll("[data-action='edit-drop']").forEach((button) => button.addEventListener("click", () => editSet(Number(button.dataset.ex), button.dataset.set !== undefined ? Number(button.dataset.set) : null, true, button, button.dataset.dropIndex !== undefined ? Number(button.dataset.dropIndex) : null)));
  view.querySelectorAll("[data-action='set-effort']").forEach((button) => button.addEventListener("click", () => {
    setEffort(Number(button.dataset.ex), button.dataset.set !== undefined ? Number(button.dataset.set) : null, button.dataset.scale, button.dataset.value, button.dataset.drop === "true", button, button.dataset.dropIndex !== undefined ? Number(button.dataset.dropIndex) : null);
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
    queueCloudBackup();
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
  view.querySelector("form[data-form='cloud-config']")?.addEventListener("submit", saveCloudConfig);
  view.querySelector("form[data-form='cloud-auth']")?.addEventListener("submit", handleCloudSignIn);
  view.querySelector("[data-action='cloud-signup']")?.addEventListener("click", handleCloudSignUp);
  view.querySelector("[data-action='cloud-logout']")?.addEventListener("click", handleCloudLogout);
  view.querySelector("[data-action='cloud-sync']")?.addEventListener("click", () => syncCloudBackup({ manual: true }));
  view.querySelector("[data-action='cloud-restore']")?.addEventListener("click", restoreFromCloud);
}



function renderAccount() {
  const signedIn = Boolean(supabaseUser);
  view.innerHTML = `
    <section class="card account-hero">
      <p class="label">Account & backup</p>
      <h2>${signedIn ? "Cloud backup is active" : "Sign in for cloud backup"}</h2>
      <p class="muted">STRATA stays focused on training. Sign-in, sync and local backup live here quietly in the background.</p>
    </section>
    ${renderCloudBackupCard()}
    <section class="card">
      <p class="label">Local backup</p>
      <div class="button-row">
        <button class="secondary" data-action="export-data" type="button">Export full backup</button>
        <button class="ghost" data-action="import-data" type="button">Import</button>
      </div>
      <input id="import-file" class="hidden" type="file" accept="application/json" />
      <p class="muted backup-status">Last backup: <strong>${niceDateTime(state.settings.lastBackupAt)}</strong></p>
      <p class="muted">Use this before changing phones, clearing browser data or installing a major update.</p>
    </section>
  `;
  attachCommonHandlers();
}

function renderCloudBackupCard() {
  const cloud = { ...defaultState().settings.cloud, ...(state.settings.cloud || {}) };
  const configured = Boolean(getSupabaseSettings().url && getSupabaseSettings().anonKey);
  const signedIn = Boolean(supabaseUser);
  const sessionText = signedIn ? (supabaseUser.email || cloud.userEmail || "Signed in") : "Not signed in on this device";
  const unsynced = countUnsyncedSessions();
  return `
    <section class="card cloud-backup-card">
      <p class="label">Backup & sync</p>
      <h3>${signedIn ? "Automatic cloud backup is on" : "Sign in to STRATA"}</h3>
      <p class="muted">Your Supabase project is built into this app now. Sign in once per device; STRATA will then restore your cloud backup, save locally in the gym, and auto-sync completed workouts and bodyweight changes.</p>
      <div class="cloud-status-grid">
        <div><span>Status</span><strong>${escapeHtml(sessionText)}</strong></div>
        <div><span>Unsynced workouts</span><strong>${unsynced}</strong></div>
        <div><span>Last sync</span><strong>${niceDateTime(cloud.lastSyncAt)}</strong></div>
        <div><span>Last restore</span><strong>${niceDateTime(cloud.lastRestoreAt)}</strong></div>
      </div>
      ${signedIn ? `
        <div class="cloud-account-card">
          <p class="muted">Signed in as <strong>${escapeHtml(sessionText)}</strong>. Auto-sync is ${cloud.autoSync === false ? "off" : "on"}.</p>
          <div class="button-row">
            <button class="primary" data-action="cloud-sync" type="button">Sync now</button>
            <button class="secondary" data-action="cloud-restore" type="button">Restore / merge cloud</button>
            <button class="ghost" data-action="cloud-logout" type="button">Sign out</button>
          </div>
        </div>
      ` : `
        <form data-form="cloud-auth" class="cloud-auth-form">
          <label class="field"><span>Email</span><input name="email" type="email" autocomplete="email" value="${escapeHtml(cloud.userEmail)}" required /></label>
          <label class="field"><span>Password</span><input name="password" type="password" autocomplete="current-password" required /></label>
          <div class="button-row">
            <button class="primary" type="submit" ${configured ? "" : "disabled"}>Sign in</button>
            <button class="secondary" data-action="cloud-signup" type="button" ${configured ? "" : "disabled"}>Create account</button>
          </div>
        </form>
      `}
      <details class="cloud-advanced">
        <summary>Advanced Supabase settings</summary>
        <form data-form="cloud-config" class="cloud-config-form">
          <label class="field"><span>Supabase project URL</span><input name="url" type="url" autocomplete="off" value="${escapeHtml(cloud.url || DEFAULT_SUPABASE_URL)}" /></label>
          <label class="field"><span>Supabase publishable key</span><input name="anonKey" type="password" autocomplete="off" value="${escapeHtml(cloud.anonKey || DEFAULT_SUPABASE_KEY)}" /></label>
          <button class="secondary" type="submit">Save advanced settings</button>
        </form>
      </details>
      <p class="muted">Cloud backup currently includes workouts, weights, routines and settings. Progress-photo files stay local for now.</p>
    </section>`;
}

function getSupabaseSettings() {
  state.settings.cloud = { ...defaultState().settings.cloud, ...(state.settings.cloud || {}) };
  if (!state.settings.cloud.url) state.settings.cloud.url = DEFAULT_SUPABASE_URL;
  if (!state.settings.cloud.anonKey) state.settings.cloud.anonKey = DEFAULT_SUPABASE_KEY;
  if (state.settings.cloud.autoSync === undefined) state.settings.cloud.autoSync = true;
  return state.settings.cloud;
}

function normalizeSupabaseUrl(url) {
  return String(url || "").trim().replace(/\/+$/, "");
}

function getSupabaseClient() {
  const cloud = getSupabaseSettings();
  if (!cloud.url || !cloud.anonKey) throw new Error("Supabase is not configured");
  if (!window.supabase?.createClient) throw new Error("Supabase client library is not loaded yet");
  const url = normalizeSupabaseUrl(cloud.url);
  if (!supabaseClient || supabaseClient.__strataUrl !== url || supabaseClient.__strataKey !== cloud.anonKey) {
    supabaseClient = window.supabase.createClient(url, cloud.anonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    });
    supabaseClient.__strataUrl = url;
    supabaseClient.__strataKey = cloud.anonKey;
  }
  return supabaseClient;
}

async function refreshSupabaseUser() {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client.auth.getUser();
    if (error) throw error;
    supabaseUser = data?.user || null;
    if (supabaseUser?.email) {
      state.settings.cloud.userEmail = supabaseUser.email;
      saveState();
    }
    return supabaseUser;
  } catch (error) {
    supabaseUser = null;
    return null;
  }
}

function saveCloudConfig(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const url = normalizeSupabaseUrl(form.elements.url.value);
  const anonKey = String(form.elements.anonKey.value || "").trim();
  state.settings.cloud = { ...getSupabaseSettings(), url, anonKey };
  supabaseClient = null;
  saveState();
  showNotice("Supabase settings saved.", "good");
  renderAccount();
  refreshSupabaseUser().then(() => { if (route === "account") renderAccount(); });
}

async function handleCloudSignIn(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const email = String(form.elements.email.value || "").trim();
  const password = String(form.elements.password.value || "");
  if (!email || !password) return showNotice("Enter your email and password first.", "warn");
  state.settings.cloud.userEmail = email;
  saveState();
  await runCloudTask("Signing in…", async () => {
    const client = getSupabaseClient();
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error) throw error;
    supabaseUser = data?.user || null;
    showNotice("Signed in. Restoring and syncing your backup…", "good");
  });
  await bootstrapCloudSync({ reason: "signin" });
  if (route === "account") renderAccount();
}

async function handleCloudSignUp() {
  const form = view.querySelector("form[data-form='cloud-auth']");
  const email = String(form?.elements.email.value || "").trim();
  const password = String(form?.elements.password.value || "");
  if (!email || !password) return showNotice("Enter an email and password to create the account.", "warn");
  state.settings.cloud.userEmail = email;
  saveState();
  await runCloudTask("Creating account…", async () => {
    const client = getSupabaseClient();
    const { data, error } = await client.auth.signUp({ email, password });
    if (error) throw error;
    supabaseUser = data?.user || null;
    showNotice(data?.user ? "Account created. Setting up cloud backup…" : "Account created. Check your email if confirmation is required.", "good", 6500);
  });
  if (supabaseUser) await bootstrapCloudSync({ reason: "signup" });
  if (route === "account") renderAccount();
}

async function handleCloudLogout() {
  await runCloudTask("Signing out…", async () => {
    const client = getSupabaseClient();
    await client.auth.signOut();
    supabaseUser = null;
    showNotice("Signed out of Supabase.", "good");
  });
  if (route === "account") renderAccount();
}

async function runCloudTask(message, task) {
  if (cloudBusy) return showNotice("Cloud task already running.", "warn");
  cloudBusy = true;
  showNotice(message, "info", 0);
  try {
    await task();
  } catch (error) {
    console.error(error);
    showNotice(error.message || "Cloud task failed.", "danger", 0);
  } finally {
    cloudBusy = false;
  }
}

function countUnsyncedSessions() {
  const lastSync = state.settings.cloud?.lastSyncAt || null;
  return (state.sessions || []).filter((session) => !session.cloudSyncedAt || (lastSync && String(session.completedAt || "") > lastSync)).length;
}

function cloudSafeState() {
  const safe = JSON.parse(JSON.stringify(state));
  safe.activeSession = null;
  safe.settings = { ...safe.settings, cloud: { ...defaultState().settings.cloud, userEmail: safe.settings?.cloud?.userEmail || "" } };
  safe.photoSets = (safe.photoSets || []).map((set) => ({ ...set, photoKeys: set.photoKeys || {} }));
  return safe;
}

function cloudBackupSummary(safeState) {
  return {
    appVersion: APP_VERSION,
    workoutCount: safeState.sessions?.length || 0,
    weightCount: safeState.weights?.length || 0,
    photoSetCount: safeState.photoSets?.length || 0,
    lastWorkoutAt: [...(safeState.sessions || [])].sort((a, b) => String(b.completedAt || "").localeCompare(String(a.completedAt || "")))[0]?.completedAt || null,
    backedUpAt: new Date().toISOString()
  };
}

function localHasMeaningfulData() {
  return Boolean((state.sessions || []).length || (state.weights || []).length || Object.keys(state.settings?.workoutLayouts || {}).length || (state.settings?.customExercises || []).length);
}

async function fetchCloudBackup(client, user) {
  const { data, error } = await client
    .from(CLOUD_TABLE)
    .select("backup_data, updated_at")
    .eq("user_id", user.id)
    .maybeSingle();
  if (error) throw error;
  return data || null;
}

async function bootstrapCloudSync({ reason = "auto" } = {}) {
  const cloud = getSupabaseSettings();
  if (!cloud.url || !cloud.anonKey || cloudBootstrapped) return false;
  const user = supabaseUser || await refreshSupabaseUser();
  if (!user) return false;
  cloudBootstrapped = true;
  await runCloudTask(reason === "auto" ? "Checking cloud backup…" : "Preparing cloud backup…", async () => {
    const client = getSupabaseClient();
    const remote = await fetchCloudBackup(client, user);
    if (remote?.backup_data?.sessions) {
      mergeCloudState(remote.backup_data);
      state.settings.cloud.lastRestoreAt = new Date().toISOString();
      state.settings.cloud.lastSyncAt = remote.updated_at || state.settings.cloud.lastSyncAt;
      state.settings.cloud.userEmail = user.email || state.settings.cloud.userEmail;
      saveState();
    }
  });
  await syncCloudBackup({ manual: false, quiet: true });
  if (route === "account") renderAccount();
  return true;
}

async function syncCloudBackup({ manual = false, quiet = false } = {}) {
  const cloud = getSupabaseSettings();
  if (!cloud.url || !cloud.anonKey) {
    if (manual) showNotice("Cloud backup is not configured.", "warn");
    return false;
  }
  if (manual || !quiet) showNotice(manual ? "Syncing STRATA backup…" : "Saving cloud backup…", "info", manual ? 0 : 2200);
  try {
    const client = getSupabaseClient();
    let user = supabaseUser || await refreshSupabaseUser();
    if (!user) {
      if (manual) showNotice("Sign in before syncing.", "warn");
      return false;
    }
    const backupState = cloudSafeState();
    const now = new Date().toISOString();
    const { error } = await client
      .from(CLOUD_TABLE)
      .upsert({
        user_id: user.id,
        backup_data: backupState,
        backup_summary: cloudBackupSummary(backupState),
        updated_at: now
      }, { onConflict: "user_id" });
    if (error) throw error;
    state.settings.cloud.lastSyncAt = now;
    state.settings.cloud.lastCloudStatus = "Synced";
    state.settings.cloud.userEmail = user.email || state.settings.cloud.userEmail;
    state.sessions = (state.sessions || []).map((session) => ({ ...session, cloudSyncedAt: now, cloudSyncError: "" }));
    saveState();
    if (manual || !quiet) showNotice("Cloud backup synced.", "good");
    if (route === "account") renderAccount();
    return true;
  } catch (error) {
    console.error(error);
    state.settings.cloud.lastCloudStatus = error.message || "Sync failed";
    saveState();
    showNotice(error.message || "Cloud sync failed. Local data is still saved.", manual ? "danger" : "warn", manual ? 0 : 6500);
    return false;
  }
}

function queueCloudBackup({ delay = 1800 } = {}) {
  const cloud = getSupabaseSettings();
  if (!cloud.url || !cloud.anonKey || cloud.autoSync === false) return;
  if (cloudSyncTimer) clearTimeout(cloudSyncTimer);
  cloudSyncTimer = window.setTimeout(() => {
    cloudSyncTimer = null;
    syncCloudBackup({ manual: false, quiet: true });
  }, delay);
}


async function restoreFromCloud() {
  if (!confirm("Restore and merge workouts, weights and routine settings from Supabase onto this device? Matching sessions will not be duplicated.")) return;
  await runCloudTask("Restoring STRATA cloud backup…", async () => {
    const client = getSupabaseClient();
    const user = supabaseUser || await refreshSupabaseUser();
    if (!user) throw new Error("Sign in before restoring.");
    const data = await fetchCloudBackup(client, user);
    const incoming = data?.backup_data;
    if (!incoming || !Array.isArray(incoming.sessions)) throw new Error("No valid STRATA backup found.");
    mergeCloudState(incoming);
    state.settings.cloud.lastRestoreAt = new Date().toISOString();
    state.settings.cloud.lastSyncAt = data.updated_at || state.settings.cloud.lastSyncAt;
    state.settings.cloud.userEmail = user.email || state.settings.cloud.userEmail;
    saveState();
    showNotice("Cloud backup restored and merged.", "good");
  });
  await syncCloudBackup({ manual: false, quiet: true });
  if (route === "account") renderAccount();
}


function mergeCloudState(incoming) {
  const byId = new Map((state.sessions || []).map((session) => [session.id, session]));
  (incoming.sessions || []).forEach((session) => {
    const existing = byId.get(session.id);
    if (!existing || String(session.completedAt || "") > String(existing.completedAt || "")) byId.set(session.id, session);
  });
  state.sessions = [...byId.values()].sort((a, b) => String(a.completedAt || "").localeCompare(String(b.completedAt || "")));
  const weights = new Map((state.weights || []).map((entry) => [entry.date, entry]));
  (incoming.weights || []).forEach((entry) => weights.set(entry.date, entry));
  state.weights = [...weights.values()].sort((a, b) => String(a.date).localeCompare(String(b.date)));
  state.photoSets = state.photoSets || [];
  const localCloud = getSupabaseSettings();
  state.settings = {
    ...state.settings,
    exerciseChoices: { ...(incoming.settings?.exerciseChoices || {}), ...(state.settings.exerciseChoices || {}) },
    exerciseSetup: { ...(incoming.settings?.exerciseSetup || {}), ...(state.settings.exerciseSetup || {}) },
    customExercises: [...new Map([...(incoming.settings?.customExercises || []), ...(state.settings.customExercises || [])].map((item) => [item.id || item.name, item])).values()],
    workoutLayouts: { ...(incoming.settings?.workoutLayouts || {}), ...(state.settings.workoutLayouts || {}) },
    effortScale: state.settings.effortScale || incoming.settings?.effortScale || "rpe",
    cloud: localCloud
  };
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
    render();
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
      render();
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



/* =========================================================
   STRATA v1.5.1 — Gym-door workout companion override
   Scope: perfect the live workout from start → set → rest → finish.
   Deep Body/Physique STRATA remains intentionally outside the gym flow.
   ========================================================= */

function renderActiveSession() {
  const session = state.activeSession;
  if (!session) return;
  document.body.classList.add("workout-mode");
  const workout = PROGRAM[session.workoutId] || { title: session.workoutId };
  pageTitle.textContent = workout.title;
  const prev = previousSession(session.workoutId, session.id);
  const previousVolume = prev ? calcSessionVolume(prev) : 0;
  const currentVolume = calcSessionVolume(session);
  const delta = currentVolume - previousVolume;
  const planned = countPlannedSets(session);
  const completed = countCompletedSets(session);
  const progress = planned ? Math.round((completed / planned) * 100) : 0;
  const activeIndex = Math.max(0, Math.min(Number(session.activeExerciseIndex || 0), session.logs.length - 1));
  session.activeExerciseIndex = activeIndex;

  view.innerHTML = `
    <header class="workout-command workout-command-compact">
      <div class="workout-command-top">
        <button class="workout-icon-button" data-action="minimize-session" type="button" aria-label="Minimize workout">⌄</button>
        <div class="workout-title-block">
          <span class="workout-kicker">GYM MODE</span>
          <strong>${escapeHtml(workout.title || session.workoutId)}</strong>
        </div>
        <button class="workout-finish-button" data-action="finish-session" type="button">Finish</button>
      </div>
      <div class="workout-command-stats">
        <span><b id="session-elapsed">${formatElapsed(session.startedAt)}</b><small>time</small></span>
        <span><b><i id="completed-set-count">${completed}</i>/${planned}</b><small>sets</small></span>
        <span><b id="session-current-volume">${kg(currentVolume)}</b><small>kg</small></span>
        <span><b id="session-delta-volume" class="${delta >= 0 ? "positive" : "negative"}">${delta >= 0 ? "+" : ""}${kg(delta)}</b><small>last</small></span>
      </div>
      <div class="workout-progress"><span id="session-progress-bar" style="width:${progress}%"></span></div>
    </header>

    <section id="active-log" class="active-workout-log gym-focus-only">
      ${gymDoorExerciseCard(session.logs[activeIndex], activeIndex, session.workoutId)}
    </section>

    <details class="exercise-queue-panel workout-queue-sheet">
      <summary><span>Workout queue</span><strong>${activeIndex + 1}/${session.logs.length} · ${completed}/${planned} sets</strong></summary>
      <div class="exercise-queue-list">
        ${session.logs.map((log, index) => `<button class="queue-item ${index === activeIndex ? "active" : ""}" data-action="open-exercise" data-ex="${index}" type="button"><span>${String(index + 1).padStart(2, "0")}</span><strong>${escapeHtml(log.name)}</strong><small>${countCompletedSets({ logs: [log] })}/${countPlannedSets({ logs: [log] })}</small></button>`).join("")}
      </div>
      <div class="queue-admin-actions">
        <button data-action="add-exercise" type="button">＋ Add exercise</button>
        <button data-action="cancel-session" type="button">Discard workout</button>
      </div>
    </details>

    <nav class="workout-dock workout-dock-minimal" aria-label="Workout controls">
      <button data-action="jump-exercise" data-dir="-1" type="button" ${activeIndex === 0 ? "disabled" : ""}>← <span>Prev</span></button>
      <div class="workout-dock-status"><strong id="dock-exercise-number">${activeIndex + 1}/${session.logs.length}</strong><span>exercise</span></div>
      <button data-action="jump-exercise" data-dir="1" type="button" ${activeIndex === session.logs.length - 1 ? "disabled" : ""}><span>Next</span> →</button>
    </nav>
  `;
  attachCommonHandlers();
  view.querySelectorAll("input[data-log]").forEach((input) => {
    input.addEventListener("change", updateActiveSessionField);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") event.currentTarget.blur();
    });
  });
  startSessionClock();
}

function gymDoorExerciseCard(log, index, workoutId) {
  if (!log) return `<section class="gym-set-card"><h2>No exercise selected</h2></section>`;
  const target = currentLogTarget(log);
  const previousLog = latestExerciseHistoryLog(log);
  const progression = matchedProgress(log, previousLog);
  const dp = doubleProgressionSignal(log);
  const current = calcExerciseVolume(log);
  const previous = previousLog ? calcExerciseVolume(previousLog) : 0;
  const delta = current - previous;
  const allComplete = completedExercise(log);
  const alternatives = alternativeOptionsForLog(log);
  return `
    <article class="gym-exercise-shell" data-exercise-index="${index}" id="exercise-${index}">
      <header class="gym-exercise-head">
        <div>
          <span>Exercise ${index + 1} of ${state.activeSession.logs.length}</span>
          <h2>${escapeHtml(log.name)}</h2>
          <p>${escapeHtml(log.muscle || "Other")} · ${escapeHtml(log.targetReps || "work range")} · ${restSecondsForExercise(workoutId, index)}s rest</p>
        </div>
        <button class="gym-swap-button" data-action="replace-exercise" data-ex="${index}" type="button">Swap</button>
      </header>

      <section class="gym-previous-strip">
        <div><span>Last work</span><strong>${escapeHtml(previousWorkSetText(log))}</strong></div>
        <div><span>This exercise</span><strong class="${delta >= 0 ? "positive" : "negative"}">${current ? `${kg(current)} kg` : "—"}${previous ? ` · ${delta >= 0 ? "+" : ""}${kg(delta)}` : ""}</strong></div>
      </section>

      ${target ? gymCurrentSetMarkup(log, index, target) : gymExerciseCompleteMarkup(log, index, previousLog)}

      <details class="gym-more-panel">
        <summary><span>Exercise options</span><strong>swap, add sets, setup</strong></summary>
        <div class="gym-option-grid">
          <button data-action="add-warmup-set" data-ex="${index}" type="button">+ warm-up</button>
          <button data-action="add-set" data-ex="${index}" type="button">+ work set</button>
          <button data-action="exercise-history" data-ex="${index}" type="button">Past</button>
          <button data-action="move-exercise" data-dir="-1" data-ex="${index}" type="button" ${index === 0 ? "disabled" : ""}>Move up</button>
          <button data-action="move-exercise" data-dir="1" data-ex="${index}" type="button" ${index === state.activeSession.logs.length - 1 ? "disabled" : ""}>Move down</button>
          <button class="danger-text" data-action="remove-exercise" data-ex="${index}" type="button">Remove</button>
        </div>
        ${alternatives.length ? `<div class="gym-alt-list"><span>Quick swaps</span>${alternatives.map((item) => `<button data-action="quick-swap-exercise" data-ex="${index}" data-alt="${escapeHtml(exerciseIdentity(item))}" type="button">${escapeHtml(item.name)}</button>`).join("")}</div>` : ""}
        <label class="gym-setup-note"><span>Setup / cue</span><textarea data-setup-note data-ex="${index}" placeholder="Seat, grip, stance, cue, machine pin…">${escapeHtml(log.setupNote || "")}</textarea></label>
      </details>

      <section class="gym-exercise-status ${progression.tone}">
        <strong>${escapeHtml(progression.label)}</strong>
        <span>${escapeHtml(progression.detail)}</span>
      </section>
      <section class="gym-double-status ${dp.ready ? "ready" : "hold"}">
        <strong>${escapeHtml(dp.label)}</strong>
        <span>${escapeHtml(dp.detail)}</span>
      </section>
    </article>`;
}

function gymCurrentSetMarkup(log, exerciseIndex, target) {
  if (target.kind === "drop" || target.kind === "legacyDrop") {
    const drop = getDropTarget(log, target.setIndex, target.dropIndex);
    return gymSetModeCard(log, exerciseIndex, target.setIndex, drop, true, target.dropIndex);
  }
  return gymSetModeCard(log, exerciseIndex, target.setIndex, log.sets[target.setIndex], false, null);
}

function gymSetModeCard(log, exerciseIndex, setIndex, set, isDrop, dropIndex) {
  const type = setTypeInfo(set?.setType || (isDrop ? "drop" : "work"));
  const previousText = set?.previousWeight !== "" || set?.previousReps !== ""
    ? `${set.previousWeight || "—"} × ${set.previousReps || "—"}`
    : "No previous same set";
  const targetText = nextSetTargetText(log, setIndex, set, isDrop);
  const title = isDrop ? `Optional drop${setIndex !== null ? ` from set ${setIndex + 1}` : ""}` : `${type.label} ${setIndex + 1}`;
  const weightField = isDrop ? "dropWeight" : "weight";
  const repsField = isDrop ? "dropReps" : "reps";
  return `
    <section class="gym-set-card ${isDrop ? "drop-focus" : ""}">
      <div class="gym-set-kicker">Current set</div>
      <h3>${escapeHtml(title)}</h3>
      <div class="gym-target-box">
        <span>Previous</span>
        <strong>${escapeHtml(previousText)}</strong>
        <p>${escapeHtml(targetText)}</p>
      </div>
      <div class="gym-input-row ${isDrop ? "drop-row-inputs" : ""}" ${isDrop ? `data-drop-entry data-ex="${exerciseIndex}" ${setIndex !== null ? `data-set="${setIndex}"` : ""} ${dropIndex !== null ? `data-drop-index="${dropIndex}"` : ""}` : `data-set-entry data-ex="${exerciseIndex}" data-set="${setIndex}"`}>
        <label><span>${escapeHtml(log.loadLabel || "kg")}</span><input aria-label="${escapeHtml(log.loadLabel || "kg")}" data-log="${weightField}" data-ex="${exerciseIndex}" ${setIndex !== null ? `data-set="${setIndex}"` : ""} ${dropIndex !== null ? `data-drop-index="${dropIndex}"` : ""} type="number" inputmode="decimal" step="0.5" value="${set?.weight ?? ""}"></label>
        <label><span>Reps</span><input aria-label="Reps" data-log="${repsField}" data-ex="${exerciseIndex}" ${setIndex !== null ? `data-set="${setIndex}"` : ""} ${dropIndex !== null ? `data-drop-index="${dropIndex}"` : ""} type="number" inputmode="numeric" step="1" value="${set?.reps ?? ""}"></label>
        <button class="gym-log-set" data-action="${isDrop ? "log-drop" : "log-set"}" data-ex="${exerciseIndex}" ${setIndex !== null ? `data-set="${setIndex}"` : ""} ${dropIndex !== null ? `data-drop-index="${dropIndex}"` : ""} type="button">Log set</button>
      </div>
      ${loggedSetSummary(log, exerciseIndex)}
    </section>`;
}

function loggedSetSummary(log, exerciseIndex) {
  const completed = [];
  (log.sets || []).forEach((set, setIndex) => {
    if (set.completed) completed.push({ set, setIndex, isDrop: false });
    (set.drops || []).forEach((drop, dropIndex) => {
      if (drop.completed) completed.push({ set: drop, setIndex, isDrop: true, dropIndex });
    });
  });
  if (log.drop?.completed) completed.push({ set: log.drop, setIndex: null, isDrop: true, dropIndex: null });
  if (!completed.length) return `<p class="gym-no-sets">No sets logged yet.</p>`;
  return `<details class="gym-logged-sets"><summary>${completed.length} set${completed.length === 1 ? "" : "s"} logged</summary>${completed.map((item) => {
    const type = setTypeInfo(item.set.setType || (item.isDrop ? "drop" : "work"));
    return `<div><span>${type.short}</span><strong>${escapeHtml(formatSetResult(item.set, log))}</strong><button data-action="${item.isDrop ? "edit-drop" : "edit-set"}" data-ex="${exerciseIndex}" ${item.setIndex !== null ? `data-set="${item.setIndex}"` : ""} ${item.dropIndex !== undefined && item.dropIndex !== null ? `data-drop-index="${item.dropIndex}"` : ""} type="button">Edit</button></div>`;
  }).join("")}</details>`;
}

function gymExerciseCompleteMarkup(log, exerciseIndex, previousLog) {
  const dp = doubleProgressionSignal(log);
  const work = workingSetsForProgression(log).filter((set) => set.setType !== "drop");
  const previous = (previousLog?.sets || []).filter((set) => set.setType !== "warmup");
  const lastWorkIndex = [...(log.sets || [])].map((set, i) => ({ set, i })).reverse().find((item) => item.set.completed && item.set.setType !== "warmup")?.i;
  return `
    <section class="gym-exercise-complete">
      <span>Exercise complete</span>
      <h3>${escapeHtml(log.name)}</h3>
      <div class="gym-complete-comparison">
        <div><span>Previous</span><strong>${previous.length ? previous.map((set) => `${set.weight || "—"}×${set.reps || "—"}`).join(" / ") : "Baseline"}</strong></div>
        <div><span>Today</span><strong>${work.length ? work.map((set) => `${set.weight || "—"}×${set.reps || "—"}`).join(" / ") : "No work sets"}</strong></div>
      </div>
      <p class="gym-next-action ${dp.ready ? "ready" : "hold"}"><strong>${escapeHtml(dp.ready ? "Increase next time" : "Next target")}</strong>${escapeHtml(nextExerciseActionText(log))}</p>
      <div class="gym-complete-actions">
        ${lastWorkIndex !== undefined ? `<button data-action="add-drop-to-set" data-ex="${exerciseIndex}" data-set="${lastWorkIndex}" type="button">+ drop from last set</button>` : ""}
        <button data-action="add-set" data-ex="${exerciseIndex}" type="button">+ extra set</button>
        <button data-action="jump-exercise" data-dir="1" type="button" ${exerciseIndex === state.activeSession.logs.length - 1 ? "disabled" : ""}>Next exercise →</button>
      </div>
      ${exerciseFeedbackMarkup(log, exerciseIndex, true)}
    </section>`;
}

function nextSetTargetText(log, setIndex, set, isDrop = false) {
  if (!set) return "Log a clean set.";
  if (isDrop) return "Drop set: reduce load, chase clean reps, and stop before form breaks.";
  if (set.setType === "warmup") return "Warm-up only. Ramp smoothly; this will not count as a hard set.";
  const { max } = repRangeBounds(log.targetReps);
  if (previousSessionWasReadyToProgress(log)) return `Last session topped the range. Use a heavier load if it is available and aim for ${repRangeBounds(log.targetReps).min || 8}+ reps.`;
  const pw = Number(set.previousWeight || 0);
  const pr = Number(set.previousReps || 0);
  if (!pw && !pr) return `Build a baseline in the ${log.targetReps || "target"} range.`;
  if (max && pr >= max) return `You hit the top last time. Repeat ${max}+ here or push the remaining sets to the top.`;
  if (pr) return `Beat last time: aim for ${pr + 1}+ reps at the same load, or match it with lower RPE.`;
  return `Match the prescribed range: ${log.targetReps || "controlled work reps"}.`;
}

function previousSessionWasReadyToProgress(log) {
  const previousLog = latestExerciseHistoryLog(log);
  if (!previousLog) return false;
  return Boolean(doubleProgressionSignal(previousLog).ready);
}

function nextExerciseActionText(log) {
  const dp = doubleProgressionSignal(log);
  const { max } = repRangeBounds(log.targetReps);
  if (dp.ready) return ` — all work sets reached ${max || "the top"}. Increase load 5–10% next time and rebuild.`;
  const work = workingSetsForProgression(log).filter((set) => set.setType !== "drop");
  if (!work.length) return " — complete work sets next time.";
  const lowest = Math.min(...work.map((set) => Number(set.reps || 0)));
  if (max) return ` — hold the load until every work set reaches ${max}. Lowest set today: ${lowest}.`;
  return " — repeat the load and beat total reps next time.";
}


function editSet(exerciseIndex, setIndex, isDrop, button, dropIndex = null) {
  const log = state.activeSession?.logs?.[exerciseIndex];
  const target = isDrop ? getDropTarget(log, setIndex, dropIndex) : log?.sets?.[setIndex];
  if (!target) return;
  target.completed = false;
  target.rir = "";
  target.rpe = "";
  delete target.completedAt;
  saveState();
  renderActiveSession();
  showNotice("Set reopened. Adjust it and log again.", "info");
}

function restContextAfterSet(log, exerciseIndex, setIndex, target, isDrop, dropIndex) {
  const nextTarget = currentLogTarget(log);
  const nextText = nextTarget
    ? describeRestNextTarget(log, nextTarget)
    : "Exercise complete. Choose a drop, add an extra set, or move on.";
  return {
    exerciseIndex,
    setIndex,
    dropIndex,
    isDrop,
    isWarmup: target?.setType === "warmup",
    last: `${formatSetResult(target, log)}${target?.setType === "warmup" ? " · warm-up" : ""}`,
    next: nextText
  };
}

function describeRestNextTarget(log, target) {
  if (target.kind === "drop") return `Next: optional drop after set ${target.setIndex + 1}. Suggested goal: clean reps after the load reduction.`;
  if (target.kind === "legacyDrop") return "Next: optional drop set.";
  const set = log.sets[target.setIndex];
  const type = setTypeInfo(set?.setType || "work");
  const label = set?.setType === "warmup" ? "warm-up" : `set ${target.setIndex + 1}`;
  return `Next: ${type.label} ${label}. ${nextSetTargetText(log, target.setIndex, set, false)}`;
}

function completeSet(exerciseIndex, setIndex, isDrop, button, dropIndex = null) {
  const log = state.activeSession?.logs?.[exerciseIndex];
  if (!log) return;
  commitSetInputs(exerciseIndex, setIndex, isDrop, dropIndex);
  const target = isDrop ? getDropTarget(log, setIndex, dropIndex) : log.sets?.[setIndex];
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
  updateActiveSessionSummary(exerciseIndex);
  const restSeconds = target.setType === "warmup"
    ? Math.min(90, restSecondsForExercise(state.activeSession.workoutId, exerciseIndex))
    : restSecondsForExercise(state.activeSession.workoutId, exerciseIndex);
  const context = restContextAfterSet(log, exerciseIndex, setIndex, target, isDrop, dropIndex);
  startRestTimer(restSeconds, log.name, context);
}

function startRestTimer(seconds, exerciseName, context = {}) {
  prepareAudio();
  clearInterval(restTimerInterval);
  restTimerEndAt = Date.now() + seconds * 1000;
  restTimer?.classList.remove("hidden");
  document.body.classList.add("rest-timer-active");
  const status = document.querySelector("#rest-timer-status");
  const time = document.querySelector("#rest-timer-time");
  const exercise = document.querySelector("#rest-timer-exercise");
  const dismiss = document.querySelector("#rest-timer-dismiss");
  if (status) status.textContent = "Resting";
  if (exercise) exercise.textContent = exerciseName;
  if (dismiss) dismiss.textContent = "Skip";
  let details = document.querySelector("#rest-timer-details");
  if (!details) {
    details = document.createElement("div");
    details.id = "rest-timer-details";
    details.className = "rest-timer-details";
    restTimer?.querySelector(".rest-timer-copy")?.appendChild(details);
  }
  details.innerHTML = `
    ${context.last ? `<div class="rest-last"><span>Last set</span><strong>${escapeHtml(context.last)}</strong></div>` : ""}
    ${context.next ? `<div class="rest-next"><span>Next</span><strong>${escapeHtml(context.next)}</strong></div>` : ""}
    ${context.isWarmup ? "" : restEffortMarkup(context)}
  `;
  details.querySelectorAll("[data-rest-effort]").forEach((button) => button.addEventListener("click", () => {
    setEffort(Number(button.dataset.ex), button.dataset.set !== undefined ? Number(button.dataset.set) : null, button.dataset.scale, button.dataset.value, button.dataset.drop === "true", button, button.dataset.dropIndex !== undefined ? Number(button.dataset.dropIndex) : null);
    details.querySelectorAll("[data-rest-effort]").forEach((chip) => chip.classList.toggle("selected", chip === button));
  }));
  if (time) time.textContent = formatTimer(seconds);
  updateRestTimerDisplay();
  restTimerInterval = setInterval(updateRestTimerDisplay, 250);
}

function restEffortMarkup(context) {
  const scale = state.settings.effortScale === "rir" ? "rir" : "rpe";
  const values = scale === "rpe" ? ["6", "7", "8", "9", "10"] : ["0", "1", "2", "3", "4+"];
  return `<div class="rest-effort"><span>${scale.toUpperCase()} for last set</span><div>${values.map((value) => `<button data-rest-effort data-action="set-effort" data-ex="${context.exerciseIndex}" ${context.setIndex !== null ? `data-set="${context.setIndex}"` : ""} ${context.dropIndex !== null && context.dropIndex !== undefined ? `data-drop-index="${context.dropIndex}"` : ""} ${context.isDrop ? `data-drop="true"` : ""} data-scale="${scale}" data-value="${value}" type="button">${value}</button>`).join("")}</div></div>`;
}

function dismissRestTimer() {
  clearInterval(restTimerInterval);
  restTimerInterval = null;
  restTimerEndAt = 0;
  restTimer?.classList.add("hidden");
  document.body.classList.remove("rest-timer-active");
  const details = document.querySelector("#rest-timer-details");
  if (details) details.innerHTML = "";
  if (state.activeSession && route === "training") renderActiveSession();
}

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
    notes: state.activeSession.notes || "",
    completedAt: new Date().toISOString()
  };
  const prev = previousSession(finished.workoutId, finished.id);
  const prevVolume = prev ? calcSessionVolume(prev) : 0;
  const currentVolume = calcSessionVolume(finished);
  finished.previousVolume = prevVolume;
  finished.deltaVolume = currentVolume - prevVolume;
  finished.gymDoorActions = gymDoorActions(finished);
  state.sessions.push(finished);
  if (finished.workoutId.startsWith("strength")) state.settings.fridayRotationIndex = (state.settings.fridayRotationIndex + 1) % 3;
  state.activeSession = null;
  saveState();
  syncShellMode();
  renderWorkoutComplete(finished);
  queueCloudBackup();
}

function gymDoorActions(session) {
  return (session.logs || []).map((log) => {
    const previousLog = exerciseHistoryEntries(log).find(({ session: item }) => item.id !== session.id && String(item.completedAt || "") < session.completedAt)?.log || null;
    const dp = doubleProgressionSignal(log);
    const progression = matchedProgress(log, previousLog);
    return {
      name: log.name,
      tone: dp.ready ? "ready" : progression.tone,
      action: dp.ready ? "Increase load next time" : nextExerciseActionText(log).replace(/^\s*—\s*/, ""),
      detail: progression.label
    };
  });
}

function renderWorkoutComplete(session) {
  const workout = PROGRAM[session.workoutId];
  const volume = calcSessionVolume(session);
  const delta = volume - (session.previousVolume || 0);
  const durationMinutes = Math.max(1, Math.round((new Date(session.completedAt) - new Date(session.startedAt)) / 60000));
  const counts = progressionCounts(session, session.completedAt);
  const averageRpe = sessionAverageRpe(session);
  const muscles = sessionMuscleStimulusSummary(session);
  const actions = gymDoorActions(session);
  document.body.classList.remove("workout-mode");
  stopSessionClock();
  pageTitle.textContent = "Workout Complete";
  view.innerHTML = `
    <section class="completion-hero gym-door-hero">
      <span>GYM-DOOR REPORT</span>
      <h2>${escapeHtml(workout?.title || session.workoutId)}</h2>
      <div class="completion-primary"><strong>${durationMinutes}</strong><small>minutes</small></div>
      <div class="completion-strip completion-strip-advanced">
        <div><strong>${countHardSets(session)}</strong><span>hard sets</span></div>
        <div><strong>${kg(volume)}</strong><span>kg volume</span></div>
        <div><strong>${delta >= 0 ? "+" : ""}${kg(delta)}</strong><span>vs last</span></div>
        <div><strong>${averageRpe !== null ? averageRpe.toFixed(1) : "—"}</strong><span>avg RPE</span></div>
      </div>
      <div class="completion-progress-counts">
        <div class="positive"><strong>${counts.positive}</strong><span>progressed</span></div>
        <div><strong>${counts.neutral}</strong><span>held</span></div>
        <div class="negative"><strong>${counts.negative}</strong><span>down</span></div>
        ${counts.baseline ? `<div><strong>${counts.baseline}</strong><span>baseline</span></div>` : `<div><strong>${actions.filter((a) => a.tone === "ready").length}</strong><span>load jumps</span></div>`}
      </div>
    </section>

    <section class="gym-door-actions">
      <header><span>Next time</span><strong>Do this when the exercise returns</strong></header>
      ${actions.map((item) => `<article class="gym-action ${escapeHtml(item.tone)}"><h3>${escapeHtml(item.name)}</h3><strong>${escapeHtml(item.action)}</strong><p>${escapeHtml(item.detail)}</p></article>`).join("")}
    </section>

    <section class="completion-stimulus gym-door-stimulus">
      <header><span>Muscles hit</span><strong>volume × intensity × rep range</strong></header>
      <div class="stimulus-list stimulus-map-list">
        ${muscles.map((item) => `<article class="stimulus-card stimulus-card-${escapeHtml(item.intensityTone)}">
          <div class="stimulus-card-head"><div><h3>${escapeHtml(item.muscle)}</h3><p>${item.sets} hard set${item.sets === 1 ? "" : "s"} · ${escapeHtml(item.volumeLabel)}</p></div><strong>${item.avgRpe !== null ? `RPE ${item.avgRpe.toFixed(1)}` : "—"}</strong></div>
          <div class="stimulus-matrix"><div class="stimulus-track">${item.ranges.map(([range, count]) => `<span class="stimulus-segment stimulus-${escapeHtml(item.intensityTone)}" style="--w:${Math.max(10, Math.round((count / Math.max(1, item.sets)) * 100))}%"><b>${count}</b><em>${escapeHtml(range)}</em></span>`).join("")}</div><div class="stimulus-legend"><span>${escapeHtml(item.intensity)} effort</span><span>${escapeHtml(item.primaryRange)} focus</span></div></div>
          <p class="stimulus-conclusion">${escapeHtml(stimulusConclusion(item))}</p>
        </article>`).join("") || `<p class="muted">No hard-set muscle stimulus recorded.</p>`}
      </div>
    </section>

    <section class="completion-exercises gym-door-exercises">
      <header><span>Exercise report</span><strong>Short, practical, same-workout comparison</strong></header>
      ${session.logs.map((log) => {
        const previousLog = exerciseHistoryEntries(log).find(({ session: item }) => item.id !== session.id && String(item.completedAt || "") < session.completedAt)?.log || null;
        const result = matchedProgress(log, previousLog);
        const volumeDelta = exerciseVolumeDeltaText(log, previousLog);
        const dp = doubleProgressionSignal(log);
        return `<article class="completion-exercise ${result.tone} ${dp.ready ? "ready-progress" : ""}"><div><h3>${escapeHtml(log.name)}</h3><p>${escapeHtml(result.label)}</p></div><span>${escapeHtml(volumeDelta.text)}</span><div class="progression-callout ${dp.ready ? "ready" : "hold"}"><strong>${escapeHtml(dp.label)}</strong><span>${escapeHtml(dp.detail)}</span></div></article>`;
      }).join("")}
    </section>

    <button class="primary full" data-route-jump="today" type="button">Return to Today</button>
  `;
  view.querySelector("[data-route-jump]")?.addEventListener("click", () => setRoute("today"));
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



/* =========================================================
   STRATA v1.5.5 — Monday field-test patch
   Scope: workout overview → exercise focus → rest/finish → gym-door report.
   ========================================================= */

const STRATA_V155_EXTRA_LIBRARY = [
  { exerciseId: "alt-incline-smith", variantId: "alt-incline-smith", name: "Smith incline press", muscle: "Chest", type: "compound", sets: 3, reps: "8–12", loadLabel: "kg", loadMultiplier: 1, repMultiplier: 1, volumeMode: "external", allowZeroWeight: false, restSeconds: 150, custom: false, libraryLabel: "Smith incline press · Chest" },
  { exerciseId: "alt-incline-machine", variantId: "alt-incline-machine", name: "Incline machine press", muscle: "Chest", type: "machine", sets: 3, reps: "8–12", loadLabel: "kg", loadMultiplier: 1, repMultiplier: 1, volumeMode: "external", allowZeroWeight: false, restSeconds: 150, custom: false, libraryLabel: "Incline machine press · Chest" },
  { exerciseId: "alt-machine-chest-press", variantId: "alt-machine-chest-press", name: "Machine chest press", muscle: "Chest", type: "machine", sets: 3, reps: "8–12", loadLabel: "kg", loadMultiplier: 1, repMultiplier: 1, volumeMode: "external", allowZeroWeight: false, restSeconds: 150, custom: false, libraryLabel: "Machine chest press · Chest" },
  { exerciseId: "alt-pec-deck", variantId: "alt-pec-deck", name: "Pec deck", muscle: "Chest", type: "isolation", sets: 3, reps: "10–15", loadLabel: "kg", loadMultiplier: 1, repMultiplier: 1, volumeMode: "external", allowZeroWeight: false, restSeconds: 90, custom: false, libraryLabel: "Pec deck · Chest" },
  { exerciseId: "alt-cable-fly", variantId: "alt-cable-fly", name: "Cable fly", muscle: "Chest", type: "isolation", sets: 3, reps: "10–15", loadLabel: "kg", loadMultiplier: 1, repMultiplier: 1, volumeMode: "external", allowZeroWeight: false, restSeconds: 90, custom: false, libraryLabel: "Cable fly · Chest" },

  { exerciseId: "alt-chest-supported-row", variantId: "alt-chest-supported-row", name: "Chest-supported row", muscle: "Back", type: "machine", sets: 3, reps: "8–12", loadLabel: "kg", loadMultiplier: 1, repMultiplier: 1, volumeMode: "external", allowZeroWeight: false, restSeconds: 150, custom: false, libraryLabel: "Chest-supported row · Back" },
  { exerciseId: "alt-seated-cable-row", variantId: "alt-seated-cable-row", name: "Seated cable row", muscle: "Back", type: "compound", sets: 3, reps: "8–12", loadLabel: "kg", loadMultiplier: 1, repMultiplier: 1, volumeMode: "external", allowZeroWeight: false, restSeconds: 150, custom: false, libraryLabel: "Seated cable row · Back" },
  { exerciseId: "alt-machine-row", variantId: "alt-machine-row", name: "Machine row", muscle: "Back", type: "machine", sets: 3, reps: "8–12", loadLabel: "kg", loadMultiplier: 1, repMultiplier: 1, volumeMode: "external", allowZeroWeight: false, restSeconds: 150, custom: false, libraryLabel: "Machine row · Back" },
  { exerciseId: "alt-one-arm-db-row", variantId: "alt-one-arm-db-row", name: "One-arm dumbbell row", muscle: "Back", type: "compound", sets: 3, reps: "8–12", loadLabel: "kg / hand", loadMultiplier: 1, repMultiplier: 1, volumeMode: "external", allowZeroWeight: false, restSeconds: 120, custom: false, libraryLabel: "One-arm dumbbell row · Back" },
  { exerciseId: "alt-assisted-pullup", variantId: "alt-assisted-pullup", name: "Assisted pull-up", muscle: "Back", type: "machine", sets: 3, reps: "8–12", loadLabel: "assistance kg", loadMultiplier: 1, repMultiplier: 1, volumeMode: "external", allowZeroWeight: true, restSeconds: 150, custom: false, libraryLabel: "Assisted pull-up · Back" },

  { exerciseId: "alt-machine-shoulder-press", variantId: "alt-machine-shoulder-press", name: "Machine shoulder press", muscle: "Shoulders", type: "machine", sets: 3, reps: "8–12", loadLabel: "kg", loadMultiplier: 1, repMultiplier: 1, volumeMode: "external", allowZeroWeight: false, restSeconds: 150, custom: false, libraryLabel: "Machine shoulder press · Shoulders" },
  { exerciseId: "alt-smith-shoulder-press", variantId: "alt-smith-shoulder-press", name: "Smith shoulder press", muscle: "Shoulders", type: "compound", sets: 3, reps: "8–12", loadLabel: "kg", loadMultiplier: 1, repMultiplier: 1, volumeMode: "external", allowZeroWeight: false, restSeconds: 150, custom: false, libraryLabel: "Smith shoulder press · Shoulders" },
  { exerciseId: "alt-cable-lateral-raise", variantId: "alt-cable-lateral-raise", name: "Cable lateral raise", muscle: "Side delts", type: "isolation", sets: 3, reps: "10–15", loadLabel: "kg", loadMultiplier: 1, repMultiplier: 1, volumeMode: "external", allowZeroWeight: false, restSeconds: 75, custom: false, libraryLabel: "Cable lateral raise · Side delts" },
  { exerciseId: "alt-machine-lateral-raise", variantId: "alt-machine-lateral-raise", name: "Machine lateral raise", muscle: "Side delts", type: "isolation", sets: 3, reps: "10–15", loadLabel: "kg", loadMultiplier: 1, repMultiplier: 1, volumeMode: "external", allowZeroWeight: false, restSeconds: 75, custom: false, libraryLabel: "Machine lateral raise · Side delts" },

  { exerciseId: "alt-rope-pressdown", variantId: "alt-rope-pressdown", name: "Rope pressdown", muscle: "Triceps", type: "isolation", sets: 3, reps: "10–15", loadLabel: "kg", loadMultiplier: 1, repMultiplier: 1, volumeMode: "external", allowZeroWeight: false, restSeconds: 75, custom: false, libraryLabel: "Rope pressdown · Triceps" },
  { exerciseId: "alt-overhead-cable-triceps", variantId: "alt-overhead-cable-triceps", name: "Overhead cable triceps extension", muscle: "Triceps", type: "isolation", sets: 3, reps: "10–15", loadLabel: "kg", loadMultiplier: 1, repMultiplier: 1, volumeMode: "external", allowZeroWeight: false, restSeconds: 75, custom: false, libraryLabel: "Overhead cable triceps extension · Triceps" },
  { exerciseId: "alt-ez-curl", variantId: "alt-ez-curl", name: "EZ-bar curl", muscle: "Biceps", type: "isolation", sets: 3, reps: "8–12", loadLabel: "kg", loadMultiplier: 1, repMultiplier: 1, volumeMode: "external", allowZeroWeight: false, restSeconds: 75, custom: false, libraryLabel: "EZ-bar curl · Biceps" },
  { exerciseId: "alt-incline-db-curl", variantId: "alt-incline-db-curl", name: "Incline dumbbell curl", muscle: "Biceps", type: "isolation", sets: 3, reps: "10–15", loadLabel: "kg / hand", loadMultiplier: 2, repMultiplier: 1, volumeMode: "external", allowZeroWeight: false, restSeconds: 75, custom: false, libraryLabel: "Incline dumbbell curl · Biceps" },

  { exerciseId: "alt-hack-squat", variantId: "alt-hack-squat", name: "Hack squat", muscle: "Quads", type: "machine", sets: 3, reps: "8–12", loadLabel: "kg", loadMultiplier: 1, repMultiplier: 1, volumeMode: "external", allowZeroWeight: false, restSeconds: 150, custom: false, libraryLabel: "Hack squat · Quads" },
  { exerciseId: "alt-pendulum-squat", variantId: "alt-pendulum-squat", name: "Pendulum squat", muscle: "Quads", type: "machine", sets: 3, reps: "8–12", loadLabel: "kg", loadMultiplier: 1, repMultiplier: 1, volumeMode: "external", allowZeroWeight: false, restSeconds: 150, custom: false, libraryLabel: "Pendulum squat · Quads" },
  { exerciseId: "alt-belt-squat", variantId: "alt-belt-squat", name: "Belt squat", muscle: "Quads", type: "machine", sets: 3, reps: "8–12", loadLabel: "kg", loadMultiplier: 1, repMultiplier: 1, volumeMode: "external", allowZeroWeight: false, restSeconds: 150, custom: false, libraryLabel: "Belt squat · Quads" },
  { exerciseId: "alt-bulgarian-split-squat", variantId: "alt-bulgarian-split-squat", name: "Bulgarian split squat", muscle: "Quads", type: "unilateral", sets: 3, reps: "8–12 per leg", loadLabel: "kg / hand", loadMultiplier: 2, repMultiplier: 2, volumeMode: "external", allowZeroWeight: false, restSeconds: 150, custom: false, libraryLabel: "Bulgarian split squat · Quads" },

  { exerciseId: "alt-romanian-deadlift", variantId: "alt-romanian-deadlift", name: "Romanian deadlift", muscle: "Hamstrings", type: "hinge", sets: 3, reps: "6–10", loadLabel: "kg", loadMultiplier: 1, repMultiplier: 1, volumeMode: "external", allowZeroWeight: false, restSeconds: 180, custom: false, libraryLabel: "Romanian deadlift · Hamstrings" },
  { exerciseId: "alt-dumbbell-rdl", variantId: "alt-dumbbell-rdl", name: "Dumbbell Romanian deadlift", muscle: "Hamstrings", type: "hinge", sets: 3, reps: "8–12", loadLabel: "kg / hand", loadMultiplier: 2, repMultiplier: 1, volumeMode: "external", allowZeroWeight: false, restSeconds: 150, custom: false, libraryLabel: "Dumbbell Romanian deadlift · Hamstrings" },
  { exerciseId: "alt-single-leg-curl", variantId: "alt-single-leg-curl", name: "Single-leg curl", muscle: "Hamstrings", type: "isolation", sets: 3, reps: "10–15", loadLabel: "kg", loadMultiplier: 1, repMultiplier: 2, volumeMode: "external", allowZeroWeight: false, restSeconds: 90, custom: false, libraryLabel: "Single-leg curl · Hamstrings" },
  { exerciseId: "alt-glute-ham-raise", variantId: "alt-glute-ham-raise", name: "Glute-ham raise", muscle: "Hamstrings", type: "accessory", sets: 3, reps: "8–12", loadLabel: "added kg", loadMultiplier: 1, repMultiplier: 1, volumeMode: "external", allowZeroWeight: true, restSeconds: 120, custom: false, libraryLabel: "Glute-ham raise · Hamstrings" },

  { exerciseId: "alt-hip-thrust-machine", variantId: "alt-hip-thrust-machine", name: "Hip thrust machine", muscle: "Glutes", type: "machine", sets: 3, reps: "8–12", loadLabel: "kg", loadMultiplier: 1, repMultiplier: 1, volumeMode: "external", allowZeroWeight: false, restSeconds: 150, custom: false, libraryLabel: "Hip thrust machine · Glutes" },
  { exerciseId: "alt-glute-bridge", variantId: "alt-glute-bridge", name: "Barbell glute bridge", muscle: "Glutes", type: "compound", sets: 3, reps: "8–12", loadLabel: "kg", loadMultiplier: 1, repMultiplier: 1, volumeMode: "external", allowZeroWeight: false, restSeconds: 150, custom: false, libraryLabel: "Barbell glute bridge · Glutes" },
  { exerciseId: "alt-donkey-calf", variantId: "alt-donkey-calf", name: "Donkey calf raise", muscle: "Calves", type: "isolation", sets: 3, reps: "10–15", loadLabel: "kg", loadMultiplier: 1, repMultiplier: 1, volumeMode: "external", allowZeroWeight: false, restSeconds: 75, custom: false, libraryLabel: "Donkey calf raise · Calves" },
  { exerciseId: "alt-leg-press-calf", variantId: "alt-leg-press-calf", name: "Leg press calf raise", muscle: "Calves", type: "isolation", sets: 3, reps: "10–15", loadLabel: "kg", loadMultiplier: 1, repMultiplier: 1, volumeMode: "external", allowZeroWeight: false, restSeconds: 75, custom: false, libraryLabel: "Leg press calf raise · Calves" }
];

const STRATA_V155_BASE_LIBRARY_ITEMS = exerciseLibraryItems;
exerciseLibraryItems = function exerciseLibraryItemsV155() {
  const seen = new Set();
  return [...STRATA_V155_BASE_LIBRARY_ITEMS(), ...STRATA_V155_EXTRA_LIBRARY]
    .filter((item) => {
      const key = exerciseIdentity(item);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => String(a.name).localeCompare(String(b.name)));
};

alternativeOptionsForLog = function alternativeOptionsForLogV155(log) {
  const currentKey = exerciseIdentity(log);
  const library = exerciseLibraryItems();
  const sameExercise = library.filter((item) => item.exerciseId === log.exerciseId && exerciseIdentity(item) !== currentKey);
  const exactMuscle = library.filter((item) => item.muscle === log.muscle && exerciseIdentity(item) !== currentKey && item.exerciseId !== log.exerciseId);
  const groupedMuscle = library.filter((item) => muscleGroupKey(item.muscle) === muscleGroupKey(log.muscle) && exerciseIdentity(item) !== currentKey && item.exerciseId !== log.exerciseId && item.muscle !== log.muscle);
  return [...sameExercise, ...exactMuscle, ...groupedMuscle].slice(0, 10);
};

function muscleGroupKey(muscle) {
  const m = String(muscle || "").toLowerCase();
  if (m.includes("chest")) return "chest";
  if (m.includes("back") || m.includes("lat")) return "back";
  if (m.includes("shoulder") || m.includes("delt")) return "delts";
  if (m.includes("tricep")) return "triceps";
  if (m.includes("bicep") || m.includes("curl")) return "biceps";
  if (m.includes("quad")) return "quads";
  if (m.includes("hamstring") || m.includes("posterior") || m.includes("hinge")) return "hams";
  if (m.includes("glute")) return "glutes";
  if (m.includes("calf")) return "calves";
  return m;
}

openExercise = function openExerciseV155(index) {
  if (!state.activeSession) return;
  state.activeSession.focusMode = "exercise";
  setActiveExercise(index);
  saveState();
  renderActiveSession();
};

jumpExercise = function jumpExerciseV155(direction) {
  if (!state.activeSession) return;
  const current = Number(state.activeSession.activeExerciseIndex || 0);
  const next = Math.max(0, Math.min(state.activeSession.logs.length - 1, current + direction));
  openExercise(next);
};

function returnToWorkoutList(message = "Workout list") {
  if (!state.activeSession) return;
  state.activeSession.focusMode = "overview";
  saveState();
  dismissRestTimer();
  renderActiveSession();
  if (message) showNotice(message, "info");
}

document.addEventListener("click", (event) => {
  const exit = event.target.closest?.("[data-action='return-workout-list']");
  if (exit) {
    event.preventDefault();
    returnToWorkoutList("Back to workout list.");
  }
});

renderActiveSession = function renderActiveSessionV155() {
  const session = state.activeSession;
  if (!session) return;
  document.body.classList.add("workout-mode");
  if (session.focusMode !== "exercise") {
    renderWorkoutOverview(session);
    return;
  }
  const workout = PROGRAM[session.workoutId] || { title: session.workoutId };
  pageTitle.textContent = workout.title;
  const prev = previousSession(session.workoutId, session.id);
  const previousVolume = prev ? calcSessionVolume(prev) : 0;
  const currentVolume = calcSessionVolume(session);
  const delta = currentVolume - previousVolume;
  const planned = countPlannedSets(session);
  const completed = countCompletedSets(session);
  const progress = planned ? Math.round((completed / planned) * 100) : 0;
  const activeIndex = Math.max(0, Math.min(Number(session.activeExerciseIndex || 0), session.logs.length - 1));
  session.activeExerciseIndex = activeIndex;
  view.innerHTML = `
    <header class="workout-command workout-command-compact exercise-focus-head">
      <div class="workout-command-top">
        <button class="workout-icon-button" data-action="return-workout-list" type="button" aria-label="Back to workout list">←</button>
        <div class="workout-title-block">
          <span class="workout-kicker">EXERCISE MODE</span>
          <strong>${escapeHtml(workout.title || session.workoutId)}</strong>
        </div>
        <button class="workout-finish-button" data-action="finish-session" type="button">Finish</button>
      </div>
      <div class="workout-command-stats">
        <span><b id="session-elapsed">${formatElapsed(session.startedAt)}</b><small>time</small></span>
        <span><b><i id="completed-set-count">${completed}</i>/${planned}</b><small>sets</small></span>
        <span><b id="session-current-volume">${kg(currentVolume)}</b><small>kg</small></span>
        <span><b id="session-delta-volume" class="${delta >= 0 ? "positive" : "negative"}">${delta >= 0 ? "+" : ""}${kg(delta)}</b><small>last</small></span>
      </div>
      <div class="workout-progress"><span id="session-progress-bar" style="width:${progress}%"></span></div>
    </header>
    <section id="active-log" class="active-workout-log gym-focus-only exercise-focus-only">
      ${gymDoorExerciseCard(session.logs[activeIndex], activeIndex, session.workoutId)}
    </section>
  `;
  attachCommonHandlers();
  view.querySelectorAll("input[data-log]").forEach((input) => {
    input.addEventListener("change", updateActiveSessionField);
    input.addEventListener("keydown", (event) => { if (event.key === "Enter") event.currentTarget.blur(); });
  });
  view.querySelectorAll("textarea[data-setup-note]").forEach((textarea) => textarea.addEventListener("change", updateSetupNote));
  startSessionClock();
};

function renderWorkoutOverview(session) {
  const workout = PROGRAM[session.workoutId] || { title: session.workoutId };
  pageTitle.textContent = workout.title;
  const prev = previousSession(session.workoutId, session.id);
  const previousVolume = prev ? calcSessionVolume(prev) : 0;
  const currentVolume = calcSessionVolume(session);
  const planned = countPlannedSets(session);
  const completed = countCompletedSets(session);
  const progress = planned ? Math.round((completed / planned) * 100) : 0;
  const delta = currentVolume - previousVolume;
  view.innerHTML = `
    <header class="workout-command workout-overview-head">
      <div class="workout-command-top">
        <div class="workout-title-block"><span class="workout-kicker">GYM MODE</span><strong>${escapeHtml(workout.title || session.workoutId)}</strong></div>
        <button class="workout-finish-button" data-action="finish-session" type="button">Finish</button>
      </div>
      <div class="workout-command-stats">
        <span><b id="session-elapsed">${formatElapsed(session.startedAt)}</b><small>time</small></span>
        <span><b><i id="completed-set-count">${completed}</i>/${planned}</b><small>sets</small></span>
        <span><b id="session-current-volume">${kg(currentVolume)}</b><small>kg</small></span>
        <span><b id="session-delta-volume" class="${delta >= 0 ? "positive" : "negative"}">${delta >= 0 ? "+" : ""}${kg(delta)}</b><small>last</small></span>
      </div>
      <div class="workout-progress"><span id="session-progress-bar" style="width:${progress}%"></span></div>
    </header>
    <section class="workout-list-overview">
      <header><span>Workout list</span><strong>Tap an exercise to focus</strong></header>
      ${session.logs.map((log, index) => workoutOverviewRow(log, index)).join("")}
      <button class="add-exercise-button" data-action="add-exercise" type="button"><span>＋</span><strong>Add another exercise</strong><small>Add it to this workout and keep it for next time.</small></button>
      <button class="ghost full" data-action="cancel-session" type="button">Discard workout</button>
    </section>
  `;
  attachCommonHandlers();
  startSessionClock();
}

function workoutOverviewRow(log, index) {
  const completed = countCompletedSets({ logs: [log] });
  const planned = countPlannedSets({ logs: [log] });
  const volume = calcExerciseVolume(log);
  const prevLog = latestExerciseHistoryLog(log);
  const previousVolume = prevLog ? calcExerciseVolume(prevLog) : 0;
  const delta = volume - previousVolume;
  const target = currentLogTarget(log);
  const status = !completed ? "Not started" : target ? "In progress" : "Complete";
  const dp = !target ? doubleProgressionSignal(log) : null;
  return `<button class="workout-overview-row ${!target ? "complete" : completed ? "active" : ""}" data-action="open-exercise" data-ex="${index}" type="button">
    <span class="overview-index">${String(index + 1).padStart(2, "0")}</span>
    <span class="overview-main"><strong>${escapeHtml(log.name)}</strong><small>${escapeHtml(log.muscle || "Other")} · ${completed}/${planned} sets · ${status}</small>${dp ? `<em>${escapeHtml(dp.ready ? "Ready to progress" : "Hold load")}</em>` : ""}</span>
    <span class="overview-side"><b>${volume ? kg(volume) : "—"}</b><small class="${delta >= 0 ? "positive" : "negative"}">${previousVolume ? `${delta >= 0 ? "+" : ""}${kg(delta)}` : "baseline"}</small></span>
  </button>`;
}

function isExerciseFinishedAfterThisSet(log) {
  return !currentLogTarget(log);
}

completeSet = function completeSetV155(exerciseIndex, setIndex, isDrop, button, dropIndex = null) {
  const log = state.activeSession?.logs?.[exerciseIndex];
  if (!log) return;
  commitSetInputs(exerciseIndex, setIndex, isDrop, dropIndex);
  const target = isDrop ? getDropTarget(log, setIndex, dropIndex) : log.sets?.[setIndex];
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
  updateActiveSessionSummary(exerciseIndex);
  const context = restContextAfterSet(log, exerciseIndex, setIndex, target, isDrop, dropIndex);
  if (isExerciseFinishedAfterThisSet(log)) {
    startSetCompleteOverlay(log.name, context);
    return;
  }
  const restSeconds = target.setType === "warmup" ? Math.min(90, restSecondsForExercise(state.activeSession.workoutId, exerciseIndex)) : restSecondsForExercise(state.activeSession.workoutId, exerciseIndex);
  startRestTimer(restSeconds, log.name, context);
};

const STRATA_V155_BASE_START_REST = startRestTimer;
startRestTimer = function startRestTimerV155(seconds, exerciseName, context = {}) {
  restTimer?.classList.remove("set-complete-overlay");
  if (restTimer) delete restTimer.dataset.mode;
  STRATA_V155_BASE_START_REST(seconds, exerciseName, context);
};

function startSetCompleteOverlay(exerciseName, context = {}) {
  prepareAudio();
  clearInterval(restTimerInterval);
  restTimerEndAt = 0;
  restTimer?.classList.remove("hidden");
  restTimer?.classList.add("set-complete-overlay");
  if (restTimer) restTimer.dataset.mode = "exerciseComplete";
  document.body.classList.add("rest-timer-active");
  const status = document.querySelector("#rest-timer-status");
  const time = document.querySelector("#rest-timer-time");
  const exercise = document.querySelector("#rest-timer-exercise");
  const dismiss = document.querySelector("#rest-timer-dismiss");
  if (status) status.textContent = "Exercise complete";
  if (time) time.textContent = "DONE";
  if (exercise) exercise.textContent = exerciseName;
  if (dismiss) dismiss.textContent = "Back to list";
  let details = document.querySelector("#rest-timer-details");
  if (!details) {
    details = document.createElement("div");
    details.id = "rest-timer-details";
    details.className = "rest-timer-details";
    restTimer?.querySelector(".rest-timer-copy")?.appendChild(details);
  }
  details.innerHTML = `
    ${context.last ? `<div class="rest-last"><span>Last set</span><strong>${escapeHtml(context.last)}</strong></div>` : ""}
    <div class="rest-next"><span>Next</span><strong>No rest timer needed. Rate the final set, then return to the workout list.</strong></div>
    ${context.isWarmup ? "" : restEffortMarkup(context)}
  `;
  details.querySelectorAll("[data-rest-effort]").forEach((button) => button.addEventListener("click", () => {
    setEffort(Number(button.dataset.ex), button.dataset.set !== undefined ? Number(button.dataset.set) : null, button.dataset.scale, button.dataset.value, button.dataset.drop === "true", button, button.dataset.dropIndex !== undefined ? Number(button.dataset.dropIndex) : null);
    details.querySelectorAll("[data-rest-effort]").forEach((chip) => chip.classList.toggle("selected", chip === button));
  }));
  try { navigator.vibrate?.(40); } catch {}
}

const STRATA_V155_BASE_DISMISS_REST = dismissRestTimer;
dismissRestTimer = function dismissRestTimerV155() {
  const completeMode = restTimer?.dataset?.mode === "exerciseComplete";
  STRATA_V155_BASE_DISMISS_REST();
  restTimer?.classList.remove("set-complete-overlay");
  if (restTimer) delete restTimer.dataset.mode;
  if (completeMode && state.activeSession) {
    state.activeSession.focusMode = "overview";
    saveState();
    if (route === "training") renderActiveSession();
  }
};

function formatDurationCompact(startedAt, completedAt) {
  const minutes = Math.max(1, Math.round((new Date(completedAt) - new Date(startedAt)) / 60000));
  if (minutes < 60) return { value: String(minutes), label: "minutes" };
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return { value: `${h}h ${m ? `${m}m` : ""}`.trim(), label: "duration" };
}

function completedWorkSetsText(log) {
  const sets = workingSetsForProgression(log).filter((set) => set.setType !== "drop");
  return sets.length ? sets.map((set) => `${set.weight || "—"}×${set.reps || "—"}${setRpeValue(set) ? ` @${setRpeValue(set).toFixed(0)}` : ""}`).join(" / ") : "No work sets";
}

function bestSetText(log) {
  const best = bestSetForLog(log)?.set;
  if (!best) return "—";
  return `${best.weight || "—"}×${best.reps || "—"}${setRpeValue(best) ? ` @RPE ${setRpeValue(best).toFixed(0)}` : ""}`;
}

function exercisePbBadges(log, session) {
  const currentVolume = calcExerciseVolume(log);
  const currentBest = bestSetForLog(log);
  const currentBestLoad = currentBest ? adjustedSetLoad(currentBest.set, log) : 0;
  const currentBestScore = currentBest ? setPerformanceScore(currentBest.set, log) : 0;
  const prior = exerciseHistoryEntries(log).filter(({ session: item }) => item.id !== session.id && String(item.completedAt || "") < String(session.completedAt || ""));
  if (!prior.length) return ["Baseline"];
  const priorBestVolume = Math.max(0, ...prior.map(({ log: priorLog }) => calcExerciseVolume(priorLog)));
  const priorBestLoad = Math.max(0, ...prior.map(({ log: priorLog }) => bestSetForLog(priorLog)).filter(Boolean).map((best) => adjustedSetLoad(best.set, best.log)));
  const priorBestScore = Math.max(0, ...prior.map(({ log: priorLog }) => bestSetForLog(priorLog)).filter(Boolean).map((best) => setPerformanceScore(best.set, best.log)));
  const badges = [];
  if (currentVolume > priorBestVolume) badges.push("Volume PB");
  if (currentBestLoad > priorBestLoad) badges.push("Load PB");
  if (currentBestScore > priorBestScore) badges.push("Best-set PB");
  return badges.length ? badges : [];
}

function muscleSessionVerdict(item) {
  if (!item.sets) return "No hard sets recorded.";
  if (item.avgRpe === null) return "Effort missing — log RPE to make this useful.";
  if (item.sets <= 2 && item.avgRpe >= 9) return "Low set count, but very hard effort. Meaningful stimulus.";
  if (item.sets <= 2) return "Low set count. Useful exposure, but probably not the main muscle today.";
  if (item.sets >= 3 && item.avgRpe >= 8.5) return "Strong working stimulus. Volume and effort both count.";
  if (item.sets >= 4 && item.avgRpe < 8) return "Good volume, but effort was moderate. Check whether sets were hard enough.";
  return "Useful stimulus recorded.";
}

function muscleBarWidth(item, maxSets) {
  return Math.max(16, Math.min(100, Math.round((item.sets / Math.max(1, maxSets)) * 100)));
}

renderWorkoutComplete = function renderWorkoutCompleteV155(session) {
  const workout = PROGRAM[session.workoutId];
  const volume = calcSessionVolume(session);
  const delta = volume - (session.previousVolume || 0);
  const duration = formatDurationCompact(session.startedAt, session.completedAt);
  const averageRpe = sessionAverageRpe(session);
  const muscles = sessionMuscleStimulusSummary(session);
  const maxMuscleSets = Math.max(1, ...muscles.map((item) => item.sets || 0));
  const actions = gymDoorActions(session);
  const exerciseRows = session.logs.map((log) => {
    const previousLog = exerciseHistoryEntries(log).find(({ session: item }) => item.id !== session.id && String(item.completedAt || "") < session.completedAt)?.log || null;
    const result = matchedProgress(log, previousLog);
    const volumeDelta = exerciseVolumeDeltaText(log, previousLog);
    const dp = doubleProgressionSignal(log);
    const badges = exercisePbBadges(log, session);
    return { log, previousLog, result, volumeDelta, dp, badges };
  });
  document.body.classList.remove("workout-mode");
  stopSessionClock();
  pageTitle.textContent = "Workout Complete";
  view.innerHTML = `
    <section class="completion-hero gym-door-hero v155-report-hero">
      <span>GYM-DOOR REPORT</span>
      <h2>${escapeHtml(workout?.title || session.workoutId)}</h2>
      <div class="completion-primary"><strong>${escapeHtml(duration.value)}</strong><small>${escapeHtml(duration.label)}</small></div>
      <div class="completion-strip completion-strip-advanced">
        <div><strong>${countHardSets(session)}</strong><span>hard sets</span></div>
        <div><strong>${kg(volume)}</strong><span>kg volume</span></div>
        <div><strong>${delta >= 0 ? "+" : ""}${kg(delta)}</strong><span>vs last</span></div>
        <div><strong>${averageRpe !== null ? averageRpe.toFixed(1) : "—"}</strong><span>avg RPE</span></div>
      </div>
    </section>

    <section class="gym-door-actions next-actions-v155">
      <header><span>Next time</span><strong>Action list for the next repeat session</strong></header>
      ${actions.map((item) => `<article class="gym-action ${escapeHtml(item.tone)}"><h3>${escapeHtml(item.name)}</h3><strong>${escapeHtml(item.action)}</strong><p>${escapeHtml(item.detail)}</p></article>`).join("")}
    </section>

    <section class="completion-exercises gym-door-exercises exercise-report-v155">
      <header><span>Exercise report</span><strong>Volume, PBs and progression per exercise</strong></header>
      ${exerciseRows.map(({ log, previousLog, result, volumeDelta, dp, badges }) => `<article class="completion-exercise-v155 ${escapeHtml(result.tone)} ${dp.ready ? "ready-progress" : ""}">
        <div class="exercise-report-top"><div><h3>${escapeHtml(log.name)}</h3><p>${escapeHtml(result.label)}</p></div><strong>${escapeHtml(volumeDelta.text)}</strong></div>
        <div class="exercise-report-sets"><div><span>Today</span><b>${escapeHtml(completedWorkSetsText(log))}</b></div><div><span>Previous</span><b>${escapeHtml(previousLog ? completedWorkSetsText(previousLog) : "Baseline")}</b></div><div><span>Best set</span><b>${escapeHtml(bestSetText(log))}</b></div></div>
        <div class="pb-badge-row">${badges.map((badge) => `<span>${escapeHtml(badge)}</span>`).join("") || `<span class="muted-badge">No PB</span>`}</div>
        <div class="progression-callout ${dp.ready ? "ready" : "hold"}"><strong>${escapeHtml(dp.label)}</strong><span>${escapeHtml(dp.detail)}</span></div>
      </article>`).join("")}
    </section>

    <section class="muscle-read-v155">
      <header><span>Muscles worked</span><strong>Sets, effort and rep focus — no fluff</strong></header>
      ${muscles.map((item) => `<article class="muscle-read-row ${escapeHtml(item.intensityTone)}">
        <div class="muscle-read-head"><div><h3>${escapeHtml(item.muscle)}</h3><p>${item.sets} hard set${item.sets === 1 ? "" : "s"} · ${escapeHtml(item.primaryRange)} focus</p></div><strong>${item.avgRpe !== null ? `RPE ${item.avgRpe.toFixed(1)}` : "RPE —"}</strong></div>
        <div class="muscle-read-bar"><span style="width:${muscleBarWidth(item, maxMuscleSets)}%"></span></div>
        <div class="muscle-read-meta"><span>${escapeHtml(item.volumeLabel)}</span><span>${escapeHtml(item.intensity)} effort</span><span>${item.avgReps !== null ? `${item.avgReps.toFixed(1)} avg reps` : "reps logged"}</span></div>
        <p>${escapeHtml(muscleSessionVerdict(item))}</p>
      </article>`).join("") || `<p class="muted">No hard-set muscle stimulus recorded.</p>`}
    </section>

    <button class="primary full" data-route-jump="today" type="button">Return to Today</button>
  `;
  view.querySelector("[data-route-jump]")?.addEventListener("click", () => setRoute("today"));
};



/* =========================================================
   STRATA v1.5.6 — Workout on the fly + multiple sessions per day
   Scope: gym-door only. Adds a blank session path without touching Body/Physique.
   ========================================================= */

const STRATA_V156_BASE_START_WORKOUT = startWorkout;
startWorkout = function startWorkoutV156(workoutId) {
  if (workoutId !== "adhoc") return STRATA_V156_BASE_START_WORKOUT(workoutId);
  if (state.activeSession && !confirm("A workout is already in progress. Discard it and start a new on-the-fly workout?")) return;
  const now = new Date();
  const defaultName = `On-the-fly ${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  const customTitle = (prompt("Name this workout", defaultName) || defaultName).trim();
  state.activeSession = {
    id: uid(),
    workoutId: "adhoc",
    workoutTitle: customTitle || "Workout on the fly",
    date: todayISO(),
    startedAt: new Date().toISOString(),
    activeExerciseIndex: 0,
    focusMode: "overview",
    bodyweight: Number(getWeightForDate(todayISO())?.weight || getLatestWeight()?.weight || 0),
    isAdhoc: true,
    logs: [],
    notes: ""
  };
  saveState();
  setRoute("training");
};

const STRATA_V156_BASE_PREVIOUS_SESSION = previousSession;
previousSession = function previousSessionV156(workoutId, excludeId = null) {
  if (workoutId === "adhoc") return null;
  return STRATA_V156_BASE_PREVIOUS_SESSION(workoutId, excludeId);
};

function sessionTitle(session) {
  if (!session) return "Workout";
  return session.workoutTitle || PROGRAM[session.workoutId]?.title || session.workoutId || "Workout";
}

const STRATA_V156_BASE_RENDER_WORKOUT_OVERVIEW = renderWorkoutOverview;
renderWorkoutOverview = function renderWorkoutOverviewV156(session) {
  STRATA_V156_BASE_RENDER_WORKOUT_OVERVIEW(session);
  const title = sessionTitle(session);
  pageTitle.textContent = title;
  const titleEl = view.querySelector(".workout-title-block strong");
  if (titleEl) titleEl.textContent = title;
  const listHeader = view.querySelector(".workout-list-overview header strong");
  if (listHeader && session.workoutId === "adhoc") listHeader.textContent = "Add an exercise to begin";
};

const STRATA_V156_BASE_RENDER_ACTIVE_SESSION = renderActiveSession;
renderActiveSession = function renderActiveSessionV156() {
  STRATA_V156_BASE_RENDER_ACTIVE_SESSION();
  if (!state.activeSession) return;
  const title = sessionTitle(state.activeSession);
  pageTitle.textContent = title;
  const titleEl = view.querySelector(".workout-title-block strong");
  if (titleEl) titleEl.textContent = title;
};

const STRATA_V156_BASE_RENDER_WORKOUT_COMPLETE = renderWorkoutComplete;
renderWorkoutComplete = function renderWorkoutCompleteV156(session) {
  STRATA_V156_BASE_RENDER_WORKOUT_COMPLETE(session);
  const h2 = view.querySelector(".completion-hero h2, .gym-door-hero h2");
  if (h2) h2.textContent = sessionTitle(session);
};




/* =========================================================
   STRATA v1.5.11 — Separate Mobile/Desktop Pages
   Scope: no new features. Splits mobile execution and desktop planning into
   separate entry pages while preserving the frozen v1.5.10 functionality.
   ========================================================= */

ROUTE_TITLES.builder = "Desktop Builder";

function shellHomeLinkMarkup() {
  return IS_DESKTOP_PAGE
    ? `<a class="ghost small shell-link" href="index.html">Open mobile app</a>`
    : `<a class="ghost small shell-link" href="desktop.html">Open desktop builder</a>`;
}

function installShellLinks() {
  const topbar = document.querySelector(".topbar");
  if (!topbar || topbar.querySelector(".shell-link")) return;
  topbar.insertAdjacentHTML("beforeend", shellHomeLinkMarkup());
}

const STRATA_V1511_BASE_RENDER_CARDIO = renderCardio;
renderCardio = function renderCardioV1511() {
  STRATA_V1511_BASE_RENDER_CARDIO();
  if (IS_MOBILE_PAGE) {
    view.querySelectorAll(".desktop-cardio-builder, .cardio-prescriptions-panel").forEach((el) => el.remove());
  }
  if (IS_DESKTOP_PAGE) {
    pageTitle.textContent = "Desktop Cardio Planner";
    view.querySelectorAll(".cardio-log-card, .cardio-history-panel").forEach((el) => el.remove());
  }
};

const STRATA_V1511_BASE_RENDER_BUILDER = renderBuilder;
renderBuilder = function renderBuilderV1511() {
  STRATA_V1511_BASE_RENDER_BUILDER();
  if (IS_DESKTOP_PAGE) {
    const hero = view.querySelector(".builder-hero-v159");
    if (hero && !hero.querySelector(".desktop-builder-page-actions")) {
      hero.insertAdjacentHTML("beforeend", `<div class="desktop-builder-page-actions"><a class="secondary small" href="index.html">Open mobile app</a><button class="ghost small" data-route-jump="cardio" type="button">Cardio planner</button></div>`);
      hero.querySelector("[data-route-jump='cardio']")?.addEventListener("click", () => setRoute("cardio"));
    }
  }
};

const STRATA_V1511_BASE_RENDER_ACCOUNT = renderAccount;
renderAccount = function renderAccountV1511() {
  STRATA_V1511_BASE_RENDER_ACCOUNT();
  if (IS_MOBILE_PAGE) {
    const firstCard = view.querySelector(".account-hero, .card");
    const card = document.createElement("section");
    card.className = "card desktop-separation-note";
    card.innerHTML = `<p class="label">Desktop page</p><h3>Builder is separate now</h3><p class="muted">Mobile is for training, cardio logging and sync. Programme building opens on its own desktop page.</p><a class="secondary full" href="desktop.html">Open desktop builder</a>`;
    if (firstCard) firstCard.insertAdjacentElement("afterend", card);
    else view.appendChild(card);
  }
};

const STRATA_V1511_BASE_INITIALIZE_APP = initializeApp;
initializeApp = async function initializeAppV1511() {
  installShellLinks();
  await STRATA_V1511_BASE_INITIALIZE_APP();
  document.body.classList.toggle("desktop-shell", IS_DESKTOP_PAGE);
  document.body.classList.toggle("mobile-shell", IS_MOBILE_PAGE);
};

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
  await refreshSupabaseUser();
  render();
  if (supabaseUser) bootstrapCloudSync({ reason: "auto" }).then(() => render()).catch(() => {});
}

if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});

initializeApp();


/* =========================================================
   STRATA v1.5.7 — Visual-first past-workout redesign
   Scope: redesign workout complete / past-workout readout with brighter colours,
   compact summary, body-map hybrid and more glanceable exercise cards.
   ========================================================= */

function reportHeatToneFromRpe(avgRpe) {
  if (!Number.isFinite(avgRpe)) return "missing";
  if (avgRpe < 7) return "blue";
  if (avgRpe < 8) return "green";
  if (avgRpe < 8.75) return "yellow";
  if (avgRpe < 9.25) return "orange";
  return "red";
}

function reportIntensityText(avgRpe) {
  if (!Number.isFinite(avgRpe)) return "Effort missing";
  if (avgRpe < 7) return "Light";
  if (avgRpe < 8) return "Moderate";
  if (avgRpe < 8.75) return "Hard";
  if (avgRpe < 9.25) return "Very hard";
  return "Near limit";
}

function volumeBandText(sets) {
  if (!sets) return "No work";
  if (sets <= 2) return "Low volume";
  if (sets <= 4) return "Moderate volume";
  if (sets <= 6) return "Solid volume";
  return "High volume";
}

function muscleSignalChip(item) {
  if (!item.sets) return "No signal";
  if (item.avgRpe === null) return "Log effort";
  if (item.sets <= 2 && item.avgRpe >= 9) return "High effort";
  if (item.sets >= 4 && item.avgRpe >= 8.5) return "Balanced";
  if (item.sets >= 4 && item.avgRpe < 8) return "Volume-led";
  if (item.avgRpe >= 9) return "Very hard";
  return "Solid";
}

function compactSetTrack(log) {
  const sets = workingSetsForProgression(log).filter((set) => set.setType !== "drop");
  return sets.length ? sets.map((set) => `${set.weight || "—"}×${set.reps || "—"}`).join(" / ") : "No work sets";
}

function exerciseStatusMeta(result) {
  if (result.tone === "positive") return { icon: "⬆", label: "Progressed", className: "positive" };
  if (result.tone === "negative") return { icon: "⬇", label: "Below last", className: "negative" };
  return { icon: "—", label: result.label.includes("First") ? "Baseline" : "Held", className: "neutral" };
}

function pbCountForRows(rows) {
  return rows.reduce((sum, row) => sum + row.badges.filter((badge) => badge !== "Baseline").length, 0);
}

function topEffortMuscle(muscles) {
  return [...muscles].sort((a, b) => (b.avgRpe || 0) - (a.avgRpe || 0) || b.sets - a.sets)[0] || null;
}

function sessionTakeaways(session, rows, muscles) {
  const pbCount = pbCountForRows(rows);
  const progressed = rows.filter((row) => row.result.tone === "positive").length;
  const ready = rows.filter((row) => row.dp.ready).length;
  const hardMuscle = topEffortMuscle(muscles);
  const notes = [
    { icon: "★", label: `${pbCount} PB${pbCount === 1 ? "" : "s"}`, tone: pbCount ? "gold" : "neutral" },
    { icon: "⬆", label: `${progressed} progressed`, tone: progressed ? "green" : "neutral" },
    { icon: "🎯", label: `${ready} ready to load`, tone: ready ? "blue" : "neutral" },
    { icon: "🔥", label: hardMuscle ? `${hardMuscle.muscle} highest effort` : "No effort signal", tone: hardMuscle ? reportHeatToneFromRpe(hardMuscle.avgRpe) : "neutral" }
  ];
  return notes;
}

const BODY_MAP_ZONE_RULES = {
  "Chest": ["chest"],
  "Back": ["upper-back", "lats"],
  "Shoulders": ["front-delts", "rear-delts"],
  "Side delts": ["front-delts", "rear-delts"],
  "Biceps": ["biceps"],
  "Triceps": ["triceps"],
  "Quads": ["quads"],
  "Hamstrings": ["hamstrings"],
  "Glutes": ["glutes"],
  "Glutes / legs": ["quads", "glutes"],
  "Calves": ["calves"],
  "Posterior chain": ["upper-back", "glutes", "hamstrings", "calves"]
};

function bodyMapHeat(muscles) {
  const map = new Map();
  muscles.forEach((item) => {
    const tone = reportHeatToneFromRpe(item.avgRpe);
    const score = Number(item.avgRpe || 0) * 10 + item.sets;
    const zones = BODY_MAP_ZONE_RULES[item.muscle] || [];
    zones.forEach((zone) => {
      const current = map.get(zone);
      if (!current || score > current.score) map.set(zone, { tone, score, muscle: item.muscle });
    });
  });
  return map;
}

function renderBodyFigure(face, heatMap) {
  const zone = (name, label='') => {
    const hit = heatMap.get(name);
    return `<span class="body-zone zone-${name} ${hit ? `heat-${hit.tone}` : "heat-none"}" title="${escapeHtml(label || hit?.muscle || name)}"></span>`;
  };
  return `<div class="body-figure ${face}">
    <div class="body-head"></div>
    <div class="body-torso">
      ${face === "front" ? zone("front-delts", "Shoulders") : zone("rear-delts", "Shoulders")}
      ${face === "front" ? zone("chest", "Chest") : zone("upper-back", "Back")}
      ${face === "front" ? zone("biceps", "Biceps") : zone("triceps", "Triceps")}
      ${face === "front" ? zone("quads", "Quads") : zone("glutes", "Glutes")}
      ${face === "front" ? "" : zone("lats", "Back")}
      ${face === "front" ? "" : zone("hamstrings", "Hamstrings")}
      ${zone("calves", "Calves")}
    </div>
    <span class="body-caption">${face}</span>
  </div>`;
}

function renderStimulusHybrid(muscles) {
  const heatMap = bodyMapHeat(muscles);
  const maxSets = Math.max(1, ...muscles.map((item) => item.sets || 0));
  return `<section class="past-stimulus-v157">
    <header><span>Stimulus map</span><strong>Glance first. Read second.</strong></header>
    <div class="stimulus-hybrid-v157">
      <div class="body-map-board">
        <div class="body-map-board-head"><b>Body map</b><small>Colour = effort · Bar = volume</small></div>
        <div class="body-map-figures">${renderBodyFigure("front", heatMap)}${renderBodyFigure("back", heatMap)}</div>
        <div class="body-map-legend">
          <span class="heat-blue">Blue</span>
          <span class="heat-green">Green</span>
          <span class="heat-yellow">Yellow</span>
          <span class="heat-orange">Orange</span>
          <span class="heat-red">Red</span>
        </div>
      </div>
      <div class="muscle-glance-list">
        ${muscles.map((item) => {
          const heat = reportHeatToneFromRpe(item.avgRpe);
          const width = Math.max(18, Math.round((item.sets / maxSets) * 100));
          return `<article class="muscle-glance-card heat-${escapeHtml(heat)}">
            <div class="muscle-glance-top"><h3>${escapeHtml(item.muscle)}</h3><div class="muscle-chip-row"><span class="mini-chip neutral">${item.sets} set${item.sets === 1 ? "" : "s"}</span><span class="mini-chip heat-${escapeHtml(heat)}">${escapeHtml(reportIntensityText(item.avgRpe))}</span></div></div>
            <div class="glance-bar"><span class="heat-${escapeHtml(heat)}" style="width:${width}%"></span></div>
            <div class="muscle-glance-meta"><span>${escapeHtml(item.primaryRange)} focus</span><span>${item.avgRpe !== null ? `RPE ${item.avgRpe.toFixed(1)}` : "RPE —"}</span><span>${escapeHtml(volumeBandText(item.sets))}</span></div>
            <div class="muscle-glance-signal"><i class="signal-dot heat-${escapeHtml(heat)}"></i><strong>${escapeHtml(muscleSignalChip(item))}</strong></div>
          </article>`;
        }).join("") || `<p class="muted">No hard-set muscle stimulus recorded.</p>`}
      </div>
    </div>
  </section>`;
}

function renderExerciseCardsV157(rows) {
  return `<section class="exercise-report-v157">
    <header><span>Exercise report</span><strong>Volume, PBs and next-time actions</strong></header>
    <div class="exercise-card-stack">${rows.map(({ log, previousLog, result, volumeDelta, dp, badges }) => {
      const stateMeta = exerciseStatusMeta(result);
      const pbBadges = badges.filter((badge) => badge !== "Baseline");
      return `<article class="exercise-card-v157 state-${escapeHtml(stateMeta.className)} ${dp.ready ? "ready" : ""}">
        <div class="exercise-card-topline">
          <div>
            <div class="exercise-name-line"><span class="status-badge ${escapeHtml(stateMeta.className)}">${escapeHtml(stateMeta.icon)} ${escapeHtml(stateMeta.label)}</span><h3>${escapeHtml(log.name)}</h3></div>
            <p>${escapeHtml(log.muscle || "Other")}</p>
          </div>
          <span class="volume-delta-pill ${volumeDelta.delta >= 0 ? "positive" : "negative"}">${escapeHtml(volumeDelta.text)}</span>
        </div>
        <div class="exercise-snapshot-grid">
          <div><span>Today</span><strong>${escapeHtml(compactSetTrack(log))}</strong></div>
          <div><span>Last</span><strong>${escapeHtml(previousLog ? compactSetTrack(previousLog) : "Baseline")}</strong></div>
          <div><span>Best set</span><strong>${escapeHtml(bestSetText(log))}</strong></div>
        </div>
        <div class="exercise-card-footer">
          <div class="badge-cluster">${pbBadges.map((badge) => `<span class="mini-chip gold">★ ${escapeHtml(badge)}</span>`).join("") || `<span class="mini-chip neutral">Baseline</span>`}</div>
          <span class="action-pill ${dp.ready ? "ready" : "hold"}">🎯 ${escapeHtml(dp.ready ? "Increase load next time" : dp.label)}</span>
        </div>
      </article>`;
    }).join("")}</div>
  </section>`;
}

const STRATA_V157_BASE_RENDER_WORKOUT_COMPLETE = renderWorkoutComplete;
renderWorkoutComplete = function renderWorkoutCompleteV157(session) {
  const workout = PROGRAM[session.workoutId];
  const volume = calcSessionVolume(session);
  const delta = volume - (session.previousVolume || 0);
  const duration = formatDurationCompact(session.startedAt, session.completedAt);
  const averageRpe = sessionAverageRpe(session);
  const muscles = sessionMuscleStimulusSummary(session).map((item) => ({
    ...item,
    intensity: reportIntensityText(item.avgRpe),
    intensityTone: reportHeatToneFromRpe(item.avgRpe)
  }));
  const exerciseRows = session.logs.map((log) => {
    const previousLog = exerciseHistoryEntries(log).find(({ session: item }) => item.id !== session.id && String(item.completedAt || "") < session.completedAt)?.log || null;
    const result = matchedProgress(log, previousLog);
    const volumeDelta = exerciseVolumeDeltaText(log, previousLog);
    const dp = doubleProgressionSignal(log);
    const badges = exercisePbBadges(log, session);
    return { log, previousLog, result, volumeDelta, dp, badges };
  });
  const takeaways = sessionTakeaways(session, exerciseRows, muscles);
  document.body.classList.remove("workout-mode");
  stopSessionClock();
  pageTitle.textContent = "Workout Complete";
  view.innerHTML = `
    <section class="completion-hero gym-door-hero v157-hero">
      <div class="report-kicker-row"><span>Past workout</span><strong>${escapeHtml(niceDate(session.date))}</strong></div>
      <h2>${escapeHtml(sessionTitle(session))}</h2>
      <div class="summary-strip-v157">
        <article><small>⏱ Time</small><strong>${escapeHtml(duration.value)}</strong></article>
        <article><small>🏋 Hard sets</small><strong>${countHardSets(session)}</strong></article>
        <article><small>⬆ Volume</small><strong>${delta >= 0 ? "+" : ""}${kg(delta)} kg</strong></article>
        <article><small>★ PBs</small><strong>${pbCountForRows(exerciseRows)}</strong></article>
      </div>
      <div class="takeaway-row-v157">
        ${takeaways.map((item) => `<span class="takeaway-pill ${escapeHtml(item.tone)}">${escapeHtml(item.icon)} ${escapeHtml(item.label)}</span>`).join("")}
      </div>
      <div class="micro-summary-v157"><span>${kg(volume)} kg total volume</span><span>${averageRpe !== null ? `RPE ${averageRpe.toFixed(1)} avg effort` : "No average effort yet"}</span></div>
    </section>
    ${renderStimulusHybrid(muscles)}
    ${renderExerciseCardsV157(exerciseRows)}
    <section class="next-actions-v157">
      <header><span>Next time</span><strong>Action list for the next repeat session</strong></header>
      <div class="takeaway-grid-v157">${exerciseRows.map((row) => `<article class="mini-action-card ${row.dp.ready ? "ready" : "hold"}"><h3>${escapeHtml(row.log.name)}</h3><p>${escapeHtml(row.dp.ready ? "Increase load next time" : row.dp.label)}</p></article>`).join("")}</div>
    </section>
    <button class="primary full" data-route-jump="today" type="button">Return to Today</button>
  `;
  attachCommonHandlers();
  view.querySelector("[data-route-jump]")?.addEventListener("click", () => setRoute("today"));
};

/* =========================================================
   STRATA v1.5.8 — Cardio module outside workout logging
   Scope: separate cardio section for mobile execution and desktop planning.
   ========================================================= */

ROUTE_TITLES.cardio = "Cardio";

const DEFAULT_CARDIO_TEMPLATES = [
  {
    id: "incline-treadmill-zone-2",
    title: "Incline Treadmill Zone 2",
    modality: "Treadmill",
    duration: 30,
    targetHr: "120–140 bpm",
    intensity: "Zone 2 / conversational",
    incline: "8–12%",
    speed: "Fast walk",
    phase: "Cut / maintenance",
    instructions: "Steady pace. Keep breathing controlled. Adjust speed before forcing the incline higher."
  },
  {
    id: "post-lift-bike-easy",
    title: "Post-Lift Easy Bike",
    modality: "Bike",
    duration: 20,
    targetHr: "115–135 bpm",
    intensity: "Easy aerobic",
    incline: "—",
    speed: "Comfortable cadence",
    phase: "Any phase",
    instructions: "Keep legs moving. This should not interfere with recovery from lifting."
  },
  {
    id: "stairmaster-moderate",
    title: "StairMaster Moderate",
    modality: "StairMaster",
    duration: 20,
    targetHr: "130–150 bpm",
    intensity: "Moderate / controlled",
    incline: "Level 5–8",
    speed: "No handrail leaning",
    phase: "Cut",
    instructions: "Stay tall. Use the rails lightly only for balance. Stop if form collapses."
  },
  {
    id: "cut-phase-treadmill",
    title: "Cut Phase Treadmill",
    modality: "Treadmill",
    duration: 40,
    targetHr: "120–140 bpm",
    intensity: "Low impact steady state",
    incline: "4–8%",
    speed: "Brisk walk",
    phase: "Cut",
    instructions: "Accumulate time without turning it into a second leg workout. Keep it repeatable."
  },
  {
    id: "peak-week-light-walk",
    title: "Peak Week Light Walk",
    modality: "Walk / treadmill",
    duration: 20,
    targetHr: "110–125 bpm",
    intensity: "Light movement",
    incline: "0–4%",
    speed: "Easy walk",
    phase: "Peak week",
    instructions: "Light movement only. This is for routine and recovery, not hard conditioning."
  }
];

function ensureCardioState() {
  state.cardio = state.cardio || {};
  state.cardio.sessions = Array.isArray(state.cardio.sessions) ? state.cardio.sessions : [];
  state.cardio.prescriptions = Array.isArray(state.cardio.prescriptions) ? state.cardio.prescriptions : [];
  state.cardio.templates = Array.isArray(state.cardio.templates) && state.cardio.templates.length ? state.cardio.templates : DEFAULT_CARDIO_TEMPLATES.map((item) => ({ ...item }));
  return state.cardio;
}

ensureCardioState();

const STRATA_V158_BASE_NORMALIZE = normalizeExistingData;
normalizeExistingData = function normalizeExistingDataV158() {
  STRATA_V158_BASE_NORMALIZE();
  ensureCardioState();
};

const STRATA_V158_BASE_MERGE_CLOUD = mergeCloudState;
mergeCloudState = function mergeCloudStateV158(incoming) {
  STRATA_V158_BASE_MERGE_CLOUD(incoming);
  ensureCardioState();
  const incomingCardio = incoming?.cardio || {};
  const sessionMap = new Map((state.cardio.sessions || []).map((item) => [item.id, item]));
  (incomingCardio.sessions || []).forEach((item) => {
    const existing = sessionMap.get(item.id);
    if (!existing || String(item.updatedAt || item.completedAt || item.createdAt || "") > String(existing.updatedAt || existing.completedAt || existing.createdAt || "")) {
      sessionMap.set(item.id, item);
    }
  });
  state.cardio.sessions = [...sessionMap.values()].sort((a, b) => String(b.completedAt || b.date || "").localeCompare(String(a.completedAt || a.date || "")));
  const prescriptionMap = new Map((state.cardio.prescriptions || []).map((item) => [item.id, item]));
  (incomingCardio.prescriptions || []).forEach((item) => {
    if (!prescriptionMap.has(item.id)) prescriptionMap.set(item.id, item);
  });
  state.cardio.prescriptions = [...prescriptionMap.values()];
  const templateMap = new Map([...(DEFAULT_CARDIO_TEMPLATES || []), ...(incomingCardio.templates || []), ...(state.cardio.templates || [])].map((item) => [item.id || item.title, item]));
  state.cardio.templates = [...templateMap.values()];
};

const STRATA_V158_BASE_CLOUD_SUMMARY = cloudBackupSummary;
cloudBackupSummary = function cloudBackupSummaryV158(safeState) {
  const summary = STRATA_V158_BASE_CLOUD_SUMMARY(safeState);
  summary.cardioSessionCount = safeState.cardio?.sessions?.length || 0;
  summary.cardioPrescriptionCount = safeState.cardio?.prescriptions?.length || 0;
  return summary;
};

function cardioSessionsSorted() {
  ensureCardioState();
  return [...state.cardio.sessions].sort((a, b) => String(b.completedAt || b.date || "").localeCompare(String(a.completedAt || a.date || "")));
}

function cardioWeekStats() {
  const start = currentWeekStartISO();
  const sessions = cardioSessionsSorted().filter((item) => String(item.date || "") >= start);
  const minutes = sessions.reduce((sum, item) => sum + Number(item.duration || 0), 0);
  const hrValues = sessions.map((item) => Number(item.avgHr || 0)).filter(Boolean);
  const avgHr = hrValues.length ? Math.round(hrValues.reduce((sum, value) => sum + value, 0) / hrValues.length) : null;
  const byModality = sessions.reduce((map, item) => {
    const key = item.modality || "Cardio";
    map[key] = (map[key] || 0) + Number(item.duration || 0);
    return map;
  }, {});
  return { sessions, minutes, avgHr, byModality };
}

function cardioTemplateById(id) {
  ensureCardioState();
  return [...state.cardio.templates, ...state.cardio.prescriptions].find((item) => item.id === id) || null;
}

function phaseChipTone(phase) {
  const text = String(phase || "").toLowerCase();
  if (text.includes("cut")) return "orange";
  if (text.includes("peak")) return "red";
  if (text.includes("bulk") || text.includes("growth")) return "green";
  return "blue";
}

function renderCardioTemplateCard(item, source = "template") {
  const tone = phaseChipTone(item.phase);
  return `<article class="cardio-template-card">
    <div class="cardio-template-head"><div><span class="takeaway-pill ${escapeHtml(tone)}">${escapeHtml(item.phase || "Any phase")}</span><h3>${escapeHtml(item.title)}</h3></div><strong>${Number(item.duration || 0) || "—"} min</strong></div>
    <div class="cardio-instruction-grid">
      <span><b>Mode</b>${escapeHtml(item.modality || "Cardio")}</span>
      <span><b>Heart rate</b>${escapeHtml(item.targetHr || "Set target")}</span>
      <span><b>Incline / level</b>${escapeHtml(item.incline || "—")}</span>
      <span><b>Speed</b>${escapeHtml(item.speed || "—")}</span>
    </div>
    <p>${escapeHtml(item.instructions || "")}</p>
    <div class="button-row"><button class="primary small" data-action="use-cardio-template" data-cardio-id="${escapeHtml(item.id)}" data-cardio-source="${escapeHtml(source)}" type="button">Use this</button><button class="ghost small" data-action="start-cardio-template" data-cardio-id="${escapeHtml(item.id)}" type="button">Quick log</button></div>
  </article>`;
}

function renderCardioSessionRow(item) {
  const hr = item.avgHr ? ` · avg ${item.avgHr} bpm` : "";
  const max = item.maxHr ? ` · max ${item.maxHr}` : "";
  const incline = item.incline ? ` · ${item.incline}` : "";
  return `<article class="cardio-session-row">
    <div><span>${escapeHtml(niceDate(item.date))}</span><h3>${escapeHtml(item.title || item.modality || "Cardio")}</h3><p>${escapeHtml(item.modality || "Cardio")} · ${Number(item.duration || 0)} min${escapeHtml(hr)}${escapeHtml(max)}${escapeHtml(incline)}</p></div>
    <div><strong>${item.rpe ? `RPE ${escapeHtml(String(item.rpe))}` : "—"}</strong><button class="ghost tiny" data-action="delete-cardio-session" data-cardio-id="${escapeHtml(item.id)}" type="button">Delete</button></div>
  </article>`;
}

function renderCardioPrescriptionRow(item) {
  const tone = phaseChipTone(item.phase);
  return `<article class="cardio-prescription-row">
    <div><span class="takeaway-pill ${escapeHtml(tone)}">${escapeHtml(item.phase || "Any phase")}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.frequency || "")}${item.frequency ? " · " : ""}${Number(item.duration || 0) || "—"} min · ${escapeHtml(item.targetHr || "HR target not set")}</p></div>
    <div class="button-row"><button class="secondary small" data-action="use-cardio-template" data-cardio-id="${escapeHtml(item.id)}" data-cardio-source="prescription" type="button">Use</button><button class="ghost small" data-action="delete-cardio-prescription" data-cardio-id="${escapeHtml(item.id)}" type="button">Remove</button></div>
  </article>`;
}

function renderCardio() {
  ensureCardioState();
  pageTitle.textContent = "Cardio";
  const week = cardioWeekStats();
  const recent = cardioSessionsSorted().slice(0, 8);
  const last = recent[0];
  view.innerHTML = `
    <section class="cardio-hero-v158">
      <div><span>OUTSIDE THE WORKOUT</span><h2>Cardio prescriptions and logs.</h2><p>Track time, heart rate and machine instructions without mixing it into lifting volume.</p></div>
      <div class="cardio-week-ring"><strong>${week.minutes}</strong><span>min this week</span></div>
    </section>

    <section class="cardio-stat-strip">
      <article><small>Sessions</small><strong>${week.sessions.length}</strong></article>
      <article><small>Avg HR</small><strong>${week.avgHr ? `${week.avgHr}` : "—"}</strong></article>
      <article><small>Last</small><strong>${last ? `${Number(last.duration || 0)}m` : "—"}</strong></article>
    </section>

    <section class="cardio-layout-v158">
      <form id="cardio-log-form" class="card cardio-log-card">
        <p class="label">Log cardio</p>
        <h3>Session details</h3>
        <div class="form-grid">
          <label class="field form-span-2"><span>Session name</span><input name="title" type="text" placeholder="e.g. Incline treadmill" autocomplete="off" /></label>
          <label class="field"><span>Date</span><input name="date" type="date" value="${todayISO()}" /></label>
          <label class="field"><span>Mode</span><select name="modality">
            <option>Treadmill</option><option>Bike</option><option>StairMaster</option><option>Outdoor walk</option><option>Elliptical</option><option>Rower</option><option>Other</option>
          </select></label>
          <label class="field"><span>Time</span><input name="duration" type="number" inputmode="numeric" min="1" max="240" placeholder="30" required /></label>
          <label class="field"><span>Avg heart rate</span><input name="avgHr" type="number" inputmode="numeric" min="40" max="230" placeholder="135" /></label>
          <label class="field"><span>Max heart rate</span><input name="maxHr" type="number" inputmode="numeric" min="40" max="240" placeholder="155" /></label>
          <label class="field"><span>RPE</span><select name="rpe"><option value="">Not logged</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option><option>9</option><option>10</option></select></label>
          <label class="field"><span>Incline / level</span><input name="incline" type="text" placeholder="8% or level 6" /></label>
          <label class="field"><span>Speed / pace</span><input name="speed" type="text" placeholder="5.5 km/h" /></label>
          <label class="field"><span>Distance</span><input name="distance" type="text" placeholder="optional" /></label>
          <label class="field form-span-2"><span>Instructions / notes</span><textarea name="instructions" rows="3" placeholder="Target HR, incline, machine level, form notes..."></textarea></label>
        </div>
        <button class="primary full" type="submit">Save cardio session</button>
      </form>

      <section class="desktop-cardio-builder card">
        <div class="section-title-row"><div><p class="label">Desktop planner</p><h3>Cardio prescription builder</h3></div><strong>Block / phase ready</strong></div>
        <form id="cardio-prescription-form" class="form-grid">
          <label class="field form-span-2"><span>Prescription name</span><input name="title" type="text" placeholder="e.g. Cut phase incline walk" required /></label>
          <label class="field"><span>Phase</span><select name="phase"><option>Bulk / growth</option><option>Cut</option><option>Maintenance</option><option>Peak week</option><option>Any phase</option></select></label>
          <label class="field"><span>Mode</span><select name="modality"><option>Treadmill</option><option>Bike</option><option>StairMaster</option><option>Outdoor walk</option><option>Elliptical</option><option>Other</option></select></label>
          <label class="field"><span>Time</span><input name="duration" type="number" min="1" max="240" placeholder="30" required /></label>
          <label class="field"><span>Frequency</span><input name="frequency" type="text" placeholder="3× / week" /></label>
          <label class="field"><span>Target HR</span><input name="targetHr" type="text" placeholder="120–140 bpm" /></label>
          <label class="field"><span>Incline / level</span><input name="incline" type="text" placeholder="8–12%" /></label>
          <label class="field"><span>Speed / pace</span><input name="speed" type="text" placeholder="fast walk" /></label>
          <label class="field form-span-2"><span>Instructions</span><textarea name="instructions" rows="3" placeholder="What the athlete should do, how hard it should feel, machine setup..."></textarea></label>
          <button class="secondary full form-span-2" type="submit">Save prescription</button>
        </form>
      </section>
    </section>

    <section class="cardio-library-v158">
      <header><span>Cardio library</span><strong>Preloaded semi-pro prescriptions</strong></header>
      <div class="cardio-template-grid">${state.cardio.templates.map((item) => renderCardioTemplateCard(item, "template")).join("")}</div>
    </section>

    <section class="card cardio-prescriptions-panel">
      <div class="section-title-row"><div><p class="label">Saved prescriptions</p><h3>Desktop-built cardio blocks</h3></div><strong>${state.cardio.prescriptions.length}</strong></div>
      <div class="cardio-list-stack">${state.cardio.prescriptions.map(renderCardioPrescriptionRow).join("") || `<p class="muted">No custom cardio prescriptions yet.</p>`}</div>
    </section>

    <section class="card cardio-history-panel">
      <div class="section-title-row"><div><p class="label">Cardio history</p><h3>Separate from lifting workouts</h3></div><strong>${state.cardio.sessions.length}</strong></div>
      <div class="cardio-list-stack">${recent.map(renderCardioSessionRow).join("") || `<p class="muted">No cardio logged yet.</p>`}</div>
    </section>
  `;
  attachCommonHandlers();
  attachCardioHandlers();
}

function fillCardioFormFrom(item) {
  const form = document.querySelector("#cardio-log-form");
  if (!form || !item) return;
  form.title.value = item.title || "";
  form.modality.value = item.modality || "Treadmill";
  form.duration.value = item.duration || "";
  form.incline.value = item.incline || "";
  form.speed.value = item.speed || "";
  form.instructions.value = [item.targetHr ? `Target HR: ${item.targetHr}` : "", item.intensity ? `Intensity: ${item.intensity}` : "", item.instructions || ""].filter(Boolean).join("\n");
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function saveCardioSession(data) {
  ensureCardioState();
  const session = {
    id: uid(),
    title: data.get("title")?.toString().trim() || data.get("modality")?.toString() || "Cardio",
    date: data.get("date")?.toString() || todayISO(),
    modality: data.get("modality")?.toString() || "Cardio",
    duration: Number(data.get("duration") || 0),
    avgHr: data.get("avgHr") ? Number(data.get("avgHr")) : null,
    maxHr: data.get("maxHr") ? Number(data.get("maxHr")) : null,
    rpe: data.get("rpe")?.toString() || "",
    incline: data.get("incline")?.toString().trim() || "",
    speed: data.get("speed")?.toString().trim() || "",
    distance: data.get("distance")?.toString().trim() || "",
    instructions: data.get("instructions")?.toString().trim() || "",
    completedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  if (!session.duration) {
    showNotice("Add cardio time before saving.", "warn");
    return;
  }
  state.cardio.sessions.push(session);
  saveState();
  queueCloudBackup({ delay: 900 });
  showNotice("Cardio session saved.", "good");
  renderCardio();
}

function saveCardioPrescription(data) {
  ensureCardioState();
  const item = {
    id: uid(),
    title: data.get("title")?.toString().trim() || "Cardio prescription",
    phase: data.get("phase")?.toString() || "Any phase",
    modality: data.get("modality")?.toString() || "Cardio",
    duration: Number(data.get("duration") || 0),
    frequency: data.get("frequency")?.toString().trim() || "",
    targetHr: data.get("targetHr")?.toString().trim() || "",
    incline: data.get("incline")?.toString().trim() || "",
    speed: data.get("speed")?.toString().trim() || "",
    instructions: data.get("instructions")?.toString().trim() || "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  if (!item.duration) {
    showNotice("Add a time target before saving the prescription.", "warn");
    return;
  }
  state.cardio.prescriptions.push(item);
  saveState();
  queueCloudBackup({ delay: 900 });
  showNotice("Cardio prescription saved.", "good");
  renderCardio();
}

function quickLogCardioFrom(item) {
  if (!item) return;
  ensureCardioState();
  state.cardio.sessions.push({
    id: uid(),
    title: item.title || item.modality || "Cardio",
    date: todayISO(),
    modality: item.modality || "Cardio",
    duration: Number(item.duration || 0),
    avgHr: null,
    maxHr: null,
    rpe: "",
    incline: item.incline || "",
    speed: item.speed || "",
    distance: "",
    instructions: [item.targetHr ? `Target HR: ${item.targetHr}` : "", item.instructions || ""].filter(Boolean).join("\n"),
    completedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    sourceId: item.id
  });
  saveState();
  queueCloudBackup({ delay: 900 });
  showNotice("Cardio quick log saved. Edit details later if needed.", "good");
  renderCardio();
}

function attachCardioHandlers() {
  const logForm = document.querySelector("#cardio-log-form");
  logForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveCardioSession(new FormData(logForm));
  });
  const prescriptionForm = document.querySelector("#cardio-prescription-form");
  prescriptionForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    saveCardioPrescription(new FormData(prescriptionForm));
  });
  view.querySelectorAll("[data-action='use-cardio-template']").forEach((button) => button.addEventListener("click", () => fillCardioFormFrom(cardioTemplateById(button.dataset.cardioId))));
  view.querySelectorAll("[data-action='start-cardio-template']").forEach((button) => button.addEventListener("click", () => quickLogCardioFrom(cardioTemplateById(button.dataset.cardioId))));
  view.querySelectorAll("[data-action='delete-cardio-session']").forEach((button) => button.addEventListener("click", () => {
    if (!confirm("Delete this cardio session?")) return;
    state.cardio.sessions = (state.cardio.sessions || []).filter((item) => item.id !== button.dataset.cardioId);
    saveState();
    queueCloudBackup({ delay: 900 });
    renderCardio();
  }));
  view.querySelectorAll("[data-action='delete-cardio-prescription']").forEach((button) => button.addEventListener("click", () => {
    if (!confirm("Remove this cardio prescription?")) return;
    state.cardio.prescriptions = (state.cardio.prescriptions || []).filter((item) => item.id !== button.dataset.cardioId);
    saveState();
    queueCloudBackup({ delay: 900 });
    renderCardio();
  }));
}

function injectCardioTodayCard() {
  if (view.querySelector("[data-cardio-today-card]")) return;
  const anchor = view.querySelector(".active-session-card") || view.firstElementChild;
  const week = cardioWeekStats();
  const card = document.createElement("section");
  card.className = "card cardio-today-card";
  card.setAttribute("data-cardio-today-card", "true");
  card.innerHTML = `<p class="label">Cardio</p><h3>Separate from workouts</h3><p class="muted">${week.minutes} minutes logged this week${week.avgHr ? ` · avg HR ${week.avgHr}` : ""}.</p><button class="secondary full" data-route-jump="cardio" type="button">Open cardio</button>`;
  if (anchor) anchor.insertAdjacentElement("afterend", card);
  else view.appendChild(card);
  card.querySelector("[data-route-jump='cardio']")?.addEventListener("click", () => setRoute("cardio"));
}

const STRATA_V158_BASE_RENDER = render;
render = function renderV158() {
  if (route === "cardio") return renderCardio();
  return STRATA_V158_BASE_RENDER();
};

const STRATA_V158_BASE_RENDER_TODAY = renderToday;
renderToday = function renderTodayV158() {
  STRATA_V158_BASE_RENDER_TODAY();
  injectCardioTodayCard();
};

// Upgrade older installed markup without requiring index.html to be refreshed first.
const oldPhysiqueNav = document.querySelector(".bottom-nav [data-route='physique']");
if (oldPhysiqueNav) {
  oldPhysiqueNav.dataset.route = "cardio";
  oldPhysiqueNav.textContent = "Cardio";
}
navButtons.splice(0, navButtons.length, ...Array.from(document.querySelectorAll(".nav-item")));
navButtons.forEach((button) => {
  if (!button.dataset.cardioNavBound) {
    button.dataset.cardioNavBound = "true";
    button.addEventListener("click", () => setRoute(button.dataset.route));
  }
});
if (route === "today") renderToday();


/* =========================================================
   STRATA v1.5.10 — Builder Alignment Pass
   Freeze rule: no new product features. The desktop builder now defines the
   lifting fields the mobile app already executes: exercises, sets/reps, warmups,
   rest, effort, progression, drops, load maths, muscle mapping and alternatives.
   ========================================================= */

ROUTE_TITLES.builder = "Builder";

function safeClone(value) {
  return JSON.parse(JSON.stringify(value || null));
}

function normalizeBuilderBlueprint(item = {}, fallbackIndex = 0) {
  const type = item.type || "isolation";
  const loadMode = item.loadMode || loadModeFromValues(item.loadLabel, item.loadMultiplier, item.repMultiplier, item.volumeMode, item.allowZeroWeight);
  const volume = loadModeConfig(loadMode);
  return {
    exerciseId: item.exerciseId || item.id || `builder-ex-${fallbackIndex}-${uid()}`,
    variantId: item.variantId || item.exerciseId || item.id || `builder-var-${fallbackIndex}-${uid()}`,
    custom: item.custom !== false,
    name: item.name || "Exercise",
    muscle: item.muscle || item.primaryMuscle || "Other",
    secondaryMuscles: item.secondaryMuscles || "",
    type,
    sets: Math.max(1, Math.min(12, Number(item.sets || item.targetSets || 3))),
    reps: item.reps || item.targetReps || "8–12",
    warmupCount: Number.isFinite(Number(item.warmupCount)) ? Math.max(0, Math.min(6, Number(item.warmupCount))) : defaultWarmupSetCount(type),
    restSeconds: Number(item.restSeconds || defaultRestSeconds(type)),
    effortTarget: item.effortTarget || "RPE 8–9",
    progressionRule: item.progressionRule || "double_progression",
    allowDropSet: Boolean(item.allowDropSet ?? item.plannedDrop ?? item.drop),
    dropPercent: Number(item.dropPercent || 25),
    loadMode,
    loadLabel: item.loadLabel || volume.loadLabel || "kg",
    loadMultiplier: Number(item.loadMultiplier || volume.loadMultiplier || 1),
    repMultiplier: Number(item.repMultiplier || volume.repMultiplier || 1),
    volumeMode: item.volumeMode || volume.volumeMode || "external",
    allowZeroWeight: Boolean(item.allowZeroWeight ?? volume.allowZeroWeight),
    cue: item.cue || item.mobileCue || "",
    setupNote: item.setupNote || "",
    alternatives: Array.isArray(item.alternatives) ? item.alternatives.join(", ") : (item.alternatives || "")
  };
}

function builderWorkoutIds() {
  return Object.keys(PROGRAM).filter((id) => id !== "adhoc");
}

function ensureBuilderState() {
  state.builder = state.builder || {};
  state.builder.selectedWorkoutId = state.builder.selectedWorkoutId || "upper";
  state.builder.draftLayouts = state.builder.draftLayouts || {};
  builderWorkoutIds().forEach((workoutId) => {
    if (!Array.isArray(state.builder.draftLayouts[workoutId]) || !state.builder.draftLayouts[workoutId].length) {
      state.builder.draftLayouts[workoutId] = getWorkoutBlueprints(workoutId).map(normalizeBuilderBlueprint);
    } else {
      state.builder.draftLayouts[workoutId] = state.builder.draftLayouts[workoutId].map(normalizeBuilderBlueprint);
    }
  });
  return state.builder;
}

function builderSelectedWorkout() {
  const builder = ensureBuilderState();
  if (!builder.draftLayouts[builder.selectedWorkoutId]) builder.selectedWorkoutId = builderWorkoutIds()[0] || "upper";
  return builder.selectedWorkoutId;
}

function builderDraftRows(workoutId = builderSelectedWorkout()) {
  const builder = ensureBuilderState();
  builder.draftLayouts[workoutId] = (builder.draftLayouts[workoutId] || []).map(normalizeBuilderBlueprint);
  return builder.draftLayouts[workoutId];
}

function builderWorkoutTitle(workoutId) {
  return PROGRAM[workoutId]?.title || workoutId;
}

function totalBuilderHardSets(rows) {
  return (rows || []).reduce((sum, row) => sum + Number(row.sets || 0), 0);
}

function builderMuscleSummary(rows) {
  const map = new Map();
  (rows || []).forEach((row) => map.set(row.muscle || "Other", (map.get(row.muscle || "Other") || 0) + Number(row.sets || 0)));
  return [...map.entries()].sort((a, b) => b[1] - a[1]).map(([muscle, sets]) => `${muscle}: ${sets}`).join(" · ") || "No exercises";
}

function renderBuilderWorkoutTabs(selected) {
  return builderWorkoutIds().map((workoutId) => {
    const rows = builderDraftRows(workoutId);
    return `<button class="builder-tab ${workoutId === selected ? "active" : ""}" data-action="builder-select-workout" data-workout-id="${escapeHtml(workoutId)}" type="button"><strong>${escapeHtml(builderWorkoutTitle(workoutId))}</strong><span>${rows.length} exercises · ${totalBuilderHardSets(rows)} sets</span></button>`;
  }).join("");
}

function builderLoadModeOptions(value) {
  const options = [
    ["total", "Total load"],
    ["pair", "Per hand / paired"],
    ["perLeg", "Reps per leg"],
    ["external", "External load only"],
    ["bodyweightAdded", "Bodyweight + added load"]
  ];
  return options.map(([id, label]) => `<option value="${id}" ${id === value ? "selected" : ""}>${label}</option>`).join("");
}

function builderTypeOptions(value) {
  return ["compound", "machine", "isolation", "unilateral", "hinge", "accessory", "strength"].map((id) => `<option value="${id}" ${id === value ? "selected" : ""}>${id}</option>`).join("");
}

function builderProgressionOptions(value) {
  const options = [
    ["double_progression", "Double progression"],
    ["rep_progression", "Rep progression"],
    ["load_progression", "Load progression"],
    ["maintain", "Maintain"],
    ["custom", "Custom note"]
  ];
  return options.map(([id, label]) => `<option value="${id}" ${id === value ? "selected" : ""}>${label}</option>`).join("");
}

function renderBuilderExerciseRow(row, index) {
  return `<article class="builder-exercise-row" data-builder-row="${index}">
    <div class="builder-row-head">
      <span class="overview-index">${String(index + 1).padStart(2, "0")}</span>
      <div><h3>${escapeHtml(row.name)}</h3><p>${escapeHtml(row.muscle)} · ${row.sets}×${escapeHtml(row.reps)} · ${row.restSeconds}s rest</p></div>
      <div class="builder-row-actions">
        <button class="ghost tiny" data-action="builder-move" data-index="${index}" data-dir="-1" type="button">↑</button>
        <button class="ghost tiny" data-action="builder-move" data-index="${index}" data-dir="1" type="button">↓</button>
        <button class="ghost tiny" data-action="builder-duplicate" data-index="${index}" type="button">Copy</button>
        <button class="ghost tiny danger-text" data-action="builder-remove" data-index="${index}" type="button">Remove</button>
      </div>
    </div>
    <div class="builder-grid">
      <label class="field form-span-2"><span>Exercise</span><input data-builder-field="name" data-index="${index}" value="${escapeHtml(row.name)}" /></label>
      <label class="field"><span>Primary muscle</span><input data-builder-field="muscle" data-index="${index}" value="${escapeHtml(row.muscle)}" /></label>
      <label class="field"><span>Secondary</span><input data-builder-field="secondaryMuscles" data-index="${index}" value="${escapeHtml(row.secondaryMuscles || "")}" placeholder="optional" /></label>
      <label class="field"><span>Type</span><select data-builder-field="type" data-index="${index}">${builderTypeOptions(row.type)}</select></label>
      <label class="field"><span>Work sets</span><input data-builder-field="sets" data-index="${index}" type="number" min="1" max="12" value="${row.sets}" /></label>
      <label class="field"><span>Rep range</span><input data-builder-field="reps" data-index="${index}" value="${escapeHtml(row.reps)}" /></label>
      <label class="field"><span>Warm-ups</span><input data-builder-field="warmupCount" data-index="${index}" type="number" min="0" max="6" value="${row.warmupCount}" /></label>
      <label class="field"><span>Rest seconds</span><input data-builder-field="restSeconds" data-index="${index}" type="number" min="30" max="300" step="15" value="${row.restSeconds}" /></label>
      <label class="field"><span>Effort target</span><input data-builder-field="effortTarget" data-index="${index}" value="${escapeHtml(row.effortTarget)}" /></label>
      <label class="field"><span>Progression</span><select data-builder-field="progressionRule" data-index="${index}">${builderProgressionOptions(row.progressionRule)}</select></label>
      <label class="field"><span>Load format</span><select data-builder-field="loadMode" data-index="${index}">${builderLoadModeOptions(row.loadMode)}</select></label>
      <label class="field checkbox-field"><span>Allow optional drop set</span><input data-builder-field="allowDropSet" data-index="${index}" type="checkbox" ${row.allowDropSet ? "checked" : ""} /></label>
      <label class="field form-span-2"><span>Quick-swap alternatives</span><input data-builder-field="alternatives" data-index="${index}" value="${escapeHtml(row.alternatives || "")}" placeholder="Cable fly, Pec deck, Machine press" /></label>
      <label class="field form-span-2"><span>Mobile cue</span><input data-builder-field="cue" data-index="${index}" value="${escapeHtml(row.cue || "")}" placeholder="Control negative. Stop before form breaks." /></label>
      <label class="field form-span-2"><span>Setup note</span><input data-builder-field="setupNote" data-index="${index}" value="${escapeHtml(row.setupNote || "")}" placeholder="Seat 4, cable low, neutral grip" /></label>
    </div>
  </article>`;
}

function renderBuilder() {
  ensureBuilderState();
  const workoutId = builderSelectedWorkout();
  const rows = builderDraftRows(workoutId);
  const publishedRows = state.settings.workoutLayouts?.[workoutId] || [];
  pageTitle.textContent = "Desktop Builder";
  view.innerHTML = `<section class="builder-hero-v159">
    <div><span>BUILDER ALIGNMENT</span><h2>Define exactly what mobile executes.</h2><p>No builder-only theory. Sets, reps, warm-ups, effort, rest, drops, muscle mapping and alternatives all publish to the gym flow.</p></div>
    <strong>${state.builder.lastPublishedAt ? `Published ${niceDateTime(state.builder.lastPublishedAt)}` : "Draft not published"}</strong>
  </section>

  <section class="builder-layout-v159">
    <aside class="builder-sidebar card">
      <p class="label">Workouts</p>
      <div class="builder-tab-stack">${renderBuilderWorkoutTabs(workoutId)}</div>
      <button class="secondary full" data-action="builder-import-published" type="button">Reset draft from mobile programme</button>
      <button class="primary full" data-action="builder-publish" type="button">Publish to mobile</button>
    </aside>

    <section class="builder-main-panel">
      <div class="builder-program-summary card">
        <div><p class="label">Selected workout</p><h3>${escapeHtml(builderWorkoutTitle(workoutId))}</h3><p class="muted">${rows.length} exercises · ${totalBuilderHardSets(rows)} working sets · ${escapeHtml(builderMuscleSummary(rows))}</p></div>
        <div class="button-row"><button class="secondary small" data-action="builder-add-library" type="button">Add from library</button><button class="ghost small" data-action="builder-add-blank" type="button">Add blank</button></div>
      </div>

      <section class="builder-mobile-contract card">
        <p class="label">Mobile contract</p>
        <div class="contract-grid-v159">
          <span>Workout list</span><span>Exercise focus</span><span>Rest screen</span><span>Drops</span><span>Swaps</span><span>Report mapping</span><span>Cardio separate</span><span>Cloud backup</span>
        </div>
      </section>

      <section class="builder-program-summary card builder-cardio-handoff">
        <div><p class="label">Cardio builder</p><h3>Cardio stays outside lifting</h3><p class="muted">${ensureCardioState().prescriptions.length} saved prescriptions · ${ensureCardioState().templates.length} templates. Time, HR, incline, level, pace and instructions are defined in the Cardio planner and logged separately on mobile.</p></div>
        <button class="secondary small" data-route-jump="cardio" type="button">Open cardio planner</button>
      </section>

      <section class="builder-program-summary card builder-adhoc-handoff">
        <div><p class="label">Workout on the fly</p><h3>Mobile-only ad-hoc execution</h3><p class="muted">Blank workouts, extra daily sessions and mini sessions remain executable on mobile. Saved programme workouts are controlled here.</p></div>
        <button class="ghost small" data-route-jump="training" type="button">Open training</button>
      </section>

      <section class="builder-exercise-stack">${rows.map(renderBuilderExerciseRow).join("") || `<p class="muted">No exercises in this draft.</p>`}</section>

      <section class="builder-preview-v159 card">
        <p class="label">Mobile preview</p>
        <h3>${escapeHtml(builderWorkoutTitle(workoutId))}</h3>
        <div class="builder-phone-preview">${rows.map((row, index) => `<button type="button"><b>${String(index + 1).padStart(2, "0")}</b><span><strong>${escapeHtml(row.name)}</strong><small>${escapeHtml(row.muscle)} · ${row.warmupCount} warm-up · ${row.sets} work · ${row.reps} · ${row.restSeconds}s</small></span></button>`).join("")}</div>
      </section>
    </section>
  </section>`;
  attachBuilderHandlers();
}

function updateBuilderField(input) {
  const workoutId = builderSelectedWorkout();
  const rows = builderDraftRows(workoutId);
  const index = Number(input.dataset.index);
  const field = input.dataset.builderField;
  const row = rows[index];
  if (!row || !field) return;
  if (input.type === "checkbox") row[field] = input.checked;
  else if (["sets", "warmupCount", "restSeconds", "dropPercent"].includes(field)) row[field] = Number(input.value || 0);
  else row[field] = input.value;
  if (field === "type" && !Number(row.restSeconds)) row.restSeconds = defaultRestSeconds(row.type);
  if (field === "loadMode") Object.assign(row, loadModeConfig(row.loadMode));
  rows[index] = normalizeBuilderBlueprint(row, index);
  saveState();
  const head = input.closest(".builder-exercise-row")?.querySelector(".builder-row-head div");
  if (head) head.innerHTML = `<h3>${escapeHtml(rows[index].name)}</h3><p>${escapeHtml(rows[index].muscle)} · ${rows[index].sets}×${escapeHtml(rows[index].reps)} · ${rows[index].restSeconds}s rest</p>`;
}

function addBuilderExercise(blank = false) {
  const workoutId = builderSelectedWorkout();
  const rows = builderDraftRows(workoutId);
  let blueprint;
  if (!blank) {
    const library = exerciseLibraryItems();
    const names = library.slice(0, 25).map((item, i) => `${i + 1}. ${item.name} (${item.muscle})`).join("\n");
    const choice = prompt(`Choose library exercise number, or type a new exercise name:\n\n${names}`);
    if (!choice) return;
    const number = Number(choice);
    blueprint = Number.isFinite(number) && library[number - 1] ? library[number - 1] : { name: choice, muscle: "Other", type: "isolation", sets: 3, reps: "8–12" };
  } else {
    blueprint = { name: "New exercise", muscle: "Other", type: "isolation", sets: 3, reps: "8–12" };
  }
  rows.push(normalizeBuilderBlueprint({ ...blueprint, exerciseId: blueprint.exerciseId || `builder-${uid()}`, variantId: blueprint.variantId || blueprint.exerciseId || `builder-${uid()}`, custom: true }, rows.length));
  saveState();
  renderBuilder();
}

function builderMove(index, dir) {
  const rows = builderDraftRows();
  const next = index + dir;
  if (next < 0 || next >= rows.length) return;
  const [row] = rows.splice(index, 1);
  rows.splice(next, 0, row);
  saveState();
  renderBuilder();
}

function builderDuplicate(index) {
  const rows = builderDraftRows();
  const row = rows[index];
  if (!row) return;
  rows.splice(index + 1, 0, normalizeBuilderBlueprint({ ...safeClone(row), exerciseId: `builder-${uid()}`, variantId: `builder-${uid()}`, name: `${row.name} copy` }, index + 1));
  saveState();
  renderBuilder();
}

function builderRemove(index) {
  const rows = builderDraftRows();
  if (rows.length <= 1) return showNotice("A workout needs at least one exercise.", "warn");
  rows.splice(index, 1);
  saveState();
  renderBuilder();
}

function builderImportPublished() {
  const workoutId = builderSelectedWorkout();
  if (!confirm("Reset this draft from the current mobile programme?")) return;
  state.builder.draftLayouts[workoutId] = (state.settings.workoutLayouts?.[workoutId] || (PROGRAM[workoutId]?.exercises || []).map(blueprintFromProgramExercise)).map(normalizeBuilderBlueprint);
  saveState();
  renderBuilder();
}

function builderPublish() {
  ensureBuilderState();
  state.settings.workoutLayouts = state.settings.workoutLayouts || {};
  Object.entries(state.builder.draftLayouts).forEach(([workoutId, rows]) => {
    state.settings.workoutLayouts[workoutId] = rows.map((row, index) => normalizeBuilderBlueprint(row, index));
  });
  state.builder.lastPublishedAt = new Date().toISOString();
  saveState();
  queueCloudBackup({ delay: 900 });
  showNotice("Builder published to mobile workouts.", "good");
  renderBuilder();
}

function attachBuilderHandlers() {
  view.querySelectorAll("[data-action='builder-select-workout']").forEach((button) => button.addEventListener("click", () => {
    ensureBuilderState();
    state.builder.selectedWorkoutId = button.dataset.workoutId;
    saveState();
    renderBuilder();
  }));
  view.querySelectorAll("[data-builder-field]").forEach((input) => {
    input.addEventListener("change", () => updateBuilderField(input));
    input.addEventListener("blur", () => updateBuilderField(input));
  });
  view.querySelectorAll("[data-action='builder-move']").forEach((button) => button.addEventListener("click", () => builderMove(Number(button.dataset.index), Number(button.dataset.dir))));
  view.querySelectorAll("[data-action='builder-duplicate']").forEach((button) => button.addEventListener("click", () => builderDuplicate(Number(button.dataset.index))));
  view.querySelectorAll("[data-action='builder-remove']").forEach((button) => button.addEventListener("click", () => builderRemove(Number(button.dataset.index))));
  view.querySelector("[data-action='builder-add-library']")?.addEventListener("click", () => addBuilderExercise(false));
  view.querySelector("[data-action='builder-add-blank']")?.addEventListener("click", () => addBuilderExercise(true));
  view.querySelector("[data-action='builder-import-published']")?.addEventListener("click", builderImportPublished);
  view.querySelector("[data-action='builder-publish']")?.addEventListener("click", builderPublish);
  view.querySelectorAll("[data-route-jump]").forEach((button) => button.addEventListener("click", () => setRoute(button.dataset.routeJump)));
}

const STRATA_V159_BASE_BUILD_SESSION_LOG = buildSessionLog;
buildSessionLog = function buildSessionLogV159(blueprint, bodyweight) {
  const normalized = normalizeBuilderBlueprint(blueprint);
  const previousLog = latestExerciseHistoryLog(normalized);
  const previousWarmups = (previousLog?.sets || []).filter((set) => set.setType === "warmup");
  const previousWorking = (previousLog?.sets || []).filter((set) => set.setType !== "warmup");
  const warmupSets = Array.from({ length: Number(normalized.warmupCount || 0) }, (_, setIndex) => ({
    weight: previousWarmups?.[setIndex]?.weight ?? "",
    reps: "",
    rir: "",
    rpe: "",
    setType: "warmup",
    completed: false,
    previousWeight: previousWarmups?.[setIndex]?.weight ?? "",
    previousReps: previousWarmups?.[setIndex]?.reps ?? "",
    drops: []
  }));
  const workingSets = Array.from({ length: Number(normalized.sets || 3) }, (_, setIndex) => ({
    weight: previousWorking?.[setIndex]?.weight ?? "",
    reps: "",
    rir: "",
    rpe: "",
    setType: previousWorking?.[setIndex]?.setType || (setIndex === 0 && normalized.type === "strength" ? "top" : "work"),
    completed: false,
    previousWeight: previousWorking?.[setIndex]?.weight ?? "",
    previousReps: previousWorking?.[setIndex]?.reps ?? "",
    drops: []
  }));
  return {
    exerciseId: normalized.exerciseId,
    variantId: normalized.variantId || normalized.exerciseId,
    custom: Boolean(normalized.custom),
    name: normalized.name,
    muscle: normalized.muscle || "Other",
    secondaryMuscles: normalized.secondaryMuscles || "",
    type: normalized.type || "isolation",
    targetSets: Number(normalized.sets || 3),
    targetReps: normalized.reps || "8–12",
    effortTarget: normalized.effortTarget || "RPE 8–9",
    progressionRule: normalized.progressionRule || "double_progression",
    loadLabel: normalized.loadLabel || "kg",
    loadMultiplier: Number(normalized.loadMultiplier || 1),
    repMultiplier: Number(normalized.repMultiplier || 1),
    volumeMode: normalized.volumeMode || "external",
    allowZeroWeight: Boolean(normalized.allowZeroWeight),
    bodyweight: Number(bodyweight || 0),
    restSeconds: Number(normalized.restSeconds || defaultRestSeconds(normalized.type)),
    plannedDrop: Boolean(normalized.allowDropSet),
    drop: null,
    alternatives: normalized.alternatives || "",
    cue: normalized.cue || "",
    feedback: { target: "", joints: "", execution: "" },
    setupNote: normalized.setupNote || state.settings.exerciseSetup?.[normalized.variantId || normalized.exerciseId] || "",
    sets: [...warmupSets, ...workingSets]
  };
};

const STRATA_V159_BASE_START_WORKOUT = startWorkout;
startWorkout = function startWorkoutV159(workoutId) {
  if (workoutId === "adhoc") return STRATA_V159_BASE_START_WORKOUT(workoutId);
  const workout = PROGRAM[workoutId];
  if (!workout) return;
  const bodyweight = Number(getWeightForDate(todayISO())?.weight || getLatestWeight()?.weight || 0);
  state.activeSession = {
    id: uid(),
    workoutId,
    workoutTitle: workout.title,
    date: todayISO(),
    startedAt: new Date().toISOString(),
    activeExerciseIndex: 0,
    focusMode: "overview",
    bodyweight,
    logs: getWorkoutBlueprints(workoutId).map((blueprint) => buildSessionLog(blueprint, bodyweight)),
    notes: ""
  };
  saveState();
  setRoute("training");
};

const STRATA_V159_BASE_BLUEPRINT_FROM_LOG = blueprintFromLog;
blueprintFromLog = function blueprintFromLogV159(log) {
  return normalizeBuilderBlueprint({
    ...STRATA_V159_BASE_BLUEPRINT_FROM_LOG(log),
    warmupCount: (log.sets || []).filter((set) => set.setType === "warmup").length,
    effortTarget: log.effortTarget,
    progressionRule: log.progressionRule,
    allowDropSet: log.plannedDrop,
    cue: log.cue,
    setupNote: log.setupNote,
    alternatives: log.alternatives,
    secondaryMuscles: log.secondaryMuscles
  });
};

const STRATA_V159_BASE_ALTERNATIVES = alternativeOptionsForLog;
alternativeOptionsForLog = function alternativeOptionsForLogV159(log) {
  const builderNames = String(log.alternatives || "").split(",").map((name) => name.trim()).filter(Boolean);
  const library = exerciseLibraryItems();
  const builderItems = builderNames.map((name) => {
    const found = library.find((item) => item.name.toLowerCase() === name.toLowerCase());
    return found || normalizeBuilderBlueprint({ name, muscle: log.muscle, type: log.type, sets: log.targetSets, reps: log.targetReps, restSeconds: log.restSeconds, custom: true });
  });
  const seen = new Set();
  return [...builderItems, ...STRATA_V159_BASE_ALTERNATIVES(log)].filter((item) => {
    const key = exerciseIdentity(item);
    if (!key || key === exerciseIdentity(log) || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 12);
};

function injectBuilderEntryCard() {
  return;
  if (view.querySelector("[data-builder-entry-card]")) return;
  const anchor = view.querySelector(".cardio-today-card") || view.querySelector(".active-session-card") || view.firstElementChild;
  const card = document.createElement("section");
  card.className = "card builder-entry-card";
  card.setAttribute("data-builder-entry-card", "true");
  card.innerHTML = `<p class="label">Desktop builder</p><h3>Programme control room</h3><p class="muted">Edit the lifting programme fields mobile actually uses: sets, reps, warm-ups, rest, effort, drops, swaps and report mapping.</p><button class="secondary full" data-route-jump="builder" type="button">Open builder</button>`;
  if (anchor) anchor.insertAdjacentElement("afterend", card);
  else view.appendChild(card);
  card.querySelector("[data-route-jump='builder']")?.addEventListener("click", () => setRoute("builder"));
}

const STRATA_V159_BASE_RENDER = render;
render = function renderV159() {
  if (route === "builder") return renderBuilder();
  return STRATA_V159_BASE_RENDER();
};

const STRATA_V159_BASE_RENDER_TODAY = renderToday;
renderToday = function renderTodayV159() {
  STRATA_V159_BASE_RENDER_TODAY();
  injectBuilderEntryCard();
};

ensureBuilderState();
if (route === "today") renderToday();


/* =========================================================
   STRATA v1.5.10 — Frozen Build Stabilisation
   Scope: no new features. Stabilises active workout protection, progression
   honesty, setup/cue visibility, builder validation and version clarity.
   ========================================================= */

function activeWorkoutDecision(nextWorkoutId) {
  if (!state.activeSession) return "start";
  const currentTitle = sessionTitle(state.activeSession);
  const nextTitle = PROGRAM[nextWorkoutId]?.title || (nextWorkoutId === "adhoc" ? "Workout on the fly" : "new workout");
  const choice = prompt(
    `A workout is already in progress: ${currentTitle}.\n\nYou are trying to start: ${nextTitle}.\n\nType R to resume current workout.\nType D to discard current workout and start the new one.\nType C to cancel.`,
    "R"
  );
  const value = String(choice || "C").trim().toLowerCase();
  if (value === "d" || value === "discard") return "discard";
  if (value === "r" || value === "resume") return "resume";
  return "cancel";
}

const STRATA_V1510_BASE_START_WORKOUT = startWorkout;
startWorkout = function startWorkoutV1510(workoutId) {
  if (state.activeSession) {
    const decision = activeWorkoutDecision(workoutId);
    if (decision === "resume") {
      setRoute("training");
      return;
    }
    if (decision === "cancel") return;
    if (decision === "discard") {
      state.activeSession = null;
      saveState();
    }
  }
  return STRATA_V1510_BASE_START_WORKOUT(workoutId);
};

function normalizeProgressionRuleV1510(rule) {
  return rule === "double_progression" ? "double_progression" : "manual_note";
}

const STRATA_V1510_BASE_NORMALIZE_BUILDER_BLUEPRINT = normalizeBuilderBlueprint;
normalizeBuilderBlueprint = function normalizeBuilderBlueprintV1510(item = {}, fallbackIndex = 0) {
  const row = STRATA_V1510_BASE_NORMALIZE_BUILDER_BLUEPRINT(item, fallbackIndex);
  if (Object.prototype.hasOwnProperty.call(item, "name")) row.name = item.name;
  if (Object.prototype.hasOwnProperty.call(item, "muscle")) row.muscle = item.muscle;
  if (Object.prototype.hasOwnProperty.call(item, "primaryMuscle")) row.muscle = item.primaryMuscle;
  if (Object.prototype.hasOwnProperty.call(item, "reps")) row.reps = item.reps;
  if (Object.prototype.hasOwnProperty.call(item, "restSeconds")) row.restSeconds = Number(item.restSeconds);
  if (Object.prototype.hasOwnProperty.call(item, "sets")) row.sets = Number(item.sets);
  if (Object.prototype.hasOwnProperty.call(item, "loadMultiplier")) row.loadMultiplier = Number(item.loadMultiplier);
  const originalRule = item.progressionRule || row.progressionRule;
  row.progressionRule = normalizeProgressionRuleV1510(originalRule);
  row.manualProgressionNote = item.manualProgressionNote || item.progressionNote || (originalRule && originalRule !== "double_progression" ? "Manual progression note — not automated." : "");
  return row;
};

builderProgressionOptions = function builderProgressionOptionsV1510(value) {
  const normalized = normalizeProgressionRuleV1510(value);
  const options = [
    ["double_progression", "Double progression"],
    ["manual_note", "Manual progression note"]
  ];
  return options.map(([id, label]) => `<option value="${id}" ${id === normalized ? "selected" : ""}>${label}</option>`).join("");
};

const STRATA_V1510_BASE_RENDER_BUILDER_EXERCISE_ROW = renderBuilderExerciseRow;
renderBuilderExerciseRow = function renderBuilderExerciseRowV1510(row, index) {
  const html = STRATA_V1510_BASE_RENDER_BUILDER_EXERCISE_ROW(row, index);
  const replacement = `<label class="field"><span>Progression</span><select data-builder-field="progressionRule" data-index="${index}">${builderProgressionOptions(row.progressionRule)}</select></label>
      <label class="field form-span-2 manual-progression-field"><span>Manual progression note</span><input data-builder-field="manualProgressionNote" data-index="${index}" value="${escapeHtml(row.manualProgressionNote || "")}" placeholder="Only shown when not using double progression" /></label>`;
  return html.replace(/<label class="field"><span>Progression<\/span><select data-builder-field="progressionRule" data-index="\d+">[\s\S]*?<\/select><\/label>/, replacement);
};

function setupCueCardMarkup(log) {
  const setup = String(log.setupNote || "").trim();
  const cue = String(log.cue || "").trim();
  if (!setup && !cue) return "";
  return `<section class="mobile-setup-cue-card">
    ${setup ? `<div><span>⚙ Setup</span><strong>${escapeHtml(setup)}</strong></div>` : ""}
    ${cue ? `<div><span>🎯 Cue</span><strong>${escapeHtml(cue)}</strong></div>` : ""}
  </section>`;
}

const STRATA_V1510_BASE_EXERCISE_LOG_CARD = exerciseLogCard;
exerciseLogCard = function exerciseLogCardV1510(log, index, workoutId) {
  const html = STRATA_V1510_BASE_EXERCISE_LOG_CARD(log, index, workoutId);
  const cueMarkup = setupCueCardMarkup(log);
  if (!cueMarkup) return html;
  return html.replace(/(<section class="current-set-panel[\s\S]*?<\/section>)/, `${cueMarkup}$1`);
};

const STRATA_V1510_BASE_BUILD_SESSION_LOG = buildSessionLog;
buildSessionLog = function buildSessionLogV1510(blueprint, bodyweight) {
  const log = STRATA_V1510_BASE_BUILD_SESSION_LOG(blueprint, bodyweight);
  const normalized = normalizeBuilderBlueprint(blueprint);
  log.progressionRule = normalizeProgressionRuleV1510(normalized.progressionRule);
  log.manualProgressionNote = normalized.manualProgressionNote || "";
  log.cue = normalized.cue || "";
  log.setupNote = normalized.setupNote || log.setupNote || "";
  return log;
};

const STRATA_V1510_BASE_DOUBLE_PROGRESSION_SIGNAL = doubleProgressionSignal;
doubleProgressionSignal = function doubleProgressionSignalV1510(log) {
  if (log?.progressionRule && log.progressionRule !== "double_progression") {
    return {
      ready: false,
      label: "Manual progression note",
      detail: log.manualProgressionNote || "This exercise is not automated. Follow the manual progression note from the builder."
    };
  }
  return STRATA_V1510_BASE_DOUBLE_PROGRESSION_SIGNAL(log);
};

function validateBuilderDrafts() {
  ensureBuilderState();
  const errors = [];
  const warnings = [];
  Object.entries(state.builder.draftLayouts || {}).forEach(([workoutId, rows]) => {
    const workoutName = builderWorkoutTitle(workoutId);
    const normalizedRows = (rows || []).map(normalizeBuilderBlueprint);
    let hardSets = 0;
    let dropEnabled = 0;
    if (!normalizedRows.length) {
      errors.push({ workout: workoutName, exercise: "Workout", message: "At least one exercise is required." });
    }
    normalizedRows.forEach((row, index) => {
      const label = row.name || `Exercise ${index + 1}`;
      hardSets += Number(row.sets || 0);
      if (row.allowDropSet) dropEnabled += 1;
      if (!String(row.name || "").trim()) errors.push({ workout: workoutName, exercise: label, message: "Exercise name is required." });
      if (!String(row.muscle || "").trim()) errors.push({ workout: workoutName, exercise: label, message: "Primary muscle is required for reporting." });
      if (Number(row.sets || 0) < 1) errors.push({ workout: workoutName, exercise: label, message: "At least one work set is required." });
      if (!String(row.reps || "").trim()) errors.push({ workout: workoutName, exercise: label, message: "Rep range is required." });
      if (!Number.isFinite(Number(row.restSeconds)) || Number(row.restSeconds) < 0) errors.push({ workout: workoutName, exercise: label, message: "Rest time must be set." });
      if (!Number.isFinite(Number(row.loadMultiplier)) || Number(row.loadMultiplier) <= 0) errors.push({ workout: workoutName, exercise: label, message: "Load multiplier must be greater than zero." });
      if (!String(row.alternatives || "").trim()) warnings.push({ workout: workoutName, exercise: label, message: "No swap alternatives set." });
      if (!String(row.setupNote || "").trim()) warnings.push({ workout: workoutName, exercise: label, message: "No setup note added." });
      if (!String(row.cue || "").trim()) warnings.push({ workout: workoutName, exercise: label, message: "No mobile cue added." });
    });
    if (normalizedRows.length > 10) warnings.push({ workout: workoutName, exercise: "Workout", message: "This workout may be long for mobile execution." });
    if (hardSets > 30) warnings.push({ workout: workoutName, exercise: "Workout", message: "High set count. Check recovery and session length." });
    if (dropEnabled > 4) warnings.push({ workout: workoutName, exercise: "Workout", message: "Many drop-set options enabled. Confirm this is intentional." });
  });
  return { errors, warnings, checkedAt: new Date().toISOString() };
}

function compactValidationList(items) {
  return (items || []).slice(0, 18).map((item) => `- ${item.workout} · ${item.exercise}: ${item.message}`).join("\n");
}

function renderBuilderValidationPanel() {
  const validation = state.builder?.validation;
  if (!validation || (!validation.errors?.length && !validation.warnings?.length)) return "";
  const hasErrors = validation.errors?.length;
  return `<section class="builder-validation-panel card ${hasErrors ? "has-errors" : "has-warnings"}">
    <p class="label">${hasErrors ? "Cannot publish yet" : "Ready to publish with warnings"}</p>
    ${validation.errors?.length ? `<div class="validation-group"><h3>Blocking errors</h3>${validation.errors.map((item) => `<p><strong>${escapeHtml(item.workout)} · ${escapeHtml(item.exercise)}</strong><span>${escapeHtml(item.message)}</span></p>`).join("")}</div>` : ""}
    ${validation.warnings?.length ? `<div class="validation-group"><h3>Warnings</h3>${validation.warnings.map((item) => `<p><strong>${escapeHtml(item.workout)} · ${escapeHtml(item.exercise)}</strong><span>${escapeHtml(item.message)}</span></p>`).join("")}</div>` : ""}
  </section>`;
}

const STRATA_V1510_BASE_RENDER_BUILDER = renderBuilder;
renderBuilder = function renderBuilderV1510() {
  STRATA_V1510_BASE_RENDER_BUILDER();
  const panel = renderBuilderValidationPanel();
  if (panel) view.querySelector(".builder-hero-v159")?.insertAdjacentHTML("afterend", panel);
};

builderPublish = function builderPublishV1510() {
  ensureBuilderState();
  const validation = validateBuilderDrafts();
  if (validation.errors.length) {
    state.builder.validation = validation;
    saveState();
    renderBuilder();
    showNotice("Cannot publish yet. Fix the blocking builder errors.", "danger", 6500);
    return;
  }
  if (validation.warnings.length) {
    state.builder.validation = validation;
    const ok = confirm(`Ready to publish with warnings:\n\n${compactValidationList(validation.warnings)}\n\nPublish anyway?`);
    if (!ok) {
      saveState();
      renderBuilder();
      showNotice("Publish cancelled. Review the warnings.", "warn", 5000);
      return;
    }
  }
  state.settings.workoutLayouts = state.settings.workoutLayouts || {};
  Object.entries(state.builder.draftLayouts).forEach(([workoutId, rows]) => {
    state.settings.workoutLayouts[workoutId] = rows.map((row, index) => normalizeBuilderBlueprint(row, index));
  });
  state.builder.lastPublishedAt = new Date().toISOString();
  state.builder.validation = null;
  saveState();
  queueCloudBackup({ delay: 900 });
  showNotice("Programme published to mobile.", "good");
  renderBuilder();
};

const STRATA_V1510_BASE_BLUEPRINT_FROM_LOG = blueprintFromLog;
blueprintFromLog = function blueprintFromLogV1510(log) {
  return normalizeBuilderBlueprint({
    ...STRATA_V1510_BASE_BLUEPRINT_FROM_LOG(log),
    progressionRule: log.progressionRule,
    manualProgressionNote: log.manualProgressionNote,
    cue: log.cue,
    setupNote: log.setupNote
  });
};

// Refresh builder state after the stabilisation overrides so old draft rules are made honest.
ensureBuilderState();
saveState();
