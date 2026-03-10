import { styled } from "@linaria/react";

const MAX_CARDS = 6;

const PROJECTS = [
  {
    name: "32 Bit Operating System",
    desc: "Operating System that is handmade from scratch using C and Assembly, has basic functionality with extra advanced features ",
    image: "/projects/os.png",
    tech: ["C", "Assembly"],
    href: "https://github.com/adharidwan/os-2025-keosskuband",
  },
  {
    name: "Meshle - BLE Based Offline First LMS ",
    desc: "Mobile LMS App leveraging BLE Mesh protocol for offline communication, aimed to tackle 4th & 9th SDGs.",
    image: "/projects/meshle.png",
    tech: ["Kotlin", "Jetpack Compose"],
    href: "https://github.com/adharidwan/Meshle-BLE-Mesh-Learning-System",
  },
  {
    name: "Little Alchemy 2 Recipe Finder",
    desc: "2nd Big Project for Algorithm Strategy Course, BFS and DFS Implementation to search a recipe for certain element.",
    image: "/projects/stima2.png",
    tech: ["React", "React Flow", "Gin", "Go", "Docker"],
    href: "https://github.com/adharidwan/Tubes2_AshtonHallMorningRoutine",
  },
  {
    name: "Nimonspedia",
    desc: "Big Project for Web Based Development Course, an ecommerce and real time auction website with functionality up to payment.",
    image: "/projects/nimonspedia.png",
    tech: ["PHP", "Typescript", "React", "Fastify", "Docker", "NGINX"],
    href: "https://github.com/adharidwan/Tubes-IF3110-WBD_Nimonspedia",
  },
];

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--hero-bg-1) 86%, var(--bg-elevated)) 20%,
    color-mix(in srgb, var(--hero-bg-2) 84%, var(--bg-elevated)) 60%,
    color-mix(in srgb, var(--hero-bg-3) 82%, var(--bg-elevated)) 90%,
    color-mix(in srgb, var(--hero-bg-4) 80%, var(--bg-elevated)) 100%
  );
  display: flex;
  align-items: flex-start;
  overflow: hidden;
`;

const Vignette = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse 60% 55% at 20% 30%, var(--hero-vignette-1) 0%, transparent 70%),
    radial-gradient(ellipse 50% 40% at 80% 70%, var(--hero-vignette-2) 0%, transparent 70%);
`;

const Grain = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
`;

const Inner = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 3rem 7rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  @media (max-width: 900px) {
    padding: 80px 1.5rem 5rem;
    gap: 2rem;
  }
`;

const HeaderRow = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: baseline;
`;

const Title = styled.h2`
  font-family: 'DM Serif Display', 'Playfair Display', Georgia, serif;
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin: 0;

  &::after {
    content: '';
    display: block;
    margin-top: 0.3rem;
    height: 2px;
    width: 2.4rem;
    background: var(--text-primary);
    opacity: 0.35;
    border-radius: 2px;
  }
`;

const SeeAll = styled.a`
  position: absolute;
  right: 0;
  bottom: 0.2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-dim);
  text-decoration: none;
  transition: color 0.2s;
  cursor: pointer;

  svg {
    width: 11px;
    height: 11px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: transform 0.2s;
  }

  &:hover {
    color: var(--text-primary);
    svg { transform: translate(2px, -2px); }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.1rem;

  @media (max-width: 1024px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 580px)  { grid-template-columns: 1fr; }
`;

const Card = styled.a`
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  background: color-mix(in srgb, var(--bg-elevated) 80%, transparent);
  border: 1px solid color-mix(in srgb, var(--text-dim) 16%, transparent);
  transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s;
  cursor: pointer;

  &:hover {
    border-color: color-mix(in srgb, var(--text-primary) 35%, transparent);
    transform: translateY(-4px);
    box-shadow: 0 20px 48px -14px color-mix(in srgb, var(--text-primary) 10%, transparent);
  }

  &:hover .card-img {
    transform: scale(1.04);
  }

  &:hover .card-overlay {
    opacity: 1;
  }
`;

const ImageWrap = styled.div`
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
  flex-shrink: 0;
`;

const CardImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
`;

const HoverOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: color-mix(in srgb, var(--bg-base) 60%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.25s;

  svg {
    width: 28px;
    height: 28px;
    stroke: var(--text-primary);
    fill: none;
    stroke-width: 1.6;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

const TechRow = styled.div`
  position: absolute;
  bottom: 0.6rem;
  left: 0.7rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
`;

const TechBadge = styled.span`
  display: inline-flex;
  align-items: center;
  font-family: 'DM Mono', monospace;
  font-size: 0.63rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.18rem 0.52rem;
  border-radius: 999px;
  background: var(--bg-base);
  color: var(--text-primary);
  border: 1px solid color-mix(in srgb, var(--text-primary) 18%, transparent);
  backdrop-filter: blur(8px);
`;

const CardBody = styled.div`
  padding: 0.95rem 1.1rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  flex: 1;
`;

const CardName = styled.h3`
  font-family: 'DM Serif Display', Georgia, serif;
  font-size: 1rem;
  font-weight: 400;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.25;
`;

const CardDesc = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 0.8rem;
  line-height: 1.6;
  color: var(--text-dim);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const AndOthers = styled.p`
  text-align: center;
  font-family: 'DM Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  color: var(--text-dim);
  margin: 0;

  strong {
    color: var(--text-primary);
    font-weight: 500;
  }
`;

const WaveBottom = styled.div`
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  pointer-events: none;
`;

export function Projects() {
  const visible = PROJECTS.slice(0, MAX_CARDS);
  const remainder = PROJECTS.length - MAX_CARDS;

  return (
    <Section id="projects">
      <Vignette />
      <Grain />

      <Inner>
        <HeaderRow>
          <Title>Projects</Title>
          <SeeAll href="/projects" aria-label="See all projects">
            See All
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <line x1="2" y1="10" x2="10" y2="2" />
              <polyline points="5,2 10,2 10,7" />
            </svg>
          </SeeAll>
        </HeaderRow>

        <Grid>
          {visible.map((p) => (
            <Card
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={p.name}
            >
              <ImageWrap>
                <CardImg
                  className="card-img"
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                />
                <HoverOverlay className="card-overlay">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <line x1="5" y1="19" x2="19" y2="5" />
                    <polyline points="9,5 19,5 19,15" />
                  </svg>
                </HoverOverlay>
                <TechRow>
                  {p.tech.map((t) => (
                    <TechBadge key={t}>{t}</TechBadge>
                  ))}
                </TechRow>
              </ImageWrap>

              <CardBody>
                <CardName>{p.name}</CardName>
                <CardDesc>{p.desc}</CardDesc>
              </CardBody>
            </Card>
          ))}
        </Grid>

        {remainder > 0 && (
          <AndOthers>
            and <strong>{remainder} others</strong>
          </AndOthers>
        )}
      </Inner>

      <WaveBottom>
        <svg
          viewBox="0 0 1440 160"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "clamp(80px, 12vw, 160px)" }}
        >
          <defs>
            <linearGradient id="wg1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--wave-stop-top)" stopOpacity="0" />
              <stop offset="100%" stopColor="var(--wave-stop-bottom)" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M0,80 C120,50 200,110 320,90 C440,70 500,115 640,95 C780,75 840,118 960,98 C1080,78 1160,112 1280,92 C1360,78 1400,96 1440,88 L1440,160 L0,160 Z"
            fill="var(--wave-layer-1)"
          />
          <path
            d="M0,100 C80,78 180,122 300,104 C420,86 520,124 640,108 C760,92 860,126 960,110 C1060,94 1180,120 1300,106 C1380,96 1420,110 1440,104 L1440,160 L0,160 Z"
            fill="var(--wave-layer-2)"
          />
          <path
            d="M0,120 C100,105 220,135 360,122 C500,109 580,138 720,125 C860,112 940,138 1080,126 C1200,114 1340,132 1440,122 L1440,160 L0,160 Z"
            fill="var(--wave-layer-3)"
          />
          <rect x="0" y="150" width="1440" height="10" fill="var(--wave-base)" />
        </svg>
      </WaveBottom>
    </Section>
  );
}