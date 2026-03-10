import { styled } from "@linaria/react";
import { Link } from "@tanstack/react-router";
import { HONORS, type HonorItem } from "../content/honors";

const MAX_HONORS = 3;

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

const SeeAll = styled(Link)`
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

    svg {
      transform: translate(2px, -2px);
    }
  }
`;

const Timeline = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    transform: translateX(-50%);
    background: linear-gradient(
      180deg,
      color-mix(in srgb, var(--text-dim) 14%, transparent) 0%,
      color-mix(in srgb, var(--text-dim) 24%, transparent) 50%,
      color-mix(in srgb, var(--text-dim) 14%, transparent) 100%
    );
  }

  @media (max-width: 900px) {
    &::before {
      left: 14px;
      transform: none;
    }
  }
`;

const TimelineItem = styled.article<{ $side: "left" | "right" }>`
  position: relative;
  display: flex;
  justify-content: ${({ $side }) => ($side === "left" ? "flex-start" : "flex-end")};

  &::before {
    content: '';
    position: absolute;
    top: 1.2rem;
    height: 1px;
    width: 2.4rem;
    background: color-mix(in srgb, var(--text-dim) 20%, transparent);
    left: ${({ $side }) => ($side === "left" ? "calc(50% - 2.4rem)" : "50%")};
  }

  @media (max-width: 900px) {
    justify-content: flex-start;

    &::before {
      left: 14px;
      width: 1.6rem;
    }
  }
`;

const Dot = styled.span`
  position: absolute;
  top: 0.86rem;
  left: 50%;
  width: 14px;
  height: 14px;
  transform: translateX(-50%);
  border-radius: 999px;
  background: var(--bg-base);
  border: 2px solid color-mix(in srgb, var(--text-primary) 30%, transparent);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--bg-base) 70%, transparent);

  @media (max-width: 900px) {
    left: 14px;
    transform: none;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem 1.1rem;
  border-radius: 12px;
  background: color-mix(in srgb, var(--bg-elevated) 82%, transparent);
  border: 1px solid color-mix(in srgb, var(--text-dim) 14%, transparent);
  width: calc(50% - 2.4rem);

  @media (max-width: 900px) {
    width: calc(100% - 2.2rem);
    margin-left: 2.2rem;
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const Badge = styled.span<{ $category: HonorItem["category"] }>`
  width: fit-content;
  font-family: 'DM Mono', monospace;
  font-size: 0.62rem;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  border-radius: 999px;
  padding: 0.2rem 0.6rem;
  color: ${({ $category }) =>
    $category === "3rd Winner"
      ? "var(--text-primary)"
      : $category === "Honorable Mention"
        ? "color-mix(in srgb, var(--text-primary) 92%, var(--text-muted))"
        : "var(--text-dim)"};
  border: 1px solid
    ${({ $category }) =>
      $category === "3rd Winner"
        ? "color-mix(in srgb, var(--text-primary) 30%, transparent)"
        : $category === "Honorable Mention"
          ? "color-mix(in srgb, var(--text-primary) 24%, transparent)"
          : "color-mix(in srgb, var(--text-dim) 22%, transparent)"};
  background: ${({ $category }) =>
    $category === "3rd Winner"
      ? "color-mix(in srgb, var(--text-primary) 13%, transparent)"
      : $category === "Honorable Mention"
        ? "color-mix(in srgb, var(--text-primary) 10%, transparent)"
        : "color-mix(in srgb, var(--text-dim) 8%, transparent)"};
`;

const Period = styled.p`
  margin: 0;
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  color: var(--text-dim);
`;

const CardTitle = styled.h3`
  margin: 0;
  font-family: 'DM Serif Display', Georgia, serif;
  font-size: 1.15rem;
  font-weight: 400;
  color: var(--text-primary);
`;

const Issuer = styled.p`
  margin: 0;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.86rem;
  color: var(--text-muted);
`;

const Description = styled.p`
  margin: 0;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.86rem;
  line-height: 1.6;
  color: var(--text-dim);
`;

const AndOthers = styled.p`
  text-align: center;
  font-family: 'DM Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  color: var(--text-dim);
  margin: 0;
  padding-top: 0.4rem;

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

export function HonorsAwards() {
  const visibleHonors = HONORS.slice(0, MAX_HONORS);
  const remainder = HONORS.length - MAX_HONORS;

  return (
    <Section id="honors">
      <Vignette />
      <Grain />

      <Inner>
        <HeaderRow>
          <Title>Honors & Awards</Title>
          <SeeAll to="/honors" aria-label="See all honors and awards">
            See All
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <line x1="2" y1="10" x2="10" y2="2" />
              <polyline points="5,2 10,2 10,7" />
            </svg>
          </SeeAll>
        </HeaderRow>

        <Timeline>
          {visibleHonors.map((honor, index) => {
            const side = index % 2 === 0 ? "left" : "right";

            return (
              <TimelineItem key={`${honor.title}-${honor.issuer}-${honor.period}`} $side={side}>
                <Dot />
                <Card>
                  <CardTop>
                    <Badge $category={honor.category}>{honor.category}</Badge>
                    <Period>{honor.period}</Period>
                  </CardTop>
                  <CardTitle>{honor.title}</CardTitle>
                  <Issuer>{honor.issuer}</Issuer>
                  <Description>{honor.description}</Description>
                </Card>
              </TimelineItem>
            );
          })}
        </Timeline>

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
            <linearGradient id="wg-honors" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--wave-stop-top)" stopOpacity="0" />
              <stop offset="100%" stopColor="var(--wave-stop-bottom)" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path d="M0,80 C120,50 200,110 320,90 C440,70 500,115 640,95 C780,75 840,118 960,98 C1080,78 1160,112 1280,92 C1360,78 1400,96 1440,88 L1440,160 L0,160 Z" fill="var(--wave-layer-1)" />
          <path d="M0,100 C80,78 180,122 300,104 C420,86 520,124 640,108 C760,92 860,126 960,110 C1060,94 1180,120 1300,106 C1380,96 1420,110 1440,104 L1440,160 L0,160 Z" fill="var(--wave-layer-2)" />
          <path d="M0,120 C100,105 220,135 360,122 C500,109 580,138 720,125 C860,112 940,138 1080,126 C1200,114 1340,132 1440,122 L1440,160 L0,160 Z" fill="var(--wave-layer-3)" />
          <rect x="0" y="150" width="1440" height="10" fill="var(--wave-base)" />
        </svg>
      </WaveBottom>
    </Section>
  );
}
