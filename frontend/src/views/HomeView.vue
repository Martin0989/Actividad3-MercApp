<template>
  <section>
    <div class="hero">
      <h1>Catálogo de productos</h1>
      <p>
        Explora productos disponibles en MercApp usando búsqueda por texto y filtro por categoría.
      </p>
    </div>

    <div class="filters">
      <input
        v-model="search"
        type="text"
        placeholder="Buscar por nombre o descripción..."
        class="input"
      />

      <select v-model="selectedCategory" class="input">
        <option value="">Todas las categorías</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>

    <div v-if="loading" class="message">
      Cargando productos...
    </div>

    <div v-else-if="error" class="message error">
      {{ error }}
    </div>

    <div v-else-if="filteredProducts.length === 0" class="message">
      No se encontraron productos con los filtros seleccionados.
    </div>

    <div v-else class="grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @added-to-cart="addToCart"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import ProductCard from '../components/ProductCard.vue';

const API_URL = 'http://localhost:3000/api';

const products = ref([]);
const categories = ref([]);
const search = ref('');
const selectedCategory = ref('');
const loading = ref(true);
const error = ref('');

const filteredProducts = computed(() => {
  const text = search.value.toLowerCase().trim();

  return products.value.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(text) ||
      product.description.toLowerCase().includes(text);

    const matchesCategory =
      selectedCategory.value === '' ||
      product.categoryId === Number(selectedCategory.value);

    return matchesSearch && matchesCategory;
  });
});

const loadData = async () => {
  try {
    loading.value = true;
    error.value = '';

    const [productsResponse, categoriesResponse] = await Promise.all([
      fetch(`${API_URL}/products`),
      fetch(`${API_URL}/categories`)
    ]);

    if (!productsResponse.ok || !categoriesResponse.ok) {
      throw new Error('No se pudo cargar la información del catálogo.');
    }

    products.value = await productsResponse.json();
    categories.value = await categoriesResponse.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const addToCart = (product) => {
  alert(`Producto agregado al carrito: ${product.name}`);
};

onMounted(() => {
  loadData();
});
</script>