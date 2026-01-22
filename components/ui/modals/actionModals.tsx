import React, { ReactNode } from "react";
import Button from "../button";
import ModalWrapper from "./modalWrapper";
import { DialogClose, DialogFooter } from "./dialog";
import { cn } from "@/libs/utils";

interface IRejecrOrder {
  id: string;
  action?: () => void;
  btnMainClass?: string;
  btnSecClass?: string;
  title: string;
  subTitle?: string;
  headerClass?: string;
  actionTitle: string | ReactNode;
  icon?: ReactNode;
  closeTitle?: string;
  iconClassName?: string;
  containerClassName?: string;
  loading?: boolean;
  subtitleClass?: string;
  titleClass?: string;
}

const ActionModals: React.FC<IRejecrOrder> = ({
  id,
  action,
  btnMainClass,
  btnSecClass,
  title,
  subTitle,
  actionTitle,
  icon,
  closeTitle,
  iconClassName,
  headerClass,
  loading,
  titleClass,
}) => {
  return (
    <ModalWrapper
      id={id}
      icon={<div className={`${iconClassName}`}>{icon}</div>}
      title={title}
      subtitle={String(subTitle)}
      headerClass={cn(headerClass, "border-0! justify-center items-center")}
      subtitleClass={"font-normal text-center"}
      titleClass={titleClass}
      wrapperClass="!rounded-[20px]"
    >
      <section>

        <DialogFooter>
          <article className="mt-5 flex justify-end gap-3">
            <DialogClose asChild>
              <Button type="button" className={btnSecClass}>
                {closeTitle}
              </Button>
            </DialogClose>

            <Button
              className={cn("pry-btn", btnMainClass)}
              type="button"
              onClick={action}
              loading={loading}
            >
              {actionTitle}
            </Button>
          </article>
        </DialogFooter>
      </section>
    </ModalWrapper>
  );
};

export default ActionModals;
