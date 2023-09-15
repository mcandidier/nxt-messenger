import useSWR from 'swr'
import API from "../API"
import { fetcher, SWRfallback } from "../libs/fetcher"
import { parseCookies } from 'nookies';

import { useParams } from "next/navigation";
import { useMemo } from "react";

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


export const useConversation = () => {
  const params = useParams();

  const conversationId = useMemo(() => {
    if (!params?.messageId) {
      return '';
    }

    return params.messageId;
  }, [params?.messageId]);


  const isSelected = useMemo(() => !!conversationId, [conversationId])
  return useMemo(() => ({
    isSelected,
    conversationId
  }), [conversationId]);
};

