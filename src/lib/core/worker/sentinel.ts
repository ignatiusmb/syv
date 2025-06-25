type Handlers = Record<string, (payload: any) => any>;

export type Dispatch<T extends Handlers> = {
	[K in keyof T]: T[K] extends (payload: infer P) => infer R ? [P, Awaited<R>] : never;
};

export function commander<T extends Handlers>(handlers: T) {
	return async (
		event: MessageEvent<{ id: number; command: keyof T; payload: Parameters<T[keyof T]>[0] }>,
	) => {
		const { id, command, payload } = event.data;

		try {
			const handle = handlers[command];
			if (!handle) throw new Error(`Unknown command: ${String(command)}`);
			const result = await handle(payload);
			postMessage({ id, result });
		} catch (error) {
			postMessage({ id, error: (error as Error).message });
		}
	};
}
