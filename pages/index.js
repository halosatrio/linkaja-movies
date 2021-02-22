import { useEffect, useState } from "react";
import axios from "axios";

import Head from "next/head";
import Card from "../components/Card";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <>
      <Head>
        <title>LinkAja - Movies Database</title>
      </Head>
      <body className="py-8 px-3">
        <h1 className="mb-8 text-4xl">Link aja Movies Database</h1>
        <div className="grid grid-cols-3 gap-4">
          {data.map((item) => (
            <Card
              className="rounded-lg border-black border-2 p-4 text-center"
              key={item.id}
            >
              {item.title}
            </Card>
          ))}
        </div>
      </body>
    </>
  );
}
