import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useCartStore } from './cart';

export const useCouponStore = defineStore('coupon', () => {
  const cart = useCartStore();
  const couponInput = ref('');
  const couponValidationMessage = ref('');
  const discountPercentage = ref(0);
  const discount = ref(0);

  const VALID_COUPONS = [
    { name: '10DESCONTO', discount: 0.1 },
    { name: '20DESCONTO', discount: 0.2 }
  ];

  watch(discountPercentage, () => {
    discount.value = (cart.total * discountPercentage.value).toFixed(2);
  });

  function applyCoupon() {
    if (VALID_COUPONS.some((coupon) => coupon.name === couponInput.value)) {
      couponValidationMessage.value = 'Aplicando...';

      setTimeout(() => {
        discountPercentage.value = VALID_COUPONS.find(
          (coupon) => coupon.name === couponInput.value
        ).discount;

        couponValidationMessage.value = 'Desconto Aplicado!';
      }, 3000);
    } else {
      couponValidationMessage.value = 'Não existe esse cupom!';
    }

    setTimeout(() => {
      couponValidationMessage.value = '';
    }, 6000);
  }

  function $reset() {
    couponInput.value = '';
    couponValidationMessage.value = '';
    discountPercentage.value = 0;
    discount.value = 0;
  }

  const isValidCoupon = computed(() => discountPercentage.value > 0);

  return {
    couponInput,
    discount,
    applyCoupon,
    $reset,
    couponValidationMessage,
    isValidCoupon
  };
});
