import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit2, MoreHorizontal, Trash2, UserCheck } from "lucide-react";
import { CompanyTS, JobsTS } from "@/types";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/lib/axios";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { setRemoveJob } from "@/redux/slice/jobSlice";

type Props = {};

const AdminJobsTable = ({}: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { allAdminJobs, serachJobByText } = useAppSelector(
    (state) => state.job,
  );

  const [filterJob, setFilterJob] = useState<JobsTS[] | null>(allAdminJobs);
  useEffect(() => {
    if (!serachJobByText) {
      setFilterJob(allAdminJobs);
    }
    if (allAdminJobs && allAdminJobs.length > 0) {
      const filteredJobs = allAdminJobs.slice().filter((job) => {
        const company = job.company as unknown as CompanyTS;
        return (
          job?.title?.toLowerCase().includes(serachJobByText.toLowerCase()) ||
          company?.name?.toLowerCase().includes(serachJobByText.toLowerCase())
        );
      });
      if (filteredJobs.length <= 0) {
        setFilterJob(allAdminJobs);
      }
      setFilterJob(filteredJobs);
    }
  }, [allAdminJobs, serachJobByText]);

  const hanldeDeleteJob = async (_id: string) => {
    try {
      const response = await axiosInstance.delete(
        `${JOB_API_ENDPOINT}/deleteJob/${_id}`,
        {
          withCredentials: true,
        },
      );
      if (response.data) {
        dispatch(setRemoveJob(_id));
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("🚀 ~ handleStatusChange ~ error:", error);

      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || error.message || "job delete failed",
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <>
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow className="[&>*]:text-center [&>*]:font-bold">
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!allAdminJobs || allAdminJobs.length <= 0 ? (
            <TableRow className="text-center text-lg font-bold">
              <TableCell colSpan={4}>No jobs found</TableCell>
            </TableRow>
          ) : (
            filterJob?.map((job) => {
              const company = job.company as unknown as CompanyTS;
              return (
                <TableRow key={job._id} className="[&>*]:text-center">
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{job.title}</TableCell>

                  <TableCell>
                    {typeof job.createdAt === "string"
                      ? job.createdAt.split("T")[0]
                      : job.createdAt.toISOString().split("T")[0]}
                  </TableCell>
                  <TableCell className="cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal className="ml-2" />
                      </PopoverTrigger>
                      <PopoverContent className="flex w-fit items-center justify-center gap-3 rounded-lg border-2 border-gray-300 bg-white p-2 shadow-md">
                        <div
                          onClick={() =>
                            navigate(`/admin/jobDetails/${job._id}`)
                          }
                          className="flex w-full cursor-pointer items-center justify-evenly gap-2 rounded-lg bg-gray-400 p-2 hover:bg-gray-300 hover:text-white"
                        >
                          <Edit2 size={15} />
                        </div>
                        <div
                          onClick={() =>
                            navigate(`/admin/jobDetails/${job._id}/applicants`)
                          }
                          className="flex w-full cursor-pointer items-center justify-evenly gap-2 rounded-lg bg-blue-400 p-2 hover:bg-blue-300 hover:text-white"
                        >
                          <UserCheck size={15} />
                        </div>
                        <div
                          onClick={() => hanldeDeleteJob(job._id)}
                          className="flex w-full cursor-pointer items-center justify-evenly gap-2 rounded-lg bg-red-400 p-2 hover:bg-red-300 hover:text-white"
                        >
                          <Trash2 size={15} />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default AdminJobsTable;
