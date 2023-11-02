<script setup>
import { formatCurrency } from '../helpers';
import { useCartStore } from '../stores/cart';

const cart = useCartStore();

defineProps({
  product: {
    type: Object
  }
});
</script>

<template>
  <div class="rounded bg-white shadow relative">
    <img :src="product.image" :alt="'Imagem de ' + product.name" />

    <div class="p-3 space-y-2">
      <h3 class="text-xl font-black text-gray-500">{{ product.name }}</h3>
      <p class="text-gray-500">
        Disponíveis:
        <strong class="font-extrabold text-gray-800">{{ product.availability }}</strong> UNID
      </p>
      <p class="text-2xl font-extrabold text-red-900">{{ formatCurrency(product.price) }}</p>
    </div>

    <button class="absolute top-1 -right-3" type="button" @click="cart.addItem(product)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-8 h-8 bg-red-600 rounded-full text-white"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
    </button>
  </div>
</template>
