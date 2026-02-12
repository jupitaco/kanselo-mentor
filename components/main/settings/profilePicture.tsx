'use client'

import React, { useRef, } from "react";
import Image from "next/image";
import { GoTrash } from "react-icons/go";
import Spinner from "@/components/ui/spinner";
import { IoPencil } from "react-icons/io5";
import { handleError } from "@/utils/helper";
import { uploadFilesAction } from "@/libs/actions/auth.actions";
import { useGlobalHooks } from "@/hooks/globalHooks";
import { useSettingsContext } from "@/context/settingsContext";


const ProfilePicture = () => {
  const { edit, formData, setFormData } = useSettingsContext();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { loading, setLoading } = useGlobalHooks();


  const handleUploadFiles = async (
    e: React.ChangeEvent<HTMLInputElement> | DragEvent,
  ) => {
    const target = e.target as HTMLInputElement;

    setLoading({ ['profilePhoto']: true })

    if (target.files && target.files.length > 0) {
      const imageFIle = target.files[0];

      try {
        const rsp = await uploadFilesAction(imageFIle);

        if (rsp?.error) {
          handleError(rsp?.message);
          return;
        }

        if (!rsp?.error && rsp?.data) {

          setFormData(prev => ({ ...prev, profilePhoto: rsp?.data[0] }));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading({ ['profilePhoto']: false })

      }
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, profilePhoto: "" }));
  };


  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="grid place-items-center relative">

      {formData?.profilePhoto ? <div className=" w-full">

        <figure
          className={`relative size-40 overflow-hidden rounded-full`}
        >
          <Image
            src={formData?.profilePhoto}
            alt=""
            fill
            sizes="100%"
            className="object-cover"
          />
        </figure>

        <button onClick={removeImage}
          className="absolute -top-3 size-10 grid place-items-center -right-2 rounded-full delete-btn"
          disabled={!edit}>
          <GoTrash />
        </button>


      </div>
        :
        <button
          disabled={!edit} className="disabled:cursor-not-allowed">
          <label htmlFor="profilePhoto" className={` grid place-items-center `} >

            <div
              id="profilePhoto"
              onClick={handleClick}
              className={`size-40! card rounded-full! cursor-pointer flex flex-col items-center justify-center p-6 text-center transition-colors duration-200`}

            >
              {loading['profilePhoto'] ? (
                <Spinner />
              ) : (
                <>
                  <IoPencil size={20} />
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleUploadFiles}
              className="hidden"
              accept="image/*"
            />
          </label>
        </button>

      }

    </div>
  );
};

export default ProfilePicture;

