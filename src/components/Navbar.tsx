import { useState, useEffect, type MouseEvent } from "react";
import { styled } from "@linaria/react";

type ThemeMode = "dark" | "light";

const NavWrapper = styled.header<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: min(1120px, calc(100% - 2.4rem));
  z-index: 100;
  padding: 0 1.6rem;
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.4s ease, box-shadow 0.4s ease;
  background: ${({ $scrolled }) =>
    $scrolled ? "color-mix(in srgb, var(--bg-base) 88%, transparent)" : "transparent"};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? "blur(20px)" : "none")};
  box-shadow: ${({ $scrolled }) =>
    $scrolled ? "0 1px 0 var(--line-subtle)" : "none"};

  @media (max-width: 768px) {
    left: 0;
    transform: none;
    width: 100%;
    padding: 0 1.5rem;
    height: 68px;
  }
`;

const Logo = styled.a`
  font-family: 'Syne', sans-serif;
  font-size: 1.9rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--text-primary);
  text-decoration: none;
  flex-shrink: 0;
`;

const NavCenter = styled.nav`
  display: flex;
  align-items: center;
  gap: 0.55rem;
  position: absolute;
  left: 48%;
  transform: translateX(-50%);

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.a`
  font-family: 'DM Mono', monospace;
  font-size: 1.04rem;
  letter-spacing: 0.04em;
  color: var(--text-muted);
  text-decoration: none;
  padding: 0.58rem 1.08rem;
  border-radius: 6px;
  transition: color 0.2s ease, background 0.2s ease;

  &:hover {
    color: var(--text-primary);
    background: var(--interactive-bg);
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

// const IconBtn = styled.a`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 36px;
//   height: 36px;
//   border-radius: 8px;
//   color: var(--text-muted);
//   text-decoration: none;
//   transition: color 0.2s ease, background 0.2s ease;
//   font-size: 0.75rem;
//   font-family: 'DM Mono', monospace;
//   letter-spacing: 0.05em;

//   &:hover {
//     color: var(--text-primary);
//     background: var(--interactive-bg);
//   }

//   svg {
//     width: 16px;
//     height: 16px;
//     stroke: currentColor;
//     fill: none;
//     stroke-width: 1.8;
//     stroke-linecap: round;
//     stroke-linejoin: round;
//   }
// `;

const ThemeToggle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid var(--line-subtle);
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease;

  &:hover {
    color: var(--text-primary);
    background: var(--interactive-bg);
    border-color: var(--line-strong);
  }

  svg {
    width: 18px;
    height: 18px;
    stroke: currentColor;
    fill: none;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;

const HamburgerBtn = styled.button<{ $open: boolean }>`
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 200;

  span {
    display: block;
    height: 1.5px;
    background: var(--text-primary);
    border-radius: 2px;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }
  span:nth-child(1) {
    width: 22px;
    transform: ${({ $open }) => ($open ? "translateY(6.5px) rotate(45deg)" : "none")};
  }
  span:nth-child(2) {
    width: 16px;
    opacity: ${({ $open }) => ($open ? "0" : "1")};
  }
  span:nth-child(3) {
    width: 22px;
    transform: ${({ $open }) => ($open ? "translateY(-6.5px) rotate(-45deg)" : "none")};
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled.div<{ $open: boolean }>`
  display: none;
  position: fixed;
  inset: 0;
  background: color-mix(in srgb, var(--bg-base) 94%, transparent);
  backdrop-filter: blur(24px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  z-index: 99;
  transform: ${({ $open }) => ($open ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileNavItem = styled.a`
  font-family: 'Syne', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-soft);
  text-decoration: none;
  letter-spacing: -0.02em;
  transition: color 0.2s;
  &:hover { color: var(--text-primary); }
`;

const MobileThemeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-top: 0.3rem;
  color: var(--text-muted);
  font-family: 'DM Mono', monospace;
  font-size: 0.78rem;
  letter-spacing: 0.06em;

  @media (min-width: 769px) {
    display: none;
  }
`;

const NAV_LINKS = [
  { label: "Projects",   to: "#projects" },
  { label: "Blogs",   to: "#blogs"     },
  { label: "Experience", to: "#experience" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    const storedTheme = window.localStorage.getItem("theme-mode");
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme-mode", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const smoothScrollTo = (selector: string) => {
    const target = document.querySelector(selector) as HTMLElement | null;
    if (!target) {
      return;
    }

    const headerOffset = 84;
    const startY = window.scrollY;
    const targetY = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset);
    const distance = targetY - startY;
    const duration = 700;

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * easedProgress);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  const handleClick = (e: MouseEvent<HTMLAnchorElement>, to: string) => {
    if (to.startsWith("#")) {
      e.preventDefault();
      setMenuOpen(false);
      smoothScrollTo(to);
    } else {
      setMenuOpen(false);
    }
  };

  return (
    <>
      <NavWrapper $scrolled={scrolled}>
        <Logo href="/">adha.</Logo>

        <NavCenter>
          {NAV_LINKS.map((l) => (
            <NavItem key={l.label} href={l.to} onClick={(e: MouseEvent<HTMLAnchorElement>) => handleClick(e, l.to)}>
              {l.label}
            </NavItem>
          ))}
        </NavCenter>

        <NavRight>
          {/* <IconBtn href="#" aria-label="Search">
            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </IconBtn> */}
          <ThemeToggle
            type="button"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
              </svg>
            )}
          </ThemeToggle>
        </NavRight>

        <HamburgerBtn $open={menuOpen} onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
          <span /><span /><span />
        </HamburgerBtn>
      </NavWrapper>

      <MobileMenu $open={menuOpen}>
        {NAV_LINKS.map((l) => (
          <MobileNavItem key={l.label} href={l.to} onClick={(e: MouseEvent<HTMLAnchorElement>) => handleClick(e, l.to)}>
            {l.label}
          </MobileNavItem>
        ))}
        <MobileThemeRow>
          Theme
          <ThemeToggle
            type="button"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <svg viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" />
              </svg>
            )}
          </ThemeToggle>
        </MobileThemeRow>
      </MobileMenu>
    </>
  );
}
