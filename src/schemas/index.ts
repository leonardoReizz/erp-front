import  { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";

const loginSchema = toTypedSchema(z.object({
  email: z.string({required_error: "Email is required"}).email({message: "Invalid email"}).max(255, {message: "Email must be less than 255 characters"}),
  password: z.string({required_error: "Password is required"}).max(32, {message: "Password must be less than 32 characters"}).optional(),
  provider: z.enum(["EMAIL", "GOOGLE"]),
  providerId: z.string({required_error: "Provider ID is required"}).max(255, {message: "Provider ID must be less than 255 characters"}).optional(),
}));

const registerSchema = toTypedSchema(z.object({ 
  name: z.string().min(3, {message: "Name must be at least 3 characters"}).max(55, {message: "Name must be less than 55 characters"}),
  email: z.string().email({message: "Invalid email"}).max(255, {message: "Email must be less than 255 characters"}),
  password: z.string().max(32, {message: "Password must be less than 32 characters"}),
  confirmPassword: z.string().max(32, {message: "Password must be less than 32 characters"}),
  provider: z.enum(["EMAIL", "GOOGLE"]),
  providerId: z.string({required_error: "Provider ID is required"}).max(255, {message: "Provider ID must be less than 255 characters"}).optional(),
}).superRefine((data, ctx) => {
  console.log(data);
  if(data.provider === "GOOGLE" && data.providerId === "") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["providerId"],
      message: "Provider ID is required"
    });
  }
  if(data.provider === "EMAIL" && data.password.length < 8) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["password"],
      message: "Password must be at least 8 characters"
    });
  }
  if(data.provider === "GOOGLE" && data.password !== "" && data.confirmPassword !== "") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["password"],
      message: "Password is not required"
    });
  }
  if (data.provider === "EMAIL" && data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["confirmPassword"],
      message: "Passwords do not match"
    });
  }
}));

const productSchema = toTypedSchema(z.object({
  name: z.string().min(3, {message: "Name must be at least 3 characters"}).max(55, {message: "Name must be less than 55 characters"}),
  description: z.string().max(255, {message: "Description must be less than 255 characters"}).optional(),
  purchasePrice: z.number().min(0, {message: "Purchase price must be greater than 0"}),
  salePrice: z.number().min(0, {message: "Price must be greater than 0"}),
  categoryId: z.string().min(1, {message: "Category is required"}),
  sku: z.string().optional(),
  stock: z.number().min(0, {message: "Stock must be greater than 0"}),
  tax: z.number().min(0, {message: "Tax must be greater than 0"}),
  discount: z.number().min(0, {message: "Discount must be greater than 0"}),
  discountType: z.enum(["PERCENTAGE", "AMOUNT"]),
  taxType: z.enum(["PERCENTAGE", "AMOUNT"]),
  barcode: z.string().optional(),
  barcodeType: z.enum(["EAN13", "EAN8", "CODE128", "CODE39", "ITF14", "UPC"]),
}));

const contactSchema = toTypedSchema(z.object({
  name: z.string().min(3, {message: "Name must be at least 3 characters"}).max(55, {message: "Name must be less than 55 characters"}),
  fantasyName: z.string().max(255, {message: "Description must be less than 255 characters"}).optional(),
  personType: z.enum(["PHYSICAL", "LEGAL"]).optional(),
  documentType: z.enum(["CPF", "CNPJ"]).optional(),
  cpf: z.string().max(14).optional(),
  cnpj: z.string().max(14).optional(),
  rg: z.string().max(14).optional(),
  contribuitor: z.enum(["1", "2", "9"]).optional(),
  stateRegistration: z.string().max(14).optional(),
  municipalRegistration: z.string().max(14).optional(),
  address: z.string().max(255, {message: "Address must be less than 255 characters"}).optional(),
  addressNumber: z.string().max(255, {message: "Address number must be less than 255 characters"}).optional(),
  contactInfo: z.object({ 
    phone: z.string().max(15).optional(), 
    phoneTwo: z.string().max(15).optional(),
    cellPhone: z.string().max(15).optional(), 
    email: z.string().max(255, {message: "Email must be less than 255 characters"}).optional(), 
    observation: z.string().max(255, {message: "Observation must be less than 255 characters"}).optional(),
  }).optional(),
  addressInfo: z.object({
    address: z.string().max(255, {message: "Address must be less than 255 characters"}).optional(),
    addressNumber: z.string().max(10, {message: "Address number must be less than 10 characters"}).optional(),
    addressComplement: z.string().max(100, {message: "Address complement must be less than 100 characters"}).optional(),
    neighborhood: z.string().max(100, {message: "Neighborhood must be less than 255 characters"}).optional(),
    city: z.string().max(100, {message: "City must be less than 100 characters"}).optional(),
    state: z.string().max(2, {message: "State must be less than 2 characters"}).optional(),
    zipCode: z.string().max(8, {message: "Zip code must be less than 8 characters"}).optional(),
  }).optional(),
  contactType: z.enum(["SUPPLIER", "CLIENT", "TRANSPORT"]),
}));


type ProductSchemaType = typeof productSchema
type LoginSchemaType = typeof loginSchema
type RegisterSchemaType = typeof registerSchema
type ContactSchemaType = typeof contactSchema
export {loginSchema, registerSchema, productSchema, contactSchema, type LoginSchemaType, type RegisterSchemaType, type ProductSchemaType, type ContactSchemaType };
