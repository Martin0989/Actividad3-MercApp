import { ref } from 'vue';
import { useApi } from './useApi';

export function useProducts() {
  const products = ref([]);
  const categories = ref([]);
  const product = ref(null);

  const { loading, error, request } = useApi();

  const getProducts = async () => {
    products.value = await request('/products');
  };

  const getProductById = async (id) => {
    product.value = await request(`/products/${id}`);
  };

  const getCategories = async () => {
    categories.value = await request('/categories');
  };

  const createProduct = async (payload) => {
    return request('/products', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  };

  const updateProduct = async (id, payload) => {
    return request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  };

  const deleteProduct = async (id) => {
    return request(`/products/${id}`, {
      method: 'DELETE'
    });
  };

  return {
    products,
    categories,
    product,
    loading,
    error,
    getProducts,
    getProductById,
    getCategories,
    createProduct,
    updateProduct,
    deleteProduct
  };
}