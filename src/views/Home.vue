<template>
    <nav-bar head="MASKAWA" />
    <p class="text-gray-300 text-xl font-light my-3">Get Ready for the MASKAWA</p>
    <carousel class="text-3xl mx-8" />
</template>

<script>
import NavBar from '../components/NavBar.vue'
import Carousel from '../components/Carousel.vue'
export default {
    components: {
        NavBar,
        Carousel,
    }
}
</script>
