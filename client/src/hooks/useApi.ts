/* eslint-disable no-useless-catch */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { del, get, post, put } from "@/utilities/genericFetch";
import env from "@/utilities/env";
import { BookAuthor } from "@/dtos/BookAuthor";

export const QueryKeys = {
  allBooks: "all-books",
} as const;

export const useGetAllBooks = () => {
  const query = useQuery<BookAuthor[], Error>({
    queryKey: [QueryKeys.allBooks],
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

export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation<BookAuthor, Error, BookAuthor>({
    mutationFn: async (book) =>
      await put<BookAuthor>(`${env.API_URL}/book/${book.bookId}`, book),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QueryKeys.allBooks] }),
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, number>({
    mutationFn: async (bookId) => await del(`${env.API_URL}/book/${bookId}`),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QueryKeys.allBooks] }),
  });
};

export const usePostBook = () => {
  const queryClient = useQueryClient();

  return useMutation<BookAuthor, Error, Partial<BookAuthor>>({
    mutationFn: async (newBook) =>
      await post<BookAuthor>(`${env.API_URL}/book`, newBook),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QueryKeys.allBooks] }),
  });
};
