type FormErrorField = {
  errors: string[];
  name: string[];
  warning: string[];
};

export type FormTypes<T> = {
  values: T;
  errorFields?: T[];
  outOfDate?: boolean;
} & T;

export type UserFormFields = {
  name: string;
  username: string;
  email: string;
  address_street: string;
  address_suite: string;
  address_city: string;
  address_zipcode: string;
  phone: string;
  website: string;
  company_name: string;
  company_catchPhrase: string;
  company_bs: string;
};

export type TodoFormFields = {
  title: string;
  completed: boolean;
};

export type LoginFormFields = {
  email: string;
  password: string;
  remember: boolean;
};

export type RegistrationFormFields = {
  agreement: boolean;
  confirm: string;
  email: string;
  password: string;
  username: string;
};
