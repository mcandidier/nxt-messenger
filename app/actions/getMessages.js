import API from "../libs/api";
import {notFound} from "next/navigation"


const getMessages = async (messageId) => {
  try {
    const url =  `conversations/${messageId}/messages/`;
    const resp =  await API.get(url);
    const data = await resp.data;
    return { data }
  } catch(error) {
    return notFound();
  }
}


export default getMessages