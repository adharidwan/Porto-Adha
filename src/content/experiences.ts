export type EntryType = "Experience" | "Volunteer";

export interface Entry {
  role: string;
  org: string;
  period: string;
  location: string;
  type: EntryType;
  highlights: string[];
}

export const ENTRIES: Entry[] = [
  {
    role: "Programming Lead",
    org: "DAGOZILLA Autonomous Robotics Team",
    period: "2025 - Present",
    location: "Bandung, Indonesia",
    type: "Experience",
    highlights: [
      "Built localization stack using AMCL with encoder, IMU, and vision fusion.",
      "Led perception experiments for robust sign detection and field understanding.",
    ],
  },
  {
    role: "Distributed System Lab Assistant",
    org: "Institut Teknologi Bandung",
    period: "2025 - Present",
    location: "Hybrid",
    type: "Experience",
    highlights: [
      "Teaching Assistant for Operating System Course.",
      "Teaching Assistant for Computer Network Course.",
    ],
  },
  {
    role: "Programming Mentor",
    org: "DAGOZILLA Autonomous Robotics Team",
    period: "2024 - 2025",
    location: "Bandung, Indonesia",
    type: "Volunteer",
    highlights: [
      "Mentored junior members on control, perception, and debugging workflows.",
      "Ran weekly review sessions for project structure and clean coding practice.",
    ],
  },
  {
    role: "Head of Capture The Flag Competition ARKAVIDIA 10",
    org: "HMIF ITB",
    period: "2025",
    location: "Bandung, Indonesia",
    type: "Volunteer",
    highlights: [
      "Led 10+ staff in executing the competition event from planning to completion.",
      "Managed all infrastructure and deployment pipelines for the competition platform.",
    ],
  },
  {
    role: "Head of Capture The Flag Community",
    org: "HMIF ITB",
    period: "2025",
    location: "Bandung, Indonesia",
    type: "Volunteer",
    highlights: [
      "Formalized the community organization structure, defining roles and responsibilities.",
      "Created a comprehensive playbook to standardize community operations and processes.",
      "Led the bootcamp and qualification rounds for new member selection.",
    ],
  },
];

export const SKILL_GROUPS = [
  {
    label: "Robotics",
    items: ["ROS", "Arduino", "Linux", "C", "C++"],
  },
  {
    label: "Programming Languages",
    items: ["Python", "Rust", "Go", "JavaScript", "TypeScript", "Assembly x86"],
  },
  {
    label: "Machine Learning",
    items: ["PyTorch", "TensorFlow", "Scikit-learn", "OpenCV", "Pandas", "YOLO"],
  },
  {
    label: "Backend & Databases",
    items: [
      "Node.js",
      "Express",
      "Fastify",
      "Hono",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "Supabase",
      "Firebase",
      "Gin",
      "GORM",
      "Drizzle",
      "Prisma",
    ],
  },
  {
    label: "Frontend",
    items: ["HTML5", "CSS3", "React", "Vue.js", "Tailwind"],
  },
  {
    label: "Tools",
    items: [
      "Git",
      "VS Code",
      "Docker",
      "Kubernetes",
      "Ansible",
      "Proxmox",
      "pfSense",
      "NGINX",
      "Tailscale",
      "Grafana",
      "Zod",
      "Swagger",
      "Prometheus",
      "Jenkins",
    ],
  },
] as const;
