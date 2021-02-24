import Head from "next/head";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

export async function getStaticPaths() {
  const data = await axios
    .get("https://5f50ca542b5a260016e8bfb0.mockapi.io/api/v1/movies")
    .then(function (res) {
      return res.data;
    })
    .catch(function (error) {
      console.error(error);
      throw new Error("Failed to fetch API - data");
    });

  return {
    paths: data.map((movie) => `/movie/${movie.id}`) || [],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await axios
    .get(
      `https://5f50ca542b5a260016e8bfb0.mockapi.io/api/v1/movies/${params.id}`
    )
    .then(function (res) {
      return res.data;
    })
    .catch(function (error) {
      console.error(error);
      throw new Error("Failed to fetch API - details");
    });

  return {
    props: { data },
  };
}

const MovieDetails = ({ data }) => {
  const showTime = new Date(data.showTime).toLocaleDateString();

  return (
    <>
      <Head>
        <title>{data.title} | LinkAja Movies</title>
      </Head>
      <div className="px-6 w-96 mx-auto">
        <Header />
        <h1 className="font-serif text-center text-3xl tracking-wider mt-6">
          {data.title}
        </h1>
        <img
          src={`https://picsum.photos/id/${data.id}/400/600`}
          alt={data.title}
          className="object-cover h-full w-full rounded-lg mt-4"
          loading="lazy"
        />
        <p className="font-serif text-lg mt-4">Movie Title: {data.title}</p>
        <p className="font-serif text-lg mt-1">Show Time: {showTime}</p>
        <p className="font-serif text-lg mt-1">Likes: {data.like}</p>
        <Footer />
      </div>
    </>
  );
};

export default MovieDetails;
