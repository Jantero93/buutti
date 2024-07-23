import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import ErrorMessage from "@/components/ErrorMessage";

const App = () => {
  return (
    <Container>
      <Typography variant="h1" component="h2" gutterBottom>
        Hello World
      </Typography>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
      <ErrorMessage errMsg="test" />
    </Container>
  );
};

export default App;
