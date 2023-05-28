import instance from './index';

export type TAuth = {
  token: string;
};

export type RegistrationDto = {
  username: string;
  email: string;
  password: string;
};

export type LoginDto = {
  email: string;
  password: string;
};

export class AuthAPi {
  static async login(dto: LoginDto) {
    try {
      const { data } = await instance.post<TAuth>('auth/login', dto);
      return data;
    } catch (e) {
      throw e;
    }
  }

  static async register(dto: RegistrationDto) {
    try {
      const { data } = await instance.post<TAuth>('auth/registration', dto);
      return data;
    } catch (e) {
      throw e;
    }
  }
}
