import { useState } from "react";
import { Box } from '@mui/material'
import * as React from 'react';
import './search.scss';

const Search = ({ data, onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const queryWords = query.toLowerCase().split(/\s+/);

    const filteredData = data.filter((item) =>
      queryWords.every(
        (word) =>
          item.user_name.toLowerCase().includes(word) ||
          item.email.toLowerCase().includes(word)
      )
    );

    console.log("data: ", filteredData);
    onSearch(filteredData);
  };

    return (
        <Box
            display="flex"
        >
            <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(e.target.value)}
            />

        </Box>
    );
};

export default Search;
