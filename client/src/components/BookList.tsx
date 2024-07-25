import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Container,
  Box,
  styled,
} from "@mui/material";
import { BookAuthor } from "@/dtos/BookAuthor";

const StyledListItemText = styled(ListItemText)`
  & .MuiListItemText-primary {
    color: black;
    font-size: 1.1rem;
  }
`;

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.grey[300],
  },
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.light,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
}));

type BookListProps = {
  books?: BookAuthor[];
};

const BookList = ({ books }: BookListProps) => {
  const [selectedBook, setSelectedBook] = useState<BookAuthor | null>(null);

  const handleListItemClick = (book: BookAuthor) => setSelectedBook(book);

  return (
    <Container>
      <Box>
        <List disablePadding>
          {books?.map((book) => (
            <ListItem key={book.bookId} disablePadding>
              <StyledListItemButton
                autoFocus={false}
                selected={selectedBook?.bookId === book.bookId}
                onClick={() => handleListItemClick(book)}
              >
                <StyledListItemText
                  primary={book.title}
                  secondary={book.authorName}
                />
              </StyledListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default BookList;
