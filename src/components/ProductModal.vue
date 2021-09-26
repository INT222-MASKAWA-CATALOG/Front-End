<template>
	<div class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
		<div class="relative w-xl my-6 mx-auto max-w-7xl">
			<!--content-->
			<div class="rounded-lg bg-white outline-none focus:outline-none">
				<!--header-->
				<div class="flex flex-col items-start justify-between">
					<!-- Close Icon -->
					<button class="ri-close-line p-1 ml-auto text-black float-right text-3xl font-semibold" v-on:click="close()" />
				</div>
				<!--body-->
				<div class="pb-12 text-sm text-center">
					<img :src="`http://localhost:3000/Files/${e.image}`" class="object-cover w-full h-72" />
					{{ e.productname }}
				</div>
			</div>
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
