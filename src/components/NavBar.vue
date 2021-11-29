<template>
	<div class="navbar">
		<div class="bg-grayon select-none text-right py-0.5 pr-8">

			<!-- Show User -->
			<div v-if="this.statusLogin" class="">
				<div class="w-full">
					<div class="inline-flex align-middle">
						<div class="font-semibold rounded outline-none focus:outline-none text-black" @click="toggleDropdown()" ref="btnDropdownRef">
							Hi <span class="uppercase">{{ this.getUsernameFromLogin }}</span><!-- <i class="ri-account-circle-fill align-baseline text-xl" /> -->
						</div>
						<div v-bind:class="{'hidden': !dropdownPopoverShow, 'block': dropdownPopoverShow}" class="text-base z-50 bg-white float-left py-2 list-none text-left rounded shadow-lg mt-1" style="min-width:12rem" ref="popoverDropdownRef">
							<div class="py-2 px-4 font-semibold block w-full whitespace-nowrap text-black">
								ACCOUNT
							</div>
							<div class="h-0 my-2 border border-solid border-t-0 border-blueGray-800 opacity-25"></div>
							<a href="/profile" class="py-2 px-4 font-normal block w-full whitespace-nowrap">
								Profile
							</a>
							<a v-if="this.getUserFromLogin.roleid == 2" href="/managesys" class="py-2 px-4 font-normal block w-full whitespace-nowrap">
								Manage System
							</a>
							<a v-if="this.getUserFromLogin.roleid == 1" href="/record" class="py-2 px-4 font-normal block w-full whitespace-nowrap">
								Bookmark
							</a>
							<button class="py-2 px-4 font-normal block w-full whitespace-nowrap text-left" @click="logout()">
								Log out
							</button>
						</div>
					</div>
				</div>
			</div>
			<!-- Show User -->
			
			<!-- Show Login | Register -->
			<div v-else class="">
				<button class="" v-on:click="toggleModalLogin()">Login</button>
				<span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
				<button class="" v-on:click="toggleModalRegister()">Register</button>
			</div>
			<!-- Show Login | Register -->
			
		</div>

		<!-- flex style -->
		<!-- <div class="flex shadow-md">
			<div class="mr-auto justify-center"><router-link to="/home"><img src="../assets/maskawa_logo.png" class="h-16"></router-link></div>
			<div class="self-center text-xl select-none justify-center">{{ head }}</div>
			<div class="self-center flex pr-7 ml-auto justify-center">
				<div class="border bg-gray-200 rounded-full p-1 mx-1">
					<i class="ri-search-line text-lg"></i>&nbsp;&nbsp;
					<input type="text" placeholder="Search" class="bg-gray-200 focus:outline-none" />
				</div>
				<i class="ri-bookmark-3-fill text-3xl"></i>
			</div>
		</div> -->

		<!-- grid style -->
		<div class="grid grid-cols-3 shadow-md">
			<div class="mr-auto justify-center"><router-link to="/home"><img src="../assets/maskawa_logo.png" class="h-16"></router-link></div>
			<div class="self-center text-xl select-none justify-center text-center">{{ head }}</div>
		</div>
	</div>
	<!-- End Navigation Bar -->

	<!-- Start Login Modal -->

	<div v-if="showModalLogin" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
		<div class="relative w-xl my-6 mx-auto max-w-xl">
			<!--content-->
			<div class="rounded-lg w-96 bg-white outline-none focus:outline-none">
				<!--header-->
				<div class="flex flex-col items-start justify-between">
					<!-- Close Icon -->
					<button class="ri-close-line p-1 ml-auto text-black float-right text-3xl font-semibold" v-on:click="toggleModalLogin()" />
					<img src="../assets/maskawa_logo.png" class="w-48 mx-auto" />
				</div>
				<!--body-->
				<form @submit.prevent="submitLogin" >
					<div class="py-6 px-16">
						<div class="username flex flex-col">
							<label for="username" class="text-gray-400 font-light text-left">Username</label>
							<input type="text" id="username" v-model="usernameLogin" placeholder="" class="border-2 border-gray-300 rounded-md focus:outline-none py-1 px-2" />
							<p v-if="this.invalidUsernameLogin" class="text-red-600 text-sm text-left font-extralight">Please Enter Username !!</p>
						</div>
						<div class="password flex flex-col">
							<label for="password" class="text-gray-400 font-light text-left">Password</label>
							<input type="password" id="password" v-model="passwordLogin" placeholder="" class="border-2 border-gray-300 rounded-md focus:outline-none py-1 px-2" />
							<p v-if="this.invalidPasswordLogin" class="text-red-600 text-sm text-left font-extralight">Please Enter Password !!</p>
						</div>
					</div>
				<!--footer-->
					<div class="flex items-center justify-center px-16 pt-2">
						<button type="submit" class="bg-yellowPastel py-4 w-full rounded-lg font-semibold">LOGIN</button>
					</div>
				</form>
				<div class="pb-12 text-sm text-gray-300 text-center">
					Don’t have an account? 
					<button class="select-none text-sky border-sky border-b-4 hover:text-blue-700 hover:border-blue-700" v-on:click="switchModalLoginRegister()">
						Register
					</button>
				</div>
			</div>
		</div>
	</div>
	<div v-if="showModalLogin" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
	<!-- End Login Modal -->

	<!-- Start Register Modal -->
	<div v-if="showModalRegister" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
		<div class="relative w-xl my-6 mx-auto max-w-xl">
			<!--content-->
			<div class="border-0 rounded-lg shadow-lg w-96 bg-white outline-none focus:outline-none">
				<!--header-->
				<div class="flex flex-col items-start justify-between">
					<!-- Close Icon -->
					<button class="ri-close-line p-1 ml-auto text-black float-right text-3xl font-semibold" v-on:click="toggleModalRegister()" />
					<img src="../assets/maskawa_logo.png" class="w-48 mx-auto" />
					<div class="mx-auto font-semibold" style="color: #FCD109;">REGISTER A NEW ACCOUNT</div>
				</div>
				<!--body-->
				<form @submit.prevent="submitRegister" >
					<div class="py-6 px-16">
						<div class="username flex flex-col">
							<label for="username" class="text-gray-400 font-light text-left">Username</label>
							<input type="text" id="username" v-model="username" placeholder="" class="border-2 border-gray-300 rounded-md focus:outline-none py-1 px-2" />
							<p v-if="this.invalidUsername" class="text-red-600 text-sm text-left font-extralight">Please Enter Username !!</p>
						</div>
						<div class="password flex flex-col">
							<label for="password" class="text-gray-400 font-light text-left">Password</label>
							<input type="password" id="password" v-model="password" placeholder="" class="border-2 border-gray-300 rounded-md focus:outline-none py-1 px-2" />
							<p v-if="this.invalidPassword" class="text-red-600 text-sm text-left font-extralight">Please Enter Password !!</p>
						</div>
						<div class="email flex flex-col">
							<label for="email" class="text-gray-400 font-light text-left">Email</label>
							<input type="text" id="email" v-model="email" placeholder="" class="border-2 border-gray-300 rounded-md focus:outline-none py-1 px-2" />
							<p v-if="this.invalidEmail" class="text-red-600 text-sm text-left font-extralight">Please Enter Email !!</p>
						</div>
						<div class="phone flex flex-col">
							<label for="phone" class="text-gray-400 font-light text-left">Phone Number</label>
							<input type="text" id="phone" v-model="phone" placeholder="" class="border-2 border-gray-300 rounded-md focus:outline-none py-1 px-2" />
							<p v-if="this.invalidPhone" class="text-red-600 text-sm text-left font-extralight">Please Enter Phone Number !!</p>
						</div>
						<div class="gender flex flex-col">
							<label for="gender" class="text-gray-400 font-light text-left">Gender</label>
							<div class="radio-toolbar grid grid-cols-2 gap-2 my-2">
									<input type="radio" id="radioMen" value="MEN" v-model="gender" class="opacity-0 fixed w-0">
									<label for="radioMen" class="radioGender inline-block bg-gray-100 px-2 py-1 border-2 border-gray-300 rounded-md select-none text-center">MEN</label>

									<input type="radio" id="radioWomen" value="WOMEN" v-model="gender" class="opacity-0 fixed w-0">
									<label for="radioWomen" class="radioGender inline-block bg-gray-100 px-2 py-1 border-2 border-gray-300 rounded-md select-none text-center">WOMEN</label>
							</div>
							<p v-if="this.invalidGender" class="text-red-600 text-sm text-left font-extralight">Please Select Gender !!</p>
						</div>
					</div>
				<!--footer-->
					<div class="flex items-center justify-center px-16 pt-2">
						<button type="submit" class="bg-yellowPastel py-2 w-full rounded-lg font-medium">REGISTER</button>
					</div>
				</form>
				<div class="pb-12 text-sm text-gray-300 text-center">
					Already have an account?
					<button class="select-none text-orange hover:text-green-600" v-on:click="switchModalLoginRegister()">
						Login
					</button>
				</div>
			</div>
		</div>
	</div>
	<div v-if="showModalRegister" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
	<!-- End Register Modal -->

	<status-method v-if="this.showStatus" :status="status" />

</template>

<script>

import { createPopper } from "@popperjs/core";
import StatusMethod from "./StatusMethod.vue"

export default {
	components: {
		StatusMethod
		},
	props: {
		head: {
			type: String,
			require: true,
		},
	},
	emits: [
	],
	name: "dropdown",
	data() {
		return {
			dropdownPopoverShow: false,
			status: 0,
			showStatus: false,
			roleStatus: "",

			/* Login Zone */
			usernameLogin: "",
			passwordLogin: "",
			invalidUsernameLogin: false,
			invalidPasswordLogin: false,
			login: `${process.env.VUE_APP_MASKAWA_HOST}/login`,
			getuser: `${process.env.VUE_APP_MASKAWA_HOST}/me`,
			statusLogin: false,
			getUserFromLogin: "",
			getUsernameFromLogin: "",
			/* Login Zone */

			/* Register Zone */
			username: "",
			password: "",
			email: "",
			phone: "",
			gender: "",
			invalidUsername: false,
			invalidPassword: false,
			invalidEmail: false,
			invalidPhone: false,
			invalidGender: false,
			register: `${process.env.VUE_APP_MASKAWA_HOST}/register`,
			/* Register Zone */

			showModalLogin: false,
			showModalRegister: false,
			
		}
	},
	methods: {

		/* Login Zone */
		async toggleModalLogin () {
			this.showModalLogin = !this.showModalLogin;
		},
		async checkLogin () {
			this.invalidUsernameLogin = this.usernameLogin === "" ? true : false ;
			this.invalidPasswordLogin = this.passwordLogin === "" ? true : false ;
		},
		async submitLogin () {
			if (this.checkLogin()){
				let loginData = {
						username: this.usernameLogin,
						password: this.passwordLogin
					}
				console.log(this.usernameLogin + this.passwordLogin)
				const res = await fetch(this.login,{
					method: "POST",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify(loginData)
				})
				const tk = await res.json()
				localStorage.setItem('token',"Bearer " + tk.token)
				location.reload()
			}
		},
		/* Login Zone */

		/* ====================================================== */
		
		/* Register Zone */
		async toggleModalRegister () {
			this.showModalRegister = !this.showModalRegister;
		},
		async checkRegister () {
			this.invalidUsername = this.username === "" ? true : false ;
			this.invalidPassword = this.password === "" ? true : false ;
			this.invalidEmail = this.email === "" ? true : false ;
			this.invalidPhone = this.phone === "" ? true : false ;
			this.invalidGender = this.gender === "" ? true : false ;
		},
		async submitRegister () {
			if(this.checkRegister()) {

				let formData = new FormData();
				formData.append("username",this.username)
				formData.append("password",this.password)
				formData.append("email",this.email)
				formData.append("phone",this.phone)
				formData.append("gender",this.gender)
				console.log(formData)

				const res = await fetch(this.register,{
					method: "POST",
					body: formData
				})

				if (res.ok) {
					this.status = 1
					this.showStatus = true
				} else {
					this.status = 0
					this.showStatus = true
				}
				setTimeout( () => location.reload(), 1000);
			}
		},
		/* Register Zone */

		/* ====================================================== */

		/* Colab Zone */
		async switchModalLoginRegister() {
			this.showModalLogin = !this.showModalLogin;
			this.showModalRegister = !this.showModalRegister;
		},
		/* Colab Zone */

		/* ====================================================== */

		getUserFromToken: async function() {
			let token = localStorage.getItem('token')
			console.log(token)
			const res = await fetch(this.getuser,{
				method: "GET",
				headers: {
						"Authorization": token,
					},
			})
			if (res.ok) {
				this.statusLogin = true
				const user = await res.json()
				this.getUserFromLogin = user
				const username = await user.username
				this.getUsernameFromLogin = username
			}
		},

		toggleDropdown: function(){
			if(this.dropdownPopoverShow){
				this.dropdownPopoverShow = false;
			} else {
				this.dropdownPopoverShow = true;
				createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
					placement: "bottom-start"
				});
			}
		},

		logout: async function() {
			localStorage.removeItem("token");
			setTimeout( () => location.reload(), 300 );
			setTimeout( () => this.$router.push("/home"),500 );
		},

	},
	async created() {
		if(localStorage.getItem("token") != null) {
			this.getUserFromToken();
		}
	}
};
</script>

<style>
.radio-toolbar label:hover {
	background-color: #6FCDEB;
}

.radio-toolbar input[type="radio"]:focus + label {
	border: 2px #6FCDEB;
}

.radio-toolbar input[type="radio"]:checked + label {
	background-color: #6FCDEB;
	color: #FFF;
}
</style>