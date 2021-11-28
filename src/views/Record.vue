<template>
  <nav-bar head="MASKAWA" />
  
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
