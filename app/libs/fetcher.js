import useSWR from 'swr';
import API from '../API';

export const fetcher = url => API.get(url).then(res=> res.data);


export const SWRfallback = () => {
    return {
        data: null,
        mutate: () => {}, // Placeholder function
        isLoading: false,
        error: null,
    }
};