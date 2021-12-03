<template>
	<div class="Team">
		<nav-bar head="Team" />
		<div class="xl:grid xl:grid-cols-3 xl:gap-20 xl:mt-8 xl:mx-16 
								lg:grid lg:grid-cols-3 lg:gap-10 lg:mt-16 lg:mx-10">
			<div class="bg-tp text-center">
				<img src="../assets/mew.png" class="rounded-full mx-auto xl:mt-8 xl:mb-8 xl:w-72 md:w-72 lg:w-48 filter brightness-90">
				<div class="xl:w-max xl:mx-auto xl:pt-1 xl:mt-8">62130500056</div>
				<p>PIYATHIDA THANEEWAN</p>
				<p class="xl:text-sm xl:mb-16 text-xs">RESPONSIBILITY: BACK-END & DATABASE & DEVOPS</p>
			</div>
			<div class="bg-tb text-center">
				<img src="../assets/sk.jpg" class="rounded-full mx-auto xl:mt-8 xl:mb-8 xl:w-72 md:w-72 lg:w-48 filter brightness-90">
				<div class="xl:w-max xl:mx-auto xl:pt-1 xl:mt-8">62130500060</div>
				<p>PONGPICHET TANTHANAWIKRAI</p>
				<p class="xl:text-sm xl:mb-16 text-xs">RESPONSIBILITY: FRONT-END & BACK-END</p>
			</div>
			<div class="bg-ty text-center">
				<img src="../assets/win.jpg" class="rounded-full mx-auto xl:mt-8 xl:mb-8 xl:w-72 md:w-72 lg:w-48 filter brightness-125">
				<div class="xl:w-max xl:mx-auto xl:pt-1 xl:mt-8">62130500064</div>
				<p>POSSAWAT TANAM</p>
				<p class="xl:text-sm xl:mb-16 text-xs">RESPONSIBILITY: BACK-END & DATABASE & DEVOPS</p>
			</div>
		</div>
	</div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
export default {
		components: {
				NavBar,
		}
}
</script>