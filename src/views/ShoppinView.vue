<script setup>
import { storeToRefs } from 'pinia';
import HeaderNav from '../components/HeaderNav.vue';
import ProductCard from '../components/ProductCard.vue';
import ShoppingCard from '../components/ShoppingCard.vue';
import { useProductsStore } from '../stores/products';

const products = useProductsStore();
const { filteredProducts, noResults } = storeToRefs(products);
</script>

<template>
  <HeaderNav />
  <main class="pt-10 lg:flex lg:h-screen lg:overflow-y-hidden">
    <div class="lg:w-2/3 lg:h-screen lg:overflow-y-scroll py-24 px-10">
      <p class="text-center text-4xl" v-if="noResults">Não tem produtos!</p>

      <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5" v-else>
        <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
      </div>
    </div>

    <aside class="lg:w-1/3 lg:h-screen lg:overflow-y-scroll py-24 px-10">
      <ShoppingCard />
    </aside>
  </main>
</template>
