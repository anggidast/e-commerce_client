<template>
  <div>
    <q-dialog v-model="dialog" full-width full-height class="text-grey-9 mobile-only">
      <q-card square class="full-height" style="width: 500px">
        <q-card-section horizontal>
          <span class="q-my-sm q-ml-md text-weight-medium text-h5 text-uppercase poppins-font">your cart</span>
          <q-space />
          <q-btn icon="close" size="lg" flat round dense v-close-popup :to="close" />
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height:80%" class="scroll">
          <span v-if="!subTotal.amount" class="q-my-xs q-ml-md text-subtitle1">Your cart is empty</span>
          <q-card v-for="(cart, i) in carts" :key="cart.id" flat square style="height: 150px" class="full-width q-mb-lg">
            <q-card-section horizontal class="no-margin no-padding">
              <q-img class="q-mr-lg" style="max-width: 100px" :src="cart.Product.image_url1" />
              <q-card-section class="column no-margin no-padding">
                <span class="text-h6 q-mb-xs">{{ cart.Product.name }}</span>
                <span>Rp. {{ cart.Product.price.toLocaleString('id-ID') }}</span>
                <q-space />
                <span class="text-caption text-grey-7">Stock: {{ cart.Product.stock }}</span>
                <div style="max-width: 60px">
                  <q-input
                    type="number"
                    min="1"
                    :max="cart.Product.stock"
                    dense
                    square
                    outlined
                    v-model="cart.amount"
                    @change="editCart(i, cart.amount, cart.Product.stock, cart.Product.price, cart.id)"
                  ></q-input>
                </div>
              </q-card-section>
              <q-space />
              <q-card-section class="column no-margin no-padding">
                <q-checkbox v-model="checkbox[i]" @click="checked(i, cart.amount, cart.Product.price)" color="teal" />
                <q-space />
                <q-btn @click="deleteCart(cart.id)" dense :ripple="false" flat rounded icon="delete" />
              </q-card-section>
            </q-card-section>
            <q-separator class="q-my-sm" />
          </q-card>
        </q-card-section>

        <q-separator />

        <q-card-actions v-if="subTotal.amount" class="no-padding q-mt-xs" align="right">
          <div class="q-mt-xs q-ml-md text-subtitle1">
            Subtotal:
            <div class="text-weight-medium">Rp. {{ price.toLocaleString('id-ID') }}</div>
          </div>
          <q-space />
          <q-btn @click="checkOut" dense color="dark" class="q-mr-md" :label="`checkout (${amount})`" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="dialog" position="right" class="text-grey-9 desktop-only">
      <q-card square class="full-height" style="width: 500px">
        <q-card-section horizontal>
          <span class="q-my-sm q-ml-md text-weight-medium text-h5 text-uppercase poppins-font">your cart</span>
          <q-space />
          <q-btn icon="close" size="lg" flat round dense v-close-popup :to="close" />
        </q-card-section>

        <q-separator />

        <q-card-section style="max-height: 82%" class="scroll">
          <span v-if="!subTotal.amount" class="q-my-xs q-ml-md text-subtitle1">Your cart is empty</span>
          <q-card v-for="(cart, i) in carts" :key="cart.id" flat square style="height: 150px" class="full-width q-mb-lg">
            <q-card-section horizontal class="no-margin no-padding">
              <q-img class="q-mr-lg" style="max-width: 100px" :src="cart.Product.image_url1" />
              <q-card-section class="column no-margin no-padding">
                <span class="text-h6 q-mb-xs">{{ cart.Product.name }}</span>
                <span>Rp. {{ cart.Product.price.toLocaleString('id-ID') }}</span>
                <q-space />
                <span class="text-caption text-grey-7">Stock: {{ cart.Product.stock }}</span>
                <div style="max-width: 60px">
                  <q-input
                    type="number"
                    min="1"
                    :max="cart.Product.stock"
                    dense
                    square
                    outlined
                    v-model="cart.amount"
                    @change="editCart(i, cart.amount, cart.Product.stock, cart.Product.price, cart.id)"
                  ></q-input>
                </div>
              </q-card-section>
              <q-space />
              <q-card-section class="column no-margin no-padding">
                <q-checkbox v-model="checkbox[i]" @click="checked(i, cart.amount, cart.Product.price)" color="teal" />
                <q-space />
                <q-btn @click="deleteCart(cart.id)" dense :ripple="false" flat rounded icon="delete" />
              </q-card-section>
            </q-card-section>
            <q-separator class="q-my-sm" />
          </q-card>
        </q-card-section>

        <q-separator />

        <q-card-actions v-if="subTotal.amount" align="right">
          <span class="q-my-xs q-ml-md text-subtitle1"
            >Subtotal:<span class="text-weight-medium"> Rp. {{ price.toLocaleString('id-ID') }}</span></span
          >
          <q-space />
          <q-btn @click="checkOut" dense color="dark" class="q-mr-md" :label="`checkout (${amount})`" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'ShoppingCart',
  data() {
    return {
      amount: 0,
      price: 0,
    };
  },
  setup() {
    return {
      dialog: ref(true),
      fixed: ref(true),
      checkbox: ref([]),
      check: ref({}),
    };
  },
  computed: {
    carts() {
      return this.$store.state.carts;
    },
    close() {
      if (this.$route.path == '/cart') {
        return '/';
      } else if (this.$route.path == '/shop/cart') {
        return '/shop';
      } else {
        return '/myaddress';
      }
    },
    subTotal() {
      return this.$store.getters.subTotal;
    },
  },
  methods: {
    editCart(i, amount, stock, price, id) {
      if (amount <= stock && amount > 0) {
        this.$store.dispatch('editCart', {
          amount,
          id,
        });

        if (this.checkbox[i]) {
          this.amount -= this.check[i];
          this.price -= price * this.check[i];
          this.check[i] = +amount;
          this.amount += +amount;
          this.price += price * +amount;
        }
      } else {
        // TODO give some alert
        this.$store.dispatch('fetchCart');
      }
    },
    deleteCart(id) {
      this.$store.dispatch('deleteCart', id);
    },
    checked(i, amount, price) {
      if (this.checkbox[i]) {
        this.check[i] = amount;
        this.amount += amount;
        this.price += price * amount;
      } else {
        delete this.check[i];
        this.amount -= amount;
        this.price -= price * amount;
      }
    },
    checkOut() {
      this.$router.push('/checkout');
    },
  },
  created() {
    this.$store.dispatch('fetchCart');
    this.carts.forEach((el) => this.checkbox.push(false));
  },
  updated() {
    const closeCart = this.$route.path.slice(-this.$route.path.length, -5);
    if (!closeCart) {
      this.$router.push('/');
    } else {
      this.$router.push(closeCart);
    }
  },
};
</script>

<style></style>
