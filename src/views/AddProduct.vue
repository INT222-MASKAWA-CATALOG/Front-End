<template>
  <nav-bar head="Add Product (Admin Only)" />
  <form @submit.prevent="submitForm">
    <div id="Add Product Field" class="grid grid-cols-2 gap-8 ml-8 mr-16 my-10">
      <div class="">
        <img src="../assets/win.jpg" class="mx-auto" />
      </div>
      <div class="grid grid-cols-2 gap-x-8 gap-y-6 text-left">
        <div id="ProductName" class="flex flex-col">
          <label for="name" class="">Product Name</label>
          <input id="name" type="text" v-model="name" placeholder="" class="rounded-md focus:outline-none py-1 px-2 shadow-md" />
        </div>
        <div id="Price" class="flex flex-col">
          <label for="price" class="">Price</label>
          <input id="price" type="number" v-model="price" min="0" placeholder="" class="rounded-md focus:outline-none py-1 px-2 shadow-md" />
        </div>
        <div id="Brand" class="flex flex-col">
          <label for="brand" class="">Brand</label>
        </div>
        <div id="Size" class="row-span-3 flex flex-col">
          <label for="size" class="">Size</label>
        </div>
        <div id="Gender" class="flex flex-col">
          <label for="gender" class="">Gender</label>
          <Multiselect id="gender" v-model="gender" :options="{men: 'MEN',women: 'WOMEN'}" class="rounded-md focus:outline-none py-1 px-2 shadow-md select-none" mode="multiple" />
        </div>
        <div id="Shoes" class="flex flex-col">
          <label id="shoes" class="">Shoes</label>
        </div>
        <div id="Description" class="col-span-2 flex flex-col">
          <label for="description" class="">Description</label>
          <textarea id="description" v-model="description" placeholder="" class="h-48 rounded-md focus:outline-none py-1 px-2 shadow-md" />
        </div>
        <div id="SubmitButton" class="col-span-2 text-right">
          <button type="submit" class="text-white bg-buttonGreen w-72 py-2 rounded-md shadow-lg text-lg"><i class="ri-save-3-line text-base align-middle"></i> SAVE</button>
        </div>
      </div>
    </div>
  </form>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>

<script>
import NavBar from "../components/NavBar.vue";
import Multiselect from '@vueform/multiselect';
export default {
  components: {
    NavBar,
    Multiselect,
  },
  data() {
    return {
      name: "",
      price: 0,
      brand: "",
      color: "",
      gender: [],
      size: "",
      shoes: "",
      description: "",
    };
  },
  methods: {
    submitForm () {
      alert(this.gender)
    }
  },
};
</script>