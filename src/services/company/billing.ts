import MediclarApi from '../config';

type BillingRequestResponse = {
  _id: string;
  companyId: string;
  businessName: string;
  RFC: string;
  zipCode: string;
  CFDI: string;
  taxRegime: string;
};

export type BillingDataType = {
  id: string;
  companyId: string;
  businessName: string;
  RFC: string;
  zipCode: string;
  CFDI: string;
  taxRegime: string;
};

async function get(id: string, bearerToken: string): Promise<BillingDataType> {
  const response = await MediclarApi.get<BillingRequestResponse>(
    'btb-company/billing/' + id,
    {
      headers: { Authorization: 'Bearer ' + bearerToken },
    },
  );

  return {
    id: response.data._id,
    ...response.data,
  };
}

type UpdateBillingRequestBody = {
  businessName: string;
  RFC: string;
  zipCode: string;
  CFDI: string;
  taxRegime: string;
};

async function update(
  id: string,
  body: UpdateBillingRequestBody,
  bearerToken: string,
): Promise<void> {
  await MediclarApi.patch(
    'btb-company/billing/' + id,
    { ...body },
    {
      headers: { Authorization: 'Bearer ' + bearerToken },
    },
  );
}

type CfdiTaxRegimeRequestResponse = {
  _id: string;
  CFDI: { value: number; label: string }[];
  tax_regime: { value: number; label: string }[];
};

export type CfdiTaxRegimeDataType = {
  CFDI: { value: number; label: string }[];
  taxRegime: { value: number; label: string }[];
};
async function getCfdiTaxRegime(
  bearerToken: string,
): Promise<CfdiTaxRegimeDataType> {
  const response = await MediclarApi.get<CfdiTaxRegimeRequestResponse[]>(
    'dataInvoicesDevellap',
    {
      headers: { Authorization: 'Bearer ' + bearerToken },
    },
  );

  return {
    CFDI: response.data[0].CFDI,
    taxRegime: response.data[0].tax_regime,
  };
}

export const billingServices = {
  get,
  update,
  getCfdiTaxRegime,
};
