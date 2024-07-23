import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import ErrorMessage from "@/components/ErrorMessage";
import { useEffect } from "react";
import { get } from "@/utilities/genericFetch";
import ENV from "@/utilities/env";

const App = () => {
  useEffect(() => {
    get(ENV.API_URL + "/book");
  }, []);

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
