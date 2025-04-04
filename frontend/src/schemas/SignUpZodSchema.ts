import { z } from "zod";

const signUpSchema = z
  .object({
    username: z.string().nonempty("Username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phoneNumber: z.string().nonempty("Phone number is required"),
    role: z.enum(["student", "recruiter"]),
  })
  .required();

type SignUpSchemaTS = z.infer<typeof signUpSchema>;

export { signUpSchema };
export type { SignUpSchemaTS };
