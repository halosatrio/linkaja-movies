import axios from "axios";

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
  const id = params.slug;
  const data = await axios
    .get(`https://5f50ca542b5a260016e8bfb0.mockapi.io/api/v1/movies/${id}`)
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
