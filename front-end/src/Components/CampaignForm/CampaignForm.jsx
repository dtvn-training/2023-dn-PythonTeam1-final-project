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
import DatetimePicker from "../DatetimePicker/DatetimePicker";

const CampaignForm = ({ title, onClose }) => {
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
            value: 'ACTIVE',
            label: 'ACTIVE',
        },
        {
            value: 'INACTIVE',
            label: 'INACTIVE',
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
                sx={{ maxHeight: "80vh", overflowY: "auto" }}
            >
                {/* TITLE & CLOSE ICON */}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    padding={2}
                    borderBottom="0.2rem solid #ccc"
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

                {/* FILL */}
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
                                    padding="3rem 2rem"
                                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                    borderBottom=".2rem solid #ccc"
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
                                                    Name:
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.campaignName}
                                                    name="campaignName"
                                                    error={!!touched.campaignName && !!errors.campaignName}
                                                    helperText={touched.campaignName && errors.campaignName}
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
                                            <Box display="grid" gridTemplateColumns="1fr 3fr" alignItems="center" mt={2}>
                                                <Typography
                                                    variant="h5"
                                                    fontWeight={700}
                                                    sx={{
                                                        textAlign: "right",
                                                        paddingRight: "3rem"
                                                    }}>User status:</Typography>
                                                <TextField
                                                    id="outlined-select-currency-native"
                                                    select
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.userStatus}
                                                    name="userStatus"
                                                    error={!!touched.userStatus && !!errors.userStatus}
                                                    SelectProps={{
                                                        native: true,
                                                        style: {
                                                            fontSize: "1.6rem",
                                                        }
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
                                    </Accordion>

                                    {/* SCHEDULE */}
                                    <Accordion defaultExpanded sx={{ gridColumn: "span 4" }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon
                                                style={{ color: "#fff", fontSize: "4rem" }} />}
                                            sx={{ bgcolor: "#468faf", borderRadius: '.8rem .8rem 0 0' }}
                                        >
                                            <Typography color="#fff" variant="h5" fontWeight={700}>
                                                Schedule:
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Box display="grid" gridTemplateColumns="1fr 4fr" alignItems="center">
                                                <Typography
                                                    variant="h5"
                                                    fontWeight={700}
                                                    sx={{
                                                        textAlign: "right",
                                                        paddingRight: "3rem"
                                                    }}
                                                >
                                                    Schedule:
                                                </Typography>
                                                <DatetimePicker onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.dateTime}
                                                    name="dateTime"
                                                    error={!!touched.dateTime && !!errors.dateTime}
                                                    helperText={touched.dateTime && errors.dateTime}
                                                />
                                            </Box>
                                        </AccordionDetails>
                                    </Accordion>

                                    {/* BUDGET */}
                                    <Accordion defaultExpanded sx={{ gridColumn: "span 4" }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon
                                                style={{ color: "#fff", fontSize: "4rem" }} />}
                                            sx={{ bgcolor: "#468faf", borderRadius: '.8rem .8rem 0 0' }}
                                        >
                                            <Typography color="#fff" variant="h5" fontWeight={700}>
                                                Budget
                                            </Typography>
                                        </AccordionSummary>
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
                                                    Budget:
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="tel"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.budget}
                                                    name="budget"
                                                    error={!!touched.budget && !!errors.budget}
                                                    helperText={touched.budget && errors.budget}
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

                                    {/* BIDDING */}
                                    <Accordion defaultExpanded sx={{ gridColumn: "span 4" }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon
                                                style={{ color: "#fff", fontSize: "4rem" }} />}
                                            sx={{ bgcolor: "#468faf", borderRadius: '.8rem .8rem 0 0' }}
                                        >
                                            <Typography color="#fff" variant="h5" fontWeight={700}>
                                                Bidding
                                            </Typography>
                                        </AccordionSummary>
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
                                                    Bid Amount:
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="tel"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.bidAmount}
                                                    name="bidAmount"
                                                    error={!!touched.bidAmount && !!errors.bidAmount}
                                                    helperText={touched.bidAmount && errors.bidAmount}
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

                                    {/* CREATIVE */}
                                    <Accordion defaultExpanded sx={{ gridColumn: "span 4" }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon
                                                style={{ color: "#fff", fontSize: "4rem" }} />}
                                            sx={{ bgcolor: "#468faf", borderRadius: '.8rem .8rem 0 0' }}
                                        >
                                            <Typography color="#fff" variant="h5" fontWeight={700}>
                                                Creative
                                            </Typography>
                                        </AccordionSummary>
                                        {/* TITLE */}
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
                                                    Title:
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.title}
                                                    name="title"
                                                    error={!!touched.title && !!errors.title}
                                                    helperText={touched.title && errors.title}
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

                                        {/* DESCRIPTION */}
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
                                                    Description:
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.description}
                                                    name="description"
                                                    error={!!touched.description && !!errors.description}
                                                    helperText={touched.description && errors.description}
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

                                        {/* CREATIVE PREVIEW */}
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
                                                    Creative Preview:
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.creativePreview}
                                                    name="creativePreview"
                                                    error={!!touched.creativePreview && !!errors.creativePreview}
                                                    helperText={touched.creativePreview && errors.creativePreview}
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

                                        {/* FINAL URL */}
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
                                                    Final URL:
                                                </Typography>
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    type="text"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    value={values.finalURL}
                                                    name="finalURL"
                                                    error={!!touched.finalURL && !!errors.finalURL}
                                                    helperText={touched.finalURL && errors.finalURL}
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
                                <Box display="flex" justifyContent="flex-end" padding="2rem">
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


const checkoutSchema = yup.object().shape({
    campaignName: yup.string().required("required"),
    budget: yup.number()
        .integer("Please enter a whole number")
        .required("Please enter budget"),
    bidAmount: yup.number()
        .integer("Please enter a whole number")
        .required("Please enter budget"),
    title: yup.string().required("required"),
    description: yup.string().required("required"),
    creativePreview: yup.string().required("required"),
    finalURL: yup.string().required("required"),
});
const initialValues = {
    campaignName: "",
    userStatus: "",
    dateTime: "",
    budget: "",
    bidAmount: "",
    title: "",
    description: "",
    creativePreview: "",
    finalURL: "",
};

export default CampaignForm;