import Image from "next/image"
import { useEffect, useState } from "react";

const Card = (props) => {
  const [image, setImage] = useState();
  
  useEffect(() => {
      const fetchImage = async () => {
        await axios
          .get(`https://picsum.photos/id/${props.uid}/200/300`)
          .then(function (res) {
            setImage(res.data);
          })
          .catch(function (error) {
            console.log(error);
          })
      };
      fetchImage();
    }, []);

  const showTime = new Date(props.showTime).toLocaleDateString()

  return (
    <div className="h-60 max-h-60 rounded-lg border-black border-2 p-4">

      {/* <div class="flex-none w-48 relative">
        <img src="/classic-utility-jacket.jpg" alt="" class="absolute inset-0 w-full h-full object-cover" />
      </div> */}

      <Image src={image} alt={`movies ${props.uid}`} width={500} height={500} loading="lazy" />
      <p className="text-center">
      {props.title}
      </p>
      <p className="text-xs mt-4 text-center">
        Show Time: {showTime}
      </p>
    </div>
  )
}

export default Card
