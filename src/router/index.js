import { createRouter, createWebHistory } from 'vue-router'

import ProductList from '@/views/Product/ProductList.vue'
import CreateProduct from '@/views/Product/create.vue'
import CategoryList from '@/views/Category/CategoryList.vue'
import CreateCategory from '@/views/Category/create.vue'

const routes = [
  {
    path: '/',
    name: 'eCommerce',
    component: ProductList,
    meta: {
      title: 'Product List'
    }
  },
  {
    path: '/products',
    name: 'products',
    component: ProductList,
    meta: {
      title: 'Products'
    }
  },
  {
    path: '/products/create',
    name: 'product_create',
    component: CreateProduct,
    meta: {
      title: 'Create Products'
    }
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoryList,
    meta: {
      title: 'Categories'
    }
  },
  {
    path: '/categories/create',
    name: 'category_create',
    component: CreateCategory,
    meta: {
      title: 'Create Category'
    }
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = `Vue.js ${to.meta.title} | TailAdmin - Vue.js Tailwind CSS Dashboard Template`
  next()
})

export default router
