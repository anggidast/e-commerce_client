<template>
  <div class="nunito-font">
    <q-layout view="lHh lpr lff">
      <Navbar></Navbar>

      <Drawer></Drawer>

      <q-page-container>
        <q-page class="q-mb-md">
          <router-view></router-view>
        </q-page>
      </q-page-container>

      <Footer></Footer>
    </q-layout>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import Drawer from './components/Drawer.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    Drawer,
  },
  created() {
    this.$store.dispatch('fetchData');
    this.$store.dispatch('fetchCart');
    if (localStorage.access_token) {
      this.$store.commit('SET_IS_LOGIN', true);
    } else {
      this.$store.commit('SET_IS_LOGIN', false);
    }
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
