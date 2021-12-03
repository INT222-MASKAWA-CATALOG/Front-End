<template>
  <nav-bar head="MASKAWA" />
  <div class="grid grid-cols-3 gap-12 my-12 mx-40">
    <div v-for="r in this.userProfile.record" :key="r.product.productid" class="bg-yellowPastel shadow-lg rounded-lg relative">
      <img :src="`${hosts}/Files/${r.product.image}`" v-on:click="toggleProductModal(r.product.productid)" class="my-auto mx-auto object-cover w-full h-72" />
      <!-- <button v-if="this.userProfile" class="ri-bookmark-line absolute top-2 right-2 text-3xl z-40" @click="addRecord(this.userProfile.userid,r.product.productid)"/> -->
      <div class="flex justify-between" v-on:click="toggleProductModal(r.product.productid)">
        <span class="text-xl mx-1">{{ r.product.productname }}</span>
      </div>
    </div>
  </div>
  <div v-if="showProductModal">
		<product-modal @close-product-modal="closeProductModal" :e="this.eachProduct" />
		<div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
	</div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import ProductModal from "../components/ProductModal.vue";

export default {
  components: {
    NavBar,
    ProductModal,
  },
  props: {},
  data() {
    return {
      hosts: process.env.VUE_APP_MASKAWA_HOST,
      getuser: `${process.env.VUE_APP_MASKAWA_HOST}/me`,
      userProfile: "",

      productlink: `${process.env.VUE_APP_MASKAWA_HOST}/product`,

      eachProduct: [],
			toggleId: 0,
			showProductModal: false,
    };
  },
  methods: {
    getUserFromToken: async function () {
      let token = localStorage.getItem("token");
      const res = await fetch(this.getuser, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      if (res.ok) {
        const user = await res.json();
        this.userProfile = user;
      }
    },
    async fetchEachProduct() {
			let token = localStorage.getItem('token')
			const res = await fetch(`${this.productlink}/${this.toggleId}`,{
				method: "GET",
				headers: {
						"Authorization": token,
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
  },
  async created() {
    this.getUserFromToken();
  },
};
</script>
