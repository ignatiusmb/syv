import { readable } from 'svelte/store';

type Viewport = Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', boolean>;
const specs = { xs: '375', sm: '640', md: '768', lg: '1024', xl: '1280' } as const;
export const viewport = readable<Viewport>({} as Viewport, (set) => {
	const browser = typeof window !== 'undefined';
	const update = () => {
		const widths = Object.entries(specs).map(([k, w]) => {
			const query = `only screen and (min-width: ${w}px)`;
			return [k, window.matchMedia(query).matches] as [keyof Viewport, boolean];
		});
		set(widths.reduce((s, [k, v]) => ((s[k] = v), s), {} as Viewport));
	};
	if (browser) update(), window.addEventListener('resize', update);
	return () => browser && window.removeEventListener('resize', update);
});
