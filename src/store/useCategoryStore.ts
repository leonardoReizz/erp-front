import { get, post } from "@/services/http/methods";
import { defineStore } from "pinia";
import { useForm } from "vee-validate";
import { ref } from "vue";

export const useCategoryStore = defineStore("category", () => {
  const categories = ref([]);
  const loading = ref(false);  

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      loading.value = true;
      const response = await post({url: "/categories", data: values});
    } catch(error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  });
  
  const fetchProducts = async () => {
    try {
      loading.value = true;
      const response = await get({url: "/categories"});
      categories.value = response.data;
    } catch(error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  }


  fetchProducts();
  
  return { categories, loading, form, handleSubmit }
})