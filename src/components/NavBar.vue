<template>
  <div class="bg-grayon select-none text-right py-1 pr-5">
    <span>Login</span> &nbsp;|&nbsp;
    <span>Register</span>
  </div>
  <div class="grid grid-cols-3 justify-items-stretch shadow-md">
    <div><router-link to="/home"><img src="../assets/maskawa_logo.png" class="h-16" /></router-link></div>
    <div class="justify-self-center self-center text-xl">{{ head }}</div>
    <div class="flex justify-self-end self-center pr-4">
      <div class="border bg-gray-200 rounded-full p-1 mx-1">
        <i class="ri-search-line text-lg"></i>&nbsp;&nbsp;
        <input type="text" placeholder="Search" class="bg-gray-200 focus:outline-none" />
      </div>
      <i class="ri-bookmark-3-fill text-3xl"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    head: {
      type: String,
      require: true,
    },
  },
};
</script>
