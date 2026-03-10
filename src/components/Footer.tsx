import { styled } from "@linaria/react";
import { Link } from "@tanstack/react-router";

const Wrap = styled.footer`
  position: relative;
  border-top: 1px solid color-mix(in srgb, var(--text-dim) 14%, transparent);
  background: color-mix(in srgb, var(--bg-base) 90%, var(--bg-elevated));
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.2rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;

  @media (max-width: 800px) {
    padding: 1.7rem 1.2rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.9rem;
  }
`;

const BrandBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const Brand = styled.p`
  margin: 0;
  font-family: 'Syne', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-primary);
`;

const Copyright = styled.p`
  margin: 0;
  font-family: 'DM Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.06em;
  color: var(--text-dim);
  text-transform: uppercase;
`;

const LinkRow = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const InternalLink = styled(Link)`
  font-family: 'DM Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--text-dim);
  transition: color 0.2s;

  &:hover {
    color: var(--text-primary);
  }
`;

const ExternalLink = styled.a`
  font-family: 'DM Mono', monospace;
  font-size: 0.68rem;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--text-dim);
  transition: color 0.2s;

  &:hover {
    color: var(--text-primary);
  }
`;

const year = new Date().getFullYear();

export function Footer() {
  return (
    <Wrap>
      <Inner>
        <BrandBlock>
          <Brand>adha.</Brand>
          <Copyright>Copyright {year} Adha Ridwan. All rights reserved.</Copyright>
        </BrandBlock>

        <LinkRow aria-label="Footer links">
          <InternalLink to="/">Home</InternalLink>
          <InternalLink to="/projects">Projects</InternalLink>
          <InternalLink to="/blogs">Blogs</InternalLink>
          <ExternalLink href="https://github.com/adharidwan" target="_blank" rel="noreferrer">
            GitHub
          </ExternalLink>
          <ExternalLink href="https://linkedin.com/in/adharidwan" target="_blank" rel="noreferrer">
            LinkedIn
          </ExternalLink>
        </LinkRow>
      </Inner>
    </Wrap>
  );
}
