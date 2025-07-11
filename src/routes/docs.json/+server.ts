import { json } from '@sveltejs/kit';
import { traverse } from 'aubade/compass';
import { version } from '../../../package.json';

export const prerender = true;
export async function GET() {
	const docs = await traverse('docs', ({ breadcrumb: [file] }) => {
		if (file.startsWith('draft')) return;
		return async ({ buffer, parse }) => {
			const { body, frontmatter } = parse(buffer.toString());
			if (!frontmatter || !frontmatter.title) return;

			return {
				...frontmatter,
				index: file.slice(0, 2),
				title: frontmatter.title as string,
				slug: file.slice(3, -2),
				content: body.replace(/@VERSION/g, `@${version}`),
				path: `docs/${file}`,
			};
		};
	});

	return json(docs);
}
