import { z } from "zod";

const searchSchema = z
  .object({
    keyword: z.string().nonempty({
      message: "Keyword is required",
    }),
  })
  .required();

type SearchSchemaTS = z.infer<typeof searchSchema>;

export { searchSchema };
export type { SearchSchemaTS };
