import { QueryParams } from "../interfaces/QueryParams";

const API_URL = "http://localhost:9090/api"

export const Api = {
  get: async (path: string, params?: QueryParams) => {
    const queryParams = params
      ? new URLSearchParams(params as Record<string, any>)
      : '';
  
    const response = await fetch(`${API_URL}/${path}${queryParams ? '?' + queryParams : ''}`);
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
