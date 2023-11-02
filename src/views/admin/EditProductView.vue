<script setup>
import { doc } from 'firebase/firestore';
import { reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDocument, useFirestore } from 'vuefire';
import LinkNav from '../../components/LinkNav.vue';
import useImage from '../../composables/useImage';
import { useProductsStore } from '../../stores/products';

// consultar Firestore
const route = useRoute();
const router = useRouter();
const db = useFirestore();
const docRef = doc(db, 'products', route.params.id);
const product = useDocument(docRef);

const { url, onFileChange, isImageUploaded } = useImage();
const products = useProductsStore();

const formData = reactive({
  name: '',
  category: '',
  price: '',
  availability: '',
  image: ''
});

watch(product, (product) => {
  if (!product) {
    router.push({ name: 'products' });
  }
  Object.assign(formData, product);
});

const submitHandler = async (data) => {
  try {
    await products.updateProduct(docRef, { ...data, url });
    router.push({ name: 'products' });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="mt-10">
    <LinkNav to="products"> Voltar </LinkNav>
    <h1 class="text-4xl my-10 font-extrabold">Editar Produto</h1>

    <div class="flex justify-center bg-white shadow">
      <div class="mx-auto mt-10 p-10 w-full 2xl:w-2/4">
        <FormKit
          type="form"
          :value="formData"
          submit-label="Alterar Produto"
          incomplete-message="Você não pode salvar, por favor revise as mensagens"
          @submit="submitHandler"
          :actions="false"
        >
          <FormKit
            type="text"
            label="Nombre"
            name="name"
            placeholder="Nome do produto"
            validation="required"
            v-model.trim="formData.name"
            :validation-messages="{ required: 'O nome do produto é obrigatória' }"
          />

          <FormKit
            type="select"
            label="Categoria"
            name="category"
            validation="required"
            v-model.number="formData.category"
            :validation-messages="{ required: 'A categoria é obrigatória' }"
            :options="products.categoryOptions"
          />

          <FormKit
            type="number"
            label="Preço"
            name="price"
            placeholder="Preço do Produto"
            step="1"
            min="1"
            v-model.number="formData.price"
          />

          <FormKit
            type="number"
            label="Quantidade"
            name="availability"
            placeholder="Quantidade disponível"
            v-model.number="formData.availability"
            step="1"
            min="0"
          />

          <div v-if="isImageUploaded">
            <p class="font-black">Nova Imagem:</p>
            <img :src="url" alt="Nova imagem do produto" class="w-52" />
          </div>

          <div v-else>
            <p class="font-black">Imagem Atual:</p>
            <img :src="formData.image" :alt="'Imagen de' + formData.image" class="w-52" />
          </div>

          <FormKit
            type="file"
            label="Trocar Imagem"
            name="image"
            multiple="false"
            accept=".jpg"
            @change="onFileChange"
          />

          <FormKit type="submit">Salvar Alteração</FormKit>
        </FormKit>
      </div>
    </div>
  </div>
</template>
