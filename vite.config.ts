import { defineConfig } from 'vite'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import linaria from '@linaria/vite'
import mdx from '@mdx-js/rollup'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from 'rehype-pretty-code'

export default defineConfig({
  plugins: [
    linaria(),
    tanstackRouter({
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
    }),
    {
      enforce: 'pre',
      ...mdx({
        remarkPlugins: [remarkMath, remarkGfm],
        rehypePlugins: [
          rehypeKatex,
          [rehypePrettyCode, { theme: 'github-dark' }],
        ],
      }),
    },
  ],
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
})
