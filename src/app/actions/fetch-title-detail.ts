"use server";

const apiBase =
  "https://api.themoviedb.org/3/search/movie?api_key=b355159e8ac072215bde27f212189560";

export async function fetchTitleDetail(title: string) {
  try {
    const response = await fetch(`${apiBase}&query=${title}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return data.results[0];
  } catch (e: any) {
    throw new Error(e.message);
  }
}
