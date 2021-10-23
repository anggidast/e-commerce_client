import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Shop from '../views/Shop.vue';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import AddressPage from '../views/AddressPage.vue';
import CheckOutPage from '../views/CheckOutPage.vue';
import Product from '../components/Product.vue';
import Cart from '../components/ShoppingCart.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'cart',
        name: 'HomeCart',
        component: Cart,
        meta: { requiresAuth: true },
      },
      {
        path: 'product/:id',
        name: 'Latest',
        component: Product,
      },
    ],
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop,
    children: [
      {
        path: 'product/:id',
        name: 'Product',
        component: Product,
      },
      {
        path: 'cart',
        name: 'Cart',
        component: Cart,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/myaddress',
    name: 'AddressPage',
    component: AddressPage,
    children: [
      {
        path: 'cart',
        name: 'AddressCart',
        component: Cart,
        meta: { requiresAuth: true },
      },
      // {
      //   path: 'form',
      //   name: 'AddressForm',
      //   component: AddressForm,
      // },
    ],
  },
  {
    path: '/checkout',
    name: 'CheckOutPage',
    component: CheckOutPage,
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      if (localStorage.access_token) next('/');
      else next();
    },
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage,
    beforeEnter: (to, from, next) => {
      if (localStorage.access_token) next('/');
      else next();
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!localStorage.getItem('access_token')) {
      next({
        path: '/login',
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
