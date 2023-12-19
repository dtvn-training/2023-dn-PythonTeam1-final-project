import React, { useState } from 'react';
import { Box, Typography, IconButton, MenuItem, Popover } from "@mui/material"
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import './topbar.scss'
import { storage } from '../../const/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import buildAPI from '../../const/buildAPI';
import { toast } from 'react-toastify';

const Topbar = () => {
    const [dialog, setDialog] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [img, setimg] = useState('')

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

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to logout?"))
            window.location.href = "/";
    };
    const saveImage = async () => {
        try {
            const response = await buildAPI.get("/api/account/get_user_info");
            const email = response.data.email;
            const imageRef = ref(storage, `files/${email}/avatar`);
            await uploadBytes(imageRef, img);
            toast.success('Upload successful')
        } catch (error) {
            toast.error('Upload error');
            console.log(error)
        }
        setDialog(false)
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
                <MenuItem onClick={handleLogout} style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                    LogOut
                </MenuItem>
            </Popover>

            <Dialog className='dialog customHeader' header='Update Avatar'
                visible={dialog} onHide={() => setDialog(false)}>
                <div className="dialog-components">
                    <input aria-label='' type="file" onChange={(e) => setimg(e.target.files[0])} />
                    <Button label='Save' onClick={saveImage} className='customLabel'></Button>
                </div>
            </Dialog>
        </Box>
    );
};

export default Topbar;
