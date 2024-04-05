import MediclarApi from '../config';

type BranchRequestResponse = {
  _id: string;
  branchBTB_name: string;
  street: string;
  interior_number: string;
  outdoor_number: string;
  suburb: string;
  state: string;
  reference: string;
};

export type BranchDataType = {
  id: string;
  name: string;
  street: string;
  interior_number: string;
  outdoor_number: string;
  suburb: string;
  state: string;
  reference: string;
};

async function getByCompany(
  companyId: string,
  bearerToken: string,
): Promise<BranchDataType[]> {
  const response = await MediclarApi.get<BranchRequestResponse[]>(
    'branchesbtbs/company/' + companyId + '/all',
    {
      headers: { Authorization: 'Bearer ' + bearerToken },
    },
  );

  const branches: BranchDataType[] = response.data.map((temp) => {
    const { _id, branchBTB_name } = temp;

    return {
      id: _id,
      name: branchBTB_name,
      ...temp,
    };
  });

  return branches;
}

export const branchesServices = {
  getByCompany,
};
