import type { RequestHandler } from '@sveltejs/kit';
import { version } from '../../package.json';
import { forge, traverse } from 'marqua';

type Metadata = Record<'title', string>;
type Section = Record<'index' | 'slug' | 'content' | 'path', string>;

export const get: RequestHandler = () => ({
	body: traverse(
		'docs',
		({ frontMatter: { title, toc }, content, breadcrumb: [filename] }) => {
			if (filename.startsWith('draft')) return;
			content = content.replace(/@VERSION/g, `@${version}`);
			const index = filename.slice(0, 2);
			const slug = filename.slice(3, -2);
			return { index, slug, title, toc, content, path: `docs/${filename}.md` };
		},
		forge.types<Metadata, Section & Metadata>()
	),
});
