import MediclarApi from '../config';
import { format, parse } from 'date-fns';
import { utcToZonedTime, format as formatTz } from 'date-fns-tz';

type EmployeeRequestResponse = {
  _id: string;
  id_Devellab: string;
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  birthday: string;
  gender: string;
  email: string;
  companyId: string;
  branchOfficeId: string;
  branchOfficeName: string;
  rol: string;
  createdAt: string;
};

export type EmployeeDataType = {
  id: string;
  id_Devellab: string;
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  birthday: string;
  gender: string;
  email: string;
  companyId: string;
  branchOfficeId: string;
  branchOfficeName: string;
  rol: 'Empleado' | 'Administrador';
  created: string;
};

async function getByCompany(
  id: string,
  perPage: number,
  page: number,
  bearerToken: string,
): Promise<{ employees: EmployeeDataType[]; totalPages: number }> {
  const response = await MediclarApi.get<{
    employees: EmployeeRequestResponse[];
    totalPages: number;
  }>('btb-employees/company/' + id + '?perPage=' + perPage + '&page=' + page, {
    headers: { Authorization: 'Bearer ' + bearerToken },
  });

  const employees: EmployeeDataType[] = response.data.employees.map((temp) => {
    const { _id, createdAt } = temp;

    const new_date = new Date(createdAt); // iso
    const date_tz = utcToZonedTime(new_date, 'America/Mexico_City');
    const date_format = format(date_tz, 'dd/MM/yyyy');

    const dataFormat: EmployeeDataType = {
      id: _id,
      ...temp,
      created: date_format,
      rol: temp.rol === 'administrator' ? 'Administrador' : 'Empleado',
    };

    return dataFormat;
  });

  return {
    employees,
    totalPages: response.data.totalPages,
  };
}

async function getByBranch(
  id: string,
  bearerToken: string,
): Promise<{ employees: EmployeeDataType[]; totalPages: number }> {
  const response = await MediclarApi.get<{
    employees: EmployeeRequestResponse[];
    totalPages: number;
  }>('btb-employees/branch/' + id, {
    headers: { Authorization: 'Bearer ' + bearerToken },
  });

  const employees: EmployeeDataType[] = response.data.employees.map((temp) => {
    const { _id, createdAt } = temp;

    const new_date = new Date(createdAt); // iso
    const date_tz = utcToZonedTime(new_date, 'America/Mexico_City');
    const date_format = format(date_tz, 'dd/MM/yyyy');

    const dataFormat: EmployeeDataType = {
      id: _id,
      ...temp,
      created: date_format,
      rol: temp.rol === 'administrator' ? 'Administrador' : 'Empleado',
    };

    return dataFormat;
  });

  return {
    employees,
    totalPages: response.data.totalPages,
  };
}

async function getById(
  id: string,
  bearerToken: string,
): Promise<EmployeeDataType> {
  const response = await MediclarApi.get<EmployeeRequestResponse>(
    'btb-employees/' + id,
    {
      headers: { Authorization: 'Bearer ' + bearerToken },
    },
  );

  const new_date = new Date(response.data.createdAt); // iso
  const date_tz = utcToZonedTime(new_date, 'America/Mexico_City');
  const date_format = format(date_tz, 'dd/MM/yyyy');

  return {
    id: response.data._id,
    ...response.data,
    created: date_format,
    rol: response.data.rol === 'administrator' ? 'Administrador' : 'Empleado',
  };
}

type SingleRegisterBody = {
  companyId: string;
  branchId: string;
  rol: string;
  firstName: string;
  middleName: string;
  lastName: string;
  birthday: string;
  gender: string;
  phoneNumber: string;
  email: string;
};

type SingleRegisterResponse = {
  created: boolean;
  message: string;
  user: EmployeeRequestResponse;
};

type RegisterUserDataType = {
  created: boolean;
  message: string;
  employee: EmployeeDataType;
};

async function singleRegister(
  body: SingleRegisterBody,
  bearerToken: string,
): Promise<RegisterUserDataType> {
  const response = await MediclarApi.post<SingleRegisterResponse>(
    'btb-employees/single',
    { ...body },
    {
      headers: { Authorization: 'Bearer ' + bearerToken },
    },
  );

  return {
    created: response.data.created,
    message: response.data.message,
    employee: {
      id: response.data.user._id,
      ...response.data.user,
      created: response.data.user.createdAt,
      rol:
        response.data.user.rol === 'administrator'
          ? 'Administrador'
          : 'Empleado',
    },
  };
}

async function multipleRegister(
  file: any,
  companyId: string,
  bearerToken: string,
): Promise<RegisterUserDataType[]> {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('companyId', companyId);

  const response = await MediclarApi.post<SingleRegisterResponse[]>(
    'btb-employees/multiple',
    formData,
    {
      headers: {
        Authorization: 'Bearer' + bearerToken,
        'content-type': 'multipart/form-data',
      },
    },
  );

  const data: RegisterUserDataType[] = response.data.map((temp) => {
    const { created, message, user } = temp;

    const new_date = new Date(user.createdAt); // iso
    const date_tz = utcToZonedTime(new_date, 'America/Mexico_City');
    const date_format = format(date_tz, 'dd/MM/yyyy');

    return {
      created: created,
      message: message,
      employee: {
        id: user._id,
        ...user,
        created: date_format,
        rol: user.rol === 'administrator' ? 'Administrador' : 'Empleado',
      },
    };
  });

  return data;
}

type UpdateBody = {
  branchId: string;
  rol: string;
  firstName: string;
  middleName: string;
  lastName: string;
  birthday: string;
  gender: string;
  phoneNumber: string;
  email: string;
  companyId: string; // jms
};

async function updateById(
  id: string,
  body: UpdateBody,
  bearerToken: string,
): Promise<void> {
  await MediclarApi.patch<EmployeeRequestResponse>(
    'btb-employees/' + id,
    { ...body },
    {
      headers: { Authorization: 'Bearer ' + bearerToken },
    },
  );
}

async function deleteById(id: string, bearerToken: string): Promise<void> {
  await MediclarApi.delete<EmployeeRequestResponse>('btb-employees/' + id, {
    headers: { Authorization: 'Bearer ' + bearerToken },
  });
}

type CampaignsUserDataType = {
  _id: string;
  branchName: string;
  campaignName: string;
  campaignDate: string;
};

async function getCampaigns(
  userId: string,
  perPage: number,
  page: number,
  bearerToken: string,
): Promise<{ campaigns: CampaignsUserDataType[]; totalPages: number }> {
  const response = await MediclarApi.get<any>(
    'btb-employees/' +
      userId +
      '/campaigns' +
      '?perPage=' +
      perPage +
      '&page=' +
      page,
    {
      headers: { Authorization: 'Bearer ' + bearerToken },
    },
  );

  const campaigns = response.data.campaigns.map((temp: any) => {
    const { _id, branchName, campaignName, campaignDate } = temp;

    const new_date = new Date(campaignDate); // iso
    const date_tz = utcToZonedTime(new_date, 'America/Mexico_City');
    const date_format = format(date_tz, 'dd/MM/yyyy');

    return {
      _id,
      branchName,
      campaignName,
      campaignDate: date_format,
    };
  });

  return {
    campaigns,
    totalPages: response.data.totalPages,
  };
}

export const employeeServices = {
  getByCompany,
  getByBranch,
  getById,
  singleRegister,
  multipleRegister,
  updateById,
  deleteById,
  getCampaigns,
};
