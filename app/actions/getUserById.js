import API from "../API";

const getUserById = (id) => {
  return API.get(`accounts/user/${id}`);
}

export default getUserById;

