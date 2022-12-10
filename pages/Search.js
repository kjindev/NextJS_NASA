import { useEffect, useState } from "react";
import Seo from "./components/Seo";
import Image from "next/image";

export default function Search() {
  const [startYear, setStartYear] = useState(2011);
  const [endYear, setEndYear] = useState(2011);
  const yearOption = [
    2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
  ];
  const [nasaData, setNasaData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [datacheck, setDatacheck] = useState();
  const [arr, setArr] = useState([]);

  const [page, setPage] = useState(1);
  const [infinityScroll, setInfinityScroll] = useState(false);
  const [isWindow, setIsWindow] = useState(false);

  useEffect(() => {
    if (typeof window !== undefined) {
      setIsWindow(true);
    }
  }, [isWindow]);

  const handleScroll = () => {
    if (
      window.pageYOffset + window.innerHeight >=
      document.documentElement.scrollHeight
    ) {
      setInfinityScroll(true);
      setPage(page + 1);
      console.log(page);
    }
  };

  if (isWindow) {
    window.addEventListener("scroll", handleScroll);
  }

  if (infinityScroll) {
    console.log("hello");
    for (let i = 12 * page; i < 12 * (page + 1); i++) {
      arr.push(nasaData[i]);
    }
  }

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        `https://images-api.nasa.gov/search?media_type=image&year_start=${startYear}&year_end=${endYear}`
      );
      const result = await response.json();
      setNasaData(result.collection.items);
      setDatacheck(result);
      setIsLoading(false);
    }
    getData();
  }, [startYear, endYear]);

  const handleButton = (event) => {
    event.preventDefault();
    setImageVisible(true);
    for (let i = 0; i < 12; i++) {
      arr.push(nasaData[i]);
    }
  };

  return (
    <div className="px-[50px] pt-[90px]">
      <Seo title="Search" />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <div className="flex flex-row justify-center m-[20px]">
            <span>start year</span>
            <select
              onChange={(event) => setStartYear(event.target.value)}
              name="startYear"
              className=" text-black"
            >
              {yearOption.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <span>end year</span>
            <select
              onChange={(event) => setEndYear(event.target.value)}
              name="endYear"
              className=" text-black"
            >
              {yearOption.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <button onClick={handleButton}>검색</button>
          </div>
          {imageVisible && (
            <div className="flex flex-row justify-center flex-wrap">
              {arr.map((item) => (
                <div className="p-[10px]" key={item.data[0].nasa_id}>
                  <Image
                    src={item.links[0].href}
                    alt="img"
                    width={450}
                    height={500}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
