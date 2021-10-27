<template>
	<div class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
		<div class="relative">
			<!--content-->
			<div class="rounded-3xl bg-white outline-none focus:outline-none w-80 h-60">
				<!--header-->
				<div class="flex flex-col items-start justify-between">
					<!-- Close Icon -->
					<!-- <button class="ri-close-line p-1 ml-auto text-black float-right text-3xl font-semibold" v-on:click="cancel()" /> -->
				</div>
				<!--header-->

				<!--body-->
				<div class="">
					<div class="ri-check-fill mx-auto text-8xl text-white bg-green-500 rounded-full w-28 p-2 text-center" />
					<div class="ri-close-fill mx-auto text-8xl text-white bg-red-500 rounded-full w-28 p-2 text-center" />
				</div>
				<!--body-->
			</div>
			<!--content-->
		</div>
	</div>
</template>

<script>

export default {
	props: [
		"status"
	],
	data() {
		return {
		}
	},
	methods: {

	},
	async created() {

	}
};
</script>
