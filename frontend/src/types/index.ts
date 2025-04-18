type CategoryTS = Array<string>;

type FilterTS = {
  fitlerType: string;
  array: Array<string>;
};

interface UserTS {
  _id: string;
  fullname: string;
  email: string;
  phoneNumber: number;
  role: "student" | "recruiter";
  profile: {
    skills?: Array<string>;
    bio?: string;
    resume?: string;
    profilePhoto?: string;
    resumeOriginalName: string;
  };
}
interface ApplicationTS {
  _id: string;
  job: string;
  applicant: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface JobsTS {
  _id: string;
  title: string;
  description: string;
  requirments: Array<string>;
  salary: number;
  experienceLevel: number;
  location: string;
  jobType: string;
  position: number;
  company: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  applications: (string | { applicant: string })[];
  created_by: string;
}

export type { CategoryTS, FilterTS, UserTS, JobsTS, ApplicationTS };
