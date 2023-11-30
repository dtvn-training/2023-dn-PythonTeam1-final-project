import { useState } from "react";
import { Box, IconButton, Avatar } from "@mui/material";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import ViewSidebarOutlinedIcon from '@mui/icons-material/ViewSidebarOutlined';
// import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import './mysidebar.scss';

// MENU ITEM FORM
const Item = ({ title, to, icon, setSelected }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link to={to} className="customLink">
            <MenuItem
                className={`customMenuItem ${isActive ? 'active' : ''}`}
                onClick={() => setSelected(title)}
                icon={icon}
            >
                <span>
                    {title}
                </span>
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
                    className="customMenuItemSidebar"
                >
                    {!isCollapsed && (
                        <Box className="logoAndMenu disable">
                            <IconButton
                                onClick={() => setIsCollapsed(!isCollapsed)}
                            >
                                <ViewSidebarOutlinedIcon className="logoAndMenu icon" />
                            </IconButton>
                            <span>
                                Toggle sidebar
                            </span>
                        </Box>
                    )}
                </MenuItem>

                {/* SHOW OR CLOSE USER IMAGE */}
                {!isCollapsed && (
                    <Box className="imageUser">
                        <Box className="image">
                            <Avatar alt="user-image" src="../assets/Images/user.jpg" sx={{ width: "20rem", height: "20rem" }} />
                        </Box>
                        <Box textAlign="center">
                            <sp
                                variant="body1"
                                color="white"
                                fontSize="2.2rem"
                                sx={{
                                    cursor: "pointer"
                                }}
                            >
                                User Name
                            </sp>
                        </Box>
                    </Box>
                )}

                {/* MENU ITEM LINK */}
                <Box>
                    {/* <Item
                        title="Dashboard"
                        to="/"
                        icon={<DashboardCustomizeOutlinedIcon style={{ fontSize: '2.6rem' }} />}
                        selected={selected}
                        setSelected={setSelected}
                    /> */}

                    <Item
                        title="Campaign"
                        to="/campaign"
                        icon={<CampaignOutlinedIcon style={{ fontSize: '2.6rem' }} />}
                        selected={selected}
                        setSelected={setSelected}
                    />

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
