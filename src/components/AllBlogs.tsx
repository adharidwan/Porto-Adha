import { styled } from "@linaria/react";
import { Link } from "@tanstack/react-router";
import { BLOGS } from "../content/blogs/index";

/* ─── Page shell ──────────────────────────────────────────── */
const Page = styled.main`
  min-height: 100vh;
  background: var(--bg-base);
`;

const Inner = styled.div`
  max-width: 760px;
  margin: 0 auto;
  padding: 6rem 2rem 8rem;

  @media (max-width: 600px) {
    padding: 4rem 1.25rem 6rem;
  }
`;

/* ─── Header ──────────────────────────────────────────────── */
const Header = styled.div`
  margin-bottom: 3.5rem;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-family: 'DM Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--text-dim);
  text-decoration: none;
  margin-bottom: 2rem;
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
    svg { transform: translateX(-2px); }
  }
`;

const Title = styled.h1`
  font-family: 'DM Serif Display', 'Playfair Display', Georgia, serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin: 0 0 0.5rem;

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

const Subtitle = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 0.88rem;
  color: var(--text-dim);
  margin: 1rem 0 0;
`;

/* ─── List ────────────────────────────────────────────────── */
const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled(Link)`
  display: block;
  padding: 1.75rem 0;
  border-bottom: 1px solid color-mix(in srgb, var(--text-dim) 15%, transparent);
  text-decoration: none;
  transition: opacity 0.2s;

  &:first-child {
    border-top: 1px solid color-mix(in srgb, var(--text-dim) 15%, transparent);
  }

  &:hover {
    opacity: 0.65;
  }
`;

const ItemMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.45rem;
  flex-wrap: wrap;
`;

const ItemDate = styled.time`
  font-family: 'DM Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.05em;
  color: var(--text-dim);
`;

const Dot = styled.span`
  font-family: 'DM Mono', monospace;
  font-size: 0.7rem;
  color: var(--text-dim);
`;

const TagRow = styled.div`
  display: flex;
  gap: 0.3rem;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  font-family: 'DM Mono', monospace;
  font-size: 0.63rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--text-primary) 8%, transparent);
  color: var(--text-dim);
  border: 1px solid color-mix(in srgb, var(--text-primary) 12%, transparent);
`;

const ItemName = styled.h2`
  font-family: 'DM Serif Display', Georgia, serif;
  font-size: 1.25rem;
  font-weight: 400;
  color: var(--text-primary);
  margin: 0 0 0.4rem;
  line-height: 1.3;
`;

const ItemDesc = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 0.82rem;
  line-height: 1.65;
  color: var(--text-dim);
  margin: 0;
`;

/* ─── Empty state ─────────────────────────────────────────── */
const Empty = styled.p`
  font-family: 'DM Mono', monospace;
  font-size: 0.8rem;
  color: var(--text-dim);
  text-align: center;
  padding: 4rem 0;
`;

/* ─── Component ───────────────────────────────────────────── */
export function AllBlogs() {
  return (
    <Page>
      <Inner>
        <Header>
          <BackLink to="/">
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <line x1="10" y1="6" x2="2" y2="6" />
              <polyline points="5,3 2,6 5,9" />
            </svg>
            Home
          </BackLink>

          <Title>Blog</Title>
          <Subtitle>
            {BLOGS.length} post{BLOGS.length !== 1 ? "s" : ""} on robotics, CTF, and systems.
          </Subtitle>
        </Header>

        <List>
          {BLOGS.length === 0 ? (
            <Empty>No posts yet.</Empty>
          ) : (
            BLOGS.map((blog) => (
              <Item
                key={blog.slug}
                to="/blogs/$slug"
                params={{ slug: blog.slug }}
              >
                <ItemMeta>
                  <ItemDate>{blog.date}</ItemDate>
                  <Dot>•</Dot>
                  <ItemDate>{blog.readingTime}</ItemDate>
                  {blog.tags.length > 0 && (
                    <TagRow>
                      {blog.tags.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </TagRow>
                  )}
                </ItemMeta>
                <ItemName>{blog.title}</ItemName>
                <ItemDesc>{blog.preview || blog.desc}</ItemDesc>
              </Item>
            ))
          )}
        </List>
      </Inner>
    </Page>
  );
}
