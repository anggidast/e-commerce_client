<template>
  <div class="home">
    <q-img src="../assets/banner2.jpg">
      <div class="absolute-full text-uppercase flex flex-center column">
        <div class="letter-space-2 q-mb-xs">new professional collection</div>
        <div class="text-h4 q-mb-md">nimble made shirts</div>
        <q-btn outline color="white" label="shop now" />
      </div>
    </q-img>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
  created() {
    this.$store.commit('SET_HOME', true);
  },
  mounted() {
    this.$store.dispatch('fetchCart');
  },
};
</script>

<style></style>
