import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import category from "@/utils/category-data";
import { Button } from "@/components/ui/button";

type Props = {};

const CategoryCarousel = ({}: Props) => {
  return (
    <div>
      <Carousel className="mx-auto my-12 w-full max-w-xl">
        <CarouselContent>
          {category.map((item: string, index: number) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Button variant={"outline"} className="rounded-full">
                {item}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
