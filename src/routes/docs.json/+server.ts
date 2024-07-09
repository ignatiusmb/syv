import { json } from '@sveltejs/kit';
import { traverse } from 'aubade/compass';
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
	const docs = traverse('docs').hydrate(({ breadcrumb: [filename], buffer, parse }) => {
		if (filename.startsWith('draft')) return;
		const { body, metadata } = parse(buffer.toString());
		const specified: PageContent = {
			index: filename.slice(0, 2),
			title: metadata.title,
			slug: filename.slice(3, -2),
			content: body.replace(/@VERSION/g, `@${version}`),
			path: `docs/${filename}`,
		};
		return { ...metadata, ...specified };
	});

	return json(docs);
};
