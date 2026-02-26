import { motion } from "framer-motion";
import Mandala from "../components/Mandala";
import { personal } from "../data";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Background Mandalas */}
      <div className="hero-mandalas">
        <div
          className="hero-mandala-layer"
          style={{ width: 1000, height: 1000 }}
        >
          <Mandala
            size={1000}
            colorPrimary="#D4A85A"
            colorSecondary="#E8732A"
            colorAccent="#7B5EA7"
            rotationSpeed={120}
            opacity={0.15}
            direction="cw"
            rings={8}
          />
        </div>
        <div className="hero-mandala-layer" style={{ width: 500, height: 500 }}>
          <Mandala
            size={500}
            colorPrimary="#D4A85A"
            colorSecondary="#E8732A"
            colorAccent="#7B5EA7"
            colorExtra1="#2ABFBF"
            rotationSpeed={80}
            opacity={0.3}
            direction="ccw"
            rings={6}
          />
        </div>
        <div className="hero-mandala-layer" style={{ width: 240, height: 240 }}>
          <Mandala
            size={240}
            colorPrimary="#D4A85A"
            colorSecondary="#E8732A"
            colorAccent="#7B5EA7"
            colorExtra1="#2ABFBF"
            colorExtra2="#C2385A"
            rotationSpeed={50}
            opacity={0.55}
            direction="cw"
            rings={5}
          />
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="hero-gradient" />

      {/* Foreground Content */}
      <motion.div
        className="hero-content"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p className="hero-eyebrow" variants={item}>
          {personal.title}
        </motion.p>
        <motion.h1 className="hero-name" variants={item}>
          {personal.name}
        </motion.h1>
        <motion.p className="hero-tagline" variants={item}>
          {personal.tagline}
        </motion.p>
        <motion.div className="hero-ctas" variants={item}>
          <a
            href="#projects"
            className="btn-primary"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="btn-ghost"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Get In Touch →
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <svg className="scroll-petal" viewBox="0 0 16 16" fill="none">
          <path d="M8 0 Q12 4 8 16 Q4 4 8 0Z" fill="#D4A85A" opacity="0.7" />
        </svg>
        <span>scroll</span>
      </div>
    </section>
  );
}
