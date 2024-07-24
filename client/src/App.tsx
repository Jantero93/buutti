import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import ErrorMessage from "@/components/ErrorMessage";

import { useGetAllBooks } from "./hooks/useApi";

const App = () => {
  const useBooks = useGetAllBooks();

  return (
    <Container>
      <Typography variant="h1" component="h2" gutterBottom>
        Hello World
      </Typography>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
      {useBooks.data?.map((book) => (
        <ErrorMessage key={book.bookId} errMsg={book.title} />
      ))}
    </Container>
  );
};

export default App;
