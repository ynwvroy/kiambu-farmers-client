import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const userToken = useCookie('access_token');

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  code?: string;
}

export const Authentication = async <T>(
  url: string,
  data: any,
  options?: AxiosRequestConfig,
  onResponseError?: (error: AxiosError) => void
): Promise<AxiosResponse<ApiResponse<T>>> => {
  const runtimeConfig = useRuntimeConfig();

  try {
    const response = await axios({
      url: url,
      method: data?.method || "POST",
      baseURL: runtimeConfig.public.authBaseURL,
      headers: {
        ...(options?.headers || {}),
      },
      data: data?.data,
      ...options,
    });

    return response;
  } catch (error: any) {
    console.error(error);
    if (onResponseError) {
      onResponseError(error);
    }
    if (axios.isAxiosError(error) && error.response) {
      return error.response as AxiosResponse<ApiResponse<T>>;
    }
    throw error;
  }
};

export const useApi = async <T>(
  url: string,
  data: any,
  options?: AxiosRequestConfig,
  onResponseError?: (error: AxiosError) => void
): Promise<ApiResponse<T>> => {
  const runtimeConfig = useRuntimeConfig();
  const userToken = useCookie('access_token');

  try {
    const response = await axios({
      url: url,
      method: data?.method || "POST",
      baseURL: runtimeConfig.public.apiBaseURL,
      headers: {
        ...(options?.headers || {}),
        Authorization: userToken ? `Bearer ${userToken.value}` : '', // Include bearer token if available
      },
      data: data?.data,
      ...options,
    });

    return response.data;
  } catch (error: any) {
    console.error(error);
    if (onResponseError) {
      onResponseError(error);
    }
    if (axios.isAxiosError(error) && error.response) {
      return error.response as AxiosResponse<ApiResponse<T>>;
    }
    throw error;
  }
};
