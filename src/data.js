export const personal = {
  name: "Soumya Gupta",
  initials: "SG",
  title: "Creative Developer & Designer",
  tagline:
    "I craft digital experiences at the intersection of art and technology.",
  email: "soumya@email.com",
  linkedin: "linkedin.com/in/soumyagupta",
  github: "github.com/soumyagupta",
};

export const experiences = [
  {
    id: 1,
    date: "2024 — Present",
    title: "Senior Frontend Developer",
    company: "TechVision Labs",
    description:
      "Leading the frontend architecture for a suite of AI-powered creative tools. Building design systems and interactive data visualizations used by thousands of users daily.",
    petalCount: 16,
  },
  {
    id: 2,
    date: "2022 — 2024",
    title: "Full-Stack Developer",
    company: "DigitalCraft Studio",
    description:
      "Developed end-to-end web applications for clients in e-commerce and fintech. Implemented real-time collaboration features and payment integrations.",
    petalCount: 12,
  },
  {
    id: 3,
    date: "2021 — 2022",
    title: "UI/UX Engineer",
    company: "Mindful Interfaces",
    description:
      "Designed and coded immersive user interfaces for meditation and wellness platforms. Specialized in micro-animations and accessible design patterns.",
    petalCount: 8,
  },
  {
    id: 4,
    date: "2019 — 2021",
    title: "Junior Developer",
    company: "StartupGrid",
    description:
      "Built MVPs and prototypes across multiple startup verticals. Gained deep experience with React, Node.js, and cloud infrastructure.",
    petalCount: 6,
  },
];

export const projects = [
  {
    id: 1,
    title: "Mandala Generator",
    category: "Creative Tool",
    description:
      "An interactive SVG mandala creation tool with export capabilities and infinite geometric pattern variations.",
    tech: ["React", "SVG", "Canvas"],
    link: "#",
  },
  {
    id: 2,
    title: "Zenith Dashboard",
    category: "Web Application",
    description:
      "Real-time analytics dashboard with data visualization, dark mode, and collaborative annotation features.",
    tech: ["Next.js", "D3.js", "WebSocket"],
    link: "#",
  },
  {
    id: 3,
    title: "Serenity Sounds",
    category: "Mobile App",
    description:
      "A meditation and ambient soundscape app with procedural audio generation and binaural beat therapy.",
    tech: ["React Native", "Web Audio", "Node.js"],
    link: "#",
  },
  {
    id: 4,
    title: "ArtChain Marketplace",
    category: "Web3",
    description:
      "A decentralized marketplace for digital art, featuring on-chain provenance and fractional ownership.",
    tech: ["Solidity", "React", "IPFS"],
    link: "#",
  },
  {
    id: 5,
    title: "CineScope",
    category: "Design System",
    description:
      "A comprehensive cinema-themed component library with animation primitives and layout utilities.",
    tech: ["Storybook", "CSS", "TypeScript"],
    link: "#",
  },
  {
    id: 6,
    title: "FlowState IDE",
    category: "Developer Tool",
    description:
      "A browser-based code editor focused on creative coding with live preview and shader graph editing.",
    tech: ["Monaco", "WebGL", "Vite"],
    link: "#",
  },
];

export const blogPosts = [
  {
    id: 1,
    date: "2024-12-15",
    day: "15",
    month: "Dec",
    year: "2024",
    category: "Design",
    title: "Sacred Geometry in Digital Interfaces",
    excerpt:
      "Exploring how ancient geometric principles can inform modern UI design, creating interfaces that feel naturally harmonious and balanced.",
    readTime: "6 min read",
  },
  {
    id: 2,
    date: "2024-11-28",
    day: "28",
    month: "Nov",
    year: "2024",
    category: "Development",
    title: "Building Performant SVG Animations",
    excerpt:
      "A deep dive into creating smooth, GPU-accelerated SVG animations that won\'t tank your frame rate, even with complex geometries.",
    readTime: "8 min read",
  },
  {
    id: 3,
    date: "2024-10-10",
    day: "10",
    month: "Oct",
    year: "2024",
    category: "Creative Coding",
    title: "Generative Art with JavaScript",
    excerpt:
      "How I built a procedural mandala generator using trigonometric functions, noise algorithms, and the humble HTML canvas.",
    readTime: "10 min read",
  },
];

export const skills = {
  Frontend: [
    { name: "React / Next.js", level: 95 },
    { name: "JavaScript / TypeScript", level: 92 },
    { name: "CSS / Animations", level: 90 },
    { name: "SVG / Canvas / WebGL", level: 85 },
  ],
  Backend: [
    { name: "Node.js / Express", level: 88 },
    { name: "Python / FastAPI", level: 78 },
    { name: "PostgreSQL / MongoDB", level: 82 },
    { name: "REST / GraphQL APIs", level: 86 },
  ],
  Design: [
    { name: "Figma / Adobe Suite", level: 80 },
    { name: "Motion Design", level: 75 },
    { name: "Design Systems", level: 88 },
    { name: "UX Research", level: 70 },
  ],
  Tools: [
    { name: "Git / CI-CD", level: 90 },
    { name: "Docker / AWS", level: 78 },
    { name: "Testing (Jest / Cypress)", level: 82 },
    { name: "Vite / Webpack", level: 85 },
  ],
};

export const skillWheelData = [
  { label: "React", angle: 0, ring: 1, color: "#D4A85A" },
  { label: "TypeScript", angle: 45, ring: 1, color: "#D4A85A" },
  { label: "CSS", angle: 90, ring: 1, color: "#D4A85A" },
  { label: "SVG", angle: 135, ring: 1, color: "#D4A85A" },
  { label: "Node.js", angle: 180, ring: 1, color: "#E8732A" },
  { label: "Python", angle: 225, ring: 1, color: "#E8732A" },
  { label: "SQL", angle: 270, ring: 1, color: "#E8732A" },
  { label: "GraphQL", angle: 315, ring: 1, color: "#E8732A" },
  { label: "Next.js", angle: 22, ring: 2, color: "#2ABFBF" },
  { label: "D3.js", angle: 67, ring: 2, color: "#2ABFBF" },
  { label: "WebGL", angle: 112, ring: 2, color: "#2ABFBF" },
  { label: "Canvas", angle: 157, ring: 2, color: "#2ABFBF" },
  { label: "Express", angle: 202, ring: 2, color: "#7B5EA7" },
  { label: "FastAPI", angle: 247, ring: 2, color: "#7B5EA7" },
  { label: "MongoDB", angle: 292, ring: 2, color: "#7B5EA7" },
  { label: "Redis", angle: 337, ring: 2, color: "#7B5EA7" },
  { label: "Docker", angle: 15, ring: 3, color: "#E8557A" },
  { label: "AWS", angle: 55, ring: 3, color: "#E8557A" },
  { label: "Git", angle: 95, ring: 3, color: "#E8557A" },
  { label: "CI/CD", angle: 135, ring: 3, color: "#E8557A" },
  { label: "Figma", angle: 175, ring: 3, color: "#C2385A" },
  { label: "Jest", angle: 215, ring: 3, color: "#C2385A" },
  { label: "Webpack", angle: 255, ring: 3, color: "#C2385A" },
  { label: "Vite", angle: 295, ring: 3, color: "#C2385A" },
];
