//Storing user login data
export default interface User {
    username: string;
    password: string;
  }
  
  export const users: User[] = [
    {
        username: 'meda2022',
        password: 'meda2022'
    },
    {
      username: 'test-content-administrator',
      password: 'meda2022',
    },
    {
      username: 'invalid_username',
      password: 'invalid_password',
    },
  ];
  