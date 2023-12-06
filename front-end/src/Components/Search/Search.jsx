import { useState } from "react";
import { Box } from '@mui/material'
import InputBase from "@mui/material/InputBase";
import * as React from 'react';
import buildAPI from "../../const/buildAPI";

const Search = () => {
    const [setSearchResults] = useState([]);
    const [query, setQuery] = useState('');

    const handleSearch = async () => {
        try {
            const response = await buildAPI.get(`/api/search/?query=${query}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
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
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
        </Box>
    );
};

export default Search;