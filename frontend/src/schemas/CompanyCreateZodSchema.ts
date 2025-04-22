import { z } from "zod";

const companyCreateSchema = z.object({
  name: z.string().nonempty({
    message: "name is required",
  }),
  description: z
    .string()
    .nonempty({
      message: "description is required",
    })
    .optional(),
  website: z
    .string()
    .nonempty({
      message: "website is required",
    })
    .optional(),

  location: z
    .string()
    .nonempty({
      message: "location is required",
    })
    .optional(),

  logo: z
    .custom<File>((file) => file instanceof File, {
      message: "Logo must be a valid file",
    })
    .optional(),

  userId: z
    .string()
    .nonempty({
      message: "userId is required",
    })
    .optional(),
});

type CompanyCreateSchemaTS = z.infer<typeof companyCreateSchema>;

export { companyCreateSchema };
export type { CompanyCreateSchemaTS };
