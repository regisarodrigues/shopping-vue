<script setup>
import { formatCurrency } from '../helpers';
import { useCartStore } from '../stores/cart';
import { useCouponStore } from '../stores/coupons';
import AmountComponent from './AmountComponent.vue';
import CouponForm from './CouponForm.vue';
import ShoppingCardItem from './ShoppingCardItem.vue';

const cart = useCartStore();
const coupon = useCouponStore();
</script>
<template>
  <p class="text-center text-xl text-gray-900" v-if="cart.isEmpyt">Carrinho vazio!</p>

  <div v-else>
    <p class="text-4xl font-bold text-gray-900">Resumo das Compras</p>
    <ul class="mt-6 divide-y divide-gray-200" role="list">
      <ShoppingCardItem v-for="item in cart.items" :key="item.id" :item="item" />
    </ul>

    <dl class="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
      <AmountComponent>
        <template #label>Subtotal:</template>
        {{ formatCurrency(cart.subtotal) }}
      </AmountComponent>

      <AmountComponent>
        <template #label>Impostos:</template>
        {{ formatCurrency(cart.taxes) }}
      </AmountComponent>

      <AmountComponent v-if="coupon.isValidCoupon">
        <template #label>Desconto:</template>
        {{ formatCurrency(coupon.discount) }}
      </AmountComponent>

      <AmountComponent>
        <template #label>Total à pagar:</template>
        {{ formatCurrency(cart.total) }}
      </AmountComponent>
    </dl>

    <CouponForm />

    <button
      type="button"
      class="mt-10 w-full bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold p-3"
      @click="cart.checkout"
    >
      Confirmar Compra
    </button>
  </div>
</template>
