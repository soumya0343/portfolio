import { motion } from "framer-motion";
import { experiences } from "../data";

function MandalaNode({ petalCount = 8, color = "#D4A85A" }) {
  const size = 40;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 4;

  const petals = [];
  for (let i = 0; i < petalCount; i++) {
    const angle = (360 / petalCount) * i;
    const rad = (angle * Math.PI) / 180;
    const tipX = cx + r * Math.cos(rad);
    const tipY = cy + r * Math.sin(rad);
    petals.push(
      <line
        key={i}
        x1={cx}
        y1={cy}
        x2={tipX}
        y2={tipY}
        stroke={color}
        strokeWidth={1}
        strokeOpacity={0.8}
      />,
    );
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={1}
        strokeOpacity={0.5}
      />
      <circle
        cx={cx}
        cy={cy}
        r={r * 0.5}
        fill="none"
        stroke={color}
        strokeWidth={0.5}
        strokeOpacity={0.3}
      />
      {petals}
      <circle cx={cx} cy={cy} r={3} fill={color} />
    </svg>
  );
}

const nodeColors = ["#D4A85A", "#2ABFBF", "#C2385A", "#E8732A"];

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Experience() {
  return (
    <section
      className="section"
      id="experience"
      style={{ background: "var(--bg-tertiary)" }}
    >
      <div className="section-inner">
        <div className="section-header">
          <p className="section-eyebrow">Experience</p>
          <h2 className="section-title">My Journey</h2>
          <p className="section-subtitle">
            Each step on this path has shaped who I am as a creator and
            technologist.
          </p>
        </div>

        <div className="timeline">
          <div className="timeline-spine" />
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              className="timeline-entry"
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="timeline-node">
                <MandalaNode
                  petalCount={exp.petalCount}
                  color={nodeColors[i % nodeColors.length]}
                />
              </div>
              <div className="timeline-connector" />
              <div className="timeline-card">
                <p className="timeline-date">{exp.date}</p>
                <h3 className="timeline-title">{exp.title}</h3>
                <p className="timeline-company">{exp.company}</p>
                <p className="timeline-desc">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div
        className="section-divider"
        style={{ marginTop: "var(--space-section)" }}
      />
    </section>
  );
}
