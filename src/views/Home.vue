<template>
	<nav-bar head="MASKAWA" />
	<p class="text-gray-300 md:text-xl font-light my-3 text-center select-none">Get Ready for the MASKAWA</p>

	<!-- Carousel -->
	<carousel class="story-carousel story-carousel--colors md:text-3xl mx-auto text-center md:mb-12 mb-6 md:w-10/12">
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
	<div class="mx-10 md:mx-20 lg:mx-40 border-t-3 border-b-3 border-yellowPastel py-2 flex flex-wrap ">
		<div id="brandFilter" class="md:mb-0 mb-2">
			<select name="brand" v-model="inputBrand" class="rounded-md focus:outline-none p-2 shadow-md md:w-32">
				<option value="" class="uppercase" disabled hidden selected>Brand</option>
				<option v-for="b in brands" :key="b.brandid" :value="b.brandname">
					{{ b.brandname }}
				</option>
			</select>
		</div>
		<div @click="this.inputBrand = ''" class="ri-filter-off-line text-2xl my-auto ml-2 md:mb-0 mb-2"/>

		<div id="colorFilter" class="md:ml-8 md:mb-0 mb-2">
			<select name="color" v-model="inputColor" class="rounded-md focus:outline-none p-2 shadow-md md:w-32">
				<option value="" class="uppercase" disabled hidden selected>Color</option>
				<option v-for="c in colors" :key="c.colorid" :value="c.colorname">
					{{ c.colorname }}
				</option>
			</select>
		</div>
		<div @click="this.inputColor = ''" class="ri-filter-off-line text-2xl my-auto ml-2 md:mb-0 mb-2"/>
		
		<div id="search" class="bg-gray-200 p-2 w-min md:ml-auto rounded-lg flex select-none">
			<input type="text" v-model="inputName" placeholder="Search ..." class="bg-gray-200 focus:outline-none">
			<i class="ri-search-line"/>
		</div>
	</div>
	<!-- Filter & Search -->

	<!-- Product -->
	<div class="grid xl:grid-cols-3 xl:gap-12 xl:my-12 lg:grid-cols-2 lg:gap-8 lg:mx-40 md:mx-40 mx-8 my-8 gap-8">
		<div v-for="p in filterShow()" :key="p.productid" class="bg-yellowPastel shadow-lg rounded-lg relative">
			<img :src="`${hosts}/Files/${p.image}`" v-on:click="toggleProductModal(p.productid)" class="my-auto mx-auto object-cover w-full lg:h-72 h-60" />
			<div v-if="this.userProfile.role.roleid == 1">
				<button v-if="p.bookmark" class="ri-bookmark-fill absolute top-2 right-2 text-3xl z-40 text-yellow-400" @click="delRecord(this.userProfile,p.productid)" />
				<button v-else class="ri-bookmark-line absolute top-2 right-2 text-3xl z-40" @click="addRecord(this.userProfile.userid,p.productid)" />
			</div>
			<div class="flex justify-between" v-on:click="toggleProductModal(p.productid)">
				<span class="lg:text-xl text-base mx-1">{{ p.productname }}</span>
			</div>
		</div>
	</div>
	<!-- Product -->

	<div v-if="showProductModal">
		<product-modal @close-product-modal="closeProductModal" :e="this.eachProduct" />
		<div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
	</div>

	<status-method v-if="this.showStatus" :status="status" />
</template>

<script>
import { Carousel, Slide } from 'vue-snap'
import 'vue-snap/dist/vue-snap.css'

import NavBar from "../components/NavBar.vue";
import ProductModal from "../components/ProductModal.vue";
import StatusMethod from "../components/StatusMethod.vue";

export default {
	components: {
		Carousel,
		Slide,
		
		NavBar,
		ProductModal,
		StatusMethod,
	},
	props: [],
	data() {
		return {
			hosts: process.env.VUE_APP_MASKAWA_HOST,
			token: localStorage.getItem("token"),
			userProfile: {role:{}},
			getuser: `${process.env.VUE_APP_MASKAWA_HOST}/me`,
			status: 0,
      showStatus: false,

			bookmark: false,

			/* Brand */
			brandlink: `${process.env.VUE_APP_MASKAWA_HOST}/brand`,
			brands: [],
			/* Brand */

			/* Color */
			colorlink: `${process.env.VUE_APP_MASKAWA_HOST}/color`,
			colors: [],
			/* Color */

			/* Product */
			productlink: `${process.env.VUE_APP_MASKAWA_HOST}/product`,
			products: [],
			record: false,
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
			let token = localStorage.getItem('token')
			const res = await fetch(this.brandlink,{
				method: "GET",
				headers: {
						"Authorization": token,
					},
			});
			const data = await res.json();
			return data;
		},
		async fetchColor() {
			let token = localStorage.getItem('token')
			const res = await fetch(this.colorlink,{
				method: "GET",
				headers: {
						"Authorization": token,
					},
			});
			const data = await res.json();
			return data;
		},
		async fetchProduct() {
			let token = localStorage.getItem('token')
			const res = await fetch(this.productlink,{
				method: "GET",
				headers: {
						"Authorization": token,
					},
			});
			const data = await res.json();
			return data;
		},
		/* ==================== Get All Data Zone ==================== */

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

		/* ==================== Filter Data Zone ==================== */
		filterBySearch(product) {
			return product.filter(p => p.productname.toLowerCase().includes(this.inputName.toLowerCase()))
		},
		filterByBrand(product) {
			return product.filter(p => p.brandname.toLowerCase().includes(this.inputBrand.toLowerCase()))
		},
		filterByColor(product) {
			return product.filter(p => p.colorname.toLowerCase().includes(this.inputColor.toLowerCase()))
		},
		filterShow() {
			return this.filterBySearch(this.filterByBrand(this.filterByColor(this.products)))
		},

		/* ==================== Filter Data Zone ==================== */

		getUserFromToken: async function () {
      const res = await fetch(this.getuser, {
        method: "GET",
        headers: {
          "Authorization": this.token,
        },
      });
      if (res.ok) {
        const user = await res.json();
        this.userProfile = user;
      }
    },

		async addRecord(uid,pid) {
			// console.log(uid+""+pid)

			let record = {
				userid: uid,
				productid: pid
			}
			let jsonRecord = JSON.stringify(record)
			const res = await fetch(`${process.env.VUE_APP_MASKAWA_HOST}/addRecord`,{
        method: "POST",
        body: jsonRecord,
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
				setTimeout( () => location.reload(), 500);
		},

		async delRecord(user,pid) {

			let record = user.record
			let rid = 0

			for (let i = 0; i < record.length; i++) {
				// console.log(record[i].productid)
				if(record[i].productid == pid) {
					rid = record[i].recordid
				}
			}
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
		
		async checkBookmark() {
			// console.log(this.userProfile)
			// let array = []
			for (let i = 0; i < this.userProfile.record.length; i++) {
				const element = this.userProfile.record[i].productid;
				// array.push(element)
				for (let j = 0; j < this.products.length; j++) {
					const element2 = this.products[j].productid;
					if (element == element2) {
						this.products[j].bookmark = true
					}
				}
			}
			// console.log(array)

		},

	},
	async created() {
		if(localStorage.getItem("token") != null) {
			this.getUserFromToken();
			setTimeout(() => this.checkBookmark(),500)
		}
		
		this.brands = await this.fetchBrand();
		this.colors = await this.fetchColor();
		this.products = await this.fetchProduct();
	},
};
</script>
