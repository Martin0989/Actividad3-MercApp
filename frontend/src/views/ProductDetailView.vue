<template>
  <section>
    <RouterLink to="/" class="back-link">← Volver al catálogo</RouterLink>

    <div v-if="loading" class="message">
      Cargando producto...
    </div>

    <div v-else-if="error" class="message error">
      {{ error }}
    </div>

    <article v-else class="detail-card">
      <img :src="product.imageUrl" :alt="product.name" class="detail-image" />

      <div class="detail-info">
        <h1>{{ product.name }}</h1>
        <p>{{ product.description }}</p>

        <p class="price-detail">$ {{ product.price.toFixed(2) }}</p>

        <p>
          <strong>Categoría:</strong>
          {{ categoryName }}
        </p>

        <p>
          <strong>Stock disponible:</strong>
          {{ product.stock }}
        </p>

        <button class="btn primary" @click="addToCart">
          Añadir al carrito
        </button>
      </div>
    </article>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const API_URL = 'http://localhost:3000/api';

const route = useRoute();

const product = ref(null);
const categories = ref([]);
const loading = ref(true);
const error = ref('');

const categoryName = computed(() => {
  const category = categories.value.find(
    (item) => item.id === product.value?.categoryId
  );

  return category ? category.name : 'Sin categoría';
});

const loadProduct = async () => {
  try {
    loading.value = true;
    error.value = '';

    const [productResponse, categoriesResponse] = await Promise.all([
      fetch(`${API_URL}/products/${route.params.id}`),
      fetch(`${API_URL}/categories`)
    ]);

    if (!productResponse.ok) {
      throw new Error('Producto no encontrado.');
    }

    if (!categoriesResponse.ok) {
      throw new Error('No se pudieron cargar las categorías.');
    }

    product.value = await productResponse.json();
    categories.value = await categoriesResponse.json();
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const addToCart = () => {
  alert(`Producto agregado al carrito: ${product.value.name}`);
};

onMounted(() => {
  loadProduct();
});
</script>