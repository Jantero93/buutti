import { styled } from "@mui/material/styles";
import { Typography, Box } from "@mui/material";

type ErrorMessageProps = {
  errMsg: string;
};

const StyledErrorBox = styled(Box)(({ theme }) => ({
  color: theme.palette.error.contrastText,
  backgroundColor: theme.palette.error.main,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(1),
}));

const StyledErrorMessage = styled(Typography)(({ theme }) => ({
  ...theme.typography.body1,
  fontWeight: theme.typography.fontWeightBold,
}));

const ErrorMessage = ({ errMsg }: ErrorMessageProps) => {
  if (!errMsg) return null;

  return (
    <StyledErrorBox>
      <StyledErrorMessage>{errMsg}</StyledErrorMessage>
    </StyledErrorBox>
  );
};

export default ErrorMessage;
