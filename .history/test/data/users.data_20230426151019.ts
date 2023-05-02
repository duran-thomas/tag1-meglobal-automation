//Storing user login data
export interface User {
    username: string;
    password: string;
  }
  
  export const users: User[] = [
    {
      username: 'valid_username',
      password: 'valid_password',
    },
    {
      username: 'invalid_username',
      password: 'invalid_password',
    },
  ];
  