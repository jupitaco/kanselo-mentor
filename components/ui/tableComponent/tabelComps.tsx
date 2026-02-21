import Image from "next/image";
import CopyToClipboardBtn from "../copyToClipboardBtn";
import { GoDotFill } from "react-icons/go";
import { formatDate, getStatusColors } from "@/utils/helper";
import { sessionData } from "@/mock";

export const OrderedID = ({ id }: { id: string }) => {
  return (
    <div className="flex items-center gap-1">
      {id?.slice(0, 6)}...
      <CopyToClipboardBtn id={id} valuToCopy={id} />
    </div>
  );
};

export const OrderStatus = ({ status }: { status: string }) => {
  return (
    <p
      className={`${getStatusColors(status)} flex w-fit items-center justify-center gap-1`}
    >
      <GoDotFill /> {status}
    </p>
  );
};

export const TableDate = ({
  date,
  className,
  time,
}: {
  className?: string;
  date: string;
  time?: boolean;
}) => {
  return (
    <div className={`${className} flex flex-col gap-1`}>
      {formatDate(date)}
      {time && (
        <span className="text-grey-300 text-xs">{formatDate(date, true)}</span>
      )}
    </div>
  );
};

export const TableTime = ({
  date,
  className,
}: {
  className?: string;
  date: string;
}) => {
  return (
    <div className={`${className} flex flex-col gap-1`}>
      {formatDate(date, true)}
    </div>
  );
};

export const AvatarCard = ({
  image,
  label,
  subtext,
}: {
  label: string;
  subtext?: string;
  image: string;
}) => {
  return (
    <div className="flex flex-1 items-center gap-3">
      <figure className="relative size-12 overflow-hidden rounded-xl">
        <Image src={image} alt="" sizes="100%" fill />
      </figure>
      <div className="flex-1">
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-grey-300 text-xs font-medium">{subtext}</p>
      </div>
    </div>
  );
};

export const TableSession = ({ session }: { session: number }) => {
  return (
    <>{sessionData?.find((s) => s.value === session)?.duration} Minutes </>
  );
};
