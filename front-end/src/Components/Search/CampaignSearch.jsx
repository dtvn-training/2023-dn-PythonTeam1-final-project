import { useState } from "react";
import { Box } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import * as React from "react";

const CampaignSearch = (props) => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    if (props.setSearch) {
      props.setSearch(e.target.value);
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

export default CampaignSearch;
