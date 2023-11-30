import { Box, Typography } from "@mui/material";
import './banner.scss'

const Banner = () => {
    return (
        <Box className="banner">
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
