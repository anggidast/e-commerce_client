<template>
  <div id="shop">
    <div class="q-pa-xs q-my-xs q-mx-auto" style="max-width: 300px">
      <div>
        <q-select clearable v-model="model" :options="options" label="Sorting by:" />
      </div>
    </div>

    <div v-if="loading">
      <div class="q-pa-md row items-start justify-center q-gutter-md">
        <q-card square flat bordered v-for="(product, i) in 10" :key="i" class="my-card desktop-only">
          <q-skeleton height="70vh" rect />
        </q-card>
        <q-card square flat bordered v-for="(product, i) in 10" :key="i" class="my-card-mobile mobile-only">
          <q-skeleton height="40vh" rect />
        </q-card>
      </div>
    </div>

    <div v-else>
      <div class="q-pa-md row items-start justify-center q-gutter-md desktop-only">
        <q-card square flat bordered v-for="product in products" :key="product" class="my-card">
          <q-img :src="product.image_url1" class="cursor-pointer" @click="openProduct(product.id)"></q-img>
          <q-card-section>
            <div class="text-h6 cursor-pointer" @click="openProduct(product.id)">{{ product.name }}</div>
            <div class="text-subtitle2">Rp. {{ product.price.toLocaleString('id-ID') }}</div>
          </q-card-section>
        </q-card>
      </div>

      <div class="q-py-md q-px-sm row justify-center q-gutter-sm mobile-only">
        <q-card square flat bordered v-for="product in products" :key="product" class="my-card-mobile">
          <q-img :src="product.image_url1" class="cursor-pointer" @click="openProduct(product.id)"></q-img>
          <q-card-section class="q-pa-sm">
            <div class="text-subtitle2 cursor-pointer" @click="openProduct(product.id)">{{ product.name }}</div>
            <div class="text-caption">Rp. {{ product.price.toLocaleString('id-ID') }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import { ref } from 'vue';
// import Cart from '../components/ShoppingCart.vue';

export default {
  name: 'Shop',
  // components: {
  //   Cart,
  // },
  setup() {
    return {
      model: ref(null),
      options: ['name', 'price'],
      desc: ref(false),
    };
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
    products() {
      return this.$store.state.products;
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
  methods: {
    openProduct(id) {
      this.routeBefore = this.$route.path;
      this.$store.dispatch('getProduct', {
        id: id,
        path: this.$route.path,
      });
    },
    sortBy(prop) {
      console.log(prop);
      if (prop) this.products.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
      else this.products.sort((a, b) => (a['createdAt'] > b['createdAt'] ? -1 : 1));
    },
  },
  watch: {
    model: {
      handler: function(newValue, oldValue) {
        this.sortBy(newValue);
      },
    },
  },
  created() {
    // this.$store.dispatch('fetchData');
    if (this.isLogin) this.$store.dispatch('fetchCart');
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 249px;
}
.my-card-mobile {
  width: 100%;
  max-width: 160px;
}
</style>
