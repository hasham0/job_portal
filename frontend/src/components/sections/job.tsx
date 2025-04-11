import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

type Props = {};

const Job = ({}: Props) => {
  const navigate = useNavigate();
  return (
    <div className="mx-4 rounded-md border-gray-100 bg-white p-5 shadow-xl">
      <div className="flex items-center justify-between">
        <p>2 days ago</p>
        <Button className="rounded-full" variant={"ghost"} size={"icon"}>
          <Bookmark />
        </Button>
      </div>
      <div className="my-2 flex items-center gap-2">
        <Button className="p-6" variant={"ghost"} size={"icon"}>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
        </Button>
        <div>
          <h1 className="text-lg font-medium">Company Name</h1>
          <p className="text-sm text-gray-500">Pakistan</p>
        </div>
      </div>
      <div>
        <h1 className="my-2 text-lg font-bold">Title</h1>
        <p className="text-sm text-gray-600">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil ut
          voluptatem porro? Id, harum.
        </p>
      </div>{" "}
      <div className="mt-4 flex items-center gap-2">
        <Badge className="font-bold text-blue-700" variant={"secondary"}>
          12 Positions
        </Badge>
        <Badge className="font-bold text-red-700" variant={"secondary"}>
          Part Time
        </Badge>
        <Badge className="text-bermuda font-bold" variant={"secondary"}>
          24 LPA
        </Badge>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <Button onClick={() => navigate(`/description/${12345}`)}>
          Details
        </Button>
        <Button className="bg-bermuda hover:bg-[#5b38a6]">
          Save Fot Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
