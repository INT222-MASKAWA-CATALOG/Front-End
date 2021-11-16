<template>
	<div class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
		<div class="relative w-112 max-w-md">
			<!--content-->
			<div class="rounded-3xl h-60 bg-white outline-none focus:outline-none p-4">
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
					<div class="col-span-5">{{ o.shopname }}</div>
					<div class="col-span-2">{{ o.price }}</div>
					<div class="flex ml-auto select-none col-span-5">
						<div class="ri-pencil-fill mr-4 hover:text-green-500" />
						<div class="ri-delete-bin-fill hover:text-red-500" @click="deleteOnline(o)" />
					</div>
				</div>
				<div class="">

				</div>
				<!--body-->
			</div>
			<!--content-->
		</div>
	</div>
</template>

<script>

export default {
	components: {  },
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
			shops: [],
			shopLink: `${process.env.MASKAWA_APP_HOST}shop`,
			price: 0,
			link: "",
			invalidPrice: false,
			invalidLink: false,
			addOnlineLink: `${process.env.MASKAWA_APP_HOST}addonlineshop`,
		};
	},
	methods: {
		async close () {
			this.$emit("close-add-online");
		},
	},
	async created() {

	},
};
</script>