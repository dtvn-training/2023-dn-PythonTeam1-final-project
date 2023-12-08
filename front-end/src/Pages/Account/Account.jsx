import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { Box } from "@mui/material";
import Search from "../../Components/Search/Search";
import { DataGrid } from "@mui/x-data-grid";
import AccountForm from "../../Components/AccountForm/AccountForm";
import buildAPI from "../../const/buildAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {
  MainContainer,
  HeaderContainer,
  ButtonCus,
  Column,
  Table,
  StyledBox,
  EditButton,
  DeleteButton,
} from "./account.js";

const Account = () => {
  const [accountData, setAccountData] = useState([]);
  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [csvData, setCSVData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleOpenEditForm = (row) => {
    setSelectedRow(row);
    setIsEditFormVisible(true);
  };
  const handleCloseEditForm = () => {
    setIsEditFormVisible(false);
  };
  const handleOpenCreateForm = () => {
    setIsCreateFormVisible(true);
  };
  const handleCloseCreateForm = () => {
    setIsCreateFormVisible(false);
  };

  const handleSearch = (searchResults) => {
    setAccountData(searchResults);
  };

  const convertRoleIdToString = (roleId) => {
    switch (roleId) {
      case "1":
        return "Admin";
      case "2":
        return "Agency";
      case "3":
        return "Advertiser";
      default:
        return `Unknown Role (${roleId})`;
    }
  };

  const convertRoleIdToInt = (roleId) => {
    switch (roleId) {
      case "Admin":
        return "1";
      case "Agency":
        return "2";
      case "Advertiser":
        return "3";
      default:
        return `Unknown Role (${roleId})`;
    }
  };

  useEffect(() => {
    buildAPI
      .get("/api/account")
      .then((response) => {
        const list_acount = response.data.list_acount || [];

        const dataWithIds = list_acount.map((account, index) => ({
          ...account,
          id: index + 1,
          user_name: `${account.first_name} ${account.last_name}`,
          role_id: convertRoleIdToString(account.role_id),
        }));

        setAccountData(dataWithIds);
        setCSVData(dataWithIds);
      })
      .catch((error) => {
        toast.error("Error fetching data from API:", error);
      });
  }, []);

  const createAccount = async (userData) => {
    try {
      const response = await buildAPI.post("/api/account/register", userData);
      toast.success("User created successfully!");

      const updatedDataWithIds = [
        {
          ...response.data,
          id: accountData.length + 1,
          user_name: `${userData.first_name} ${userData.last_name}`,
          email: `${userData.email}`,
          address: `${userData.address}`,
          phone: `${userData.phone}`,
          role_id: convertRoleIdToString(userData.role_id),
        },
        ...accountData,
      ];

      setAccountData(updatedDataWithIds);
      setCSVData(updatedDataWithIds);

      handleCloseCreateForm();
    } catch (error) {
      toast.error(
        "Email is already in use. Please choose another email address."
      );
    }
  };

  const updateUserData = () => {
    buildAPI
      .get("/api/account")
      .then((response) => {
        const list_acount = response.data.list_acount || [];
        const updatedDataWithIds = list_acount.map((account, index) => ({
          ...account,
          id: index + 1,
          user_name: `${account.first_name} ${account.last_name}`,
          role_id: convertRoleIdToString(account.role_id),
        }));
        setAccountData(updatedDataWithIds);
      })
      .catch((error) => {
        toast.error("Error fetching updated data from API:", error);
      });
  };

  const handleEditAccount = (selectedRow, userData) => {
    userData.user_id = selectedRow.user_id;

    userData.role_id = convertRoleIdToInt(userData.role_id);

    buildAPI
      .put(`/api/account/update/${selectedRow.user_id}`, userData)
      .then((response) => {
        toast.success("User updated successfully ", response.data.first_name);
        updateUserData();
        handleCloseEditForm();
        updateUserData();
      })
      .catch((error) => {
        console.error("Error updating user ", error);

        if (
          error.response &&
          error.response.data &&
          error.response.data.detail
        ) {
          console.log("Validation errors: ", error.response.data.detail);
        }

        toast.error("Error updating user");
      });
  };

  const handleDeleteClick = (row) => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      buildAPI
        .patch(`/api/account/delete/${row.user_id}`)
        .then((response) => {
          toast.success("User deleted successfully:", response.data);
          updateUserData();
        })
        .catch((error) => {
          toast.error("Error deleting user:", error);
        });
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerAlign: "center",
      align: "left",
      renderCell: ({ value }) => <Column>{value}</Column>,
    },
    {
      field: "user_name",
      headerName: "User Name",
      headerAlign: "center",
      flex: 2.5,
      renderCell: ({ value }) => <Column>{value}</Column>,
    },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      headerAlign: "center",
      flex: 1.5,
      renderCell: ({ value }) => <Column>{value}</Column>,
    },
    {
      field: "address",
      headerName: "Address",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ value }) => <Column>{value}</Column>,
    },
    {
      field: "phone",
      headerName: "Phone",
      type: "number",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ value }) => <Column>{value}</Column>,
    },
    {
      field: "role_id",
      headerName: "Role",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: ({ value }) => <Column>{value}</Column>,
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => (
        <Column>
          <EditButton onClick={() => handleOpenEditForm(params.row)}>
            Edit
          </EditButton>
          <DeleteButton onClick={() => handleDeleteClick(params.row)}>
            Delete
          </DeleteButton>
        </Column>
      ),
    },
  ];

  return (
    <MainContainer>
      <HeaderContainer>
        {/* SEARCH BAR */}
        <Search data={csvData} onSearch={handleSearch} />

        {/* EXPORT CSV $ CREATE ACCOUNT */}
        <Box>
          <CSVLink data={csvData} filename={"account-data.csv"}>
            <ButtonCus>Export CSV</ButtonCus>
          </CSVLink>

          <ButtonCus onClick={handleOpenCreateForm}>Create Account</ButtonCus>
          {isCreateFormVisible && (
            <AccountForm
              title={"Create Account"}
              onClose={handleCloseCreateForm}
              onSubmit={createAccount}
            />
          )}
          {isEditFormVisible && selectedRow && (
            <AccountForm
              title={"Edit Account"}
              onClose={handleCloseEditForm}
              onSubmit={(userData) => handleEditAccount(selectedRow, userData)}
              initialData={{
                first_name: selectedRow.first_name,
                last_name: selectedRow.last_name,
                email: selectedRow.email,
                address: selectedRow.address,
                phone: selectedRow.phone,
                role_id: selectedRow.role_id,
              }}
            />
          )}
          <ToastContainer />
        </Box>
      </HeaderContainer>

      {/* TABLE DASHBOARD */}
      <Table>
        <StyledBox>
          <DataGrid
            rows={accountData}
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
        </StyledBox>
      </Table>
    </MainContainer>
  );
};

export default Account;
