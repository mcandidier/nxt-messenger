import API from "../libs/api";


export const getCurrentUser = async () => {
  const resp = await API.get('accounts/user/');
  return {
    data: await resp.data
  } 
}