import { Box, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Header from 'components/Header';
import React, { useState } from 'react'
import { useGetStudentsQuery } from 'state/api'
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Navigate } from 'react-router-dom';
import { useDeleteStudentMutation } from 'state/api'
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

const Students = () => {

    const theme = useTheme();

    const { data, isLoading } = useGetStudentsQuery();
    console.log(data)
    const [delStudent, response] = useDeleteStudentMutation()

    const [open, setOpen] = useState(false);
    const [content, setContent] = useState('')

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const editStudent = (data) => {
      setOpen(true)
      let content = {
        action: 'update_student',
        data: {
          id: data.row._id,
          name: data.row.name,
          // email: data.row.user.email,
          // role: data.row.user.role,
          // contactNo: data.row.user.contactNo,
          // password: data.row.user.password
        }
      }
      setContent(content)
    }

    const deleteStudent = (data) => {
      console.log(data.row._id, 'delete')
      delStudent(data.row._id)
      .unwrap()
      .then((res) => { 
        console.log(res)
        alert('Delete successful')
      })
      .then((error) => {
        if(error){
          console.log(error)
          alert('An error occurred')
          
        }
      })
    }

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1
        },
        {
            field: "name",
            headerName: "Name",
            flex: 0.5
        },
        {
          field: "email",
          headerName: "Email",
          flex: 1,
          valueGetter: (params) => {
            let result = [];
            if (params.row.user) {
              if (params.row.user.email) {
                result.push(params.row.user.email);
              }
            } else {
              result = ["Unknown"];
            }
            return result.join(", ");
          },
          type: 'string',
        },
        {
          field: "contact",
          headerName: "Contact",
          flex: 1,
          valueGetter: (params) => {
            let result = [];
            if (params.row.user) {
              if (params.row.user.contactNo) {
                result.push('+92'+params.row.user.contactNo);
              }
            } else {
              result = ["Unknown"];
            }
            return result.join(", ");
          },
        },
        {
          field: "actions",
          headerName: "Actions",
          flex: 1,
          renderCell: (cellValues) => {
            return (
              <>
                <IconButton aria-label="edit" onClick={() => editStudent(cellValues)}>
                  <EditIcon />
                </IconButton>

                <IconButton aria-label="delete" onClick={() => deleteStudent(cellValues)}>
                  <DeleteIcon />
                </IconButton>
              </>
            );
          },
        }
    ]

  return (
    <Box m="1.5rem 2.5rem">
        <Header title="STUDENTS" subtitle="List of Students" />
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
                rows={data || []}
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

export default Students