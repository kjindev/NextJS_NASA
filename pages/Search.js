import { useEffect, useState } from "react";
import Seo from "./components/Seo";
import Image from "next/image";

export default function Search() {
  const [year, setYear] = useState([2011, 2011]);
  const yearOption = [];
  const imgOption = [];
  const [searchData, setSearchData] = useState(null);
  const [imageVisible, setImageVisible] = useState(false);

  fetch(
    `https://images-api.nasa.gov/search?media_type=image&year_start=${year[0]}&year_end=${year[1]}`
  )
    .then((response) => response.json())
    .then((data) => setSearchData(data));

  for (let i = 0; i < 12; i++) {
    yearOption.push(2011 + i);
  }

  const handleInput = (event) => {
    event.preventDefault();
    console.log("submit");
  };

  const handleClick = (event) => {
    if (event.target.name === "startYear") {
      year[0] = event.target.value;
    } else if (event.target.name === "endYear") {
      year[1] = event.target.value;
    }
  };

  const handleButton = () => {
    if (year[0] > year[1]) {
      alert("The end year should be equal or larger than the start year :(");
      setImageVisible(false);
    } else {
      setImageVisible(true);
      if (searchData !== null) {
        for (let i = 0; i < 5; i++) {
          imgOption.push(searchData.collection.items[i].links[0].href);
        }
      }
      console.log(imgOption);
    }
  };

  return (
    <div>
      <Seo title="Search" />
      <div className="px-[50px] pt-[90px]">
        <form onSubmit={handleInput}>
          <input className="text-black text-center" placeholder="text" />
        </form>
        <div>
          <span>start year</span>
          <select
            onChange={handleClick}
            name="startYear"
            className=" text-black"
          >
            {yearOption.map((item, index) => (
              <option key={index}>{yearOption[index]}</option>
            ))}
          </select>
          <span>end year</span>
          <select onChange={handleClick} name="endYear" className=" text-black">
            {yearOption.map((item, index) => (
              <option key={index}>{yearOption[index]}</option>
            ))}
          </select>
          <button onClick={handleButton}>검색</button>
        </div>
        {searchData && (
          <div>
            <Image
              src={searchData.collection.items[0].links[0].href}
              alt="image"
              width={500}
              height={500}
            />
          </div>
        )}
      </div>
    </div>
  );
}
