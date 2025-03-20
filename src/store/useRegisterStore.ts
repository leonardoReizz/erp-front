import { registerSchema, type RegisterSchemaType, } from "@/schemas";
import { defineStore } from "pinia";
import { useForm } from "vee-validate";
import { ref } from "vue";
import { toast } from "vue-sonner";

export const useRegisterStore = defineStore("register", () => {
  const loading = ref(false);
  
  const form = useForm<RegisterSchemaType>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: ""
    },
    validationSchema: registerSchema,
  });

  const handleRegister = form.handleSubmit((values) => {
    try {
      loading.value = true; 
      console.log(values);
    } catch(error) {
      toast.error("Erro ao fazer login");
    } finally {
      loading.value = false;
    }
  });

  return { handleRegister, loading }
});
