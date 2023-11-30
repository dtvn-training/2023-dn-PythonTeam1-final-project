import { Box, Typography } from "@mui/material";

const Banner = () => {
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            height="14rem"
            sx={{
                background: "#ccc",
                boxSizing: 'border-box',
            }}
        >
            <Typography variant="h3" fontWeight="700" color="#000">
                Banner 1
            </Typography>

            <Typography variant="h3" fontWeight="700" color="#000">
                Banner 2
            </Typography>
        </Box>
    );
};

export default Banner;
