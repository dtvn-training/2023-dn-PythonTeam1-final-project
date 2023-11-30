import { useState } from "react";
import { Box } from '@mui/material'
import InputBase from "@mui/material/InputBase";
import * as React from 'react';

const Search = () => {
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSearchSubmit = () => {
        console.log('Search Text:', searchText);
    };

    return (
        <Box
            display="flex"
        >
            <InputBase
                sx={{
                    pl: 2,
                    ml: 6,
                    height: "4.6rem",
                    width: "30rem",
                    backgroundColor: '#ccc',
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
                onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
            />
        </Box>
    );
};

export default Search;