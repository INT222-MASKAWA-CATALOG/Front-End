<template>
  <div class="navbar">
    <div class="bg-grayon select-none text-right py-0.5 pr-8">
      <button class="" v-on:click="toggleModalLogin()">Login</button>
      <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
      <button class="" v-on:click="toggleModalRegister()">Register</button>
    </div>
    <div class="flex shadow-md">
      <div class="mr-auto justify-center"><router-link to="/home"><img src="../assets/maskawa_logo.png" class="h-16"></router-link></div>
      <div class="self-center text-xl select-none justify-center">{{ head }}</div>
      <div class="self-center flex pr-7 ml-auto justify-center">
        <div class="border bg-gray-200 rounded-full p-1 mx-1">
          <i class="ri-search-line text-lg"></i>&nbsp;&nbsp;
          <input type="text" placeholder="Search" class="bg-gray-200 focus:outline-none" />
        </div>
        <i class="ri-bookmark-3-fill text-3xl"></i>
      </div>
    </div>
  </div>
  <!-- End Navigation Bar -->

  <!-- Start Login Modal -->
  <login v-if="showModalLogin" @toggle-modal-login="toggleModalLogin" @switch-modal-login-register="switchModalLoginRegister" />
  <div v-if="showModalLogin" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  <!-- End Login Modal -->

    <!-- Start Register Modal -->
  <register v-if="showModalRegister" @toggle-modal-register="toggleModalRegister" @switch-modal-login-register="switchModalLoginRegister" />
  <div v-if="showModalRegister" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  <!-- End Register Modal -->

</template>

<script>
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
export default {
  components: {
        Login,
        Register
    },
  props: {
    head: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      showModalLogin: false,
      showModalRegister: false
    }
  },
  methods: {
    async toggleModalLogin () {
      this.showModalLogin = !this.showModalLogin;
    },
    async toggleModalRegister () {
      this.showModalRegister = !this.showModalRegister;
    },
    async switchModalLoginRegister() {
      this.showModalLogin = !this.showModalLogin;
      this.showModalRegister = !this.showModalRegister;
    }
  }
};
</script>
