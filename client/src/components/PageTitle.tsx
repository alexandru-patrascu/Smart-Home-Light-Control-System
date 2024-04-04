import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FC } from "react";

interface IPageTitleProps {
  title: string;
  buttonText: string;
  handleClick: () => void;
}

const PageTitle: FC<IPageTitleProps> = ({ title, buttonText, handleClick }) => {
  return (
    <Box
      sx={{
        px: 3,
        pb: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography variant="h6">
        <b>{title}</b>
      </Typography>
      <Button type="button" variant="contained" onClick={handleClick}>
        <Typography variant="button">{buttonText}</Typography>
      </Button>
    </Box>
  );
};

export default PageTitle;
