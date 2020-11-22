export function capitalize(text, lower) {
	return (lower ? text.toLowerCase() : text).replace(/(?:^|\s)\S/g, function (a) {
		return a.toUpperCase();
	});
}

export const checkNum = (text) => (isNaN(text) ? text : parseInt(text));
