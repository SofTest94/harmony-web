import { getListExams } from '@/app/types/campaign.types';
import axios from 'axios';

const URL_BASE = 'https://mediclar-api.herokuapp.com/';

export async function getAllExams(token: string): Promise<getListExams> {
  try {
    let response = await axios.get<getListExams>(URL_BASE + 'exams/', {
      headers: { Authorization: 'Bearer ' + token },
    });

    return response.data;
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
}
