import FilterCard from "@/components/sections/filter-card";
import Job from "@/components/sections/job";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setFilterjobByText } from "@/redux/slice/jobSlice";
import { useEffect } from "react";
import { motion } from "framer-motion";

type Props = {};

export default function Jobs({}: Props) {
  const { filterJobs, serachJobByText } = useAppSelector((state) => state.job);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setFilterjobByText());
  }, [serachJobByText]);

  return (
    <div className="mx-auto my-5 max-w-7xl p-5">
      <div className="flex gap-5">
        <div className="w-[18%]">
          <FilterCard />
        </div>
        {filterJobs.length <= 0 ? (
          <span>No Jobs Found</span>
        ) : (
          <div className="h-[90vh] flex-1 overflow-y-scroll pb-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filterJobs.map((job) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                >
                  <Job job={job} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
