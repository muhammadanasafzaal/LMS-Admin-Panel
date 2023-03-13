import React, { useState } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import { useGetTeachersQuery, useGetStudentsQuery, useGetTotalSalesQuery } from 'state/api'
import StatBox from "components/StatBox";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");


  const studentData = useGetStudentsQuery().data
  const teacherData = useGetTeachersQuery().data
  const salesData = useGetTotalSalesQuery().data;

  const isLoadingStudents = useGetStudentsQuery().isLoading
  const isLoadingTeachers = useGetTeachersQuery().isLoading
  const isLoadingSales = useGetTotalSalesQuery().isLoading

  const [dailySalesStats, setDailySalesStats] = useState(0)

  let tmp = salesData ? salesData : []
  let dailySales = []
  let yesterdaySales = []
  if (tmp && tmp.length > 0) {
    dailySales = tmp.filter((obj) => {
      const today = new Date()
      const yesterday = new Date(obj.updatedAt);
      yesterday.setDate(yesterday.getDate() - 1);
      const saleDate = new Date(obj.updatedAt)
      if (saleDate.toDateString() === today.toDateString()) {
        return obj
      }
      else if (saleDate.toDateString() === yesterday.toDateString()) {
        yesterdaySales.push(obj)
      }
    });
  }
  console.log(dailySales)
  console.log(yesterdaySales)

  // let data = (studentData && teacherData) ? [...studentData, ...teacherData] : []

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
  ]

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        {/* <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box> */}
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        {/* <StatBox
          title="Total Teachers"
          value={data && data.totalTeachers}
          increase="+14%"
          description="Since last month"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        /> */}
        <StatBox
          title="Total Sales"
          description="Since last month"
          value={salesData && salesData.length}
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
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
              backgroundColor: theme.palette.background.alt,
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

          <div style={{backgroundColor: theme.palette.mode == "dark" ? 'rgb(26 49 58)' : '#d7d7d7', padding: '15px 10px',
            borderRadius: '5px'}}>
            <h6 style={{ marginBottom: 0 }}> Total Sales Data </h6>
          </div>
          <DataGrid
            loading={isLoadingSales || !salesData}
            getRowId={(row) => row._id}
            rows={(salesData) || []}
            columns={columns}
          />
        </Box>

        <StatBox
          title="Total Teachers Registered"
          description="Since last month"
          value={teacherData && teacherData.length}
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Daily Sales"
          description="Since last month"
          value={dailySales && dailySales.length}
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title="Total Students Registered"
          value={studentData && studentData.length}
          description="Since last month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />


        {/* ROW 2 */}
      </Box>
    </Box>
  );
};

export default Dashboard;