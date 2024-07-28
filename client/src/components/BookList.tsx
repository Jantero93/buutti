import { Dispatch, SetStateAction } from "react";
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
import { useGetAllBooks } from "@/hooks/useApi";

const StyledListItemText = styled(ListItemText)`
  & .MuiListItemText-primary {
    color: black;
    font-size: 1.1rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & .MuiListItemText-secondary {
    color: gray;
    overflow: hidden;
    text-overflow: ellipsis;
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
  selectedBook: BookAuthor | null;
  setSelectedBook: Dispatch<SetStateAction<BookAuthor | null>>;
};

const BookList = ({ selectedBook, setSelectedBook }: BookListProps) => {
  const { data } = useGetAllBooks();

  const handleListItemClick = (book: BookAuthor) => setSelectedBook(book);

  const sortedBooks = data
    ? [...data].sort((a, b) => a.authorName.localeCompare(b.authorName, "fi"))
    : [];

  return (
    <Container>
      <Box>
        <List disablePadding>
          {sortedBooks.map((book) => (
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
