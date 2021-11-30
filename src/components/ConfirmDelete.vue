<template>
	<div class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
		<div class="relative">
			<!--content-->
			<div class="rounded-3xl bg-white outline-none focus:outline-none w-80 h-60">
				<!--header-->
				<div class="flex flex-col items-start justify-between">
					<!-- Close Icon -->
					<button class="ri-close-line p-1 ml-auto text-black float-right text-3xl font-semibold" v-on:click="cancel()" />
				</div>
				<!--header-->

				<!--body-->
				<div class="">
						<div class="ri-delete-bin-fill mx-auto text-8xl text-white bg-red-500 rounded-full w-28 p-2 text-center" />
						<div class="text-center my-5">
							<button @click="cancel()" class="border-2 border-gray-400 mr-2 px-2 shadow-md rounded-md">Cancel</button>
							<button @click="confirm()" class=" mx-2 bg-red-400 px-2 border-2 border-red-500 shadow-md rounded-md">Delete</button>
						</div>
				</div>
				<!--body-->
			</div>
			<!--content-->
		</div>
	</div>
	
	<status-method v-if="this.showStatus" :status="status" />
</template>

<script>

import StatusMethod from "./StatusMethod.vue"

export default {
	components: {
		StatusMethod
	},
	props: [
		"path",
		"datalink",
	],
	data() {
		return {
			status: 0,
			showStatus: false,
		};
		
	},
	methods: {
		async cancel() {
			this.$emit('cancel')
		},
		async confirm() {
			let token = localStorage.getItem('token')
			const res = await fetch(`${this.datalink}/${this.path}`,{method: "DELETE",headers: {"Authorization": token}})
			if (res.ok) {
				this.status = 1
				this.showStatus = true
			} else {
				this.status = 0
				this.showStatus = true
			}
			setTimeout( () => location.reload(), 500);
		},
	},
	async created() {

}
}
</script>