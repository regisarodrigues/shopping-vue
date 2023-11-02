<script setup>
import { RouterLink } from 'vue-router';
import LinkNav from './LinkNav.vue';
import LogoVue from './LogoVue.vue';
</script>

<template>
  <header class="px-10 py-5 bg-gray-700 flex justify-between absolute top-0 w-full z-10">
    <div>
      <LogoVue />
    </div>

    <nav>
      <RouterLink class="rounded text-white font-bold p-2" :to="{ name: 'products' }">
        Produtos
      </RouterLink>
      <RouterLink class="rounded text-white font-bold p-2" :to="{ name: 'sales' }">
        Vendas
      </RouterLink>
      <LinkNav to="shopping"> Ir à loja </LinkNav>
    </nav>
  </header>
</template>
