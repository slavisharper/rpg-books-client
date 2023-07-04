import { useMemo } from "react";
import useAppStore from "./useAppStore";

const TokenAccessKeys = {
  AuthTokenKey: "authTokenValue",
  RefreshTokenKey: "refreshTokenValue",
};

export type SessionStore = {
  getAuthToken: () => Promise<Token | undefined>;
  saveAuthToken: (token: Token) => Promise<void>;
  deleteAuthToken: () => Promise<void>;
  getRefreshToken: () => Promise<Token | undefined>;
  saveRefreshToken: (token: Token) => Promise<void>;
  deleteRefreshToken: () => Promise<void>;
};

export type Token = {
  value: string;
  expirationTime: string;
};

const useSessionStore = (): SessionStore => {
  const appStore = useAppStore();
  const sessionStore: SessionStore = useMemo(() => {
    return {
      getAuthToken: async () => {
        return await appStore.getValue<Token>(TokenAccessKeys.AuthTokenKey);
      },
      saveAuthToken: async (token: Token) => {
        await appStore.setValue(TokenAccessKeys.AuthTokenKey, token);
      },
      deleteAuthToken: async () => {
        await appStore.deleteValue(TokenAccessKeys.AuthTokenKey);
      },
      getRefreshToken: async () => {
        return await appStore.getValue<Token>(TokenAccessKeys.RefreshTokenKey);
      },
      saveRefreshToken: async (token: Token) => {
        await appStore.setValue(TokenAccessKeys.RefreshTokenKey, token);
      },
      deleteRefreshToken: async () => {
        await appStore.deleteValue(TokenAccessKeys.RefreshTokenKey);
      },
    };
  }, []);

  return sessionStore;
};

export default useSessionStore;