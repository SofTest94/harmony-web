import {
  getAllChallengesType,
  getAllChallengesItemsType,
  createChallengeType,
  getListBranchesForCompanyType,
} from '@/app/types/challenge.types';
import { getListUsersForCompanyAndBranchType } from '@/app/types/campaign.types';
import MediclarApi from '../config';

async function getAllChallenges(
  idCompany: string,
  token: string,
  page: number,
  perPage: number,
): Promise<getAllChallengesType> {
  try {
    /* idCompany = '659f3b3f8ff49954569a504f'; */
    const params = {
      page: page,
      perPage: perPage,
    };

    const response = await MediclarApi.get<getAllChallengesType>(
      'challenges/' + idCompany,
      {
        params,
        headers: { Authorization: 'Bearer ' + token },
      },
    );

    return response.data;
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
}

async function getListUsersForCompanyAndBranch(
  idCompany: string,
  idBranch: string | undefined,
  token: string,
  page: number,
): Promise<getListUsersForCompanyAndBranchType> {
  try {
    /* idCompany = '65d689693ca9a3e89fb537cc';
    token = ''; */
    const params = {
      page: page,
      perPage: 5,
    };

    const response = await MediclarApi.get<getListUsersForCompanyAndBranchType>(
      'challenges/getListUsersForCompanyAndBranch/' +
        idCompany +
        '/' +
        idBranch,
      {
        params,
        headers: { Authorization: 'Bearer ' + token },
      },
    );

    return response.data;
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
}

async function getListBranchesForCompany(
  idCompany: string,
  token: string,
): Promise<getListBranchesForCompanyType> {
  try {
    /* idCompany = '65d689693ca9a3e89fb537cc'; */
    const response = await MediclarApi.get<getListBranchesForCompanyType>(
      'challenges/getListBranchesForCompany/' + idCompany,
      {
        headers: { Authorization: 'Bearer ' + token },
      },
    );

    return response.data;
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
}

async function createChallenge(
  data: createChallengeType,
  token: string,
): Promise<createChallengeType> {
  try {
    const respone = await MediclarApi.post<createChallengeType>(
      'challenges/',
      data,
      {
        headers: { Authorization: 'Bearer ' + token },
      },
    );
    return respone && respone.data;
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
}

export const challengeService = {
  getAllChallenges,
  createChallenge,
  getListUsersForCompanyAndBranch,
  getListBranchesForCompany,
};
