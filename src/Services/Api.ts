import { QueryParams } from "../Interfaces/QueryParams";

const API_URL = "http://localhost:9090/api"

export const Api = {
  get: async (path: string, params?: QueryParams) => {
    const queryParams = params
      ? new URLSearchParams(params as Record<string, any>)
      : '';
  
    const response = await fetch(`${API_URL}/${path}${queryParams ? '?' + queryParams : ''}`);
    return response.json();
  },

  post: async (path: string, body?: any) => {
    const response = await fetch(`${API_URL}/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      // Lanza un error con el mensaje que devuelve el backend o uno genérico
      throw new Error(data.message || 'Something went wrong');
    }
  
    return data;
  },  

  put: async (path: string, body?: any) => {
    const response = await fetch(`${API_URL}/${path}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    if (!response.ok) {
      // Lanza un error con el mensaje que devuelve el backend o uno genérico
      throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
  },

  patch: async (path: string, body?: any) => {
    const response = await fetch(`${API_URL}/${path}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  },

  delete: async (path: string) => {
    const response = await fetch(`${API_URL}/${path}`, {
      method: 'DELETE',
    });
    return response;
  },
};
