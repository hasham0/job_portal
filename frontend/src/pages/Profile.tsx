import AppliedJobsTable from "@/components/sections/applied-jobs-table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Contact, Mail, Pen } from "lucide-react";

type Props = {};

const Skills: Array<string> = ["HTML", "CSS", "JS", "React"];
const isResumeExist = true;
export default function Profile({}: Props) {
  return (
    <>
      <div className="mx-auto my-5 max-w-5xl rounded-2xl border border-gray-200 bg-white p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="size-24">
              <AvatarImage src="https://github.com/shadcn.png" alt="profile" />
            </Avatar>
            <div>
              <h1 className="text-xl font-medium">Full Name</h1>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Voluptatum, autem.
              </p>
            </div>
          </div>
          <Button className="text-right" variant={"outline"}>
            <Pen />
          </Button>
        </div>
        <div className="my-5 space-y-2">
          <div className="flex items-center gap-3">
            <Mail />
            <span>Hasham@gmail.com</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact />
            <span>02419444038</span>
          </div>
        </div>
        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
            {Skills.length !== 0 ? (
              Skills.map((item: string, index) => (
                <Badge key={index}>{item}</Badge>
              ))
            ) : (
              <span>No Skills</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-base font-bold">Resume</Label>
          {isResumeExist ? (
            <a
              href="/resume.pdf"
              target="_blank"
              className="cursor-pointer text-blue-500 hover:underline"
            >
              Hasham Saleem
            </a>
          ) : (
            <span>No Resume</span>
          )}
        </div>
      </div>
      <div className="mx-auto max-w-5xl rounded-2xl bg-white">
        <h1 className="my-5 text-lg font-bold">Applied Jobs</h1>
        <AppliedJobsTable />
      </div>
    </>
  );
}
