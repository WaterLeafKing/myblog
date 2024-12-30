import useInterval from '@/utils/useInterval';
import React, { useEffect, useRef, useState } from 'react';
import HomeCard from './HomeCard';
import { createClient } from '@supabase/supabase-js';

interface Post {
  id: number;
  text: string;
  imageUrl: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);


const SwipeUI: React.FC = () => {
  const [postList, setPostList] = useState<Post[]>([]); 

  const fetchRecentPostList = async () => {
    const { data, error } = await supabase
      .from('Post')
      .select('id, preview_image_url, title, created_at, content')
      .limit(3)
      .order('created_at', { ascending: false });

    if (error) {
      console.log(error);
    } else {
      let tempList: {id: number, text: string, imageUrl: string}[] = [];
      tempList.push({id: data[2].id, text: data[2].title, imageUrl: data[2].preview_image_url});
      data.map((item) => {
        tempList.push({id: item.id, text: item.title, imageUrl: item.preview_image_url});
      });
      tempList.push({id: data[0].id, text: data[0].title, imageUrl: data[0].preview_image_url});
     
      setPostList(tempList || []);
    }
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(1); // Start from the first actual slide
  const [isTransitioning, setIsTransitioning] = useState(false);
  
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
        if (newIndex === postList.length - 1) {
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
          setCurrentIndex(postList.length - 2); // Jump to the last actual slide
          containerRef.current!.scrollTo({
            left: containerRef.current!.clientWidth * (postList.length - 2),
            behavior: 'auto',
          });
        }
        setIsTransitioning(false);
      }, 500); // Debounce for 500ms
    }
  };
   
  useEffect(() => {
    fetchRecentPostList();
  }, []);

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
        {postList.map((slide) => (
          <div key={slide.id} className="h-80 min-w-full">
            <HomeCard title={slide.text} imageUrl={slide.imageUrl} />
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center space-x-2">
        {postList.slice(1, -1).map((_, index) => (
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
