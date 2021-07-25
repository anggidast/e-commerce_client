<template>
  <div id="shop">
    <div class="q-pa-md row items-start justify-center q-gutter-md">
      <q-card flat bordered v-for="product in products" :key="product" class="my-card">
        <q-img :src="product.image_url1" class="cursor-pointer" @click="openProduct(product.id)"></q-img>
        <q-card-section>
          <div class="text-h6 cursor-pointer" @click="openProduct(product.id)">{{ product.name }}</div>
          <div class="text-subtitle2">Rp. {{ product.price }}</div>
        </q-card-section>
      </q-card>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Cart from '../components/ShoppingCart.vue';

export default {
  name: 'Shop',
  components: {
    Cart,
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    products() {
      return this.$store.state.products;
    },
  },
  methods: {
    openProduct(id) {
      this.$store.dispatch('getProduct', id);
    },
  },
  created() {
    // this.$store.dispatch('fetchData')
    if (this.isLogin) this.$store.dispatch('fetchCart');
  },
};
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 250px;
}
</style>
