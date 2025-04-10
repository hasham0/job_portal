import FilterCard from "@/components/sections/filter-card";
import Job from "@/components/sections/job";

type Props = {};

const jobsLength = Array.from({ length: 9 });
export default function Jobs({}: Props) {
  return (
    <div className="mx-auto my-5 max-w-7xl">
      <div className="flex gap-5">
        <div className="w-[18%]">
          <FilterCard />
        </div>
        {jobsLength.length <= 0 ? (
          <span>No Jobs Found</span>
        ) : (
          <div className="h-[90vh] flex-1 overflow-y-scroll pb-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {jobsLength.map((_, index) => (
                <Job key={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
