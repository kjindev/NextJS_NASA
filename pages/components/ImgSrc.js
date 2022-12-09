import Search from "../Search";

export default function ImgSrc() {
  const [year, setYear] = useState([2011, 2011]);
  const imgOption = [];
  const [searchData, setSearchData] = useState(null);

  fetch(
    `https://images-api.nasa.gov/search?media_type=image&year_start=${year[0]}&year_end=${year[1]}`
  )
    .then((response) => response.json())
    .then((data) => setSearchData(data));

  if (searchData !== null) {
    for (let i = 0; i < 5; i++) {
      imgOption.push(searchData.collection.items[i].links[0].href);
    }
  }

  return (
    <div>
      <Search imgOption={imgOption} />
    </div>
  );
}
