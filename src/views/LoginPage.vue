<template>
  <div>
    <q-card square flat class="row justify-center">
      <q-banner v-if="registerSuccess" style="width: 400px" class="text-white bg-green row justify-center">
        Sign up completed. You can sign in now
      </q-banner>

      <q-banner v-if="errorMsg" style="width: 400px" class="text-white bg-red row justify-center"> {{ errorMsg }}! </q-banner>
    </q-card>

    <div class="row justify-center">
      <q-card square flat style="width: 400px" class="text-grey-9">
        <q-card-section horizontal>
          <q-space />
          <span class="text-h5 text-weight-bold">SIGN IN</span>
          <q-space />
        </q-card-section>
        <q-card-section>
          <q-form @submit="login">
            <span class="text-weight-bold">Email</span>
            <q-input type="email" class="q-mt-sm q-mb-md" square outlined v-model="email" dense required />
            <div class="row justify-between">
              <span class="text-weight-bold">Password</span>
              <span class="text-weight-bolder text-green cursor-pointer" @click="forget = true">Forget Password?</span>
            </div>
            <q-input class="q-mt-sm q-mb-md" :type="isPwd ? 'password' : 'text'" square outlined v-model="password" dense required>
              <template v-slot:append>
                <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="isPwd = !isPwd" />
              </template>
            </q-input>
            <q-btn type="submit" square class="full-width" color="dark" size="md" label="sign in" />
          </q-form>
        </q-card-section>
        <q-card-section horizontal>
          <q-space />
          <span class="text-caption"
            >Dont't have an account?
            <router-link to="/register" class="text-black text-body2" style="text-decoration: none;">Sign Up</router-link></span
          >
          <q-space />
        </q-card-section>
      </q-card>
    </div>

    <q-dialog v-model="forget" flat square bordered>
      <q-card>
        <q-card-section>
          <div class="text-h6">Forget Password?</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Relax, take a deep breath, and try to remember your password :)
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Thanks!" color="green" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'LoginPage',
  setup() {
    return {
      forget: ref(false),
    };
  },
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
    registerSuccess: {
      get() {
        return this.$store.state.register;
      },
      set(value) {
        this.$store.commit('REGISTER_SUCCESS', value);
      },
    },
    errorMsg() {
      return this.$store.state.errorMsg;
    },
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password,
      });
    },
  },
  created() {
    window.scrollTo(0, 0);
  },
  unmounted() {
    if (this.$route.path != '/register') this.loginCart = false;
    this.$store.commit('REGISTER_SUCCESS', false);
    this.$store.commit('SET_ERROR_MSG', '');
  },
};
</script>

<style></style>
