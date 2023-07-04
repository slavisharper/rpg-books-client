import {useMemo} from 'react';
import { Capacitor } from '@capacitor/core';

export type EnvironmentVariables = {
  ApiUrl: string;
  ClientUrl: string;
  IsDevelopment: boolean;
};

const devEnvironment: EnvironmentVariables = {
  ApiUrl:
    'https://localhost:7207',
  ClientUrl:
    'https://localhost:8100',
  IsDevelopment: true,
};

const liveEnvironment: EnvironmentVariables = {
  ApiUrl:
    'https://tacpac-api-staging.blackcliff-9219511f.uksouth.azurecontainerapps.io',
  ClientUrl:
    'https://tacpac-client-staging.blackcliff-9219511f.uksouth.azurecontainerapps.io',
  IsDevelopment: false,
};

const useEnvironment = (): EnvironmentVariables => {
  const env = useMemo(() => {
    return Capacitor.isNativePlatform() ? liveEnvironment : devEnvironment;
  }, []);

  return env;
};

export default useEnvironment;
