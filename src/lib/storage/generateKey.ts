import Http from "@/src/utils/http";

export const generateKeyStorage = async () => {
  const tokenResponse = await Http.get(`/api/token/generate`);
  return tokenResponse.data.data;
};
