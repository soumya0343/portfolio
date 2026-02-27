# Mandala Studio 🧘‍♂️✨

Mandala Studio is an interactive, web-based zen experience designed for creating, customizing, and meditating with generative mandala art. Built with React and Vite.

## Features

- **Generative Mandalas:** Create beautiful, mathematical mandalas.
- **Customization:** Adjust size, complexity (rings), rotation speed, and apply a soothing glow effect.
- **Color Palettes:** Fully customize the primary, secondary, accent, and extra colors of the mandala.
- **Zen / Breathing Mode:** A guided breathing animation where the mandala expands and contracts, synchronized with "Inhale", "Hold", and "Exhale" prompts.
- **Ambient Audio:** Integrated Web Audio API soundscapes (Singing Bowl, Gentle Rain, Ocean Waves, Ambient Drone) to enhance relaxation, with play/pause and volume controls.
- **Export:** Save your customized mandala artwork as a high-resolution PNG image.

## Technology Stack

- **Framework:** React
- **Build Tool:** Vite
- **Styling:** Custom CSS (Zen/Dark Theme)
- **Icons:** Lucide React
- **Animation:** Framer Motion (for Breathing Mode)
- **Image Export:** html2canvas
- **Audio:** Web Audio API (Procedurally generated soundscapes, no external assets required)

## Running Locally

To run Mandala Studio on your local machine:

1.  **Clone the repository** (if you haven't already).
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the development server:**
    ```bash
    npm run dev
    ```
4.  Open your browser and navigate to `http://localhost:5173` (or the URL provided in your terminal).

## Usage

Use the sidebar control panel to adjust the mandala's geometry, colors, and effects.
Select an ambient track from the Audio section, adjust the volume, and click "Zen / Breathing Mode" to initiate a guided meditation session.
Export your creation anytime using the "Export PNG" button.
