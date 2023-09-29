import API from "../API";

const createConversation = (data) => {
  return API.post('conversations/', data);
} 

export default createConversation