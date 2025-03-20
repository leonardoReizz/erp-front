import  { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

const registerSchema = z.object({ 
  name: z.string().min(3, {message: "Name must be at least 3 characters"}).max(55, {message: "Name must be less than 55 characters"}),
  email: z.string().email({message: "Invalid email"}).max(255, {message: "Email must be less than 255 characters"}),
  password: z.string().min(8, {message: "Password must be at least 8 characters"}).max(32, {message: "Password must be less than 32 characters"}),
  confirmPassword: z.string().min(8, {message: "Password must be at least 8 characters"}).max(32, {message: "Password must be less than 32 characters"}),
}).superRefine((data, ctx) => {
  if (data.password !== data.confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Passwords do not match"
    });
  }
})  ;

type LoginSchemaType = z.infer<typeof loginSchema>;
type RegisterSchemaType = z.infer<typeof registerSchema>;

export {loginSchema, type LoginSchemaType, registerSchema, type RegisterSchemaType};
