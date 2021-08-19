<template>
  <div class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
    <div class="relative w-xl my-6 mx-auto max-w-xl">
      <!--content-->
      <div class="rounded-lg shadow-lg w-96 bg-white outline-none focus:outline-none">
        <!--header-->
        <div class="flex flex-col items-start justify-between">
          <!-- Close Icon -->
          <button class="ri-close-line p-1 ml-auto text-black float-right text-3xl font-semibold" v-on:click="toggleModalLogin()" />
          <img src="../assets/maskawa_logo.png" class="w-48 mx-auto" />
        </div>
        <!--body-->
        <form @submit.prevent="submitLogin" >
          <div class="py-6 px-16">
            <div class="username flex flex-col">
              <label for="username" class="text-gray-400 font-light text-left">Username</label>
              <input type="text" id="username" v-model="username" placeholder="" class="border-2 border-gray-300 rounded-md focus:outline-none py-1 px-2" />
            </div>
            <div class="password flex flex-col">
              <label for="password" class="text-gray-400 font-light text-left">Password</label>
              <input type="text" id="password" v-model="password" placeholder="" class="border-2 border-gray-300 rounded-md focus:outline-none py-1 px-2" />
            </div>
          </div>
        <!--footer-->
          <div class="flex items-center justify-center px-16 pt-2">
            <button type="submit" class="bg-yellowPastel py-4 w-full rounded-lg font-semibold">LOGIN</button>
          </div>
        </form>
        <div class="pb-12 text-sm text-gray-300">
          Don’t have an account? 
          <button class="select-none text-sky border-sky border-b-4 hover:text-blue-700 hover:border-blue-700" v-on:click="toRegister()">
            Register
          </button>
        </div>
      </div>
    </div>
  </div>
    
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    }
  },
  methods: {
    async submitLogin () {
      alert(this.username + this.password)
    },
    async toggleModalLogin () {
      this.$emit("toggle-modal-login");
    },
    async toRegister() {
      alert("Register")
    }
  }
}
</script>