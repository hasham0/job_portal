import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { CompanyTS } from "@/types";
type Props = { companies: CompanyTS[] | null };

const CompaniesTable = ({ companies }: Props) => {
  return (
    <>
      <Table className="">
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow className="">
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!companies || companies.length <= 0 ? (
            <TableRow className="text-center text-lg font-bold">
              <TableCell colSpan={4}>No companies found</TableCell>
            </TableRow>
          ) : (
            companies.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo} />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>
                  {
                    (typeof company.createdAt === "string"
                      ? company.createdAt
                      : company.createdAt.toISOString()
                    ).split("T")[0]
                  }
                </TableCell>
                <TableCell className="cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="ml-2" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div className="flex w-fit cursor-pointer items-center gap-2">
                        <Edit2 />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default CompaniesTable;
