"use client";

import { Movie } from "@/@types/movie";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const apiBase =
  "https://api.themoviedb.org/3/search/movie?api_key=b355159e8ac072215bde27f212189560";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;
    const respose = await fetch(`${apiBase}&query=${search}`);
    const data = await respose.json();

    setMovies(data.results);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-zinc-50">
      <Image src="/next.svg" alt="Logo" width={250} height={100} />
      <form className="max-w-lg w-full" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          onChange={handleSearchChange}
          value={search}
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
          className="bg-zinc-100 p-4 w-full border-2 border-zinc-200 text-zinc-800"
        />

        {movies.length > 0 && (
          <div className="flex flex-col bg-zinc-100 max-h-64 overflow-y-auto shadow-lg">
            {movies.map((movie) => (
              <Link
                href={`/${encodeURIComponent(movie.title)}`}
                key={movie.id}
                className="text-zinc-800 py-3 hover:bg-zinc-300 pl-4"
              >
                {movie.title}
              </Link>
            ))}
          </div>
        )}
      </form>
    </main>
  );
}
