<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useProductStore } from '@/stores/product.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

let router = useRouter()
let productStore = useProductStore()

let name = ref('')

const createCategory = async () => {
  await productStore.createCategory({ 'name': name.value} )
  await router.push('/categories')

}
</script>

<template>
  <DefaultLayout>
    <div class="bg-white">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">Create Category</h2>
        <form>
          <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
              <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div class="sm:col-span-4">
                  <label for="username" class="block text-sm/6 font-medium text-gray-900"
                    >Category name</label
                  >
                  <div class="mt-2">
                    <div
                      class="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600"
                    >
                      <input
                        type="text"
                        v-model="name"
                        id="username"
                        class="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                        placeholder="Enter category name"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" class="text-sm/6 font-semibold text-gray-900">Cancel</button>
            <button
              @click.prevent="createCategory"
              class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </DefaultLayout>
</template>
