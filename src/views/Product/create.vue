<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useProductStore } from '@/stores/product.js'
import { onMounted, ref } from 'vue'
import Multiselect from 'vue-multiselect'
import { useRouter } from 'vue-router'

let productStore = useProductStore()

let category = ref([])

onMounted(async ()=>{
    await productStore.getCategoryList()
  productStore.categories.forEach(item => {
      console.log(item)
      category.value.push({name: item.name,id: item.id})
    })
})

let name = ref('')
let categories = ref([])
let selectedImage = ref('')
let imagePreview = ref('')


const router = useRouter()
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  console.log(file)
  if (file) {
    selectedImage.value = file;

    // Create a base64 preview
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

const uploadImage = async () => {

  console.log(selectedImage.value)
  if (!selectedImage.value) return;


  const formData = new FormData();
  console.log(categories.value)
  formData.append("image", selectedImage.value);
  formData.append("name", name.value);
  categories.value.forEach(item => {
    formData.append("categories[]", item.id);

  })

  await productStore.createProduct(formData)
  name.value = ''
  categories.value = ''
  selectedImage.value = ''
  imagePreview.value = ''

  await router.push('/products')

}


</script>

<template>
  <DefaultLayout>
    <div class="bg-white">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">All Products</h2>
          <form>
            <div class="space-y-12">
              <div class="border-b border-gray-900/10 pb-12">
               <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div class="sm:col-span-4">
                    <label for="username" class="block text-sm/6 font-medium text-gray-900">Product name</label>
                    <div class="mt-2">
                      <div class="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                        <input type="text" v-model="name" id="username" class="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6" placeholder="Enter product name" />
                      </div>
                    </div>
                  </div>
                 <div class="sm:col-span-4">
                   <label for="username" class="block text-sm/6 font-medium text-gray-900">Product Category</label>
                   <div class="mt-2">
                     <multiselect v-model="categories" :options="category" :multiple="true" label="name" track-by="name" :preselect-first="true">
                     </multiselect>
                   </div>
                 </div>

                  <div class="sm:col-span-4">
                    <label for="cover-photo" class="block text-sm/6 font-medium text-gray-900">Cover photo</label>
                    <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div class="text-center">
<!--                        <PhotoIcon class="mx-auto size-12 text-gray-300" aria-hidden="true" />-->
                        <img  v-if="imagePreview" :src="imagePreview" alt="imagePreview" height="120" width="120">
                        <div class="mt-4 flex text-sm/6 text-gray-600">
                          <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                            <span>Upload a file</span>
                            <input id="file-upload"
                                   @change="handleFileUpload"
                                   accept="image/*"
                                   type="file"
                                   class="sr-only" />
                          </label>
                          <p class="pl-1">or drag and drop</p>
                        </div>
                        <p class="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6 flex items-center justify-end gap-x-6">
              <button type="button" class="text-sm/6 font-semibold text-gray-900">Cancel</button>
              <button @click.prevent="uploadImage" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Save
              </button>
            </div>
          </form>
      </div>
    </div>
  </DefaultLayout>
</template>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>