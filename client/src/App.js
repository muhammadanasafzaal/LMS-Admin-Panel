import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Products from "./scenes/products"
import Layout from "./scenes/layout"
import Transactions from "./scenes/transactions"
import Geography from './scenes/geography'
import Overview from './scenes/overview'
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import Admin from "scenes/admin"
import Performance from "scenes/performance"
import Login from 'scenes/auth/login'
import Register from 'scenes/auth/register'
import Teachers from "./scenes/teachers";
import Students from "scenes/students";
import AllUsers from "scenes/all_users";
import Courses from "scenes/courses";
import Jobs from "scenes/jobs";
import TotalSales from "scenes/total-sales";
import DailySales from "scenes/daily-sales";
import MonthlySales from "scenes/monthly-sales";
import YearlySales from "scenes/yearly-sales";
import Requests from "scenes/requests";
import Complaints from "scenes/complains";


function App() {
  const mode = useSelector((state) => state.global.mode);
  const isLoggedIn = useSelector((state) => state.global.isLoggedIn);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  console.log(isLoggedIn, 'islogged in')

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
              <Route path="/login" element={!isLoggedIn ? (
                <Login />
              ) : (
                <Navigate replace to={"/"} />
              )} />

              <Route path="/register" element={!isLoggedIn ? (
                <Register />
              ) : (
                <Navigate replace to={"/"} />
              )} />

              <Route element={!isLoggedIn ? (
                <Login />
              ) : (
                <Layout/>
              )}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />}  />
                {/* <Route path="/products" element={<Products />}  /> */}
                <Route path="/allusers" element={<AllUsers />}  />
                <Route path="/teachers" element={<Teachers />}  />
                <Route path="/students" element={<Students />}  />
                <Route path="/courses" element={<Courses />}  />
                <Route path="/jobs" element={<Jobs />}  />
                {/* <Route path="/transactions" element={<Transactions/> } /> */}
                {/* <Route path="/geography" element={<Geography/> } /> */}
                <Route path="/total" element={<TotalSales />}  />
                <Route path="/daily" element={<DailySales />}  />
                <Route path="/monthly" element={<MonthlySales />}  />
                <Route path="/yearly" element={<YearlySales />}  />
                <Route path="/overview" element={<Overview/> } />
                <Route path="/requests" element={<Requests/> } />
                <Route path="/complaints" element={<Complaints/> } />
                {/* <Route path="/daily" element={<Daily />} /> */}
                {/* <Route path="/monthly" element={<Monthly />} />
                <Route path="/breakdown" element={<Breakdown />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/performance" element={<Performance />} /> */}
              </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
