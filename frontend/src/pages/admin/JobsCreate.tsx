import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import {
  JobCreateSchemaTS,
  jobCreateSchema,
} from "@/schemas/JobCreateZodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import axiosInstance from "@/lib/axios";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { ChangeEvent } from "react";
import { Loader2 } from "lucide-react";
import { setLoading } from "@/redux/slice/jobSlice";

type Props = {};

export default function JobsCreate({}: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { companies } = useAppSelector((state) => state.company);
  const { loading } = useAppSelector((state) => state.job);
  const form = useForm<JobCreateSchemaTS>({
    resolver: zodResolver(jobCreateSchema),
    defaultValues: {
      title: "",
      description: "",
      requirements: "",
      salary: 0,
      location: "",
      jobType: "full-time",
      experience: 0,
      position: 0,
      companyId: "",
    },
  });
  const onSubmit: SubmitHandler<JobCreateSchemaTS> = async (values) => {
    try {
      dispatch(setLoading(true));
      const response = await axiosInstance.post(
        `${JOB_API_ENDPOINT}/postJob`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (response.data) {
        toast.success(response.data.message);
        navigate(`/admin/jobs`);
      }
    } catch (error) {
      console.error(
        "🚀 ~ constonSubmit:SubmitHandler<CompanyCreateSchemaTS>= ~ error:",
        error,
      );
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Company create failed",
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold">Your Job Details</h1>
        <p className="mt-2 text-gray-600">
          What would you like to give your job title? You can change it later.
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 rounded-lg bg-white p-8 shadow-md"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium">Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your job title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium">
                    Location
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter job location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Salary */}
            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium">Salary</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter salary"
                      type="text"
                      {...field}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;
                        const numericValue = value === "" ? "" : Number(value);
                        field.onChange(numericValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Experience */}
            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium">
                    Experience
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Years of experience"
                      type="text"
                      {...field}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;
                        const numericValue = value === "" ? "" : Number(value);
                        field.onChange(numericValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Position */}
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium">
                    Open Positions
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Number of positions"
                      type="text"
                      {...field}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;
                        const numericValue = value === "" ? "" : Number(value);
                        field.onChange(numericValue);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Job Type */}
            <FormField
              control={form.control}
              name="jobType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium">
                    Job Type
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Company ID */}
            <FormField
              control={form.control}
              name="companyId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-medium">Company</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a company" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {(companies?.length ?? 0) <= 0 ? (
                        <SelectItem value="">No Company Found</SelectItem>
                      ) : (
                        companies?.map((company) => (
                          <SelectItem key={company._id} value={company._id}>
                            {company.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">
                  Description
                </FormLabel>
                <FormControl>
                  <Input placeholder="Describe the job role" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Requirements */}
          <FormField
            control={form.control}
            name="requirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">
                  Requirements
                </FormLabel>
                <FormControl>
                  <Input placeholder="List job requirements" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-4">
            <Button
              type="button"
              variant="destructive"
              onClick={() => navigate("/admin/jobs")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-bermuda hover:bg-bermuda/90 w-40"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Continue"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
