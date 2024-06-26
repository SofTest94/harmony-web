import { CreateVideos, VideosType, UpdateVideos } from '../../components/types/videosType';
import HarmonyApi from './config';

//https://develop.d2z36kd8bp7vmy.amplifyapp.com/employees - crear
async function createVideos(data: CreateVideos, token: string): Promise<any> {
  try {
    const modifiedUserInfo = { ...data };

    // console.log(JSON.stringify(modifiedUserInfo));
    const response = await HarmonyApi.post<any>('videos/', modifiedUserInfo, {
      headers: { Authorization: 'Bearer ' + token },
    });

    // console.log(response);
    return response.data;
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
}

// update
//localhost:3000/employees/66252c0a19da4ddae3ba1eb9 -- update
async function updateById(id: string, body: UpdateVideos, bearerToken: string): Promise<any> {
  const response = await HarmonyApi.patch<any>(
    'videos/' + id,
    { ...body },
    {
      headers: { Authorization: 'Bearer ' + bearerToken },
    }
  );
  return response;
}

async function getAllVideos(token: string): Promise<VideosType[]> {
  try {
    const response = await HarmonyApi.get<any>('videos', {
      headers: { Authorization: 'Bearer ' + token },
    });

    // console.log(response);

    return response && response.data;
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
}

async function deleteVideos(id: string, token: string): Promise<any> {
  try {
    const response = await HarmonyApi.delete<any>('videos/' + id, {
      headers: { Authorization: 'Bearer ' + token },
    });

    return response;
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
}
export const videosServices = {
  getAllVideos,
  createVideos,
  updateById,
  deleteVideos,
};
