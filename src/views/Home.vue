<template>
	<nav-bar head="MASKAWA" />
	<p class="text-gray-300 text-xl font-light my-3 text-center select-none">Get Ready for the MASKAWA</p>

	<!-- Carousel -->
	<carousel class="story-carousel story-carousel--colors text-3xl mx-8 text-center">
    <slide class="story-carousel__slide">
      <img src="../assets/slide1.png" />
    </slide>
    <slide class="story-carousel__slide">
      <img src="../assets/slide2.png" />
    </slide>
    <slide class="story-carousel__slide">
      <img src="../assets/slide3.png" />
    </slide>
  </carousel>
	<!-- Carousel -->
	<div class="grid grid-cols-3 gap-12 my-12 mx-40">
		<card-product v-for="product in products" :key="product.productid" :p="product" v-on:click="toggleProductModal(product.productid)"/>
	</div>

	<div v-if="showProductModal">
		<product-modal @close-product-modal="closeProductModal" :e="this.eachProduct" />
		<div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
	</div>
</template>

<script>
import { Carousel, Slide } from 'vue-snap'
import 'vue-snap/dist/vue-snap.css'

import NavBar from "../components/NavBar.vue";
import CardProduct from "../components/CardProduct.vue";
import ProductModal from "../components/ProductModal.vue";
export default {
	components: {
		Carousel,
		Slide,
		
		NavBar,
		CardProduct,
		ProductModal,
	},
	props: {},
	data() {
		return {
			productlink: "http://localhost:3000/product",
			products: [],
			eachProduct: [],
			toggleId: 0,
			showProductModal: false,
		};
	},
	methods: {
		async fetchProduct() {
			const res = await fetch(this.productlink);
			const data = await res.json();
			return data;
		},
		async fetchEachProduct() {
			const res = await fetch(`${this.productlink}/${this.toggleId}`);
			const data = await res.json();
			return data;
		},
		async toggleProductModal (id) {
			this.showProductModal = !this.showProductModal;
			this.toggleId = id;
			this.eachProduct = await this.fetchEachProduct();
			console.log(this.eachProduct)
		},
		async closeProductModal () {
			// console.log("close")
			this.showProductModal = !this.showProductModal;
		}
	},
	async created() {
		this.products = await this.fetchProduct();
	},
};
</script>
