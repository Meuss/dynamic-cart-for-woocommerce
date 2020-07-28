import Vue from 'vue';
import VueRouter from 'vue-router';
import Details from '../views/Details.vue';
import Cart from '../views/Cart.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Cart',
    component: Cart,
  },
  {
    path: '/details',
    name: 'Details',
    component: Details,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
