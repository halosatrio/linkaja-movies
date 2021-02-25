import Head from "next/head";
import { useRouter } from "next/router";
import dayjs from "dayjs";

import { getMovies } from "../api/data";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

const MovieDetails = ({ data }) => {
  const router = useRouter();
  const id = router.query.id;
  const showTime = dayjs(data.showTime).format("DD MMMM YYYY");

  const movie = data[id - 1];

  return (
    <>
      <Head>
        <title>{movie.title} | LinkAja Movies</title>
      </Head>
      <div className="px-6 w-96 mx-auto">
        <Header />
        <h1 className="font-serif text-center text-3xl tracking-wider mt-6">
          {movie.title}
        </h1>
        <img
          src={`https://picsum.photos/id/${movie.image}/400/500`}
          alt={movie.title}
          className="object-cover h-full w-full rounded-lg mt-4"
          loading="lazy"
        />
        <p className="font-serif text-lg mt-4">Movie Title: {movie.title}</p>
        <p className="font-serif text-lg mt-1">Show Time: {showTime}</p>
        <p className="font-serif text-lg mt-1">Likes: {movie.like}</p>
        <Footer />
      </div>
    </>
  );
};

export default MovieDetails;

export async function getStaticPaths() {
  const data = await getMovies();

  return {
    paths: data.map((movie) => `/movie/${movie.id}`) || [],
    fallback: false,
  };
}

export async function getStaticProps() {
  const data = (await getMovies()) || [];

  return {
    props: { data },
  };
}
