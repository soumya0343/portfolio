import { motion } from "framer-motion";
import Mandala from "../components/Mandala";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function About() {
  return (
    <section
      className="section"
      id="about"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="section-inner">
        <motion.div
          className="about-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.15 }}
        >
          {/* Portrait with Mandala Frame */}
          <motion.div className="about-portrait" variants={fadeInUp}>
            <Mandala
              size={360}
              colorPrimary="#D4A85A"
              colorSecondary="#E8732A"
              rotationSpeed={90}
              opacity={0.8}
              rings={4}
              style={{ position: "absolute", top: 0, left: 0 }}
            />
            <div
              className="about-portrait-glow"
              style={{
                width: 260,
                height: 260,
                background:
                  "linear-gradient(135deg, var(--bg-tertiary), var(--bg-secondary))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "3rem",
                  color: "var(--accent-gold)",
                  opacity: 0.6,
                }}
              >
                SG
              </span>
            </div>
          </motion.div>

          {/* Bio Text */}
          <motion.div className="about-text" variants={fadeInUp}>
            <p className="section-eyebrow">About Me</p>
            <h2 className="section-title">Who I Am</h2>
            <p className="about-bio">
              I'm a creative developer and designer who believes that technology
              should feel like art. With a background spanning frontend
              engineering, visual design, and creative coding, I build digital
              experiences that are both technically robust and aesthetically
              resonant.
            </p>
            <p className="about-bio">
              My work is driven by a fascination with sacred geometry,
              procedural art, and the quiet beauty of well-crafted interfaces. I
              see every pixel as an opportunity to create something meaningful —
              a bridge between human intention and digital expression.
            </p>
            <p className="about-bio">
              When I'm not coding, you'll find me sketching mandalas, exploring
              generative art algorithms, or diving deep into the latest web
              animation techniques.
            </p>
            <div className="stat-chips">
              <span className="stat-chip">5+ Years Experience</span>
              <span className="stat-chip">20+ Projects</span>
              <span className="stat-chip">10+ Clients</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
      <div
        className="section-divider"
        style={{ marginTop: "var(--space-section)" }}
      />
    </section>
  );
}
