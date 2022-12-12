import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function NavBar({ handleScrollView }) {
  const [isWindow, setIsWindow] = useState(false);
  const [yAxis, setYAxis] = useState(0);
  const router = useRouter();

  const navStyleDefault = "pl-[20px] cursor-pointer";
  const navStyleChange = "text-indigo-300 pl-[20px] cursor-pointer";

  useEffect(() => {
    if (typeof window !== undefined) {
      setIsWindow(true);
    }
  }, [isWindow]);

  const handleScroll = () => {
    setYAxis(window.pageYOffset);
  };

  if (isWindow) {
    window.addEventListener("scroll", handleScroll);
  }

  console.log(router);
  return (
    <div className="bg-black text-white flex justify-between items-center z-20 w-[100%] h-[70px] fixed px-[30px] pt-[5px]">
      <div id="mainLogo" className="text-[27px] pt-[5px]">
        <Link href="/">Our Universe</Link>
      </div>
      {isWindow && router.pathname === "/" ? (
        <div className="text-[15px]">
          <span
            onClick={handleScrollView}
            className={`${500 > yAxis ? navStyleChange : navStyleDefault}`}
          >
            Home
          </span>
          <span
            onClick={handleScrollView}
            className={`${
              1000 > yAxis && yAxis >= 500 ? navStyleChange : navStyleDefault
            }`}
          >
            Astronomy Picture of the Day
          </span>
          <span
            onClick={handleScrollView}
            className={`${
              2000 > yAxis && yAxis >= 1500 ? navStyleChange : navStyleDefault
            }`}
          >
            Search Things
          </span>
          <span
            onClick={handleScrollView}
            className={`${
              2500 > yAxis && yAxis >= 2000 ? navStyleChange : navStyleDefault
            }`}
          >
            Information
          </span>
        </div>
      ) : (
        <div className="flex flex-row items-center">
          <Link href="/" className="hover:text-indigo-300">
            Main Page
          </Link>
        </div>
      )}
    </div>
  );
}
