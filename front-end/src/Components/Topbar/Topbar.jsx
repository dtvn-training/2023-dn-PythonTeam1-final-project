import React, { useState } from 'react';
import { Box, Typography, IconButton, MenuItem, Popover } from "@mui/material"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import './topbar.scss'
import Avatar from 'react-avatar-edit'
import { toast } from 'react-toastify';
import buildAPI from '../../const/buildAPI';

const Topbar = () => {
    const [dialog, setDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [imgCrop, setimgCrop] = useState(false);
    const [storeImage, setStoreImage] = useState([])

    const onClose = (view) => {
        setimgCrop(view);
    }

    const onCrop = () => {
        setimgCrop(null)
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangeAvatar = () => {
        setDialog(true);
        handleClose();
    };

    const saveImage = async () => {
        try {
            setStoreImage([...storeImage, { imgCrop }]);
            console.log(setStoreImage)
            const formData = new FormData();
            formData.append('file', imgCrop);
            console.log("data form", [...formData.entries()]);
            const response = await buildAPI.post('/api/account/upload-avatar', formData);
            console.log("response", response.data);
            setDialog(false);
            toast.success("Upload image success")
        } catch (error) {
            toast.error("Can not upload image")
            console.error("Error:", error.response.data);
        }

    };

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            height="5rem"
            sx={{
                background: "#468faf",
                fontWeight: "600",
            }}
        >
            <Typography></Typography>

            <Link to="/campaign" style={{ textDecoration: "none", color: "white" }}>
                <Typography
                    variant="h4"
                    textTransform="uppercase"
                    fontWeight="700"
                >
                    Logo
                </Typography>
            </Link>

            <IconButton sx={{ color: "white", mr: 4 }} onClick={handleClick}>
                <AccountCircleOutlinedIcon sx={{ fontSize: "2.8rem" }} />
            </IconButton>

            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem style={{ fontSize: '1.4rem', fontWeight: 'bold' }} onClick={handleChangeAvatar}>
                    Change Avatar
                </MenuItem>
            </Popover>

            <Dialog className='dialog customHeader' header='Update Avatar'
                visible={dialog} onHide={() => setDialog(false)}>
                <div className="dialog-components">
                    <Avatar width={400} height={350} onClose={onClose} onCrop={onCrop} />
                    <Button label='Save' onClick={saveImage} className='customLabel'></Button>
                </div>
            </Dialog>
        </Box>
    );
};

export default Topbar;
