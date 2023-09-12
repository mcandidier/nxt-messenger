import useSWR from 'swr'
import API from "../API"
import { fetcher, SWRfallback } from "../libs/fetcher"
import { parseCookies } from 'nookies';


export const useUserHook = () => {
    const cookies = parseCookies();
    const token = cookies.token;

    if(!token) {
        return SWRfallback;
    }

    const {data, mutate, isLoading, error} = useSWR('accounts/user/', fetcher);

    return {
        data,
        mutate,
        isLoading,
        error
    }
}

export const useGetUser = (pk) => {
    if(!pk) {
        return SWRfallback;
    }

    const {data, mutate, isLoading, error} = useSWR(`accounts/user/${pk}/`, fetcher);

    return {
        data,
        mutate,
        error,
        isLoading,
    }
}