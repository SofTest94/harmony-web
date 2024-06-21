import { Branches } from '../../components/types/branches';
import HarmonyApi from './config';

async function getAllBranches(token: string): Promise<Branches[]> {
  try {
    const response = await HarmonyApi.get<any>('branches', {
      headers: { Authorization: 'Bearer ' + token },
    });

    console.log(response);

    return response && response.data;
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
}

export const branchServices = {
  getAllBranches,
};
