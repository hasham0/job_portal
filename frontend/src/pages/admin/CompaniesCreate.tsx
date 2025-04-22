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
  companyCreateSchema,
  CompanyCreateSchemaTS,
} from "@/schemas/CompanyCreateZodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import axiosInstance from "@/lib/axios";
import { COMPANY_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { setSingleCompany } from "@/redux/slice/companySlice";

type Props = {};

export default function CompaniesCreate({}: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useForm<CompanyCreateSchemaTS>({
    resolver: zodResolver(companyCreateSchema),
    defaultValues: {
      name: "",
    },
  });
  const onSubmit: SubmitHandler<CompanyCreateSchemaTS> = async (values) => {
    try {
      const response = await axiosInstance.post(
        `${COMPANY_API_ENDPOINT}/registerCompany`,
        {
          name: values.name,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      if (response.data) {
        dispatch(setSingleCompany(response.data.company));
        toast.success(response.data.message);
        navigate(`/admin/company/${response?.data?.company?._id}`);
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
    }
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center gap-3">
        <h1 className="flex py-2 text-center text-2xl font-bold">
          Your Company Details
        </h1>
        <p>
          What would you like to give your company name? you can change it later
        </p>
      </div>
      <div className="flex flex-col items-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="my-10 w-2/3 space-y-8 rounded-md border border-gray-200 p-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Company Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Company name"
                      type="text"
                      className="h-16"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-6">
              <Button
                type="button"
                variant={"outline"}
                onClick={() => navigate("/admin/companies")}
              >
                Cancel
              </Button>
              <Button type="submit">Continue</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
