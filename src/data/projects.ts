export type Project = {
  slug: string;
  title: string;
  category: "Web" | "App" | "Design" | "Motion";
  description: string;
  year: string;
  status: string;
  gradient: string;
};

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Project One",
    category: "Web",
    description: "Placeholder. Replace with a real web project.",
    year: "2026",
    status: "Placeholder",
    gradient: "linear-gradient(135deg, #1a1a1d, #c6ff3d33)",
  },
  {
    slug: "project-two",
    title: "Project Two",
    category: "App",
    description: "Placeholder. Replace with a real app project.",
    year: "2026",
    status: "Placeholder",
    gradient: "linear-gradient(135deg, #121214, #3dd6ff33)",
  },
  {
    slug: "project-three",
    title: "Project Three",
    category: "Design",
    description: "Placeholder. Replace with a real design project.",
    year: "2026",
    status: "Placeholder",
    gradient: "linear-gradient(135deg, #1a1a1d, #ff3d8133)",
  },
  {
    slug: "project-four",
    title: "Project Four",
    category: "Motion",
    description: "Placeholder. Replace with a real motion project.",
    year: "2026",
    status: "Placeholder",
    gradient: "linear-gradient(135deg, #121214, #ffb03d33)",
  },
];