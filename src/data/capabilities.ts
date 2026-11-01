export type Capability = {
  id: string;
  number: string;
  title: string;
  description: string;
  tools: string[];
};

export const capabilities: Capability[] = [
  {
    id: "web",
    number: "01",
    title: "WEB",
    description: "Fast, responsive websites and web apps built with care for detail.",
    tools: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"],
  },
  {
    id: "app",
    number: "02",
    title: "APP",
    description: "Full-stack products with real logins, data and dashboards.",
    tools: ["Node.js", "Express", "MongoDB", "REST APIs"],
  },
  {
    id: "design",
    number: "03",
    title: "DESIGN",
    description: "Clean interfaces, strong typography and consistent design systems.",
    tools: ["Figma", "Design tokens", "Typography", "Layout"],
  },
  {
    id: "motion",
    number: "04",
    title: "MOTION",
    description: "Smooth, meaningful animation that guides attention.",
    tools: ["GSAP", "Lenis", "Framer Motion", "Three.js"],
  },
  {
    id: "creative",
    number: "05",
    title: "CREATIVE",
    description: "Experiments, interactive ideas and playful builds.",
    tools: ["Prototyping", "Interaction design", "Creative coding"],
  },
];