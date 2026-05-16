<template>
  <div class="app">
    <header class="header">
      <div class="container nav">
        <RouterLink to="/" class="logo">MercApp</RouterLink>

        <nav class="menu">
          <RouterLink to="/">Catálogo</RouterLink>
          <RouterLink to="/cart">Carrito ({{ cartCount }})</RouterLink>
          <RouterLink to="/about">Acerca de</RouterLink>
        </nav>
      </div>
    </header>

    <main class="container main-content">
      <RouterView v-slot="{ Component }">
        <Suspense>
          <component :is="Component" />

          <template #fallback>
            <div class="message">
              Cargando vista...
            </div>
          </template>
        </Suspense>
      </RouterView>
    </main>
  </div>
</template>

<script setup>
import { useCart } from './composables/useCart';

const { cartCount } = useCart();
</script>