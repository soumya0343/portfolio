import { motion } from "framer-motion";
import { blogPosts } from "../data";

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Blog() {
  return (
    <section
      className="section"
      id="blog"
      style={{ background: "var(--bg-tertiary)" }}
    >
      <div className="section-inner">
        <div className="section-header">
          <p className="section-eyebrow">Writing</p>
          <h2 className="section-title">From the Blog</h2>
          <p className="section-subtitle">
            Thoughts on design, development, and the creative process.
          </p>
        </div>

        <div className="blog-list">
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              className="blog-card"
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="blog-meta">
                <div className="blog-day">{post.day}</div>
                <div className="blog-month-year">
                  {post.month} {post.year}
                </div>
                <div className="blog-read-time">{post.readTime}</div>
              </div>
              <div className="blog-content">
                <div className="blog-category">{post.category}</div>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <a
                  href="#"
                  className="blog-read-more"
                  onClick={(e) => e.preventDefault()}
                >
                  Read More →
                </a>
              </div>
            </motion.article>
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
