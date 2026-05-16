<template>
  <article class="product-card">
    <img :src="product.imageUrl" :alt="product.name" class="product-image" />

    <div class="product-info">
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>

      <div class="product-meta">
        <span class="price">$ {{ product.price.toFixed(2) }}</span>
        <span class="stock">Stock: {{ product.stock }}</span>
      </div>

      <div class="product-actions">
        <RouterLink :to="`/product/${product.id}`" class="btn secondary">
          Ver
        </RouterLink>

        <button class="btn primary" @click="$emit('added-to-cart', product)">
          Añadir
        </button>
      </div>

      <div class="product-actions admin-actions">
        <RouterLink :to="`/product/${product.id}/edit`" class="btn warning">
          Editar
        </RouterLink>

        <button class="btn danger" @click="$emit('delete-product', product.id)">
          Eliminar
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
});

defineEmits(['added-to-cart', 'delete-product']);
</script>