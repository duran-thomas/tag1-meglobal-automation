//Storing user login data
export interface User {
    username: string;
    password: string;
  }
  
  export const users = {
    browserUser: {
      username: 'meda2022',
      password: 'meda2022'
    },
    validAdmin: {
      username: 'admin',
      password: 'meda2022',
    },
    invalidAdmin: {
      username: 'invalid_username',
      password: 'invalid_password',
    },
  };
  