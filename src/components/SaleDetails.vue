<script setup>
import { formatCurrency } from '../helpers';
import AmountComponent from './AmountComponent.vue';

defineProps({
  sale: {
    type: Object
  }
});
</script>

<template>
  <div class="border-t border-gray-200 space-y-6 py-6">
    <h2 class="text-2xl font-black">Detalhe da Venda:</h2>
    <p class="text-xl font-black text-gray-500">Produtos Vendidos</p>

    <ul
      rele="list"
      class="mt-6 divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500"
    >
      <li class="flex space-x-6 py-6" v-for="item in sale.items" :key="item.id">
        <img
          class="h-24 w-24 flex-none rounded-lg"
          :src="item.image"
          :alt="'Imagem de ' + item.name"
        />

        <div class="flex-auto space-y-2">
          <h3 class="text-gray-900">{{ item.name }}</h3>
          <p>{{ formatCurrency(item.price) }}</p>
          <p>Quantidade: {{ item.quantity }}</p>
        </div>
      </li>
    </ul>

    <dl class="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
      <AmountComponent>
        <template #label>Subtotal:</template>
        {{ formatCurrency(sale.subtotal) }}
      </AmountComponent>

      <AmountComponent>
        <template #label>Impostos:</template>
        {{ formatCurrency(sale.taxes) }}
      </AmountComponent>

      <AmountComponent class="bg-green-200" v-if="sale.discount">
        <template #label>Desconto:</template>
        {{ formatCurrency(sale.discount) }}
      </AmountComponent>

      <AmountComponent>
        <template #label>Total Pago:</template>
        {{ formatCurrency(sale.total) }}
      </AmountComponent>
    </dl>
  </div>
</template>
