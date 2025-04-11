import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";

type Props = {};

export default function JobDescription({}: Props) {
  const { _id } = useParams<{ _id: string | undefined }>();
  const isApplied: boolean = false;
  return (
    <div className="mx-auto my-8 max-w-7xl px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Title</h1>
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
        </div>
        <Button
          disabled={isApplied}
          className={`rounded-lg ${isApplied ? "cursor-not-allowed bg-gray-600" : "hover:bg-bermuda bg-[#7209b7]"}`}
        >
          {isApplied ? "Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="my-4 border-y-2 border-y-gray-400 py-4 text-xl font-medium">
        Job Description
      </h1>
      <div>
        <h2 className="my-1 font-bold">
          Role:
          <span className="pl-4 font-normal text-gray-800">
            {/* {singleJob?.title} */}
          </span>
        </h2>
        <h2 className="my-1 font-bold">
          Location:
          <span className="pl-4 font-normal text-gray-800">
            {/* {singleJob?.location} */}
          </span>
        </h2>
        <h2 className="my-1 font-bold">
          Description:
          <span className="pl-4 font-normal text-gray-800">
            {/* {singleJob?.description} */}
          </span>
        </h2>
        <h2 className="my-1 font-bold">
          Experience:
          <span className="pl-4 font-normal text-gray-800">
            {/* {singleJob?.experience} yrs */}
          </span>
        </h2>
        <h2 className="my-1 font-bold">
          Salary:
          <span className="pl-4 font-normal text-gray-800">
            {/* {singleJob?.salary}LPA */}
          </span>
        </h2>
        <h2 className="my-1 font-bold">
          Total Applicants:
          <span className="pl-4 font-normal text-gray-800">
            {/* {singleJob?.applications?.length} */}
          </span>
        </h2>
        <h2 className="my-1 font-bold">
          Posted Date:
          <span className="pl-4 font-normal text-gray-800">
            {/* {singleJob?.createdAt.split("T")[0]} */}
          </span>
        </h2>
      </div>
    </div>
  );
}
