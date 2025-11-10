// FILE: app/components/ImageSlider.tsx
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type ProjectImage } from '@/lib/constants';

interface ProjectImageSliderProps {
    images: ProjectImage[];
}

const ImageSlider = ({ images }: ProjectImageSliderProps) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    const onSelect = useCallback((emblaApi: any) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setPrevBtnEnabled(emblaApi.canScrollPrev());
        setNextBtnEnabled(emblaApi.canScrollNext());
    }, [emblaApi, setSelectedIndex]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect(emblaApi);
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    return (
        <div className="bg-surface dark:bg-Dark_surface p-4 rounded-2xl border border-subtext/20">
            <div className="relative">

                {/* 🌟 FIX: Added 'overflow-hidden' here to create the slider viewport */}
                <div className="embla overflow-hidden rounded-lg" ref={emblaRef}>
                    <div className="embla__container flex">
                        {images.map((img, index) => (
                            // This class tells each slide to take up 100% of the viewport
                            <div className="embla__slide relative flex-[0_0_100%] min-w-0" key={index}>
                                <div className="relative w-full aspect-video">
                                    <Image
                                        src={img.src}
                                        alt={img.caption || `Project image ${index + 1}`}
                                        fill={true}
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 60vw"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Carousel Navigation Buttons */}
                {images.length > 1 && (
                    <>
                        <button
                            className="embla__button embla__button--prev absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={scrollPrev}
                            disabled={!prevBtnEnabled}
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            className="embla__button embla__button--next absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={scrollNext}
                            disabled={!nextBtnEnabled}
                        >
                            <ChevronRight size={24} />
                        </button>

                        {/* Dot Indicators */}
                        <div className="embla__dots absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    className={`embla__dot w-3 h-3 rounded-full bg-white/50 transition-colors ${index === selectedIndex ? 'bg-white' : ''}`}
                                    onClick={() => emblaApi && emblaApi.scrollTo(index)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Current Image Description */}
            {images[selectedIndex]?.caption && (
                <p className="text-subtext dark:text-Dark_subtext text-lg lg:text-md xl:text-2xl italic text-center mt-4">
                    {images[selectedIndex].caption}
                </p>
            )}
        </div>
    );
};

export default ImageSlider;