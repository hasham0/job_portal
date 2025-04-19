import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { JobsTS } from "@/types";
import daysAgoFunction from "@/utils/day-ago";

type Props = { job: JobsTS };

const Job = ({ job }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="mx-4 rounded-md border-gray-100 bg-white p-5 shadow-xl">
      <div className="flex items-center justify-between">
        <p>
          {daysAgoFunction(new Date(job.createdAt)) === 0
            ? "Today"
            : daysAgoFunction(new Date(job.createdAt)) + " days ago"}
        </p>
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
        <h1 className="my-2 text-lg font-bold">{job.title}</h1>
        <p className="text-sm text-gray-600">{job.description}</p>
      </div>{" "}
      <div className="mt-4 flex items-center gap-2">
        <Badge className="font-bold text-blue-700" variant={"secondary"}>
          {job.position}
        </Badge>
        <Badge className="font-bold text-red-700" variant={"secondary"}>
          {job.jobType}
        </Badge>
        <Badge className="text-bermuda font-bold" variant={"secondary"}>
          {job.salary}
        </Badge>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <Button onClick={() => navigate(`/description/${job._id}`)}>
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
