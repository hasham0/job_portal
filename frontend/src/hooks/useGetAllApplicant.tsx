import axiosInstance from "@/lib/axios";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { setAllApplicants } from "@/redux/slice/applicantsSlice";
import { APPLICANT_API_ENDPOINT } from "@/utils/constant";
import { useEffect } from "react";

type Props = {
  _id: string;
};

const useGetAllApplicants = ({ _id }: Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchAllApplicantsList = async () => {
      try {
        const response = await axiosInstance.get(
          `${APPLICANT_API_ENDPOINT}/applicantsJob/${_id}`,
          {
            withCredentials: true,
          },
        );
        if (response.data) {
          dispatch(setAllApplicants(response.data.jobs.applications));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllApplicantsList();
  }, []);
};

export default useGetAllApplicants;
