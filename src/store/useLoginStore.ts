import router from "@/router";
import { loginSchema } from "@/schemas";
import { post } from "@/services/http/methods";
import { defineStore } from "pinia";
import { useForm } from "vee-validate";
import { ref } from "vue";
import { toast } from "vue-sonner";
import { decodeCredential } from 'vue3-google-login'
import Cookies from "js-cookie";
export const useLoginStore = defineStore("login", () => {
  const loading = ref(false);
  
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      provider: "EMAIL",
      providerId: "",
    },
    validationSchema: loginSchema,
  });

  const handleLogin = form.handleSubmit(async (values) => {
    try {
      loading.value = true; 
      const response = await post({url: "/authenticate/login", data: values});
      console.log(response)
     if(response.status === 200) {
      toast.success("Login realizado com sucesso");
      Cookies.set("token", `Bearer ${response.data.accessToken}`);
      Cookies.set("refreshToken", `Bearer ${response.data.refreshToken}`);
      router.push("/dashboard");
    }
    form.resetForm();
    } catch(error: any) {
      if(error.response.status === 400) {
        toast.error("Email ou senha invalidos");
        form.setFieldError("email", "Email invalido");
        form.setFieldError("password", "Senha invalida");
      } else {
        toast.error("Erro ao fazer login");
      }
    } finally {
      loading.value = false;
    }
  });


  const handleGoogleLogin = (response: any) => {
    try {
      loading.value = true;
      const userData = decodeCredential(response.credential) as any;
      form.setFieldValue("email", userData.email);
      form.setFieldValue("password", "")
      form.setFieldValue("provider", "GOOGLE");
      form.setFieldValue("providerId", userData.sub);
      handleLogin();
    }catch(error) {
      toast.error("Erro ao fazer login");
    } finally {
      loading.value = false;
    }
  }

  return { handleLogin, loading, handleGoogleLogin }
});
