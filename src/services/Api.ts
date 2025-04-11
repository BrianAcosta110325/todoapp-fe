const API_URL = "http://localhost:9090/api"

export const Api = {
  get: async (path: string, params: string) => {
    const response = await fetch(`${API_URL}/${path}?${params}`);
    return response.json();
  },

  post: async (path: string, body: any) => {
    const response = await fetch(`${API_URL}/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return response.json();
  },
};
