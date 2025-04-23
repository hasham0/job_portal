import { z } from "zod";

const jobCreateSchema = z.object({
  title: z.string().nonempty({
    message: "title is required",
  }),
  description: z.string().nonempty({
    message: "description is required",
  }),
  requirements: z.string().nonempty({
    message: "requirements is required",
  }),
  salary: z.number().min(0, {
    message: "salary must be a positive number",
  }),
  location: z.string().nonempty({
    message: "location is required",
  }),
  jobType: z.enum(["full-time", "part-time", "contract", "internship"], {
    required_error: "Job type is required",
  }),
  experience: z.number().min(0, {
    message: "experience must be a positive number",
  }),
  position: z.number().min(0, {
    message: "positions must be a positive number",
  }),
  companyId: z.string().nonempty({
    message: "companyId is required",
  }),
});

type JobCreateSchemaTS = z.infer<typeof jobCreateSchema>;

export { jobCreateSchema };
export type { JobCreateSchemaTS };
