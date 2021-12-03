<template>
  <nav-bar head="MASKAWA" />
  <div class="text-black bg-yellowYoung w-5/12 mx-auto text-center mt-20 rounded-xl pt-8 shadow-md">
    <img src="../assets/face.png" class="mx-auto" />
    <div class="">Welcome, <span class="uppercase font-bold">{{ this.userProfile.username }}</span></div>
    <div>Manage your info, privacy and security to make work better for you.</div>
    <form @submit.prevent="submitEdit">
      <div class="flex justify-center my-2">
        <span class="bg-tp w-20 rounded-tl-full rounded-bl-full">Email</span>
        <span class="bg-white w-60 rounded-tr-full rounded-br-full">
          <span v-if="isEditNow" class=""><input v-model="email" class="text-center"/></span>
          <span v-else class="">{{ this.userProfile.email }}</span>
        </span>
      </div>
      <div class="flex justify-center my-2">
        <span class="bg-tp w-20 rounded-tl-full rounded-bl-full">Phone</span>
        <span class="bg-white w-60 rounded-tr-full rounded-br-full">
          <span v-if="isEditNow" class=""><input v-model="phone"  class="text-center"/></span>
          <span v-else class="">{{ this.userProfile.phone }}</span>
        </span>
      </div>
      <div class="flex justify-center my-2">
        <span class="bg-tp w-20 rounded-tl-full rounded-bl-full">Gender</span>
        <span class="bg-white w-60 rounded-tr-full rounded-br-full">
          <span v-if="isEditNow" class="">
            <select name="gender" class="rounded-md focus:outline-none px-2 text-center w-60" v-model="gender">
              <option class="" value="MALE">MALE</option>
              <option class="" value="FEMALE">FEMALE</option>
            </select>
          </span>
          <span v-else class="">{{ this.userProfile.gender }}</span>
        </span>
      </div>
      <div class="flex justify-center my-2">
        <span class="bg-tp w-20 rounded-tl-full rounded-bl-full">Role</span>
        <span class="bg-white w-60 rounded-tr-full rounded-br-full">{{ this.userProfile.role.name }}</span>
      </div>
      <div class="">
        <button v-if="isEditNow" type="submit" class="text-white bg-buttonGreen w-24 py-2 rounded-md shadow-lg text-lg my-2">
          <i class="ri-save-3-line text-base align-middle"></i> SAVE
        </button>
        <button v-else class="bg-yellow-300 shadow-md mt-4 mb-8 px-4 py-1 rounded-xl" @click="editProfile(this.userProfile)">Edit Profile</button>
      </div>
    </form>
  </div>
  <status-method v-if="this.showStatus" :status="status" />
</template>

<script>
import NavBar from "../components/NavBar.vue";
import StatusMethod from "../components/StatusMethod.vue"

export default {
  components: {
    NavBar,
    StatusMethod,
  },
  props: {},
  data() {
    return {
      token: localStorage.getItem("token"),
      status: 0,
      showStatus: false,

      getuser: `${process.env.VUE_APP_MASKAWA_HOST}/me`,
      userProfile: "",
      isEditNow: false, // false is stable , true is edit now

      email: "",
      invalidEmail: false,
      phone: "",
      invalidPhone: false,
      gender: "",
      invalidGender: false,
    };
  },
  methods: {
    async submitEdit() {
      this.invalidEmail = this.email !== "" ? true : false;
      this.invalidPhone = this.phone !== "" ? true : false;
      this.invalidGender = this.gender !== "" ? true : false;

      if(this.invalidEmail && this.invalidPhone && this.invalidGender) {
        console.log(this.email + this.phone + this.gender)
        let update = {
          userid: this.userProfile.userid,
          email: this.email,
          phone: this.phone,
          gender: this.gender,
        }
        let jsonupdate = JSON.stringify(update);
        const res = await fetch(`${process.env.VUE_APP_MASKAWA_HOST}/editProfile`,{
        method: "PUT",
        body: jsonupdate,
        headers: {
          "Authorization": this.token,
          "Content-type": "application/json",
          },
        })
        if (res.ok) {
					this.status = 1
					this.showStatus = true
				} else {
					this.status = 0
					this.showStatus = true
				}
				setTimeout( () => location.reload(), 1000);
      }
    },
    getUserFromToken: async function () {
      const res = await fetch(this.getuser, {
        method: "GET",
        headers: {
          Authorization: this.token,
        },
      });
      if (res.ok) {
        const user = await res.json();
        this.userProfile = user;
      }
    },
    async editProfile(oldProfile) {
      console.log(oldProfile)
      this.isEditNow = true
      this.email = oldProfile.email
      this.phone = oldProfile.phone
      this.gender = oldProfile.gender
    },
  },
  async created() {
    this.getUserFromToken();
  },
};
</script>
