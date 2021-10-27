<template>
	<nav-bar head="Manage System"/>

	<!-- Manage View Zone -->
	<div class="mx-12">

		<!-- Toggle Bar -->
		<div class="flex border-b-2 border-gray-300 select-none mt-12 mb-8">
			<div class="text-xl text-gray-400 mr-6">
				<button class="" @click="toggleTabs(1)" :class="{'': openTab !== 1, 'text-sky border-sky border-b-4': openTab === 1}">Member</button>
			</div>
			<div class="text-lg text-gray-400 mx-6">
				<button class="" @click="toggleTabs(2)" :class="{'': openTab !== 2, 'text-sky border-sky border-b-4': openTab === 2}">Brand</button>
			</div>
			<div class="text-lg text-gray-400 mx-6">
				<button class="" @click="toggleTabs(3)" :class="{'': openTab !== 3, 'text-sky border-sky border-b-4': openTab === 3}">Color</button>
			</div>
			<div class="text-lg text-gray-400 ml-6">
				<button class="" @click="toggleTabs(4)" :class="{'': openTab !== 4, 'text-sky border-sky border-b-4': openTab === 4}">Product</button>
			</div>
		</div>
		<!-- Toggle Bar -->

		<!-- Manage Member -->
		<div :class="{'hidden': openTab !== 1, 'block': openTab === 1}"  class="text-lg">
			<div class="grid grid-cols-12">
				<div class="col-span-3 select-none text-gray-400 mb-4">User Name</div>
				<div class="col-span-6 select-none text-gray-400 mb-4">Email</div>
				<div class="col-span-2 select-none text-gray-400 mb-4">Role</div>
			</div>
			<div v-for="m in members" :key="m.userid" class="bg-white shadow-sm my-0.5 py-1 grid grid-cols-12">
				<div class="col-span-3 ml-4">{{ m.username }}</div>
				<div class="col-span-6">{{ m.email }}</div>
				<div class="col-span-2">{{ m.status}}</div>
				<div class="flex select-none justify-end mr-4">
					<div class="ri-pencil-fill mr-4 hover:text-green-500" />
					<div class="ri-delete-bin-fill hover:text-red-500" @click="deleteMember(m)" />
				</div>
			</div>
		</div>
		<!-- Manage Member -->

		<!-- Manage Brand -->
		<div :class="{'hidden': openTab !== 2, 'block': openTab === 2}"  class="text-lg">
			<input type="text" v-model="inputSearchBrand" placeholder="Search for brand" class="select-none p-2 placeholder-gray-300 placeholder-opacity-75 rounded-lg shadow-md mb-8"/>
			<div class="grid grid-cols-3">
				<div class="select-none text-gray-400 mb-4">Brand</div>
				<div class="select-none text-gray-400">Link</div>
			</div>
			<div v-for="b in filterByBrand(brands)" :key="b.brandid" class="bg-white shadow-sm my-0.5 py-1 px-4 grid grid-cols-3">
				<div class="">{{ b.brandname }}</div>
				<div class="">{{ b.brandlink }}</div>
				<div class="flex select-none justify-end">
					<div class="ri-pencil-fill mr-4 hover:text-green-500" />
					<div class="ri-delete-bin-fill hover:text-red-500" @click="deleteBrand(b)" />
				</div>
			</div>
		</div>
		<!-- Manage Brand -->

		<!-- Manage Color -->
		<div :class="{'hidden': openTab !== 3, 'block': openTab === 3}"  class="text-lg">
			<input type="text" v-model="inputSearchColor" placeholder="Search for color" class="select-none p-2 placeholder-gray-300 placeholder-opacity-75 rounded-lg shadow-md mb-8"/>
			<div class="grid grid-cols-7">
				<div class="select-none text-gray-400 mb-4 col-span-3">Color</div>
				<div class="select-none text-gray-400">Hexcode</div>
			</div>
			<div v-for="c in filterByColor(colors)" :key="c.colorid" class="bg-white shadow-sm my-0.5 py-1 px-4 grid grid-cols-7">
				<div class="col-span-3">{{ c.colorname }}</div>
				<div class="">{{ c.hexcode }}</div>
				<div class="flex select-none col-span-3 justify-end">
					<div class="ri-pencil-fill mr-4 hover:text-green-500" />
					<div class="ri-delete-bin-fill hover:text-red-500" @click="deleteColor(c)" />
				</div>
			</div>
		</div>
		<!-- Manage Color -->

		<!-- Manage Product -->
		<div :class="{'hidden': openTab !== 4, 'block': openTab === 4}" class="text-lg">
			<router-link to="/addproduct" class="flex py-1 float-right my-auto text-xs bg-yellowPastel px-1 rounded-lg border-2 border-black hover:bg-yellow-200">
				<div class="ri-add-fill" /> ADD Product
			</router-link>
			<input type="text" v-model="inputSearchProduct" placeholder="Search for product" class="select-none p-2 placeholder-gray-300 placeholder-opacity-75 rounded-lg shadow-md mb-8"/>
			<p class="select-none text-gray-400 mb-4">Product</p>
			<div v-for="p in filterBySearch(products)" :key="p.productid" class="">
				<div class="flex bg-white shadow-sm my-0.5 py-1 px-4">
					<div class="mr-auto">{{ p.productname }}</div>
					<div class="flex ml-auto select-none">
						<button class="flex mr-4 text-xs bg-yellowPastel py-1 px-1 rounded-lg border-2 border-black hover:bg-yellow-200" @click="toggleAddLink(p.productid , p.onlineshop)">
							<div class="ri-eye-fill mr-0.5" />
							View Shop
						</button>
						<div class="ri-pencil-fill mr-4 hover:text-green-500" />
						<div class="ri-delete-bin-fill hover:text-red-500" @click="deleteProduct(p)" />
					</div>
				</div>
			</div>
			<div v-show="showOnlineshopModal">
				<onlineshop-modal :id="toggleId" :onlineshop="toggleOnlineshop" @close-add-online="closeAddOnline"/>
				<div class="opacity-25 fixed inset-0 z-40 bg-black"></div>
			</div>
		</div>
		<!-- Manage Product -->
		
		<div v-if="showConfirm">
			<confirm-delete :p="deleteConfirmProduct" :productlink="productlink" :delfile="delfile" @cancel="this.showConfirm = false"/>
			<div class="opacity-25 fixed inset-0 z-40 bg-black" />
		</div>
	</div>
</template>

<script>
import NavBar from '../components/NavBar.vue';
import OnlineshopModal from "../components/OnlineshopModal.vue";
import ConfirmDelete from '../components/ConfirmDelete.vue';

export default {
	components: {
		NavBar,
		OnlineshopModal,
		ConfirmDelete,
	},
	props: [],
	data() {
	return {
		openTab: 4,
		showOnlineshopModal: false,
		toggleId: 0,
		toggleOnlineshop: '',

		/* Member */
		memberlink: "http://13.67.90.93:3000/member",
		members: [],
		/* Member */

		/* Brand */
		brandlink: "http://13.67.90.93:3000/brand",
		brands: [],
		inputSearchBrand: '',
		/* Brand */

		/* Color */
		colorlink: "http://13.67.90.93:3000/color",
		colors: [],
		inputSearchColor: '',
		/* Color */

		/* Product */
		productlink: "http://13.67.90.93:3000/product",
		products: [],
		inputSearchProduct: '',
		/* Product */

		delfile: "http://13.67.90.93:3000/deleteFile",
		showConfirm: false,
		deleteConfirmProduct: [],

	}
	},
	methods: {
		toggleTabs(tabNumber) {
			// console.log(tabNumber)
			this.openTab = tabNumber
		},

		/* ==================== Get Data Zone ==================== */
		async fetchMember() {
			const res = await fetch(this.memberlink);
			const data = await res.json();
			return data;
		},
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
		/* ==================== Get Data Zone ==================== */

		/* ==================== Update Data Zone ==================== */

		/* ==================== Update Data Zone ==================== */

		/* ==================== Delete Zone ==================== */
		async deleteMember(m) {
			console.log(m)
		},
		async deleteBrand(b) {
			console.log(b)
		},
		async deleteColor(c) {
			console.log(c)
		},
		async deleteProduct(p) {
			console.log(p)
			this.deleteConfirmProduct = p;
			this.showConfirm = !this.showConfirm
		},
		/* ==================== Delete Zone ==================== */

		/* ==================== Filter Data Zone ==================== */
		filterBySearch(product) {
			return product.filter(p => p.productname.includes(this.inputSearchProduct))
		},
		filterByBrand(brand) {
			return brand.filter(b => b.brandname.includes(this.inputSearchBrand))
		},
		filterByColor(color) {
			return color.filter(c => c.colorname.includes(this.inputSearchColor))
		},
		/* ==================== Filter Data Zone ==================== */

		async closeAddOnline () {
			this.showOnlineshopModal = !this.showOnlineshopModal;
		},
		async toggleAddLink (id ,onlineshop) {
			this.showOnlineshopModal = !this.showOnlineshopModal;
			this.toggleId = id;
			this.toggleOnlineshop = onlineshop;
		},
	},
	async created() {
		this.brands = await this.fetchBrand();
		this.colors = await this.fetchColor();
		this.products = await this.fetchProduct();
		this.members = await this.fetchMember();
	}
};

</script>