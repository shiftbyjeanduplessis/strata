# STRATA v1.5.2 — Muscle Stimulus Map

Adds a post-workout **Muscle Stimulus Map** so each muscle shows volume, average RPE/intensity and rep-range distribution in one visual block.

- Rep ranges are represented as horizontal segments.
- Segment colour reflects session intensity.
- Each muscle gets a conclusion such as low-volume/high-intensity or strong stimulus.
- Existing workout logging, photos, Body Strata and backup behaviour remain unchanged.

# STRATA v1.4.9 — Muscle Stimulus Summary

A mobile-first vanilla JavaScript PWA for the personal 3-Day Upper / Lower / rotating Strength programme.

## v1.4.9 changes

- Workout completion now includes a muscle stimulus summary per muscle.
- Each muscle shows hard sets, volume, average RPE, intensity label and rep-range distribution.
- Helps a bodybuilder see what was hit, how hard, and in which rep ranges at the end of the workout.

## v1.4.6 changes

- Reorder exercises during a workout and save the new routine order.
- Substitute an exercise while keeping each movement's history separate.
- Remove exercises from a routine and permanently add library/custom movements.
- Open exercise history from the live workout or History page.
- Exercise history includes the last five sessions, best set, matched-load rep progression, matched-rep load progression, average effort and volume bars.
- Weekly muscle workload shows completed versus planned direct hard sets, frequency and average RPE.
- Workout completion now reports progressed, maintained and regressed exercises, best set, average RPE, set drop-off, direct hard sets by muscle and joint flags.

## Existing features

- Explicit warm-up rows, excluded from working volume and hard-set counts
- RPE / RIR effort-scale toggle
- Optional ad-hoc drop sets
- Focused workout mode with dense set logging
- Previous load/reps, set completion and independent rest timer
- Bodybuilding set types and exercise setup memory
- Daily weight, weekly front/back/side photos and history
- IndexedDB photo storage and JSON backup

## Running locally

Unzip into a new folder. Open `index.html` for basic use, or run `npm start` and visit http://localhost:4173. PWA installation and service-worker updates require localhost or HTTPS.


## v1.5.2 Supabase backup

This release adds optional Supabase cloud backup for completed workouts, weights, routine settings and local programme changes. It remains local-first in the gym: workouts save to the device immediately, then sync after completion or when using Sync now. Progress-photo files remain local for now. Run `SUPABASE_SETUP.sql` once in your Supabase SQL Editor before signing in.
