import { Typography } from "@mui/material";
import PropTypes from "prop-types";

const FieldLabel = ({children}) => {
  return (
    <Typography
      variant="h5"
      fontWeight={700}
      sx={{
        textAlign: "right",
        paddingRight: "3rem",
      }}
    >
      {children}
    </Typography>
  );
};

FieldLabel.propTypes = {
  children: PropTypes.string.isRequired,
};

export default FieldLabel;
