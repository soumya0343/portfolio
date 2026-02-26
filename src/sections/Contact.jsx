import { useState } from "react";
import { motion } from "framer-motion";
import Mandala from "../components/Mandala";
import { personal } from "../data";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      className="section"
      id="contact"
      style={{ background: "var(--bg-tertiary)" }}
    >
      <div className="section-inner">
        <div className="section-header">
          <p className="section-eyebrow">Connect</p>
          <h2 className="section-title">Get In Touch</h2>
        </div>

        <motion.div
          className="contact-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.15 }}
        >
          {/* Left — Info */}
          <motion.div className="contact-info" variants={fadeInUp}>
            <h2>Let's Connect</h2>
            <p className="contact-tagline">
              I'm always interested in hearing about new projects, creative
              ideas, or opportunities to be part of something amazing.
            </p>
            <div className="contact-links">
              <a href={`mailto:${personal.email}`} className="contact-link">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 7L2 7" />
                </svg>
                {personal.email}
              </a>
              <a
                href={`https://${personal.linkedin}`}
                className="contact-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn
              </a>
              <a
                href={`https://${personal.github}`}
                className="contact-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
                </svg>
                GitHub
              </a>
            </div>
            <div className="contact-mandala-decor">
              <Mandala
                size={200}
                colorPrimary="#D4A85A"
                colorSecondary="#E8732A"
                rotationSpeed={100}
                opacity={0.3}
                rings={4}
              />
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div variants={fadeInUp}>
            {!submitted ? (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">
                    Name
                  </label>
                  <input
                    className="form-input"
                    id="contact-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">
                    Email
                  </label>
                  <input
                    className="form-input"
                    id="contact-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-subject">
                    Subject
                  </label>
                  <input
                    className="form-input"
                    id="contact-subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">
                    Message
                  </label>
                  <textarea
                    className="form-textarea"
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="form-submit">
                  Send Message
                </button>
              </form>
            ) : (
              <div className="form-success">
                <Mandala
                  size={80}
                  colorPrimary="#D4A85A"
                  colorSecondary="#E8732A"
                  rotationSpeed={30}
                  opacity={0.8}
                  rings={4}
                  style={{ margin: "0 auto 24px" }}
                />
                <h3>Thank You!</h3>
                <p>Your message has been sent. I'll get back to you soon.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
