import axiosInstance from "@/lib/axios";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setKeywordJobs } from "@/redux/slice/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/constant";
import { useEffect } from "react";

const useGetAllJobsByKeyword = () => {
  const dispatch = useAppDispatch();
  const { searchJobQueryByKeyword } = useAppSelector((state) => state.job);
  useEffect(() => {
    const fetchAllJobsByKeyword = async () => {
      try {
        const response = await axiosInstance.get(
          `${JOB_API_ENDPOINT}/?keyword=${searchJobQueryByKeyword}`,
          {
            withCredentials: true,
          },
        );
        if (response.data) {
          dispatch(setKeywordJobs(response.data.jobs));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchAllJobsByKeyword();
  }, []);
};

export default useGetAllJobsByKeyword;
