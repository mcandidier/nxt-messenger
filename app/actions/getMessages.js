import API from "../libs/api";

const getMessages = async (messageId) => {
    const url =  `conversations/${messageId}/messages/`;
    const resp =  await API.get(url);
    const data = await resp.data;
    return { data }
}


export default getMessages