import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { getToken, showToastMessage } from 'src/utilities';
import { EToastMessage, IResultResponse } from 'src/types';

declare module 'axios' {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

abstract class HTTPClient {
  protected readonly axiosInstance: AxiosInstance;

  public constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 16000,
      // headers: {
      //   'Content-Type': 'application/json',
      // },
    });

    this._initializeRequestInterceptor();

    this._initializeResponseInterceptor();
  }

  private _initializeRequestInterceptor() {
    this.axiosInstance.interceptors.request.use(this._handleRequests, this._handleErrors);
  }

  private _initializeResponseInterceptor() {
    this.axiosInstance.interceptors.response.use(this._handleResponses, this._handleErrors);
  }

  private _handleRequests<T>(config: AxiosRequestConfig): AxiosRequestConfig<T> {
    config.headers = {
      ...(getToken() && {
        Authorization: `Bearer ${getToken()}`,
      }),
    };
    return config;
  }

  private _handleResponses<T>({ data }: AxiosResponse<IResultResponse<T>>) {
    return data.result;
  }

  private _handleErrors(error: any) {
    if (error.response.status === 401) {
      showToastMessage(error.message, EToastMessage.error);
    }

    return Promise.reject(error);
  }
}

export default HTTPClient;
