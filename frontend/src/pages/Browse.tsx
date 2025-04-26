import Job from "@/components/sections/job";
import useGetAllJobsByKeyword from "@/hooks/useGetAllJobsByKeyword";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setSearchJobQueryByKeyword } from "@/redux/slice/jobSlice";
import { useEffect } from "react";

type Props = {};

export default function Browse({}: Props) {
  useGetAllJobsByKeyword();
  const dispatch = useAppDispatch();
  const { keywordJobs } = useAppSelector((state) => state.job);

  // Fetch jobs when the component is mounted
  useEffect(() => {
    return () => {
      dispatch(setSearchJobQueryByKeyword(""));
    };
  }, []);

  return (
    <div className="mx-auto my-10 max-w-7xl">
      <h1 className="my-10 text-xl font-bold">
        {/* Optional: Display count of jobs */}
        Search Results ({keywordJobs.length})
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {keywordJobs.length ? (
          keywordJobs.map((job, index) => <Job job={job} key={index} />)
        ) : (
          <p>No jobs found matching your search criteria.</p>
        )}
      </div>
    </div>
  );
}
