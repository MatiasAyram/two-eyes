"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Movie {
  id: number;
  title: string;
  image: string;
}

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export function MovieRow({ title, movies }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: "left" | "right") => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-2 px-4 md:px-12 lg:px-16">
      <h2 className="text-xl font-semibold text-foreground md:text-2xl">
        {title}
      </h2>
      <div className="group relative">
        <ChevronLeft
          className={cn(
            "absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100",
            !isMoved && "hidden"
          )}
          onClick={() => handleClick("left")}
        />

        <div
          ref={rowRef}
          className="flex items-center gap-2 overflow-x-hidden scrollbar-hide md:gap-4 md:p-2"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="relative h-28 min-w-45 cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-65 md:hover:scale-105"
            >
              <Image
                src={movie.image}
                className="rounded-sm object-cover md:rounded"
                fill
                alt={movie.title}
              />
            </div>
          ))}
        </div>

        <ChevronRight
          className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}
