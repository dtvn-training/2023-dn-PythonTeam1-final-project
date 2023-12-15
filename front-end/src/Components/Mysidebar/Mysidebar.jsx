import { useState, useEffect } from "react";
import { Box, IconButton, Avatar, useMediaQuery } from "@mui/material";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import ViewSidebarOutlinedIcon from "@mui/icons-material/ViewSidebarOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import "./mysidebar.scss";
import buildAPI from "../../const/buildAPI";
import storage from "../../firebase/config";
import { getDownloadURL, ref } from "firebase/storage";

// MENU ITEM FORM
const Item = ({ title, to, icon, setSelected }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} className="customLink">
      <MenuItem
        className={`customMenuItem ${isActive ? "active" : ""}`}
        onClick={() => setSelected(title)}
        icon={icon}
      >
        <span>{title}</span>
      </MenuItem>
    </Link>
  );
};

const Mysidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const [userName, setUserName] = useState(null);
    const [avatar, setavatar] = useState(null)

  const isSmallScreen = useMediaQuery("(max-width:1100px)");

  useEffect(() => {
    if (isSmallScreen) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  }, [isSmallScreen]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await buildAPI.get("/api/account/get_user_info");
                setUserName(response.data.name);
                const imageRef = ref(storage, `files/${userName}/avatar`);
                getDownloadURL(imageRef).then((image) => {
                    setavatar(image)
                }).catch((error) => {
                    console.log('Error getting download URL: ', error.message);
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, [userName]);

  return (
    <Sidebar collapsed={isCollapsed} backgroundColor="#468faf" width="30rem">
      <Menu iconShape="square">
        {/* LOGO AND MENU ICON */}
        <MenuItem
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={
            isCollapsed ? (
              <ViewSidebarOutlinedIcon style={{ fontSize: "2.6rem" }} />
            ) : undefined
          }
          className="customMenuItemSidebar"
        >
          {!isCollapsed && (
            <Box className="logoAndMenu disable">
              <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                <ViewSidebarOutlinedIcon className="logoAndMenu icon" />
              </IconButton>
              <span>Toggle sidebar</span>
            </Box>
          )}
        </MenuItem>

                {/* SHOW OR CLOSE USER IMAGE */}
                {!isCollapsed && (
                    <Box className="imageUser">
                        <Box className="image">
                            <Avatar alt="user-image"
                                // src={"../assets/Images/user.jpg"} 
                                src={avatar}
                                style={{ width: "20rem", height: "20rem" }} />
                        </Box>

                        <Box className='box-username'>
                            <sp className='userName'>
                                {userName}
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
            to="/"
            icon={<CampaignOutlinedIcon style={{ fontSize: "2.6rem" }} />}
            selected={selected}
            setSelected={setSelected}
          />

          <Item
            title="Account"
            to="/account"
            icon={
              <SupervisorAccountOutlinedIcon style={{ fontSize: "2.6rem" }} />
            }
            selected={selected}
            setSelected={setSelected}
          />
        </Box>
      </Menu>
    </Sidebar>
  );
};

export default Mysidebar;
