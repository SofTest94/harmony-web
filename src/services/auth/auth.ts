import MediclarApi from '../config';

type LoginRequestBody = {
  username: string;
  password: string;
};

type LoginRequestResponse = {
  id: string;
  access_token: string;
  token_expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
};

type LoginDataType = {
  id: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

async function login(body: LoginRequestBody): Promise<LoginDataType | null> {
  try {
    let response = await MediclarApi.post<LoginRequestResponse>(
      '/auth/enterprise/signin',
      { ...body },
    );

    const session_data = response.data;

    let token_expires = new Date();
    token_expires.setTime(
      token_expires.getTime() + session_data.token_expires_in * 1000,
    );

    let refresh_token_expires = new Date();
    refresh_token_expires.setTime(
      refresh_token_expires.getTime() +
        session_data.refresh_token_expires_in * 1000,
    );

    return {
      id: session_data.id,
      accessToken: session_data.access_token,
      refreshToken: session_data.refresh_token,
      expiresIn: token_expires.getTime(),
    };
  } catch (e) {
    return null;
  }
}

async function refreshToken(
  bearerToken: string,
): Promise<LoginDataType | null> {
  try {
    let response = await MediclarApi.post<LoginRequestResponse>(
      '/auth/enterprise/refreshToken',
      {},
      {
        headers: { Authorization: 'Bearer ' + bearerToken },
      },
    );

    const session_data = response.data;

    let token_expires = new Date();
    token_expires.setTime(
      token_expires.getTime() + session_data.token_expires_in * 1000,
    );

    let refresh_token_expires = new Date();
    refresh_token_expires.setTime(
      refresh_token_expires.getTime() +
        session_data.refresh_token_expires_in * 1000,
    );

    return {
      id: session_data.id,
      accessToken: session_data.access_token,
      refreshToken: session_data.refresh_token,
      expiresIn: token_expires.getTime(),
    };
  } catch (e) {
    return null;
  }
}

async function requestResetPassword(email: string): Promise<void> {
  await MediclarApi.post('/auth/enterprise/requestResetPassword', {
    email,
  });

  return;
}

type ResetPasswordRequestBody = {
  user: string;
  token: string;
  password: string;
};

async function resetPassword(data: ResetPasswordRequestBody): Promise<void> {
  await MediclarApi.post<LoginRequestResponse>(
    '/auth/enterprise/resetPassword',
    data,
  );
}

type UpdatePasswordRequestBody = {
  password: string;
  newPassword: string;
};

async function updatePassword(
  body: UpdatePasswordRequestBody,
  bearerToken: string,
): Promise<LoginDataType> {
  let response = await MediclarApi.post<LoginRequestResponse>(
    '/auth/enterprise/updatePassword',
    body,
    {
      headers: { Authorization: 'Bearer ' + bearerToken },
    },
  );

  const session_data = response.data;

  let token_expires = new Date();
  token_expires.setTime(
    token_expires.getTime() + session_data.token_expires_in * 1000,
  );

  let refresh_token_expires = new Date();
  refresh_token_expires.setTime(
    refresh_token_expires.getTime() +
      session_data.refresh_token_expires_in * 1000,
  );

  return {
    id: session_data.id,
    accessToken: session_data.access_token,
    refreshToken: session_data.refresh_token,
    expiresIn: token_expires.getTime(),
  };
}

type GetUserRequestResponse = {
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    verification: boolean;
    verificationMethod: string;
  };
  company: {
    id: string;
    name: string;
    logo: string;
    contact: string;
    emailContact: string;
    phoneNumberContact: string;
  };
};

export type UserDataType = {
  id: string;
  name: string;
  username: string;
  verification: boolean;
  verificationMethod: string;
};

export type CompanyDataType = {
  id: string;
  name: string;
  contact: string;
  emailContact: string;
  phoneNumberContact: string;
  logo: string;
};

async function getUserData(
  id: string,
  bearerToken: string,
): Promise<{ user: UserDataType; company: CompanyDataType } | null> {
  try {
    let response = await MediclarApi.get<GetUserRequestResponse>(
      '/auth/enterprise/administrator/' + id,
      { headers: { Authorization: 'Bearer ' + bearerToken } },
    );
    const { user, company } = response.data;

    return { user, company };
  } catch (e) {
    return null;
  }
}

export const authServices = {
  login,
  refreshToken,
  requestResetPassword,
  resetPassword,
  updatePassword,
  getUserData,
};
