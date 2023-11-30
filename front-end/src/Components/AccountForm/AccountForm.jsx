import { Box, Typography, TextField, Button } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';
import React, { useState } from 'react';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Formik } from "formik";
import * as yup from "yup";

const AccountForm = ({ title, onClose }) => {
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        console.log(values);
    };

    const handleClose = () => {
        onClose();
    };

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const currencies = [
        {
            value: 'ADMIN',
            label: 'ADMIN',
        },
        {
            value: 'DAC',
            label: 'DAC',
        },
        {
            value: 'ADVERTIER',
            label: 'ADVERTIER',
        },
    ];

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            position="fixed"
            top="0"
            left="0"
            bgcolor="rgba(0, 0, 0, 0.3)"
            height="100%"
            width="100%"
            zIndex="999"
        >
            <Box
                width="80rem"
                height="80rem"
                bgcolor="white"
                borderRadius=".5rem"
                boxShadow="0 .7rem 1rem rgba(0, 0, 0, 0.1)"
                sx={{ maxHeight: "90vh", overflowY: "auto" }}
            >
                {/* TITLE & CLOSE ICON */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    padding="1rem"
                    borderBottom=".2rem solid #ccc"
                >
                    <Typography variant="h4" fontWeight={500}>
                        {title}
                    </Typography>
                    <ClearIcon
                        onClick={handleClose}
                        style={{
                            cursor: "pointer",
                            fontSize: "2.4rem",
                            color: isHovered ? "#000" : "#ccc"
                        }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                </Box>

                <Box>
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={checkoutSchema}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                    padding="2rem"
                                    sx={{
                                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                    }}
                                >
                                    {/* DETAILS */}
                                    <Accordion defaultExpanded sx={{ gridColumn: "span 4" }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon
                                                style={{ color: "#fff", fontSize: "4rem" }} />}
                                            sx={{ bgcolor: "#468faf", borderRadius: '.8rem .8rem 0 0' }}
                                        >
                                            <Typography color="#fff" variant="h5" fontWeight={700}>
                                                Details
                                            </Typography>
                                        </AccordionSummary>

                                        {/* EMAIL */}
                                        <AccordionDetails>
                                            <Box display="grid" gridTemplateColumns="1fr 3fr" alignItems="center">
                                                <Typography
                                                    variant="h5"
                                                    fontWeight={700}
                                                    sx={{
                                                        textAlign: "right",
                                                        paddingRight: "3rem"
                                                    }}
                                                >
                                                    Email:
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="email"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.email}
                                                    name="email"
                                                    error={!!touched.email && !!errors.email}
                                                    helperText={touched.email && errors.email}
                                                    inputProps={{
                                                        style: {
                                                            fontSize: "1.8rem",
                                                            padding: "1rem",
                                                        },
                                                    }}
                                                    FormHelperTextProps={{
                                                        style: {
                                                            fontSize: "1.4rem",
                                                        },
                                                    }}
                                                />
                                            </Box>
                                        </AccordionDetails>

                                        {/* FIRSTNAME */}
                                        <AccordionDetails>
                                            <Box display="grid" gridTemplateColumns="1fr 3fr" alignItems="center">
                                                <Typography
                                                    variant="h5"
                                                    fontWeight={700}
                                                    sx={{
                                                        textAlign: "right",
                                                        paddingRight: "3rem"
                                                    }}
                                                >
                                                    First Name:
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.firstName}
                                                    name="firstName"
                                                    error={!!touched.firstName && !!errors.firstName}
                                                    helperText={touched.firstName && errors.firstName}
                                                    inputProps={{
                                                        style: {
                                                            fontSize: "1.8rem",
                                                            padding: "1rem",
                                                        },
                                                    }}
                                                    FormHelperTextProps={{
                                                        style: {
                                                            fontSize: "1.4rem",
                                                        },
                                                    }}
                                                />
                                            </Box>
                                        </AccordionDetails>

                                        {/* LASTNAME */}
                                        <AccordionDetails>
                                            <Box display="grid" gridTemplateColumns="1fr 3fr" alignItems="center">
                                                <Typography
                                                    variant="h5"
                                                    fontWeight={700}
                                                    sx={{
                                                        textAlign: "right",
                                                        paddingRight: "3rem"
                                                    }}
                                                >
                                                    Last Name:
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.lastName}
                                                    name="lastName"
                                                    error={!!touched.lastName && !!errors.lastName}
                                                    helperText={touched.lastName && errors.lastName}
                                                    inputProps={{
                                                        style: {
                                                            fontSize: "1.8rem",
                                                            padding: "1rem",
                                                        },
                                                    }}
                                                    FormHelperTextProps={{
                                                        style: {
                                                            fontSize: "1.4rem",
                                                        },
                                                    }}
                                                />
                                            </Box>
                                        </AccordionDetails>

                                        {/* ROLE */}
                                        <AccordionDetails>
                                            <Box display="grid" gridTemplateColumns="1fr 3fr" alignItems="center">
                                                <Typography
                                                    variant="h5"
                                                    fontWeight={700}
                                                    sx={{
                                                        textAlign: "right",
                                                        paddingRight: "3rem"
                                                    }}
                                                >
                                                    Role:
                                                </Typography>
                                                <TextField
                                                    id="outlined-select-currency-native"
                                                    select
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.role}
                                                    name="role"
                                                    error={!!touched.role && !!errors.role}
                                                    helperText={touched.role && errors.role}
                                                    SelectProps={{
                                                        native: true,
                                                        style: {
                                                            fontSize: "1.6rem",
                                                        }
                                                    }}
                                                    FormHelperTextProps={{
                                                        style: {
                                                            fontSize: "1.4rem",
                                                        },
                                                    }}
                                                >
                                                    {currencies.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </TextField>
                                            </Box>
                                        </AccordionDetails>

                                        {/* ADDRESS */}
                                        <AccordionDetails>
                                            <Box display="grid" gridTemplateColumns="1fr 3fr" alignItems="center">
                                                <Typography
                                                    variant="h5"
                                                    fontWeight={700}
                                                    sx={{
                                                        textAlign: "right",
                                                        paddingRight: "3rem"
                                                    }}
                                                >
                                                    Address:
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.address}
                                                    name="address"
                                                    error={!!touched.address && !!errors.address}
                                                    helperText={touched.address && errors.address}
                                                    inputProps={{
                                                        style: {
                                                            fontSize: "1.8rem",
                                                            padding: "1rem",
                                                        },
                                                    }}
                                                    FormHelperTextProps={{
                                                        style: {
                                                            fontSize: "1.4rem",
                                                        },
                                                    }}
                                                />
                                            </Box>
                                        </AccordionDetails>

                                        {/* PHONE */}
                                        <AccordionDetails>
                                            <Box display="grid" gridTemplateColumns="1fr 3fr" alignItems="center">
                                                <Typography
                                                    variant="h5"
                                                    fontWeight={700}
                                                    sx={{
                                                        textAlign: "right",
                                                        paddingRight: "3rem"
                                                    }}
                                                >
                                                    Phone:
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="tel"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.phone}
                                                    name="phone"
                                                    error={!!touched.phone && !!errors.phone}
                                                    helperText={touched.phone && errors.phone}
                                                    inputProps={{
                                                        style: {
                                                            fontSize: "1.8rem",
                                                            padding: "1rem",
                                                        },
                                                    }}
                                                    FormHelperTextProps={{
                                                        style: {
                                                            fontSize: "1.4rem",
                                                        },
                                                    }}
                                                />
                                            </Box>
                                        </AccordionDetails>

                                        {/* PASSWORD */}
                                        <AccordionDetails>
                                            <Box display="grid" gridTemplateColumns="1fr 3fr" alignItems="center">
                                                <Typography
                                                    variant="h5"
                                                    fontWeight={700}
                                                    sx={{
                                                        textAlign: "right",
                                                        paddingRight: "3rem"
                                                    }}
                                                >
                                                    Password:
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="password"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.password}
                                                    name="password"
                                                    error={!!touched.password && !!errors.password}
                                                    helperText={touched.password && errors.password}
                                                    inputProps={{
                                                        style: {
                                                            fontSize: "1.8rem",
                                                            padding: "1rem",
                                                        },
                                                    }}
                                                    FormHelperTextProps={{
                                                        style: {
                                                            fontSize: "1.4rem",
                                                        },
                                                    }}
                                                />
                                            </Box>
                                        </AccordionDetails>

                                        {/* PASSWORD CONFIRM */}
                                        <AccordionDetails>
                                            <Box display="grid" gridTemplateColumns="1fr 3fr" alignItems="center">
                                                <Typography
                                                    variant="h5"
                                                    fontWeight={700}
                                                    sx={{
                                                        textAlign: "right",
                                                        paddingRight: "3rem"
                                                    }}
                                                >
                                                    Password Confirm:
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="password"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.passwordConfirm}
                                                    name="passwordConfirm"
                                                    error={!!touched.passwordConfirm && !!errors.passwordConfirm}
                                                    helperText={touched.passwordConfirm && errors.passwordConfirm}
                                                    inputProps={{
                                                        style: {
                                                            fontSize: "1.8rem",
                                                            padding: "1rem",
                                                        },
                                                    }}
                                                    FormHelperTextProps={{
                                                        style: {
                                                            fontSize: "1.4rem",
                                                        },
                                                    }}
                                                />
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>
                                </Box>

                                {/* BUTTON */}
                                <Box display="flex" ml={2} border=".2rem solid #ccc" justifyContent="flex-end" padding="1rem 2rem">
                                    <Button
                                        onClick={handleClose}
                                        variant="outlined" sx={{
                                            marginLeft: "1.5rem",
                                            fontSize: "1.2rem",
                                            width: "10rem"
                                        }}>Cancel</Button>
                                    <Button
                                        type="submit"
                                        variant="contained" sx={{
                                            marginLeft: "1.5rem",
                                            backgroundColor: "#468faf",
                                            fontSize: "1.2rem",
                                            width: "10rem"
                                        }}
                                    >Save</Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </Box>
    );
};

const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    role: yup.string().required("Please select user role"),
    address: yup.string().required("required"),
    phone: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("required"),
    password: yup.string()
        .required('No password provided.')
        .min(8, 'Password is too short - should be 8 chars minimum.'),
    passwordConfirm: yup.string().required('Please retype your password.').oneOf([yup.ref('password')], 'Your passwords do not match.')
});

const initialValues = {
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    address: "",
    phone: "",
    password: "",
    passwordConfirm: ""
};

export default AccountForm;