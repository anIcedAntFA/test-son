import { IUser } from 'src/features/authentication';
import { TODO_CATEGORY_STATE, TODO_IMPORTANT_STATE, TODO_STATUS_STATE } from 'src/features/todos';
import { IQueryParams, IdType, OrderBy } from 'src/types';

export interface ITodo {
  id: IdType;
  title: string;
  content: string;
  category: TodoCategoryStateType;
  status: TodoStatusStateType;
  isImportant: boolean;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
}

export interface ITodoOption {
  title: string;
  value: string | boolean;
  color?: string;
}

export interface ITodoFilter {
  isImportant: TodoImportantStateType;
  category: TodoCategoryStateType[];
  status: TodoStatusStateType[];
  startDate: Date;
  endDate: Date;
}

export interface ITodoSorting {
  sortBy: keyof ITodo;
  orderBy: OrderBy;
}

export interface ITodoPagination {
  currentPage: number;
  pageSize: number;
}

export interface ITodoQueryParams extends IQueryParams<ITodo> {
  isImportant: boolean | undefined;
  category: TodoCategoryStateType[];
  status: TodoStatusStateType[];
  startDate: Date;
  endDate: Date;
}

export type TodoImportantStateType = typeof TODO_IMPORTANT_STATE[keyof typeof TODO_IMPORTANT_STATE];

export type TodoCategoryStateType = typeof TODO_CATEGORY_STATE[keyof typeof TODO_CATEGORY_STATE];

export type TodoStatusStateType = typeof TODO_STATUS_STATE[keyof typeof TODO_STATUS_STATE];
