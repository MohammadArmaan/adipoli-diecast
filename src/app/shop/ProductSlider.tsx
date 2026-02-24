"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ShopProduct from "./ShopProduct";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductSliderProps {
  products: any[];
}

export default function ProductSlider({ products }: ProductSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Custom Navigation Buttons */}
      <button
        ref={prevRef}
        className="z-10 flex absolute left-0 top-1/2 -translate-y-1/2 border border-primary bg-background p-2 rounded-full text-primary shadow hover:bg-primary hover:text-white transition"
      >
        <ChevronLeft />
      </button>
      <button
        ref={nextRef}
        className="z-10 flex absolute right-0 top-1/2 -translate-y-1/2 border border-primary bg-background p-2 rounded-full text-primary shadow hover:bg-primary hover:text-white transition"
      >
        <ChevronRight />
      </button>

      {/* Swiper Carousel */}
      <Swiper
        loop
        onSwiper={setSwiperInstance}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
            centeredSlides: false,
            initialSlide: 0,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
            centeredSlides: false,
            initialSlide: 0,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
            centeredSlides: true,
            initialSlide: 1, // Start from second slide on desktop
          },
        }}
        modules={[Pagination, Navigation]}
        className="px-4"
      >
        {products.map((product, index) => (
          <SwiperSlide key={product._id || index} className="pb-10">
            <div
              className={`transition-all duration-300 rounded-xl ${
                index === activeIndex
                  ? "scale-100 opacity-100 pointer-events-auto"
                  : "scale-90 opacity-70 pointer-events-none"
              }`}
            >
              <ShopProduct product={product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
