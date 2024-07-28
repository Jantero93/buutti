import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { BookAuthor } from "@/dtos/BookAuthor";
import { useDeleteBook, usePostBook, useUpdateBook } from "@/hooks/useApi";
import { Box, Button, styled, TextField, TextFieldProps } from "@mui/material";
import ErrorMessage from "./ErrorMessage";

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
  setSelectedBook: Dispatch<SetStateAction<BookAuthor | null>>;
};

const BookForm = ({ selectedBook, setSelectedBook }: BookFormProps) => {
  const [formInput, setFormInput] = useState(initialFormInput);
  const [error, setError] = useState("");
  const updateBookMutation = useUpdateBook();
  const deleteBookMutation = useDeleteBook();
  const postBookMutation = usePostBook();

  useEffect(() => {
    if (updateBookMutation.error) {
      setError(updateBookMutation.error.message);
      return;
    }

    if (deleteBookMutation.error) {
      setError(deleteBookMutation.error.message);
    }

    if (postBookMutation.error) {
      setError(postBookMutation.error.message);
      return;
    }
  }, [
    updateBookMutation.error,
    deleteBookMutation.error,
    postBookMutation.error,
    setError,
  ]);

  useEffect(() => {
    if (!selectedBook) return;

    setError("");

    const { title, authorName, description } = selectedBook;

    setFormInput({
      title,
      description,
      author: authorName,
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

    const { title, description, author: authorName } = formInput;

    const updatedBookPayload: BookAuthor = {
      ...selectedBook,
      title,
      description,
      authorName,
    };

    const updatedBook =
      await updateBookMutation.mutateAsync(updatedBookPayload);

    setSelectedBook(updatedBook);
  };

  const postBook = async () => {
    const { author: authorName, description, title } = formInput;

    const bookPayload: Partial<BookAuthor> = {
      authorName,
      description,
      title,
    };

    const newBook = await postBookMutation.mutateAsync(bookPayload);
    setSelectedBook(newBook);
  };

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
      <ErrorMessage errMsg={error} />
    </Box>
  );
};

export default BookForm;
