import { contactSchema } from "@/schemas";
import { post } from "@/services/http/methods";
import { defineStore } from "pinia";
import { useForm } from "vee-validate";
import { ref } from "vue";

export const useCreateContactStore = defineStore("createContact", () => {
  const loading = ref(false);  

  const form = useForm({
    initialValues: {
      name: "",
      fantasyName: "",
      personType: "PHYSICAL",
      rg: "",
      cpf: "",
      cnpj: "",
      stateRegistration: "",
      municipalRegistration: "",
      addressInfo: {
        address: "",
        addressNumber: "",
        addressComplement: "",
        neighborhood: "",
        city: "",
        state: "",
        zipCode: "",
      },
      contactInfo: {
        phone: "",
        phoneTwo: "",
        cellPhone: "",
        email: "",
        observation: "",
      },
      contactType: "CLIENT",
    },
    validationSchema: contactSchema,
  });

  console.log(form.errors);

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      loading.value = true;
      const hasAddressInfo = Object.values(values?.addressInfo || {}).some(value => value !== "");
      const hasContactInfo = Object.values(values?.contactInfo || {}).some(value => value !== "");
      const data = {
        ...values,
        addressInfo: hasAddressInfo ? values.addressInfo : undefined,
        contactInfo: hasContactInfo ? values.contactInfo : undefined
      };

    
      const response = await post({url: "/contact", data});
      console.log(response);
    } catch(error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  });
  
  return { loading, form, handleSubmit }
})