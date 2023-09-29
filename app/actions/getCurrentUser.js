import API from "../libs/api";

export const getCurrentUser = async () => {
  try {
    const resp = await API.get('accounts/user/');
    return {
      data: await resp.data
    } 
  } catch (err) {
    console.log('errror>>>>', err)
  }
}
