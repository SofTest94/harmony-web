import { CreateQuestions, Questions } from '../../components/types/questions';
import HarmonyApi from './config';

//https://develop.d2z36kd8bp7vmy.amplifyapp.com/employees - crear
async function createQuestions(data: CreateQuestions, token: string): Promise<any> {
  try {
    const modifiedUserInfo = { ...data };

    const response = await HarmonyApi.post<any>('questions/', modifiedUserInfo, {
      headers: { Authorization: 'Bearer ' + token },
    });

    // console.log(response);
    return response.data;
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
}

async function getAllQuestions(token: string): Promise<Questions[]> {
  try {
    const response = await HarmonyApi.get<any>('questions', {
      headers: { Authorization: 'Bearer ' + token },
    });

    // console.log(response);

    return response && response.data;
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
}

export const questionsServices = {
  getAllQuestions,
  createQuestions
};
