import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setUser } from "@/redux/slice/authSlice";
import axiosInstance from "@/lib/axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";

type Props = {};

const Navbar = ({}: Props) => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post(`${USER_API_ENDPOINT}/logout`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        withCredentials: true,
      });
      if (response.data) {
        dispatch(setUser(response.data.user));
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
    <header className="bg-white px-4">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex items-center gap-5 font-medium">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/jobs"}>Jobs</Link>
            </li>
            <li>
              <Link to={"/browse"}>Browse</Link>
            </li>
          </ul>
          {user ? (
            <>
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user.profile.profilePhoto}
                      alt={user.fullname}
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex gap-4 space-y-2">
                    <Avatar>
                      <AvatarImage
                        src={user.profile.profilePhoto}
                        alt={user.fullname}
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user.fullname}</h4>
                      <p className="text-muted-foreground text-sm">
                        {user.profile.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between p-4 text-gray-600 md:flex-row">
                    <div className="flex w-fit cursor-pointer items-center gap-2">
                      <Button
                        onClick={() => navigate("/profile")}
                        className="outline-none"
                        variant={"link"}
                      >
                        <User2 />
                        View Profile
                      </Button>
                    </div>
                    <div className="flex w-fit cursor-pointer items-center gap-2">
                      <Button
                        onClick={handleLogout}
                        className="outline-none"
                        variant={"default"}
                      >
                        <LogOut />
                        Logout
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to={"/login"}>
                <Button variant={"outline"}>Login</Button>
              </Link>
              <Link to={"/signup"}>
                <Button className="bg-bermuda hover:bg-[#5b38a6]">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
