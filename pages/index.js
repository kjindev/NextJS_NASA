import Image from "next/image";
import Seo from "./components/Seo";
import NavBar from "./components/NavBar";
import Link from "next/link";
import universe3 from "../public/image/universe03.jpg";
import { useRef } from "react";

export default function Home() {
  const scrollRef = useRef([]);

  const handleScrollView = (event) => {
    const name = event.target.innerText;
    const category = {
      Home: 0,
      "Astronomy Picture of the Day": 1,
      "Imagery of the Earth": 2,
      "Search Things": 3,
      Information: 4,
    };
    scrollRef.current[category[name]].scrollIntoView({ behavior: "smooth" });
  };

  const textStyle =
    "absolute text-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]";

  return (
    <div>
      <Seo title="Home" />
      <NavBar handleScrollView={handleScrollView} />
      {/*NavName.map((data, index) => (
        <div>{NavName[index]}</div>
      ))*/}
      <div className="relative">
        <h1 className={textStyle}>Welcome!</h1>
        <div ref={(el) => (scrollRef.current[0] = el)}>
          <Image src={universe3} alt="img1" quality={100} placeholder="blur" />
        </div>
      </div>
      <div className="relative">
        <div className={textStyle}>
          <h1>Astronomy Picture of Today</h1>
          <Link className="hover:text-indigo-300" href="/Today">
            View More
          </Link>
        </div>
        <div ref={(el) => (scrollRef.current[1] = el)}>
          <Image src={universe3} alt="img1" quality={100} placeholder="blur" />
        </div>
      </div>
      <div className="relative">
        <div className={textStyle}>
          <h1>Earth Picture</h1>
          <Link className="hover:text-indigo-300" href="/Earth">
            View More
          </Link>
        </div>
        <div ref={(el) => (scrollRef.current[2] = el)}>
          <Image src={universe3} alt="img1" quality={100} placeholder="blur" />
        </div>
      </div>
      <div className="relative">
        <div className={textStyle}>
          <h1>Search What You Want</h1>
          <Link className="hover:text-indigo-300" href="/Search">
            View More
          </Link>
        </div>
        <div ref={(el) => (scrollRef.current[3] = el)}>
          <Image src={universe3} alt="img1" quality={100} placeholder="blur" />
        </div>
      </div>
      <div className="relative">
        <h1 className={textStyle}>Information</h1>
        <div ref={(el) => (scrollRef.current[4] = el)}>
          <Image src={universe3} alt="img1" quality={100} placeholder="blur" />
        </div>
      </div>
    </div>
  );
}
