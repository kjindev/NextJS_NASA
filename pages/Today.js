import { useEffect, useState } from "react";
import Seo from "./components/Seo";
import Image from "next/image";

export default function Today() {
  const [todayData, setTodayData] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    )
      .then((response) => response.json())
      .then((result) => setTodayData(result));
  }, []);

  console.log("testing");
  return (
    <div className="px-[50px] pt-[60px]">
      <Seo title="Today" />
      {todayData === null ? (
        "Loading..."
      ) : (
        <div>
          <div className="py-[20px]">DATE | {todayData.date}</div>
          <div className="py-[20px]">TITLE | {todayData.title}</div>
          <div className="py-[20px]">
            {todayData.url.includes("youtube") ? (
              <iframe src={todayData.url} />
            ) : (
              <Image
                src={todayData.url}
                alt="bgImage"
                width={1000}
                height={1000}
              />
            )}
          </div>
          <div className="py-[20px]">EXPLANATION | {todayData.explanation}</div>
        </div>
      )}
    </div>
  );
}
