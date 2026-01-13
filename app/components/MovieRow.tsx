"use client";
import React, { useRef } from "react";
import { BASE_IMG_URL } from "../utils/tmdb";
import Link from "next/link";
import Image from "next/image";
import { StarFilled, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Movie } from "../types/tmdb";

export default function MovieRow({
  title,
  movies,
}: {
  title: string;
  movies: Movie[];
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: string) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrolledAmount = direction === "left" ? -clientWidth : clientWidth;

      scrollRef.current.scrollBy({
        left: scrolledAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative z-20 p-6 md:p-12 mb-4 ">
      <div className="flex gap-4 items-center">
        <div className="w-1.5 h-8 bg-linear-to-r from-blue-500 to-purple-600 rounded-full" />
        <h2 className="text-white text-lg md:text-2xl font-bold">{title}</h2>
      </div>
      <button
        onClick={() => scroll("left")}
        className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-72 text-3xl hover:scale-110 cursor-pointer opacity-20 hover:opacity-100 transition-all duration-300"
      >
        <LeftOutlined />
      </button>
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto z-20 pt-8 scrollbar-hide snap-x"
      >
        {movies.map((movie) => (
          <Link
            href={`/movie/${movie.id}`}
            key={movie.id}
            className="flex flex-col shrink-0 group transition-all duration-300"
          >
            <div className="relative w-40 md:w-50 aspect-2/3 rounded-2xl overflow-hidden snap-start transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl">
              <Image
                src={BASE_IMG_URL + movie.poster_path}
                alt={movie.title || movie.name || "No Name"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-0 right-0 p-2.5">
                <div className="flex gap-1 bg-black/60 px-2 py-1 rounded-md">
                  <StarFilled className="text-xs text-yellow-300! font-bold " />
                  <span className="text-xs text-yellow-300 font-bold">
                    {movie.vote_average.toFixed(1)}
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 bg-linear-t from-black via-black/20 to-transparent" />
            </div>
            <div className="w-40 md:w-50 pt-4">
              <h3 className="truncate text-gray-200 text-base md:text-lg transition-colors group-hover:text-white">
                {movie.title || movie.name || "No Name"}
              </h3>
              <p className="text-[10px] md:text-xs text-gray-200">
                {movie.release_date?.split("-")[0] ||
                  movie.first_air_date?.split("-")[0]}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <button
        onClick={() => scroll("right")}
        className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 z-30 h-72 w-12 text-3xl hover:scale-110 cursor-pointer opacity-20 hover:opacity-100 transition-all duration-300"
      >
        <RightOutlined />
      </button>
    </div>
  );
}
