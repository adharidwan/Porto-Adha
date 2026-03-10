import React from 'react'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { styled } from '@linaria/react'
import {
  getBlogBySlug,
  hasBlogComponentBySlug,
  loadBlogComponentBySlug,
} from '../../content/blogs'

export const Route = createFileRoute('/blogs/$slug')({
  loader: ({ params }) => {
    const meta = getBlogBySlug(params.slug)
    if (!meta || !hasBlogComponentBySlug(params.slug)) throw notFound()
    return meta
  },
  component: BlogPost,
})

function BlogPost() {
  const meta = Route.useLoaderData()
  const { slug } = Route.useParams()
  const [Post, setPost] = React.useState<React.ComponentType | null>(null)
  const [tocItems, setTocItems] = React.useState<Array<{ id: string; text: string; level: number }>>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [hasLoadError, setHasLoadError] = React.useState(false)
  const proseRef = React.useRef<HTMLElement | null>(null)

  const headingSlug = React.useCallback((value: string) => {
    return value
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-{2,}/g, '-')
  }, [])

  React.useEffect(() => {
    let active = true

    const loadPost = async () => {
      setIsLoading(true)
      setHasLoadError(false)

      const mod = await loadBlogComponentBySlug(slug)
      if (!mod) {
        throw new Error('Blog component not found')
      }

      if (active) {
        setPost(() => mod.default)
        setIsLoading(false)
      }
    }

    loadPost().catch(() => {
      if (active) {
        setPost(null)
        setHasLoadError(true)
        setIsLoading(false)
      }
    })

    return () => {
      active = false
    }
  }, [slug])

  React.useEffect(() => {
    if (!Post || !proseRef.current) {
      setTocItems([])
      return
    }

    const seenIds: Record<string, number> = {}
    const headings = Array.from(proseRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6'))

    const items = headings
      .map((heading) => {
        const text = heading.textContent?.trim() ?? ''
        if (!text) {
          return null
        }

        const level = Number(heading.tagName.slice(1))
        const base = headingSlug(text)
        if (!base) {
          return null
        }

        const collisionCount = seenIds[base] ?? 0
        seenIds[base] = collisionCount + 1
        const id = collisionCount === 0 ? base : `${base}-${collisionCount + 1}`

        heading.id = id
        return { id, text, level }
      })
      .filter((item): item is { id: string; text: string; level: number } => Boolean(item))

    setTocItems(items)
  }, [Post, headingSlug])

  return (
    <Page>
      
      <Header>
        <TagList>
          {meta.tags.map((t) => <Tag key={t}>{t}</Tag>)}
        </TagList>
        <PostTitle>{meta.title}</PostTitle>
        <MetaRow>
          <PostDate>{meta.date}</PostDate>
          <PostDate>{meta.readingTime}</PostDate>
        </MetaRow>
        {meta.preview && <Preview>{meta.preview}</Preview>}
      </Header>
      {tocItems.length > 0 && (
        <Toc>
          <TocTitle>On this page</TocTitle>
          <TocList>
            {tocItems.map((item) => (
              <TocItem key={item.id} $level={item.level}>
                <a href={`#${item.id}`}>{item.text}</a>
              </TocItem>
            ))}
          </TocList>
        </Toc>
      )}
      {isLoading && <Loading>Loading...</Loading>}
      {!isLoading && hasLoadError && <Loading>Unable to load this post.</Loading>}
      {!isLoading && !hasLoadError && Post && <Prose ref={proseRef}><Post /></Prose>}
    </Page>
  )
}

const Page = styled.div`
  max-width: 680px;
  margin: 0 auto;
  padding: 6rem 1.5rem 8rem;
`
const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid color-mix(in srgb, var(--text-dim) 14%, transparent);
`
const PostTitle = styled.h1`
  font-family: 'DM Serif Display', Georgia, serif;
  font-size: clamp(1.8rem, 5vw, 2.8rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.2;
`
const PostDate = styled.span`
  font-family: 'DM Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  color: var(--text-dim);
`
const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
`
const Preview = styled.p`
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--text-muted);
  margin: 0.2rem 0 0;
`
const TagList = styled.div`
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
`
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
`
const Toc = styled.nav`
  margin: 0 0 2rem;
  padding: 1rem 1.2rem;
  border: 1px solid color-mix(in srgb, var(--text-dim) 18%, transparent);
  border-radius: 10px;
  background: color-mix(in srgb, var(--text-dim) 6%, transparent);
`
const TocTitle = styled.p`
  margin: 0 0 0.8rem;
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-dim);
`
const TocList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`
const TocItem = styled.li<{ $level: number }>`
  padding-left: ${({ $level }) => `${Math.max(0, $level - 2) * 0.8}rem`};

  a {
    text-decoration: none;
    color: var(--text-muted);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.86rem;
    line-height: 1.35;
  }

  a:hover {
    color: var(--text-primary);
  }
`
const Prose = styled.article`
  font-family: 'DM Sans', sans-serif;
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text-dim);

  h1, h2, h3, h4 {
    font-family: 'DM Serif Display', Georgia, serif;
    font-weight: 400;
    color: var(--text-primary);
    margin: 2rem 0 0.75rem;
  }
  p { margin: 0 0 1.2rem; }
  a { color: var(--text-primary); text-underline-offset: 3px; }
  code {
    font-family: 'DM Mono', monospace;
    font-size: 0.85em;
    background: color-mix(in srgb, var(--text-dim) 10%, transparent);
    padding: 0.15em 0.4em;
    border-radius: 4px;
  }
  pre {
    border-radius: 10px;
    overflow-x: auto;
    padding: 1.2rem;
    margin: 0 0 1.2rem;
    code { background: none; padding: 0; }
  }
  blockquote {
    border-left: 2px solid color-mix(in srgb, var(--text-primary) 30%, transparent);
    margin: 0 0 1.2rem;
    padding-left: 1.2rem;
    font-style: italic;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 0 0 1.2rem;
    font-family: 'DM Mono', monospace;
    font-size: 0.8rem;
  }
  th {
    text-align: left;
    color: var(--text-primary);
    border-bottom: 2px solid color-mix(in srgb, var(--text-dim) 20%, transparent);
    padding: 0.5rem 0.75rem;
  }
  td {
    color: var(--text-dim);
    border-bottom: 1px solid color-mix(in srgb, var(--text-dim) 10%, transparent);
    padding: 0.5rem 0.75rem;
  }
  tr:last-child td { border-bottom: none; }
`
const Loading = styled.div`
  font-family: 'DM Mono', monospace;
  font-size: 0.75rem;
  color: var(--text-dim);
  padding: 4rem 0;
  text-align: center;
`
