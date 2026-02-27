import React from "react";

export default function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  disabled,
}) {
  return (
    <div
      className={`slider-container ${disabled ? "disabled" : ""}`}
      style={{ opacity: disabled ? 0.5 : 1 }}
    >
      <div className="slider-header">
        <span className="slider-label">{label}</span>
        <span className="slider-val">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
      />
    </div>
  );
}
