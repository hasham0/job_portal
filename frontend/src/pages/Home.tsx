import CategoryCarousel from "@/components/sections/category-carousel";
import HeroSection from "@/components/sections/hero-section";
import LatestJobs from "@/components/sections/latest-jobs";
import useGetAllJobs from "@/hooks/useGetAllJobs";

type Props = {};

export default function Home({}: Props) {
  useGetAllJobs();
  return (
    <div>
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
    </div>
  );
}
