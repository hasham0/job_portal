import { z } from "zod";

const signUpSchema = z
  .object({
    fullname: z.string().nonempty("Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phoneNumber: z.string().nonempty("Phone number is required"),
    profilePicture: z.custom<File>((file) => file instanceof File, {
      message: "Profile picture must be a valid file",
    }),
    role: z.enum(["student", "recruiter"]),
  })
  .required();

type SignUpSchemaTS = z.infer<typeof signUpSchema>;

export { signUpSchema };
export type { SignUpSchemaTS };
