import React from "react";
import Slider from "./Controls/Slider";
import ColorPicker from "./Controls/ColorPicker";
import { Download, Wind, Settings2 } from "lucide-react";
import html2canvas from "html2canvas";

export default function ControlPanel({
  state,
  setState,
  breathingMode,
  setBreathingMode,
}) {
  const handleChange = (key, value) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const handleExport = async () => {
    const el = document.querySelector(".mandala-container svg");
    if (!el) return;

    try {
      // Temporarily give it a solid background for the export
      const wrapper = document.createElement("div");
      wrapper.style.padding = "80px";
      wrapper.style.background = "#0a0a0c"; // Matches app background
      wrapper.style.display = "inline-block";
      wrapper.style.position = "absolute";
      wrapper.style.left = "-9999px";

      const clone = el.cloneNode(true);
      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);

      const canvas = await html2canvas(wrapper, {
        backgroundColor: "#0a0a0c",
        scale: 2, // High res
      });

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "mandala.png";
      link.href = dataUrl;
      link.click();

      document.body.removeChild(wrapper);
    } catch (err) {
      console.error("Failed to export", err);
    }
  };

  return (
    <div className="control-panel">
      <div className="panel-header">
        <Settings2 size={24} className="panel-icon" />
        <h2>Mandala Studio</h2>
      </div>

      <div className="panel-section">
        <h3>Geometry</h3>
        <Slider
          label="Size"
          value={state.size}
          min={200}
          max={1000}
          step={10}
          onChange={(v) => handleChange("size", v)}
          disabled={breathingMode}
        />
        <Slider
          label="Complexity (Rings)"
          value={state.rings}
          min={1}
          max={16}
          step={1}
          onChange={(v) => handleChange("rings", v)}
        />
        <Slider
          label="Rotation Speed (secs)"
          value={state.rotationSpeed}
          min={0}
          max={300}
          step={1}
          onChange={(v) => handleChange("rotationSpeed", v)}
        />
      </div>

      <div className="panel-section">
        <h3>Colors</h3>
        <div className="color-grid">
          <ColorPicker
            label="Primary"
            color={state.colorPrimary}
            onChange={(c) => handleChange("colorPrimary", c)}
          />
          <ColorPicker
            label="Secondary"
            color={state.colorSecondary}
            onChange={(c) => handleChange("colorSecondary", c)}
          />
          <ColorPicker
            label="Accent"
            color={state.colorAccent}
            onChange={(c) => handleChange("colorAccent", c)}
          />
          <ColorPicker
            label="Extra 1"
            color={state.colorExtra1}
            onChange={(c) => handleChange("colorExtra1", c)}
          />
          <ColorPicker
            label="Extra 2"
            color={state.colorExtra2}
            onChange={(c) => handleChange("colorExtra2", c)}
          />
          <ColorPicker
            label="Extra 3"
            color={state.colorExtra3}
            onChange={(c) => handleChange("colorExtra3", c)}
          />
        </div>
      </div>

      <div className="panel-section">
        <h3>Effects</h3>
        <label className="toggle-label">
          <span>Glow Effect</span>
          <input
            type="checkbox"
            checked={state.glow}
            onChange={(e) => handleChange("glow", e.target.checked)}
          />
        </label>
      </div>

      <div className="panel-actions">
        <button
          className={`btn-feature ${breathingMode ? "active" : ""}`}
          onClick={() => setBreathingMode(!breathingMode)}
        >
          <Wind size={18} />
          {breathingMode ? "Stop Breathing Mode" : "Zen / Breathing Mode"}
        </button>

        <button className="btn-export" onClick={handleExport}>
          <Download size={18} />
          Export PNG
        </button>
      </div>
    </div>
  );
}
