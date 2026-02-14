import {
  CreateTemplateType,
  TemplateRsp,
  TemplatesRsp,
  TemplateStatRsp,
} from "@/types/template";
import { Api } from "./api";
import { ApiResponse } from "@/types/auths";
import { getUser } from "../session";
import { queryBuilder } from "@/utils/helper";

export const getAllTemplates = async (page = "1", limit = "10") => {
  const user = await getUser();
  return Api.get<TemplatesRsp>(
    `/templates/user/${user?._id}?${queryBuilder({ page, limit })}`,
  );
};

export const getTemplateById = async (templateId: string) => {
  return Api.get<TemplateRsp>(`/templates/find-by-id/${templateId}`);
};

export const getTemplateStats = async () => {
  const user = await getUser();
  return Api.get<TemplateStatRsp>(`/templates/mentor/${user?._id}/metrics`);
};

export const createTemplatesApi = async (body: CreateTemplateType) => {
  const user = await getUser();
  const payload = { ...body, userId: user?._id };
  return Api.post<CreateTemplateType, ApiResponse>(`/templates`, payload, true);
};

export const editTemplatesApi = (
  templateId: string,
  body: CreateTemplateType,
) => {
  return Api.patch<CreateTemplateType, ApiResponse>(
    `/templates/${templateId}`,
    body,
    true,
  );
};

export const deleteTemplatesApi = async (templateId: string) => {
  const user = await getUser();

  return Api.delete<void, ApiResponse>(
    `/templates/${user?._id}/${templateId}`,
    undefined,
    true,
  );
};
