import { FilterTS } from "@/types";

const fitlerData: Array<FilterTS> = [
  {
    fitlerType: "Location",
    array: ["All", "Karachi", "Multan", "Hyderabad", "Sukkar", "KPK"],
  },
  {
    fitlerType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "Devops",
      "Graphic Designer",
    ],
  },
  {
    fitlerType: "Salary",
    array: ["0-40", "41-100000", "100000-500000"],
  },
];

export default fitlerData;
