import { Box, useTheme, Button, InputBase } from '@mui/material';
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { DataGrid } from '@mui/x-data-grid';
import Header from 'components/Header';
import React, { useState, useEffect } from 'react'
import { useGetUserComplainsQuery } from 'state/api'
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Navigate } from 'react-router-dom';
import { GenericModal } from 'components/GenericModal';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

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

const Complains = () => {

    const theme = useTheme();

    let { data, isLoading } = useGetUserComplainsQuery();
    if(!data || data.length == 0){
      data = []
    }
    console.log(data, 'all complains')

    const [open, setOpen] = useState(false);
    const [content, setContent] = useState('')

    const [filterQuery, setFilterQuery] = useState(null)
    const [filteredData, setFilteredData] = useState(null)

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    // const editCourse = (data) => {
    //   console.log(data)
    //   setOpen(true)
    //   let content = {
    //     action:'update_course',
    //     data: {
    //       id: data.row._id,
    //       title: data.row.title,
    //       isAcademic: data.row.isAcademic
    //     }
    //   }
    //   setContent(content)
    // }

    // const addCourse = () => {
    //   setOpen(true)
    //   let content = {
    //     action: 'add_course',
    //     data: null
    //   }
    //   setContent(content)
    // }
    

    // const columns = [
    //     {
    //         field: "student",
    //         headerName: "ID",
    //         flex: 1
    //     },
    //     {
    //         field: "title",
    //         headerName: "Course",
    //         flex: 0.5
    //     },
    //     {
    //       field: "isAcademic",
    //       headerName: "Is Course Academic",
    //       flex: 0.5
    //   },
    //     // {
    //     //   field: "isAcademic",
    //     //   headerName: "Course Type",
    //     //   flex: 1,
    //     //   valueGetter: (params) => {
    //     //     let result = [];
    //     //     if (params.row) {
    //     //       result.push(params.row.isAcademic ? 'Academic' : 'Non Academic');
    //     //     } else {
    //     //       result = ["Unknown"];
    //     //     }
    //     //     return result.join(", ");
    //     //   },
    //     //   type: 'string',
    //     // },
    //     // {
    //     //   field: "actions",
    //     //   headerName: "Actions",
    //     //   flex: 1,
    //     //   renderCell: (cellValues) => {
    //     //     return (
    //     //       <>
    //     //         <IconButton aria-label="edit" onClick={() => editCourse(cellValues)}>
    //     //           <EditIcon />
    //     //         </IconButton>
    //     //       </>
    //     //     );
    //     //   },
    //     // }
    // ]
    const columns = [
      {
          field: "_id",
          headerName: "Complain Id",
          flex: 1
      },
      {
        field: "complained by id",
        headerName: "Complainer Id",
        flex: 1,
        valueGetter: (params) => {
          let result = [];
          if (params.row) {
            result.push(params.row.student._id);
          } else {
            result = ["Unknown"];
          }
          return result.join(", ");
        },
        type: 'string',
      },
      {
        field: "complained by name",
        headerName: "Complainer Name",
        flex: 1,
        valueGetter: (params) => {
          let result = [];
          if (params.row) {
            result.push(params.row.student.name);
          } else {
            result = ["Unknown"];
          }
          return result.join(", ");
        },
        type: 'string',
      },
      {
        field: "complainer role",
        headerName: "Complainer Role",
        flex: 1,
        valueGetter: (params) => {
          let result = [];
          if (params.row) {
            result.push('student');
          } else {
            result = ["Unknown"];
          }
          return result.join(", ");
        },
        type: 'string',
      },
      {
        field: "complained against id",
        headerName: "Complained Against Id",
        flex: 1,
        valueGetter: (params) => {
          let result = [];
          if (params.row.student) {
            result.push(params.row.teacher._id);
          } else {
            result = ["Unknown"];
          }
          return result.join(", ");
        },
        type: 'string',
      },
      {
        field: "complained against name",
        headerName: "Complained Against Name",
        flex: 1,
        valueGetter: (params) => {
          let result = [];
          if (params.row.student) {
            result.push(params.row.teacher.name);
          } else {
            result = ["Unknown"];
          }
          return result.join(", ");
        },
        type: 'string',
      },
      {
        field: "complained against role",
        headerName: "Complained Against Role",
        flex: 1,
        valueGetter: (params) => {
          let result = [];
          if (params.row.student) {
            result.push('teacher');
          } else {
            result = ["Unknown"];
          }
          return result.join(", ");
        },
        type: 'string',
      },
      {
        field: "complaintMessage",
        headerName: "Complain",
        flex: 1
      },
    ]

    const filterRequestData = () => {
      let tmp = data.filter((obj) => {
        if(obj._id == filterQuery || obj.student.name == filterQuery){
          console.log('found' )
          return obj
        }
      });
      console.log(tmp, 'filtered')
      setFilteredData(tmp)
    }

    useEffect(() => {
      console.log(filterQuery, 'filter data')
      if(filterQuery){
        filterRequestData()
      }
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterQuery])
    

  return (
    <Box m="1.5rem 2.5rem">
        <FlexBetween>
          <Header title="USER COMPLAINS" subtitle="List of All User Complains" />

          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search complain by user id..." value={filterQuery} onChange={(e) => setFilterQuery(e.target.value) } />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
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
                loading={isLoading || !data}
                getRowId={(row) => row._id}
                rows={((filteredData && filteredData.length > 0) && filterQuery)  ? filteredData : data}
                columns={columns}
            />
            
            <Modal
              open={open}
              onClose={handleClose}
            >
              <GenericModal
                content={content}
                setOpen={setOpen}
              />
            </Modal>
        </Box>
    </Box>
  )
}

export default Complains