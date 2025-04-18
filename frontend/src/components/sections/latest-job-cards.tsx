import { Badge } from "@/components/ui/badge";
import { JobsTS } from "@/types";

type Props = {
  job: JobsTS;
};

const LatestJobCards = ({ job }: Props) => {
  return (
    <div className="cursor-pointer rounded-md border border-gray-200 bg-white p-5 shadow-xl">
      <div>
        <h1 className="text-lg font-medium">Company Name</h1>
        <p className="text-sm text-gray-500">Pakistan</p>
      </div>
      <div>
        <h1 className="my-2 text-lg font-bold">{job.title}</h1>
        <p className="text-sm text-gray-600">{job.description}</p>
      </div>
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
    </div>
  );
};

export default LatestJobCards;
