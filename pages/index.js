import { useEffect, useState } from "react";
import Head from "next/head";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";

import { getMovies } from "./api/data";

import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home({ data }) {
  const [selectedMovie, setSelectedMovie] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [startDate, setStartDate] = useState(new Date("2020 01 01"));
  const [selectDate, setSelectDate] = useState();

  const onMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  const onDateSelect = (date) => {
    setSelectDate(date);
    setStartDate(date);
  };

  useEffect(() => {
    handleFiltered(selectedMovie, selectDate);
  }, [selectedMovie, selectDate]);

  const handleFiltered = (movie, date) => {
    if (movie) {
      setSelectDate();
      setFiltered(
        data.filter((val) =>
          val.title.toLowerCase().includes(movie.toLowerCase())
        )
      );
    }
    if (date) {
      setSelectedMovie();
      setFiltered(
        data.filter(
          (item) =>
            dayjs(item.showTime).format("DD MM YYYY") ==
            dayjs(date).format("DD MM YYYY")
        )
      );
    }
    if (movie == "") {
      setSelectDate();
      setFiltered(data);
    }
  };

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
        <SearchBar onMovieSelect={onMovieSelect} item={data} />
        <div className="mx-auto flex mt-8 justify-center">
          <h3 className="text-md mr-3">Filter movies by show time: </h3>
          <DatePicker
            selected={startDate}
            onChange={onDateSelect}
            className="py-1 text-sm text-center bg-red-200 rounded-md cursor-pointer"
          />
        </div>
        {!data ? (
          <h1 className="mb-8 text-3xl text-center">Loading...</h1>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
            {filtered.map((item1) => (
              <Card
                key={item1.id}
                title={item1.title}
                image={item1.image}
                uid={item1.id}
                showTime={item1.showTime}
              />
            ))}
          </div>
        )}
      </div>
      {filtered == false && (
        <div className="mx-auto mt-2">
          <h1 className="text-4xl text-center font-bold">Movies Not Found</h1>
        </div>
      )}
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const data = (await getMovies()) || [];

  return {
    props: { data },
  };
}
