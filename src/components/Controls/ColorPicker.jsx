import React from "react";

export default function ColorPicker({ label, color, onChange }) {
  return (
    <div className="color-picker">
      <label>{label}</label>
      <div className="color-input-wrapper" style={{ backgroundColor: color }}>
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
