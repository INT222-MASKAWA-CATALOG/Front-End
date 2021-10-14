<template>
	<nav-bar head="Manage System"/>
	<!-- <manage-sys-bar @open-page="openPage" />
	<iframe src="./manage_system_page/ManageMember.vue" name="iframe_content" /> -->
</template>

<script>
import NavBar from '../components/NavBar.vue';
// import ManageSysBar from '../components/ManageSysBar.vue';

export default {
	components: {
		NavBar,
		// ManageSysBar
	},
	props: {

	},
	data() {
	return {

	}
	},
	methods: {
		// async openPage (menu) {
		// 	console.log('1')
		// 	let path;
		// 	switch(menu){
		// 		case'Member' : path='manage_system_page/ManageMember.vue';break;
		// 		case'Brand' : path='manage_system_page/ManageBrand.vue';break;
		// 		case'Color' : path='manage_system_page/ManageColor.vue';break;
		// 		case'Product' : path='manage_system_page/ManageProduct.vue';break;
		// 	}
		// 	window.open(path,"iframe_content")
		// }
	},
	async create() {

	}
};

</script>