import { Container, Grid, styled } from "@mui/material";
import BookForm from "@/components/BookForm";
import BookList from "@/components/BookList";

const CenteredContainer = styled(Container)({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  height: "100vh",
});

const App = () => {
  return (
    <CenteredContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} component={"section"}>
          <BookForm />
        </Grid>
        <Grid item xs={12} sm={6} component={"section"}>
          <BookList />
        </Grid>
      </Grid>
    </CenteredContainer>
  );
};

export default App;
