"use client";

import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <div className="relative h-[80vh] w-full">
      <div className="absolute inset-0">
        <Image
          src="/hero-banner.png"
          alt="Hero Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-background/60 via-transparent to-transparent" />
      </div>

      <div className="relative flex h-full flex-col justify-end px-4 pb-24 md:px-12 md:pb-32 lg:px-16">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            Two Eyes
          </h1>
          <p className="max-w-xl text-lg text-white/90 drop-shadow-md">
            They say the eyes are the window to the soul, but what if they are watching you back? 
            Dive into this mind-bending thriller that explores the thin line between reality and paranoia.
          </p>
          <div className="flex items-center gap-3 pt-4">
            <Button size="lg" className="h-12 gap-2 px-8 text-lg font-bold">
              <Play className="h-6 w-6 fill-current" />
              Play
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="h-12 gap-2 bg-white/20 px-8 text-lg font-bold text-white backdrop-blur-md hover:bg-white/30"
            >
              <Info className="h-6 w-6 text-white" />
              More Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
