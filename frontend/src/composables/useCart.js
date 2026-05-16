import { computed, ref, watch } from 'vue';

const savedCart = localStorage.getItem('mercapp_cart');

const cartItems = ref(savedCart ? JSON.parse(savedCart) : []);

watch(
  cartItems,
  () => {
    localStorage.setItem('mercapp_cart', JSON.stringify(cartItems.value));
  },
  { deep: true }
);

export function useCart() {
  const addToCart = (product) => {
    const existingItem = cartItems.value.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.value.push({
        ...product,
        quantity: 1
      });
    }
  };

  const removeFromCart = (id) => {
    cartItems.value = cartItems.value.filter(item => item.id !== id);
  };

  const increaseQuantity = (id) => {
    const item = cartItems.value.find(product => product.id === id);

    if (item) {
      item.quantity += 1;
    }
  };

  const decreaseQuantity = (id) => {
    const item = cartItems.value.find(product => product.id === id);

    if (item && item.quantity > 1) {
      item.quantity -= 1;
    } else {
      removeFromCart(id);
    }
  };

  const clearCart = () => {
    cartItems.value = [];
  };

  const cartTotal = computed(() => {
    return cartItems.value.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  });

  const cartCount = computed(() => {
    return cartItems.value.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  });

  return {
    cartItems,
    cartTotal,
    cartCount,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart
  };
}