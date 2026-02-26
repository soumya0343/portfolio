import { useState } from "react";

export default function ContactSidebar() {
  const [expanded, setExpanded] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: "", email: "", message: "" });
      setExpanded(false);
    }, 2500);
  };

  return (
    <div className="contact-sidebar">
      {/* Collapsed Tab */}
      {!expanded && (
        <button
          className="sidebar-tab"
          onClick={() => setExpanded(true)}
          aria-label="Open contact form"
        >
          <svg className="sidebar-tab-icon" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 0 Q14 5 10 20 Q6 5 10 0Z"
              fill="#D4A85A"
              opacity="0.7"
            />
            <circle
              cx="10"
              cy="10"
              r="8"
              fill="none"
              stroke="#D4A85A"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </svg>
          <span className="sidebar-tab-text">Contact</span>
        </button>
      )}

      {/* Expanded Panel */}
      <div className={`sidebar-panel ${expanded ? "open" : ""}`}>
        <div className="sidebar-header">
          <h3>Quick Message</h3>
          <button
            className="sidebar-close"
            onClick={() => setExpanded(false)}
            aria-label="Close contact form"
          >
            ×
          </button>
        </div>

        {!sent ? (
          <form className="sidebar-form contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="sidebar-name">
                Name
              </label>
              <input
                className="form-input"
                id="sidebar-name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="sidebar-email">
                Email
              </label>
              <input
                className="form-input"
                id="sidebar-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="sidebar-message">
                Message
              </label>
              <textarea
                className="form-textarea"
                id="sidebar-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="form-submit">
              Send
            </button>
          </form>
        ) : (
          <div className="form-success" style={{ padding: "24px 0" }}>
            <h3 style={{ fontSize: "1.2rem" }}>Sent!</h3>
            <p style={{ fontSize: "0.85rem" }}>Thank you for reaching out.</p>
          </div>
        )}
      </div>
    </div>
  );
}
