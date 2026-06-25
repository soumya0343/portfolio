# Architecture

Mandala Studio is a single-page React app with no backend, no router, and no global
state library. All state lives in component-local React hooks. Mandala art is rendered
as inline SVG; ambient audio is synthesized at runtime with the Web Audio API. Nothing
is fetched over the network at runtime — every asset is generated procedurally.

## High-Level Diagram

```
                          ┌─────────────────────┐
                          │      main.jsx       │  createRoot + StrictMode
                          └──────────┬──────────┘
                                     │
                          ┌──────────▼──────────┐
                          │       App.jsx       │  owns mandalaState, breathingMode, loaded
                          └──────────┬──────────┘
            loaded === false         │         loaded === true
              ┌──────────────────────┴───────────────────────┐
              ▼                                               ▼
      ┌───────────────┐                       ┌───────────────────────────────┐
      │ LoadingScreen │  2.8s splash,         │          app-layout           │
      │  (spinning    │  then onComplete()    │  ┌──────────┐  ┌────────────┐  │
      │   Mandala)    │                       │  │ Mandala  │  │ControlPanel│  │
      └───────────────┘                       │  │  (SVG)   │  │ (sidebar)  │  │
                                              │  └──────────┘  └─────┬──────┘  │
                                              └────────────────────────────────┘
                                                                    │
                                          ┌─────────────────────────┼──────────────┐
                                          ▼            ▼            ▼               ▼
                                       Slider     ColorPicker   MusicPlayer    html2canvas
                                                               (Web Audio API)  (PNG export)
```

## State Ownership

All shared state is held in [App.jsx](src/App.jsx) and threaded down via props — a
deliberately flat, single-owner model (no Context, no Redux).

| State           | Type      | Owner | Purpose                                                    |
| --------------- | --------- | ----- | ---------------------------------------------------------- |
| `mandalaState`  | object    | App   | Geometry + colors + glow. Spread directly into `<Mandala>` |
| `breathingMode` | boolean   | App   | Toggles the Framer Motion expand/contract loop             |
| `loaded`        | boolean   | App   | Gates the loading splash vs. the main UI                   |

`mandalaState` shape:

```js
{
  size,            // px, initialized from window dimensions
  rings,           // 1–16, number of concentric petal layers
  rotationSpeed,   // seconds per full rotation (0 = no spin)
  colorPrimary, colorSecondary, colorAccent,
  colorExtra1, colorExtra2, colorExtra3,   // ring palette (6 colors)
  glow,            // boolean, SVG Gaussian-blur filter
}
```

`ControlPanel` mutates this via a single `handleChange(key, value)` that does an
immutable `setState(prev => ({ ...prev, [key]: value }))`. Audio state
(`isPlaying`, `volume`, `currentTrackIndex`, etc.) is **not** lifted — it is fully
local to `MusicPlayer`, since nothing else needs it.

## Rendering Pipeline (Mandala.jsx)

[Mandala.jsx](src/components/Mandala.jsx) is the heart of the app. It is a
`React.memo` component that turns numeric props into an SVG tree.

1. **Geometry** — for each ring `r` (0…rings-1):
   - `ringRadius = maxRadius * (r+1)/rings`
   - `petalCount = 6 + r*2` (outer rings have more petals)
   - The outermost 3 rings are stroke-only (`isStrokeOnly = r >= rings-3`) for an
     airy, lace-like edge.
   - Each petal's `<path>` is built by `generatePetalPath()`, which computes a
     two-segment quadratic Bézier (`M … Q … Q … Z`) from polar coordinates —
     base, control points, and tip all derived from `cos/sin` of the petal angle.
2. **Memoization** — the full layer array is built inside `useMemo`, keyed on
   `rings`, `size`, and the six colors. Rotation speed, glow, and opacity changes
   do **not** rebuild the SVG paths; they only touch the wrapper `<svg>` style.
3. **Animation** — rotation is pure CSS (`mandala-spin-cw` / `-ccw` keyframes in
   [index.css](src/index.css)) applied as an inline `animation` on the `<svg>`,
   with `willChange: transform` for GPU compositing. No JS runs per frame.
4. **Glow** — when enabled, a per-size `<filter>` with `feGaussianBlur` + `feMerge`
   is injected into `<defs>` and referenced via `filter: url(#mandala-glow-{size})`.

Because rotation and the breathing scale are both compositor-only transforms, the
animation stays smooth even with 16 rings.

## Breathing Mode

Driven by Framer Motion in [App.jsx](src/App.jsx). The `.mandala-container` wrapper
animates between two variants:

- `static` — `scale: 1, opacity: 1`
- `animate` — a 19-second keyframe loop (`scale: [1, 1.15, 1.15, 0.9, 1]`) timed to
  a 4s inhale / 7s hold / 8s exhale box-breathing rhythm, repeating infinitely.

Toggling `breathingMode` also disables the Size slider (the scale animation owns the
visual size while active).

## Audio Engine (MusicPlayer.jsx)

[MusicPlayer.jsx](src/components/Controls/MusicPlayer.jsx) synthesizes every
soundscape live — there are **no audio files**. Each track is a factory
`create(ctx, dest)` that wires up oscillators / noise buffers and returns a cleanup
function.

| Track         | Technique                                                              |
| ------------- | --------------------------------------------------------------------- |
| Singing Bowl  | 4 stacked sine partials (220–880 Hz) with slow per-partial vibrato LFOs |
| Gentle Rain   | Brown noise → highpass(400) → lowpass(8k)                              |
| Ocean Waves   | Brown-noise rumble + bandpass "foam", both swelled by a 0.07 Hz LFO    |
| Ambient Drone | Detuned sine/triangle stack (A1–E3) with slow detune-drift LFOs        |

Lifecycle:

- A single `AudioContext` + master `GainNode` are created lazily on first play and
  held in refs (`ctxRef`, `gainRef`, `stopRef`).
- `useEffect` on `[isPlaying, currentTrackIndex]` starts/stops the active track;
  switching tracks calls the previous track's cleanup before creating the new one.
- A separate `useEffect` maps `volume`/`isMuted` onto `gainRef.gain.value`.
- On unmount, the active sound is stopped and the `AudioContext` is closed.

## PNG Export

`handleExport` in [ControlPanel.jsx](src/components/ControlPanel.jsx):

1. Grabs the live `.mandala-container svg` node and clones it.
2. Wraps the clone in an off-screen (`left: -9999px`) div with the app's dark
   background and padding.
3. Renders that wrapper with `html2canvas` at `scale: 2` (retina-quality).
4. Converts the canvas to a `image/png` data URL and triggers a download via a
   synthetic `<a download="mandala.png">` click.
5. Removes the temporary wrapper from the DOM.

The off-screen clone exists so the exported image has a solid background and framing
that the on-screen transparent SVG doesn't carry.

## Build & Tooling

- **Vite 7** — dev server + production bundler ([vite.config.js](vite.config.js),
  React plugin only).
- **ESLint 9** flat config ([eslint.config.js](eslint.config.js)) with
  react-hooks and react-refresh plugins.
- **React 19** — used without any router or state library.

## Notes / Cruft

- `package.json` `name` is still `portfolio-temp` — historical leftover from the
  repo's previous life as a personal portfolio.
- The README mentions on-screen "Inhale / Hold / Exhale" text, but the
  `.breathing-text` element in `App.jsx` is currently empty (the timing lives in the
  animation, not in rendered labels).
