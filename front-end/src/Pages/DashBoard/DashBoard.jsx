import { Box } from '@mui/material'
import * as React from 'react';
import Search from "../../Components/Search/Search";
import DatetimePicker from '../../Components/DatetimePicker/DatetimePicker';
import { mockData } from "../../data/mockData";
import TripOriginIcon from '@mui/icons-material/TripOrigin';
import { DataGrid } from '@mui/x-data-grid';

const Dashboard = () => {
  const columns = [
    {
      field: "campaignName",
      headerName: "Campaign Name",
      headerAlign: "center",
      align: "left",
      flex: 2,
      renderCell: ({ value }) => (
        <div style={{ fontWeight: 'bold', fontSize: "1.4rem" }}>
          {value}
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ row: { status } }) => {
        return (
          <Box
            display="flex"
            justifyContent="center"
          >
            <TripOriginIcon
              color={status === 1 ? "success" : "error"}
              sx={{ fontSize: 18 }}
            />
          </Box>
        );
      },
    },
    {
      field: "usedAmount",
      headerName: "Used Amount",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ value }) => (
        <div style={{ display: 'flex', fontSize: "1.4rem", fontWeight: 'bold', alignItems: 'center', justifyContent: 'center' }}>
          ¥ {value}
        </div>
      ),
    },
    {
      field: "usageRate",
      headerName: "Usage Rate",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 1.2,
      renderCell: ({ value }) => (
        <div style={{ display: 'flex', fontSize: "1.4rem", fontWeight: 'bold', alignItems: 'center', justifyContent: 'center' }}>
          {value}%
        </div>
      ),
    },
    {
      field: "budget",
      headerName: "Budget",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 1.2,
      renderCell: ({ value }) => (
        <div style={{ display: 'flex', fontSize: "1.4rem", fontWeight: 'bold', alignItems: 'center', justifyContent: 'center' }}>
          ¥ {value}
        </div>
      ),
    },
    {
      field: "startDate",
      headerName: "Start Date",
      headerAlign: "center",
      align: "center",
      flex: 2,
      renderCell: ({ value }) => (
        <div style={{ fontWeight: 'bold', fontSize: "1.4rem" }}>
          {value}
        </div>
      ),
    },
    {
      field: "endDate",
      headerName: "End Date",
      headerAlign: "center",
      align: "center",
      flex: 2,
      renderCell: ({ value }) => (
        <div style={{ fontWeight: 'bold', fontSize: "1.4rem" }}>
          {value}
        </div>
      ),
    }
  ];

  return (
    <Box m="2em">
      <Box display="flex" justifyContent="space-between">
        {/* SEARCH BAR */}
        <Search />

        {/* DATE FIELD */}
        <DatetimePicker />
      </Box>

      {/* TABLE DASHBOARD */}
      <Box sx={{ ml: 6, mt: 4 }}>
        <Box sx={{
          width: '99%',
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            border: "1px solid #000",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#468faf",
            border: "1px solid #000",
            color: "white",
            fontSize: 16,
          },
        }}>
          <DataGrid
            rows={mockData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 3,
                },
              },
            }}
            disableRowSelectionOnClick
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
