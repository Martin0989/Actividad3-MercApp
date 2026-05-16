<template>
  <section class="simple-page">
    <h1>Carrito</h1>

    <div v-if="cartItems.length === 0" class="message">
      El carrito está vacío.
    </div>

    <div v-else>
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="cart-item"
      >
        <img :src="item.imageUrl" :alt="item.name" class="cart-image" />

        <div class="cart-info">
          <h3>{{ item.name }}</h3>
          <p>$ {{ item.price.toFixed(2) }}</p>
        </div>

        <div class="quantity-controls">
          <button class="btn secondary" @click="decreaseQuantity(item.id)">-</button>
          <span>{{ item.quantity }}</span>
          <button class="btn secondary" @click="increaseQuantity(item.id)">+</button>
        </div>

        <strong>$ {{ (item.price * item.quantity).toFixed(2) }}</strong>

        <button class="btn danger" @click="removeFromCart(item.id)">
          Quitar
        </button>
      </div>

      <div class="cart-total">
        <h2>Total: $ {{ cartTotal.toFixed(2) }}</h2>

        <button class="btn danger" @click="clearCart">
          Vaciar carrito
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useCart } from '../composables/useCart';

const {
  cartItems,
  cartTotal,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart
} = useCart();
</script>