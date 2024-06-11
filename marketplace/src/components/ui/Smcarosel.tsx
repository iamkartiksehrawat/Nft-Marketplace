import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Smcarosel = ({ arr, Card, title }) => {
  return (
    <div className="py-6">
      <div className="text-4xl font-bold px-12 py-6">{title}</div>
      <div className="w-full">
        <Carousel className="px-12">
          <CarouselContent className="ml-0 items-stretch">
            {arr.map((val, index) => (
              <CarouselItem
                key={index}
                className="pl-1 basis-1/2 md:basis-1/3 lg:basis-1/5 items-stretch"
              >
                <div className="p-2 h-full">
                  <Card val={val} indx={index} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 rounded-lg h-full border-none bg-transparent disabled:opacity-0 hover:opacity-100 hover:bg-[#161616] transition-opacity duration-500" />
          <CarouselNext className="right-2 rounded-lg h-full border-none bg-transparent disabled:opacity-0 hover:opacity-100 hover:bg-[#161616] transition-opacity duration-500 " />
        </Carousel>
      </div>
    </div>
  );
};

export default Smcarosel;
