import useInterval from '@/utils/useInterval';
import React, { useEffect, useRef, useState } from 'react';
import HomeCard from './HomeCard';

const SwipeUI: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(1); // Start from the first actual slide
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slides = [
    {
      id: 0,
      color: 'bg-green-500',
      text: 'Slide 3',
      imageUrl:
        'https://a0.muscache.com/im/pictures/miso/Hosting-881808599061267756/original/b16970cf-1d55-4edd-bb1f-e1735d0a228e.jpeg?im_w=2560&im_q=highq',
    }, // Clone of the last slide
    {
      id: 1,
      color: 'bg-blue-500',
      text: 'Slide 1',
      imageUrl:
        'https://a0.muscache.com/im/pictures/miso/Hosting-782615921189136934/original/c67f78f1-5807-449a-9a88-753b7fa62d6a.jpeg?im_w=2560&im_q=highq',
    },
    {
      id: 2,
      color: 'bg-red-500',
      text: 'Slide 2',
      imageUrl:
        'https://a0.muscache.com/im/pictures/miso/Hosting-857387972692815761/original/d106e0ef-f825-4ff8-baf7-86256a54fbd5.jpeg?im_w=2560&im_q=highq',
    },
    {
      id: 3,
      color: 'bg-green-500',
      text: 'Slide 3',
      imageUrl:
        'https://a0.muscache.com/im/pictures/miso/Hosting-881808599061267756/original/b16970cf-1d55-4edd-bb1f-e1735d0a228e.jpeg?im_w=2560&im_q=highq',
    },
    {
      id: 4,
      color: 'bg-blue-500',
      text: 'Slide 1',
      imageUrl:
        'https://a0.muscache.com/im/pictures/miso/Hosting-782615921189136934/original/c67f78f1-5807-449a-9a88-753b7fa62d6a.jpeg?im_w=2560&im_q=highq',
    }, // Clone of the first slide
  ];

  const handleNext = () => {
    if (containerRef.current && !isTransitioning) {
      setIsTransitioning(true);
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      containerRef.current.scrollTo({
        left: containerRef.current.clientWidth * newIndex,
        behavior: 'smooth',
      });
      setTimeout(() => {
        if (newIndex === slides.length - 1) {
          setCurrentIndex(1); // Jump to the first actual slide
          containerRef.current!.scrollTo({
            left: containerRef.current!.clientWidth,
            behavior: 'auto',
          });
        }
        setIsTransitioning(false);
      }, 500); // Debounce for 500ms
    }
  };

  const handlePrev = () => {
    if (containerRef.current && !isTransitioning) {
      setIsTransitioning(true);
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      containerRef.current.scrollTo({
        left: containerRef.current.clientWidth * newIndex,
        behavior: 'smooth',
      });
      setTimeout(() => {
        if (newIndex === 0) {
          setCurrentIndex(slides.length - 2); // Jump to the last actual slide
          containerRef.current!.scrollTo({
            left: containerRef.current!.clientWidth * (slides.length - 2),
            behavior: 'auto',
          });
        }
        setIsTransitioning(false);
      }, 500); // Debounce for 500ms
    }
  };

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touchStartX = e.touches[0].clientX;
      const handleTouchMove = (e: TouchEvent) => {
        const touchEndX = e.changedTouches[0].clientX;
        if (touchStartX - touchEndX > 50) handleNext();
        if (touchStartX - touchEndX < -50) handlePrev();
      };
      containerRef.current?.addEventListener('touchmove', handleTouchMove);
      return () =>
        containerRef.current?.removeEventListener('touchmove', handleTouchMove);
    };
    containerRef.current?.addEventListener('touchstart', handleTouchStart);
    return () =>
      containerRef.current?.removeEventListener('touchstart', handleTouchStart);
  }, []);

  useInterval(() => {
    handleNext();
  }, 6000);

  return (
    <div className="my-4">
      <div ref={containerRef} className="flex overflow-hidden rounded-lg">
        {slides.map((slide) => (
          <div key={slide.id} className="h-80 min-w-full">
            <HomeCard title={slide.text} imageUrl={slide.imageUrl} />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center space-x-2">
        {slides.slice(1, -1).map((_, index) => (
          <div
            key={index}
            className={`size-2 rounded-full ${
              currentIndex === index + 1 ? 'bg-gray-400' : 'bg-gray-200'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SwipeUI;
