<template>
	<router-view @edit-product="editProduct" :data-edit-product="dataEditProduct"/>
</template>

<script>
export default {
		components: {
		},
		data () {
			return {
				dataEditProduct: [],
			}
		}
		,
		methods: {
			editProduct(p) {
				this.dataEditProduct = p
			}
		}
}
</script>

<style>
#app {
	font-family: 'Kanit', sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	/* text-align: center; */
	color: #2c3e50;
}
</style>
