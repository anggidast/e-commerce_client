import { createStore } from 'vuex';
import Axios from 'axios';
import router from '../router';

const axios = Axios.create({
  baseURL: 'http://localhost:3000',
});

export default createStore({
  state: {
    allProducts: [],
    products: [],
    products: {},
  },
  mutations: {
    SET_PRODUCTS(state, payload) {
      state.allProducts = payload;
      state.allProducts.sort((a, b) => (a['createdAt'] > b['createdAt'] ? -1 : 1));
      state.products = state.allProducts;
    },
    FILTER_PRODUCTS(state, category) {
      state.products = state.allProducts;
      if (category != 'all') {
        state.products = state.products.filter((el) => el.category == category);
      }
    },
    SET_PRODUCT(state, payload) {
      state.product = payload;
    },
  },
  actions: {
    fetchData(context) {
      axios({
        method: 'GET',
        url: '/products',
        headers: {
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjI1ODQ4Mzc0fQ.g2kW9X__C11GqaBGhMKBGr_OeWeBmHEFIItl0OdfjMM',
        },
      })
        .then((result) => {
          console.log(result);
          context.commit('SET_PRODUCTS', result.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getProduct(context, id) {
      axios({
        method: 'GET',
        url: '/products/' + id,
        headers: {
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjI1ODQ4Mzc0fQ.g2kW9X__C11GqaBGhMKBGr_OeWeBmHEFIItl0OdfjMM',
        },
      })
        .then((result) => {
          console.log(result);
          context.commit('SET_PRODUCT', result.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {},
});
