import axios from 'axios';

const URL_BASE = process.env.API_URL_BASE;

type GetDefaultChallengeDataTypeRequestResponse = {
  name: string;
  description: string;
  duration: string;
};

export type DefaultChallengeDataType = {
  name: string;
  description: string;
  duration: string;
}[];

export async function getAllDefaultChallenges(
  token: string,
): Promise<DefaultChallengeDataType> {
  try {
    let challengeData;

    let response = await axios.get<DefaultChallengeDataType>(
      URL_BASE + '/defaultChallenges/',
      { headers: { Authorization: 'Bearer ' + token } },
    );
    console.log('Respuesta de la API default challenges:', response.data);

    return (challengeData = response.data ? response.data : []);
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
}

export const defaultChallengesService = {
  getAllDefaultChallenges,
};