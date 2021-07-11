<template>
  <div id="navbar">
    <q-header elevated class="q-py-xs text-dark bg-white">
      <q-toolbar>
        <div class="q-pa-md q-gutter-sm absolute-left">
          <q-btn
            :ripple="false"
            flat
            round
            class="text-dark"
            icon="search"
            @mouseenter="mouseOver('search')"
            @mouseleave="mouseOver('search')"
            @click="search = !search"
            :color="color.search"
          />
        </div>
        <q-toolbar-title class="q-mt-sm q-pb-xs text-h4 text-center text-grey-8 poppins-font cursor-pointer" @click="tabClick('')"
          ><span class="text-weight-medium">dast</span><span class="text-weight-light">inguished</span></q-toolbar-title
        >

        <div class="q-pa-md q-gutter-sm absolute-right">
          <q-btn
            :ripple="false"
            flat
            round
            class="text-dark"
            icon="person_outline"
            @mouseenter="mouseOver('person')"
            @mouseleave="mouseOver('person')"
            :color="color.person"
          />
          <q-btn
            :ripple="false"
            flat
            round
            class="text-dark"
            icon="o_shopping_bag"
            @mouseenter="mouseOver('bag')"
            @mouseleave="mouseOver('bag')"
            :color="color.bag"
            ><q-badge color="green" floating transparent>0</q-badge></q-btn
          >
        </div>
      </q-toolbar>

      <div v-if="search" class="q-mx-auto q-pt-xs q-pb-sm default-border" style="max-width: 350px">
        <q-input square outlined v-model="text" label="Search" dense width="300px" class="default-border">
          <template v-slot:append>
            <q-icon name="close" @click="(text = ''), (search = !search)" class="cursor-pointer" />
          </template>
        </q-input>
      </div>

      <q-tabs v-if="!search" v-model="tab">
        <span
          v-for="(cat, i) in categories"
          :key="i"
          :ripple="false"
          class="letter-space-2 q-mx-lg q-my-md cursor-pointer text-uppercase"
          :name="cat"
          :class="{ 'text-grey-7': color[cat], 'tab-click': clicked[cat], 'default-border': !clicked[cat] }"
          @mouseenter="mouseOver(cat)"
          @mouseleave="mouseOver(cat)"
          @click="tabClick(cat)"
          >{{ cat }}</span
        >
        <!-- <q-tab
          v-for="(cat, i) in categories"
          :key="i"
          :ripple="false"
          class="letter-space-2 q-mx-md q-my-md"
          :name="cat"
          :label="cat"
          :class="{ 'text-grey-7': color[cat] }"
          @mouseenter="mouseOver(cat)"
          @mouseleave="mouseOver(cat)"
        /> -->
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
      tab: ref(''),
      text: ref(''),
    };
  },

  data() {
    return {
      hover: false,
      click: false,
      categories: ['all', 'tees', 'shirts', 'pants', 'outers', 'accessories'],
      color: {
        person: '',
        bag: '',
        search: '',
        all: '',
        tees: '',
        shirts: '',
        pants: '',
        outers: '',
        accessories: '',
      },
      clicked: {
        all: '',
        tees: '',
        shirts: '',
        pants: '',
        outers: '',
        accessories: '',
      },
      search: false,
    };
  },

  methods: {
    mouseOver(btn) {
      this.hover = !this.hover;
      if (this.hover) this.color[btn] = 'grey-7';
      else this.color[btn] = '';
    },
    tabClick(category) {
      for (const key in this.clicked) {
        if (Object.hasOwnProperty.call(this.clicked, key)) {
          if (key == category) this.clicked[key] = true;
          else this.clicked[key] = false;
        }
      }
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
