<template>
  <div>
    <q-card square flat class="row justify-center">
      <q-banner v-if="errorMsg" style="width: 400px" class="text-white bg-red row justify-center"> {{ errorMsg }}! </q-banner>
    </q-card>
    <q-card square flat style="width: 400px" class="absolute-center text-grey-9">
      <q-card-section horizontal>
        <q-space />
        <span class="text-h5 text-weight-bold">SIGN UP</span>
        <q-space />
      </q-card-section>
      <q-card-section>
        <q-form @submit="register">
          <span class="text-weight-bold">Email</span>
          <q-input type="email" class="q-mt-sm q-mb-md" square outlined v-model="email" dense required />
          <span class="text-weight-bold">Password</span>
          <q-input class="q-mt-sm q-mb-md" :type="isPwd ? 'password' : 'text'" square outlined v-model="password" dense required>
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <q-btn type="submit" square class="full-width" color="dark" size="md" label="sign up" />
        </q-form>
      </q-card-section>
      <q-card-section horizontal>
        <q-space />
        <span class="text-caption"
          >Already have an account? <router-link to="/login" class="text-black text-body2" style="text-decoration: none;">Sign In</router-link></span
        >
        <q-space />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      email: '',
      password: '',
      isPwd: true,
    };
  },
  computed: {
    loginCart: {
      get() {
        return this.$store.state.loginCart;
      },
      set(value) {
        this.$store.commit('SET_LOGIN_CART', value);
      },
    },
    errorMsg() {
      return this.$store.state.errorMsg;
    },
  },
  methods: {
    register() {
      this.$store
        .dispatch('register', {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.email = '';
          this.password = '';
        });
    },
  },
  created() {
    window.scrollTo(0, 0);
  },
  unmounted() {
    if (this.$route.path != '/login') this.loginCart = false;
    this.$store.commit('SET_ERROR_MSG', '');
  },
};
</script>

<style></style>
