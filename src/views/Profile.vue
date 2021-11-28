<template>
  <nav-bar head="MASKAWA" />
  <div class="bg-yellowYoung w-5/12 mx-auto text-center mt-20 rounded-xl pt-8 shadow-md">
    <img src="../assets/face.png" class="mx-auto" />
    <div>Welcome, <span class="uppercase">{{ this.userProfile.username }}</span></div>
    <div>Manage your info, privacy and security to make work better for you.</div>
    <div class="flex justify-center my-2">
      <span class="bg-tp w-20 rounded-tl-full rounded-bl-full">Email</span>
      <span class="bg-white w-60 rounded-tr-full rounded-br-full">{{ this.userProfile.email }}</span>
    </div>
    <div class="flex justify-center my-2">
      <span class="bg-tp w-20 rounded-tl-full rounded-bl-full">Phone</span>
      <span class="bg-white w-60 rounded-tr-full rounded-br-full">{{ this.userProfile.phone }}</span>
    </div>
    <div class="flex justify-center my-2">
      <span class="bg-tp w-20 rounded-tl-full rounded-bl-full">Gender</span>
      <span class="bg-white w-60 rounded-tr-full rounded-br-full">{{ this.userProfile.gender }}</span>
    </div>
    <div class="flex justify-center my-2">
      <span class="bg-tp w-20 rounded-tl-full rounded-bl-full">Role</span>
      <span class="bg-white w-60 rounded-tr-full rounded-br-full">{{ this.userProfile.role.name }}</span>
    </div>
		<button class="bg-yellow-300 shadow-md mt-4 mb-8 px-4 py-1 rounded-xl">Edit Profile</button>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
  props: {},
  data() {
    return {
      getuser: `${process.env.VUE_APP_MASKAWA_HOST}/me`,
      userProfile: "",
    };
  },
  methods: {
    getUserFromToken: async function () {
      let token = localStorage.getItem("token");
      console.log(token);
      const res = await fetch(this.getuser, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      if (res.ok) {
        const user = await res.json();
        this.userProfile = user;
        console.log(user);
      }
    },
  },
  async created() {
    this.getUserFromToken();
  },
};
</script>
