import { UserFormFields } from './types';
import { CreateUserDto } from '../api/users.api';

class User {
  userBodyForRequest(payload: UserFormFields): CreateUserDto {
    return {
      address: {
        city: payload.address_city,
        street: payload.address_street,
        suite: payload.address_suite,
        zipcode: payload.address_zipcode,
      },
      company: {
        bs: payload.company_bs,
        catchPhrase: payload.company_catchPhrase,
        name: payload.company_name,
      },
      email: payload.email,
      username: payload.username,
      phone: payload.phone,
      website: payload.website,
      name: payload.name,
    };
  }
}

export const user = new User();
