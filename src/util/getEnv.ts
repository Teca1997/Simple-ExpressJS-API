export const getEnv = (name: string): string => {
	if (!process.env[name]) {
		throw new Error('Token key not defined!!!!!');
	}
	return process.env[name] || '';
};
