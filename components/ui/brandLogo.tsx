import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/kanseloLogo.png";

const BrandLogo = ({ className }: { className?: string }) => {
  return (
    <Link
      href="/"
      className={`${className} flex w-26 items-center justify-center gap-2`}
    >
      <Image src={logo} alt="Kanselo Logo" />
    </Link>
  );
};

export default BrandLogo;
