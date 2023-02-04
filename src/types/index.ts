import { ToastOptions } from 'react-toastify';

import { ASC, DESC } from 'src/constants';

// export type Nullable<T> = { [K in keyof T]: T[K] | null };

export interface IResultResponse<T> {
  result: T;
}
export interface IPagingResult<T> {
  data: T[];
  previousPage: number;
  currentPage: number;
  nextPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface IQueryParams<T> {
  search: string | undefined;
  sortBy: keyof T;
  orderBy: OrderBy;
  currentPage: number;
  pageSize: number;
}

export interface IFormMode {
  isPreviewed: boolean;
  isEdited: boolean;
}

export type OrderBy = typeof ASC | typeof DESC;

export type IdType = NonNullable<string | number | undefined>;

export type ToastMessageType = ToastOptions<{}> | undefined;

export enum EToastMessage {
  'success',
  'info',
  'warning',
  'error',
}

export enum EFormMode {
  'add',
  'preview',
  'edit',
}

export enum EConfirmDelete {
  'one',
  'many',
}

export enum EThemeMode {
  'light',
  'dark',
}

export enum EUserRole {
  'admin',
  'user',
}

export enum EViewMode {
  'table',
  'grid',
}
