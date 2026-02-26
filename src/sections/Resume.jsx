import { motion } from "framer-motion";
import Mandala from "../components/Mandala";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const education = {
  degree: "B.E. in Electronics and Communications Engineering",
  period: "Oct 2022 — Present",
  school: "Birla Institute of Technology and Science, Pilani",
  campus: "K. K. Birla Goa Campus, Goa, India",
};

const workExperience = [
  {
    title: "Full Stack Developer Intern",
    company: "Chakra Tech",
    period: "Dec 2025 — Feb 2026",
    location: "Remote",
    bullets: [
      "Built full-stack modules for a blockchain esports prediction market (10+ REST APIs, order flow, market view, betslip, stats).",
      "Designed data pipelines integrating Polymarket with PandaScore; implemented BullMQ background jobs with Redis for reliable ingestion, retries, and syncing.",
      "Engineered an MCP server with ~20 micro/sub-APIs powering an AI assistant for contextual match and market queries.",
      "Optimised backend performance (removed N+1 queries, indexing, fuzzy-match fallback) reducing latency from ~15s to milliseconds.",
    ],
  },
  {
    title: "Engineering Intern",
    company: "Dezerv Investments",
    period: "Jul 2025 — Dec 2025",
    location: "Bengaluru, India",
    bullets: [
      "Engineered a scalable Go backend to automate SEBI-compliant reporting for 5,000+ clients, replacing manual workflows and reducing manual reporting time by ~83%.",
      "Built a reusable ReactJs operations dashboard introducing direct-to-S3 bulk uploads, enabling ~70% more reports per cycle.",
      "Developed a ReactJs Rationale Dashboard to explain portfolio rebalancing decisions, reducing client queries by ~35%.",
      "Contributed to Dezerv's first Flutter Web client dashboard (PMS), enabling desktop access for 16.9% non-app users.",
    ],
  },
  {
    title: "Tech Intern",
    company: "Jobslet",
    period: "May 2025 — Jun 2025",
    location: "Remote",
    bullets: [
      "Led development of analytics dashboards using ReactJS and Node.js, reducing manual reporting effort by ~40%.",
      "Optimized backend data pipelines to reduce data latency by ~70%, enabling near real-time updates.",
      "Implemented Elasticsearch-backed indexing and optimised search logic, reducing recruiter shortlisting time by 35%.",
      "Enhanced existing LLM-based resume parsing pipelines to improve structured data extraction and scoring-based matching.",
    ],
  },
  {
    title: "Software Developer Intern",
    company: "Multigraphics Group",
    period: "May 2024 — Jul 2024",
    location: "Delhi, India",
    bullets: [
      "Built a Laravel-based Employee Management System with CRUD APIs and authentication for 50+ concurrent users.",
      "Delivered a secure, responsive UI with advanced filtering, reducing data latency by ~40%.",
      "Built a Question Paper Management System supporting creation, editing, and formatting for 50,000+ documents annually.",
      "Added logging and audit trails with secure PDF exports, improving accountability by ~25%.",
    ],
  },
];

const resumeProjects = [
  {
    title: "Zync",
    subtitle: "Full Stack Task, Goal & Journaling Application",
    github: "https://github.com/soumya0343/zync",
    bullets: [
      "Led development of a productivity platform using React 19, TypeScript, Node.js, Express, with Firebase Auth and Firestore.",
      "Engineered drag-and-drop Kanban + nested task tree for structured task management.",
      "Designed scalable Firestore schema linking goals, tasks, and subtasks for granular progress tracking.",
      "Developed responsive frontend with Vite + Vanilla CSS, implementing dynamic state updates and smooth interactions.",
    ],
  },
  {
    title: "CodeSentinel",
    subtitle: "AI Code Reviewer",
    github: "https://github.com/soumya0343/CodeSentinel",
    bullets: [
      "Launched a VS Code/Cursor extension combining Gemini-based semantic analysis with deterministic static code review.",
      "Implemented multi-file analysis detecting SOLID violations, architectural issues, and security risks.",
      "Designed a pluggable, severity-driven rule engine with extensible language/framework rules.",
      "Engineered an AI-first review pipeline (Gemini first, OpenAI fallback) and packaged as cross-editor VSIX.",
    ],
  },
  {
    title: "StockWise",
    subtitle: "Investment Platform for College Students",
    github: "https://github.com/soumya0343/stockwise",
    bullets: [
      "Built a full-stack web app using React.js + Tailwind and a Node.js backend, designing scalable APIs and UI components.",
      "Implemented a gamification engine (XP logic, milestones, state transitions) and shipped a production-ready MVP in 24 hours.",
      "Secured 2nd place among 47 teams via live demo and validated success metrics.",
    ],
  },
];

const technicalSkills = [
  "C/C++",
  "DSA",
  "JavaScript",
  "ReactJs",
  "Go/GoLang",
  "OOP",
  "REST APIs",
  "NodeJs",
  "Flutter/Dart",
  "Python",
  "NextJs",
  "HTML",
  "CSS",
  "MongoDB",
  "Postgres",
  "Git/GitHub",
  "MCP Server",
  "TypeScript",
  "Firebase",
  "LLM",
  "Express",
  "Docker",
  "Java",
  "Elasticsearch",
  "Redis",
];

export default function Resume() {
  return (
    <section
      className="section"
      id="resume"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="section-inner">
        <div className="section-header">
          <p className="section-eyebrow">Curriculum Vitae</p>
          <h2 className="section-title">My Resume</h2>
          <p className="section-subtitle">
            A comprehensive overview of my education, experience, projects, and
            skills.
          </p>
          <a
            href="/Soumya_Gupta_Resume.pdf"
            download
            className="btn-primary"
            style={{ marginTop: "24px", display: "inline-block" }}
          >
            ↓ Download PDF
          </a>
        </div>

        {/* Education */}
        <motion.div
          className="resume-block"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h3 className="resume-block-title">
            <span className="resume-block-icon">◎</span> Education
          </h3>
          <div className="resume-entry">
            <div className="resume-entry-header">
              <div>
                <h4 className="resume-entry-title">{education.degree}</h4>
                <p className="resume-entry-company">{education.school}</p>
                <p className="resume-entry-location">{education.campus}</p>
              </div>
              <span className="resume-entry-date">{education.period}</span>
            </div>
          </div>
        </motion.div>

        {/* Work Experience */}
        <motion.div
          className="resume-block"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <h3 className="resume-block-title">
            <span className="resume-block-icon">◎</span> Work Experience
          </h3>
          {workExperience.map((job, i) => (
            <div key={i} className="resume-entry">
              <div className="resume-entry-header">
                <div>
                  <h4 className="resume-entry-title">{job.title}</h4>
                  <p className="resume-entry-company">{job.company}</p>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <span className="resume-entry-date">{job.period}</span>
                  <p className="resume-entry-location">{job.location}</p>
                </div>
              </div>
              <ul className="resume-bullets">
                {job.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Projects */}
        <motion.div
          className="resume-block"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          <h3 className="resume-block-title">
            <span className="resume-block-icon">◎</span> Projects
          </h3>
          {resumeProjects.map((proj, i) => (
            <div key={i} className="resume-entry">
              <div className="resume-entry-header">
                <div>
                  <h4 className="resume-entry-title">
                    {proj.title}
                    <span className="resume-entry-subtitle">
                      {" "}
                      — {proj.subtitle}
                    </span>
                  </h4>
                </div>
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-github-link"
                >
                  GitHub →
                </a>
              </div>
              <ul className="resume-bullets">
                {proj.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Technical Skills */}
        <motion.div
          className="resume-block"
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h3 className="resume-block-title">
            <span className="resume-block-icon">◎</span> Technical Skills
          </h3>
          <div className="resume-skills-grid">
            {technicalSkills.map((skill) => (
              <span key={skill} className="resume-skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Decorative mandala */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "64px",
            opacity: 0.2,
          }}
        >
          <Mandala
            size={120}
            colorPrimary="#D4A85A"
            colorSecondary="#E8732A"
            colorAccent="#7B5EA7"
            rotationSpeed={80}
            rings={4}
          />
        </div>
      </div>
      <div
        className="section-divider"
        style={{ marginTop: "var(--space-section)" }}
      />
    </section>
  );
}
