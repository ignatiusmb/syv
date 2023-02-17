import { json } from '@sveltejs/kit';
import { traverse } from 'marqua/fs';
import { version } from '../../../package.json';

export const GET: import('./$types').RequestHandler = () => {
	const docs: Array<{
		title: string;
		index: string;
		slug: string;
		content: string;
		path: string;
	}> = traverse({ entry: 'docs' }, ({ breadcrumb: [filename], content, frontMatter }) => {
		if (filename.startsWith('draft')) return;
		content = content.replace(/@VERSION/g, `@${version}`);
		const index = filename.slice(0, 2);
		const slug = filename.slice(3, -2);
		return { ...frontMatter, index, slug, content, path: `docs/${filename}.md` };
	});

	return json(docs);
};
