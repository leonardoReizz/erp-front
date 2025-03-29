import { get } from "@/services/http/methods";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore("product", () => {
  const products = ref([]);
  const loading = ref(false);  
  const fetchProducts = async () => {

    try {
      loading.value = true;
      const response = await get({url: "/products"});
      products.value = response.data;
    } catch(error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  }


  fetchProducts();
  
  return { products, loading }
})