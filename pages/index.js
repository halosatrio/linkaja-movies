import { useEffect, useState } from "react";
import loadable from "@loadable/component";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import data from "../public/movie-list.json";

import Head from "next/head";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Card = loadable(() => import("../components/Card"));

export default function Home({ item }) {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [startDate, setStartDate] = useState(new Date("2020/01/01"));

  const onMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  useEffect(() => {
    if (selectedMovie !== "") {
      setFiltered(
        item.filter((val) =>
          val.title.toLowerCase().includes(selectedMovie.toLowerCase())
        )
      );
    } else {
      setFiltered([]);
    }
  }, [selectedMovie]);

  return (
    <>
      <Head>
        <title>LinkAja - Movies Database</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/react-datepicker/2.14.1/react-datepicker.min.css"
        />
      </Head>
      <div className="pt-8 px-6 sm:px-8">
        <Header isHome />
        <SearchBar onMovieSelect={onMovieSelect} item={item} />
        <div className="mx-auto flex mt-8 justify-center">
          <h3 className="text-md mr-3">Filter movies by show time: </h3>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="py-1 text-sm text-center bg-red-200 rounded-md cursor-pointer"
          />
        </div>
        {!item ? (
          <h1 className="mb-8 text-3xl text-center">Loading...</h1>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
            {item
              .filter((val) => {
                if (selectedMovie == "") {
                  return val;
                } else if (
                  val.title.toLowerCase().includes(selectedMovie.toLowerCase())
                ) {
                  return val;
                }
              })
              .map((item1) => (
                <Card
                  key={item1.id}
                  title={item1.title}
                  showTime={item1.showTime}
                  thumb={item1.thumb}
                />
              ))}
          </div>
        )}
      </div>
      {selectedMovie && filtered == false && (
        <div className="mx-auto mt-2">
          <h1 className="text-4xl text-center font-bold">Movies Not Found</h1>
        </div>
      )}
      <Footer />
    </>
  );
}

export function getStaticProps() {
  const item = data;

  return {
    props: { item },
  };
}
