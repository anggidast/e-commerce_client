<template>
  <div id="navbar" class="">
    <q-header class="q-py-xs text-dark bg-white">
      <q-toolbar>
        <div class="q-pa-md q-gutter-sm absolute-left">
          <q-btn :ripple="false" flat round class="text-dark" icon="search" @click="search = !search" :color="color.search" />
        </div>
        <q-toolbar-title
          class="q-mt-sm q-pb-xs text-h4 text-center text-grey-8 poppins-font cursor-pointer"
          @click="(tab = 'home'), changeTab('home')"
          ><span class="text-weight-medium">dast</span><span class="text-weight-light">inguished</span></q-toolbar-title
        >

        <div class="q-pa-md q-gutter-sm absolute-right">
          <q-btn :ripple="false" flat round class="text-dark" icon="person_outline" :color="color.person" />
          <q-btn :ripple="false" flat round class="text-dark" icon="o_shopping_bag" :color="color.bag"
            ><q-badge color="green" floating transparent>0</q-badge></q-btn
          >
        </div>
      </q-toolbar>

      <div v-if="search" class="q-mx-auto q-pt-xs q-pb-sm" style="max-width: 350px">
        <q-input square outlined v-model="text" label="Search" dense width="300px">
          <template v-slot:append>
            <q-icon name="close" @click="(text = ''), (search = !search)" class="cursor-pointer" />
          </template>
        </q-input>
      </div>

      <q-tabs v-if="!search" v-model="tab" @click="changeTab('')">
        <q-tab :ripple="false" class="letter-space-2 q-mx-sm q-mt-xs" name="home" label="home" />
        <q-tab :ripple="false" class="letter-space-2 q-mx-sm q-mt-xs" name="shop" label="shop" />
      </q-tabs>
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
      text: ref(''),
    };
  },

  data() {
    return {
      hover: false,
      color: {
        person: '',
        bag: '',
        search: '',
      },
      search: false,
    };
  },

  methods: {
    changeTab(home) {
      if (this.tab == 'shop' && !home) this.$emit('shopTab', true);
      else if (this.tab == 'home' || home) this.$emit('shopTab', false);
    },
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
