<template>
	<div class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
		<div class="relative max-w-6xl w-11/12">
			<!--content-->
			<div class="rounded-3xl h-60 bg-white outline-none focus:outline-none p-4">
				<!--header-->
				<div class="flex flex-col items-start justify-between">
					<!-- Close Icon
					<button class="ri-close-line p-1 ml-auto text-black float-right text-3xl font-semibold" v-on:click="close()" /> -->
					<form @submit.prevent="submitadd" class="flex">
						<label for="shop" class="uppercase my-auto">Shop</label>
						<select
							name="shop"
							class="rounded-md focus:outline-none py-1 px-2 shadow-md mx-4 border-2 border-black"
							v-model="shop">
							<option v-for="s in shops" :key="s.shopid" :value="s">
								{{ s.shopname }}
							</option>
						</select>
						<div id="SubmitButton" class="col-span-2 text-right">
					<button
						type="submit"
						class="
							text-white
							bg-buttonGreen
							w-16
							py-2
							rounded-md
							shadow-lg
							text-lg
						"
					>
						<i class="ri-add-line text-base align-middle"></i> ADD
					</button>
				</div>
					</form>
				</div>
				<!--header-->

				<!--body-->
				<form @submit.prevent="submitLink" class="my-4">
					<div class="grid grid-cols-3" v-for="ss in shopSelect" :key="ss.shopid">
						<div>
							{{ ss.shopname }}
						</div>
						<div>
							<label for="price" class="uppercase">Price</label>
							<input
								id="price"
								type="number"
								v-model="price"
								placeholder=""
								class="rounded-md focus:outline-none py-1 px-2 shadow-md"
							/>
						</div>
						<div>
							<label for="link" class="uppercase">Product Link</label>
							<input
								id="link"
								type="text"
								v-model="link"
								placeholder=""
								class="rounded-md focus:outline-none py-1 px-2 shadow-md"
							/>
						</div>
					</div>
						<div id="SubmitButton" class="col-span-2 text-right">
					<button
						type="submit"
						class="
							text-white
							bg-buttonGreen
							w-16
							py-2
							rounded-md
							shadow-lg
							text-lg
						"
					>
						<i class="ri-save-3-line text-base align-middle"></i> SAVE
					</button>
				</div>
				</form>
				<!--body-->
			</div>
			<!--content-->
		</div>
	</div>
</template>

<script>
// import Multiselect from '@vueform/multiselect'

export default {
	// components: { Multiselect, },
	props: {
		id: {
			type: Number,
			require: true,
		}
	},
	data() {
		return {
			shops: [],
			shop: [],
			shopSelect: [],
			shopLink:"http://localhost:3000/shop",
			price: 0,
			invalidPrice: false,
			link: "",
			invalidLink: false,
			addOnlineLink: "http://localhost:3000/addonlineshop",
		};
		
	},
	methods: {
		submitadd() {
			console.log(this.shop)
			this.shopSelect.push(this.shop)
		},
		submitLink() {
			this.invalidPrice = this.price === 0 ? true : false;
			this.invalidLink = this.link === "" ? true : false;

			let checkForm = (this.price !== 0 && this.link !== "")
			if (checkForm) {
				let onlineData = {
					productid: this.id,
					price: this.price,
					productlink: this.link,
					shopid: this.shop.shopid
				}
				console.log(onlineData)
				this.addOnline(onlineData)
			}
		},
		async addOnline(data) {
			let dataJson = JSON.stringify(data)
			fetch(`${this.addOnlineLink}`,{
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: dataJson,
			});
			location.reload();
		},
		async fetchShop() {
			const res = await fetch(this.shopLink);
			const data = await res.json();
			return data;
		},
	},
	async created() {
		this.shops = await this.fetchShop();
	}
}
</script>

<style src="@vueform/multiselect/themes/default.css"></style>