import API from "../API"
import useSWR from 'swr'


import { fetcher, SWRfallback } from "../libs/fetcher"


export const useLatestMessage = (conversationId) => {
  const {data, mutate, isLoading, error} = useSWR(`conversations/${conversationId}/latest/`, fetcher);
  return {
    data,
    mutate,
    isLoading,
    error
  }
}


export default useLatestMessage;