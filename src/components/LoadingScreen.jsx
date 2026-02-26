import { useState, useEffect } from "react";
import Mandala from "./Mandala";
import { personal } from "../data";

export default function LoadingScreen({ onComplete }) {
  const [exit, setExit] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => setExit(true), 3200);
    const hideTimer = setTimeout(() => {
      setHidden(true);
      onComplete?.();
    }, 3800);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, [onComplete]);

  if (hidden) return null;

  const nameChars = personal.name.split("");

  return (
    <div className={`loading-screen ${exit ? "exit" : ""}`}>
      <Mandala
        size={280}
        colorPrimary="#D4A85A"
        colorSecondary="#E8732A"
        colorAccent="#7B5EA7"
        colorExtra1="#2ABFBF"
        colorExtra2="#C2385A"
        colorExtra3="#E8557A"
        rotationSpeed={0}
        opacity={1}
        rings={8}
        drawAnimation={true}
      />
      <div className="loading-name">
        {nameChars.map((char, i) => (
          <span
            key={i}
            style={{
              animationDelay: `${1.2 + i * 0.05}s`,
              display: char === " " ? "inline" : undefined,
              width: char === " " ? "0.3em" : undefined,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
      <div className="loading-line" style={{ animationDelay: "2.0s" }} />
    </div>
  );
}
