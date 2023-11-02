<script setup>
import { ref } from 'vue';
import VueTailwindDatepicker from 'vue-tailwind-datepicker';
import SaleDetails from '../../components/SaleDetails.vue';
import { formatCurrency } from '../../helpers';
import { useSalesStore } from '../../stores/sales';

const sales = useSalesStore();

const formater = ref({
  date: 'DD/MM/YYYY',
  month: 'MMMM'
});
</script>

<template>
  <h1 class="text-4xl font-black my-10">Resumo das Vendas</h1>

  <div class="md:flex md:items-start gap-5">
    <div class="md:w-1/2 lg:w-1/3 bg-white flex justify-center p-5">
      <VueTailwindDatepicker
        i18n="pt-br"
        as-single
        no-input
        v-model="sales.date"
        :formatter="formater"
      />
    </div>

    <div class="md:w-1/2 lg:w-2/3 space-y-5 lg:h-screen lg:overflow-y-scroll p-5 pb-32">
      <p class="text-center text-lg" v-if="sales.isDateSelected">
        Vendas da data: <span class="font-black">{{ sales.date }}</span>
      </p>

      <p class="text-center text-lg" v-else>Selecione uma data!</p>

      <div class="space-y-5" v-if="sales.salesCollection.length">
        <SaleDetails v-for="sale in sales.salesCollection" :key="sale.id" :sale="sale" />

        <p class="text-right text-2xl">
          Total vendido no dia:
          <span class="font-black">{{ formatCurrency(sales.totalSalesOfDay) }}</span>
        </p>
      </div>

      <p class="text-lg text-center" v-else-if="sales.noSales">Não tem vendas nesse dia!</p>
    </div>
  </div>
</template>
