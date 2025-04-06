"use client";

import { PreviewHighlight } from "#/types";
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

type Props = {
  highlights: PreviewHighlight[];
};

const Higghligher = ({ highlights }: Props) => {
  return (
    <div className="relative">
      <Carousel
        className="w-full "
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent className="h-[50dvh]">
          {highlights.map((highlight, index) => (
            <CarouselItem key={index} className="basis-1/2 lg:basis-1/3">
              <div className="rounded-2xl h-full">
                <Image
                  src={highlight.imageUrl}
                  alt={highlight.description ?? "photo"}
                  width={500}
                  height={900}
                  className="h-full w-full object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="dark:bg-gradient-to-b dark:from-transparent dark:to-neutral-950 dark:via-neutral-950 w-full left-0 absolute bottom-0 z-[20] h-[10dvh]"></div>
    </div>
  );
};

export default Higghligher;
