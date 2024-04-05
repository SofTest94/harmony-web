import MediclarApi from '../config';
import {
  createBranchType,
  getAllBranchesType,
  responseCreateBranchType,
} from '@/app/types/branches.types';

async function getAllBranches(
  idCompany: string,
  token: string,
  page: number,
  perPage: number,
): Promise<getAllBranchesType> {
  try {
    const params = {
      page: page,
      perPage: perPage,
    };

    const response = await MediclarApi.get<getAllBranchesType>(
      'branchesbtbs/company/' + idCompany,
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

async function createBranch(
  data: createBranchType,
  token: string,
): Promise<responseCreateBranchType> {
  try {
    const response = await MediclarApi.post<responseCreateBranchType>(
      'branchesbtbs/',
      data,
      {
        headers: { Authorization: 'Bearer ' + token },
      },
    );

    return response.data;
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
}

async function multipleRegister(
  file: any,
  companyId: string,
  bearerToken: string,
): Promise<responseCreateBranchType[]> {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('companyId', companyId);

  const response = await MediclarApi.post<responseCreateBranchType[]>(
    'branchesbtbs/multiple',
    formData,
    {
      headers: {
        Authorization: bearerToken,
        'content-type': 'multipart/form-data',
      },
    },
  );

  const data: responseCreateBranchType[] = response.data.map((temp) => {
    const { create, error, data } = temp;

    return {
      create: create,
      error: error,
      data: {
        error: data.error,
        message: data.message,
      },
    };
  });

  return data;
}

export const branchesServices = {
  getAllBranches,
  createBranch,
  multipleRegister,
};
