import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const App = () => {
  return (
    <Container>
      <Typography variant="h1" component="h2" gutterBottom>
        Hello World
      </Typography>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
    </Container>
  );
};

export default App;
