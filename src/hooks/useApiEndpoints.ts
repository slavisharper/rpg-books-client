import { useMemo } from "react";
import useEnvironment from "./useEnvironment";

export type EndpointAccess = "public" | "authenticated";

export type EndpointType = "GET" | "POST" | "PUT" | "DELETE";

export type Endpoint = {
  type: EndpointType;
  url: string;
  access: EndpointAccess;
};

export type FileEndpoint = Endpoint & {
  fileName: string;
  mimeType: string;
  type: "GET";
};

export type AccountEndpoints = {
  accountDetailsEndpoint: Endpoint;
  updateAccountDetailsEndpoint: Endpoint;
  registerEndpoint: Endpoint;
  loginEndpoint: Endpoint;
  refreshTokenEndpoint: Endpoint;
  resetPasswordEndpoint: Endpoint;
  confirmEmailEndpoint: Endpoint;
  changePasswordEndpoint: Endpoint;
};

export type ApiEndpoints = {
  accountEndpoints: AccountEndpoints;
};

const useApiEndpoints = () => {
    const environment = useEnvironment();

    const endpoints: ApiEndpoints = useMemo(() => {
        return {
            accountEndpoints: {
                accountDetailsEndpoint: {
                    type: "GET",
                    url: `${environment.ApiUrl}/api/account`,
                    access: "authenticated",
                },
                updateAccountDetailsEndpoint: {
                    type: "PUT",
                    url: `${environment.ApiUrl}/api/account`,
                    access: "authenticated",
                },
                registerEndpoint: {
                    type: "POST",
                    url: `${environment.ApiUrl}/api/account`,
                    access: "public",
                },
                loginEndpoint: {
                    type: "POST",
                    url: `${environment.ApiUrl}/api/account/login`,
                    access: "public",
                },
                refreshTokenEndpoint: {
                    type: "POST",
                    url: `${environment.ApiUrl}/api/account/refresh-token`,
                    access: "public",
                },
                resetPasswordEndpoint: {
                    type: "POST",
                    url: `${environment.ApiUrl}/api/account/reset-password`,
                    access: "public",
                },
                confirmEmailEndpoint: {
                    type: "POST",
                    url: `${environment.ApiUrl}/api/account/confirm-email`,
                    access: "public",
                },
                changePasswordEndpoint: {
                    type: "POST",
                    url: `${environment.ApiUrl}/api/account/change-password`,
                    access: "authenticated",
                },
            },
        };
    }, []);

    return endpoints;
};

export default useApiEndpoints;