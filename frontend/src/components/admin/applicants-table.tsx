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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { Link } from "react-router-dom";
import { UserTS } from "@/types";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { APPLICANT_API_ENDPOINT } from "@/utils/constant";
import axiosInstance from "@/lib/axios";
import { setUpdateApplicant } from "@/redux/slice/applicantsSlice";

type Props = {};

const shortListStatus: string[] = ["pending", "accepted", "rejected"];
const colorMap: Record<string, string> = {
  pending: "bg-amber-500 focus:bg-amber-300",
  accepted: "bg-green-500 focus:bg-green-300",
  rejected: "bg-red-500 focus:bg-red-303",
};

const ApplicantsTable = ({}: Props) => {
  const dispatch = useAppDispatch();
  const { allApplicants } = useAppSelector((state) => state.applicants);

  const handleStatusChange = async (status: string, _id: string) => {
    try {
      const response = await axiosInstance.put(
        `${APPLICANT_API_ENDPOINT}/updateStatus/${_id}`,
        { status },
        {
          withCredentials: true,
        },
      );
      if (response.data) {
        dispatch(setUpdateApplicant(response.data.data));
        toast.success(response.data.message);
        // navigate("/");
      }
    } catch (error) {
      console.error("🚀 ~ handleStatusChange ~ error:", error);

      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message || error.message || "status failed",
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <Table className="my-5">
      <TableCaption>
        A list of applicants for the job position. This table is sortable and
        filterable.
      </TableCaption>
      <TableHeader>
        <TableRow className="[&>*]:text-center [&>*]:font-bold">
          <TableHead>FullName</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Resume</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {allApplicants.length > 0 ? (
          allApplicants.map((applications) => {
            const applicant = applications.applicant as unknown as UserTS;
            return (
              <TableRow className="[&>*]:text-center" key={applications._id}>
                <TableCell>{applicant.fullname}</TableCell>
                <TableCell>{applicant.email}</TableCell>
                <TableCell>{applicant.phoneNumber}</TableCell>
                <TableCell className="text-blue-500 underline underline-offset-3">
                  <Link to={applicant?.profile?.resume || "#"} target="_blank">
                    {applicant?.profile?.resumeOriginalName ||
                      "No resume found"}
                  </Link>
                  r
                </TableCell>
                <TableCell>
                  {typeof applications.createdAt === "string"
                    ? applications.createdAt.split("T")[0]
                    : applications.createdAt.toISOString().split("T")[0]}
                </TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="ml-2" />
                    </PopoverTrigger>
                    <PopoverContent className="w-36">
                      <Select
                        defaultValue={applications.status}
                        onValueChange={(status) =>
                          handleStatusChange(status, applications._id)
                        }
                      >
                        <SelectTrigger
                          className={`text-white ${colorMap[applications.status].toString()} `}
                        >
                          <SelectValue placeholder={applications.status} />
                        </SelectTrigger>
                        <SelectContent>
                          {shortListStatus.map((status, index) => (
                            <SelectItem
                              className={`${colorMap[status].toString()} my-1`}
                              key={index}
                              value={status}
                            >
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              No applicants found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ApplicantsTable;
