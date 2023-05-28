import instance from './index';
import { paginationStorage } from '../utils/pagination';

export type TAlbum = {
  userId: number;
  id: number;
  title: string;
};

export class AlbumsApi {
  static async getAlbums(start?: number, limit?: number) {
    try {
      const queries = paginationStorage.setPaginationQueries(start, limit);
      const { data } = await instance.get<TAlbum[]>('albums'.concat(queries));
      return data;
    } catch (e) {
      throw e;
    }
  }
  static async getAlbum(id: string) {
    try {
      const { data } = await instance.get<TAlbum>('albums/'.concat(id));
      return data;
    } catch (e) {
      throw e;
    }
  }
}
