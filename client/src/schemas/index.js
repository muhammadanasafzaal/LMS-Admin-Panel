import * as Yup from 'yup'

export const loginSchema = Yup.object({
    email: Yup.string()
        .email('Email is invalid')
        .required("Please provide email"),
    password: Yup.string()
        .min(5, 'Password must be at least 5 characters long')
        .max(10, 'Password must not exceed 10 characters')
        .required("Please provide password"),
})

export const registerSchema = Yup.object({   
    email: Yup.string()
        .email('Email is invalid')
        .required("Please provide password"),
    role: Yup.string()
        .required("Please select a role"),
    contactNo: Yup.string()
        .max(11, 'Password must not exceed 10 characters')
        .required("Please provide contact number"),
    password: Yup.string()
        .min(5, 'Password must be at least 5 characters long')
        .max(10, 'Password must not exceed 10 characters')
        .required("Please provide password"),
    username: Yup.string()
        .min(3, 'Username must be at least 3 characters long')
        .max(25, 'Username must not exceed 25 characters')
        .required("Please provide username"),
})

export const updateTeacherORStudentSchema = Yup.object({   
    name: Yup.string()
    .min(3, 'Username must be at least 3 characters long')
    .max(25, 'Username must not exceed 25 characters')
    .required("Please provide username"),
    // email: Yup.string()
    //     .email('Email is invalid')
    //     .required("Please provide password"),
    // role: Yup.string()
    //     .required("Please select a role"),
    // contactNo: Yup.string()
    //     .max(11, 'Password must not exceed 10 characters')
    //     .required("Please provide contact number"),
    // password: Yup.string()
    //     .min(5, 'Password must be at least 5 characters long')
    //     .max(10, 'Password must not exceed 10 characters')
    //     .required("Please provide password"),
})

export const courseSchema = Yup.object({   
    title: Yup.string()
        .min(3, 'Course Title must be at least 3 characters long')
        .max(25, 'Course Title must not exceed 25 characters')
        .required("Please provide a Course Title"),
    isAcademic: Yup.string()
        .required("Please provide a Course Type"),  
})