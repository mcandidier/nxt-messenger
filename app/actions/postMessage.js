import API from "../API";

const postMessage = (messageId, data) => {
  return API.post(`conversations/${messageId}/messages/`, data);
}

export default postMessage;