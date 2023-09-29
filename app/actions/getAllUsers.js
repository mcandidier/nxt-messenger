import API from "../libs/api";
import { setUsers  } from "../redux/accounts";

import { useDispatch } from "react-redux";

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