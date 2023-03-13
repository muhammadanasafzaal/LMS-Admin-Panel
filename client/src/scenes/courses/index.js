import { Box, useTheme, Button } from '@mui/material';
import FlexBetween from "components/FlexBetween";
import { DataGrid } from '@mui/x-data-grid';
import Header from 'components/Header';
import React, { useState } from 'react'
import { useGetCoursesQuery } from 'state/api'
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

const Courses = () => {

    const theme = useTheme();

    const { data, isLoading } = useGetCoursesQuery();
    console.log(data)

    const [open, setOpen] = useState(false);
    const [content, setContent] = useState('')

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const editCourse = (data) => {
      console.log(data)
      setOpen(true)
      let content = {
        action:'update_course',
        data: {
          id: data.row._id,
          title: data.row.title,
          isAcademic: data.row.isAcademic
        }
      }
      setContent(content)
    }

    const addCourse = () => {
      setOpen(true)
      let content = {
        action: 'add_course',
        data: null
      }
      setContent(content)
    }
    

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1
        },
        {
            field: "title",
            headerName: "Title",
            flex: 0.5
        },
        {
          field: "isAcademic",
          headerName: "Course Type",
          flex: 1,
          valueGetter: (params) => {
            let result = [];
            if (params.row) {
              result.push(params.row.isAcademic ? 'Academic' : 'Non Academic');
            } else {
              result = ["Unknown"];
            }
            return result.join(", ");
          },
          type: 'string',
        },
        {
          field: "actions",
          headerName: "Actions",
          flex: 1,
          renderCell: (cellValues) => {
            return (
              <>
                <IconButton aria-label="edit" onClick={() => editCourse(cellValues)}>
                  <EditIcon />
                </IconButton>
              </>
            );
          },
        }
    ]

  return (
    <Box m="1.5rem 2.5rem">
        <FlexBetween>
          <Header title="COURSES" subtitle="List of All Courses" />

          <Box>
            <Button
                onClick={() => addCourse()}
                sx={{
                  backgroundColor: theme.palette.secondary.light,
                  color: theme.palette.background.alt,
                  fontSize: "14px",
                  fontWeight: "bold",
                  padding: "10px 20px",
                }}
              >
                Add Course
              </Button>
          </Box>
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

export default Courses