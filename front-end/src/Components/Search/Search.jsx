import { useState } from "react";
import { Box } from '@mui/material'
import InputBase from "@mui/material/InputBase";
import * as React from 'react';

const Search = ({ data, onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        const queryWords = query.toLowerCase().split(/\s+/);

        const filteredData = data.filter((item) =>
            queryWords.every(
                (word) =>
                    item.user_name.toLowerCase().includes(word) ||
                    item.email.toLowerCase().includes(word)
            )
        );

        console.log('data: ', filteredData);
        onSearch(filteredData);
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