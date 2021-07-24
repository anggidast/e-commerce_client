<template>
  <div class="home">
    <q-img src="../assets/banner2.jpg">
      <div class="absolute-full text-uppercase flex flex-center column">
        <div class="letter-space-2 q-mb-xs">new arrival</div>
        <div class="text-h4 q-mb-md">shirts collection</div>
        <q-btn outline color="white" label="shop now" />
      </div>
    </q-img>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
  created() {
    if (this.isLogin) this.$store.dispatch('fetchCart');
  },
  mounted() {},
};
</script>

<style></style>
