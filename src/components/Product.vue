<template>
  <q-dialog v-model="card" class="desktop-only">
    <q-card class="my-card" flat square bordered style="width: 700px; max-width: 80vw;">
      <q-card-section horizontal>
        <q-carousel class="col-6" animated v-model="slide" arrows infinite control-color="grey-7" navigation swipeable>
          <q-carousel-slide v-for="(url, i) in image_urls" :key="i" :name="i + 1">
            <q-img :src="product[`image_url${i + 1}`]" />
          </q-carousel-slide>
        </q-carousel>

        <q-card-section>
          <div class="text-h2 text-grey-9 text-weight-regular poppins-font">
            {{ product.name }}
          </div>
          <div class="q-ml-xs q-mt-sm q-mb-md text-subtitle1 text-weight-bold text-grey">Rp. {{ product.price.toLocaleString('id-ID') }}</div>
          <div class="q-ml-xs text-body1 text-weight-medium text-grey-7">Description:</div>
          <div class="q-ml-xs text-body2 text-grey-7">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloremque commodi non! Vel, asperiores eos, aliquam repellendus iste
            optio voluptatem autem, commodi reprehenderit cum modi iusto excepturi et enim illum?
          </div>
          <div class="q-ml-xs q-mt-lg q-mb-xs text-caption text-grey-7">Stock: {{ product.stock }}</div>
          <q-btn
            @click="addToCart(product.id, $route.path)"
            v-close-popup
            class="full-width"
            color="black"
            size="md"
            label="add to cart"
            icon-right="o_shopping_bag"
          />
        </q-card-section>

        <div class="q-ma-xs absolute-right">
          <q-btn icon="close" size="lg" flat round dense v-close-popup @click="closeModal" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>

  <q-dialog v-model="card" class="mobile-only" full-width full-height>
    <q-card class="my-card" flat square bordered>
      <q-card-section>
        <q-carousel animated v-model="slide" arrows infinite control-color="grey-7" navigation swipeable>
          <q-carousel-slide v-for="(url, i) in image_urls" :key="i" :name="i + 1">
            <q-img :src="product[`image_url${i + 1}`]" class="full-height" />
          </q-carousel-slide>
        </q-carousel>

        <q-card-section>
          <div class="text-h4 text-grey-9 text-weight-regular poppins-font">
            {{ product.name }}
          </div>
          <div class="q-ml-xs q-mt-sm q-mb-md text-subtitle1 text-weight-bold text-grey">Rp. {{ product.price.toLocaleString('id-ID') }}</div>
          <div class="q-ml-xs text-body1 text-weight-medium text-grey-7">Description:</div>
          <div class="q-ml-xs text-body2 text-grey-7">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates doloremque commodi non! Vel, asperiores eos, aliquam repellendus iste
            optio voluptatem autem, commodi reprehenderit cum modi iusto excepturi et enim illum?
          </div>
          <div class="q-ml-xs q-mt-lg q-mb-xs text-caption text-grey-7">Stock: {{ product.stock }}</div>
          <q-btn
            @click="addToCart(product.id, $route.path)"
            v-close-popup
            class="full-width"
            color="black"
            size="md"
            label="add to cart"
            icon-right="o_shopping_bag"
          />
        </q-card-section>

        <div class="q-ma-xs absolute-right">
          <q-btn icon="close" size="md" flat round dense v-close-popup @click="closeModal" />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import Cart from '../components/ShoppingCart.vue';
import { ref } from 'vue';

export default {
  name: 'Product',
  components: {
    Cart,
  },
  setup() {
    return {
      card: ref(true),
      slide: ref(1),
    };
  },
  data() {
    return {};
  },
  computed: {
    product() {
      return this.$store.state.product;
    },
    image_urls() {
      return this.$store.getters.url;
    },
    routeBefore: {
      get() {
        return this.$store.state.routeBefore;
      },
      set(value) {
        this.$store.commit('SET_ROUTE', value);
      },
    },
    carts() {
      return this.$store.state.carts;
    },
    loginCart: {
      get() {
        return this.$store.state.loginCart;
      },
      set(value) {
        this.$store.commit('SET_LOGIN_CART', value);
      },
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
  methods: {
    addToCart(id, path) {
      if (!this.isLogin) {
        this.routeBefore = path;
        this.loginCart = true;
        this.$router.push('/login');
      } else {
        const cart = this.carts.find((el) => el.Product.id == id);
        if (cart) {
          if (cart.amount < cart.Product.stock) {
            this.$store.dispatch('editCart', {
              amount: cart.amount + 1,
              id: cart.id,
              path,
              productId: id,
            });
          } else {
            if (this.$route.path == `/product/${id}`) {
              this.$router.push('/cart');
            } else this.$router.push('/shop/cart');
          }
        } else {
          this.$store.dispatch('addCart', { id: id, path: path });
        }
      }
    },
    closeModal() {
      this.$router.push(this.routeBefore);
      this.routeBefore = '';
    },
  },
  updated() {
    const closeCart = this.$route.path.slice(-this.$route.path.length, -11);
    if (!closeCart) {
      this.$router.push('/');
    } else if (closeCart && closeCart != '/shop') {
      this.$router.push('/shop');
    } else {
      this.$router.push(closeCart);
    }
  },
};
</script>

<style></style>
