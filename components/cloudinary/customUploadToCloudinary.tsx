"use client";
import { useRef, useState, useCallback } from "react";
import Spinner from "../ui/spinner";
import { IoCameraOutline } from "react-icons/io5";

const CustomUploadToCloudinary = ({
  uploadChange,
  loading,
  id,
  className,
}: {
  uploadChange?: (e: React.ChangeEvent<HTMLInputElement> | DragEvent) => void;
  loading?: boolean;
  id?: string;
  className?: string;
  btnTitle?: string;
}) => {
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
            <IoCameraOutline />
          </>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        onChange={uploadChange}
        className="hidden"
        accept="image/*"
      />
    </>
  );
};

export default CustomUploadToCloudinary;
