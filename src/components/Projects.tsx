// import { useState } from "react";
import { styled } from "@linaria/react";

const Section = styled.section`
  position: relative;
  min-height: 100vh;
  background: linear-gradient(180deg,
    color-mix(in srgb, var(--hero-bg-1) 86%, var(--bg-elevated)) 20%,
    color-mix(in srgb, var(--hero-bg-2) 84%, var(--bg-elevated)) 60%,
    color-mix(in srgb, var(--hero-bg-3) 82%, var(--bg-elevated)) 90%,
    color-mix(in srgb, var(--hero-bg-4) 80%, var(--bg-elevated)) 100%
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

// const Left = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0;
// `;

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
  return (
    <Section id="projects">
      <Vignette />
      <Grain />

      <Inner>
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