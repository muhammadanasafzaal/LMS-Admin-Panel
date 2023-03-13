import { Box, useTheme, Button } from '@mui/material';
import FlexBetween from "components/FlexBetween";
import { DataGrid } from '@mui/x-data-grid';
import Header from 'components/Header';
import React, { useState } from 'react'
import { useGetTotalSalesQuery } from 'state/api'


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const DailySales = () => {

  const theme = useTheme();

  const { data, isLoading } = useGetTotalSalesQuery();

  let tmp = data ? data : []
  let dailySales = []
  if (tmp && tmp.length > 0) {
    dailySales = tmp.filter((obj) => {
      const today = new Date()
      const saleDate = new Date(obj.updatedAt)
      if (saleDate.toDateString() === today.toDateString()) {
        return obj
      }
    });
  }

  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('')

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1
    },
    {
      field: "description",
      headerName: "Job Description",
      flex: 0.5
    },
    {
      field: "student",
      headerName: "Sale Made By",
      flex: 1,
      valueGetter: (params) => {
        let result = [];
        if (params.row) {
          console.log(params, 'params')
          result.push(params.row.student.name);
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      },
      type: 'string',
    },
    {
      field: "coin",
      headerName: "Sale Amount (coins)",
      flex: 1,
      valueGetter: (params) => {
        let result = [];
        if (params.row) {
          console.log(params, 'params')
          result.push(params.row.student.coins);
        } else {
          result = ["Unknown"];
        }
        return result.join(", ");
      },
      type: 'string',
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.5
    },
    {
      field: "updatedAt",
      headerName: "Sales Time",
      flex: 0.5
    },


    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   flex: 1,
    //   renderCell: (cellValues) => {
    //     return (
    //       <>
    //         <IconButton aria-label="edit" onClick={() => editJob(cellValues)}>
    //           <EditIcon />
    //         </IconButton>
    //       </>
    //     );
    //   },
    // }
  ]

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Today's Sales" subtitle="List of Today's Total Sales" />

        {/* <Box>
            <Button
                onClick={() => addJob()}
                sx={{
                  backgroundColor: theme.palette.secondary.light,
                  color: theme.palette.background.alt,
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
              >
                Add Job
              </Button>
          </Box> */}
      </FlexBetween>
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          autoHeight
          loading={isLoading || !dailySales}
          getRowId={(row) => row._id}
          rows={dailySales || []}
          columns={columns}
        />

      </Box>
    </Box>
  )
}

export default DailySales