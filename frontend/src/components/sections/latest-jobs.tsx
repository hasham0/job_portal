import { useAppSelector } from "@/redux/hooks/hooks";
import LatestJobCards from "./latest-job-cards";

type Props = {};

const LatestJobs = ({}: Props) => {
  const { allJobs } = useAppSelector((state) => state.job);
  return (
    <div className="mx-auto my-20 max-w-7xl">
      <h1 className="m-5 text-center text-4xl font-bold lg:text-start">
        <span className="text-bermuda">Latest & Top </span>Job Openings
      </h1>
      <div className="m-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {allJobs.length <= 0 ? (
          <span className="flex items-center justify-center text-2xl">
            No Job Available
          </span>
        ) : (
          allJobs
            .slice(0, 6)
            .map((job) => <LatestJobCards job={job} key={job._id} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
