import { parseCookies } from 'nookies';

export const getToken = () => {
  const cookies = parseCookies();
  const token = cookies.token;

  return {
    token
  }
}

export default getToken;