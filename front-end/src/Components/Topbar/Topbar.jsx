import { Box, Typography, IconButton } from "@mui/material"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';

const Topbar = () => {
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            height="6rem"
            sx={{
                background: "#468faf",
                fontWeight: "600",
            }}
        >
            <Typography></Typography>

            <Link to="/dashboard" style={{ textDecoration: "none", color: "white" }}>
                <Typography
                    variant="h4"
                    textTransform="uppercase"
                    fontWeight="700"
                >
                    Logo
                </Typography>
            </Link>

            <IconButton
                sx={{ color: "white", mr: 4 }}
            >
                <AccountCircleOutlinedIcon sx={{ fontSize: "2.8rem" }} />
            </IconButton>

        </Box>
    );
};

export default Topbar;
