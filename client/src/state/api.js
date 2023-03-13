import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    baseQuery: fetchBaseQuery({ 
        baseUrl: process.env.REACT_APP_BASE_URL,
     }),
    reducerPath: "adminApi",
    tagTypes: ["User", "Products, Customers, Transactions", "Geography", "Sales", "Admins", "Performance", 
    "Dashboard", 'Login','Register', 'AllTeachers', 'AllStudents', 'DeleteStudent', 'UpdateStudent', 'DeleteTeacher', 'UpdateTeacher', 
    "AddCourse", "AllCourses", "AllJobs", "TotalSales", "UserRequests", "UserComplains"],
    endpoints: (build) => ({
        getUser: build.query ({
            query: (id) => `general/user/${id}`,
            providerTags: ["User"]
        }),
        getProducts: build.query ({
            query: () => "client/products", 
            providesTags: ["Products"]
        }),
        getCustomers: build.query ({
            query: () => "client/customers", 
            providesTags: ["Customers"]
        }),
        getTransactions: build.query({
            query:({ page, pageSize, sort, search }) => ({
                url: "client/transactions",
                method: "GET",
                params: { page, pageSize, sort, search }
            }),
            providesTags: ["Transactions"]
        }),
        getGeography: build.query ({
            query: () => "client/geography", 
            providesTags: ["Geography"]
        }), 
        getSales: build.query ({
            query: () => "sales/sales", 
            providesTags: ["Sales"]
        }), 
        getAdmins: build.query ({
            query: () => "management/admins", 
            providesTags: ["Admins"]
        }), 
        getUserPerformance: build.query ({
            query: (id) => `management/performance/${id}`,
            providerTags: ["Performance"]
        }),
        getDashboardStats: build.query ({
            query: () => `general/dashboard`,
            providerTags: ["Dashboard"]
        }),
        login: build.mutation({
            query: (payload) => ({
              url: 'https://educonnectbackend-production.up.railway.app/api/auth/login',
              method: 'POST',
              body: payload,
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            }),
            invalidatesTags: ['Login'],
        }),
        register: build.mutation({
            query: (payload) => ({
              url: 'https://educonnectbackend-production.up.railway.app/api/auth/register',
              method: 'POST',
              body: payload,
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            }),
            invalidatesTags: ['Register'],
        }),
        getStudents: build.query({
            query:() => ({
                url: "https://educonnectbackend-production.up.railway.app/api/students",
                method: "GET",
                headers: {
                    'token': 'Bearer '+localStorage.getItem('token')
                },
            }),
            providesTags: ["AllStudents"]
        }),
        updateStudent: build.mutation({
            query: (payload) => ({
              url: `https://educonnectbackend-production.up.railway.app/api/students/${payload.id}`,
              method: 'PUT',
              body: { name: payload.name },
              headers: {
                'token': 'Bearer '+localStorage.getItem('token')
              },
            }),
            invalidatesTags: ['AllStudents'],
        }),
        deleteStudent: build.mutation({
            query:(id) => ({
                url: `https://educonnectbackend-production.up.railway.app/api/students/${id}`,
                method: "DELETE",
                headers: {
                    'token': 'Bearer '+localStorage.getItem('token')
                },
            }),
            invalidatesTags: ["AllStudents"]
        }),
        getTeachers: build.query({
            query:() => ({
                url: "https://educonnectbackend-production.up.railway.app/api/teachers",
                method: "GET",
                headers: {
                    'token': 'Bearer '+localStorage.getItem('token')
                },
            }),
            providesTags: ["AllTeachers"]
        }),
        updateTeacher: build.mutation({
            query: (payload) => ({
              url: `https://educonnectbackend-production.up.railway.app/api/teachers/${payload.id}`,
              method: 'PATCH',
              body: {name:payload.name},
              headers: {
                'token': 'Bearer '+localStorage.getItem('token')
              },
            }),
            invalidatesTags: ['AllTeachers'],
        }),
        deleteTeacher: build.mutation({
            query:(id) => ({
                url: `https://educonnectbackend-production.up.railway.app/api/teachers/${id}`,
                method: "DELETE",
                headers: {
                    'token': 'Bearer '+localStorage.getItem('token')
                },
            }),
            invalidatesTags: ["AllTeachers"]
        }),
        addCourse: build.mutation({
            query: (payload) => ({
              url: 'https://educonnectbackend-production.up.railway.app/api/courses',
              method: 'POST',
              body: payload,
              headers: {
                'token': 'Bearer '+localStorage.getItem('token')
              },
            }),
            invalidatesTags: ['AllCourses'],
        }),
        getCourses: build.query({
            query:() => ({
                url: "https://educonnectbackend-production.up.railway.app/api/courses",
                method: "GET",
                headers: {
                    'token': 'Bearer '+localStorage.getItem('token')
                },
            }),
            providesTags: ["AllCourses"]
        }),
        updateCourse: build.mutation({
            query: (payload) => ({
              url: `https://educonnectbackend-production.up.railway.app/api/courses/${payload.id}`,
              method: 'PATCH',
              body: payload,
              headers: {
                'token': 'Bearer '+localStorage.getItem('token')
            },
            }),
            invalidatesTags: ['AllCourses'],
        }),
        getJobs: build.query({
            query:() => ({
                url: "https://educonnectbackend-production.up.railway.app/api/jobs",
                method: "GET",
                headers: {
                    'token': 'Bearer '+localStorage.getItem('token')
                },
            }),
            providesTags: ["AllJobs"]
        }),
        getTotalSales: build.query({
            query:() => ({
                url: "https://educonnectbackend-production.up.railway.app/api/coin-log/students",
                method: "GET",
                headers: {
                    'token': 'Bearer '+localStorage.getItem('token')
                },
            }),
            providesTags: ["TotalSales"]
        }),
        getUserRequests: build.query({
            query:() => ({
                url: "https://educonnectbackend-production.up.railway.app/api/requests",
                method: "GET",
                headers: {
                    'token': 'Bearer '+localStorage.getItem('token')
                },
            }),
            providesTags: ["UserRequests"]
        }),
        getUserComplains: build.query({
            query:() => ({
                url: "https://educonnectbackend-production.up.railway.app/api/complaints",
                method: "GET",
                headers: {
                    'token': 'Bearer '+localStorage.getItem('token')
                },
            }),
            providesTags: ["UserComplains"]
        }),
    })
})

export const {
    useGetUserQuery,
    useGetProductsQuery,
    useGetCustomersQuery,
    useGetTransactionsQuery,
    useGetGeographyQuery,
    useGetSalesQuery,
    useGetAdminsQuery,
    useGetUserPerformanceQuery,
    useGetDashboardStatsQuery,
    useLoginMutation,
    useRegisterMutation,
    useGetTeachersQuery,
    useGetStudentsQuery,
    useUpdateStudentMutation,
    useDeleteStudentMutation,
    useUpdateTeacherMutation,
    useDeleteTeacherMutation,
    useAddCourseMutation,
    useGetCoursesQuery,
    useUpdateCourseMutation,
    useGetJobsQuery,
    useGetTotalSalesQuery,
    useGetUserRequestsQuery, 
    useGetUserComplainsQuery
} = api