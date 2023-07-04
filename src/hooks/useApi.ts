import { useMemo } from "react";
import { Endpoint, EndpointAccess, FileEndpoint } from "./useApiEndpoints";
import useEnvironment from "./useEnvironment";
import useSessionStore from "./useSessionStore";

type BaseResponse = {
  message: string;
  success: boolean;
};

export type ResultResponse<TData> = BaseResponse & {
  data?: TData;
  errors?: ResultError[];
};

export type ResultError = {
  key: string;
  errorMessages: string[];
};

export type ListResponse<TListItem> = BaseResponse & {
  page: number;
  pageSize: number;
  items: TListItem[];
};

export type Api = {
  call: <TResponse extends BaseResponse>(
    endpoint: Endpoint,
    body?: object | null,
    abortController?: AbortController | null
  ) => Promise<TResponse>;
};

const useApi = (): Api => {
  const sessionStore = useSessionStore();
  const { IsDevelopment } = useEnvironment();

  const api: Api = useMemo(() => {
    const constructHeaders = async (access: EndpointAccess) => {
      const headers: HeadersInit = { "Content-Type": "application/json" };
      if (access === "authenticated") {
        const authToken = await sessionStore.getAuthToken();
        headers.Authorization = `Bearer ${authToken?.value}`;
      }

      return headers;
    };

    const callApi = async <TResponse extends BaseResponse>(
      endpoint: Endpoint,
      body?: object | null,
      abortController?: AbortController | null
    ): Promise<TResponse> => {
      try {
        const headers = await constructHeaders(endpoint.access);
        const requestBody =
          endpoint.type !== "GET" ? JSON.stringify(body) : null;

        IsDevelopment && console.log("Calling API: " + endpoint.url);
        const response = await fetch(endpoint.url, {
          method: endpoint.type,
          headers: headers,
          body: requestBody,
          signal: abortController?.signal,
        });

        IsDevelopment && console.log(`Response ${response.status}`);
        if (response.status === 401) {
          return {
            success: false,
            message: "Unauthorised access.",
          } as TResponse;
        }

        const responseData = (await response.json()) as TResponse;
        if (!responseData) {
          IsDevelopment && console.error("Reading API response failed!");
          throw new Error("Reading API response failed!");
        }

        responseData.success = response.ok;
        responseData.message = responseData.message || response.statusText;

        IsDevelopment &&
          console.log(`Api returned: ${JSON.stringify(responseData)}`);
        return responseData;
      } catch (error) {
        IsDevelopment && console.error("Calling the API failed!");
        IsDevelopment && console.error(JSON.stringify(error));
        return Promise.reject("Calling the API Failed");
      }
    };

    return { call: callApi };
  }, [sessionStore]);
  return api;
};

export default useApi;
