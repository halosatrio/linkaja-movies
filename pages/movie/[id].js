import { getMovies, getMovieDetails } from "../api/fetch";

export async function getStaticPaths() {
  const allMovies = await getMovies();
  return {
    paths: allMovies.map((movie) => `/movie/${movie.id}`) || [],
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await getMovieDetails(params.id);
  return {
    props: { data },
  };
}

const MovieDetails = ({ data }) => {
  const showTime = new Date(data.showTime).toLocaleDateString();

  return (
    <div className="p-8 w-96 mx-auto">
      <h1 className="text-center text-4xl">{data.title}</h1>
      <img
        src={`https://picsum.photos/id/${data.id}/400/600`}
        alt={data.title}
        className="object-cover h-full w-full rounded-lg mt-8"
        loading="lazy"
      />
      <p className="mt-4">Movie Title: {data.title}</p>
      <p className="mt-4">Show Time: {showTime}</p>
      <p className="mt-4">Likes: {data.like}</p>
    </div>
  );
};

export default MovieDetails;
