import {
  CreateTemplateType,
  TemplateRsp,
  TemplateStatRsp,
} from "@/types/template";
import { Api } from "./api";
import { ApiResponse } from "@/types/auths";
import { getUser } from "../session";
import { queryBuilder } from "@/utils/helper";

export const getAllTemplates = async (page = "1", limit = "10") => {
  const user = await getUser();
  return Api.get<TemplateRsp>(
    `/templates/user/${user?._id}?${queryBuilder({ page, limit })}`,
  );
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
  return Api.post<CreateTemplateType, ApiResponse>(
    `/templates/${templateId}`,
    body,
    true,
  );
};
