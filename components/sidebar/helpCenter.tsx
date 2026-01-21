import React from "react";
import { QuestionIcon } from "@/public/svgs/svgs";

export const HelpCenter = () => {
  return (
    <section className="relative mt-10">
      <div className="relative z-50 flex w-full justify-center">
        <QuestionIcon />
      </div>
      {/* <div className="absolute -top-12 flex w-full justify-center pb-10">
        <QuestionIcon />
      </div> */}
      <article className="bg-primary flex -translate-y-5 flex-col items-center gap-4 rounded-xl bg-[url('/images/help-bg.png')] bg-cover bg-no-repeat px-5 pt-8 pb-5 text-center text-white">
        <h4>Help Center</h4>
        <p className="text-sm!">
          Having difficulty in Kanselo. Please contact us for further inquiries
        </p>

        <button className="text-primary w-full rounded-xl bg-white px-2 py-4 text-sm">
          Go To Help Center
        </button>
      </article>
    </section>
  );
};
