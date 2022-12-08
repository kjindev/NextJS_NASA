import { useEffect, useState } from "react";
import Seo from "./components/Seo";

export default function Search() {
  const [year, setYear] = useState([2011, 2012]);
  const yearOption = [];
  const [searchData, setSearchData] = useState(null);
  fetch(
    `https://images-api.nasa.gov/search?media_type=image&year_start=${year[0]}&year_end=${year[1]}`
  )
    .then((response) => response.json())
    .then((data) => setSearchData(data));

  useEffect(() => {
    console.log(searchData);
  }, [year]);

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
      console.log("start", year[0]);
    } else if (event.target.name === "endYear") {
      year[1] = event.target.value;
      console.log("end", year[1]);
    }
  };

  const handleButton = () => {
    if (year[0] > year[1]) {
      alert("The end year should be equal or larger than the start year :(");
    } else {
      console.log("button");
      console.log(searchData);
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
          <select className=" text-black">
            {yearOption.map((item, index) => (
              <option onClick={handleClick} name="startYear" key={index}>
                {yearOption[index]}
              </option>
            ))}
          </select>
          <span>end year</span>
          <select className=" text-black">
            {yearOption.map((item, index) => (
              <option onClick={handleClick} name="endYear" key={index}>
                {yearOption[index]}
              </option>
            ))}
          </select>
          <button onClick={handleButton}>검색</button>
        </div>
      </div>
    </div>
  );
}
