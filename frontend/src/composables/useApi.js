import { ref } from 'vue';

const API_URL = 'http://localhost:3000/api';

export function useApi() {
  const loading = ref(false);
  const error = ref('');

  const request = async (endpoint, options = {}, retry = true) => {
    try {
      loading.value = true;
      error.value = '';

      const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json'
        },
        ...options
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en la petición');
      }

      return data;
    } catch (err) {
      if (retry) {
        return request(endpoint, options, false);
      }

      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    request
  };
}