export const request = async (url) => fetch(url).then((data) => data.json());
