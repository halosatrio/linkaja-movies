// import Image from "next/image"
// import { useEffect, useState } from "react";

const Card = (props) => {
  // const [image, setImage] = useState();
  
  // useEffect(() => {
  //     const fetchImage = async () => {
  //       await axios
  //         .get(`https://picsum.photos/id/${props.uid}/200/300`)
  //         .then(function (res) {
  //           setImage(res.data);
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //         })
  //     };
  //     fetchImage();
  //   }, []);

  const showTime = new Date(props.showTime).toLocaleDateString()

  return (
    <div className="relative">
      <div className="mx-auto h-80">
        <img src={`https://picsum.photos/id/${props.uid}/200/300`} alt="Movies" className="object-cover h-full w-full  rounded-lg" loading="lazy" />
      </div>

      {/* <Image src={image} alt={`movies ${props.uid}`} width={500} height={500} loading="lazy" /> */}

      <div className="absolute bottom-0 right-0 left-0 bg-white bg-opacity-80 rounded-b-lg">
        <p className="text-center mt-3">
        {props.title}
        </p>
        <p className="text-xs mt-2 text-center">
          Show Time: {showTime}
        </p>
        <button className="mt-3 w-full text-center py-2 bg-blue-700 hover:bg-blue-400 text-white rounded-lg">Details</button>
      </div>
    </div>
  )
}

export default Card
