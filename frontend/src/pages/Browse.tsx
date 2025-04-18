import Job from "@/components/sections/job";
import React from "react";

type Props = {};

// const randomJob = Array.from({ length: 8 });
export default function Browse({}: Props) {
  return (
    <div className="mx-auto my-10 max-w-7xl">
      <h1 className="my-10 text-xl font-bold">
        {/* Search Results ({randomJob.length}) */}
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {/* {randomJob.map((job, index) => {
          return <Job key={index} />;
        })} */}
      </div>
    </div>
  );
}
