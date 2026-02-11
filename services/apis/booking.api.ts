import { Api } from './api';
import { queryBuilder } from '@/utils/helper';
import { MentorRsp } from '@/types/booking';


export const getAllMentorsApi = (
  {
    page = "1",
    limit = "10", search, industry
  }: {
    industry?: string;
    page?: string;
    limit?: string;
    search?: string;
  }
) => {
  return Api.get<MentorRsp>(
    `/booking/mentors?${queryBuilder({ page, limit, search: String(search), industry: String(industry) })}`,
    true,
  );
};