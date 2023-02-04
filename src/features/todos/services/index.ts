import qs from 'qs';

import { ITodo, ITodoQueryParams } from 'src/features/todos';
import { HTTPClient } from 'src/libraries';
import { IPagingResult, IdType } from 'src/utilities';

class TodoAPI extends HTTPClient {
  private static classInstance: TodoAPI;

  protected constructor() {
    super(`${import.meta.env.VITE_APP_SERVER_BASE_URL}/todos`);
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new TodoAPI();
    }

    return this.classInstance;
  }

  async createTodo(
    newTodo: Omit<ITodo, 'id' | 'user' | 'createdAt' | 'updatedAt'> | null,
  ): Promise<IdType> {
    const res: IdType = await this.axiosInstance({
      method: 'POST',
      url: '/',
      data: newTodo,
    });

    return res;
  }

  async getTodo(id: IdType): Promise<ITodo> {
    const res: ITodo = await this.axiosInstance({
      method: 'GET',
      url: `/${id}`,
    });

    return res;
  }

  async getTodos(options: ITodoQueryParams): Promise<IPagingResult<ITodo>> {
    const queryString = qs.stringify(options, { arrayFormat: 'repeat' });

    const res: IPagingResult<ITodo> = await this.axiosInstance({
      method: 'GET',
      url: `/?${queryString}`,
    });

    return res;
  }

  async updateTodo(
    id: IdType,
    updatedTodo: Omit<ITodo, 'id' | 'user' | 'createdAt' | 'updatedAt'>,
  ): Promise<boolean> {
    const res: boolean = await this.axiosInstance({
      method: 'PATCH',
      url: `/${id}`,
      data: updatedTodo,
    });

    return res;
  }

  async deleteManyTodos(ids: IdType[]): Promise<boolean> {
    const res: boolean = await this.axiosInstance({
      method: 'POST',
      url: '/delete',
      data: { ids },
    });

    return res;
  }

  async deleteOneTodo(id: IdType): Promise<boolean> {
    const res: boolean = await this.axiosInstance({
      method: 'DELETE',
      url: `/${id}`,
    });

    return res;
  }
}

export default TodoAPI;
