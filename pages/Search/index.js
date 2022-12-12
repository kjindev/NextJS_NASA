import { useEffect, useState } from "react";
import Seo from "../components/Seo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Search() {
  const [startYear, setStartYear] = useState(2011);
  const [endYear, setEndYear] = useState(2011);
  const yearOption = [
    2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
  ];
  const [nasaData, setNasaData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageVisible, setImageVisible] = useState(false);
  const [dataArr, setDataArr] = useState([]);

  const [isWindow, setIsWindow] = useState(false);
  const [page, setPage] = useState(1);
  const [infinityScroll, setInfinityScroll] = useState(false);

  const router = useRouter();

  const handleClick = (id, title, date, description, image) => {
    router.push(
      {
        pathname: `/Search/${id}`,
        query: {
          title,
          date,
          description,
          image,
        },
      },
      `/Search/${id}`
    );
  };

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        `https://images-api.nasa.gov/search?media_type=image&year_start=${startYear}&year_end=${endYear}`
      );
      const result = await response.json();
      setNasaData(result.collection.items);
    }
    getData();
  }, [startYear, endYear]);

  useEffect(() => {
    if (nasaData !== null) {
      setIsLoading(false);
    }
  }, [nasaData]);

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
    }
  };

  if (isWindow) {
    window.addEventListener("scroll", handleScroll);
  }

  if (infinityScroll) {
    if (page < 8) {
      for (let i = 12 * page; i < 12 * (page + 1); i++) {
        dataArr.push(nasaData[i]);
      }
    }
  }

  const handleButton = (event) => {
    event.preventDefault();
    setImageVisible(true);
    for (let i = 0; i < 12; i++) {
      dataArr.push(nasaData[i]);
    }
    console.log(nasaData);
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
            <div className="flex flex-wrap justify-center">
              {dataArr.map((item) => (
                <div
                  onClick={() =>
                    handleClick(
                      item.data[0].nasa_id,
                      item.data[0].title,
                      item.data[0].date_created,
                      item.data[0].description,
                      item.links[0].href
                    )
                  }
                  className="tooltip flex justify-center w-[20%] m-[10px] rounded-[15px] hover:cursor-pointer "
                  key={item.data[0].nasa_id}
                >
                  <Link
                    className="tooltiptext m-[5px]"
                    key={item.data[0].nasa_id}
                    href={{
                      pathname: `/Search/${item.data[0].nasa_id}`,
                      query: {
                        title: item.data[0].title,
                        date: item.data[0].date_created,
                        description: item.data[0].description,
                        image: item.links[0].href,
                      },
                    }}
                    as={`/Search/${item.data[0].nasa_id}`}
                  >
                    {item.data[0].title}
                  </Link>
                  <Image
                    className="h-[300px] top-[50%] left-[50%] p-[5px] rounded-[20px] bg-white object-cover"
                    src={item.links[0].href}
                    alt="img"
                    width={500}
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
