import { useState } from "react";
import { Box, Typography, IconButton, Avatar } from "@mui/material";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
// import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';

// MENU ITEM FORM
const Item = ({ title, to, icon, setSelected }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link to={to} style={{ textDecoration: "none", color: "white" }}>
            <MenuItem
                active={isActive}
                style={{
                    color: isActive ? "black" : "white",
                    height: "6rem",
                    backgroundColor: isActive ? "white" : "transparent",
                    borderBottom: "1px solid white",
                    transition: "color 0.5s, background-color 0.4s",
                }}
                onClick={() => setSelected(title)}
                icon={icon}
            >
                <Typography
                    variant="body1"
                    fontSize="1.6rem"
                >
                    {title}
                </Typography>
            </MenuItem>
        </Link>
    );
};

const Mysidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");

    return (
        <Sidebar
            collapsed={isCollapsed}
            backgroundColor="#468faf"
            width="30rem"
        >
            <Menu
                iconShape="square"
            >
                {/* LOGO AND MENU ICON */}
                <MenuItem
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    icon={isCollapsed ? <ViewSidebarOutlinedIcon style={{ fontSize: '2.6rem' }} /> : undefined}
                    style={{
                        color: "white",
                        backgroundColor: "#468faf",
                        borderBottom: ".1rem solid white",
                        height: "6rem"
                    }}
                >
                    {!isCollapsed && (
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <IconButton
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                sx={{ color: "white" }}
                            >
                                <ViewSidebarOutlinedIcon style={{ fontSize: '2.6rem' }} />
                            </IconButton>
                            <Typography
                                variant="body1"
                                fontSize="1.6rem"
                            >
                                Toggle sidebar
                            </Typography>
                        </Box>
                    )}
                </MenuItem>

                {/* SHOW OR CLOSE USER IMAGE */}
                {!isCollapsed && (
                    <Box
                        p="3rem"
                        style={{
                            borderBottom: ".1rem solid white",
                        }}>
                        <Box display="flex" justifyContent="center" alignItems="center" mb="1rem">
                            <Avatar alt="user-image" src="../assets/Images/user.jpg" sx={{ width: "20rem", height: "20rem" }} />
                        </Box>
                        <Box textAlign="center">
                            <Typography
                                variant="body1"
                                color="white"
                                fontSize="2.2rem"
                                sx={{
                                    cursor: "pointer"
                                }}
                            >
                                User Name
                            </Typography>
                        </Box>
                    </Box>
                )}

                {/* MENU ITEM LINK */}
                <Box>
                    <Item
                        title="Dashboard"
                        to="/"
                        icon={<DashboardCustomizeOutlinedIcon style={{ fontSize: '2.6rem' }} />}
                        selected={selected}
                        setSelected={setSelected}
                    />

                    {/* <Item
                        title="Campaign"
                        to="/campaign"
                        icon={<CampaignOutlinedIcon style={{ fontSize: '2.6rem' }} />}
                        selected={selected}
                        setSelected={setSelected}
                    /> */}

                    <Item
                        title="Account"
                        to="/account"
                        icon={<SupervisorAccountOutlinedIcon style={{ fontSize: '2.6rem' }} />}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </Box>
            </Menu>
        </Sidebar>
    );
};

export default Mysidebar
