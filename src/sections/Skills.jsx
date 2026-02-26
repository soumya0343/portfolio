import { useState } from "react";
import { motion } from "framer-motion";
import Mandala from "../components/Mandala";
import { skills, skillWheelData } from "../data";

function SkillWheel() {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const size = 500;
  const cx = size / 2;
  const cy = size / 2;
  const ringRadii = [100, 160, 210];

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      style={{ maxWidth: "100%" }}
    >
      {/* Background rings */}
      {ringRadii.map((r, i) => (
        <circle
          key={`ring-${i}`}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="var(--border-subtle)"
          strokeWidth={0.5}
          strokeDasharray="4 4"
        />
      ))}

      {/* Center mandala */}
      <g transform={`translate(${cx - 40}, ${cy - 40})`}>
        <Mandala
          size={80}
          colorPrimary="#D4A85A"
          colorSecondary="#E8732A"
          colorAccent="#7B5EA7"
          colorExtra1="#2ABFBF"
          rotationSpeed={40}
          opacity={1}
          rings={4}
        />
      </g>

      {/* Skill labels positioned on rings */}
      {skillWheelData.map((skill) => {
        const r = ringRadii[skill.ring - 1];
        const rad = (skill.angle * Math.PI) / 180;
        const x = cx + r * Math.cos(rad);
        const y = cy + r * Math.sin(rad);
        const isHovered = hoveredSkill === skill.label;

        return (
          <g
            key={skill.label}
            onMouseEnter={() => setHoveredSkill(skill.label)}
            onMouseLeave={() => setHoveredSkill(null)}
            style={{ cursor: "pointer" }}
          >
            {/* Connecting line from center */}
            <line
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke={skill.color}
              strokeWidth={isHovered ? 1 : 0.3}
              strokeOpacity={isHovered ? 0.8 : 0.15}
            />
            {/* Node dot */}
            <circle
              cx={x}
              cy={y}
              r={isHovered ? 6 : 4}
              fill={skill.color}
              opacity={isHovered ? 1 : 0.7}
              style={{ transition: "all 0.2s ease" }}
            />
            {/* Label */}
            <text
              x={x}
              y={y - 10}
              textAnchor="middle"
              fill={isHovered ? skill.color : "var(--text-secondary)"}
              fontSize={isHovered ? "0.75rem" : "0.65rem"}
              fontFamily="var(--font-body)"
              style={{ transition: "all 0.2s ease" }}
            >
              {skill.label}
            </text>
            {isHovered && (
              <circle
                cx={x}
                cy={y}
                r={16}
                fill="none"
                stroke={skill.color}
                strokeWidth={1}
                strokeOpacity={0.4}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const categoryColors = {
  Frontend: "var(--accent-gold)",
  Backend: "var(--accent-saffron)",
  Design: "var(--accent-violet)",
  Tools: "var(--accent-teal)",
};

export default function Skills() {
  return (
    <section
      className="section"
      id="skills"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="section-inner">
        <div className="section-header">
          <p className="section-eyebrow">Expertise</p>
          <h2 className="section-title">Skills & Tools</h2>
          <p className="section-subtitle">
            A radial map of my technical and creative capabilities.
          </p>
        </div>

        <div className="skills-layout">
          <motion.div
            className="skill-wheel-container"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <SkillWheel />
          </motion.div>

          <motion.div
            className="skill-list"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            {Object.entries(skills).map(([category, items]) => (
              <motion.div
                key={category}
                className="skill-category"
                variants={fadeInUp}
              >
                <h3
                  style={{
                    color: categoryColors[category] || "var(--text-primary)",
                  }}
                >
                  {category}
                </h3>
                {items.map((skill) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-item-header">
                      <span className="skill-item-name">{skill.name}</span>
                      <span className="skill-item-level">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          ease: "easeOut",
                          delay: 0.2,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <div
        className="section-divider"
        style={{ marginTop: "var(--space-section)" }}
      />
    </section>
  );
}
