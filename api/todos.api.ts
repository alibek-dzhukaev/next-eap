import instance from './index';
import { paginationStorage } from '../utils/pagination';

export type TTodo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type CreateTodoDto = {
  title: string;
  completed: boolean;
};

export class TodosApi {
  static async createTodo(dto: CreateTodoDto) {
    try {
      const { data } = await instance.post<TTodo>('todos', dto);
      return data;
    } catch (e) {
      throw e;
    }
  }
  static async getTodos(start?: number, limit?: number) {
    try {
      const queries = paginationStorage.setPaginationQueries(start, limit);
      const { data } = await instance.get<TTodo[]>('todos'.concat(queries));
      return data;
    } catch (e) {
      throw e;
    }
  }
  static async getTodo(id: string) {
    try {
      const { data } = await instance.get<TTodo>('todos/'.concat(id));
      return data;
    } catch (e) {
      throw e;
    }
  }
}
