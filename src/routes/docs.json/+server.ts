import { json } from '@sveltejs/kit';
import { traverse } from 'marqua/fs';
import { version } from '../../../package.json';

interface PageContent {
	title: string;
	index: string;
	slug: string;
	content: string;
	path: string;
}

export const prerender = true;

export const GET: import('./$types').RequestHandler = () => {
	const docs = traverse({ entry: 'docs' }, ({ breadcrumb: [filename], buffer, parse }) => {
		if (filename.startsWith('draft')) return;
		const { content, metadata } = parse(buffer.toString());
		const specified: PageContent = {
			index: filename.slice(0, 2),
			title: metadata.title,
			slug: filename.slice(3, -2),
			content: content.replace(/@VERSION/g, `@${version}`),
			path: `docs/${filename}.md`,
		};
		return { ...metadata, ...specified };
	});

	return json(docs);
};
