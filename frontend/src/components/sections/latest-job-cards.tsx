import { Badge } from "@/components/ui/badge";

type Props = {};

const LatestJobCards = ({}: Props) => {
  return (
    <div className="cursor-pointer rounded-md border border-gray-200 bg-white p-5 shadow-xl">
      <div className="">
        <h1 className="text-lg font-medium">Company Name</h1>
        <p className="text-sm text-gray-500">Pakistan</p>
      </div>
      <div className="">
        <h1 className="my-2 text-lg font-bold">Job Title</h1>
        <p className="text-sm text-gray-600">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor,
          architecto.
        </p>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Badge className="font-bold text-blue-700" variant={"secondary"}>
          12 Positions
        </Badge>
        <Badge className="font-bold text-red-700" variant={"secondary"}>
          Part Time
        </Badge>
        <Badge className="text-bermuda font-bold" variant={"secondary"}>
          24 LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
