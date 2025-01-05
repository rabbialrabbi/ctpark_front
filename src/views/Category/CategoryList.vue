<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useProductStore } from '@/stores/product.js'
import { onMounted } from 'vue'

let productStore = useProductStore()

onMounted(()=> productStore.getCategoryList())


</script>

<template>
  <DefaultLayout>
    <div class="bg-white">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">All Category</h2>

        <ul role="list" class="divide-y divide-gray-100 sm:py-6">
          <li v-for="category in productStore.categories" :key="category.id" class="flex justify-between gap-x-6 py-5">
            <div class="flex min-w-0 gap-x-4">
              <div class="min-w-0 flex-auto">
                <p class="text-sm/6 font-semibold text-gray-900">{{ category.name }}</p>
              </div>
            </div>
            <div class="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p class="text-sm/6 text-gray-900"></p>
            </div>
          </li>
        </ul>
      </div>
    </div>


  </DefaultLayout>
</template>
