import instance from './index';
import { paginationStorage } from '../utils/pagination';

export type TUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export type CreateUserDto = {
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

export class UsersApi {
  static async createUser(body: CreateUserDto) {
    try {
      await instance.post<TUser>('users', body);
      return { message: 'User created' };
    } catch (e) {
      throw e;
    }
  }

  static async getUsers(start?: number, limit?: number) {
    try {
      const queries = paginationStorage.setPaginationQueries(start, limit);
      const { data } = await instance.get<TUser[]>('users'.concat(queries));
      return data;
    } catch (e) {
      throw e;
    }
  }

  static async getUser(id: string) {
    try {
      const { data } = await instance.get<TUser>('users/'.concat(id));
      return data;
    } catch (e) {
      throw e;
    }
  }
}
