<script setup>
import { useCouponStore } from '../stores/coupons';

const store = useCouponStore();
</script>

<template>
  <p class="mt-5 py-5 font-bold border-t border-gray-200">Incluir Cupom?</p>
  <div class="flex">
    <input
      class="p-2 bg-white border-gray-300 w-full"
      type="text"
      placeholder="Inserir cupom... "
      v-model="store.couponInput"
    />
    <button
      class="p-3 bg-green-400 font-bold disabled:opacity-30"
      type="button"
      @click="store.applyCoupon"
      :disabled="store.isValidCoupon"
    >
      Resgatar cupom
    </button>
  </div>

  <p class="py-2 text-center text-sm font-extrabold text-red-400">
    {{ store.couponValidationMessage }}
  </p>
</template>
