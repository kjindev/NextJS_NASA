import NavBar from "./NavBar";
import Seo from "./Seo";

export default function Layout({ children }) {
  return (
    <>
      <Seo />
      <div className="z-10">
        <NavBar />
      </div>
      <div>{children}</div>
    </>
  );
}
