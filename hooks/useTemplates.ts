import { handleError, handleSuccess } from "@/utils/helper";
import { useState } from "react";
import { uploadFilesAction } from "@/libs/actions/auth.actions";
import { TemplateSchema, TemplateTypeValues } from "@/schemas/bookcall.schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateTemplateAction,
  EditTemplateAction,
} from "@/libs/actions/template.actions";
import { useRouter } from "next/navigation";
import { TemplateType } from "@/types/template";

export const useTemplates = (templateData?: TemplateType) => {
  const { back } = useRouter();
  const [loading, setLoading] = useState<{ [key: string | number]: boolean }>(
    {},
  );

  const [file, setFile] = useState<File>();

  const initialValues: TemplateTypeValues = {
    fileUrl: templateData?.fileUrl || "",
    coverImage: templateData?.coverImage || "",
    title: templateData?.title || "",
    price: templateData?.price || 0,
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState,
    watch,
    reset,
    control,
    setValue,
  } = useForm<TemplateTypeValues>({
    resolver: zodResolver(TemplateSchema),
    defaultValues: initialValues,
  });

  const handleUploadFiles = async (
    e: React.ChangeEvent<HTMLInputElement> | DragEvent,
    id: keyof TemplateTypeValues,
  ) => {
    const { files, name, size } = e.target as HTMLInputElement;
    setLoading({ [id]: true });

    if (files && files.length > 0) {
      const imageFIle = files[0];

      setFile(files[0]);

      try {
        const rsp = await uploadFilesAction(imageFIle);

        if (rsp?.error) {
          handleError(rsp?.message);
          return;
        }

        if (!rsp?.error && rsp?.data) {
          setValue(id, rsp?.data[0]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading({ [id]: false });
      }
    }
  };

  const removeUploadedFile = (id: keyof TemplateTypeValues) => {
    setValue(id, "");
  };

  const onSubmit = async (data: TemplateTypeValues) => {
    const rsp = await CreateTemplateAction(data);
    if (rsp?.error) {
      handleError(rsp?.message);
    } else {
      handleSuccess(rsp?.message);
      back();
    }
  };

  const onSubmitUpdate = async (data: TemplateTypeValues) => {
    if (!templateData) return;
    const rsp = await EditTemplateAction(templateData?._id, data);
    if (rsp?.error) {
      handleError(rsp?.message);
    } else {
      handleSuccess(rsp?.message);
      back();
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    handleSubmitUpdate: handleSubmit(onSubmitUpdate),
    getValues,
    formState,
    reset,
    watch,
    control,
    setValue,
    handleUploadFiles,
    removeUploadedFile,
    loading,
    file,
  };
};
