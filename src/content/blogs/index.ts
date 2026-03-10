export interface BlogMeta {
  slug: string
  name: string
  desc: string
  date: string
  tags: string[]
}

export const BLOGS: BlogMeta[] = [
  {
    slug: "setting-up-arkavidia-ctf",
    name: "Setting Up CTF Platform for ARKAVIDIA 10",
    desc: "On February 1, 2026, ARKAVIDIA hosted Capture The Flag online for 100+ teams and 300+ participants...",
    date: "Mar 10, 2026",
    tags: ["CTF", "Infrastructure"],
  },
  {
    slug: "fira-urban-vision-pipeline",
    name: "How our FIRA Autonomous Car Urban Track Handles Vision",
    desc: "My robotics team, this year is competing at FIRA Autonomous Car Urban Track Pro Division, me as programming lead..",
    date: "Mar 10, 2026",
    tags: ["Robotics", "Computer Vision"],
  },
]
