<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useProductStore } from '@/stores/product.js'
import { onMounted } from 'vue'

let productStore = useProductStore()

onMounted(()=> productStore.getProductList())


</script>

<template>
  <DefaultLayout>
    <div class="bg-white">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 class="text-2xl font-bold tracking-tight text-gray-900">All Products</h2>

        <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          <div v-for="product in productStore.products" :key="product.id" class="group relative">
            <img :src="product.image" :alt="product.name" class="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80" />
            <div class="mt-4 flex justify-between">
              <div>
                <h3 class="text-sm text-gray-700">
                  <a href="javascript:void(0)">
                    <span aria-hidden="true" class="absolute inset-0" />
                    {{ product.name }}
                  </a>
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  <span v-for="(category,i) in product.categories" :key="category.id" class="last:mr-0">
                    {{ i === 0 ? '' : ',' }} {{ category.name }}
                  </span>
                </p>
              </div>
              <p class="text-sm font-medium text-gray-900">
                <a href="javascript:void(0)" @click="editProduct(product.id)">Edit</a> <a href="">Delete</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>
