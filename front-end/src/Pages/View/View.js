import Banner from "../../Components/Banner/Banner";
import TopBar from "../../Components/TopBar/TopBar";
import MySideBar from "../../Components/MySideBar/MySideBar";
import './view.css';
import { Box } from "@mui/material";
import PropTypes from 'prop-types';


function View({ children }) {
    return (
        <div className="view">
            <div className="view-banner">
                <Banner />
            </div>
            <div className="view-container">
                <div className="view-sidebar">
                <MySideBar />
                    
                </div>
                <Box className="view-content">
                    <TopBar className="view-top-bar" />
                    <div className="main-content">
                    {children}

                    </div>
                </Box>
            </div>
        </div>
    );
}


View.propTypes = {
    children: PropTypes.any.isRequired
  };

export default View;
