import {
    Carousel,
    CarouselMainContainer,
    CarouselNext,
    CarouselPrevious,
    SliderMainItem,
    CarouselThumbsContainer,
    SliderThumbItem,
} from "@/components/ui/extension/custom-carousel";

type Props = {
    mainImage: string;
    otherImages: string[];
};
export default function ProductImages(props: Props) {
    const images = [props.mainImage, ...props.otherImages];
    return (
        <Carousel
            carouselOptions={{
                loop: true,
            }}>
            {images.length > 1 && (
                <>
                    <CarouselNext className="top-1/3 -translate-y-1/3" />
                    <CarouselPrevious className="top-1/3 -translate-y-1/3" />
                </>
            )}
            <CarouselMainContainer className="h-[350px]">
                {images.map((src, index) => (
                    <SliderMainItem key={index} className="bg-transparent">
                        <div className="outline outline-1 outline-border size-full flex items-center justify-center rounded-xl bg-background">
                            <img
                                alt=""
                                src={src}
                                className="w-full h-full object-contain object-center"
                            />
                        </div>
                    </SliderMainItem>
                ))}
            </CarouselMainContainer>
            <CarouselThumbsContainer>
                {images.map((src, index) => (
                    <SliderThumbItem
                        key={index}
                        index={index}
                        className="  h-[160px]">
                        <div className="  h-[150px] p-2 outline outline-1 outline-border  size-full flex items-center justify-center rounded-xl bg-background">
                            <img
                                alt=""
                                src={src}
                                className="w-full rounded-xl overflow-hidden h-full object-contain object-center"
                            />
                        </div>
                    </SliderThumbItem>
                ))}
            </CarouselThumbsContainer>
        </Carousel>
    );
}
