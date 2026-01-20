"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmitSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/search?query=${encodeURIComponent(search)}`);
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full flex justify-between items-center px-4 md:px-6 py-4 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md "
          : "bg-linear-to-b from-black/80 to-transparent"
      }`}
    >
      <Link href={`/`}>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent hover:scale-105 cursor-pointer transition-transform">
          WatchVia
        </h1>
      </Link>

      <form className="relative group" onSubmit={handleSubmitSearch}>
        <input
          type="text"
          placeholder="Search..."
          className="bg-white/10 border border-white/10 py-1 pl-4 pr-10 rounded-lg transition-all w-32 md:w-40 focus:w-36 md:focus:w-64 focus:outline-none"
          onChange={handleSearch}
          value={search}
        />
        <button>
          <SearchOutlined className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 cursor-pointer" />
        </button>
      </form>
    </nav>
  );
}
