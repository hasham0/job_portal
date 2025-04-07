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
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchemaTS, loginSchema } from "@/schemas/LoginZodSchema";
import { Link, useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/constant";

type Props = {};

export default function Login({}: Props) {
  const navigate = useNavigate();
  const form = useForm<LoginSchemaTS>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "student",
    },
  });

  const onSubmit: SubmitHandler<LoginSchemaTS> = async (values) => {
    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("role", values.role);

      const response = await axiosInstance.post(
        `${USER_API_ENDPOINT}/login`,
        formData,
        {
          withCredentials: true,
        },
      );
      if (response.data) {
        toast.success(response.data.message, {
          duration: 3000,
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="mx-auto flex max-w-7xl items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="my-10 w-1/2 space-y-8 rounded-md border border-gray-200 p-5"
        >
          <h1 className="upp mb-5 text-center text-xl font-bold">Log In</h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1 md:flex-row"
                  >
                    <FormItem className="flex items-center space-y-0 space-x-3">
                      <FormControl className="cursor-pointer">
                        <RadioGroupItem value="student" />
                      </FormControl>
                      <FormLabel className="cursor-pointer font-normal">
                        Student
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-y-0 space-x-3">
                      <FormControl className="cursor-pointer">
                        <RadioGroupItem value="recruiter" />
                      </FormControl>
                      <FormLabel className="cursor-pointer font-normal">
                        Recruiter
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Sign Up
          </Button>
          <span className="-mt-3 flex justify-center space-x-2 text-base">
            <p>Don't have an account?</p>
            <Link to="/signup" className="text-blue-500 hover:underline">
              SignUp
            </Link>
          </span>
        </form>
      </Form>
    </div>
  );
}
