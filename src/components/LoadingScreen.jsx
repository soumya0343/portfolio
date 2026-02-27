import React, { useState, useEffect } from "react";
import Mandala from "./Mandala";

export default function LoadingScreen({ onComplete }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Artificial minimum loading time
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(onComplete, 600); // Wait for exit animation
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={`loading-screen ${exiting ? "exit" : ""}`}>
      <div className="loading-mandala-wrapper" style={{ marginBottom: "2rem" }}>
        <Mandala
          size={120}
          rings={4}
          rotationSpeed={4}
          colorPrimary="#D4A85A"
          colorSecondary="#E8732A"
          glow={true}
        />
      </div>
      <div
        className="loading-name"
        style={{
          fontSize: "1.2rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--text-secondary)",
        }}
      >
        <span style={{ animationDelay: "0.1s" }}>B</span>
        <span style={{ animationDelay: "0.2s" }}>r</span>
        <span style={{ animationDelay: "0.3s" }}>e</span>
        <span style={{ animationDelay: "0.4s" }}>a</span>
        <span style={{ animationDelay: "0.5s" }}>t</span>
        <span style={{ animationDelay: "0.6s" }}>h</span>
        <span style={{ animationDelay: "0.7s" }}>e</span>
        <span style={{ animationDelay: "0.8s" }}>.</span>
        <span style={{ animationDelay: "0.9s" }}>.</span>
        <span style={{ animationDelay: "1.0s" }}>.</span>
      </div>
      <div className="loading-line" style={{ width: "120px" }} />
    </div>
  );
}
