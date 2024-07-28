import { Box, Button, styled, TextField, TextFieldProps } from "@mui/material";
import { ChangeEvent, useState } from "react";

const StyledTextField = styled(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  ({ isFirst, ...otherProps }: TextFieldProps & { isFirst?: boolean }) => (
    <TextField {...otherProps} fullWidth variant="outlined" />
  )
)(({ theme, isFirst }) => ({
  marginTop: isFirst ? 0 : theme.spacing(2),
}));

const initialFormInput = {
  title: "",
  author: "",
  description: "",
};

const BookForm = () => {
  const [formInput, setFormInput] = useState(initialFormInput);

  const handleInputChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));

  return (
    <Box component={"form"}>
      <StyledTextField
        label="Title"
        name="title"
        value={formInput.title}
        onChange={handleInputChange}
        isFirst
      />
      <StyledTextField
        label="Author"
        name="author"
        value={formInput.author}
        onChange={handleInputChange}
      />
      <StyledTextField
        name="description"
        label="Description"
        multiline
        rows={4}
        value={formInput.description}
        onChange={handleInputChange}
      />
      <Box mt={2}>
        <Button variant="contained" color="primary" sx={{ mr: "0.5em" }}>
          Save New
        </Button>
        <Button variant="contained" color="secondary" sx={{ mr: "0.5em" }}>
          Save
        </Button>
        <Button variant="outlined" color="error">
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default BookForm;
