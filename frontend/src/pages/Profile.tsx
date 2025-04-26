import AppliedJobsTable from "@/components/sections/applied-jobs-table";
import UpdateProfileDialog from "@/components/sections/update-profile-dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import useGetAllAppliedJobs from "@/hooks/useGetAllAppliedJob";
import { useAppSelector } from "@/redux/hooks/hooks";
import { Contact, Mail, Pen } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

type Props = {};

export default function Profile({}: Props) {
  useGetAllAppliedJobs();
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      <div className="mx-auto my-5 max-w-5xl rounded-2xl border border-gray-200 bg-white p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="size-24">
              <AvatarImage src="https://github.com/shadcn.png" alt="profile" />
            </Avatar>
            <div>
              <h1 className="text-xl font-medium">{user?.fullname}</h1>
              <p>{user?.profile.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant={"outline"}
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5 space-y-2">
          <div className="flex items-center gap-3">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className="my-5">
          <h1 className="font-bold">Skills</h1>
          <div className="flex items-center gap-1">
            {user?.profile?.skills && user.profile.skills.length > 0 ? (
              user.profile.skills.map((item: string, index) => (
                <Badge variant={"outline"} key={index}>
                  {item}
                </Badge>
              ))
            ) : (
              <span>No Skills</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-base font-bold">Resume</Label>
          {user?.profile.resume && user?.profile.resumeOriginalName ? (
            <Link
              to={user?.profile.resume}
              target="_blank"
              className="cursor-pointer text-blue-500 hover:underline"
            >
              {user?.profile.resumeOriginalName}
            </Link>
          ) : (
            <span>No Resume</span>
          )}
        </div>
      </div>
      <div className="mx-auto max-w-5xl rounded-2xl bg-white">
        <h1 className="my-5 text-lg font-bold">Applied Jobs</h1>
        <AppliedJobsTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </>
  );
}
