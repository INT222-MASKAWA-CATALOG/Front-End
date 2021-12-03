<template>
  <nav-bar head="MASKAWA" />
  <div class="grid grid-cols-3 gap-12 my-12 mx-40">
    <div v-for="r in this.userProfile.record" :key="r.product.productid" class="bg-yellowPastel shadow-lg rounded-lg relative">
      <img :src="`${hosts}/Files/${r.product.image}`" v-on:click="toggleProductModal(r.product.productid)" class="my-auto mx-auto object-cover w-full h-72" />
      <button class="ri-delete-bin-fill hover:text-red-500 absolute top-2 right-2 text-3xl z-40" @click="delRecord(r.recordid)"/>
      <div class="flex justify-between" v-on:click="toggleProductModal(r.product.productid)">
        <span class="text-xl mx-1">{{ r.product.productname }}</span>
      </div>
    </div>
  </div>
  <div v-if="showProductModal">
		<product-modal @close-product-modal="closeProductModal" :e="this.eachProduct" />
		<div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
	</div>
  <status-method v-if="this.showStatus" :status="status" />
</template>

<script>
import NavBar from "../components/NavBar.vue";
import ProductModal from "../components/ProductModal.vue";
import StatusMethod from "../components/StatusMethod.vue";

export default {
  components: {
    NavBar,
    ProductModal,
    StatusMethod,
  },
  props: {},
  data() {
    return {
      hosts: process.env.VUE_APP_MASKAWA_HOST,
      token: localStorage.getItem("token"),
      getuser: `${process.env.VUE_APP_MASKAWA_HOST}/me`,
      userProfile: "",

      productlink: `${process.env.VUE_APP_MASKAWA_HOST}/product`,

      eachProduct: [],
			toggleId: 0,
			showProductModal: false,

      status: 0,
      showStatus: false,
    };
  },
  methods: {
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

    async fetchEachProduct() {
			const res = await fetch(`${this.productlink}/${this.toggleId}`,{
				method: "GET",
				headers: {
						"Authorization": this.token,
					},
			});
			const data = await res.json();
			return data;
		},

		async toggleProductModal (id) {
			this.showProductModal = !this.showProductModal;
			this.toggleId = id;
			this.eachProduct = await this.fetchEachProduct();
			// console.log(this.eachProduct)
		},

		async closeProductModal () {
			// console.log("close")
			this.showProductModal = !this.showProductModal;
		},

    async delRecord(rid) {
			const res = await fetch(`${process.env.VUE_APP_MASKAWA_HOST}/deleteRecord/${rid}`,{
        method: "DELETE",
        headers: {
          "Authorization": this.token,
          },
        })

        if (res.ok) {
          this.status = 1
          this.showStatus = true
        } else {
          this.status = 0
          this.showStatus = true
        }
				setTimeout( () => location.reload(), 500);
		},
    checkRoleAuthen: async function () {
			if (localStorage.getItem("token") == null || this.me.role.roleid != 1) {
				alert("หยุดเดี๋ยวนี้เลยนะ เจ้าจอมจุ้นจ้าน")
				this.$router.push("/home")
			}
		}
  },
  async created() {
    this.checkRoleAuthen();
    this.getUserFromToken();
  },
};
</script>
