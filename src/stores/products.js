import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  orderBy,
  query,
  updateDoc
} from 'firebase/firestore';
import { deleteObject, ref as storageRef } from 'firebase/storage';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useCollection, useFirebaseStorage, useFirestore } from 'vuefire';

export const useProductsStore = defineStore('products', () => {
  const db = useFirestore();
  const storage = useFirebaseStorage();

  const selectedCategory = ref(1);
  const categories = [
    { id: 1, name: 'Moletom' },
    { id: 2, name: 'Tênis' },
    { id: 3, name: 'Óculos' }
  ];

  const q = query(collection(db, 'products'), orderBy('availability', 'asc'));

  const productsCollection = useCollection(q);

  async function createProduct(product) {
    await addDoc(collection(db, 'products'), product);
  }

  async function updateProduct(docRef, product) {
    const { image, url, ...values } = product;
    if (image.length) {
      await updateDoc(docRef, {
        ...values,
        image: url.value
      });
    } else {
      await updateDoc(docRef, values);
    }
  }

  async function deleteProduct(id) {
    if (confirm('Deletar o Produto?')) {
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      const { image } = docSnap.data();
      const imageRef = storageRef(storage, image);

      await Promise.all([deleteDoc(docRef), deleteObject(imageRef)]);
    }
  }

  const categoryOptions = computed(() => {
    const options = [
      { label: 'Selecione Categoria', value: '', attrs: { disabled: true } },
      ...categories.map((category) => ({ label: category.name, value: category.id }))
    ];
    return options;
  });

  const noResults = computed(() => productsCollection.value.length === 0);

  const filteredProducts = computed(() => {
    return productsCollection.value
      .filter((product) => product.category === selectedCategory.value)
      .filter((product) => product.availability > 0);
  });

  return {
    createProduct,
    updateProduct,
    deleteProduct,
    productsCollection,
    categories,
    selectedCategory,
    filteredProducts,
    categoryOptions,
    noResults
  };
});
