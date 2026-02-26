import { motion } from "framer-motion";
import Mandala from "../components/Mandala";
import { projects } from "../data";

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const mandalColors = [
  { primary: "#D4A85A", secondary: "#E8732A", accent: "#7B5EA7" },
  { primary: "#2ABFBF", secondary: "#7B5EA7", accent: "#D4A85A" },
  { primary: "#C2385A", secondary: "#D4A85A", accent: "#2ABFBF" },
  { primary: "#E8557A", secondary: "#2ABFBF", accent: "#E8732A" },
  { primary: "#7B5EA7", secondary: "#E8557A", accent: "#D4A85A" },
  { primary: "#E8732A", secondary: "#C2385A", accent: "#7B5EA7" },
];

export default function Projects() {
  return (
    <section
      className="section"
      id="projects"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="section-inner">
        <div className="section-header">
          <p className="section-eyebrow">Portfolio</p>
          <h2 className="section-title">Selected Projects</h2>
          <p className="section-subtitle">
            A curated collection of work that reflects my range and creative
            depth.
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project, i) => {
            const colors = mandalColors[i % mandalColors.length];
            return (
              <motion.div
                key={project.id}
                className="project-card"
                variants={cardVariant}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="project-preview">
                  <div className="mandala-overlay">
                    <Mandala
                      size={180}
                      colorPrimary={colors.primary}
                      colorSecondary={colors.secondary}
                      colorAccent={colors.accent}
                      rotationSpeed={0}
                      opacity={0.4}
                      rings={4}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.8rem",
                      color: colors.primary,
                      opacity: 0.3,
                      zIndex: 1,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="project-body">
                  <span className="pill-tag project-category">
                    {project.category}
                  </span>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-footer">
                    <div className="project-tech">
                      {project.tech.map((t) => (
                        <span key={t} className="tech-pill">
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.link}
                      className="project-link"
                      aria-label={`View ${project.title}`}
                    >
                      →
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <div
        className="section-divider"
        style={{ marginTop: "var(--space-section)" }}
      />
    </section>
  );
}
