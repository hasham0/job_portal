import FilterCard from "@/components/sections/filter-card";
import Job from "@/components/sections/job";
import { useAppSelector } from "@/redux/hooks/hooks";

type Props = {};

export default function Jobs({}: Props) {
  const { allJobs } = useAppSelector((state) => state.job);

  return (
    <div className="mx-auto my-5 max-w-7xl p-5">
      <div className="flex gap-5">
        <div className="w-[18%]">
          <FilterCard />
        </div>
        {allJobs.length <= 0 ? (
          <span>No Jobs Found</span>
        ) : (
          <div className="h-[90vh] flex-1 overflow-y-scroll pb-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {allJobs.map((job) => (
                <Job key={job._id} job={job} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
