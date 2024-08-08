import { Movie } from "@/@types/movie";
import { fetchTitleDetail } from "../actions/fetch-title-detail";
import Image from "next/image";

const imageBase = "https://image.tmdb.org/t/p/w500";

export default async function Page({
  params,
}: {
  params: { movieTitle: string };
}) {
  const { movieTitle } = params;
  const title: Movie = await fetchTitleDetail(movieTitle);

  if (!title) {
    return <div>Movie not found</div>;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 text-zinc-800">
      <div className="max-w-xl flex gap-8">
        <Image
          src={`${imageBase}/${title.poster_path}`}
          alt="Logo"
          width={250}
          height={100}
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{title.title}</h1>
          <span className="text-zinc-500">
            {title.release_date.split("-")[0]}
          </span>
          <p>{title.overview}</p>
        </div>
      </div>
    </main>
  );
}
