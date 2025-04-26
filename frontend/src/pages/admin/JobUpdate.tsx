import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  jobCreateSchema,
  JobCreateSchemaTS,
} from "@/schemas/JobCreateZodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setLoading, setUpdateJob } from "@/redux/slice/jobSlice";
import useGetAdminJob from "@/hooks/useGetAdminJob";
import { ArrowLeft, Loader2 } from "lucide-react";
import { JOB_API_ENDPOINT } from "@/utils/constant";

export default function JobUpdate() {
  const { _id } = useParams<{ _id: string }>();
  const navigate = useNavigate();
  const { companies } = useAppSelector((state) => state.company);
  const dispatch = useAppDispatch();
  useGetAdminJob({ _id: _id as string });
  const { singleJobDetails, loading } = useAppSelector((state) => state.job);
  const form = useForm<JobCreateSchemaTS>({
    resolver: zodResolver(jobCreateSchema),
    defaultValues: {
      title: singleJobDetails?.title || "",
      description: singleJobDetails?.description || "",
      location: singleJobDetails?.location || "",
      company:
        typeof singleJobDetails?.company === "string"
          ? singleJobDetails?.company
          : singleJobDetails?.company?._id || "",
      jobType: (["full-time", "part-time", "contract", "internship"].includes(
        singleJobDetails?.jobType,
      )
        ? singleJobDetails?.jobType
        : undefined) as
        | "full-time"
        | "part-time"
        | "contract"
        | "internship"
        | undefined,
      salary: singleJobDetails?.salary || 0,
      experience: singleJobDetails?.experienceLevel || 0,
      position: singleJobDetails?.position || 0,
      requirements: singleJobDetails?.requirements?.join(", ") || "",
    },
  });

  const onSubmit: SubmitHandler<JobCreateSchemaTS> = async (values) => {
    try {
      dispatch(setLoading(true));
      const response = await axiosInstance.put(
        `${JOB_API_ENDPOINT}/updateJob/${_id}`,
        values,
        { withCredentials: true },
      );

      if (response.data) {
        toast.success(response.data.message);
        dispatch(setUpdateJob(response.data.job));
        navigate(-1);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "job Update failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="mx-auto my-8 max-w-4xl p-6">
      <div className="flex items-center gap-2">
        <Button onClick={() => navigate(-1)}>
          <ArrowLeft />
          Back
        </Button>
        <h1 className="ml-auto text-2xl font-bold">Update Job Details</h1>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 space-y-6 rounded-lg border p-6 shadow-sm"
        >
          {/** Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Frontend Developer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/** Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe the job role..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/** Location */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Karachi, Remote" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/** Job Type */}
          <FormField
            control={form.control}
            name="jobType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-medium">Job Type</FormLabel>
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
            name="company"
            render={({ field }) => {
              const selectedCompany = companies?.find(
                (company) => company._id === field.value,
              );
              return (
                <FormItem>
                  <FormLabel className="text-lg font-medium">Company</FormLabel>
                  <FormControl>
                    <Input
                      value={selectedCompany?.name || "Unknown Company"}
                      readOnly
                      disabled
                      className="bg-muted cursor-not-allowed text-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          {/** Salary */}
          <FormField
            control={form.control}
            name="salary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary (PKR)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g. 100000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/** Experience */}
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Experience (Years)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g. 2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/** Position */}
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Open Positions</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g. 5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/** Requirements */}
          <FormField
            control={form.control}
            name="requirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Requirements</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g. React, TypeScript, Tailwind"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Job"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
