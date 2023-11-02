<script setup>
import LinkNav from '../../components/LinkNav.vue';
import ProductItem from '../../components/ProductItem.vue';
import { useProductsStore } from '../../stores/products';

const products = useProductsStore();
</script>

<template>
  <div>
    <LinkNav to="new-product">Novo Produto</LinkNav>
    <h1 class="text-4xl font-black my-10">Produtos</h1>
    <p v-if="products.noResults">Não encontrou produtos</p>

    <ul v-else role="list" class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
      <ProductItem
        v-for="product in products.productsCollection"
        :key="product.id"
        :product="product"
      />
    </ul>
  </div>
</template>
