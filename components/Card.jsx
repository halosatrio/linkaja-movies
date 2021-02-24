import Link from "next/link";

const Card = (props) => {
  const showTime = new Date(props.showTime).toLocaleDateString()
  
  return (
    <div className="relative">
      <div className="mx-auto h-80">
        <img src={`https://picsum.photos/id/${props.uid}/200/300`} alt="Movies" className="object-cover h-full w-full rounded-lg" loading="lazy" />
      </div>

      <div className="absolute bottom-0 right-0 left-0 bg-white bg-opacity-80 rounded-b-lg">
        <p className="text-center tracking-wide mt-3">
        {props.title}
        </p>
        <p className="text-xs mt-2 text-center">
          Show Time: {showTime}
        </p>
        <Link href={`/movie/${props.uid}`} passHref>
        <a>
        <button className="mt-3 w-full text-center py-2 bg-gray-700 hover:bg-gray-400 text-white rounded-lg">Details</button>
        </a>
        </Link>
      </div>
    </div>
  )
}

export default Card
