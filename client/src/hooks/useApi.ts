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
      const response = get<BookAuthor[]>(`${env.API_URL}/book`);
      return response;
    },
  });

  return query;
};
