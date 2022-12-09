import { useEffect, useState } from "react";
import Seo from "./components/Seo";
import Image from "next/image";

export default function Search() {
  let startYear = 2011;
  let endYear = 2011;
  const yearOption = [
    2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
  ];
  const [nasaData, setNasaData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [imageVisible, setImageVisible] = useState(false);
  const [datacheck, setDatacheck] = useState();
  const [yearChange, setYearChange] = useState(true);
  /*const getData = async () => {
    const response = await fetch(
      `https://images-api.nasa.gov/search?media_type=image&year_start=${startYear}&year_end=${endYear}`
    );
    const result = await response.json();
    setNasaData(result.collection.items);
    setDatacheck(result.collection);
  };*/

  useEffect(() => {
    async function getData() {
      const response = await fetch(
        `https://images-api.nasa.gov/search?media_type=image&year_start=${startYear}&year_end=${endYear}`
      );
      const result = await response.json();
      setNasaData(result.collection.items);
      setIsLoading(false);
      setDatacheck(result.collection);
    }
    getData();
  }, [yearChange]);

  useEffect(() => {
    console.log("year change");
  }, [startYear]);

  const handleInput = (event) => {
    event.preventDefault();
    console.log("submit");
  };

  const handleClick = (event) => {
    if (event.target.name === "startYear") {
      console.log(event.target.children);
      startYear = parseInt(event.target.value);
      console.log("start", startYear);
    } else if (event.target.name === "endYear") {
      endYear = parseInt(event.target.value);
      console.log("end", endYear);
    }
  };

  const handleButton = () => {
    setYearChange(!yearChange);
    if (startYear > endYear) {
      alert("The end year should be equal or larger than the start year :(");
    } else {
      // setImageVisible(true);
      console.log(datacheck);
    }
  };

  return (
    <div className="px-[50px] pt-[90px]">
      <Seo title="Search" />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <form onSubmit={handleInput}>
            <input className="text-black text-center" placeholder="text" />
          </form>
          <div onClick={handleClick}>
            <span>start year</span>
            <select name="startYear" className=" text-black">
              {yearOption.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <span>end year</span>
            <select name="endYear" className=" text-black">
              {yearOption.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <button onClick={handleButton}>검색</button>
          </div>
          {/*imageVisible && (
            <div>
              {nasaData.map((item) => (
                <div key={item.data[0].nasa_id}>
                  <Image
                    src={item.links[0].href}
                    alt="img"
                    width={500}
                    height={500}
                  />
                </div>
              ))}
            </div>
              )*/}
        </div>
      )}
    </div>
  );
}
