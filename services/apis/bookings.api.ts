import { OfficeDay } from '@/types/bookings';
import { Api } from './api';
import { queryBuilder } from '@/utils/helper';
import { AuthResponse, AvailableHoursType } from '@/types/auths';
import { getUser } from '../session';


// export const getAllMentorsApi = (
//   {
//     page = "1",
//     limit = "10", search, industry
//   }: {
//     industry?: string;
//     page?: string;
//     limit?: string;
//     search?: string;
//   }
// ) => {
//   return Api.get<MentorRsp>(
//     `/booking/mentors?${queryBuilder({ page, limit, search: String(search), industry: String(industry) })}`,
//     true,
//   );
// };



export const updateBooingSettingsApi = async (body: AvailableHoursType) => {
  const rsp =await getUser()
  return Api.patch<AvailableHoursType, AuthResponse>(
    `/user/${rsp?._id}/available-hours`,
    body,
    true
  );
};
