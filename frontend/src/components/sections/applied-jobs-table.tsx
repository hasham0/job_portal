import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";

type Props = {};

const colorObj = {
  selected: "bg-green-400",
  rejected: "bg-red-400",
  pending: "bg-amber-400",
};
const AppliedJobsTable = ({}: Props) => {
  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead className="w-[100px]">Job Role</TableHead>
            <TableHead className="w-[100px]">Company</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[1, 2, 4, 5].map((item: number, index) => (
            <TableRow key={index}>
              <TableCell>15-07-2023</TableCell>
              <TableCell>full stack</TableCell>
              <TableCell>meta</TableCell>
              <TableCell>
                <Badge className={`${colorObj["selected"]}`}>Selected</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobsTable;
