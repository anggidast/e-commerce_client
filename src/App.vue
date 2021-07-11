<template>
  <div class="nunito-font">
    <q-layout>
      <q-header elevated class="q-pb-sm text-dark bg-white">
        <q-toolbar>
          <div class="q-pa-md q-gutter-sm absolute-left">
            <q-btn
              :ripple="false"
              flat
              rounded
              class="text-dark"
              icon="search"
              @mouseenter="mouseOver('search')"
              @mouseleave="mouseOver('search')"
              :color="color.search"
            />
          </div>
          <q-toolbar-title class="q-mt-sm text-h4 text-center text-uppercase">dast</q-toolbar-title>
          <div class="q-pa-md q-gutter-sm absolute-right">
            <q-btn
              :ripple="false"
              flat
              rounded
              class="text-dark"
              icon="person_outline"
              @mouseenter="mouseOver('person')"
              @mouseleave="mouseOver('person')"
              :color="color.person"
            />
            <q-btn
              :ripple="false"
              flat
              rounded
              class="text-dark"
              icon="o_shopping_bag"
              label="(0)"
              @mouseenter="mouseOver('bag')"
              @mouseleave="mouseOver('bag')"
              :color="color.bag"
            />
          </div>
        </q-toolbar>
        <q-tabs v-model="tab">
          <q-tab
            :ripple="false"
            class="letter-space q-mx-xs"
            name="images"
            label="new arrivals"
            :class="{ 'text-grey-7': color.new }"
            @mouseenter="mouseOver('new')"
            @mouseleave="mouseOver('new')"
          />
          <q-tab
            :ripple="false"
            class="letter-space q-mx-xs"
            name="videos"
            label="shop"
            :class="{ 'text-grey-7': color.shop }"
            @mouseenter="mouseOver('shop')"
            @mouseleave="mouseOver('shop')"
          />
          <q-tab
            :ripple="false"
            class="letter-space q-mx-xs"
            name="articles"
            label="store"
            :class="{ 'text-grey-7': color.store }"
            @mouseenter="mouseOver('store')"
            @mouseleave="mouseOver('store')"
          />
        </q-tabs>
      </q-header>

      <!-- <q-drawer
        v-model="drawer"
        show-if-above
        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        :width="200"
        :breakpoint="500"
        bordered
        class="bg-grey-3"
      >
        <q-scroll-area class="fit">
          <q-list padding>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="inbox" />
              </q-item-section>

              <q-item-section>
                Inbox
              </q-item-section>
            </q-item>

            <q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="star" />
              </q-item-section>

              <q-item-section>
                Star
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="send" />
              </q-item-section>

              <q-item-section>
                Send
              </q-item-section>
            </q-item>

            <q-separator />

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="drafts" />
              </q-item-section>

              <q-item-section>
                Drafts
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer> -->

      <q-page-container>
        <q-page padding>
          <!-- <p v-for="n in 15" :key="n">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nihil praesentium molestias a adipisci, dolore vitae odit, quidem
            consequatur optio voluptates asperiores pariatur eos numquam rerum delectus commodi perferendis voluptate?
          </p> -->
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
import { ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'LayoutDefault',

  components: {
    HelloWorld,
  },

  setup() {
    return {
      tab: ref('images'),
    };
  },

  data() {
    return {
      hover: false,
      color: {
        person: '',
        bag: '',
        search: '',
        store: '',
        new: '',
        shop: '',
      },
    };
  },

  methods: {
    mouseOver(btn) {
      this.hover = !this.hover;
      if (this.hover) this.color[btn] = 'grey-7';
      else this.color[btn] = '';
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600&display=swap');

.nunito-font {
  font-family: 'Nunito';
}

.letter-space {
  letter-spacing: 1px;
}

body.desktop .q-focusable:focus .q-focus-helper,
body.desktop .q-hoverable:hover .q-focus-helper,
body.ios .q-hoverable:active .q-focus-helpe {
  background: inherit !important;
  opacity: 0 !important;
  color: rgba(0, 0, 0, 0.5) !important;
}

.q-focus-helper {
  opacity: 0 !important;
  transition: unset !important;
  color: rgba(0, 0, 0, 0.5) !important;
}
</style>
