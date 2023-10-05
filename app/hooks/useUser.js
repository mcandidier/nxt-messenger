import useSWR from 'swr'
import API from "../API"
import { fetcher, SWRfallback } from "../libs/fetcher"
import { parseCookies } from 'nookies';


export const useUserHook = () => {
    const cookies = parseCookies();
    const token = cookies.token;
    const {data, mutate, isLoading, error} = useSWR('accounts/user/', fetcher);

    return {
        data,
        mutate,
        isLoading,
        error
    }
}

export const useGetUser = (pk) => {
    try {
        const {data, mutate, isLoading, error} = useSWR(`accounts/user/${pk}/`, fetcher);
        return {
            data,
            mutate,
            error,
            isLoading,
        }
    }  catch (err) {
        console.log(err, 'err')
        return {
            data: null,
            mutate: () => {}, // Placeholder function
            isLoading: false,
            error: null,
        }
    }

}