<template>
	<nav-bar head="MASKAWA" />
	<p class="text-gray-300 text-xl font-light my-3 text-center select-none">Get Ready for the MASKAWA</p>

	<!-- Carousel -->
	<carousel class="story-carousel story-carousel--colors text-3xl mx-auto text-center mb-12 w-10/12">
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

	<!-- Filter & Search -->
	<div class="mx-40 border-t-3 border-b-3 border-yellowPastel py-2 flex">
		<div id="brandFilter" class="">
			<select name="brand" v-model="inputBrand" class="rounded-md focus:outline-none p-2 shadow-md w-32">
				<option value="" class="uppercase" disabled hidden selected>Brand</option>
				<option v-for="b in brands" :key="b.brandid" :value="b.brandname">
					{{ b.brandname }}
				</option>
			</select>
		</div>
		<div @click="clearFilterBrand()" class="ri-filter-off-line text-2xl my-auto ml-2"/>
		<div id="colorFilter" class="ml-8">
			<select name="color" v-model="inputColor" class="rounded-md focus:outline-none p-2 shadow-md w-32">
				<option value="" class="uppercase" disabled hidden selected>Color</option>
				<option v-for="c in colors" :key="c.colorid" :value="c.colorname">
					{{ c.colorname }}
				</option>
			</select>
		</div>
		<div @click="clearFilterColor()" class="ri-filter-off-line text-2xl my-auto ml-2"/>
		<div id="search" class="bg-gray-200 p-2 w-min ml-auto rounded-lg flex select-none">
			<input type="text" v-model="inputName" placeholder="Search ..." class="bg-gray-200 focus:outline-none">
			<i class="ri-search-line"/>
		</div>
	</div>
	<!-- Search -->

	<!-- Product -->
	<div class="grid grid-cols-3 gap-12 my-12 mx-40">
		<div v-for="p in filterShow()" :key="p.productid" v-on:click="toggleProductModal(p.productid)" class="bg-yellowPastel shadow-lg rounded-lg relative">
		<img :src="`http://localhost:3000/Files/${p.image}`" class="my-auto mx-auto object-cover w-full h-72" />
		<i class="ri-bookmark-line absolute top-2 right-2 text-3xl z-50" />
		<div class="flex justify-between">
			<span class="text-xl mx-1">{{ p.productname }}</span>
		</div>
	</div>
	</div>
	<!-- Product -->

	<div v-if="showProductModal">
		<product-modal @close-product-modal="closeProductModal" :e="this.eachProduct" />
		<div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
	</div>
</template>

<script>
import { Carousel, Slide } from 'vue-snap'
import 'vue-snap/dist/vue-snap.css'

import NavBar from "../components/NavBar.vue";
import ProductModal from "../components/ProductModal.vue";

export default {
	components: {
		Carousel,
		Slide,
		
		NavBar,
		ProductModal,
	},
	props: {},
	data() {
		return {
			/* Brand */
			brandlink: "http://localhost:3000/brand",
			brands: [],
			/* Brand */

			/* Color */
			colorlink: "http://localhost:3000/color",
			colors: [],
			/* Color */

			/* Product */
			productlink: "http://localhost:3000/product",
			products: [],
			/* Product */
			eachProduct: [],
			toggleId: 0,
			showProductModal: false,

			/* Filter & Search */
			inputName: '',
			inputBrand: '',
			inputColor: ''
		};
	},
	methods: {

		/* ==================== Get All Data Zone ==================== */
		async fetchBrand() {
			const res = await fetch(this.brandlink);
			const data = await res.json();
			return data;
		},
		async fetchColor() {
			const res = await fetch(this.colorlink);
			const data = await res.json();
			return data;
		},
		async fetchProduct() {
			const res = await fetch(this.productlink);
			const data = await res.json();
			return data;
		},
		/* ==================== Get All Data Zone ==================== */

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
		},

		/* ==================== Filter Data Zone ==================== */
		filterBySearch(product) {
			return product.filter(p => p.productname.includes(this.inputName))
		},
		filterByBrand(product) {
			return product.filter(p => p.brandname.includes(this.inputBrand))
		},
		filterByColor(product) {
			return product.filter(p => p.colorname.includes(this.inputColor))
		},
		filterShow() {
			return this.filterBySearch(this.filterByBrand(this.filterByColor(this.products)))
		},
		clearFilterBrand() {
			this.inputBrand = ''
		},
		clearFilterColor() {
			this.inputColor = ''
		}
		/* ==================== Filter Data Zone ==================== */

	},
	async created() {
		this.brands = await this.fetchBrand();
		this.colors = await this.fetchColor();
		this.products = await this.fetchProduct();
	},
};
</script>
