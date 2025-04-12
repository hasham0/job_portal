import { z } from "zod";

const updateProfileSchema = z
  .object({
    fullname: z.string().nonempty("Full name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().nonempty("Phone number is required"),
    profile: z.object({
      bio: z.string().nonempty("Bio is required"),
      skills: z.string().nonempty("Skills are required"),
      resume: z.custom<File>((file) => file instanceof File, {
        message: "Resume must be a valid file",
      }),
      resumeOriginalName: z.string().optional(),
    }),
    role: z.enum(["student", "recruiter"]),
  })
  .required();

type UpdateProfileSchemaTS = z.infer<typeof updateProfileSchema>;

export { updateProfileSchema };
export type { UpdateProfileSchemaTS };
