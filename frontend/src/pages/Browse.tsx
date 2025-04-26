import Job from "@/components/sections/job";
import useGetAllJobsByKeyword from "@/hooks/useGetAllJobsByKeyword";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setSearchJobQueryByKeyword } from "@/redux/slice/jobSlice";
import { useEffect } from "react";
import { motion } from "framer-motion";

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
          keywordJobs.map((job) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <Job job={job} />
            </motion.div>
          ))
        ) : (
          <p>No jobs found matching your search criteria.</p>
        )}
      </div>
    </div>
  );
}
