import { paginationStorage } from '../utils/pagination';
import instance from './index';

export type TComment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export class CommentsApi {
  static async getComments(start?: number, limit?: number) {
    try {
      const queries = paginationStorage.setPaginationQueries(start, limit);
      const { data } = await instance.get<TComment[]>(
        'comments'.concat(queries)
      );
      return data;
    } catch (e) {
      throw e;
    }
  }
  static async getComment(id: string) {
    try {
      const { data } = await instance.get<TComment>('comments/'.concat(id));
      return data;
    } catch (e) {
      throw e;
    }
  }
}
