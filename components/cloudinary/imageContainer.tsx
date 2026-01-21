import React from "react";
import CustomUploadToCloudinary from "./customUploadToCloudinary";
import Image from "next/image";
import Button from "../ui/button";

interface IUpload {
  images?: string;
  id: string;
  btnTitle?: string;
  loading: { [key: string | number]: boolean };
  uploadFiles?: (e: any) => void;
  removeImage?: () => void;
  singleImage?: boolean;
  className?: string;
  imgClassName?: string;
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
  imgClassName,
}) => {
  return (
    <div className="flex items-center gap-3">
      {images && (
        <div className="relative">
          <figure
            className={`${className} relative size-20 overflow-hidden rounded-full`}
          >
            <Image
              src={images}
              alt=""
              fill
              sizes="100%"
              className={imgClassName}
            />
          </figure>
        </div>
      )}

      <div className="flex w-full items-center gap-3">
        {singleImage && images ? (
          ""
        ) : (
          <CustomUploadToCloudinary
            id={id}
            loading={loading[id]}
            uploadChange={uploadFiles}
            btnTitle={btnTitle}
          />
        )}

        {images && (
          <Button onClick={removeImage} className="negative-btn">
            {" "}
            Delete{" "}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ImageContainer;
