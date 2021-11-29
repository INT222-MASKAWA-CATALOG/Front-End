<template>
	<div class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
		<div class="relative w-112 max-w-md">
			<!--content-->
			<div class="rounded-3xl h-auto bg-white outline-none focus:outline-none p-4">
				<!--header-->
				<div class="flex flex-col items-start justify-between">
					<!-- Close Icon -->
					<button class="ri-close-line p-1 ml-auto text-black float-right text-3xl font-semibold" v-on:click="close()"/>
					<!-- <form @submit.prevent="submitadd" class="flex">
						<label for="shop" class="uppercase my-auto">Shop</label>
						<select name="shop" v-model="shop" class="rounded-md focus:outline-none py-1 px-2 shadow-md mx-4 border-2 border-black">
							<option v-for="s in shops" :key="s.shopid" :value="s">
								{{ s.shopname }}
							</option>
						</select>
						<div id="SubmitButton" class="col-span-2 text-right">
							<button type="submit" class="text-white bg-buttonGreen w-16 py-2 rounded-md shadow-lg text-lg">
								<i class="ri-add-line text-base align-middle"></i> ADD
							</button>
						</div>
					</form> -->
				</div>
				<!--header-->

				<!--body-->
				<!-- <form @submit.prevent="submitLink" class="my-4">
					<div v-for="ss in shopSelect" :key="ss.shopid" class="grid grid-cols-3">
						<div>{{ ss.shopname }}</div>
						<div>
							<label for="price" class="uppercase">Price</label>
							<input id="price" type="number" v-model="price" placeholder="" class="rounded-md focus:outline-none py-1 px-2 shadow-md" />
						</div>
						<div>
							<label for="link" class="uppercase">Product Link</label>
							<input id="link" type="text" v-model="link" placeholder="" class="rounded-md focus:outline-none py-1 px-2 shadow-md" />
						</div>
					</div>
					<div id="SubmitButton" class="col-span-2 text-right">
						<button type="submit" class="text-white bg-buttonGreen w-16 py-2 rounded-md shadow-lg text-lg">
							<i class="ri-save-3-line text-base align-middle"></i> SAVE
						</button>
					</div>
				</form> -->
				<div v-for="o in onlineshop" :key="o.onlineid" class="items-center grid grid-cols-12 gap-4">
					<div class="col-span-5">{{ o.shop.shopname }}</div>
					<div class="col-span-2">{{ o.price }}</div>
					<div class="flex ml-auto select-none col-span-5">
						<div class="ri-pencil-fill mr-4 hover:text-green-500" @click="editOnline(o)"/>
						<div class="ri-delete-bin-fill hover:text-red-500" @click="deleteOnline(o)" />
					</div>
				</div>
				<div class="mt-4 pt-2 border-t-2">
					<!-- <label for="onlineshopSelect" class="uppercase">Color</label> -->
					<select
						name="onlineshopSelect"
						class="rounded-md focus:outline-none py-1 px-2 shadow-md"
						v-model="onlineshopSelect"
					>
						<option value="" class="" disabled hidden selected>Select Shop ...</option>
						<option v-for="r in this.remainShop(this.shops)" :key="r.shopid" :value="r">
							{{ r.shopname }}
						</option>
					</select>
					<form @submit.prevent="submitOnline" v-show="this.onlineshopSelect != ``" class="">
						<div class="my-2">{{ this.onlineshopSelect.shopname }}</div>
						<div class="my-2">
							<label for="price" class="">Price: </label>
							<input id="price" type="number" v-model="price" placeholder="" class="rounded-md focus:outline-none py-1 px-2 shadow-md" />
						</div>
						<div class="my-2">
							<label for="link" class="">Link: </label>
							<input id="link" type="text" v-model="link" placeholder="" class="rounded-md focus:outline-none py-1 px-2 shadow-md" />
						</div>
						<button type="submit" class="text-white bg-buttonGreen w-24 py-2 rounded-md shadow-lg text-lg my-2">
							<i class="ri-save-3-line text-base align-middle"></i> SAVE
						</button>
					</form>
				</div>
				<!--body-->
			</div>
			<!--content-->
		</div>
	</div>
	<status-method v-if="this.showStatus" :status="status" />
	<div v-if="showConfirm">
			<confirm-delete :datalink="datalink" :path="path" @cancel="this.showConfirm = false"/>
			<div class="opacity-25 fixed inset-0 z-40 bg-black" />
		</div>
</template>

<script>

import StatusMethod from "./StatusMethod.vue"
import ConfirmDelete from '../components/ConfirmDelete.vue';

export default {
	components: { StatusMethod,ConfirmDelete, },
	props: {
		id: {
			type: Number,
			require: true,
		},
		onlineshop: {
			type: Array,
			require: true,
		},
	},
	emits: [
		"close-add-online"
	],
	data() {
		return {
			onlineshopSelect: "",
			shops: [],
			shopLink: `${process.env.VUE_APP_MASKAWA_HOST}/shop`,
			onlinelink: `${process.env.VUE_APP_MASKAWA_HOST}/onlineshop`,
			price: 0,
			link: "",
			invalidPrice: false,
			invalidLink: false,
			addOnlineLink: `${process.env.VUE_APP_MASKAWA_HOST}/addonlineshop`,
			status: 0,
			showStatus: false,
			showConfirm: false,
			datalink: "",
			path: "",
		};
	},
	methods: {

		submitOnline() {
			this.invalidPrice = this.price !== 0 ? true : false;
			this.invalidLink = this.link !== "" ? true : false;
			if(this.invalidPrice && this.invalidLink){
				let data = {
					productid: this.id,
					price: this.price,
					productlink: this.link,
					shopid: this.onlineshopSelect.shopid,
				}
				console.log(data)
				this.addOnlineShop(data)
			}
		},
		async addOnlineShop(data) {
			let token = localStorage.getItem('token')
				let dataJson = JSON.stringify(data)
				console.log(dataJson)
				const res = await fetch(this.addOnlineLink,{
					method: "POST",
					body: dataJson,
					headers: {
						"Content-type": "application/json",
						"Authorization": token,
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

		async deleteOnline(o) {
			console.log(o)
			this.datalink = this.onlinelink
			this.path = o.onlineid
			this.showConfirm = true
		},

		async close () {
			this.$emit("close-add-online");
			this.onlineshopSelect = ""
			location.reload();
		},

		async fetchShop() {
			const res = await fetch(this.shopLink);
			const data = await res.json();
			return data;
		},

		remainShop(shop) {
			let x = {};
			for (let i = 0; i < this.onlineshop.length; i++) {
				x = shop.find(s => s.shopname.includes(this.onlineshop[i].shopname))
				// console.log(x)
				const index = shop.indexOf(x)
				// console.log(index)
				if (index > -1) {
					shop.splice(index,1)
				}
			}
			// console.log(shop)
			return shop;
		},
		
	},
	async created() {
		this.shops = await this.fetchShop();
	},
};
</script>