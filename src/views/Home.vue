<template>
  <div class="home">
    <div v-if="loading">
      <q-skeleton class="desktop-only" height="80vh" rect />
      <q-skeleton class="mobile-only" height="50vh" rect />
      <div class="q-pa-md row items-start justify-center q-gutter-md">
        <q-card square flat bordered v-for="(product, i) in 5" :key="i" class="my-card desktop-only">
          <q-skeleton height="70vh" rect />
        </q-card>
        <q-card square flat bordered v-for="(product, i) in 4" :key="i" class="my-card-mobile mobile-only">
          <q-skeleton height="40vh" rect />
        </q-card>
      </div>
      <q-skeleton class="desktop-only" height="80vh" rect />
      <q-skeleton class="mobile-only" height="50vh" rect />
    </div>

    <div v-else>
      <!-- desktop banner -->
      <q-img class="desktop-only" src="../assets/banner3.jpg">
        <div class="absolute-full text-uppercase flex flex-center column">
          <div class="letter-space-2 q-mb-xs">new season, new outfits</div>
          <div class="text-h4 q-mb-md">autumn sale is here</div>
          <q-btn outline color="white" label="shop now" @click="shopNow" />
        </div>
      </q-img>

      <!-- mobile banner -->
      <q-img class="mobile-only" height="50vh" src="../assets/banner3.jpg">
        <div class="absolute-full text-uppercase flex flex-center column">
          <div class="text-caption letter-space-2 q-mb-xs">new season, new outfits</div>
          <div class="text-h5 q-mb-md">autumn sale is here</div>
          <q-btn size="sm" outline color="white" label="shop now" @click="shopNow" />
        </div>
      </q-img>

      <!-- desktop latest products -->
      <div class="text-center q-mt-md text-h5 text-grey-9">Latest From dast.co</div>

      <div class="q-pa-md row items-start justify-center q-gutter-md desktop-only">
        <q-card square flat bordered v-for="product in products" :key="product" class="my-card">
          <q-img :src="product.image_url1" class="cursor-pointer full-width" @click="openProduct(product.id)"></q-img>
          <q-card-section>
            <div class="text-h6 cursor-pointer" @click="openProduct(product.id)">{{ product.name }}</div>
            <div class="text-subtitle2">Rp. {{ product.price.toLocaleString('id-ID') }}</div>
          </q-card-section>
        </q-card>
      </div>

      <!-- mobile-latest-products -->
      <div class="q-py-md q-px-sm row justify-center q-gutter-sm mobile-only">
        <q-card square flat bordered v-for="(product, i) in products" :key="product" class="my-card-mobile">
          <q-img v-if="i < 4" :src="product.image_url1" class="cursor-pointer full-width" @click="openProduct(product.id)"></q-img>
          <q-card-section class="q-pa-sm" v-if="i < 4">
            <div class="text-subtitle2 cursor-pointer" @click="openProduct(product.id)">{{ product.name }}</div>
            <div class="text-caption">Rp. {{ product.price.toLocaleString('id-ID') }}</div>
          </q-card-section>
        </q-card>
      </div>

      <!-- desktop-banner-2 -->
      <q-img class="q-my-md desktop-only" src="../assets/banner2.jpg">
        <div class="absolute-full text-uppercase flex justify-center column items-end">
          <div class="text-right q-pr-xl">
            <div class="letter-space-2 q-mb-xs">new arrivals</div>
            <div class="text-h4 q-mb-md">shirts collection</div>
            <q-btn outline color="white" label="shop now" @click="shopShirts" />
          </div>
        </div>
      </q-img>

      <!-- mobile-banner-2 -->
      <q-img class="q-my-md mobile-only" height="50vh" src="../assets/banner2.jpg">
        <div class="absolute-full text-uppercase flex justify-center column items-end">
          <div class="text-right q-pr-md">
            <div class="text-caption letter-space-2 q-mb-xs">new arrivals</div>
            <div class="text-h5 q-mb-md">shirts collection</div>
            <q-btn size="sm" outline color="white" label="shop now" @click="shopShirts" />
          </div>
        </div>
      </q-img>

      <div v-if="!isLogin" class="text-center q-my-xl q-pa-xl">
        <div class="text-h6 text-uppercase q-mb-md">extra 10% for your first order</div>
        <div>Sign up to receive extra 10% for your first purchase,</div>
        <div>exclusive promotions and events.</div>
        <router-link to="/register" style="text-decoration: none">
          <q-btn square class="q-mt-md" color="dark" size="md" label="sign up" @click="router.push('/register')" />
        </router-link>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Home',
  setup() {
    return {
      slide: ref(1),
    };
  },
  methods: {
    shopNow() {
      this.$store.commit('SHOP_BANNER', {
        value: true,
      });
      this.$router.push('/shop');
    },
    shopShirts() {
      this.$store.commit('SHOP_BANNER', {
        value: true,
        category: 'Shirts',
      });
      this.$router.push('/shop');
    },
    openProduct(id) {
      this.routeBefore = this.$route.path;
      this.$store.dispatch('getProduct', {
        id: id,
        path: this.$route.path,
      });
    },
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
    products() {
      return this.$store.getters.newest;
    },
    routeBefore: {
      get() {
        return this.$store.state.routeBefore;
      },
      set(value) {
        this.$store.commit('SET_ROUTE', value);
      },
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
.my-card-mobile {
  width: 100%;
  max-width: 160px;
}
</style>
