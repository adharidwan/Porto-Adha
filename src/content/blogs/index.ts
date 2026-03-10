import type { ComponentType } from "react";
import matter from "gray-matter";
import rawFiraUrbanVisionPipeline from "./fira-urban-vision-pipeline.mdx?raw";
import rawSettingUpArkavidiaCtf from "./setting-up-arkavidia-ctf.mdx?raw";

interface BlogFrontmatter {
  title?: string;
  date?: string;
  tags?: string[];
  preview?: string;
  description?: string;
}

export interface BlogTocItem {
  id: string;
  text: string;
  level: number;
}

export interface BlogMeta {
  slug: string;
  title: string;
  name: string;
  date: string;
  tags: string[];
  preview: string;
  desc: string;
  readingTime: string;
  wordCount: number;
  toc: BlogTocItem[];
}

type RawMdxSource = string | { default?: unknown };

const FALLBACK_RAW_BLOG_MODULES: Record<string, RawMdxSource> = {
  "./fira-urban-vision-pipeline.mdx": rawFiraUrbanVisionPipeline,
  "./setting-up-arkavidia-ctf.mdx": rawSettingUpArkavidiaCtf,
};

const RAW_BLOG_MODULES_WITH_QUERY = import.meta.glob("./*.mdx?raw", {
  eager: true,
  import: "default",
}) as Record<string, RawMdxSource>;

const RAW_BLOG_MODULES = {
  ...FALLBACK_RAW_BLOG_MODULES,
  ...Object.fromEntries(
    Object.entries(RAW_BLOG_MODULES_WITH_QUERY).map(([path, value]) => [
      path.replace(/\?raw$/, ""),
      value,
    ]),
  ),
};

const BLOG_COMPONENT_MODULES = import.meta.glob("./*.mdx") as Record<
  string,
  () => Promise<{ default: ComponentType }>
>;

const BLOG_FRONTMATTER_MODULES = import.meta.glob("./*.mdx", {
  eager: true,
}) as Record<string, { frontmatter?: BlogFrontmatter }>;

const BLOG_REGISTRY_PATHS = Object.keys(BLOG_COMPONENT_MODULES);

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

const titleFromFileName = (fileName: string) =>
  fileName
    .replace(/\.mdx$/i, "")
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const cleanInlineMarkdown = (text: string) =>
  text
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/<[^>]*>/g, "")
    .trim();

const calculateReadingStats = (content: string) => {
  const plain = cleanInlineMarkdown(
    content
      .replace(/```[\s\S]*?```/g, " ")
      .replace(/`[^`]*`/g, " ")
      .replace(/<[^>]*>/g, " "),
  );

  const words = plain
    .split(/\s+/)
    .map((word) => word.trim())
    .filter(Boolean).length;

  const minutes = Math.max(1, Math.ceil(words / 200));
  return {
    words,
    text: `${minutes} min read`,
  };
};

const extractTitle = (content: string, fallback: string) => {
  const headingMatch = content.match(/^\s*#\s+(.+)$/m);
  return cleanInlineMarkdown(headingMatch?.[1] ?? fallback) || fallback;
};

const extractPreview = (content: string) => {
  const withoutCode = content.replace(/```[\s\S]*?```/g, "");
  const blocks = withoutCode
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);

  const paragraph = blocks.find(
    (b) =>
      !/^#{1,6}\s+/.test(b) &&
      !/^(import|export)\s+/.test(b) &&
      !/^[-*+]\s+/.test(b) &&
      !/^\d+\.\s+/.test(b) &&
      /[a-zA-Z]/.test(b),
  );

  const preview = cleanInlineMarkdown(paragraph ?? "");
  return preview.length > 220 ? `${preview.slice(0, 217)}...` : preview;
};

const extractToc = (content: string): BlogTocItem[] => {
  const headingRegex = /^\s*(#{1,6})\s+(.+)$/gm;
  const slugCounts: Record<string, number> = {};
  const toc: BlogTocItem[] = [];

  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const rawText = cleanInlineMarkdown(match[2]);
    if (!rawText) {
      continue;
    }

    const baseId = slugify(rawText);
    if (!baseId) {
      continue;
    }

    const seen = slugCounts[baseId] ?? 0;
    slugCounts[baseId] = seen + 1;
    const id = seen === 0 ? baseId : `${baseId}-${seen + 1}`;

    toc.push({ id, text: rawText, level });
  }

  return toc;
};

const formatDate = (value?: string) => {
  if (!value) {
    return "Unpublished";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const parseDateTimestamp = (value?: string) => {
  if (!value) {
    return 0;
  }

  const parsed = new Date(value).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
};

const normalizeRawMdx = (value: RawMdxSource) => {
  if (typeof value === "string") {
    return value;
  }

  if (value && typeof value === "object" && typeof value.default === "string") {
    return value.default;
  }

  return "";
};

const resolveRawSource = (path: string, fileName: string) => {
  const candidates = [
    path,
    `./${fileName}`,
    path.replace(/^\/src\/content\/blogs\//, "./"),
    `/src/content/blogs/${fileName}`,
  ];

  for (const candidate of candidates) {
    const source = normalizeRawMdx(RAW_BLOG_MODULES[candidate]);
    if (source) {
      return source;
    }
  }

  return "";
};

const extractMarkdownSource = (source: string) => {
  if (!source) {
    return "";
  }

  const sourceMapMatch = source.match(
    /sourceMappingURL=data:application\/json;base64,([A-Za-z0-9+/=]+)/,
  );

  if (sourceMapMatch && typeof atob === "function") {
    try {
      const decoded = atob(sourceMapMatch[1]);
      const parsed = JSON.parse(decoded) as { sourcesContent?: unknown };
      if (Array.isArray(parsed.sourcesContent) && typeof parsed.sourcesContent[0] === "string") {
        const original = parsed.sourcesContent[0].trim();
        if (original) {
          return parsed.sourcesContent[0] as string;
        }
      }
    } catch {
      // Fallback to layout string extraction below.
    }
  }

  const layoutMatch = source.match(/const MDXLayout = ("(?:\\.|[^"])*");/);
  if (layoutMatch) {
    try {
      const extracted = JSON.parse(layoutMatch[1]) as string;
      if (extracted.trim()) {
        return extracted;
      }
    } catch {
      // Keep fallback behavior.
    }
  }

  return source;
};

const parseMdxContent = (source: string) => {
  const markdownSource = extractMarkdownSource(source);

  if (!markdownSource) {
    return { fm: {} as BlogFrontmatter, content: "" };
  }

  try {
    const parsed = matter(markdownSource);
    return {
      fm: parsed.data as BlogFrontmatter,
      content: parsed.content,
    };
  } catch {
    // If frontmatter is malformed, keep rendering and derive preview/TOC from body text.
    return { fm: {} as BlogFrontmatter, content: markdownSource };
  }
};

const normalizeFrontmatter = (value?: BlogFrontmatter): BlogFrontmatter => ({
  title: typeof value?.title === "string" ? value.title : undefined,
  date: typeof value?.date === "string" ? value.date : undefined,
  preview: typeof value?.preview === "string" ? value.preview : undefined,
  description: typeof value?.description === "string" ? value.description : undefined,
  tags: Array.isArray(value?.tags)
    ? value.tags.filter((tag): tag is string => typeof tag === "string")
    : undefined,
});

const slugCollisions: Record<string, number> = {};

const registry = BLOG_REGISTRY_PATHS
  .map((path) => {
    const fileName = path.split("/").pop() ?? "post.mdx";
    const source = resolveRawSource(path, fileName);
    const { fm, content } = parseMdxContent(source);

    const parsedFrontmatter = normalizeFrontmatter(fm);
    const exportedFrontmatter = normalizeFrontmatter(BLOG_FRONTMATTER_MODULES[path]?.frontmatter);
    const effectiveFrontmatter = { ...parsedFrontmatter, ...exportedFrontmatter };

    const fallbackTitle = titleFromFileName(fileName);
    const title = cleanInlineMarkdown(
      effectiveFrontmatter.title?.trim() ||
        (content ? extractTitle(content, fallbackTitle) : fallbackTitle),
    );

    const fallbackSlug = slugify(fileName.replace(/\.mdx$/i, ""));
    const baseSlug = slugify(title) || fallbackSlug || "untitled-post";
    const collision = slugCollisions[baseSlug] ?? 0;
    slugCollisions[baseSlug] = collision + 1;
    const slug = collision === 0 ? baseSlug : `${baseSlug}-${collision + 1}`;

    const preview =
      cleanInlineMarkdown(
        effectiveFrontmatter.preview?.trim() || effectiveFrontmatter.description?.trim() || "",
      ) ||
      (content ? extractPreview(content) : "Open post to read more.");

    const stats = content ? calculateReadingStats(content) : { words: 0, text: "1 min read" };
    const toc = content ? extractToc(content) : [];
    const tags = Array.isArray(effectiveFrontmatter.tags)
      ? effectiveFrontmatter.tags.filter(
          (t): t is string => typeof t === "string" && t.trim().length > 0,
        )
      : [];

    return {
      path,
      timestamp: parseDateTimestamp(effectiveFrontmatter.date),
      meta: {
        slug,
        title,
        name: title,
        date: formatDate(effectiveFrontmatter.date),
        tags,
        preview,
        desc: preview,
        readingTime: stats.text,
        wordCount: stats.words,
        toc,
      } satisfies BlogMeta,
    };
  })
  .sort((a, b) => b.timestamp - a.timestamp);

const LOADER_BY_SLUG = Object.fromEntries(
  registry
    .map(({ path, meta }) => {
      const loader = BLOG_COMPONENT_MODULES[path];
      if (!loader) {
        return null;
      }
      return [meta.slug, loader] as const;
    })
    .filter((entry): entry is readonly [string, () => Promise<{ default: ComponentType }>] =>
      Boolean(entry),
    ),
);

const META_BY_SLUG = Object.fromEntries(registry.map(({ meta }) => [meta.slug, meta] as const));

export const BLOGS: BlogMeta[] = registry.map(({ meta }) => meta);

export const getBlogBySlug = (slug: string) => META_BY_SLUG[slug];

export const hasBlogComponentBySlug = (slug: string) => Boolean(LOADER_BY_SLUG[slug]);

export const loadBlogComponentBySlug = (slug: string) => LOADER_BY_SLUG[slug]?.();
