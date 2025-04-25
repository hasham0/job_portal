import axiosInstance from "@/lib/axios";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { setAllAdminJobs, setJobDetails } from "@/redux/slice/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import { useEffect } from "react";

type Props = {
  _id: string;
};

const useGetAdminJob = ({ _id }: Props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const response = await axiosInstance.get(
          `${JOB_API_ENDPOINT}/oneJob/${_id}`,
          {
            withCredentials: true,
          },
        );
        if (response.data) {
          dispatch(setJobDetails(response.data.job));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchSingleJob();
  }, [_id]);
};

export default useGetAdminJob;
