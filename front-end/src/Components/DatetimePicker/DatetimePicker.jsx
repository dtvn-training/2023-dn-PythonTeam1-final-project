import { useState } from "react";
import { Box, Typography } from '@mui/material'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

const DatetimePicker = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleStartDateChange = (newValue) => {
        setStartDate(newValue);
    };

    const handleEndDateChange = (newValue) => {
        setEndDate(newValue);
        console.log("enddate", newValue.format("YYYY-MM-DD HH:mm"));
    };

    return (
        <Box display="flex" justifyContent="space-between">
            <Box Box
                display="flex"
                alignItems="center"
            >
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <Typography variant='h5' color='#000' backgroundColor='#fff' fontWeight='700'>Start time:</Typography>
                    <DatePicker
                        sx={{
                            ml: 1,
                            width: "18rem",
                            "& input": {
                                fontSize: "1.2rem",
                            },
                        }}
                        value={startDate}
                        onChange={handleStartDateChange}
                        renderInput={(params) => <TextField {...params} />}
                        format="YYYY-MM-DD HH:mm"
                    />
                </LocalizationProvider>
            </Box >

            <Box
                display="flex"
                alignItems="center"
                sx={{
                    ml: 2,
                    mr: 4,
                }}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Typography variant='h5' color='#000' backgroundColor='#fff' fontWeight='700'>End time:</Typography>
                    <DatePicker
                        sx={{
                            ml: 1,
                            width: "18rem",
                            "& input": {
                                fontSize: "1.2rem",
                            },
                        }}
                        value={endDate}
                        onChange={handleEndDateChange}
                        renderInput={(params) => <TextField {...params} />}
                        format="YYYY-MM-DD HH:mm"
                    />
                </LocalizationProvider>
            </Box>
        </Box >
    );
};

export default DatetimePicker;