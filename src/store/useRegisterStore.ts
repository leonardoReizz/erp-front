import router from "@/router";
import { registerSchema } from "@/schemas";
import { post } from "@/services/http/methods";
import { defineStore } from "pinia";
import { useForm } from "vee-validate";
import { ref } from "vue";
import { toast } from "vue-sonner";
import { decodeCredential } from "vue3-google-login";

export const useRegisterStore = defineStore("register", () => {
  const loading = ref(false);
  
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      provider: "EMAIL",
      providerId: "",
    },
    validationSchema: registerSchema,
  });

  const handleRegister = form.handleSubmit(async (values) => {
    try {
      loading.value = true; 
      const response = await post({url: "/authenticate/register", data: {
        email: values.email,
        name: values.name,
        password: values.password,
        provider: values.provider,
        providerId: values.providerId,
      }});
      if(response.status === 201) {
        toast.success("Registro realizado com sucesso");
        router.push("/");
      }
      return response
    } catch(error: any) {
      if(error.response.data?.message === "User already exists") {
        toast.error("Email já cadastrado");
        form.setFieldError("email", "Email já cadastrado");
      } else {
        toast.error("Erro ao fazer registro");
      }
    } finally {
      loading.value = false;
    }
  });

  const handleGoogleRegister = async (response: any) => {
    try {
      const userData = decodeCredential(response.credential) as any;
      form.setFieldValue("email", userData.email);
      form.setFieldValue("name", userData.name);
      form.setFieldValue("password", "");
      form.setFieldValue("confirmPassword", "");
      form.setFieldValue("provider", "GOOGLE");
      form.setFieldValue("providerId", userData.sub);

      await handleRegister();
     
    } catch(error) {
      toast.error("Erro ao fazer registro")
    } finally {

      loading.value = false;
      form.resetForm();
    }
  }
  
  return { handleRegister, loading, handleGoogleRegister }
});
