import Mandala from "./Mandala";
import { personal } from "../data";

const navItems = [
  "About",
  "Experience",
  "Projects",
  "Blog",
  "Skills",
  "Contact",
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-mandala">
        <Mandala
          size={60}
          colorPrimary="#D4A85A"
          colorSecondary="#E8732A"
          rotationSpeed={80}
          opacity={0.4}
          rings={3}
          style={{ margin: "0 auto" }}
        />
      </div>

      <nav className="footer-nav">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector(`#${item.toLowerCase()}`)
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="footer-social">
        <a href={`mailto:${personal.email}`} aria-label="Email">
          <svg
            width="16"
            height="16"
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
        </a>
        <a
          href={`https://${personal.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <svg
            width="16"
            height="16"
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
        </a>
        <a
          href={`https://${personal.github}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
          </svg>
        </a>
      </div>

      <p className="footer-copyright">
        © {new Date().getFullYear()} {personal.name}. Crafted with sacred
        geometry.
      </p>
    </footer>
  );
}
