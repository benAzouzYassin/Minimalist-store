import Image from "next/image";
export default function Hero() {
  return (
    <section className="grid grid-cols-2 gap-3 h-[600px] w-full ">
      <div className="border-2 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full z-10 transition-colors  hover:cursor-pointer h-full bg-black/30 hover:bg-black/20 " />
        <Image
          src={"/assets/hero-images/1.png"}
          className="w-full h-full 300 object-cover object-center group-hover:scale-[102%] group-active:scale-100 duration-300 transition-transform"
          loading="eager"
          quality={100}
          width={500}
          height={500}
          alt={""}
        />
      </div>
      <div className="grid grid-cols-2 gap-3   ">
        <div className="border-2 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full z-10 transition-colors  hover:cursor-pointer h-full bg-black/20 hover:bg-black/10 " />
          <Image
            src={"/assets/hero-images/3.png"}
            className="w-full h-full 300 object-cover group-hover:scale-[102%] group-active:scale-100 duration-300 transition-transform"
            loading="eager"
            quality={100}
            width={500}
            height={500}
            alt={""}
          />
        </div>
        <div className="h-full  flex flex-col ">
          <div className="h-1/2 relative  overflow-hidden group   w-full">
            <div className="absolute top-0 left-0 w-full z-10 transition-colors  hover:cursor-pointer h-full bg-black/20 hover:bg-black/10 " />

            <Image
              src={"/assets/hero-images/2.png"}
              className="w-full h-full 300 object-cover group-hover:scale-[102%] group-active:scale-100 duration-300 transition-transform"
              loading="eager"
              quality={100}
              width={500}
              height={500}
              alt={""}
            />
          </div>
          <div className="w-full   overflow-hidden group relative h-1/2   mt-3">
            <div className="absolute top-0 left-0 w-full z-10 transition-colors  hover:cursor-pointer h-full bg-black/20 hover:bg-black/10 " />

            <Image
              src={"/assets/hero-images/4.png"}
              className="w-full h-full 300 object-cover group-hover:scale-[102%] group-active:scale-100 duration-300 transition-transform"
              loading="eager"
              quality={100}
              width={500}
              height={500}
              alt={""}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
