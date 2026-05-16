import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import ProductDetailView from '../views/ProductDetailView.vue';
import ProductFormView from '../views/ProductFormView.vue';
import NotFoundView from '../views/NotFoundView.vue';

const CartView = () => import('../views/CartView.vue');
const AboutView = () => import('../views/AboutView.vue');

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/product/new',
    name: 'product-new',
    component: ProductFormView
  },
  {
    path: '/product/:id',
    name: 'product-detail',
    component: ProductDetailView
  },
  {
    path: '/product/:id/edit',
    name: 'product-edit',
    component: ProductFormView
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFoundView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;