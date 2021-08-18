<template>
  <div class="Team">
    <nav-bar head="Team" />
    <div class="grid grid-cols-3 gap-20 mt-8 mx-16">
      <div class="bg-tp text-center">
        <img src="../assets/mew.png" class="rounded-full mt-8 mb-8 xl:w-72 md:w-72 w-48 mx-auto" style="filter:brightness(90%);">
        <div class="rounded-xl w-max mx-auto pt-1 mt-8">62130500056</div>
        <p>PIYATHIDA THANEEWAN</p>
        <p class="text-sm mb-16">RESPONSIBILITY: BACK-END & DATABASE & DEVOPS</p>
      </div>
      <div class="bg-tb text-center">
        <img src="../assets/sk.jpg" class="rounded-full mt-8 mb-8 xl:w-72 md:w-72 w-48 mx-auto"  style="filter:brightness(90%);">
        <div class="rounded-xl w-max mx-auto pt-1">62130500060</div>
        <p>PONGPICHET TANTHANAWIKRAI</p>
        <p class="text-sm mb-16">RESPONSIBILITY: FRONT-END & BACK-END</p>
      </div>
      <div class="bg-ty text-center">
        <img src="../assets/win.jpg" class="rounded-full mt-8 mb-8 xl:w-72 md:w-72 w-48 mx-auto"  style="filter:brightness(120%);">
        <div class="rounded-xl w-max mx-auto pt-1">62130500064</div>
        <p>POSSAWAT TANAM</p>
        <p class="text-sm mb-16">RESPONSIBILITY: BACK-END & DATABASE & DEVOPS</p>
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