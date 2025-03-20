import { loginSchema, type LoginSchemaType } from "@/schemas";
import { defineStore } from "pinia";
import { useForm } from "vee-validate";
import { ref } from "vue";
import { toast } from "vue-sonner";

export const useLoginStore = defineStore("login", () => {
  const loading = ref(false);
  
  const form = useForm<LoginSchemaType>({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: loginSchema,
  });

  const handleLogin = form.handleSubmit((values) => {
    try {
      loading.value = true; 
      console.log(values);
    } catch(error) {
      toast.error("Erro ao fazer login");
    } finally {
      loading.value = false;
    }
  });

  return { handleLogin, loading }
});
