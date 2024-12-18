<template>	
	<!-- start table -->
	<div class="">
		<div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
			<div class="w-full md:w-1/2">
				<div class="flex items-center">
					<label for="simple-search" class="sr-only">Search</label>
					<div class="relative w-full">
						<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
							</svg>
						</div>
						<input type="text" v-model="searchInputs" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" required="">
					</div>
				</div>
			</div>
			<div class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
				<button id="button" @click="toggleModal(true, [])" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
					Add Product
				</button>
			</div>
		</div>
		<div class="overflow-x-auto">
			<table class="w-full text-sm text-left">
				<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" class="px-4 py-3">Product name</th>
						<th scope="col" class="px-4 py-3">Category</th>
						<th scope="col" class="px-4 py-3">Brand</th>
						<th scope="col" class="px-4 py-3">Description</th>
						<th scope="col" class="px-4 py-3">Price</th>
						<th scope="col" class="px-4 py-3">
							<span class="sr-only">Actions</span>
						</th>
					</tr>
				</thead>
				<tbody v-if="searchItems.length > 0">
					<tr class="border-b dark:border-gray-700" v-for="(item, i) in searchItems" :key="i">
						<th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ item.product }}</th>
						<td class="px-4 py-3">{{ item.category }}</td>
						<td class="px-4 py-3">{{ item.brand }}</td>
						<td class="px-4 py-3">{{ item.description }}</td>
						<td class="px-4 py-3">${{ item.price }}</td>
						<td class="px-4 py-3 flex items-center justify-end">
							<button @click="toggleDropdown(item.id)" class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button">
								<svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
									<path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
								</svg>
							</button>
							<div v-if="activeDropdown === item.id" class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
								<ul class="py-1 text-sm text-gray-700 dark:text-gray-200">
									<li><a href="#" @click="toggleModal(false, i)" class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a></li>
									<li><a href="#" @click="delModel(item.id)" class="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a></li>
								</ul>
							</div>							
						</td>
					</tr>
				</tbody>
				<tbody v-else>
					<tr class="border-b dark:border-gray-700">
						<th colspan="5" scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
							<div style="text-align: center;">
								No Data
							</div>
						</th>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<!-- end table -->

	<!-- start modal -->
	<div id="defaultModal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
		<div class="relative w-full max-w-2xl max-h-full">
			<!-- Modal content -->
			<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
				<!-- Modal header -->
				<div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
					<h3 class="text-xl font-semibold text-gray-900 dark:text-white">
						{{ titleModel }}
					</h3>
					<button id="closeModalButton" @click="closeModal()" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
						<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
						<span class="sr-only">Close modal</span>
					</button>
				</div>
				<!-- Modal body -->
				<div class="p-6 space-y-6">
					<div class="grid gap-6 mb-6 md:grid-cols-2">
						<div>
							<label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product name</label>
							<input type="text" v-model="form.product" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
						</div>
						<div>
							<label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
							<input type="text" v-model="form.category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
						</div>
						<div>
							<label for="company" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
							<input type="text" v-model="form.brand" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
						</div>  
						<div>
							<label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
							<input type="text" v-model="form.description" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
						</div>
					</div>
					<div class="mb-6">
						<label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
						<input type="text" v-model="form.price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
					</div> 
				</div>
				<!-- Modal footer -->
				<div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
					<button id="acceptButton" v-if="btnEdit" @click="save()" data-modal-hide="defaultModal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
					<button id="acceptButton" v-else @click="edit()" data-modal-hide="defaultModal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
					<button id="declineButton" @click="closeModal()" data-modal-hide="defaultModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
				</div>
			</div>
		</div>
  	</div>
	<!-- end modal -->


	<!-- start load A -->
	<div id="defaultModalA" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
		<div class="relative w-full max-w-sm max-h-full">		
			<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
				<div class="flex items-center p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300" role="alert">
					<svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
						<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
					</svg>
					<div class="flex items-center p-4">
						{{ msjLoad }}
					</div>
				</div>
			</div>
		</div>
  	</div>
	<!-- end load A -->


	<div id="defaultModalB" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
		<div class="relative p-4 w-full max-w-md max-h-full">
			<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
				<button @click="delCloseModel()" type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
					<svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
					</svg>
					<span class="sr-only">Close modal</span>
				</button>
				<div class="p-4 md:p-5 text-center">
					<svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
						<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
					</svg>
					<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
					<button @click="del()" data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
						Yes, I'm sure
					</button>
					<button @click="delCloseModel()" data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
				</div>
			</div>
		</div>
	</div>	
</template>
<script>
import { Modal } from 'flowbite';
import * as Yup from "yup";
export default {
  name: 'tableSimple',
  data() {
    return {		
		searchInputs: '',
		datos: [],
		titleModel:'Add Product',
		form:{
			product:'',
			category:'',
			brand:'',
			description:'',
			price:0,
		},
		modalInstance: null,
		modalInstanceA: null,
		modalInstanceB: null,
		activeDropdown: null,
		btnEdit:true,
		index: 0,
		msjLoad:'',
		id: 0,
    };
  },
  created() {
    this.datos = [
      {
        id: 1,
        product: 'Apple iMac 27',
        category: 'PC',
        brand: 'Apple',
        description: 300,
        price: 2999,
      },
      {
        id: 2,
        product: 'Apple iMac 28',
        category: 'PC',
        brand: 'Apple 2',
        description: 301,
        price: 3000,
      },	  
    ];
  },
  mounted() {
	this.initModal();
  },
  methods:{
    initModal() {
      const modalElement = document.querySelector('#defaultModal');
      this.modalInstance = new Modal(modalElement);

      const modalElementA = document.querySelector('#defaultModalA');
      this.modalInstanceA = new Modal(modalElementA);
	  
      const modalElementB = document.querySelector('#defaultModalB');
      this.modalInstanceB = new Modal(modalElementB);	  
    },
    toggleModal(bool, dat) {
		if (!bool) {
			this.titleModel = 'Edit Product';
			this.index = dat;
			this.toggleDropdown(parseInt(this.datos[dat].id));
			// this.form.id = this.datos[dat].id;
			// this.form.product = this.datos[dat].product;
			// this.form.category = this.datos[dat].category;
			// this.form.brand = this.datos[dat].brand;
			// this.form.description = this.datos[dat].description;
			// this.form.price = this.datos[dat].price;
			const item = this.datos[dat];
			this.form = { ...item }; // Spread to copy properties
			this.btnEdit = false;
		}		
      	this.modalInstance.toggle();
    },
    toggleModalA() {
      	this.modalInstanceA.toggle();
    },	
    closeModal() {
		this.modalInstance.hide();
		this.resetForm();
    },
    async save() {
		const schema = Yup.object().shape({
                product: Yup.string().required('El producto es requerido'),
                category: Yup.string().required('La categoria es requerida'),
                brand: Yup.string().required('La marca es requerida'),
                description: Yup.string().required('La descripcion es requerida'),
				price: Yup.number().required('El precio es requerido').positive('El precio debe ser mayor a 0 y positivo'),
            });
        try {
            await schema.validate(this.form, { abortEarly: false });
			console.log('Saving product:', this.form);
			this.datos.push({ id: Date.now(), ...this.form });
			this.showTemporaryModal("Los datos se guardaron correctamente.");
			this.closeModal();			
		} catch (error) {
			let array = [];
			error.inner.forEach((err) => {
				console.log(err.message);
				array.push(err.message);
			});
			this.showTemporaryModal(array[0]);
		}
    },
    async edit() {
		const schema = Yup.object().shape({
                product: Yup.string().required('El producto es requerido'),
                category: Yup.string().required('La categoria es requerida'),
                brand: Yup.string().required('La marca es requerida'),
                description: Yup.string().required('La descripcion es requerida'),
				price: Yup.number().required('El precio es requerido').positive('El precio debe ser mayor a 0 y positivo'),
            });
        try {
            await schema.validate(this.form, { abortEarly: false });		
			console.log('Editing product:', this.form);
			// this.datos[this.index].product = this.form.product;
			// this.datos[this.index].category = this.form.category;
			// this.datos[this.index].brand = this.form.brand;
			// this.datos[this.index].description = this.form.description;
			// this.datos[this.index].price = this.form.price;
			this.datos[this.index] = { ...this.form }; // Update the existing product
			this.showTemporaryModal("Los datos se editaron correctamente.");
			this.closeModal();
		} catch (error) {
			let array = [];
			error.inner.forEach((err) => {
				console.log(err.message);
				array.push(err.message);
			});
			this.showTemporaryModal(array[0]);
		}						
    },	
    showTemporaryModal(msj) {
		this.msjLoad = msj;
		this.modalInstanceA.toggle();
		setTimeout(() => {
			this.modalInstanceA.hide();
		}, 3000);
    },
	delModel(id){
		this.modalInstanceB.toggle();
		this.id = id;
	},
	delCloseModel(){
		this.modalInstanceB.hide();
		this.id = 0;
	},	
	del(){
		this.datos = this.datos.filter((item) => item.id !== this.id);
		this.delCloseModel();
	},
    resetForm() {
      this.form = {
        product: '',
        category: '',
        brand: '',
        description: '',
        price: 0,
      };
	  this.btnEdit = true;
    },
    toggleDropdown(id) {
      	this.activeDropdown = this.activeDropdown === id ? null : id;	  
    },	
  },
  computed: {		
		searchItems() {
			return this.datos.filter(item => {
				return Object.values(item).some(value =>
					String(value).toLowerCase().includes(this.searchInputs.toLowerCase())
				);
			});
		},		
    },  
};
</script>
