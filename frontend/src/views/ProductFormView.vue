<template>
  <section class="simple-page">
    <RouterLink to="/" class="back-link">← Volver al catálogo</RouterLink>

    <h1>{{ isEditing ? 'Editar producto' : 'Nuevo producto' }}</h1>

    <form class="form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Nombre</label>
        <input v-model="form.name" class="input" type="text" />
      </div>

      <div class="form-group">
        <label>Descripción</label>
        <textarea v-model="form.description" class="input textarea"></textarea>
      </div>

      <div class="form-group">
        <label>Precio</label>
        <input v-model.number="form.price" class="input" type="number" step="0.01" />
      </div>

      <div class="form-group">
        <label>Categoría</label>
        <select v-model.number="form.categoryId" class="input">
          <option value="">Seleccione una categoría</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Stock</label>
        <input v-model.number="form.stock" class="input" type="number" />
      </div>

      <div class="form-group">
        <label>URL de imagen</label>
        <input v-model="form.imageUrl" class="input" type="text" />
      </div>

      <div v-if="validationErrors.length > 0" class="message error">
        <ul>
          <li v-for="item in validationErrors" :key="item">
            {{ item }}
          </li>
        </ul>
      </div>

      <div v-if="error" class="message error">
        {{ error }}
      </div>

      <button class="btn primary" type="submit" :disabled="loading">
        {{ loading ? 'Guardando...' : 'Guardar producto' }}
      </button>
    </form>
  </section>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProducts } from '../composables/useProducts';

const route = useRoute();
const router = useRouter();

const {
  product,
  categories,
  loading,
  error,
  getProductById,
  getCategories,
  createProduct,
  updateProduct
} = useProducts();

const validationErrors = ref([]);

const form = reactive({
  name: '',
  description: '',
  price: 0,
  imageUrl: '',
  categoryId: '',
  stock: 0
});

const isEditing = computed(() => {
  return route.name === 'product-edit';
});

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const validateForm = () => {
  const errors = [];

  if (!form.name.trim()) {
    errors.push('El nombre es obligatorio.');
  }

  if (!form.description.trim()) {
    errors.push('La descripción es obligatoria.');
  }

  if (!form.price || form.price <= 0) {
    errors.push('El precio debe ser mayor a 0.');
  }

  if (!form.categoryId) {
    errors.push('Debe seleccionar una categoría.');
  }

  if (form.stock < 0) {
    errors.push('El stock debe ser mayor o igual a 0.');
  }

  if (!form.imageUrl.trim() || !isValidUrl(form.imageUrl)) {
    errors.push('Debe ingresar una URL de imagen válida.');
  }

  validationErrors.value = errors;

  return errors.length === 0;
};

const fillForm = () => {
  if (!product.value) {
    return;
  }

  form.name = product.value.name;
  form.description = product.value.description;
  form.price = product.value.price;
  form.imageUrl = product.value.imageUrl;
  form.categoryId = product.value.categoryId;
  form.stock = product.value.stock;
};

const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }

  const payload = {
    name: form.name,
    description: form.description,
    price: Number(form.price),
    imageUrl: form.imageUrl,
    categoryId: Number(form.categoryId),
    stock: Number(form.stock)
  };

  try {
    if (isEditing.value) {
      await updateProduct(route.params.id, payload);
    } else {
      await createProduct(payload);
    }

    router.push('/');
  } catch (err) {
    alert(err.message);
  }
};

onMounted(async () => {
  await getCategories();

  if (isEditing.value) {
    await getProductById(route.params.id);
    fillForm();
  }
});
</script>