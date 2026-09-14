import type { ProjectItem } from "@/types/site";

export const projects: ProjectItem[] = [
  {
    id: "project-4",
    title: "Horizon",
    summary:
      "Agents for Interview Preparation.Built for the AI presidential challenge",
    tags: ["NextJS", "WebRTC", "FastAPI", "TS"],
    image: "/placeholders/horizon.png",
    href: "https://github.com/fashton28/Horizon",
    anchorId: "project-4",
    badge: "2025 · Hackathon",
    accent: "#ff7a18",
  },
  {
    id: "project-5",
    title: "The Codepreneur Network",
    summary:
      "an organization I founded with the goal of extending coding and entrepreneurship education across south america",
    tags: ["Python", "ONNX", "Edge"],
    image: "/placeholders/3.png",
    anchorId: "project-5",
    badge: "Founder · Org",
    accent: "#ffffff",
  },
];
