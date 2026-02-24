'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SlideContent {
  video: string;
}

const slideContents: SlideContent[] = [
  {
    video: "/Banner-1.mp4"
  },
  {
    video: "/Banner-2.mp4"
  }
];

export default function HeroSliderVideo() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const nextBtn = document.getElementById('swiper-next');
    const prevBtn = document.getElementById('swiper-prev');

    const handleNext = () => swiperRef.current?.slideNext();
    const handlePrev = () => swiperRef.current?.slidePrev();

    nextBtn?.addEventListener('click', handleNext);
    prevBtn?.addEventListener('click', handlePrev);

    return () => {
      nextBtn?.removeEventListener('click', handleNext);
      prevBtn?.removeEventListener('click', handlePrev);
    };
  }, []);

  // Handle video playback based on active slide
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === activeIndex) {
          video.currentTime = 0; // Reset to beginning
          video.play().catch(console.error);
          
          // Add event listener for when video ends
          const handleVideoEnd = () => {
            swiperRef.current?.slideNext();
          };
          
          video.addEventListener('ended', handleVideoEnd);
          
          // Cleanup event listener
          return () => {
            video.removeEventListener('ended', handleVideoEnd);
          };
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }, [activeIndex]);

  return (
    <div className="relative w-full h-full">
      <Swiper
        modules={[Pagination, Navigation]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onActiveIndexChange={(swiper) => setActiveIndex(swiper.realIndex)}
        loop
        pagination={{ 
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !bg-white/50 !w-3 !h-3',
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-primary'
        }}
        className="h-full w-full hero-swiper"
      >
        {slideContents.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              {/* Background Video */}
              <video
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                className="absolute inset-0 w-full h-full object-cover sm:object-center object-top"
                muted
                playsInline
                preload="metadata"
              >
                <source src={slide.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Optional subtle overlay for better visibility of controls */}
              <div className="absolute inset-0 bg-black/10" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <button
        id="swiper-prev"
        className="absolute left-4 md:left-8 top-1/2 z-20 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 group"
      >
        <ChevronLeft className="h-6 w-6 group-hover:scale-110 transition-transform" />
      </button>
      <button
        id="swiper-next"
        className="absolute right-4 md:right-8 top-1/2 z-20 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 group"
      >
        <ChevronRight className="h-6 w-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Custom Styles */}
      <style jsx global>{`
        .hero-swiper .swiper-pagination {
          bottom: 2rem !important;
        }
        
        .hero-swiper .swiper-pagination-bullet {
          margin: 0 6px !important;
          transition: all 0.3s ease !important;
        }
        
        .hero-swiper .swiper-pagination-bullet-active {
          transform: scale(1.2) !important;
        }
      `}</style>
    </div>
  );
}