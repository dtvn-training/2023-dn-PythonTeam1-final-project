import { useState } from "react";
import { Box } from "@mui/material";
import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import "./datetimepicker.scss";
import dayjs from "dayjs";
import { useEffect } from "react";

const dateToString = (value) => {
  return value.format("YYYY-MM-DD HH:mm");
};

const DatetimePicker = (props) => {
  const [startDate, setStartDate] = useState(dayjs(""));
  const [endDate, setEndDate] = useState(dayjs(""));

  const dateParse = (dateString) => {
    const formattedDate = dayjs(dateString, { timeZone: "UTC" });
    return formattedDate;
  };

  useEffect(() => {
    if (props.initialStartDate) {
      setStartDate(() => {
        return dateParse(props.initialStartDate);
      });

      if (props.passStartDate) props.passStartDate(props.initialStartDate);
    }

    if (props.initialEndDate) {
      setEndDate(() => {
        return dateParse(props.initialEndDate);
      });
      if (props.passEndDate) props.passEndDate(props.initialEndDate);
    }
  }, []);

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    if (props.passStartDate) props.passStartDate(dateToString(newValue));
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
    if (props.passEndDate) props.passEndDate(dateToString(newValue));
  };

  return (
    <Box className="datetime-container">
      <Box className="datetime-component">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <span>Start time:</span>
          <DatePicker
            className="customDatePicker"
            value={startDate}
            onChange={handleStartDateChange}
            renderInput={(params) => <TextField {...params} />}
            format="YYYY-MM-DD HH:mm"
          />
        </LocalizationProvider>
      </Box>

      <Box className="datetime-component">
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
    </Box>
  );
};

export default DatetimePicker;
