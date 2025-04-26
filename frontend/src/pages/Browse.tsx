import Job from "@/components/sections/job";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setFilterjobByText } from "@/redux/slice/jobSlice";
import { useEffect } from "react";

type Props = {};

// const randomJob = Array.from({ length: 8 });
export default function Browse({}: Props) {
  const { filterJobs, serachJobByText } = useAppSelector((state) => state.job);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setFilterjobByText());
  }, [serachJobByText]);

  console.log("🚀 ~ Browse ~ filterJobs:", filterJobs);
  return (
    <div className="mx-auto my-10 max-w-7xl">
      <h1 className="my-10 text-xl font-bold">
        Search Results ({filterJobs.length})
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filterJobs.map((job, index) => {
          return <Job job={job} key={index} />;
        })}
      </div>
    </div>
  );
}
