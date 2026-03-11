import { useState } from "react";
import { styled } from "@linaria/react";

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(180deg,
    var(--hero-bg-1) 0%,
    var(--hero-bg-2) 40%,
    var(--hero-bg-3) 70%,
    var(--hero-bg-4) 100%
  );
  display: flex;
  align-items: center;
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
  padding: 0 3rem;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 5rem;
  padding-top: 80px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding: 80px 1.5rem 2rem;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

// const LocationRow = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.45rem;
//   font-family: 'DM Mono', monospace;
//   font-size: 0.78rem;
//   color: var(--text-dim);
//   margin-bottom: 1.6rem;

//   svg {
//     width: 13px;
//     height: 13px;
//     stroke: currentColor;
//     fill: none;
//     stroke-width: 1.8;
//     stroke-linecap: round;
//     stroke-linejoin: round;
//     flex-shrink: 0;
//   }
// `;

const Headline = styled.h1`
  font-family: 'Syne', sans-serif;
  font-size: clamp(2.8rem, 5.5vw, 4.2rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--text-soft);
  margin: 0 0 0.1em;

  strong {
    color: var(--text-primary);
    font-weight: 800;
  }
`;

const RoleRow = styled.p`
  font-family: 'DM Mono', monospace;
  font-size: clamp(0.8rem, 1.4vw, 0.92rem);
  color: var(--text-dim);
  letter-spacing: 0.04em;
  margin: 1.1rem 0 1.6rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span.sep { color: var(--line-subtle); }
`;

const TypedSpan = styled.span`
  color: var(--text-muted);
`;

const Caret = styled.span`
  display: inline-block;
  width: 1.5px;
  height: 0.85em;
  background: var(--text-dim);
  vertical-align: text-bottom;
`;

const Bio = styled.p`
  font-family: 'DM Mono', monospace;
  font-size: clamp(0.82rem, 1.3vw, 0.9rem);
  line-height: 1.75;
  color: var(--text-muted);
  max-width: 520px;
  margin: 0 0 2.4rem;

  strong {
    color: var(--text-primary);
    font-weight: 500;
  }
`;

const SocialRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  color: var(--text-dim);
  text-decoration: none;
  transition: color 0.2s ease, background 0.2s ease;

  &:hover {
    color: var(--text-primary);
    background: var(--interactive-bg);
  }

  svg {
    width: 17px;
    height: 17px;
    stroke: currentColor;
    fill: none;
    stroke-width: 1.7;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

const CardWrapper = styled.div`
  @media (max-width: 900px) {
    display: flex;
    justify-content: center;
  }
`;

const PhotoCard = styled.div`
  position: relative;
  width: 300px;
  aspect-ratio: 3/4;
  border-radius: 20px;
  overflow: hidden;
  isolation: isolate;
  border: 1px solid var(--line-subtle);
  box-shadow: var(--hero-photo-shadow);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 1;
    background:
      radial-gradient(130% 100% at 50% 10%, transparent 35%, color-mix(in srgb, var(--hero-bg-3) 45%, transparent) 100%),
      linear-gradient(180deg, transparent 60%, color-mix(in srgb, var(--hero-bg-4) 65%, transparent) 100%);
  }

  @media (max-width: 900px) {
    width: 240px;
  }
`;

const PhotoPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 0;
  background: linear-gradient(160deg,
    var(--hero-photo-grad-1) 0%,
    var(--hero-photo-grad-2) 40%,
    var(--hero-photo-grad-3) 100%
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  mask-image: radial-gradient(120% 120% at 50% 45%, #000 58%, transparent 100%);
  -webkit-mask-image: radial-gradient(120% 120% at 50% 45%, #000 58%, transparent 100%);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    filter: saturate(0.9) contrast(1.02);
  }

  svg {
    width: 48px;
    height: 48px;
    stroke: var(--line-strong);
    fill: none;
    stroke-width: 1.2;
  }

  span {
    font-family: 'DM Mono', monospace;
    font-size: 0.7rem;
    color: var(--text-dim);
    letter-spacing: 0.1em;
  }
`;

const CardArrow = styled.button`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--interactive-bg);
  border: 1px solid var(--line-strong);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: background 0.2s;
  z-index: 2;

  &:hover { background: var(--line-subtle); }

  svg {
    width: 14px;
    height: 14px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

const PrevCardArrow = styled(CardArrow)`
  left: 14px;
  right: auto;

  svg {
    transform: rotate(180deg);
  }
`;

const NextCardArrow = styled(CardArrow)`
  right: 14px;
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

const PHOTOS = ["/adha1.png", "/adha2.jpg"];

export function Hero() {
  const typed = "Software Engineer";
  const [photoIndex, setPhotoIndex] = useState(0);

  const handleNextPhoto = () => {
    setPhotoIndex((prev) => (prev + 1) % PHOTOS.length);
  };

  const handlePrevPhoto = () => {
    setPhotoIndex((prev) => (prev - 1 + PHOTOS.length) % PHOTOS.length);
  };

  return (
    <Section id="home">
      <Vignette />
      <Grain />

      <Inner>
        <Left>
          <Headline>
            Hi!, I&apos;m <strong>Adha.</strong>
          </Headline>

          <RoleRow>
            <TypedSpan>{typed}</TypedSpan>
            <Caret />
            <span className="sep">•</span>
            <span>DevOps Engineer</span>
            <span className="sep">•</span>
            <span>Cybersecurity</span>
            <span className="sep">•</span>
            <span>AI/ML</span>
          </RoleRow>

          <Bio>
            A third-year <strong>Computer Science</strong> student at{" "}
            <strong>Bandung Institute of Technology</strong>, passionate about
            cybersecurity, software development, infrastructure. alongside robotics & embedded eystem as hobby!.
          </Bio>

          <SocialRow>
            <SocialIcon href="https://github.com/adharidwan" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </SocialIcon>
            {/* LinkedIn */}
            <SocialIcon href="https://linkedin.com/in/adharidwan" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </SocialIcon>
            {/* Email */}
            <SocialIcon href="mailto:adharidwan2115@gmail.com" aria-label="Email">
              <svg viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </SocialIcon>
            {/* Instagram */}
            <SocialIcon href="https://instagram.com/adharidwan" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </SocialIcon>
            {/* Twitter / X */}
            <SocialIcon href="https://twitter.com/adharid21" target="_blank" rel="noreferrer" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </SocialIcon>
          </SocialRow>
        </Left>

        <CardWrapper>
          <PhotoCard>
            <PhotoPlaceholder>
              <img src={PHOTOS[photoIndex]} alt={`Adha portrait ${photoIndex + 1}`} />
            </PhotoPlaceholder>
            <PrevCardArrow aria-label="Previous photo" onClick={handlePrevPhoto}>
              <svg viewBox="0 0 24 24">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </PrevCardArrow>
            <NextCardArrow aria-label="Next photo" onClick={handleNextPhoto}>
              <svg viewBox="0 0 24 24">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </NextCardArrow>
          </PhotoCard>
        </CardWrapper>
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
              <stop offset="0%" stopColor="var(--wave-stop-top)" stopOpacity="0"/>
              <stop offset="100%" stopColor="var(--wave-stop-bottom)" stopOpacity="1"/>
            </linearGradient>
          </defs>

          {/* Layer 1 — back cloud, lightest */}
          <path
            d="M0,80 C120,50 200,110 320,90 C440,70 500,115 640,95 C780,75 840,118 960,98 C1080,78 1160,112 1280,92 C1360,78 1400,96 1440,88 L1440,160 L0,160 Z"
            fill="var(--wave-layer-1)"
          />
          {/* Layer 2 */}
          <path
            d="M0,100 C80,78 180,122 300,104 C420,86 520,124 640,108 C760,92 860,126 960,110 C1060,94 1180,120 1300,106 C1380,96 1420,110 1440,104 L1440,160 L0,160 Z"
            fill="var(--wave-layer-2)"
          />
          {/* Layer 3 — foreground fill */}
          <path
            d="M0,120 C100,105 220,135 360,122 C500,109 580,138 720,125 C860,112 940,138 1080,126 C1200,114 1340,132 1440,122 L1440,160 L0,160 Z"
            fill="var(--wave-layer-3)"
          />
          {/* Solid base */}
          <rect x="0" y="150" width="1440" height="10" fill="var(--wave-base)"/>
        </svg>
      </WaveBottom>
    </Section>
  );
}
