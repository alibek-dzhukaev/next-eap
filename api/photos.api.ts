import instance from './index';
import { paginationStorage } from '../utils/pagination';

export type TPhoto = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export class PhotosApi {
  static async getPhotos(start?: number, limit?: number) {
    try {
      const queries = paginationStorage.setPaginationQueries(start, limit);
      const { data } = await instance.get<TPhoto[]>('photos'.concat(queries));
      return data;
    } catch (e) {
      throw e;
    }
  }
  static async getPhoto(id: string) {
    try {
      const { data } = await instance.get<TPhoto[]>('photos/'.concat(id));
      return data;
    } catch (e) {
      throw e;
    }
  }
}
