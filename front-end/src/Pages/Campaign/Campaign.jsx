import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import {
  Box,
  Grid,
  Button,
  Stack,
  Pagination,
  PaginationItem,
} from "@mui/material";
import CampaignSearch from "../../Components/Search/CampaignSearch";
import DatetimePicker from "../../Components/DatetimePicker/DatetimePicker";
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import buildAPI from "../../const/buildAPI";
import CampaignDialog from "../../Components/CampaignForm/CampaignDialog";
import { toast } from "react-toastify";
import AlertDialog from "../../Components/AlertDialog/AlertDialog";

const Campaign = () => {
  const columns = [
    {
      field: "creative",
      headerName: "Image",
      headerAlign: "center",
      align: "left",
      flex: 1,
      renderCell: ({ value }) => (
        <Box
          component="div"
          style={{
            fontWeight: "bold",
            fontSize: "1.4rem",
          }}
        >
          <img
            src={value.imgPreview}
            alt="creative-preview"
            style={{
              maxWidth: '100%', 
              maxHeight: '100%',
              width: '12em', 
              height: '3em', 
              objectFit: 'cover', 
            }}
          />
        </Box>
      ),
    },
    {
      field: "campaignName",
      headerName: "Campaign Name",
      headerAlign: "center",
      align: "left",
      flex: 1,

      renderCell: ({ value }) => (
        <Box
          component="div"
          style={{
            fontWeight: "bold",
            fontSize: "1.4rem",
          }}
        >
          {value}
        </Box>
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
      flex: 1,
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
      flex: 1,
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
      flex: 1,
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
      flex: 1.5,
      renderCell: ({ value }) => (
        <div style={{ fontWeight: "bold", fontSize: "1.4rem" }}>{value}</div>
      ),
    },
    {
      field: "endDate",
      headerName: "End Date",
      headerAlign: "center",
      align: "center",
      flex: 1.5,
      renderCell: ({ value }) => (
        <div style={{ fontWeight: "bold", fontSize: "1.4rem" }}>{value}</div>
      ),
    },
    {
      field: "campaignId",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      flex: 1,
      sortable: false,
      renderCell: ({ value }) => (
        <Stack direction="column" spacing={1} my={1}>
          <Button
            variant="contained"
            onClick={() => handleEditButtonClick(value)}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDeleteButtonClick(value)}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  const [isCampaignFormOpen, setIsCampaignFormOpen] = useState(false);
  const [isDeleteConfirmFormOpen, setIsDeleteConfirmFormOpen] = useState(false);
  const [titleCampaignForm, setTitleCampaignForm] = useState("");
  const [initialFormState, setInitialFormState] = useState({});
  const [csvData, setCSVData] = useState([]);
  const [campaignData, setCampaignData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [idDelete, setIdDelete] = useState("");

  const handleDeleteButtonClick = (value) => {
    setIdDelete(value);
    setIsDeleteConfirmFormOpen(true);
  };

  const handleDeleteFormClose = () => {
    setIsDeleteConfirmFormOpen(false);
  };

  const handleAcceptDelete = () => {
    console.log(idDelete);
    let listIds = {
      campaign_ids: [idDelete],
    };
    buildAPI
      .patch("/api/campaigns/", listIds)
      .then(() => {
        toast.success("Campaign is deleted");
      })
      .catch(() => {
        toast.error("Campaign isn't deleted");
      })
      .finally(() => {
        fetchDataOnTable();
      });
  };

  const handleOpenCreateForm = () => {
    setInitialFormState(undefined);
    setTitleCampaignForm("Create Campaign");
    setIsCampaignFormOpen(true);
  };

  const handleOpenEditForm = () => {
    setTitleCampaignForm("Edit Campaign");
    setIsCampaignFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsCampaignFormOpen(false);
    fetchDataOnTable();
  };

  const handleEditButtonClick = (value) => {
    let currentCampaignData = campaignData.find(
      (campaign) => campaign.campaignId === value
    );

    let currentCampaignDataParse = {
      campaignId: value,
      campaignName: currentCampaignData.campaignName,
      userStatus: currentCampaignData.status,
      startDate: currentCampaignData.startDate,
      endDate: currentCampaignData.endDate,
      budget: currentCampaignData.budget,
      bidAmount: currentCampaignData.bidAmount,
      title: currentCampaignData.creative.title,
      description: currentCampaignData.creative.description,
      creativePreview: currentCampaignData.creative.imgPreview,
      finalURL: currentCampaignData.creative.url,
    };
    setInitialFormState(currentCampaignDataParse);
    handleOpenEditForm();
  };

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
      {/* DELETE CONFIRMATION FORM */}
      {isDeleteConfirmFormOpen && (
        <AlertDialog
          handleAccept={handleAcceptDelete}
          title="Confirmation"
          description="Please confirm that you want to delete this campaign."
          acceptText="Delete"
          cancelText="Cancle"
          handleClose={handleDeleteFormClose}
        />
      )}

      {/* CAMPAIGN FORM */}
      {isCampaignFormOpen && (
        <CampaignDialog
          title={titleCampaignForm}
          onClose={handleCloseForm}
          initialState={initialFormState}
        />
      )}

      {/* CAMPAIGN VIEW */}
      <Box sx={{ px: "4%", pt: "4%", width: "100%" }}>
        {/* DATE FIELD */}
        <Box width="50%">
          <DatetimePicker />
        </Box>

        <Grid container spacing={4}>
          {/* SEARCH BAR */}

          <Grid item md={6} mt={1}>
            <CampaignSearch setSearch={setSearchText} />
          </Grid>

          {/* EXPORT CSV $ CREATE CAMPAIGN */}
          <Grid
            item
            md={6}
            display="flex"
            mt={1}
            sx={{ flexDirection: "row-reverse" }}
          >
            <Button
              variant="contained"
              style={{
                height: "4rem",
                width: "15rem",
                fontSize: "1.4rem",
                textTransform: "none",
                backgroundColor: "#468faf",
              }}
              onClick={handleOpenCreateForm}
            >
              Create Campaign
            </Button>

            <CSVLink data={csvData} filename={"campaign-data.csv"}>
              <Button
                variant="contained"
                style={{
                  height: "4rem",
                  width: "15rem",
                  fontSize: "1.4rem",
                  textTransform: "none",
                  backgroundColor: "#468faf",
                  marginRight: "2rem",
                }}
                onClick={() => {
                  setCSVData(campaignData);
                }}
              >
                Export CSV
              </Button>
            </CSVLink>
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
              "& .MuiDataGrid-columnHeader": {
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
                overflow: "hidden",
                textOverflow: "ellipsis",
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

export default Campaign;

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      // @ts-expect-error
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}
