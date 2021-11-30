<template>
	<nav-bar head="Manage System"/>

	<!-- Manage View Zone -->
	<div class="mx-12">

		<!-- Toggle Bar -->
		<div class="flex border-b-2 border-gray-300 select-none mt-12 mb-8">
			<div class="text-xl text-gray-400 mr-6">
				<button class="" @click="toggleTabs(1)" :class="{'': openTab !== 1, 'text-sky border-sky border-b-4': openTab === 1}">User</button>
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
				<div class="col-span-4 select-none text-gray-400 mb-4">Email</div>
				<div class="col-span-2 select-none text-gray-400 mb-4">Role</div>
			</div>
			<div v-for="u in users" :key="u.userid" class="bg-white shadow-sm my-0.5 py-1 grid grid-cols-12">
				<div class="col-span-3 ml-4">{{ u.username }}</div>
				<div class="col-span-4">{{ u.email }}</div>
				<div class="col-span-2">{{ u.role.name}}</div>
				<div class="col-span-3 flex select-none justify-end mr-4">
					<button @click="switchRole(u)" class="py-0.5 my-auto text-xs bg-yellowPastel px-1 rounded-lg border-2 border-black hover:bg-yellow-200">
						Switch Role
					</button>
					<div class="ri-delete-bin-fill hover:text-red-500 ml-3" @click="deleteUser(u)" />
				</div>
			</div>
		</div>
		<!-- Manage Member -->

		<!-- Manage Brand -->
		<div :class="{'hidden': openTab !== 2, 'block': openTab === 2}"  class="text-lg">
			<button @click="this.showAddBrand = true" class="flex py-1 float-right my-auto text-xs bg-yellowPastel px-1 rounded-lg border-2 border-black hover:bg-yellow-200">
				<div class="ri-add-fill" /> ADD Brand
			</button>
			<input type="text" v-model="inputSearchBrand" placeholder="Search for brand" class="select-none p-2 placeholder-gray-300 placeholder-opacity-75 rounded-lg shadow-md mb-8"/>
			<div class="grid grid-cols-3">
				<div class="select-none text-gray-400 mb-4">Brand</div>
				<div class="select-none text-gray-400">Link</div>
			</div>
			<div v-for="b in filterByBrand(brands)" :key="b.brandid" class="bg-white shadow-sm my-0.5 py-1 px-4 grid grid-cols-3">
				<div class="">{{ b.brandname }}</div>
				<div class="">{{ b.brandlink }}</div>
				<div class="flex select-none justify-end">
					<!-- <div class="ri-pencil-fill mr-4 hover:text-green-500" /> -->
					<div class="ri-delete-bin-fill hover:text-red-500" @click="deleteBrand(b)" />
				</div>
			</div>
		</div>
		<!-- Manage Brand -->

		<!-- Modal Add Brand -->
		<div v-if="showAddBrand" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
			<div class="relative w-112 max-w-md">
				<!--content-->
				<div class="rounded-3xl h-auto bg-white outline-none focus:outline-none p-4">
					<!--header-->
					<div class="flex items-start justify-between">
						<div class="my-auto font-semibold text-2xl text-black uppercase">Add Brand</div>
						<!-- Close Icon -->
						<button class="ri-close-line p-1 ml-auto text-black float-right text-3xl font-semibold" @click="this.showAddBrand = false"/>
					</div>
					<!--header-->

					<!--body-->
					<form @submit.prevent="submitBrand">
						<div class="my-2">
							<label for="brandname" class="mr-2">Brandname: </label>
							<input id="brandname" type="text" v-model="brandname" placeholder="" class="rounded-md focus:outline-none py-1 px-2 shadow-md" />
						</div>
						<div class="my-2">
							<label for="blink" class="mr-2">Brandlink: </label>
							<input id="blink" type="text" v-model="blink" placeholder="" class="rounded-md focus:outline-none py-1 px-2 shadow-md" />
						</div>
						<button type="submit" class="text-white bg-buttonGreen w-24 py-2 rounded-md shadow-lg text-lg my-2">
							<i class="ri-save-3-line text-base align-middle"></i> SAVE
						</button>
					</form>
					<!--body-->
				</div>
				<!--content-->
			</div>
		</div>
		<div v-if="showAddBrand" class="opacity-25 fixed inset-0 z-40 bg-black" />
		<!-- Modal Add Brand -->

		<!-- Manage Color -->
		<div :class="{'hidden': openTab !== 3, 'block': openTab === 3}"  class="text-lg">
			<button @click="this.showAddColor = true" class="flex py-1 float-right my-auto text-xs bg-yellowPastel px-1 rounded-lg border-2 border-black hover:bg-yellow-200">
				<div class="ri-add-fill" /> ADD Color
			</button>
			<input type="text" v-model="inputSearchColor" placeholder="Search for color" class="select-none p-2 placeholder-gray-300 placeholder-opacity-75 rounded-lg shadow-md mb-8"/>
			<div class="grid grid-cols-7">
				<div class="select-none text-gray-400 mb-4 col-span-3">Color</div>
				<div class="select-none text-gray-400">Hexcode</div>
			</div>
			<div v-for="c in filterByColor(colors)" :key="c.colorid" class="bg-white shadow-sm my-0.5 py-1 px-4 grid grid-cols-7">
				<div class="col-span-3">{{ c.colorname }}</div>
				<div class="">{{ c.hexcode }}</div>
				<div class="flex select-none col-span-3 justify-end">
					<!-- <div class="ri-pencil-fill mr-4 hover:text-green-500" /> -->
					<div class="ri-delete-bin-fill hover:text-red-500" @click="deleteColor(c)" />
				</div>
			</div>
		</div>
		<!-- Manage Color -->

		<!-- Modal Add Color -->
		<div v-if="showAddColor" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
			<div class="relative w-112 max-w-md">
				<!--content-->
				<div class="rounded-3xl h-auto bg-white outline-none focus:outline-none p-4">
					<!--header-->
					<div class="flex flex-col items-start justify-between">
						<!-- Close Icon -->
						<button class="ri-close-line p-1 ml-auto text-black float-right text-3xl font-semibold" v-on:click="this.showAddColor = false"/>
					</div>
					<!--header-->

					<!--body-->
					<form @submit.prevent="submitColor">
						<div class="my-2">
							<label for="colorname" class="mr-2">Colorname: </label>
							<input id="colorname" type="text" v-model="colorname" placeholder="" class="rounded-md focus:outline-none py-1 px-2 shadow-md" />
						</div>
						<div class="my-2">
							<label for="hexcode" class="mr-2">Hexcode: </label>
							<input id="hexcode" type="color" v-model="hexcode" placeholder="" class="rounded-md focus:outline-none py-1 px-2 shadow-md" />
						</div>
						<button type="submit" class="text-white bg-buttonGreen w-24 py-2 rounded-md shadow-lg text-lg my-2">
							<i class="ri-save-3-line text-base align-middle"></i> SAVE
						</button>
					</form>
					<!--body-->
				</div>
				<!--content-->
			</div>
		</div>
		<div v-if="showAddColor" class="opacity-25 fixed inset-0 z-40 bg-black" />
		<!-- Modal Add Color -->

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
						<router-link to="/editproduct">
							<div class="ri-pencil-fill mr-4 hover:text-green-500" @click="editProduct(p)" />
						</router-link>
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
			<confirm-delete :datalink="datalink" :path="path" @cancel="this.showConfirm = false"/>
			<div class="opacity-25 fixed inset-0 z-40 bg-black" />
		</div>
	</div>
	<status-method v-if="this.showStatus" :status="status" />
</template>

<script>
import NavBar from '../components/NavBar.vue';
import OnlineshopModal from "../components/OnlineshopModal.vue";
import ConfirmDelete from '../components/ConfirmDelete.vue';
import StatusMethod from "../components/StatusMethod.vue"

export default {
	components: {
		NavBar,
		OnlineshopModal,
		ConfirmDelete,
		StatusMethod
	},
	props: [],
	data() {
		return {
			openTab: 1,
			showOnlineshopModal: false,
			toggleId: 0,
			toggleOnlineshop: '',
			status: 0,
			showStatus: false,

			token: localStorage.getItem('token'),
			getuser: `${process.env.VUE_APP_MASKAWA_HOST}/me`,
			me: '',

			/* User */
			userlink: `${process.env.VUE_APP_MASKAWA_HOST}/user`,
			users: [],
			updateRole: `${process.env.VUE_APP_MASKAWA_HOST}/updateRole`,
			/* User */

			/* Brand */
			brandlink: `${process.env.VUE_APP_MASKAWA_HOST}/brand`,
			brands: [],
			inputSearchBrand: '',
			addbrand: `${process.env.VUE_APP_MASKAWA_HOST}/addbrand`,
			showAddBrand: false,
			brandname: '',
			blink: '',
			invalidBrandname: false,
			invalidBlink: false,
			/* Brand */

			/* Color */
			colorlink: `${process.env.VUE_APP_MASKAWA_HOST}/color`,
			colors: [],
			inputSearchColor: '',
			addcolor: `${process.env.VUE_APP_MASKAWA_HOST}/addcolor`,
			showAddColor: false,
			colorname: '',
			hexcode: '',
			invalidColorname: false,
			invalidHexcode: false,
			/* Color */

			/* Product */
			productlink: `${process.env.VUE_APP_MASKAWA_HOST}/product`,
			products: [],
			inputSearchProduct: '',
			/* Product */

			showConfirm: false,
			datalink: "",
			path: "",

		}
	},
	methods: {
		toggleTabs(tabNumber) {
			// console.log(tabNumber)
			this.openTab = tabNumber
		},

		async switchRole(user) {
			var setRole = 0;
			if (user.role.roleid == 1) {
				setRole = 2
			} else {
				setRole = 1
			}

			let formData = new FormData()
			formData.append('userid',user.userid);
			formData.append('roleid',setRole);

			const res = await fetch(this.updateRole,{
				method: "PUT",
				body: formData,
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

		/* ==================== Add Data Zone ==================== */
		async submitBrand() {
			this.invalidBrandname = this.brandname !== '' ? true : false;
			this.invalidBlink = this.blink !== '' ? true : false;

			if(this.invalidBrandname && this.invalidBlink) {
				let brandData = {
					brandname: this.brandname,
					brandlink: this.blink
				}
				console.log(brandData)
				let brandJson = JSON.stringify(brandData)
				const res = await fetch(this.addbrand,{
					method: "POST",
					body: brandJson,
					headers: {
						"Content-type": "application/json",
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
			}
		},
		async submitColor() {
			this.invalidColorname = this.colorname !== '' ? true : false;
			this.invalidHexcode = this.hexcode !== '' ? true : false;

			console.log(this.colorname + this.hexcode.toUpperCase())

			if(this.invalidColorname && this.invalidHexcode) {
				let colorData = {
					colorname: this.colorname,
					hexcode: this.hexcode
				}
				console.log(colorData)
				let colorJson = JSON.stringify(colorData)
				const res = await fetch(this.addcolor,{
					method: "POST",
					body: colorJson,
					headers: {
						"Content-type": "application/json",
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
			}
		},
		/* ==================== Add Data Zone ==================== */

		/* ==================== Get Data Zone ==================== */
		async fetchUser() {
			const res = await fetch(this.userlink,{
				method: "GET",
				headers: {
						"Authorization": this.token,
						'Content-Type': 'application/json',
					},
			});
			const data = await res.json();
			return data;
		},
		async fetchBrand() {
			const res = await fetch(this.brandlink,{
				method: "GET",
				headers: {
						"Authorization": this.token,
						'Content-Type': 'application/json',
					},
			});
			const data = await res.json();
			return data;
		},
		async fetchColor() {
			const res = await fetch(this.colorlink,{
				method: "GET",
				headers: {
						"Authorization": this.token,
						'Content-Type': 'application/json',
					},
			});
			const data = await res.json();
			return data;
		},
		async fetchProduct() {
			const res = await fetch(this.productlink,{
				method: "GET",
				headers: {
						"Authorization": this.token,
						'Content-Type': 'application/json',
					},
			});
			const data = await res.json();
			return data;
		},
		/* ==================== Get Data Zone ==================== */

		/* ==================== Update Data Zone ==================== */
		async editProduct(p) {
			console.log(p)
			this.$emit('edit-product',p)
		},
		/* ==================== Update Data Zone ==================== */

		/* ==================== Delete Zone ==================== */
		async deleteUser(u) {
			console.log(u)
			this.datalink = this.userlink
			this.path = u.userid
			this.showConfirm = !this.showConfirm
		},
		async deleteBrand(b) {
			console.log(b)
			this.datalink = this.brandlink
			this.path = b.brandid
			this.showConfirm = !this.showConfirm
		},
		async deleteColor(c) {
			console.log(c)
			this.datalink = this.colorlink
			this.path = c.colorid
			this.showConfirm = !this.showConfirm
		},
		async deleteProduct(p) {
			console.log(p)
			this.datalink = this.productlink
			this.path = p.productid
			this.showConfirm = !this.showConfirm
		},
		/* ==================== Delete Zone ==================== */

		/* ==================== Filter Data Zone ==================== */
		filterBySearch(product) {
			return product.filter(p => p.productname.toLowerCase().includes(this.inputSearchProduct.toLowerCase()))
		},
		filterByBrand(brand) {
			return brand.filter(b => b.brandname.toLowerCase().includes(this.inputSearchBrand.toLowerCase()))
		},
		filterByColor(color) {
			return color.filter(c => c.colorname.toLowerCase().includes(this.inputSearchColor.toLowerCase()))
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
		this.users = await this.fetchUser();
		const res = await fetch(this.getuser,{
				method: "GET",
				headers: {
						"Authorization": this.token,
					},
			})
			if (res.ok) {
				const user = await res.json()
				this.me = user
			}
	}
};

</script>