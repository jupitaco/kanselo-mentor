import React, { SVGProps } from "react";
import Image from "next/image";
import { GoTrash } from "react-icons/go";
import { useRef, useState, useCallback } from "react";
import Spinner from "../ui/spinner";
import { IoCameraOutline } from "react-icons/io5";
import { formatFileSize } from "@/utils/helper";

export type FileUploadBtnType = {
  uploadChange?: (e: React.ChangeEvent<HTMLInputElement> | DragEvent) => void;
  loading?: boolean;
  id?: string;
  className?: string;
  btnTitle?: string;
  acceptType?: string;
};

export type FileUploadType = {
  id: string;
  uploaddedFileUrl?: string;
  btnTitle?: string;
  loading: { [key: string | number]: boolean };
  uploadFiles?: (e: React.ChangeEvent<HTMLInputElement> | DragEvent) => void;
  removeFile?: () => void;
  singleUpload?: boolean;
  className?: string;
  imgClassName?: string;
  btnClassName?: string;
};

export type Fieldprops = {
  title?: string;
  value?: string;
  className?: string;
  containerClassName?: string;
  fileSize?: number;
  action?: () => void;
};

export const FileUpload: React.FC<FileUploadType & Fieldprops> = ({
  id,
  uploaddedFileUrl,
  loading,
  uploadFiles,
  removeFile,
  btnTitle,
  btnClassName,
  title,
  fileSize = 1024,
}) => {
  const normalizeUrl = uploaddedFileUrl?.split("vendors/")?.pop();

  return (
    <div className="flex flex-col items-center gap-3">
      {uploaddedFileUrl ? (
        <FileField
          title={title ?? normalizeUrl}
          fileSize={fileSize}
          value={`.../${normalizeUrl}`}
          action={removeFile}
        />
      ) : (
        <div className={`flex w-full items-center gap-3`}>
          <FileUploadButton
            id={id}
            loading={loading[id]}
            uploadChange={uploadFiles}
            btnTitle={btnTitle}
            className={btnClassName}
            acceptType=".pdf, .doc, docx"
          />
        </div>
      )}
    </div>
  );
};

export const ImageFileUpload: React.FC<FileUploadType> = ({
  uploaddedFileUrl,
  id,
  loading,
  uploadFiles,
  removeFile,
  btnTitle,
  singleUpload,
  className,
  imgClassName,
  btnClassName,
}) => {
  return (
    <div className="flex flex-col items-center gap-3">
      {uploaddedFileUrl && (
        <div className="relative w-full">
          <figure
            className={`${className} relative min-h-40 w-full overflow-hidden rounded-md`}
          >
            <Image
              src={uploaddedFileUrl}
              alt=""
              fill
              sizes="100%"
              className={imgClassName}
            />
          </figure>

          <button
            onClick={removeFile}
            className="delete-btn absolute -top-3 -right-2 grid size-10 place-items-center rounded-full"
          >
            <GoTrash />
          </button>
        </div>
      )}

      <div className={`flex w-full items-center gap-3`}>
        {singleUpload && uploaddedFileUrl ? (
          ""
        ) : (
          <FileUploadButton
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

export const FileUploadButton = ({
  uploadChange,
  loading,
  id,
  className,
  acceptType = "image/*",
}: FileUploadBtnType) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        // Create a synthetic event to match the file input change event
        const syntheticEvent = {
          target: {
            files: e.dataTransfer.files,
          },
        } as unknown as React.ChangeEvent<HTMLInputElement>;

        if (uploadChange) {
          uploadChange(syntheticEvent);
        }
      }
    },
    [uploadChange],
  );

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <div
        id={id}
        onClick={handleClick}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${className} ${
          isDragging ? "border-primary! bg-primary/10" : ""
        } card flex min-h-24 w-full cursor-pointer flex-col items-center justify-center p-6 text-center transition-colors duration-200`}
      >
        {loading ? (
          <Spinner />
        ) : (
          <>
            <IoCameraOutline size={20} />
          </>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        onChange={uploadChange}
        className="hidden"
        accept={acceptType}
      />
    </>
  );
};

export const FileField = ({
  title,
  value,
  className,
  containerClassName,
  fileSize,
  action,
}: Fieldprops) => {
  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      <p className="text-sm">{title}</p>
      <div
        className={`${containerClassName} card flex min-h-24 flex-1 items-center justify-between gap-4 px-6 py-3`}
      >
        <PDFFileIcon />
        <div className="space-y-1">
          <p className="text-Night text-sm font-medium">{value}</p>
          <p className="text-Granite text-xs">
            {formatFileSize(fileSize as number)}
          </p>
        </div>

        <button
          onClick={action}
          className="delete-btn grid size-10 place-items-center rounded-full"
        >
          <GoTrash />
        </button>
      </div>
    </div>
  );
};

export const PDFFileIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={46}
    height={46}
    viewBox="0 0 46 46"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M38.9583 13.0847H29.75V3.8763C29.75 3.68844 29.6754 3.50827 29.5425 3.37543C29.4097 3.24259 29.2295 3.16797 29.0417 3.16797H9.20833C9.02047 3.16797 8.8403 3.24259 8.70747 3.37543C8.57463 3.50827 8.5 3.68844 8.5 3.8763V23.7097C8.5 23.8975 8.57463 24.0777 8.70747 24.2105C8.8403 24.3434 9.02047 24.418 9.20833 24.418H28.3333V35.7513H9.20833C9.02047 35.7513 8.8403 35.8259 8.70747 35.9588C8.57463 36.0916 8.5 36.2718 8.5 36.4597V42.1263C8.5 42.3142 8.57463 42.4944 8.70747 42.6272C8.8403 42.76 9.02047 42.8347 9.20833 42.8347H38.9583C39.1462 42.8347 39.3264 42.76 39.4592 42.6272C39.592 42.4944 39.6667 42.3142 39.6667 42.1263V13.793C39.6667 13.6051 39.592 13.425 39.4592 13.2921C39.3264 13.1593 39.1462 13.0847 38.9583 13.0847Z"
      fill="#EAECF0"
    />
    <path
      d="M29.041 23H6.37436C5.98315 23 5.66602 23.3171 5.66602 23.7083V36.4583C5.66602 36.8495 5.98315 37.1667 6.37436 37.1667H29.041C29.4322 37.1667 29.7493 36.8495 29.7493 36.4583V23.7083C29.7493 23.3171 29.4322 23 29.041 23Z"
      fill="#EF5350"
    />
    <path
      d="M39.4619 13.2903L29.5452 3.3736C29.4462 3.27371 29.3196 3.20558 29.1816 3.17791C29.0437 3.15023 28.9006 3.16426 28.7707 3.21822C28.6408 3.27217 28.5298 3.36359 28.4521 3.48084C28.3743 3.59808 28.3332 3.73583 28.334 3.87652V13.7932C28.334 13.981 28.4086 14.1612 28.5415 14.2941C28.6743 14.4269 28.8545 14.5015 29.0423 14.5015H38.959C39.0997 14.5023 39.2374 14.4612 39.3547 14.3835C39.4719 14.3057 39.5633 14.1948 39.6173 14.0648C39.6713 13.9349 39.6853 13.7918 39.6576 13.6539C39.6299 13.5159 39.5618 13.3893 39.4619 13.2903Z"
      fill="#D0D5DD"
    />
    <path
      d="M10.625 32.9171V27.2505H12.5092C12.9929 27.2184 13.4717 27.3645 13.855 27.6613C14.0485 27.8296 14.2017 28.0392 14.3035 28.2745C14.4052 28.5099 14.4529 28.7651 14.4429 29.0213C14.4386 29.3525 14.343 29.6759 14.1667 29.9562C14.001 30.2325 13.7534 30.4505 13.4583 30.5797C13.2022 30.6937 12.924 30.7493 12.6438 30.7426H11.7937V32.9171H10.625ZM11.8221 29.7155H12.4879C12.6977 29.7265 12.9035 29.6554 13.0617 29.5172C13.1317 29.4468 13.1862 29.3626 13.2216 29.2698C13.257 29.1771 13.2725 29.078 13.2671 28.9788C13.2671 28.5444 13.0074 28.3272 12.4879 28.3272H11.8221V29.7155ZM15.5479 32.9171V27.2505H17.6729C18.2055 27.2317 18.7276 27.4024 19.1462 27.7322C19.493 28.0142 19.7681 28.3743 19.9491 28.7831C20.13 29.1918 20.2117 29.6375 20.1875 30.0838C20.1936 30.6035 20.072 31.1167 19.8333 31.5784C19.61 32.0101 19.2653 32.3671 18.8417 32.6055C18.3522 32.8405 17.8112 32.9476 17.2692 32.9171H15.5479ZM16.745 31.8405H17.51C17.7821 31.8504 18.0509 31.7789 18.2821 31.6351C18.5272 31.4511 18.721 31.2073 18.845 30.927C18.969 30.6468 19.0191 30.3394 18.9904 30.0343C19.0145 29.7475 18.9655 29.4592 18.8478 29.1966C18.7301 28.9339 18.5476 28.7055 18.3175 28.5326C18.0894 28.3877 17.8225 28.316 17.5525 28.3272H16.745V31.8405ZM21.42 32.9171V27.2505H24.6642V28.3272H22.6171V29.4818H24.4942V30.5584H22.6171V32.9171H21.42Z"
      fill="white"
    />
  </svg>
);
