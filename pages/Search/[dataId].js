import { useRouter } from "next/router";
import Seo from "../components/Seo";
import Image from "next/image";

export default function Detail() {
  const router = useRouter();
  console.log(router);
  return (
    <div className="px-[50px] pt-[60px]">
      <Seo title={router.query.title} />
      <div>
        <div className="py-[20px]">DATE | {router.query.date}</div>
        <div className="py-[20px]">TITLE | {router.query.title}</div>
        <div className="py-[20px]">
          EXPLANATION | {router.query.description}
        </div>
      </div>
      <Image src={router.query.image} alt="img" width={500} height={500} />
    </div>
  );
}
