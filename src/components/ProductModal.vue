<template>
	<div class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
		<div class="relative max-w-6xl">
			<!--content-->
			<div class="rounded-3xl bg-white outline-none focus:outline-none">
				<!--header-->
				<div class="flex flex-col items-start justify-between">
					<!-- Close Icon -->
					<button class="ri-close-line p-1 ml-auto text-black float-right text-3xl font-semibold" v-on:click="close()" />
				</div>
				<!--header-->

				<!--body-->
				<div class="text-sm flex flex-col">
					<div class="flex flex-row">
						<img :src="`http://localhost:3000/Files/${e.image}`" class="object-contain w-full h-96 m-4 mt-0" />
						<div class="flex flex-col mx-4">

							<!-- Product Name -->
							<span class="text-4xl">{{ e.productname }}</span>

							<!-- Brand -->
							<span class="text-lg">Brand | <span class="text-gray-400">{{ e.brandname }}</span></span>

							<!-- Online Shop -->
							<div v-for="s in e.onlineshop" :key="s.onlineid" class="flex items-center gap-4">
								<div class="max-w-xss border my-1 w-28">
									<img :src="`http://localhost:3000/Files/${s.logo}`" class="h-7 mx-auto"/>
								</div>
								<span class="text-lg">THB {{ s.price }}</span>
								<div class="border border-black rounded px-2 py-1 shadow-md">
									<a :href="`${s.productlink}`" >ไปที่ร้านค้า</a>
								</div>
							</div>
							<!-- Online Shop -->

							<!-- Description -->
							<span class="text-xl">PRODUCT OVERVIEW</span>
							<span class="text-sm text-justify">{{ e.description }}</span>
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
	components: {},
	props: {
		e: {
			type: Object,
			require: true,
		}
	},
	data() {
		return {};
	},
	methods: {
		async close () {
			this.$emit("close-product-modal");
		},
	},
};
</script>
