import BrandLogo from "@/components/ui/brandLogo";
import { StarRatings } from "@/components/ui/starRatings";
import demo from "@/public/images/authImage.png";
import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid grid-cols-1 lg:grid-cols-2">
      <main className="no-scrollbar mx-auto flex h-screen w-full max-w-xl flex-col items-center justify-between gap-8 overflow-y-auto py-7">
        <BrandLogo />
        <section className="max-w-md flex-1 px-2">{children}</section>

        <footer>
          <small className="text-grey-300">
            @2025 Kanselo All Right Reserved.
          </small>
        </footer>
      </main>
      <aside className="from-secondary-25 to-secondary hidden space-y-5 bg-linear-to-b from-10% to-80% pt-10 pl-10 lg:block">
        <article className="max-w-lg space-y-3">
          <h1>Get Advice from World Class Experts</h1>
          <StarRatings rating={5} />
          <h5 className="text-grey-600 text-sm font-medium">
            Trusted by many{" "}
          </h5>
        </article>
        <figure className="flex justify-end">
          <Image src={demo} alt="" />
        </figure>
      </aside>
    </main>
  );
}
