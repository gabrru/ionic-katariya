import storage from "../utils/storage";


const ACCESS_TOKEN_KEY = "__KTR__";

export const getAccessToken = (): string => storage.get(ACCESS_TOKEN_KEY);

export const setAccessToken = (accessToken: string): void =>
  storage.set(ACCESS_TOKEN_KEY, accessToken);
