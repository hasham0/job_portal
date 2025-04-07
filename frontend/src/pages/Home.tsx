import CategoryCarousel from "@/components/sections/category-carousel";
import HeroSection from "@/components/sections/hero-section";

type Props = {};

export default function Home({}: Props) {
  return (
    <div>
      <HeroSection />
      <CategoryCarousel />
      {/*
      <LatestJob /> */}
    </div>
  );
}
