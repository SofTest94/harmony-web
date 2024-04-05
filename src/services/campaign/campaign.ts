import {
  createCampaignType,
  getAllCampaignType,
  getListBranchesForCompanyType,
  getListEmployeeDetailsType,
  getListSummaryDetailsType,
  getListUsersForCompanyAndBranchType,
} from '@/app/types/campaign.types';
import MediclarApi from '../config';

async function getAllCampaign(
  idCompany: string,
  token: string,
  page: number,
  perPage: number,
): Promise<getAllCampaignType> {
  try {
    const params = {
      page: page,
      perPage: perPage,
    };

    const response = await MediclarApi.get<getAllCampaignType>(
      'campaigns/' + idCompany,
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
    const response = await MediclarApi.get<getListBranchesForCompanyType>(
      'campaigns/getListBranchesForCompany/' + idCompany,
      {
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
    const params = {
      page: page,
      perPage: 10,
    };

    const response = await MediclarApi.get<getListUsersForCompanyAndBranchType>(
      'campaigns/getListUsersForCompanyAndBranch/' + idCompany + '/' + idBranch,
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

async function createCampaign(
  data: createCampaignType,
  token: string,
): Promise<createCampaignType> {
  try {
    const response = await MediclarApi.post<createCampaignType>(
      'campaigns/',
      data,
      {
        headers: { Authorization: 'Bearer ' + token },
      },
    );

    return response && response.data;
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
}
// http://localhost:3000/branchesbtbs/getEmployeeForIdCampaign/65e89a9847d72df045335d19?page=1&perPage=5
async function getEmployeeForIdCampaign(
  idCampaign: string,
  token: string,
  page: number,
): Promise<getListEmployeeDetailsType> {
  try {
    const params = {
      page: page,
      perPage: 10,
    };

    const response = await MediclarApi.get<getListEmployeeDetailsType>(
      'branchesbtbs/getEmployeeForIdCampaign/' + idCampaign,
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

async function getDetailsForId(
  idCampaign: string,
  token: string,
): Promise<getListSummaryDetailsType> {
  try {
    const response = await MediclarApi.get<getListSummaryDetailsType>(
      'campaigns/getDetailsForId/' + idCampaign,
      {
        headers: { Authorization: 'Bearer ' + token },
      },
    );

    return response.data;
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
}
export const campaignServices = {
  getAllCampaign,
  getListBranchesForCompany,
  getListUsersForCompanyAndBranch,
  createCampaign,
  getEmployeeForIdCampaign,
  getDetailsForId,
};
