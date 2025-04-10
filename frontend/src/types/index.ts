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
    skills: Array<string>;
    profilePhoto: string;
  };
}

export type { CategoryTS, FilterTS, UserTS };
