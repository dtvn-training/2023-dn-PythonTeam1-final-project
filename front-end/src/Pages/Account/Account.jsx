import { useState, useEffect } from "react";
import { CSVLink } from 'react-csv';
import { Box } from '@mui/material'
import Search from "../../Components/Search/Search";
import { DataGrid } from '@mui/x-data-grid';
import AccountForm from "../../Components/AccountForm/AccountForm";
import buildAPI from "../../const/buildAPI"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { MainContainer, HeaderContainer, ButtonCus, Column, Table, StyledBox, EditButton, DeleteButton } from './account.js'

const Account = () => {
    const [accountData, setAccountData] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const handleOpenForm = () => {
        setIsFormVisible(true);
    };
    const handleCloseForm = () => {
        setIsFormVisible(false);
    };
    const [csvData, setCSVData] = useState([]);

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

    useEffect(() => {
        buildAPI.get("/api/account")
            .then(response => {
                const list_acount = response.data.list_acount || [];


                const dataWithIds = list_acount.map((account, index) => ({
                    ...account,
                    id: index + 1,
                    user_name: `${account.first_name} ${account.last_name}`,
                    role_id: convertRoleIdToString(account.role_id),
                }));

                setAccountData(dataWithIds);
                setCSVData(dataWithIds);

                console.log('User data:', dataWithIds);
            })
            .catch(error => {
                console.error('Error fetching data from API:', error);
            });
    }, []);

    const createAccount = async (userData) => {
        try {
            const response = await buildAPI.post("/api/account/register", userData);

            toast.success('User created successfully!');
            console.log("Create User Response:", response);

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

            handleCloseForm();
        } catch (error) {
            toast.error('Email is already in use. Please choose another email address.');
        }
    };

    const updateUserData = () => {
        buildAPI.get('/api/account')
            .then(response => {
                const list_acount = response.data.list_acount || [];
                const updatedDataWithIds = list_acount.map((account, index) => ({
                    ...account,
                    id: index + 1,
                    user_name: `${account.first_name} ${account.last_name}`,
                    role_id: convertRoleIdToString(account.role_id),
                }));
                setAccountData(updatedDataWithIds);
            })
            .catch(error => {
                console.error('Error fetching updated data from API:', error);
            });
    };


    const handleDeleteClick = (row) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            buildAPI
                .delete(`/api/account/delete/${row.user_id}`)
                .then((response) => {
                    toast.log('User deleted successfully:', response.data);
                    updateUserData();
                })
                .catch((error) => {
                    toast.error('Error deleting user:', error);
                });
        }
    };

    const columns = [
        {
            field: "id",
            headerName: "ID",
            headerAlign: "center",
            align: "left",
            renderCell: ({ value }) => (
                <Column>
                    {value}
                </Column>
            ),
        },
        {
            field: "user_name",
            headerName: "User Name",
            headerAlign: "center",
            flex: 2.5,
            renderCell: ({ value }) => (
                <Column>
                    {value}
                </Column>
            ),
        },
        {
            field: "email",
            headerName: "Email",
            type: "email",
            headerAlign: "center",
            flex: 1.5,
            renderCell: ({ value }) => (
                <Column>
                    {value}
                </Column>
            ),
        },
        {
            field: "address",
            headerName: "Address",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: ({ value }) => (
                <Column>
                    {value}
                </Column>
            ),
        },
        {
            field: "phone",
            headerName: "Phone",
            type: "number",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: ({ value }) => (
                <Column>
                    {value}
                </Column>
            ),
        },
        {
            field: "role_id",
            headerName: "Role",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: ({ value }) => (
                <Column>
                    {value}
                </Column>
            ),
        },
        {
            field: "action",
            headerName: "Action",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: (params) => (
                <Column>
                    <EditButton onClick={handleOpenForm}>Edit</EditButton>
                    <DeleteButton onClick={() => handleDeleteClick(params.row)}>Delete</DeleteButton>
                </Column>
            ),
        }
    ];

    return (
        <MainContainer>
            <HeaderContainer>
                {/* SEARCH BAR */}
                <Search />

                {/* EXPORT CSV $ CREATE ACCOUNT */}
                <Box>
                    <CSVLink data={csvData} filename={'account-data.csv'}>
                        <ButtonCus>
                            Export CSV
                        </ButtonCus>
                    </CSVLink>

                    <ButtonCus
                        onClick={handleOpenForm}
                    >Create Account</ButtonCus>
                    {isFormVisible && (
                        <AccountForm title="Create Account" onClose={handleCloseForm} onSubmit={createAccount} />
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
        </MainContainer >
    );
};

export default Account;
