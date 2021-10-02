<template>
	<nav-bar head="Add Product (Admin Only)" />
	<form @submit.prevent="submitForm">
		<div id="Add Product Field" class="grid grid-cols-2 gap-8 ml-8 mr-16 my-10">
			<!-- Left Side -->
			<div class="">
				<label class="uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">Upload Image</label>
					<div class='flex items-center justify-center w-full'>
						<label class='cursor-pointer flex flex-col border-4 border-dashed w-full hover:bg-gray-100 hover:border-yellowCream group'>
							<div v-if="!image" class='flex flex-col items-center justify-center py-36'>
								<svg class="w-10 h-10 text-gray-400 group-hover:text-yellowCream" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
								</svg>
								<p class='uppercase text-sm text-gray-400 group-hover:text-yellowCream pt-1 tracking-wider select-none'>Select a Image</p>
							</div>
							<div id="preview" v-else>
								<img :src="imageshow" class="object-cover object-top w-auto max-h-96 mx-auto"/>
							</div>
							<input id="image" type="file" class="hidden" @change="uploadPhoto($event)" />
						</label>
					</div>
					<p v-if="invalidImage" class="text-red-500 text-sm text-left italic">** Please enter Image! **</p>
			</div>
			<!-- Left Side -->

			<!-- Right Side -->
			<div class="grid grid-cols-2 gap-x-8 gap-y-6 text-left">
				<!-- Product Name -->
				<div id="ProductName" class="flex flex-col">
					<label for="productname" class="uppercase">Product Name</label>
					<input
						id="productname"
						type="text"
						v-model="productname"
						placeholder=""
						class="rounded-md focus:outline-none py-1 px-2 shadow-md"
					/>
					<p v-if="invalidProductname" class="text-red-500 text-sm text-left italic">** Please enter Product Name! **</p>
				</div>
				<!-- Product Name -->

				<!-- Brand -->
				<div id="Brand" class="flex flex-col">
					<label for="brand" class="uppercase">Brand</label>
					<select
						name="brand"
						class="rounded-md focus:outline-none py-1 px-2 shadow-md"
						v-model="brandid"
					>
						<option v-for="b in brands" :key="b.brandid" :value="b.brandid">
							{{ b.brandname }}
						</option>
					</select>
					<p v-if="invalidBrandid" class="text-red-500 text-sm text-left italic">** Please select Product Brand! **</p>
				</div>
				<!-- Brand -->

				<!-- Color -->
				<div id="Color" class="flex flex-col">
					<label for="color" class="uppercase">Color</label>
					<select
						name="color"
						class="rounded-md focus:outline-none py-1 px-2 shadow-md"
						v-model="colorid"
					>
						<option v-for="c in colors" :key="c.colorid" :value="c.colorid">
							{{ c.colorname }}
						</option>
					</select>
					<p v-if="invalidColorid" class="text-red-500 text-sm text-left italic">** Please select Product Color! **</p>
				</div>
				<!-- Color -->

				<!-- Sale Date -->
				<div id="SaleDate" class="flex flex-col">
					<label for="saledate" class="uppercase">Sale Date</label>
					<input
						id="saledate"
						type="date"
						v-model="saledate"
						placeholder=""
						class="rounded-md focus:outline-none py-1 px-2 shadow-md"
					/>
					<p v-if="invalidSaledate" class="text-red-500 text-sm text-left italic">** Please enter Sale Date! **</p>
				</div>
				<!-- Sale Date -->

				<!-- Description -->
				<div id="Description" class="col-span-2 flex flex-col">
					<label for="description" class="uppercase">Description</label>
					<textarea
						id="description"
						v-model="description"
						placeholder=""
						class="h-48 rounded-md focus:outline-none py-1 px-2 shadow-md"
						style="resize: none"
					/>
					<p v-if="invalidDescription" class="text-red-500 text-sm text-left italic">** Please enter Product Description! **</p>
				</div>
				<!-- Description -->

				<!-- Submit Button -->
				<div id="SubmitButton" class="col-span-2 text-right">
					<button
						type="submit"
						class="
							text-white
							bg-buttonGreen
							w-72
							py-2
							rounded-md
							shadow-lg
							text-lg
						"
					>
						<i class="ri-save-3-line text-base align-middle"></i> SAVE
					</button>
				</div>
				<!-- Submit Button -->
			</div>
			<!-- Right Side -->
		</div>
	</form>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
	components: {
		NavBar,
	},
	data() {
		return {
			brandlink: "http://13.67.90.93:3000/brand",
			brands: [],
			colorlink: "http://13.67.90.93:3000/color",
			colors: [],
			addProductDataLink: "http://13.67.90.93:3000/addProduct",
			uploadImageLink: "http://13.67.90.93:3000/uploadImage",

			productname: "",
			saledate: null,
			description: "",
			image: null,
			imageshow: '',
			brandid: 0,
			colorid: 0,
			invalidProductname: false,
			invalidSaledate: false,
			invalidDescription: false,
			invalidImage: false,
			invalidBrandid: false,
			invalidColorid: false,
		};
	},
	methods: {
		submitForm() {
			this.invalidProductname = this.productname === "" ? true : false;
			this.invalidSaledate = this.saledate === null ? true : false;
			this.invalidDescription = this.description === "" ? true : false;
			this.invalidImage = this.image === null ? true : false;
			this.invalidBrandid = this.brandid === 0 ? true : false;
			this.invalidColorid = this.colorid === 0 ? true : false;

			let checkForm = (this.productname !== "" && this.saledate !== null && this.description !== "" && this.images !== null && this.brandid !== 0 && this.colorid !== 0)

			if (checkForm) {
				let productData = {
					productname: this.productname,
					saledate: this.saledate,
					description: this.description,
					image: this.image.name,
					brandid: this.brandid,
					colorid: this.colorid
				}
				this.addProduct(productData);
			}
		},
		async addProduct(product) {
			var fullPath = document.getElementById("image").value;
      if (fullPath) {
        var startIndex =
          fullPath.indexOf("\\") >= 0
            ? fullPath.lastIndexOf("\\")
            : fullPath.lastIndexOf("/");
        var filename = fullPath.substring(startIndex);
        if (filename.indexOf("\\") === 0 || filename.indexOf("/") === 0) {
          filename = filename.substring(1);
        }
      }
			console.log(product)
			console.log("Success first step")

			let formData = new FormData();
			let productJson = JSON.stringify(product);

			fetch(`${this.addProductDataLink}`, {
			method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: productJson,
			});

			formData.append("file", this.image,this.image.name);

			fetch(`${this.uploadImageLink}`, {
				method: "POST",
				body: formData,
			});

			this.$router.push("/home");
		},
		uploadImage (event) {
			var input = event.target;
			if (input.files) {
				var reader = new FileReader();
				this.image = input.files[0];
				reader.readAsDataURL(input.files[0]);
			}
		},
		async fetchBrands() {
			const res = await fetch(this.brandlink);
			const data = await res.json();
			return data;
		},
		async fetchColors() {
			const res = await fetch(this.colorlink);
			const data = await res.json();
			return data;
		},
		uploadPhoto(e) {
			this.image = e.target.files[0];
			this.imageshow = e.target.files[0];
			var reader = new FileReader();
			reader.onload = (e) => {
				this.imageshow = e.target.result;
			};
			reader.readAsDataURL(this.imageshow);
			console.log(this.image);
			console.log(this.image.name);
		},
	},
	async created() {
		this.brands = await this.fetchBrands();
		this.colors = await this.fetchColors();
	},
};
</script>