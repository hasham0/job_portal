import axiosInstance from "@/lib/axios";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { setAllJobs } from "@/redux/slice/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import { useEffect } from "react";

const useGetAllJobs = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const response = await axiosInstance.get(`${JOB_API_ENDPOINT}/`, {
          withCredentials: true,
        });
        if (response.data) {
          dispatch(setAllJobs(response.data.jobs));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllJobs();
  }, []);
};

export default useGetAllJobs;
