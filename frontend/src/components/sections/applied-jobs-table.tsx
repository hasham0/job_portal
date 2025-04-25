import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/redux/hooks/hooks";
import { CompanyTS, JobsTS } from "@/types";

type Props = {};

const colorObj = {
  accepted: "bg-green-300",
  rejected: "bg-red-300",
  pending: "bg-amber-300",
};
const AppliedJobsTable = ({}: Props) => {
  const { allAppliedJobs } = useAppSelector((state) => state.applicants);
  if (!allAppliedJobs || !allAppliedJobs.length)
    return <span>Your haven't applied for any job</span>;

  return (
    <Table className="border-b-2 border-black [&>*]:text-center">
      <TableCaption>A list of your applied jobs</TableCaption>
      <TableHeader>
        <TableRow className="border-y-2 border-black text-lg [&>*]:text-center">
          <TableHead>Date</TableHead>
          <TableHead>Job Role</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="capitalize">
        {allAppliedJobs.map((appliedJob) => {
          const job = appliedJob?.job as unknown as JobsTS;
          const company = job?.company as unknown as CompanyTS;
          return (
            <TableRow key={appliedJob?._id}>
              <TableCell>
                {appliedJob.createdAt.toString().split("T")[0]}
              </TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>{company?.name}</TableCell>
              <TableCell>
                <Badge
                  className={`${colorObj[appliedJob.status]} p-2 text-black`}
                >
                  {appliedJob?.status}
                </Badge>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default AppliedJobsTable;
