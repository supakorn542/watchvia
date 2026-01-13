"use client";

import React from "react";
import { Carousel } from "antd";
import { PlayCircleFilled } from "@ant-design/icons";
import Link from "next/link";
import { BASE_IMG_URL_ORIGINAL } from "../utils/tmdb";
import Image from "next/image";
import { Movie } from "../types/tmdb";

export default function HeroCarousel({ movies }: { movies: Movie[] }) {
  console.log("movies: ", movies.slice(0, 5));
  return (
    <div className="relative w-full h-[85vh] md:h-[90vh]">
      <Carousel autoplay autoplaySpeed={5000} effect="fade" arrows>
        {movies.slice(0, 5).map((item,index) => (
          <div key={item.id} className="relative h-[85vh] md:h-[90vh] w-full focus:outline-none">
            <Image
              src={BASE_IMG_URL_ORIGINAL + item.backdrop_path}
              alt={item.title || item.name || "Banner"}
              fill
              priority={index === 0}
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
            <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a] via-transparent to-transparent" />
            <div className="absolute p-6 md:p-16 bottom-0 left-0 z-20 flex flex-col gap-4 max-w-4xl">
              <div className="text-md font-bold flex gap-4 items-center">
                <span className="text-yellow-400 px-2 py-1 border border-yellow-500/30 bg-yellow-500/20 rounded">
                  TRENDING
                </span>
                <span className="text-white px-2 py-1  bg-white/10 rounded">
                  {item.media_type?.toUpperCase()}
                </span>
                <span className="text-green-400">
                  ☆ {item.vote_average.toFixed(1)}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-2xl">
                  {item.name || item.title || "No Name"}
                </h1>
                <p className="text-base md:text-lg text-white line-clamp-3 md:line-clamp-2">
                  {item.overview}
                </p>
              </div>
              <Link href={`/movie/${item.id}`} className="w-fit">
                <button className="bg-white text-black px-4 md:px-8 py-2 md:py-3 rounded-full font-bold text-base md:text-lg flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer">
                  <PlayCircleFilled className="text-xl" />
                  <span>เช็คช่องทางการรับชม</span>
                </button>
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
