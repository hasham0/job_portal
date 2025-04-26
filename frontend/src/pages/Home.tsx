import CategoryCarousel from "@/components/sections/category-carousel";
import HeroSection from "@/components/sections/hero-section";
import LatestJobs from "@/components/sections/latest-jobs";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function Home({}: Props) {
  useGetAllJobs();

  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);

  return (
    <div>
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
    </div>
  );
}
