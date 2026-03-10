import React from 'react'
import { createFileRoute, notFound } from '@tanstack/react-router'
import { styled } from '@linaria/react'
import { BLOGS } from '../../content/blogs'
import { Navbar } from '../../components/Navbar.tsx'

const POST_MODULES: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  'setting-up-arkavidia-ctf': () =>
    import('../../content/blogs/setting-up-arkavidia-ctf.mdx'),
  'fira-urban-vision-pipeline': () =>
    import('../../content/blogs/fira-urban-vision-pipeline.mdx'),
}

export const Route = createFileRoute('/blogs/$slug')({
  loader: ({ params }) => {
    const meta = BLOGS.find((b) => b.slug === params.slug)
    if (!meta || !POST_MODULES[params.slug]) throw notFound()
    return meta
  },
  component: BlogPost,
})

function BlogPost() {
  const meta = Route.useLoaderData()
  const { slug } = Route.useParams()
  const [Post, setPost] = React.useState<React.ComponentType | null>(null)

  React.useEffect(() => {
    POST_MODULES[slug]().then((m) => setPost(() => m.default))
  }, [slug])

  return (
    <Page>
      <Navbar/>
      <Header>
        <TagList>
          {meta.tags.map((t) => <Tag key={t}>{t}</Tag>)}
        </TagList>
        <PostTitle>{meta.name}</PostTitle>
        <PostDate>{meta.date}</PostDate>
      </Header>
      {Post ? <Prose><Post /></Prose> : <Loading>Loading…</Loading>}
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
`
const Loading = styled.div`
  font-family: 'DM Mono', monospace;
  font-size: 0.75rem;
  color: var(--text-dim);
  padding: 4rem 0;
  text-align: center;
`
