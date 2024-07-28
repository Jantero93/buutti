import { BookAuthor } from "@/dtos/BookAuthor";
import { useDeleteBook, useUpdateBook } from "@/hooks/useApi";
import { Box, Button, styled, TextField, TextFieldProps } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";

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

type BookFormProps = {
  selectedBook: BookAuthor | null;
};

const BookForm = ({ selectedBook }: BookFormProps) => {
  const [formInput, setFormInput] = useState(initialFormInput);
  const updateBookMutation = useUpdateBook();
  const deleteBookMutation = useDeleteBook();

  useEffect(() => {
    if (!selectedBook) return;

    setFormInput({
      title: selectedBook.title,
      author: selectedBook.authorName,
      description: selectedBook.description,
    });
  }, [selectedBook]);

  const handleInputChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));

  const updateBook = async () => {
    if (!selectedBook) return;

    const updatedBook: BookAuthor = {
      ...selectedBook,
      title: formInput.title,
      authorName: formInput.author,
      description: formInput.description,
    };

    await updateBookMutation.mutateAsync(updatedBook);
  };

  const postBook = () => {};

  const deleteBook = async () => {
    if (!selectedBook) return;

    await deleteBookMutation.mutateAsync(selectedBook.bookId);
  };

  return (
    <Box component={"form"}>
      <StyledTextField
        label="Title"
        name="title"
        value={formInput.title}
        onChange={handleInputChange}
        isFirst
        disabled={!selectedBook}
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
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: "0.5em" }}
          onClick={postBook}
        >
          Save New
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ mr: "0.5em" }}
          disabled={!selectedBook}
          onClick={updateBook}
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="error"
          disabled={!selectedBook}
          onClick={deleteBook}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default BookForm;
