import { useEffect, useState } from "react";
import Image from "next/image";
import Seo from "./components/Seo";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Earth() {
  const [data, setData] = useState(null);
  const [earthData, setearthData] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.nasa.gov/EPIC/api/natural/images?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    )
      .then((response) => response.json())
      .then((result) => setData(result));
  }, []);

  if (data !== null) {
    earthData.push(data[2].date.slice(0, 4));
    earthData.push(data[2].date.slice(5, 7));
    earthData.push(data[2].date.slice(8, 10));
    earthData.push(data[2].image);
    console.log(data);
  }

  return (
    <div>
      <Seo title="Earth" />

      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        {data === null ? (
          "Loading..."
        ) : (
          <div className="flex flex-row justify-center items-center place-items-center">
            <FiChevronLeft size={50} color="#949494" />
            <Image
              src={`https://epic.gsfc.nasa.gov/archive/natural/${earthData[0]}/${earthData[1]}/${earthData[2]}/png/${earthData[3]}.png`}
              alt="earth"
              width={500}
              height={500}
            />
            <FiChevronRight size={50} color="#949494" />
          </div>
        )}
      </div>
    </div>
  );
}
