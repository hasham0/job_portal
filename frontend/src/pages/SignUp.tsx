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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpSchemaTS } from "@/schemas/SignUpZodSchema";
import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent } from "react";
import axiosInstance from "@/lib/axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";

type Props = {};

export default function SignUp({}: Props) {
  const navigate = useNavigate();
  const form = useForm<SignUpSchemaTS>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      phoneNumber: "",
      role: "student",
      profilePicture: undefined,
    },
  });

  const onSubmit: SubmitHandler<SignUpSchemaTS> = async (values) => {
    try {
      const formData = new FormData();
      formData.append("fullname", values.fullname);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("role", values.role);
      formData.append("file", values.profilePicture);
      const response = await axiosInstance.post(
        `${USER_API_ENDPOINT}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          method: "POST",
          withCredentials: true,
        },
      );
      if (response.data) {
        toast.success(response.data.message, {
          duration: 3000,
        });
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  return (
    <div className="mx-auto flex max-w-7xl items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="my-10 w-1/2 space-y-8 rounded-md border border-gray-200 p-5"
        >
          <h1 className="upp mb-5 text-center text-xl font-bold">Sign Up</h1>
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
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
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your phone number"
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
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col gap-12 space-y-1 md:flex-row"
                  >
                    <FormItem className="flex items-center space-y-0 space-x-1">
                      <FormControl className="cursor-pointer">
                        <RadioGroupItem value="student" />
                      </FormControl>
                      <FormLabel className="cursor-pointer font-normal">
                        Student
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-y-0 space-x-1">
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
          <FormField
            control={form.control}
            name="profilePicture"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">
                  Profile Picture
                </FormLabel>
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
          <Button className="w-full" type="submit">
            Sign Up
          </Button>
          <span className="-mt- flex justify-center space-x-2 text-base">
            <p>Already have an account?</p>
            <Link to="/login" className="text-blue-500 hover:underline">
              LogIn
            </Link>
          </span>
        </form>
      </Form>
    </div>
  );
}
