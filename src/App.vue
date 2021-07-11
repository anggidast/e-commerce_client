<template>
  <div class="nunito-font">
    <q-layout>
      <Navbar></Navbar>

      <q-page-container>
        <q-page>
          <router-view></router-view>
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
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',

  components: {
    Navbar,
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
