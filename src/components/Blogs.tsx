import { styled } from "@linaria/react";
import { Link } from "@tanstack/react-router";
import { BLOGS } from "../content/blogs";

const MAX_CARDS = 3;

// ── Styled ────────────────────────────────────────────────────────────────────

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
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const Card = styled(Link)`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 1.4rem 0;
  text-decoration: none;
  border-bottom: 1px solid color-mix(in srgb, var(--text-dim) 14%, transparent);
  transition: background 0.2s;

  &:first-child {
    border-top: 1px solid color-mix(in srgb, var(--text-dim) 14%, transparent);
  }

  &:hover .card-title {
    opacity: 0.75;
  }
`;

const CardName = styled.h3`
  font-family: 'DM Serif Display', Georgia, serif;
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  font-weight: 400;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.3;
  transition: opacity 0.2s;
`;

const CardDesc = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 0.82rem;
  line-height: 1.65;
  color: var(--text-dim);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.25rem;
  flex-wrap: wrap;
`;

const CardDate = styled.span`
  font-family: 'DM Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.05em;
  color: color-mix(in srgb, var(--text-dim) 70%, transparent);
`;

const Dot = styled.span`
  font-family: 'DM Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.05em;
  color: color-mix(in srgb, var(--text-dim) 70%, transparent);
`;

const TagList = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  font-family: 'DM Mono', monospace;
  font-size: 0.62rem;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--text-dim);
  background: color-mix(in srgb, var(--text-dim) 10%, transparent);
  border: 1px solid color-mix(in srgb, var(--text-dim) 18%, transparent);
  border-radius: 4px;
  padding: 0.18em 0.55em;
  transition: background 0.2s, color 0.2s;

  a:hover & {
    background: color-mix(in srgb, var(--text-primary) 10%, transparent);
    border-color: color-mix(in srgb, var(--text-primary) 22%, transparent);
    color: var(--text-primary);
  }
`;

const AndOthers = styled.p`
  text-align: center;
  font-family: 'DM Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  color: var(--text-dim);
  margin: 0;
  padding-top: 0.5rem;

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

// ── Component ─────────────────────────────────────────────────────────────────

export function Blogs() {
  const visible = BLOGS.slice(0, MAX_CARDS);
  const remainder = BLOGS.length - MAX_CARDS;

  return (
    <Section id="blogs">
      <Vignette />
      <Grain />

      <Inner>
        <HeaderRow>
          <Title>Blogs</Title>
          <SeeAll to="/blogs" aria-label="See all blogs">
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
              key={p.slug}
              to="/blogs/$slug"
              params={{ slug: p.slug }}
              aria-label={p.title}
            >
              <CardName className="card-title">{p.title}</CardName>
              <CardDesc>{p.preview || p.desc}</CardDesc>
              <CardMeta>
                {p.date && <CardDate>{p.date}</CardDate>}
                {p.readingTime && (
                  <>
                    <Dot>•</Dot>
                    <CardDate>{p.readingTime}</CardDate>
                  </>
                )}
                {p.tags?.length > 0 && (
                  <TagList>
                    {p.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </TagList>
                )}
              </CardMeta>
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
          <path d="M0,80 C120,50 200,110 320,90 C440,70 500,115 640,95 C780,75 840,118 960,98 C1080,78 1160,112 1280,92 C1360,78 1400,96 1440,88 L1440,160 L0,160 Z" fill="var(--wave-layer-1)" />
          <path d="M0,100 C80,78 180,122 300,104 C420,86 520,124 640,108 C760,92 860,126 960,110 C1060,94 1180,120 1300,106 C1380,96 1420,110 1440,104 L1440,160 L0,160 Z" fill="var(--wave-layer-2)" />
          <path d="M0,120 C100,105 220,135 360,122 C500,109 580,138 720,125 C860,112 940,138 1080,126 C1200,114 1340,132 1440,122 L1440,160 L0,160 Z" fill="var(--wave-layer-3)" />
          <rect x="0" y="150" width="1440" height="10" fill="var(--wave-base)" />
        </svg>
      </WaveBottom>
    </Section>
  );
}
