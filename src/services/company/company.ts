import MediclarApi from '../config';

type CompanyRequestResponse = {
  _id: string;
  name: string;
  contact: string;
  emailContact: string;
  phoneNumberContact: string;
  logo: string;
};

export type CompanyDataType = {
  id: string;
  name: string;
  logo: string;
  contact: string;
  emailContact: string;
  phoneNumberContact: string;
};

async function get(id: string, bearerToken: string): Promise<CompanyDataType> {
  const response = await MediclarApi.get<CompanyRequestResponse>(
    'btb-company/' + id,
    {
      headers: { Authorization: 'Bearer ' + bearerToken },
    },
  );

  return {
    id: response.data._id,
    ...response.data,
  };
}

type UpdateCompanyRequestBody = {
  companyName: string;
  logo?: string;
  contact: string;
  emailContact: string;
  phoneNumberContact: string;
};

async function update(
  id: string,
  body: UpdateCompanyRequestBody,
  bearerToken: string,
): Promise<void> {
  await MediclarApi.patch(
    'btb-company/' + id,
    { ...body },
    {
      headers: { Authorization: 'Bearer ' + bearerToken },
    },
  );
}

async function updateLogo(
  companyId: string,
  file: any,
  bearerToken: string,
): Promise<void> {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('companyId', companyId);

  const response = await MediclarApi.post('btb-company/logo', formData, {
    headers: {
      Authorization: 'Bearer ' + bearerToken,
      'content-type': 'multipart/form-data',
    },
  });

  console.log(response);
}

export const companyServices = {
  get,
  update,
  updateLogo,
};
