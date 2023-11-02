import { addDoc, collection, doc, runTransaction } from 'firebase/firestore';
import { defineStore } from 'pinia';
import { computed, ref, watchEffect } from 'vue';
import { useFirestore } from 'vuefire';
import { getCurrentDate } from '../helpers';
import { useCouponStore } from './coupons';

export const useCartStore = defineStore('cart', () => {
  const MAX_PRODUCTS = 5;
  const TAX_RATE = 0.1;

  const coupon = useCouponStore();
  const db = useFirestore();

  const items = ref([]);
  const subtotal = ref(0);
  const taxes = ref(0);
  const total = ref(0);

  // watch(items, () => {}, { deep: true });

  watchEffect(() => {
    subtotal.value = items.value.reduce((total, item) => total + item.quantity * item.price, 0);
    taxes.value = Number((subtotal.value * TAX_RATE).toFixed(2));
    total.value = Number((subtotal.value + taxes.value - coupon.discount).toFixed(2));
  });

  function addItem(item) {
    const index = isItemInCart(item.id);

    if (index >= 0) {
      if (isProductAvailsble(item, index)) {
        alert('Alcançou o limite permitido!');
        return;
      }
      items.value[index].quantity++;
    } else {
      items.value.push({ ...item, quantity: 1, id: item.id });
    }
  }

  function updateQuantity(id, quantity) {
    items.value = items.value.map((item) => (item.id === id ? { ...item, quantity } : item));
  }

  function removeItem(id) {
    items.value = items.value.filter((item) => item.id !== id);
  }

  async function checkout() {
    try {
      await addDoc(collection(db, 'sales'), {
        items: items.value.map((item) => {
          // eslint-disable-next-line no-unused-vars
          const { availability, category, ...data } = item;
          return data;
        }),
        subtotal: subtotal.value,
        taxes: taxes.value,
        discount: coupon.discount,
        total: total.value,
        date: getCurrentDate()
      });

      // subtrair a quantidate do disponivel
      items.value.forEach(async (item) => {
        const productRef = doc(db, 'products', item.id);
        await runTransaction(db, async (transaction) => {
          const currentProduct = await transaction.get(productRef);
          const availability = currentProduct.data().availability - item.quantity;
          transaction.update(productRef, { availability });
        });
      });

      // reiniciar o state
      $reset();
      coupon.$reset();
    } catch (error) {
      console.log(error);
    }
  }

  function $reset() {
    items.value = [];
    subtotal.value = 0;
    taxes.value = 0;
    total.value = 0;
  }

  const isItemInCart = (id) => items.value.findIndex((item) => item.id === id);
  const isProductAvailsble = (item, index) => {
    return (
      items.value[index].quantity >= item.availability ||
      items.value[index].quantity >= MAX_PRODUCTS
    );
  };

  const isEmpyt = computed(() => items.value.length === 0);
  const checkProductAvailability = computed(() => {
    return (product) => (product.availability < MAX_PRODUCTS ? product.availability : MAX_PRODUCTS);
  });

  return {
    items,
    subtotal,
    taxes,
    total,
    addItem,
    checkout,
    removeItem,
    checkProductAvailability,
    updateQuantity,
    isEmpyt
  };
});
