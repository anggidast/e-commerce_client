<template>
  <div class="nunito-font">
    <q-layout>
      <Navbar @shopTab="shopTab"></Navbar>

      <q-page-container>
        <q-page>
          <router-view></router-view>
          <div v-if="shop" class="absolute-top bg-white ">
            <q-tabs dense class="q-mb-xs" v-model="tab">
              <q-tab v-for="(cat, i) in categories" :key="i" :ripple="false" class="letter-space-2 q-mx-xs cursor-pointer" :name="cat" :label="cat" />
              <!-- <span
                v-for="(cat, i) in categories"
                :key="i"
                :ripple="false"
                class="letter-space-2 q-mx-lg q-my-md cursor-pointer text-uppercase"
                :name="cat"
                :class="{ 'text-grey-7': color[cat], 'tab-click': clicked[cat], 'default-border': !clicked[cat] }"
                @mouseenter="mouseOver(cat)"
                @mouseleave="mouseOver(cat)"
                @click="tabClick(cat)"
                >{{ cat }}
              </span> -->
            </q-tabs>
          </div>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref } from 'vue';
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  setup() {
    return {
      tab: ref('all'),
    };
  },
  data() {
    return {
      categories: ['all', 'tees', 'shirts', 'pants', 'outers', 'accessories'],
      shop: false,
    };
  },
  methods: {
    // mouseOver(btn) {
    //   this.hover = !this.hover;
    //   if (this.hover) this.color[btn] = 'grey-7';
    //   else this.color[btn] = '';
    // },
    // tabClick(category) {
    //   for (const key in this.clicked) {
    //     if (Object.hasOwnProperty.call(this.clicked, key)) {
    //       if (key == category) this.clicked[key] = true;
    //       else this.clicked[key] = false;
    //     }
    //   }
    // },
    shopTab(condition) {
      this.shop = condition;
      if (this.shop) this.tab = 'all';
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

.nunito-font {
  font-family: 'Nunito';
}

.poppins-font {
  font-family: 'Poppins';
}

.letter-space {
  letter-spacing: 1px;
}
.letter-space-2 {
  letter-spacing: 2px;
}

/* body.desktop .q-focusable:focus .q-focus-helper,
body.desktop .q-hoverable:hover .q-focus-helper,
body.ios .q-hoverable:active .q-focus-helpe {
  background: inherit !important;
  opacity: 0 !important;
}

.q-focus-helper {
  opacity: 0 !important;
  transition: unset !important;
} */
</style>
