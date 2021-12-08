<template>
	<div class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
		<div class="relative w-4/5 h-96">
			<!--content-->
			<div class="rounded-3xl bg-white outline-none focus:outline-none">
				<!--header-->
				<div class="flex flex-col items-start justify-between">
					<!-- Close Icon -->
					<button class="ri-close-line p-1 ml-auto text-black float-right text-3xl font-semibold" v-on:click="close()" />
				</div>
				<!--header-->

				<!--body-->
				<div class="text-sm flex lg:flex-col flex-row my-1">
					<div class="lg:grid lg:grid-cols-8 lg:gap-8">
						<div class="lg:col-span-3 ">
							<img :src="`${hosts}/Files/${e.image}`" class="object-contain lg:w-full w-4/5 lg:h-80 h-60 lg:m-4 mx-auto mt-0" />
						</div>
						<div class="flex flex-col mx-2 lg:col-span-5 mb-6">

							<!-- Product Name -->
							<span class="lg:text-4xl text-base">{{ e.productname }}</span>

							<!-- Brand -->
							<span class="lg:text-lg text-sm">Brand | <span class="text-gray-400">{{ e.brandname }}</span></span>

							<!-- Online Shop -->
							<div v-for="s in e.onlineshop" :key="s.onlineid" class="flex items-center gap-4">
								<div class="max-w-xss border my-1 lg:w-28 w-16">
									<img :src="`${hosts}/Files/${s.shop.logo}`" class="h-7 mx-auto"/>
								</div>
								<span class="lg:text-lg text-sm">THB {{ s.price }}</span>
								<div class="border border-black rounded lg:px-2 px-1 py-1 shadow-md lg:text-base text-sm">
									<a :href="`${s.productlink}`" >ไปที่ร้านค้า</a>
								</div>
							</div>
							<!-- Online Shop -->
							
							<!-- Description -->
							<span class="lg:text-xl lg:font-normal font-bold mt-2">PRODUCT OVERVIEW</span>
							<span class="lg:text-sm text-xs text-justify">{{ e.description }}</span>
							<!-- Description -->
						</div>
					</div>
				</div>
				<!--body-->
			</div>
			<!--content-->
		</div>
	</div>
</template>

<script>


export default {
	components: { 

		},
	props: {
		e: {
			type: Object,
			require: true,
		}
	},
	emits: [
		"close-product-modal"
	],
	data() {
		return {
			hosts: process.env.VUE_APP_MASKAWA_HOST,
		};
	},
	methods: {
		async close () {
			this.$emit("close-product-modal");
		},
	},
};
</script>
