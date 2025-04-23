import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { CompanyTS, JobsTS } from "@/types";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useNavigate } from "react-router-dom";

type Props = {};

const AdminJobsTable = ({}: Props) => {
  const navigate = useNavigate();

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
                      <PopoverContent className="w-32">
                        <div
                          onClick={() =>
                            navigate(`/admin/jobDetails/${job._id}`)
                          }
                          className="flex w-fit cursor-pointer items-center gap-2"
                        >
                          <Edit2 />
                          <span>Edit</span>
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
