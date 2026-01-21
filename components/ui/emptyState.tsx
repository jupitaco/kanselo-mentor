import React, { ReactNode } from "react";

const EmptyState = ({
  title,
  subTitle,
  className,
  icon,
}: {
  title: string;
  className?: string;
  subTitle: string;
  icon?: ReactNode;
}) => {
  return (
    <section
      className={` ${className} flex flex-col items-center justify-center gap-5`}
    >
      {icon && (
        <div className="flex w-8/12 flex-col items-center justify-center">
          {" "}
          {icon}{" "}
        </div>
      )}

      <div className="text-grey-600 w-full text-center">
        <h4>{title}</h4>
        <p>{subTitle}</p>
      </div>
    </section>
  );
};

export default EmptyState;
