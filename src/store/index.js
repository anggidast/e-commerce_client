import { createStore } from 'vuex';
import Axios from 'axios';
import router from '../router';

const axios = Axios.create({
  baseURL: 'https://dast-ecommerce.herokuapp.com',
  // baseURL: 'http://localhost:3000',
});

export default createStore({
  state: {
    loading: true,
    allProducts: [],
    products: [],
    categorizedProducts: [],
    product: {},
    carts: [],
    isLogin: false,
    register: false,
    routeBefore: '',
    loginCart: false,

    shopBanner: {},

    errorMsg: '',

    drawer: true,

    shop: false,

    catTab: 'all',

    addCart: {},
  },
  mutations: {
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
    SET_PRODUCTS(state, payload) {
      state.allProducts = payload;
      state.allProducts.sort((a, b) => (a['createdAt'] > b['createdAt'] ? -1 : 1));
      state.products = state.allProducts;
      state.categorizedProducts = state.products;
      state.loading = false;
    },
    FILTER_PRODUCTS(state, category) {
      state.products = state.allProducts;
      if (category != 'all') {
        if (category == 'tees') {
          state.products = state.products.filter((el) => el.category == 'T-Shirts');
        } else {
          state.products = state.products.filter((el) => el.category == category);
        }
      }
      state.categorizedProducts = state.products;
    },
    SET_PRODUCT(state, payload) {
      state.product = payload;
    },
    SET_CARTS(state, payload) {
      state.carts = payload;
      state.carts.sort((a, b) => (a['createdAt'] > b['createdAt'] ? -1 : 1));
    },
    SET_IS_LOGIN(state, payload) {
      state.isLogin = payload;
    },
    REGISTER_SUCCESS(state, payload) {
      state.register = payload;
    },
    SET_ROUTE(state, payload) {
      state.routeBefore = payload;
    },
    SET_LOGIN_CART(state, payload) {
      state.loginCart = payload;
    },
    KEYWORD_FILTER(state, keyword) {
      state.products = state.categorizedProducts;
      if (keyword && keyword != ' ') {
        let filteredProducts = [];
        state.products.forEach((el, i) => {
          let index = el.name.toLowerCase().indexOf(keyword);
          if (index != -1) {
            filteredProducts.push(state.products[i]);
          }
        });
        if (filteredProducts.length > 0) state.products = filteredProducts;
        else state.products = [];
      }
    },

    SHOP_BANNER(state, payload) {
      state.shopBanner = payload;
    },

    SET_ERROR_MSG(state, message) {
      state.errorMsg = message;
    },

    SET_DRAWER(state, payload) {
      state.drawer = payload;
    },

    SET_SHOP(state, payload) {
      state.shop = payload;
    },

    SET_TAB(state, payload) {
      state.catTab = payload;
    },

    SET_ADD_CART(state, payload) {
      state.addCart.path = payload.path;
      state.addCart.id = payload.id;
    },
  },
  actions: {
    fetchData(context) {
      context.commit('SET_LOADING', true);
      axios({
        method: 'GET',
        url: '/products',
      })
        .then((result) => {
          context.commit('SET_PRODUCTS', result.data.data);
          context.commit('SET_LOADING', false);
          console.log(result.data);
          // context.commit('SET_ERROR_MSG', '');
        })
        .catch((err) => {
          // context.commit('SET_ERROR_MSG', err.response.data.message);
          context.commit('SET_LOADING', false);
          console.log(err.response.data.message);
        });
    },
    getProduct(context, payload) {
      axios({
        method: 'GET',
        url: '/products/' + payload.id,
      })
        .then((result) => {
          console.log(result);
          context.commit('SET_PRODUCT', result.data.data);
          // context.commit('SET_ERROR_MSG', '');
          if (payload.path == '/shop') {
            router.push(`/shop/product/${payload.id}`);
          } else router.push(`/product/${payload.id}`);
        })
        .catch((err) => {
          // context.commit('SET_ERROR_MSG', err.response.data.message);
          console.log(err.response.data.message);
        });
    },
    addCart(context, { id, path }) {
      axios({
        method: 'POST',
        url: '/carts/' + id,
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          amount: 1,
        },
      })
        .then((result) => {
          console.log(result);
          context.commit('SET_ADD_CART', { path: path, id: id });
          context.dispatch('fetchCart');

          // context.commit('SET_ERROR_MSG', '');
        })
        .catch((err) => {
          context.commit('SET_ERROR_MSG', err.response.data.message);
          console.log(err.response.data.message);
        });
    },
    fetchCart(context) {
      axios({
        method: 'GET',
        url: '/carts',
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          console.log(result);
          context.commit('SET_CARTS', result.data.data);
          if (context.state.addCart.path) {
            if (context.state.addCart.path == `/product/${context.state.addCart.id}`) {
              router.push('/cart');
            } else router.push('/shop/cart');
          }
          // context.commit('SET_ERROR_MSG', '');
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
    editCart(context, payload) {
      axios({
        method: 'PUT',
        url: '/carts/' + payload.id,
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          amount: payload.amount,
        },
      })
        .then((result) => {
          console.log(result);
          context.commit('SET_ADD_CART', { path: payload.path, id: payload.productId });
          context.dispatch('fetchCart');
          // context.commit('SET_ERROR_MSG', '');
        })
        .catch((err) => {
          // context.commit('SET_ERROR_MSG', err.response.data.message);
          console.log(err.response.data.message);
        });
    },
    deleteCart(context, id) {
      console.log(context);
      axios({
        method: 'DELETE',
        url: '/carts/' + id,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then((result) => {
          console.log(result);
          context.dispatch('fetchCart');
          // context.commit('SET_ERROR_MSG', '');
        })
        .catch((err) => {
          // context.commit('SET_ERROR_MSG', err.response.data.message);
          console.log(err.response.data.message);
        });
    },
    login(context, payload) {
      axios({
        method: 'POST',
        url: '/login',
        data: {
          email: payload.email,
          password: payload.password,
        },
      })
        .then((result) => {
          console.log(result);
          context.commit('SET_IS_LOGIN', true);
          context.commit('SET_ERROR_MSG', '');
          localStorage.setItem('access_token', result.data.access_token);
          router.push(context.state.routeBefore);
        })
        .catch((err) => {
          context.commit('SET_ERROR_MSG', err.response.data.message);
          console.log(err.response.data.message);
        });
    },
    register(context, payload) {
      axios({
        method: 'POST',
        url: '/register',
        data: {
          email: payload.email,
          password: payload.password,
        },
      })
        .then((result) => {
          console.log(result);
          context.commit('REGISTER_SUCCESS', true);
          context.commit('SET_ERROR_MSG', '');
          router.push('/login');
        })
        .catch((err) => {
          context.commit('SET_ERROR_MSG', err.response.data.message);
          console.log(err.response.data.message);
        });
    },
  },
  getters: {
    url(state) {
      let image_urls = 0;
      for (let i = 0; i < 5; i++) {
        if (state.product[`image_url${i + 1}`]) image_urls++;
      }
      return image_urls;
    },
    newest(state) {
      return state.products.sort((a, b) => (a['createdAt'] > b['createdAt'] ? -1 : 1)).slice(0, 5);
    },
    subTotal(state) {
      let amount = 0;
      let price = 0;
      state.carts.forEach((cart) => {
        amount += cart.amount;
        price += cart.Product.price * cart.amount;
      });
      return { amount, price };
    },
  },
  modules: {},
});
