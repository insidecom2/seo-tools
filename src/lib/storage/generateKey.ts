import Http from "@/src/utils/http";

export const generateKeyStorage = async () => {
  const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_ENDPOINT}:${process.env.NEXT_PUBLIC_API_PORT}/`;
  const tokenResponse = await Http.get(`${API_ENDPOINT}token/generate`);
  return tokenResponse.data;
};
