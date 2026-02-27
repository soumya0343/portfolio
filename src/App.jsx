// src/App.jsx
import { useState } from "react";
import Mandala from "./components/Mandala";
import ControlPanel from "./components/ControlPanel";
import LoadingScreen from "./components/LoadingScreen";
import { motion } from "framer-motion";

export default function App() {
  const [mandalaState, setMandalaState] = useState({
    size: Math.min(window.innerWidth - 450, window.innerHeight - 100),
    rings: 8,
    rotationSpeed: 60,
    colorPrimary: "#D4A85A",
    colorSecondary: "#E8732A",
    colorAccent: "#7B5EA7",
    colorExtra1: "#2ABFBF",
    colorExtra2: "#C2385A",
    colorExtra3: "#E8557A",
    glow: true,
  });

  const [breathingMode, setBreathingMode] = useState(false);

  const [loaded, setLoaded] = useState(false);

  // Simple breathing animation variants
  const breathingVariants = {
    animate: {
      scale: [1, 1.15, 1.15, 0.9, 1],
      opacity: [0.8, 1, 1, 0.6, 0.8],
      transition: {
        duration: 19, // 4s inhale + 7s hold + 8s exhale = 19s
        times: [0, 4 / 19, 11 / 19, 19 / 19, 1],
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
    static: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1 },
    },
  };

  if (!loaded) {
    return <LoadingScreen onComplete={() => setLoaded(true)} />;
  }

  return (
    <div className="app-layout">
      {/* Ambient backgrounds */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="noise-overlay" />

      <main className="canvas-area">
        <motion.div
          className="mandala-container"
          animate={breathingMode ? "animate" : "static"}
          variants={breathingVariants}
        >
          <Mandala {...mandalaState} />
        </motion.div>
        {breathingMode && <div className="breathing-text"></div>}
      </main>

      <aside className="sidebar-area">
        <ControlPanel
          state={mandalaState}
          setState={setMandalaState}
          breathingMode={breathingMode}
          setBreathingMode={setBreathingMode}
        />
      </aside>
    </div>
  );
}
