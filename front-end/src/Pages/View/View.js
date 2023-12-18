import Banner from "../../Components/Banner/Banner";
import Topbar from "../../Components/Topbar/Topbar";
import Mysidebar from "../../Components/Mysidebar/Mysidebar";
import './view.css';
import { Box } from "@mui/material";

function View({ children }) {
    return (
        <div className="view">
            <div className="view-banner">
                <Banner />
            </div>
            <div className="view-container">
                <div className="view-sidebar">
                <Mysidebar />
                    
                </div>
                <Box className="view-content">
                    <Topbar className="view-top-bar" />
                    <div className="main-content">
                    {children}

                    </div>
                </Box>
            </div>
        </div>
    );
}

export default View;
