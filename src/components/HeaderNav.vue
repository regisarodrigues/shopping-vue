<script setup>
import { useProductsStore } from '../stores/products';
import LinkNav from './LinkNav.vue';
import LogoVue from './LogoVue.vue';

const products = useProductsStore();
</script>

<template>
  <header
    class="px-10 py-5 bg-gray-700 flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between absolute top-0 w-full z-10"
  >
    <div>
      <LogoVue />

      <div class="flex gap-5 text-white">
        <h2 class="text-lg font-extrabold">Categorias:</h2>

        <div
          class="felx items-center gap-2"
          v-for="category in products.categories"
          :key="category.id"
        >
          <input
            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            name="category"
            type="radio"
            :value="category.id"
            :checked="products.selectedCategory === category.id"
            @change="products.selectedCategory = +$event.target.value"
          />
          <label class="text-gray-100 ml-2">{{ category.name }}</label>
        </div>
      </div>
    </div>

    <nav>
      <LinkNav to="sales"> Admin </LinkNav>
    </nav>
  </header>
</template>
