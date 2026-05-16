<template>
  <section>
    <div class="hero">
      <div>
        <h1>Catálogo de productos</h1>
        <p>
          Explora productos disponibles en MercApp usando búsqueda por texto y filtro por categoría.
        </p>
      </div>

      <RouterLink to="/product/new" class="btn primary">
        Nuevo producto
      </RouterLink>
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
        v-for="productItem in filteredProducts"
        :key="productItem.id"
        :product="productItem"
        @added-to-cart="handleAddToCart"
        @delete-product="handleDeleteProduct"
      />
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import ProductCard from '../components/ProductCard.vue';
import { useProducts } from '../composables/useProducts';
import { useCart } from '../composables/useCart';

const {
  products,
  categories,
  loading,
  error,
  getProducts,
  getCategories,
  deleteProduct
} = useProducts();

const { addToCart } = useCart();

const search = ref('');
const selectedCategory = ref('');

const filteredProducts = computed(() => {
  const text = search.value.toLowerCase().trim();

  return products.value.filter((productItem) => {
    const matchesSearch =
      productItem.name.toLowerCase().includes(text) ||
      productItem.description.toLowerCase().includes(text);

    const matchesCategory =
      selectedCategory.value === '' ||
      productItem.categoryId === Number(selectedCategory.value);

    return matchesSearch && matchesCategory;
  });
});

const handleAddToCart = (productItem) => {
  addToCart(productItem);
  alert(`Producto agregado al carrito: ${productItem.name}`);
};

const handleDeleteProduct = async (id) => {
  const confirmed = confirm('¿Está seguro de eliminar este producto?');

  if (!confirmed) {
    return;
  }

  try {
    await deleteProduct(id);
    await getProducts();
  } catch (err) {
    alert(err.message);
  }
};

onMounted(async () => {
  await Promise.all([
    getProducts(),
    getCategories()
  ]);
});
</script>