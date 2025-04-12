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

export type { CategoryTS, FilterTS, UserTS };
