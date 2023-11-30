import { useState } from "react";
import { Box, Button } from '@mui/material'
import { mockDataAccount } from "../../data/mockData";
import Search from "../../Components/Search/Search";
import { DataGrid } from '@mui/x-data-grid';
import AccountForm from "../../Components/AccountForm/AccountForm";

const Account = () => {
    const columns = [
        {
            field: "id",
            headerName: "ID",
            headerAlign: "center",
            align: "left",
            renderCell: ({ value }) => (
                <div style={{ fontWeight: 'bold', fontSize: "1.4rem", marginLeft: "2rem" }}>
                    {value}
                </div>
            ),
        },
        {
            field: "userName",
            headerName: "User Name",
            headerAlign: "center",
            flex: 2.5,
            renderCell: ({ value }) => (
                <div style={{ fontWeight: 'bold', marginLeft: "2rem", fontSize: "1.4rem" }}>
                    {value}
                </div>
            ),
        },
        {
            field: "email",
            headerName: "Email",
            type: "email",
            headerAlign: "center",
            flex: 1.5,
            renderCell: ({ value }) => (
                <div style={{ display: 'flex', fontSize: "1.4rem", marginLeft: "2rem", fontWeight: 'bold', alignItems: 'center', justifyContent: 'center' }}>
                    {value}
                </div>
            ),
        },
        {
            field: "address",
            headerName: "Address",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: ({ value }) => (
                <div style={{ display: 'flex', fontSize: "1.4rem", fontWeight: 'bold', alignItems: 'center', justifyContent: 'center' }}>
                    {value}
                </div>
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
                <div style={{ display: 'flex', fontSize: "1.4rem", fontWeight: 'bold', alignItems: 'center', justifyContent: 'center' }}>
                    {value}
                </div>
            ),
        },
        {
            field: "role",
            headerName: "Role",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: ({ value }) => (
                <div style={{ fontWeight: 'bold', fontSize: "1.4rem" }}>
                    {value}
                </div>
            ),
        },
        {
            field: "action",
            headerName: "Action",
            headerAlign: "center",
            align: "center",
            flex: 1,
            renderCell: ({ value }) => (
                <div style={{ fontWeight: 'bold', fontSize: "1.4rem" }}>
                    {value}
                </div>
            ),
        }
    ];

    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleOpenForm = () => {
        setIsFormVisible(true);
    };

    const handleCloseForm = () => {
        setIsFormVisible(false);
    };
    return (
        <Box m="3rem">
            <Box mt={12} mr={2} display="flex" justifyContent="space-between">
                {/* SEARCH BAR */}
                <Search />

                {/* EXPORT CSV $ CREATE ACCOUNT */}
                <Box>
                    <Button
                        variant="contained"
                        style={{
                            width: "18rem",
                            fontSize: "1.6rem",
                            textTransform: 'none',
                            backgroundColor: '#468faf',
                            marginRight: "2rem",
                        }}
                        onClick={() => {
                            alert('Export CSV');
                        }}
                    >Export CSV</Button>

                    <Button
                        variant="contained"
                        style={{
                            width: "18rem",
                            fontSize: "1.6rem",
                            textTransform: 'none',
                            backgroundColor: '#468faf',
                        }}
                        onClick={handleOpenForm}
                    >Create Account</Button>
                    {isFormVisible && (
                        <AccountForm title="Create Account" onClose={handleCloseForm} />
                    )}
                </Box>
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
                    "$ .MuiTablePagination-displayedRows": {
                        fontSize: "2rem",
                    },
                    "& .MuiDataGrid-footerContainer": {
                        justifyContent: "center"
                    },
                    "& .MuiTablePagination-toolbar": {
                        paddingTop: "4rem"
                    },
                    "& .MuiTablePagination-displayedRows": {
                        fontSize: "1.5rem",
                        fontWeight: 500,
                        color: "#468faf"
                    },
                }}
                >
                    <DataGrid
                        rows={mockDataAccount}
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
        </Box >
    );
};

export default Account;
