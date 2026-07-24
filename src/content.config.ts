import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const base = ({ image }: { image: () => any }) =>
  z.object({
    title: z.string(),
    slug: z.string().optional(),
    shortdesc: z.string(),
    feature: image().optional(),
    date: z.coerce.date(),
    weight: z.number().default(0),
    tags: z.array(z.string()).default([]),
    sectionbg: z.string().optional(),
    c2aText: z.string().optional(),
    noC2A: z.boolean().optional(),
  });

const projects = defineCollection({
  loader: glob({ pattern: '**/index.{md,mdx}', base: './src/content/projects' }),
  schema: base,
});

const blog = defineCollection({
  loader: glob({ pattern: '**/index.{md,mdx}', base: './src/content/blog' }),
  schema: base,
});

export const collections = { projects, blog };
