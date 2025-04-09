import LatestJobCards from "./latest-job-cards";

type Props = {};

const LatestJobs = ({}: Props) => {
  return (
    <div className="mx-auto my-20 max-w-7xl">
      <h1 className="m-5 text-center text-4xl font-bold lg:text-start">
        <span className="text-bermuda">Latest & Top </span>Job Openings
      </h1>
      <div className="m-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 })
          .slice(0, 6)
          .map((_, index) => (
            <LatestJobCards key={index} />
          ))}
      </div>
    </div>
  );
};

export default LatestJobs;
