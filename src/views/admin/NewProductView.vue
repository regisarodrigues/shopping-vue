<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import LinkNav from '../../components/LinkNav.vue';
import useImage from '../../composables/useImage';
import { useProductsStore } from '../../stores/products';

const { url, onFileChange, isImageUploaded } = useImage();
const products = useProductsStore();
const router = useRouter();

const formData = reactive({
  name: '',
  category: '',
  price: '',
  availability: '',
  image: ''
});

const submitHandler = async (data) => {
  const { ...values } = data;

  try {
    await products.createProduct({
      ...values,
      image: url.value
    });
    router.push({ name: 'products' });
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div>
    <LinkNav to="products"> Voltar </LinkNav>

    <h1 class="text-4xl font-black my-10">Novo Produto</h1>

    <div class="flex justify-center bg-white shadow">
      <div class="mt-10 p-10 w-full 2xl:w-2/4">
        <FormKit
          type="form"
          submit-label="Salvar Produto"
          incomplete-message="Você não pode salvar, por favor revise as mensagens"
          @submit="submitHandler"
          :value="formData"
        >
          <FormKit
            type="text"
            label="Nome"
            name="name"
            placeholder="Nome do produto"
            validation="required"
            :validation-messages="{ required: 'O nome do produto é obrigatória' }"
            v-model.trim="formData.name"
          />

          <FormKit
            type="file"
            label="Imagem"
            name="image"
            validation="required"
            :validation-messages="{ required: 'A imagem do produto é obrigatória' }"
            accept=".jpg"
            @change="onFileChange"
            v-model.trim="formData.image"
          />

          <div v-if="isImageUploaded">
            <p class="font-black">Imagem do Produto</p>
            <img class="w-32" :src="url" alt="Imagem do produto" />
          </div>

          <FormKit
            type="select"
            label="Categoria"
            name="category"
            validation="required"
            :validation-messages="{ required: 'A categoria é obrigatória' }"
            :options="products.categoryOptions"
            v-model.number="formData.category"
          />

          <FormKit
            type="number"
            label="Preço"
            name="price"
            placeholder="Preço do produto"
            validation="required"
            :validation-messages="{ required: 'O preço é obrigatório' }"
            min="1"
            v-model.number="formData.price"
          />

          <FormKit
            type="number"
            label="Quantidade"
            name="availability"
            placeholder="Quantidade disponível"
            validation="required"
            :validation-messages="{ required: 'A quantidade é obrigatória' }"
            min="1"
            v-model.number="formData.availability"
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>
