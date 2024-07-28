import { useState } from "react";
import { Container, Grid, styled } from "@mui/material";
import BookForm from "@/components/BookForm";
import BookList from "@/components/BookList";
import { BookAuthor } from "./dtos/BookAuthor";

const CenteredContainer = styled(Container)({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  height: "100vh",
  padding: "1rem",
});

const App = () => {
  const [selectedBook, setSelectedBook] = useState<BookAuthor | null>(null);

  return (
    <CenteredContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} component={"section"}>
          <BookForm
            selectedBook={selectedBook}
            setSelectedBook={setSelectedBook}
          />
        </Grid>
        <Grid item xs={12} sm={6} component={"section"}>
          <BookList
            selectedBook={selectedBook}
            setSelectedBook={setSelectedBook}
          />
        </Grid>
      </Grid>
    </CenteredContainer>
  );
};

export default App;
