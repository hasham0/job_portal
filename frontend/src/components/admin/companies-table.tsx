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
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useNavigate } from "react-router-dom";

type Props = {};

const CompaniesTable = ({}: Props) => {
  const navigate = useNavigate();

  const { companies, serachCompanyByText } = useAppSelector(
    (state) => state.company,
  );

  const [filterCompany, setFilterCompany] = useState<CompanyTS[] | null>(
    companies,
  );
  useEffect(() => {
    if (!serachCompanyByText) {
      setFilterCompany(companies);
    }
    if (companies && companies.length > 0) {
      const filteredCompanies = companies
        .slice()
        .filter((company) =>
          company.name
            .toLowerCase()
            .includes(serachCompanyByText.toLowerCase()),
        );
      if (filteredCompanies.length <= 0) {
        setFilterCompany(companies);
      }
      setFilterCompany(filteredCompanies);
    }
  }, [companies, serachCompanyByText]);

  return (
    <>
      <Table>
        <TableCaption>A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow className="[&>*]:text-center [&>*]:font-bold">
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
            filterCompany?.map((company) => (
              <TableRow key={company._id} className="[&>*]:text-center">
                <TableCell className="flex items-center justify-center">
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
                      <div
                        onClick={() =>
                          navigate(`/admin/company/${company._id}`)
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
            ))
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default CompaniesTable;
