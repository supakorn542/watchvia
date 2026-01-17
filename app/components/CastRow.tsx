"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { BASE_IMG_URL } from "../utils/tmdb";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { CastMember } from "../types/tmdb";

export default function CastRow({ cast }: { cast: CastMember[] }) {
  const scroll = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: string) => {
    if (scroll.current) {
      const { clientWidth } = scroll.current;
      const scrolledAmount = direction === "left" ? -clientWidth : clientWidth;

      scroll.current?.scrollBy({
        left: scrolledAmount,
        behavior: "smooth",
      });
    }
  };

  if (!cast || cast.length === 0) {
    return (
      <div className="px-6 md:px-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <div className="w-1 h-6 bg-linear-to-r from-blue-500 to-purple-600 rounded-full"></div>
          นักแสดงนำ
        </h2>
        <p className="text-gray-500">ไม่มีข้อมูลนักแสดง</p>
      </div>
    );
  }

  return (
    <div className="relative px-6 md:px-12">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
        นักแสดงนำ
      </h2>
      <button
        onClick={() => handleScroll("left")}
        className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-72 text-3xl hover:scale-110 cursor-pointer opacity-20 hover:opacity-100 transition-all duration-300"
      >
        <LeftOutlined />
      </button>

      <div
        ref={scroll}
        className="flex gap-4 overflow-x-auto pb-8 scrollbar-hide snap-x"
      >
        {cast.slice(0, 15).map((actor: any, index: number) => (
          <div
            key={`${actor.id}-${index}`}
            className="flex flex-col items-center min-w-25 md:min-w-30 snap-start group cursor-pointer"
          >
            <div className="relative w-20 h-20 md:w-28 md:h-28 mb-3 rounded-full overflow-hidden border-2 border-white/10 shadow-lg group-hover:border-blue-500 transition-colors">
              {actor.profile_path ? (
                <Image
                  src={BASE_IMG_URL + actor.profile_path}
                  alt={actor.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-xs text-gray-500">
                  No Img
                </div>
              )}
            </div>
            <p className="text-sm font-semibold text-center line-clamp-1 text-white group-hover:text-blue-400 transition-colors">
              {actor.name}
            </p>
            <p className="text-xs text-gray-400 text-center line-clamp-1">
              {actor.character}
            </p>
          </div>
        ))}
      </div>
      <button
        onClick={() => handleScroll("right")}
        className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-30 h-72 w-12 text-3xl hover:scale-110 cursor-pointer opacity-20 hover:opacity-100 transition-all duration-300"
      >
        <RightOutlined />
      </button>
    </div>
  );
}
