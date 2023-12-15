import styled from 'styled-components';

export const Column = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
`;

export const MainContainer = styled.div`
  margin: 3rem;
`;

export const HeaderContainer = styled.div`
  margin-top: 12rem;
  margin-right: 2rem;
  margin-left: 5rem;
  display: flex;
  justify-content: space-between;
`;

export const ButtonCus = styled.button`
    width: 18rem;
    padding: 1rem 0;
    border: none;
    color: #fff;
    border-radius: .5rem;
    font-size: 1.6rem;
    text-transform: none;
    background-color: #468faf;
    margin-right: 2rem;
    &:hover {
        background: darkcyan; 
        cursor: pointer;    
    }
`;

export const Table = styled.div`
    width: 95%;
    margin-left: 5rem;
    margin-top: 4rem
`;

export const EditButton = styled.button`
    background: green;
    color: #fff;
    margin-right: .5rem;
    padding: .8rem 1.5rem;
    border: none;
    border-radius: .4rem;
    &:hover {
        background: darkgreen; 
        cursor: pointer;    
    }
`;

export const DeleteButton = styled.button`
    background: red;
    color: #fff;
    margin-right: .5rem;
    padding: .8rem 1.5rem;
    border: none;
    border-radius: .4rem;
    &:hover {
        background: darkred; 
        cursor: pointer;    
    }
`;

export const dataGridStyles = {
    width: '100%',
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
};

export const StyledBox = styled.div(dataGridStyles);