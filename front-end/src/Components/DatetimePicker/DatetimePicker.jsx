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

const defaultStartDate = dayjs({ timeZone: "UTC" }).day();
const defaultEndtDate = dayjs({ timeZone: "UTC" }).day();

const DatetimePicker = ({
  initialStartDate = defaultStartDate,
  passStartDate,
  initialEndDate = defaultEndtDate,
  passEndDate,
}) => {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());
  // console.log(initialStartDate, initialEndDate);
  const dateParse = (dateString) => {
    const formattedDate = dayjs(dateString, { timeZone: "UTC" });
    return formattedDate;
  };

  useEffect(() => {
    if (initialStartDate) {
      setStartDate(() => {
        return dateParse(initialStartDate);
      });

      if (passStartDate) passStartDate(initialStartDate);
    }

    if (initialEndDate) {
      setEndDate(() => {
        return dateParse(initialEndDate);
      });
      if (passEndDate) passEndDate(initialEndDate);
    }
  }, []);

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    if (passStartDate) passStartDate(dateToString(newValue));
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
    if (passEndDate) passEndDate(dateToString(newValue));
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
