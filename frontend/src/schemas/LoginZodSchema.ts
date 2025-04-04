import { z } from "zod";

const loginSchema = z
  .object({
    email: z
      .string()
      .nonempty({
        message: "Email is required",
      })
      .email({
        message: "Invalid email address",
      }),
    password: z.string().nonempty({
      message: "Password is required",
    }),
    role: z.enum(["student", "recruiter"]),
  })
  .required();

type LoginSchemaTS = z.infer<typeof loginSchema>;

export { loginSchema };
export type { LoginSchemaTS };
