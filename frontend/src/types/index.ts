type CategoryTS = Array<string>;

type FilterTS = {
  fitlerType: string;
  array: Array<string>;
};

interface UserTS {
  status: string;
  applicant: ApplicationTS;
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
  createdAt: Date | string;
  updatedAt: Date | string;
}
interface ApplicationTS {
  _id: string;
  job: string;
  applicant: string | UserTS;
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
  company: string | CategoryTS;
  createdAt: Date | string;
  updatedAt: Date | string;
  applications: (string | { applicant: string })[];
  created_by: string;
}

interface CompanyTS {
  _id: string;
  name: string;
  description: string;
  website: string;
  location: string;
  logo: string;
  userId: UserTS["_id"];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type { CategoryTS, FilterTS, UserTS, JobsTS, ApplicationTS, CompanyTS };
