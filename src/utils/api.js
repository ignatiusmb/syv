let base = 'localhost:3000';
let path_checker = undefined;
let server_fetch = undefined;
function send({ method, path, data, token }) {
	const fetch = typeof window !== 'undefined' ? window.fetch : server_fetch;

	const opts = { method, headers: {} };

	if (typeof window !== 'undefined') {
		if (typeof FormData !== 'undefined' && data instanceof FormData) {
			opts.body = data;
		}
	}

	if (data && !opts.body) {
		opts.headers['Content-Type'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	if (token) {
		opts.headers['Authorization'] = `Bearer ${token}`;
	}

	return fetch(path_checker ? path_checker(path) : `${base}/${path}`, opts)
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
	base = host;
	path_checker = check;
	server_fetch = fetch && fetch.default;
	if (typeof window === 'undefined' && !server_fetch) {
		try {
			server_fetch = require('node-fetch').default;
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
