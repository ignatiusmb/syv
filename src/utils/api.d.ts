type InitOptions = {
	host: string;
	check: (path: string) => string;
	fetch: (url: RequestInfo, init?: RequestInit) => Promise<Response>;
};
export const initialize: (opts: InitOptions) => void;

export function get<T>(path: string, token?: string): Promise<T>;
export function del<T>(path: string, token?: string): Promise<T>;
export function post<T>(path: string, data?: any, token?: string): Promise<T>;
export function put<T>(path: string, data?: any, token?: string): Promise<T>;
