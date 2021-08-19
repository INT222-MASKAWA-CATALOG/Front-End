<template>
  <div class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
    <div class="relative w-xl my-6 mx-auto max-w-xl">
      <!--content-->
      <div class="border-0 rounded-lg shadow-lg w-96 bg-white outline-none focus:outline-none">
        <!--header-->
        <div class="flex flex-col items-start justify-between">
          <!-- Close Icon -->
          <button class="ri-close-line p-1 ml-auto text-black float-right text-3xl font-semibold" v-on:click="toggleModalRegister()" />
          <img src="../assets/maskawa_logo.png" class="w-48 mx-auto" />
          <div class="mx-auto font-semibold" style="color: #FCD109;">REGISTER A NEW ACCOUNT</div>
        </div>
        <!--body-->
        <form @submit.prevent="submitRegister" >
          <div class="py-6 px-16">
            <div class="username flex flex-col">
              <label for="username" class="text-gray-400 font-light text-left">Username</label>
              <input type="text" id="username" v-model="username" placeholder="" class="border-2 border-gray-300 rounded-md focus:outline-none py-1 px-2" />
            </div>
            <div class="password flex flex-col">
              <label for="password" class="text-gray-400 font-light text-left">Password</label>
              <input type="password" id="password" v-model="password" placeholder="" class="border-2 border-gray-300 rounded-md focus:outline-none py-1 px-2" />
            </div>
            <div class="email flex flex-col">
              <label for="email" class="text-gray-400 font-light text-left">Email</label>
              <input type="text" id="email" v-model="email" placeholder="" class="border-2 border-gray-300 rounded-md focus:outline-none py-1 px-2" />
            </div>
            <div class="phone flex flex-col">
              <label for="phone" class="text-gray-400 font-light text-left">Phone Number</label>
              <input type="text" id="phone" v-model="phone" placeholder="" class="border-2 border-gray-300 rounded-md focus:outline-none py-1 px-2" />
            </div>
            <div class="gender flex flex-col">
              <label for="gender" class="text-gray-400 font-light text-left">Gender</label>
              <div class="radio-toolbar grid grid-cols-2 gap-2 my-2">
                  <input type="radio" id="radioMen" value="men" v-model="gender" class="opacity-0 fixed w-0">
                  <label for="radioMen" class="radioGender inline-block bg-gray-100 px-2 py-1 border-2 border-gray-300 rounded-md select-none">MEN</label>

                  <input type="radio" id="radioWomen" value="women" v-model="gender" class="opacity-0 fixed w-0">
                  <label for="radioWomen" class="radioGender inline-block bg-gray-100 px-2 py-1 border-2 border-gray-300 rounded-md select-none">WOMEN</label>
              </div>
            </div>
          </div>
        <!--footer-->
          <div class="flex items-center justify-center px-16 pt-2">
            <button type="submit" class="bg-yellowPastel py-2 w-full rounded-lg font-medium">REGISTER</button>
          </div>
        </form>
        <div class="pb-12 text-sm text-gray-300 font-light">
          Already have an account? 
          <button class="select-none text-orange hover:text-green-600" v-on:click="toLogin()">
            Login
          </button>
        </div>
      </div>
    </div>
  </div>
    
</template>

<style>
.radio-toolbar label:hover {
  background-color: #6FCDEB;
}

.radio-toolbar input[type="radio"]:focus + label {
    border: 2px #6FCDEB;
}

.radio-toolbar input[type="radio"]:checked + label {
    background-color: #6FCDEB;
    color: #FFF;
}
</style>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      email: "",
      phone: "",
      gender: "",
    }
  },
  methods: {
    async submitRegister () {
      alert(this.username + this.password + this.gender)
    },
    async toggleModalRegister () {
      this.$emit("toggle-modal-register");
    },
    async toLogin() {
      alert("Login")
    }
  }
}
</script>