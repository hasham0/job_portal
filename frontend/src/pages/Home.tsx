import CategoryCarousel from "@/components/sections/category-carousel";
import HeroSection from "@/components/sections/hero-section";
import LatestJobs from "@/components/sections/latest-jobs";

type Props = {};

export default function Home({}: Props) {
  return (
    <div>
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
    </div>
  );
}
