import { BookAuthor } from "@/dtos/BookAuthor";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/hooks/useApi";
import { useEffect, useState } from "react";

export const useSelectedBook = () => {
  const queryClient = useQueryClient();
  const [selectedBook] = useState<BookAuthor | null>(
    () =>
      queryClient.getQueryData<BookAuthor | null>([queryKeys.selectedBook]) ||
      null
  );

  useEffect(() => {
    queryClient.setQueryData([queryKeys.selectedBook], selectedBook);
  }, [selectedBook, queryClient]);

  const getSelectedBook = (): BookAuthor | null => {
    return (
      queryClient.getQueryData<BookAuthor | null>([queryKeys.selectedBook]) ||
      null
    );
  };

  const setSelectedBook = (book: BookAuthor | null) => {
    queryClient.setQueryData([queryKeys.selectedBook], book);
    queryClient.invalidateQueries({ queryKey: [queryKeys.selectedBook] });
  };

  return { getSelectedBook, setSelectedBook };
};
