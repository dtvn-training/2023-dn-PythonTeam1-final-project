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

const defaultStartDate = undefined;
const defaultEndDate = undefined;

const DatetimePicker = ({
  initialStartDate = defaultStartDate,
  passStartDate,
  initialEndDate = defaultEndDate,
  passEndDate,
  type,
}) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [error, setError] = useState(null);
  // console.log(initialStartDate, initialEndDate);
  const dateParse = (dateString) => {
    const formattedDate = dayjs(dateString, { timeZone: "UTC" });
    return formattedDate;
  };

  const errorMessage = React.useMemo(() => {
    switch (error) {
      case "minDate": {
        return "Please select a date greater than start date";
      }

      case "invalidDate": {
        return "Your date is not valid";
      }

      default: {
        return "";
      }
    }
  }, [error]);

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
          <span className="date-range">Start time:</span>
          <DatePicker
            className="customDatePicker"
            value={startDate ? startDate : null}
            onChange={handleStartDateChange}
            renderInput={(params) => <TextField {...params} />}
            format="YYYY-MM-DD HH:mm"
          />
        </LocalizationProvider>
      </Box>

      <Box className="datetime-component">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <span className="date-range"> End time:</span>
          <DatePicker
            className="customDatePicker"
            value={endDate ? endDate : null}
            onChange={handleEndDateChange}
            renderInput={(params) => <TextField {...params} />}
            format="YYYY-MM-DD HH:mm"
            onError={(newError) => setError(newError)}
            slotProps={{
              textField: {
                helperText: errorMessage,
              },
            }}
            minDate={startDate}
          />
        </LocalizationProvider>
      </Box>
    </Box>
  );
};

export default DatetimePicker;
