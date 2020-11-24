const options = {
	base: '',
	check: undefined,
	fetch: undefined,
};
function send({ method, path, data, token }) {
	const browser = typeof window !== 'undefined';

	const opts = { method, headers: {} };
	if (browser && typeof FormData !== 'undefined' && data instanceof FormData) {
		opts.body = data;
	} else if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	if (token) {
		opts.headers['Authorization'] = `Bearer ${token}`;
	}

	const { base, check } = options;
	const fetch = browser ? window.fetch : options.fetch;
	/**
	 * 1: check function precedes everything
	 * 2: use native fetch functionality w/o base
	 * 3: force base domain for server side fetch
	 */
	const url =
		(check && check(path)) ||
		(browser && (base ? `${base}/${path}` : path)) ||
		`${base || 'localhost:3000'}/${path}`;

	return fetch(url, opts)
		.then((r) => r.text())
		.then((json) => {
			try {
				return JSON.parse(json);
			} catch (err) {
				return json;
			}
		});
}

export const initialize = ({ host, check, fetch }) => {
	const browser = typeof window !== 'undefined';
	options.base = host;
	options.check = check;
	options.fetch = fetch;
	if (!browser && !options.fetch) {
		try {
			options.fetch = require('node-fetch').default;
		} catch (error) {
			console.error('API warning, fetch cannot be used on the server!');
		}
	}
};

export function get(path, token) {
	return send({ method: 'GET', path, token });
}

export function del(path, token) {
	return send({ method: 'DELETE', path, token });
}

export function post(path, data, token) {
	return send({ method: 'POST', path, data, token });
}

export function put(path, data, token) {
	return send({ method: 'PUT', path, data, token });
}
