import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { setLoading, setUser } from "@/redux/slice/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { Loader2 } from "lucide-react";
import { ChangeEvent } from "react";
import {
  updateProfileSchema,
  UpdateProfileSchemaTS,
} from "@/schemas/UpdateProfileZodSchema";
import axiosInstance from "@/lib/axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UpdateProfileDialog = ({ open, setOpen }: Props) => {
  const dispatch = useAppDispatch();
  const { loading, user } = useAppSelector((state) => state.auth);
  const form = useForm<UpdateProfileSchemaTS>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      fullname: user?.fullname,
      email: user?.email,
      phoneNumber: user?.phoneNumber.toString(),
      role: user?.role,
      profile: {
        bio: user?.profile?.bio,
        skills: user?.profile?.skills?.map((skill) => skill).join(" "),
        resume: undefined,
        resumeOriginalName: user?.profile.resumeOriginalName,
      },
    },
  });
  const onSubmit: SubmitHandler<UpdateProfileSchemaTS> = async (values) => {
    try {
      const formData = new FormData();
      formData.append("fullname", values.fullname);
      formData.append("email", values.email);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("role", values.role);
      formData.append("bio", values.profile.bio);
      formData.append("skills", values.profile.skills);
      formData.append("resume", values.profile.resume);
      dispatch(setLoading(true));

      const response = await axiosInstance.post(
        `${USER_API_ENDPOINT}/profileUpdate`,
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
        dispatch(setUser(response.data.user));
        toast.success(response.data.message, {
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error during sign up:", error);
    } finally {
      dispatch(setLoading(false));
      setOpen(false);
    }
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent onInteractOutside={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold uppercase">
              Update Profile
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="my-2 w-full space-y-4 rounded-md border border-gray-200 p-5"
            >
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
                name="profile.bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your bio"
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
                name="profile.skills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your skills"
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
                name="profile.resume"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Resume
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="application/pdf"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          if (e.target.files && e.target.files[0]) {
                            field.onChange(e.target.files[0]);
                          } else {
                            field.onChange(undefined);
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
                  <Button className="mt-3 w-full" type="submit">
                    Update Profile
                  </Button>
                </>
              )}
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
