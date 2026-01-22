'use client'
import ImageContainer from '@/components/cloudinary/imageContainer'
import Button from '@/components/ui/button';
import FormInput from '@/components/ui/formInput';
import { useGlobalHooks } from '@/hooks/globalHooks';
import { templateData } from '@/mock';
import React from 'react'

export const CreateTemplate = () => {
    const { loading } = useGlobalHooks();

    return (
        <form className='max-w-md mx-auto space-y-8'>

            <article className="flex w-full flex-col gap-3">
                <h5 className="text-grey-500 text-sm font-medium">
                    Cover Image
                </h5>
                <ImageContainer
                    id="profileImg"
                    loading={loading}
                    // uploadFiles={(e) => handleUploadFiles(e, "storeImageUrl")}
                    // images={values?.storeImageUrl}
                    singleImage
                // removeImage={() => {
                //   handleChange({
                //     target: {
                //       name: "storeImageUrl",
                //       value: "",
                //     },
                //   });
                // }}
                />
                {/*
        {customErrors?.error && (
          <ErrorMessage message={customErrors?.errMessage} />
        )} */}
            </article>

            <FormInput
                id="title"
                type="text"
                label="Title"
                placeholder="Enter title"
                className="w-full"

            />

            <FormInput
                id="price"
                type="number"
                label="Price"
                placeholder="Enter price"
                className="w-full"
                min={0}
            />

            <article className="flex w-full flex-col gap-3">
                <h5 className="text-grey-500 text-sm font-medium">
                    Upload File (PDF)
                </h5>
                <ImageContainer
                    id="profileImg"
                    loading={loading}
                    // uploadFiles={(e) => handleUploadFiles(e, "storeImageUrl")}
                    // images={values?.storeImageUrl}
                    singleImage
                // removeImage={() => {
                //   handleChange({
                //     target: {
                //       name: "storeImageUrl",
                //       value: "",
                //     },
                //   });
                // }}
                />
                {/*
        {customErrors?.error && (
          <ErrorMessage message={customErrors?.errMessage} />
        )} */}
            </article>


            <Button className='pry-btn w-full'>Save Template</Button>
        </form>
    )
}

export const EditTemplate = ({ id }: { id: string }) => {
    const { loading } = useGlobalHooks();


    const temp = templateData?.find((i) => i.id === id)

    return (
        <form className='max-w-md mx-auto space-y-8'>

            <article className="flex w-full flex-col gap-3">
                <h5 className="text-grey-500 text-sm font-medium">
                    Cover Image
                </h5>
                <ImageContainer
                    id="profileImg"
                    loading={loading}
                    // uploadFiles={(e) => handleUploadFiles(e, "storeImageUrl")}
                    // images={values?.storeImageUrl}
                    singleImage
                // removeImage={() => {
                //   handleChange({
                //     target: {
                //       name: "storeImageUrl",
                //       value: "",
                //     },
                //   });
                // }}
                />
                {/*
        {customErrors?.error && (
          <ErrorMessage message={customErrors?.errMessage} />
        )} */}
            </article>

            <FormInput
                id="title"
                type="text"
                label="Title"
                placeholder="Enter title"
                className="w-full"
                value={temp?.title}

            />

            <FormInput
                id="price"
                type="number"
                label="Price"
                placeholder="Enter price"
                className="w-full"
                value={temp?.price}

                min={0}
            />

            <article className="flex w-full flex-col gap-3">
                <h5 className="text-grey-500 text-sm font-medium">
                    Upload File (PDF)
                </h5>
                <ImageContainer
                    id="profileImg"
                    loading={loading}
                    // uploadFiles={(e) => handleUploadFiles(e, "storeImageUrl")}
                    // images={values?.storeImageUrl}
                    singleImage
                // removeImage={() => {
                //   handleChange({
                //     target: {
                //       name: "storeImageUrl",
                //       value: "",
                //     },
                //   });
                // }}
                />
                {/*
        {customErrors?.error && (
          <ErrorMessage message={customErrors?.errMessage} />
        )} */}
            </article>


            <Button className='pry-btn w-full'>Save Template</Button>
        </form>
    )
}
