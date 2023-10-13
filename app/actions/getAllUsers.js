import API from "../libs/api";

const getAllUsers = async () => {
  try {
    const resp = await API.get('accounts/users/');
    const data = await resp.data;
    return {data}
  } catch(error) {
    console.log(error)
  }
}

export default getAllUsers