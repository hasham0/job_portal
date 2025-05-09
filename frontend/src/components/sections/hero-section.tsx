import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema, SearchSchemaTS } from "@/schemas/SearchZodSchema";
import { Search } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { setSearchJobQueryByKeyword } from "@/redux/slice/jobSlice";
import { useNavigate } from "react-router-dom";

type Props = {};

const HeroSection = ({}: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useForm<SearchSchemaTS>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      keyword: "",
    },
  });
  const onSubmit: SubmitHandler<SearchSchemaTS> = (data) => {
    dispatch(setSearchJobQueryByKeyword(data.keyword));
    navigate("/browse");
  };

  return (
    <div className="text-center">
      <div className="my-8 flex flex-col gap-5">
        <span className="mx-auto rounded-full bg-gray-100 px-4 py-2 font-medium text-[#F83002]">
          No 1 Job Hunt Plateform
        </span>
        <h1 className="text-4xl font-bold">
          Search, Apply & <br />
          Get Your <span className="text-bermuda">Dream Job</span>
        </h1>
        <p>
          "Empowering your journey from ambition to achievement—search, apply,
          and launch your career."
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center justify-center gap-x-2"
        >
          <FormField
            control={form.control}
            name="keyword"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter your keyword"
                    type="text"
                    className="focus:border-burmuda m-auto w-[400px] max-w-2xl rounded-md border-2 border-gray-300 bg-gray-100 px-4 py-2 text-lg focus:outline-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="bg-bermuda rounded-md hover:bg-[#5b38a6]"
            type="submit"
          >
            <Search className="size-5" />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default HeroSection;
