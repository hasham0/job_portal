import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { searchSchema, SearchSchemaTS } from "@/schemas/SearchZodSchema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import CompaniesTable from "@/components/admin/companies-table";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { useEffect } from "react";
import { setSerachCompanyByText } from "@/redux/slice/companySlice";

type Props = {};

export default function Companies({}: Props) {
  useGetAllCompanies();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const form = useForm<SearchSchemaTS>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      keyword: "",
    },
  });

  const keyword = form.watch("keyword");
  useEffect(() => {
    dispatch(setSerachCompanyByText(keyword));
  }, [keyword]);

  return (
    <div className="mx-auto my-5 max-w-5xl rounded-2xl border border-gray-200 bg-white">
      <div className="flex w-full flex-col items-center justify-center gap-4 p-8 sm:flex-row sm:justify-between">
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="keyword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Filter by Company Name"
                      type="text"
                      className="focus:border-burmuda m-auto w-[300px] max-w-xl rounded-md border-2 border-gray-300 bg-gray-100 p-5 text-lg focus:outline-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Button
          onClick={() => navigate("/admin/companies/create")}
          className="bg-bermuda max-w-fit rounded-md hover:bg-[#5b38a6]"
          type="button"
        >
          New Company
        </Button>
      </div>
      <CompaniesTable />
    </div>
  );
}
