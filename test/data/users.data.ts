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
      username: 'test-content-administrator',
      password: 'meda2023',
    },
    invalidAdmin: {
      username: 'invalid_username',
      password: 'invalid_password',
    },
    bypassUrl: `https://meda2022:meda2022@meglobalode7.prod.acquia-sites.com/`
  };
  