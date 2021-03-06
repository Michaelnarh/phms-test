export default async function afetchWithTimeout(resource, options = {}) {
	const { timeout = 5000 } = options;

	const abortController = new AbortController();
	const id = setTimeout(() => abortController.abort(), timeout);
	const response = await fetch(resource, {
		...options,
		signal: abortController.signal,
	});
	clearTimeout(id);
	return response;
}
