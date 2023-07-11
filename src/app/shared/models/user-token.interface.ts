export interface UserToken {
  accessToken: string;
  user: User;
}
export interface User {
  id: string;
  name: string;
  email: string;
}
export interface UserRegistration {
  name: string;
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export const DEFAULT_USER_TOKEN: UserToken = {
  accessToken: '',
  user: {
    id: '',
    name: '',
    email: '',
  },
};
