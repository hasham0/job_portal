import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setJobDetails } from "@/redux/slice/jobSlice";
import { ApplicationTS, JobsTS } from "@/types";
import { APPLICANT_API_ENDPOINT, JOB_API_ENDPOINT } from "@/utils/constant";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

type Props = {};

export default function JobDescription({}: Props) {
  const dispatch = useAppDispatch();
  const { _id } = useParams<{ _id: string | undefined }>();
  const { singleJobDetails } = useAppSelector((state) => state.job);
  const { user } = useAppSelector((state) => state.auth);
  const isInitiallyApplied: boolean =
    (singleJobDetails?.applications as ApplicationTS[]).some(
      (application: ApplicationTS) => application.applicant === user?._id,
    ) || false;
  const [applied, setApplied] = useState(isInitiallyApplied);

  const handleApplyJob = async () => {
    try {
      const response = await axiosInstance.post(
        `${APPLICANT_API_ENDPOINT}/applyJob/${_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          withCredentials: true,
        },
      );
      if (response.data) {
        setApplied(true);
        if (!_id) {
          throw new Error("Job ID is undefined");
        }
        const updateJob: JobsTS = {
          ...singleJobDetails,
          applications: [
            ...singleJobDetails?.applications,
            ...(user?._id ? [{ applicant: user._id }] : []),
          ],
        };
        dispatch(setJobDetails(updateJob));
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchJobById = async () => {
      try {
        const response = await axiosInstance.get(
          `${JOB_API_ENDPOINT}/oneJob/${_id}`,
          {
            withCredentials: true,
          },
        );
        if (response.data) {
          dispatch(setJobDetails(response.data.job));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchJobById();
  }, [_id, user]);

  return (
    <div className="mx-auto my-8 max-w-7xl px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{singleJobDetails?.title}</h1>
          <div className="mt-4 flex items-center gap-2">
            <Badge className="font-bold text-blue-700" variant={"secondary"}>
              {singleJobDetails?.position}
            </Badge>
            <Badge className="font-bold text-red-700" variant={"secondary"}>
              {singleJobDetails?.jobType}
            </Badge>
            <Badge className="text-bermuda font-bold" variant={"secondary"}>
              {singleJobDetails?.salary}
            </Badge>
          </div>
        </div>
        <Button
          onClick={!applied ? handleApplyJob : undefined}
          disabled={applied}
          className={`rounded-lg ${applied ? "cursor-not-allowed bg-gray-600" : "hover:bg-bermuda bg-[#7209b7]"}`}
        >
          {applied ? "Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="my-4 border-y-2 border-y-gray-400 py-4 text-xl font-medium">
        {singleJobDetails?.description}
      </h1>
      <div>
        <h2 className="my-1 font-bold">
          Role:
          <span className="pl-4 font-normal text-gray-800">
            {singleJobDetails?.title}
          </span>
        </h2>
        <h2 className="my-1 font-bold">
          Location:
          <span className="pl-4 font-normal text-gray-800">
            {singleJobDetails?.location}
          </span>
        </h2>
        <h2 className="my-1 font-bold">
          Description:
          <span className="pl-4 font-normal text-gray-800">
            {singleJobDetails?.description}
          </span>
        </h2>
        <h2 className="my-1 font-bold">
          Experience:
          <span className="pl-4 font-normal text-gray-800">
            {singleJobDetails?.experienceLevel} yrs
          </span>
        </h2>
        <h2 className="my-1 font-bold">
          Salary:
          <span className="pl-4 font-normal text-gray-800">
            {singleJobDetails?.salary}LPA
          </span>
        </h2>
        <h2 className="my-1 font-bold">
          Total Applicants:
          <span className="pl-4 font-normal text-gray-800">
            {singleJobDetails?.applications?.length}
          </span>
        </h2>
        <h2 className="my-1 font-bold">
          Posted Date:
          <span className="pl-4 font-normal text-gray-800">
            {singleJobDetails?.createdAt.toLocaleString().split("T")[0]}
          </span>
        </h2>
      </div>
    </div>
  );
}
