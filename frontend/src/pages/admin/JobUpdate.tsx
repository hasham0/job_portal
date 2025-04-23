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
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setLoading, setSingleCompany } from "@/redux/slice/companySlice";

import { useParams } from "react-router-dom";
import { ChangeEvent } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import useGetCompanyByID from "@/hooks/useGetCompanyById";

type Props = {};

export default function JobUpdate({}: Props) {
  const { _id } = useParams<{ _id: string | undefined }>();
  useGetCompanyByID({ _id: _id as string });
  const navigate = useNavigate();
  const { singleCompany, loading } = useAppSelector((state) => state.company);
  const dispatch = useAppDispatch();
  const form = useForm<CompanyCreateSchemaTS>({
    resolver: zodResolver(companyCreateSchema),
    defaultValues: {
      name: singleCompany?.name,
      description: singleCompany?.description || "",
      location: singleCompany?.location || "",
      logo: undefined,
      website: singleCompany?.website || "",
    },
  });
  const onSubmit: SubmitHandler<CompanyCreateSchemaTS> = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description || "");
      formData.append("website", values.website || "");
      formData.append("location", values.location || "");
      if (values.logo) {
        formData.append("file", values.logo as File);
      }
      dispatch(setLoading(true));

      const response = await axiosInstance.put(
        `${COMPANY_API_ENDPOINT}/updateCompanyDetails/${_id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data) {
        dispatch(setSingleCompany(response.data.company));
        toast.success(response.data.message);
        navigate(-1);
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
    <div className="mx-auto my-8 flex max-w-4xl flex-col">
      <div className="flex items-center px-6">
        <Button className="w-fit" onClick={() => navigate(-1)}>
          <ArrowLeft />
          back
        </Button>
        <div className="flex w-full flex-col items-center justify-center text-center">
          <h1 className="py-2 text-center text-2xl font-bold">
            Your Company Details
          </h1>
          <p>Add your company details here</p>
        </div>
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      type="text"
                      className="font-bold"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your description"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>website</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your website url"
                      type="url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your location"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">Logo </FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const reader = new FileReader();
                        if (e.target.files && e.target.files[0]) {
                          const file = e.target.files[0];
                          reader.onloadend = () => {
                            field.onChange(file);
                          };
                          reader.readAsDataURL(file);
                        } else {
                          field.onChange("");
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {loading ? (
              <>
                <Button className="w-full" type="submit">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Please wait...</span>
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="bg-bermuda hover:bg-bermuda/90 w-full"
                  type="submit"
                >
                  Update
                </Button>
              </>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
