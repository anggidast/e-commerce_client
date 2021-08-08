<template>
  <!-- drawer -->
  <q-drawer v-model="drawer" :width="200" overlay bordered horizontal class="text-dark bg-white column justify-between">
    <div>
      <q-list v-if="shop" class="text-uppercase">
        <q-item>
          <q-item-section class="text-weight-bold text-subtitle1">
            select category
          </q-item-section>
        </q-item>
        <q-separator />
        <template v-for="(menu, index) in categories" :key="index">
          <q-item clickable v-ripple @click="changeCategory(menu), (drawer = false)">
            <q-item-section>
              {{ menu }}
            </q-item-section>
          </q-item>
        </template>
      </q-list>
      <q-list v-else class="text-uppercase q-mt-md">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="person_outline" />
          </q-item-section>
          <q-item-section>
            profile
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="(drawer = false), showCart()">
          <q-item-section avatar>
            <q-icon name="o_shopping_bag" />
          </q-item-section>
          <q-item-section>
            cart
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <q-space />
    <div>
      <q-separator />
      <q-item v-if="isLogin" clickable v-ripple @click="logout">
        <q-item-section class="text-weight-bold text-uppercase text-subtitle1">
          sign out
        </q-item-section>
      </q-item>
      <q-item v-else clickable v-ripple @click="login($route.path)">
        <q-item-section class="text-weight-bold text-uppercase text-subtitle1">
          sign in
        </q-item-section>
      </q-item>
    </div>
  </q-drawer>
</template>

<script>
export default {
  name: 'Drawer',

  data() {
    return {
      categories: ['all', 'tees', 'Shirts', 'Pants', 'Outers', 'Accessories'],
    };
  },

  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
    routeBefore: {
      get() {
        return this.$store.state.routeBefore;
      },
      set(value) {
        this.$store.commit('SET_ROUTE', value);
      },
    },
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(value) {
        this.$store.commit('SET_DRAWER', value);
      },
    },
    shop: {
      get() {
        return this.$store.state.shop;
      },
      set(value) {
        this.$store.commit('SET_SHOP', value);
      },
    },
    catTab: {
      get() {
        return this.$store.state.catTab;
      },
      set(value) {
        this.$store.commit('SET_TAB', value);
      },
    },
  },

  methods: {
    changeCategory(catArg) {
      if (catArg) this.catTab = catArg;
      this.categories.forEach((cat) => {
        if (this.catTab == cat) {
          this.$store.commit('FILTER_PRODUCTS', this.catTab);
        }
      });
    },
    showCart() {
      if (this.isLogin) {
        if (this.$route.path == '/') {
          this.$router.push('/cart');
        } else {
          this.$router.push(`${this.$route.path}/cart`);
        }
      } else {
        this.shop = false;
        this.login(this.$route.path);
      }
    },
    login(path) {
      if (!this.isLogin) {
        this.shop = false;
        this.routeBefore = path;
        this.$router.push('/login');
      }
    },
    logout() {
      localStorage.clear();
      this.$store.commit('SET_IS_LOGIN', false);
      this.$store.commit('SET_CARTS', []);
      this.$store.commit('REGISTER_SUCCESS', false);
    },
  },
};
</script>

<style></style>
