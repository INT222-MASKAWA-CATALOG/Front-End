<template>
  <carousel class="story-carousel story-carousel--colors">
    <slide class="story-carousel__slide">
      <img src="../assets/slide1.png" />
    </slide>
    <slide class="story-carousel__slide">
      <img src="../assets/slide2.png" />
    </slide>
    <slide class="story-carousel__slide">
      <img src="../assets/slide3.png" />
    </slide>
  </carousel>
</template>

<script>

import { Carousel, Slide } from 'vue-snap'
import 'vue-snap/dist/vue-snap.css'

export default {
  components: {
    Carousel,
    Slide
  },
  props: {

  },
  data() {
	return {

	}
  },
  methods: {

  }
};
</script>
