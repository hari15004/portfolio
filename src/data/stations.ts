export type Station = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  accent: string;
};

export const stations: Station[] = [
  {
    id: "web",
    title: "Web",
    tagline: "Where sites come alive",
    description: "Fast, responsive websites and web apps built with Next.js and React.",
    accent: "#ff5c1f",
  },
  {
    id: "apps",
    title: "Apps",
    tagline: "Products that work",
    description: "Full-stack apps with real logins, data and dashboards.",
    accent: "#3dd6ff",
  },
  {
    id: "design",
    title: "Design",
    tagline: "Form meets feeling",
    description: "Clean interfaces, strong typography and consistent design systems.",
    accent: "#ff3d81",
  },
  {
    id: "motion",
    title: "Motion / 3D",
    tagline: "Movement with meaning",
    description: "Smooth animation and selective 3D that guides attention.",
    accent: "#ffb03d",
  },
  {
    id: "experiments",
    title: "Creative Experiments",
    tagline: "The playground",
    description: "Interactive ideas, prototypes and playful builds.",
    accent: "#a78bfa",
  },
];