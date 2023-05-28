import instance from './index';
import { paginationStorage } from '../utils/pagination';

export type TPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export class PostsApi {
  static async getPosts(start?: number, limit?: number) {
    try {
      const queries = paginationStorage.setPaginationQueries(start, limit);
      const { data } = await instance.get<TPost[]>('posts'.concat(queries));
      return data;
    } catch (e) {
      throw e;
    }
  }
  static async getPost(id: string) {
    try {
      const { data } = await instance.get<TPost>(`posts/${id}`);
      return data;
    } catch (e) {
      throw e;
    }
  }
}
