import { useEffect, useState } from "react";
import axios from "axios";
import loadable from "@loadable/component";

import Head from "next/head";
// import Card from "../components/Card";
import SearchBar from "../components/SearchBar";

const Card = loadable(() => import("../components/Card"));

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState("");

  // const item = [
  //   { title: "Hakuna Matata", id: 1, showTime: new Date() },
  //   { title: "Lion King", id: 2, showTime: new Date() },
  //   { title: "Hercules", id: 3, showTime: new Date() },
  //   { title: "Hakuna Matata 2", id: 4, showTime: new Date() },
  //   { title: "Lion King 2", id: 5, showTime: new Date() },
  //   { title: "Hercules 2", id: 6, showTime: new Date() },
  // ];

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://5f50ca542b5a260016e8bfb0.mockapi.io/api/v1/movies")
        .then(function (res) {
          setData(res.data);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(setLoading(false));
    };
    fetchData();
  }, []);

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
        {loading ? (
          <h1 className="mb-8 text-3xl text-center">Loading...</h1>
        ) : (
          // <h1 className="mb-8 text-3xl text-center">Success</h1>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
            {/* {item
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
              ))} */}
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
