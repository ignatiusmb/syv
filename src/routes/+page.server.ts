import type { ComponentProps } from 'svelte';
import type Docs from './Docs.svelte';
import { traverse } from 'marqua/fs';
import { exports } from '../../package.json';

export const prerender = true;

export function load() {
	const docs: ComponentProps<Docs>['sections'] = [
		...traverse({ entry: 'docs' }, ({ breadcrumb: [filename], buffer, parse }) => {
			const { content, metadata } = parse(buffer.toString('utf-8'));
			return { slug: filename.slice(3, -3), title: metadata.title, content };
		}),
		...Object.keys(exports).map((key) => {
			return {
				slug: key.slice(2),
				title: `syv${key.slice(1)}`,
				content: '',
			};
		}),
	];

	return {
		docs,
		meta: {
			title: 'Svelte Complementary Library',
			description: 'A multipurpose library for working with Svelte',
		},
	};
}
