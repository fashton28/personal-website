import type { ProjectItem } from "@/types/site";

export const projects: ProjectItem[] = [
  {
    id: "project-1",
    title: "Autonomous Fleet OS",
    summary:
      "Real-time dashboard for managing a fleet of autonomous vehicles with live telemetry and route optimisation.",
    tags: ["React", "WebSockets", "Maps"],
    image: "/placeholders/car-1.svg",
    anchorId: "project-1",
  },
  {
    id: "project-2",
    title: "Drive Analytics",
    summary:
      "ML-powered driving analytics platform that scores trips and surfaces insights for safer driving.",
    tags: ["Python", "Next.js", "ML"],
    image: "/placeholders/car-2.svg",
    anchorId: "project-2",
  },
  {
    id: "project-3",
    title: "Component Library",
    summary:
      "Design system and component library with 40+ accessible, themeable primitives used across products.",
    tags: ["TypeScript", "Storybook", "a11y"],
    image: "/placeholders/car-3.svg",
    anchorId: "project-3",
  },
  {
    id: "project-4",
    title: "Route Planner",
    summary:
      "Interactive route planning tool with drag-and-drop waypoints, ETA predictions, and traffic-aware routing.",
    tags: ["Mapbox", "React", "Node"],
    image: "/placeholders/car-4.svg",
    anchorId: "project-4",
  },
  {
    id: "project-5",
    title: "Vision Pipeline",
    summary:
      "Edge-deployed computer vision pipeline for real-time object detection and scene understanding.",
    tags: ["Python", "ONNX", "Edge"],
    image: "/placeholders/3.png",
    anchorId: "project-5",
  },
];
