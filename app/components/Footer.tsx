import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-4 text-center text-gray-500 text-xs border-t border-white/10 ">
      <p>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
      <div className="flex justify-center mt-2">
        <img
          src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
          alt="TMDB Logo"
          className="h-3"
        />
      </div>
    </footer>
  );
}
