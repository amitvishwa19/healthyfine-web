import qs from "query-string";
//import { useSocket } from "@/providers/socket-provider"
import { useInfiniteQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { OrgContext } from "@/providers/OrgProvider";



export const useChatQuery = ({ queryKey, apiUrl, paramKey, paramValue }) => {
    //const { isConnected } = useSocket();
    const { server, setChatMessages, chatMessages, fetchChatMessages } = useContext(OrgContext)


    const fetchMessages = async ({ pageParam = undefined }) => {
        const url = qs.stringifyUrl({
            url: apiUrl,
            query: {
                cursor: pageParam,
                [paramKey]: paramValue,
            }
        }, { skipNull: true });
        const res = await fetch(url);
        return res.json();
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: fetchMessages,
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        refetchInterval: true ? false : 1000,
    });

    return {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    };
}