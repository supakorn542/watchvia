"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { StarFilled } from "@ant-design/icons";
import { Movie } from "../types/tmdb";
import { BASE_IMG_URL } from "../utils/tmdb";

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link
      href={`/${movie.media_type === "tv" ? "tv" : "movie"}/${movie.id}`}
      className="flex flex-col shrink-0 group transition-all duration-300 w-full"
    >
      <div className="relative aspect-2/3 rounded-2xl overflow-hidden shadow-md transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl">
        <Image
          src={
            movie.poster_path
              ? BASE_IMG_URL + movie.poster_path
              : "/placeholder.png"
          }
          alt={movie.title || movie.name || "No Name"}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-0 right-0 p-2.5">
          <div className="flex gap-1 bg-black/60 px-2 py-1 rounded-md backdrop-blur-sm">
            <StarFilled className="text-xs text-yellow-300 font-bold" />
            <span className="text-xs text-yellow-300 font-bold">
              {movie.vote_average?.toFixed(1) || "0.0"}
            </span>
          </div>
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
      </div>

      <div className="pt-3 px-1">
        <h3 className="truncate text-gray-200 text-sm md:text-base font-medium transition-colors group-hover:text-white">
          {movie.title || movie.name || "No Name"}
        </h3>
        <p className="text-[10px] md:text-xs text-gray-400">
          {movie.release_date?.split("-")[0] ||
            movie.first_air_date?.split("-")[0] ||
            "Unknown"}
        </p>
      </div>
    </Link>
  );
}