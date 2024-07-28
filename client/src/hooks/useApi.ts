/* eslint-disable no-useless-catch */
import { useQuery } from "@tanstack/react-query";
import { get } from "@/utilities/genericFetch";
import env from "@/utilities/env";
import { BookAuthor } from "@/dtos/BookAuthor";

const queryKeys = {
  allBooks: "all-books",
} as const;

export const useGetAllBooks = () => {
  const query = useQuery<BookAuthor[], Error>({
    queryKey: [queryKeys.allBooks],
    queryFn: async () => {
      try {
        const res = await get<BookAuthor[]>(`${env.API_URL}/book`);
        return res;
      } catch (e) {
        const msg = (e as Error).message;
        throw new Error(msg);
      }
    },
    retry: 0,
    refetchInterval: false,
  });

  return query;
};
