import { useEffect, useState } from "react";
import axios from "axios";

import Head from "next/head";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  // const data = [
  //   { title: "Hakuna Matata", id: 1, showTime: new Date() },
  //   { title: "Lion King", id: 2, showTime: new Date() },
  //   { title: "Hercules", id: 3, showTime: new Date() },
  // ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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

  const searching = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Head>
        <title>LinkAja - Movies Database</title>
      </Head>
      <div className="py-8 px-6 sm:px-8">
        <h1 className="text-center mb-8 text-4xl">Link aja Movies Database</h1>
        <SearchBar searching={searching} />
        {loading ? (
          <h1 className="text-xl text-center">Loading...</h1>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data
              .filter((val) => {
                if (searchTerm == "") {
                  return val;
                } else if (
                  val.title.toLowerCase().includes(searchTerm.toLowerCase())
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
