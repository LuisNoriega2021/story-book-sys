export const setItem = (key: string, value: any) => window.localStorage.setItem(key, JSON.stringify(value));

export const getItem = (key: string) => {
	const item = window.localStorage.getItem(key);
	return item !== 'undefined' && item !== null ? JSON.parse(item) : '';
};

export const removeItem = (key: string) => window.localStorage.removeItem(key);

export const clearStorage = () => window.localStorage.clear();
