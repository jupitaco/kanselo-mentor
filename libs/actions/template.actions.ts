"use server";

import {
  createTemplatesApi,
  editTemplatesApi,
} from "@/services/apis/template.api";
import { CreateTemplateType } from "@/types/template";
import { revalidatePath } from "next/cache";

export const CreateTemplateAction = async (body: CreateTemplateType) => {
  try {
    const rsp = await createTemplatesApi(body);

    if (!rsp?.ok) {
      return {
        error: true,
        message: rsp?.body.message || "Something went wrong",
      };
    }

    revalidatePath("/templates");
    return {
      error: false,
      message: rsp?.body.message || "Template created successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const EditTemplateAction = async (
  templateId: string,
  body: CreateTemplateType,
) => {
  try {
    const rsp = await editTemplatesApi(templateId, body);

    if (!rsp?.ok) {
      return {
        error: true,
        message: rsp?.body.message || "Something went wrong",
      };
    }

    revalidatePath("/templates");
    return {
      error: false,
      message: rsp?.body.message || "Template created successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      error: true,
      message: "Something went wrong",
    };
  }
};
