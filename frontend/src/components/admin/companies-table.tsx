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
import { Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import { CompanyTS } from "@/types";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_ENDPOINT } from "@/utils/constant";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { setRemoveCompany } from "@/redux/slice/companySlice";

type Props = {};

const CompaniesTable = ({}: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  const handleDeleteCompany = async (_id: string) => {
    try {
      const response = await axiosInstance.delete(
        `${COMPANY_API_ENDPOINT}/deleteCompany/${_id}`,
        {
          withCredentials: true,
        },
      );
      if (response.data) {
        dispatch(setRemoveCompany(_id));
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error("🚀 ~ handleStatusChange ~ error:", error);

      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "company delete failed",
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

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
                    <PopoverContent className="flex w-fit items-center justify-center gap-3 rounded-lg border-2 border-gray-300 bg-white p-2 shadow-md">
                      <div
                        onClick={() =>
                          navigate(`/admin/company/${company._id}`)
                        }
                        className="flex w-full cursor-pointer items-center justify-evenly gap-2 rounded-lg bg-gray-400 p-2 hover:bg-gray-300 hover:text-white"
                      >
                        <Edit2 size={15} />
                      </div>
                      <div
                        onClick={() => handleDeleteCompany(company._id)}
                        className="flex w-full cursor-pointer items-center justify-evenly gap-2 rounded-lg bg-red-400 p-2 hover:bg-red-300 hover:text-white"
                      >
                        <Trash2 size={15} />
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
