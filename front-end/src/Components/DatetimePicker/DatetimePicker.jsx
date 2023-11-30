import { useState } from "react";
import { Box } from '@mui/material'
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import './datetimepicker.scss';

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
        <Box className="datetime-container">
            <Box className="dateime-component">
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <span >Start time:</span>
                    <DatePicker
                        className="customDatePicker"
                        value={startDate}
                        onChange={handleStartDateChange}
                        renderInput={(params) => <TextField {...params} />}
                        format="YYYY-MM-DD HH:mm"
                    />
                </LocalizationProvider>
            </Box >

            <Box className="dateime-component">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <span>End time:</span>
                    <DatePicker
                        className="customDatePicker"
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