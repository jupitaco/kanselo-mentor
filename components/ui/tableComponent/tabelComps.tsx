import Image from "next/image";
import CopyToClipboardBtn from "../copyToClipboardBtn";
import { GoDotFill } from "react-icons/go";
import { getStatusColors } from "@/utils/helper";

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

export const AvatarCard = ({
  image,
  label,
  subtext,
}: {
  label: string;
  subtext: string;
  image: string;
}) => {
  return (
    <div className="flex flex-1 gap-3">
      <figure className="relative size-12 overflow-hidden rounded-xl">
        <Image src={image} alt="" sizes="100%" fill />
      </figure>
      <div className="flex flex-col justify-between">
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-grey-300 text-xs font-medium">{subtext}</p>
      </div>
    </div>
  );
};
