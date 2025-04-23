import axiosInstance from "@/lib/axios";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { setSingleCompany } from "@/redux/slice/companySlice";
import { COMPANY_API_ENDPOINT } from "@/utils/constant";
import { useEffect } from "react";

type Props = {
  _id: string;
};
const useGetCompanyByID = ({ _id }: Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const response = await axiosInstance.get(
          `${COMPANY_API_ENDPOINT}/currentCompany/${_id}`,
          {
            withCredentials: true,
          },
        );
        if (response.data) {
          dispatch(setSingleCompany(response.data.company));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSingleCompany();
  }, [_id, dispatch]);
};

export default useGetCompanyByID;
