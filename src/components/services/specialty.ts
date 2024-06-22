import { Specialties } from '../types/specialities';
import HarmonyApi from './config';

async function getAllSpecialtiesByIdBranch(idBranch: string, token?: string): Promise<Specialties[]> {
  try {
    const response = await HarmonyApi.get<any>('specialties/'+idBranch, {
      headers: { Authorization: 'Bearer ' + token },
    });

    return response.data;
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
}

async function getAllSpecialties(token: string): Promise<Specialties[]> {
  try {
    const response = await HarmonyApi.get<any>('specialties', {
      headers: { Authorization: 'Bearer ' + token },
    });

    return response.data;
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
}

export const specialtiesServices = {
  getAllSpecialties,
  getAllSpecialtiesByIdBranch
};
