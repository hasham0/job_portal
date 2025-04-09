import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {};

const Navbar = ({}: Props) => {
  const user = false;
  return (
    <div className="bg-white px-4">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
        <div className="">
          <h1 className="text-2xl font-bold">
            Job <span className="text-[#F83002]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex items-center gap-5 font-medium">
            <li>Home</li>
            <li>Job</li>
            <li>Browse</li>
          </ul>
          {user ? (
            <>
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex gap-4 space-y-2">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div className="">
                      <h4 className="font-medium">Hasham Saleem</h4>
                      <p className="text-muted-foreground text-sm">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Earum voluptatibus nostrum dolore.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between p-4 text-gray-600 md:flex-row">
                    <div className="flex w-fit cursor-pointer items-center gap-2">
                      <Button className="outline-none" variant={"link"}>
                        <User2 />
                        View Profile
                      </Button>
                    </div>
                    <div className="flex w-fit cursor-pointer items-center gap-2">
                      <Button className="outline-none" variant={"default"}>
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
    </div>
  );
};

export default Navbar;
