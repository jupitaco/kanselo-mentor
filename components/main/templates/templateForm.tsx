"use client";
import {
  FileUpload,
  ImageFileUpload,
} from "@/components/fileUpload/fileUpload";
import Button from "@/components/ui/button";
import ErrorMessage from "@/components/ui/errorMessage";
import FormInput from "@/components/ui/formInput";
import { useTemplates } from "@/hooks/useTemplates";
import { templateData } from "@/mock";
import React from "react";

export const CreateTemplate = () => {
  const {
    formState: { errors, isSubmitting },
    register,
    watch,
    handleSubmit,
    loading,
    handleUploadFiles,
    removeUploadedFile,
    file,
  } = useTemplates();

  const coverImage = watch("coverImage");
  const fileUrl = watch("fileUrl");

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-8">
      <article className="flex w-full flex-col gap-3">
        <h5 className="text-grey-500 text-sm font-medium">Cover Image</h5>

        <ImageFileUpload
          id="coverImage"
          loading={loading}
          uploadFiles={(e) => handleUploadFiles(e, "coverImage")}
          uploaddedFileUrl={coverImage}
          removeFile={() => removeUploadedFile("coverImage")}
          imgClassName="object-cover"
          singleUpload
        />

        {errors?.coverImage?.message && (
          <ErrorMessage message={errors?.coverImage?.message} />
        )}
      </article>

      <FormInput
        id="title"
        type="text"
        label="Title"
        placeholder="Enter title"
        className="w-full"
        {...register("title")}
        error={errors?.title?.message}
      />

      <FormInput
        id="price"
        type="number"
        label="Price"
        placeholder="Enter price"
        className="w-full"
        {...register("price", { valueAsNumber: true })}
        error={errors?.price?.message}
      />

      <article className="flex w-full flex-col gap-3">
        <h5 className="text-grey-500 text-sm font-medium">Upload File (PDF)</h5>
        <FileUpload
          id="fileUrl"
          loading={loading}
          uploaddedFileUrl={fileUrl}
          uploadFiles={(e) => handleUploadFiles(e, "fileUrl")}
          removeFile={() => removeUploadedFile("fileUrl")}
          title={file?.name}
          fileSize={file?.size}
        />

        {errors?.fileUrl?.message && (
          <ErrorMessage message={errors?.fileUrl?.message} />
        )}
      </article>

      <Button type="submit" loading={isSubmitting} className="pry-btn w-full">
        Save Template
      </Button>
    </form>
  );
};

export const EditTemplate = ({ id }: { id: string }) => {
  const {
    formState: { errors, isSubmitting },
    register,
    watch,
    handleSubmit,
    control,
    setValue,
    loading,
    handleUploadFiles,
    removeUploadedFile,
  } = useTemplates();

  const coverImage = watch("coverImage");
  const fileUrl = watch("fileUrl");

  const temp = templateData?.find((i) => i.id === id);

  return (
    <form className="mx-auto max-w-md space-y-8">
      <article className="flex w-full flex-col gap-3">
        <h5 className="text-grey-500 text-sm font-medium">Cover Image</h5>
        <ImageFileUpload
          id="profileImg"
          loading={loading}
          uploadFiles={(e) => handleUploadFiles(e, "coverImage")}
          uploaddedFileUrl={coverImage}
          removeFile={() => removeUploadedFile("coverImage")}
          imgClassName="object-cover"
          singleUpload
        />
        {errors?.coverImage?.message && (
          <ErrorMessage message={errors?.coverImage?.message} />
        )}
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
        <h5 className="text-grey-500 text-sm font-medium">Upload File (PDF)</h5>
        <FileUpload id="profileImg" loading={loading} />

        {errors?.fileUrl?.message && (
          <ErrorMessage message={errors?.fileUrl?.message} />
        )}
      </article>

      <Button className="pry-btn w-full">Save Template</Button>
    </form>
  );
};
