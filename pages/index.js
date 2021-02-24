import { useState } from "react";
import loadable from "@loadable/component";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

import { getMovies } from "./api/fetch";

import Head from "next/head";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Card = loadable(() => import("../components/Card"));

export default function Home({ data }) {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [startDate, setStartDate] = useState(new Date("2020/01/01"));

  const onMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  console.log(startDate);

  return (
    <>
      <Head>
        <title>LinkAja - Movies Database</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/react-datepicker/2.14.1/react-datepicker.min.css"
        />
      </Head>
      <div className="py-8 px-6 sm:px-8">
        <Header isHome />
        <SearchBar onMovieSelect={onMovieSelect} item={data} />
        <div className="mx-auto flex mt-8 justify-center">
          <h3 className="text-md mr-3">Filter movies by show time: </h3>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="py-1 text-sm text-center bg-red-200 rounded-md cursor-pointer"
          />
        </div>
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
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const data = await getMovies();
  return {
    props: { data },
  };
}
