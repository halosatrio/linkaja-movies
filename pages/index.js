import { useState } from "react";
import loadable from "@loadable/component";

import { getMovies } from "./api/fetch";

import Head from "next/head";
import SearchBar from "../components/SearchBar";

const Card = loadable(() => import("../components/Card"));

export default function Home({ data }) {
  const [selectedMovie, setSelectedMovie] = useState("");

  const onMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <>
      <Head>
        <title>LinkAja - Movies Database</title>
      </Head>
      <div className="py-8 px-6 sm:px-8">
        <h1 className="text-center mb-8 text-4xl">Link aja Movies Database</h1>
        <SearchBar onMovieSelect={onMovieSelect} item={data} />
        {!data ? (
          <h1 className="mb-8 text-3xl text-center">Loading...</h1>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
            {data
              .filter((val) => {
                if (selectedMovie == "") {
                  return val;
                } else if (
                  val.title.toLowerCase().includes(selectedMovie.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((item) => (
                <Card
                  key={item.id}
                  title={item.title}
                  showTime={item.showTime}
                  uid={item.id}
                />
              ))}
          </div>
        )}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const data = await getMovies();
  return {
    props: { data },
  };
}
