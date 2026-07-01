import { marked } from 'marked';

export async function mdToHtml(md: string): Promise<string> {
  return marked.parse(md, { async: true });
}
