import useSWR from 'swr'
import API from "../API"
import { fetcher, SWRfallback } from "../libs/fetcher"
import { parseCookies } from 'nookies';

export const useConversationsHook = () => {

    const {data, mutate, isLoading, error} = useSWR('conversations/', fetcher);

    return {
        data,
        mutate,
        isLoading,
        error
    }
}


export const useConversationMessages = (conversationId) => {
  const {data, mutate, isLoading, error} = useSWR(`conversations/${conversationId}/messages/`, fetcher);
  return {
    data,
    mutate,
    isLoading,
    error
  }
}