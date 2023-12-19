import { useState } from "react";
import { Box } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import * as React from "react";
import PropTypes from "prop-types";

const CampaignSearch = ({ setSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    if (setSearch) {
      setSearch(e.target.value);
    }
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = () => {
    console.log("Search Text:", searchText);
  };

  return (
    <Box display="flex">
      <InputBase
        sx={{
          pl: 2,
          height: "4.6rem",
          width: "30rem",
          backgroundColor: "#ccc",
          input: {
            fontSize: "1.8rem",
            "::placeholder": {
              color: "black",
              fontWeight: 500,
            },
          },
        }}
        placeholder="Search..."
        value={searchText}
        onChange={handleSearchChange}
        onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
      />
    </Box>
  );
};

CampaignSearch.propTypes = {
  setSearch: PropTypes.func.isRequired,
};

export default CampaignSearch;
