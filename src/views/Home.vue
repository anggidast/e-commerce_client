<template>
  <div class="home">
    <q-img src="../assets/banner2.jpg">
      <div class="absolute-full text-uppercase flex flex-center column">
        <div class="letter-space-2 q-mb-xs">new arrivals</div>
        <div class="text-h4 q-mb-md">shirts collection</div>
        <q-btn outline color="white" label="shop now" @click="shopShirts" />
      </div>
    </q-img>

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
import { ref } from 'vue'

export default {
  name: 'Home',
  setup () {
    return {
      slide: ref(1)
    }
  },
  methods: {
    shopShirts() {
      this.$store.commit('SHOP_BANNER', true)
      this.$router.push('/shop');
    },
    openProduct(id) {
      this.$store.dispatch('getProduct', id);
    },
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    products() {
      return this.$store.getters.newest;
    },
  },
  created() {
    if (this.isLogin) this.$store.dispatch('fetchCart');
  },
  mounted() {},
};
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 250px;
}
</style>
