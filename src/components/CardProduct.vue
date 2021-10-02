<template>
	<div class="bg-yellowPastel shadow-lg rounded-lg relative">
		<img :src="`http://13.67.90.93:3000/Files/${p.image}`" class="my-auto mx-auto object-cover w-full h-72" />
		<i class="ri-bookmark-line absolute top-2 right-2 text-xl z-50" />
		<div class="flex justify-between">
			<span class="text-xl mx-1">{{ p.productname }}</span>
		</div>
	</div>
</template>

<script>

export default {
	components: {

	},
	props: {
		p: {
			type: Object,
			require: true,
		}
	},
	data() {
	return {

	}
	},
	methods: {

	}
};
</script>
