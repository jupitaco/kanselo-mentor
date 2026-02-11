import React from "react";
import CustomUploadToCloudinary from "./customUploadToCloudinary";
import Image from "next/image";
import { GoTrash } from "react-icons/go";

interface IUpload {
  images?: string;
  id: string;
  btnTitle?: string;
  loading: { [key: string | number]: boolean };
  uploadFiles?: (e: React.ChangeEvent<HTMLInputElement> | DragEvent) => void;
  removeImage?: () => void;
  singleImage?: boolean;
  className?: string;
  imgClassName?: string;
  btnClassName?: string;
}

const ImageContainer: React.FC<IUpload> = ({
  images,
  id,
  loading,
  uploadFiles,
  removeImage,
  btnTitle,
  singleImage,
  className,
  imgClassName, btnClassName
}) => {
  return (
    <div className="flex flex-col items-center gap-3">
      {images && (
        <div className="relative w-full">

          <figure
            className={`${className} relative w-full min-h-40 overflow-hidden rounded-md`}
          >
            <Image
              src={images}
              alt=""
              fill
              sizes="100%"
              className={imgClassName}
            />
          </figure>


          <button onClick={removeImage} className="absolute -top-3 size-10 grid place-items-center -right-2 rounded-full delete-btn">
            <GoTrash />
          </button>

        </div>


      )}


      <div className={` flex w-full items-center gap-3`}>
        {singleImage && images ? (
          ""
        ) : (
          <CustomUploadToCloudinary
            id={id}
            loading={loading[id]}
            uploadChange={uploadFiles}
            btnTitle={btnTitle}
            className={btnClassName}
          />
        )}


      </div>
    </div>
  );
};

export default ImageContainer;
