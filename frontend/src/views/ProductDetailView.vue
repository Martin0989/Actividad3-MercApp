<template>
  <section>
    <RouterLink to="/" class="back-link">← Volver al catálogo</RouterLink>

    <div v-if="loading" class="message">
      Cargando producto...
    </div>

    <div v-else-if="error" class="message error">
      {{ error }}
    </div>

    <article v-else-if="product" class="detail-card">
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

        <div class="product-actions">
          <button class="btn primary" @click="handleAddToCart">
            Añadir al carrito
          </button>

          <RouterLink :to="`/product/${product.id}/edit`" class="btn warning">
            Editar
          </RouterLink>
        </div>
      </div>
    </article>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProducts } from '../composables/useProducts';
import { useCart } from '../composables/useCart';

const route = useRoute();

const {
  product,
  categories,
  loading,
  error,
  getProductById,
  getCategories
} = useProducts();

const { addToCart } = useCart();

const categoryName = computed(() => {
  const category = categories.value.find(
    item => item.id === product.value?.categoryId
  );

  return category ? category.name : 'Sin categoría';
});

const handleAddToCart = () => {
  addToCart(product.value);
  alert(`Producto agregado al carrito: ${product.value.name}`);
};

onMounted(async () => {
  await Promise.all([
    getProductById(route.params.id),
    getCategories()
  ]);
});
</script>