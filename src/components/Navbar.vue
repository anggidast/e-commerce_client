<template>
  <div id="navbar" class="">
    <q-header class="q-py-xs text-dark bg-white">
      <q-toolbar>
        <div class="q-pa-md q-gutter-sm absolute-left">
          <q-btn v-if="!sign" class="mobile-only" dense :ripple="false" flat @click="drawer = !drawer" round icon="menu" />
          <q-btn
            v-if="!sign"
            dense
            :ripple="false"
            flat
            round
            class="text-dark"
            icon="search"
            @click="searchButton($route.path)"
            :color="color.search"
          />
        </div>

        <q-toolbar-title class="q-mt-sm q-pb-xs text-h4 text-center text-grey-8 poppins-font" @click="(tab = 'home'), changeTab('home')">
          <span class="cursor-pointer" @click="(tab = 'home'), changeTab('home')">
            <span class="text-weight-medium">dast</span><span class="text-weight-bold text-red">.</span><span class="text-weight-light">co</span>
          </span>
        </q-toolbar-title>

        <div class="q-pa-md q-gutter-sm absolute-right">
          <q-btn
            v-if="!sign"
            dense
            :ripple="false"
            flat
            round
            class="text-dark desktop-only"
            icon="person_outline"
            @click="login($route.path)"
            :color="color.person"
          >
            <q-menu dense v-if="isLogin">
              <q-list dense style="min-width: 100px">
                <q-item dense clickable v-close-popup>
                  <q-item-section dense @click="logout">SIGN OUT</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn v-if="!sign" @click="showCart" dense :ripple="false" flat round class="text-dark" icon="o_shopping_bag" :color="color.bag">
            <q-badge v-if="carts.length > 0" color="green" floating transparent>{{ carts.length }}</q-badge>
          </q-btn>
        </div>
      </q-toolbar>

      <div v-if="search" class="q-mx-auto q-pt-xs q-pb-sm" style="max-width: 350px">
        <q-input @keyup="searchKeyword" square outlined v-model="keyword" label="Search" dense :autofocus="true" class="desktop-only">
          <template v-slot:append>
            <q-icon name="close" @click="closeSearch" class="cursor-pointer" />
          </template>
        </q-input>

        <q-input
          @keyup="searchKeyword"
          square
          outlined
          v-model="keyword"
          label="Search"
          dense
          :autofocus="true"
          class="mobile-only"
          style="font-size: 16px;"
        >
          <template v-slot:append>
            <q-icon name="close" @click="closeSearch" class="cursor-pointer" />
          </template>
        </q-input>
      </div>

      <q-tabs v-if="!search" v-model="tab">
        <q-route-tab to="/" exact :ripple="false" class="letter-space q-mx-sm q-mt-xs" name="home" label="home" @click="changeTab()" />
        <q-route-tab to="/shop" exact :ripple="false" class="letter-space q-mx-sm q-mt-xs" name="shop" label="shop" @click="changeTab()" />
      </q-tabs>

      <div v-if="shop && !loginCart" class="bg-white desktop-only">
        <q-tabs dense class="q-mb-xs" v-model="catTab" @click="changeCategory('')">
          <q-tab v-for="(cat, i) in categories" :key="i" :ripple="false" class="letter-space q-mx-xs cursor-pointer" :name="cat" :label="cat" />
        </q-tabs>
      </div>
    </q-header>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Navbar',

  setup() {
    return {
      tab: ref('home'),
      // catTab: ref('all'),
      keyword: ref(''),
      // drawer: ref(true),
    };
  },

  data() {
    return {
      hover: false,
      categories: ['all', 'tees', 'Shirts', 'Pants', 'Outers', 'Accessories'],
      color: {
        person: '',
        bag: '',
        search: '',
      },
      search: false,
      // shop: false,
      sign: false,
    };
  },
  computed: {
    carts() {
      return this.$store.state.carts;
    },
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
    catTab: {
      get() {
        return this.$store.state.catTab;
      },
      set(value) {
        this.$store.commit('SET_TAB', value);
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
    loginCart: {
      get() {
        return this.$store.state.loginCart;
      },
      set(value) {
        this.$store.commit('SET_LOGIN_CART', value);
      },
    },
    shopBanner() {
      return this.$store.state.shopBanner;
    },
  },

  methods: {
    changeTab(home) {
      if (this.tab == 'shop') {
        this.shop = false;
        // this.$router.push('/shop');
      } else if (this.tab == 'home' && !home) {
        this.catTab = 'all';
        this.changeCategory('all');
        // if (this.catTab == 'all') this.$store.dispatch('fetchData');
        this.shop = true;
      } else if (home) {
        this.shop = false;
        this.tab = 'home';
        this.$router.push('/');
      }
      window.scrollTo(0, 0);
    },
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
    searchKeyword() {
      this.tab = 'shop';
      this.changeTab();
      this.$store.commit('KEYWORD_FILTER', this.keyword);
    },
    searchButton(path) {
      this.keyword = '';
      this.search = !this.search;
      this.routeBefore = path;
    },
    closeSearch() {
      this.text = '';
      this.search = !this.search;
      this.keyword = '';
      this.searchKeyword();
      if (this.routeBefore == '/') this.changeTab('home');
      else this.$router.push(this.routeBefore);
      this.routeBefore = '';
    },
  },

  watch: {
    $route: {
      handler: function(newValue, oldValue) {
        if (newValue.path == '/shop') {
          this.shop = true;
          // this.loginCart = false;
        }
        if (newValue.path == '/login' || newValue.path == '/register') {
          this.sign = true;
        } else {
          this.sign = false;
        }
      },
    },
    shopBanner: {
      handler: function(newValue, oldValue) {
        if (newValue.value == true) {
          this.tab = 'shop';
          if (newValue.category) {
            this.catTab = newValue.category;
            this.changeCategory();
          } else {
            this.catTab = 'all';
            this.changeCategory();
          }
          this.changeTab();
          this.$store.commit('SHOP_BANNER', false);
        }
      },
    },
  },
  created() {
    if (this.tab == 'home') {
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>
.tab-click {
  border-bottom: 1px solid red;
}
.default-border {
  border-bottom: 1px solid white;
}
</style>
