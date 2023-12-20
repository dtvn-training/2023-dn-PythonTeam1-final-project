import { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import CampaignSearch from "../../Components/Search/CampaignSearch";
import DatetimePicker from "../../Components/DatetimePicker/DatetimePicker";
import { DataGrid } from "@mui/x-data-grid";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import buildAPI from "../../const/buildAPI";
import CustomPagination from "../../Components/CustomPagination/CustomPagination";

const Dashboard = () => {
  const columns = [
    {
      field: "campaignNameAndCreativePreview",
      headerName: "Dashboard Name",
      headerAlign: "center",
      align: "left",
      flex: 1,
      width: 500,
      height:500,
      valueGetter: (params) => {
        return {
          campaignName: params.row.campaignName,
          creativePreview: params.row.creative.imgPreview,
        };
      },

      renderCell: ({ value }) => (
        <Box
          display={"flex"}
          component="div"
          style={{
            fontWeight: "bold",
            fontSize: "1.4rem",
          }}
        >
          <img
            display={"block"}
            src={value.creativePreview}
            alt="img-preview"
            style={{
              maxHeight: "100%",
              width: "150px",
              height: "3em",
              marginRight: "20px",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "300px",
            }}
          >
            <Typography noWrap fontSize={"1.4rem"} fontWeight={"bold"}>
              {value.campaignName}
            </Typography>
          </div>
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      width: 100,
      renderCell: ({ row: { status } }) => {
        return (
          <Box display="flex" justifyContent="center">
            <TripOriginIcon
              color={status === true ? "success" : "error"}
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
      width: 170,
      renderCell: ({ value }) => (
        <div
          style={{
            display: "flex",
            fontSize: "1.4rem",
            fontWeight: "bold",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
      width: 170,
      renderCell: ({ value }) => (
        <div
          style={{
            display: "flex",
            fontSize: "1.4rem",
            fontWeight: "bold",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
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
      width: 150,
      renderCell: ({ value }) => (
        <div
          style={{
            display: "flex",
            fontSize: "1.4rem",
            fontWeight: "bold",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ¥ {value}
        </div>
      ),
    },
    {
      field: "startDate",
      headerName: "Start Date",
      headerAlign: "center",
      align: "center",
      width: 150,
      renderCell: ({ value }) => (
        <div style={{ fontWeight: "bold", fontSize: "1.4rem" }}>{value}</div>
      ),
    },
    {
      field: "endDate",
      headerName: "End Date",
      headerAlign: "center",
      align: "center",
      width: 150,
      renderCell: ({ value }) => (
        <div style={{ fontWeight: "bold", fontSize: "1.4rem" }}>{value}</div>
      ),
    },
  ];

  const [campaignData, setCampaignData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchText, setSearchText] = useState("");



  useEffect(() => {
    fetchDataOnTable();
    setFilterData(() => [...campaignData]);
  }, []);

  useEffect(() => {
    let filteredData = campaignData.filter((item) =>
      item.campaignName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilterData(() => [...filteredData]);
  }, [campaignData, searchText]);

  const fetchDataOnTable = () => {
    buildAPI
      .get("api/campaigns/all")
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data["campaigns"]);
          setCampaignData(() => [...response.data["campaigns"]]);
        } else {
          setCampaignData(() => []);
        }
      })
      .catch(function (error) {
        setCampaignData(() => []);
        console.log(error);
      });
  };

  return (
    <>
      {/* Dashboard VIEW */}
      <Box sx={{ px: "4%", pt: "4%", width: "100%" }}>
        {/* DATE FIELD */}

        <Grid container spacing={4}>
          {/* SEARCH BAR */}

          <Grid item md={6} mt={1}>
            <CampaignSearch setSearch={setSearchText} />
          </Grid>

          {/* EXPORT CSV $ CREATE Dashboard */}
          <Grid
            item
            md={6}
            display="flex"
            mt={1}
            // marginLeft={1}
            sx={{}}
          >
            
            <DatetimePicker />
            
          </Grid>
        </Grid>

        {/* TABLE DASHBOARD */}
        <Box sx={{ mt: 4 }}>
          <Box
            sx={{
              width: "100%",
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                border: "1px solid #000",
              },
              ".MuiDataGrid-columnHeader": {
                backgroundColor: "#468faf",
                border: "1px solid #000",
                color: "white",
                fontSize: 16,
              },
              "$ .MuiTablePagination-displayedRows": {
                fontSize: "2rem",
              },
              "& .MuiDataGrid-footerContainer": {
                justifyContent: "center",
              },
              "& .MuiTablePagination-toolbar": {
                paddingTop: "4rem",
              },
              "& .MuiTablePagination-displayedRows": {
                fontSize: "1.5rem",
                fontWeight: 500,
                color: "#468faf",
              },
              ".MuiDataGrid-cell": {
                outline: 0,
              },
              ".MuiDataGrid-cell:focus": {
                outline: 0,
              },
            }}
          >
            <DataGrid
              rows={filterData}
              getRowHeight={() => "auto"}
              columns={columns}
              getRowId={(row) => row.campaignId}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 3,
                  },
                },
              }}
              slots={{
                pagination: CustomPagination,
              }}
              disableRowSelectionOnClick
              disableColumnMenu
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
