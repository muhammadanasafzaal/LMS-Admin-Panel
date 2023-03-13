import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { updateTeacherORStudentSchema, courseSchema } from "schemas";
import { useUpdateStudentMutation, useUpdateTeacherMutation, useAddCourseMutation, useUpdateCourseMutation } from "state/api";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const GenericModal = ({ content, setOpen }) => {
  const [updateStudent, studentResponse] = useUpdateStudentMutation();
  const [updateTeacher, teacherResponse] = useUpdateTeacherMutation();
  const [addCourse, addCourseResponse] = useAddCourseMutation();
  const [updateCourse, updateCourseResponse] = useUpdateCourseMutation();

  const roles = [
    {
      label: "Teacher",
      value: "teacher",
    },
    {
      label: "Student",
      value: "student",
    },
    {
      label: "Admin",
      value: "admin",
    },
  ];

  const courseTypes = [
    {
      label: "Academic",
      value: true,
    },
    {
      label: "Non Academic",
      value: false,
    },
  ];

  let initialValues = "";
  console.log(content)

  if (content.action == "add_course") {
    if(!content.data){
      initialValues = {
        title: '',
        isAcademic: ''
      };
    }
  }
  else if(content.action == 'update_course'){
    console.log(content.data)
    initialValues = content.data
  }
   else if (
    content.action == "update_student" ||
    content.action == "update_teacher"
  ) {
      initialValues = content.data;
  }

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema:
      (content.action == "add_course" || content.action == "update_course")
        ? courseSchema
        : updateTeacherORStudentSchema,
    onSubmit: (values, action) => {
      console.log(values, 'data values');

      if (content) {
        if (content.action == "update_student") {
          updateStudent(values)
            .unwrap()
            .then((res) => {
              console.log(res);
              alert("Updated successfully");
              setOpen(false)
            })
            .then((error) => {
              if (error) {
                console.log(error);
                alert("An error occurred");
              }
            });
        } 
        else if (content.action == "update_teacher") {
          updateTeacher(values)
            .unwrap()
            .then((res) => {
              console.log(res);
              alert("Updated successfully");
              setOpen(false)
            })
            .then((error) => {
              if (error) {
                console.log(error);
                alert("An error occurred");
              }
            });
        }
        else if (content.action == "add_course"){
          addCourse(values)
          .unwrap()
          .then((res) => {
            console.log(res.status);
            alert("Course Added successfully");
            setOpen(false)
          })
          .then((error) => {
            if (error) {
              console.log(error);
              alert("An error occurred");
            }
          });
        }
        else if (content.action == "update_course"){
          updateCourse(values)
          .unwrap()
          .then((res) => {
            console.log(res.status);
            alert("Course Updated successfully");
            setOpen(false)
          })
          .then((error) => {
            if (error) {
              console.log(error);
              alert("An error occurred");
            }
          });
        }
      } 
     
      action.resetForm();
    },
  });

  return (
    <>
      <div className="container">
        <div className="row">
          <div
            className="col-md-4 offset-md-4"
            style={{
              backgroundColor: "#fff",
              padding: "1rem",
              transform: "translateY(40%)",
            }}
          >
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12 p-0">
                  <div className="row">
                    <div className="col-11">
                      <h5 className="text-dark mb-0 ml-3">
                        {content.action == "update_student"
                          ? "Update Student"
                          : content.action == "update_teacher"
                          ? "Update Teacher"
                          : "Add Course"}
                      </h5>
                    </div>
                    <div
                      className="col-1 p-0"
                      style={{ cursor: "pointer" }}
                      onClick={() => setOpen(false)}
                    >
                      <i className="fa fa-times text-dark"></i>
                    </div>
                  </div>
                  <hr className="mt-2" />
                </div>
              </div>
              {
                (content && (content.action != "add_course" && content.action != "update_course")) ? (
                  //add update student/teacher fields start
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                          type="name"
                          className="form-control"
                          id="name"
                          placeholder="Enter name"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                        />
                        {errors.name && touched.name ? (
                          <p className="form-error">{errors.name}</p>
                        ) : null}
                      </div>

                      {/* <div className="form-group">
                        <label htmlFor="email">Email </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Enter email"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                        />
                        {errors.email && touched.email ? (
                          <p className="form-error">{errors.email}</p>
                        ) : null}
                      </div> */}

                      {/* <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <select
                          className="form-control"
                          component="select"
                          name="role"
                          id="role"
                          value={values.role}
                          onChange={handleChange}
                        >
                          <option style={{ color: "gray" }} defaultValue={""}>
                            SELECT A ROLE
                          </option>
                          {roles.map((option, index) => (
                            <option value={option.value} key={index}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors.role && touched.role ? (
                          <p className="form-error">{errors.role}</p>
                        ) : null}
                      </div> */}

                      {/* <div className="form-group">
                        <label htmlFor="contactNo">Contact</label>
                        <input
                          type="number"
                          className="form-control"
                          id="contactNo"
                          placeholder="Enter email"
                          name="contactNo"
                          value={values.contactNo}
                          onChange={handleChange}
                        />
                        {errors.contactNo && touched.contactNo ? (
                          <p className="form-error">{errors.contactNo}</p>
                        ) : null}
                      </div> */}

                      {/* <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Password"
                          name="password"
                          value={values.password}
                          onChange={handleChange}
                        />
                        {errors.password && touched.password ? (
                          <p className="form-error">{errors.password}</p>
                        ) : null}
                      </div> */}
                    </div>
                  </div>
                ) : (
                  //add update student/teacher fields end

                  // add update course fields start
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <label htmlFor="courseTitle">Course Title</label>
                        <input
                          type="text"
                          className="form-control"
                          id="title"
                          placeholder="Enter Course Title"
                          name="title"
                          value={values.title}
                          onChange={handleChange}
                        />
                        {errors.title && touched.title ? (
                          <p className="form-error">{errors.title}</p>
                        ) : null}
                      </div>

                      <div className="form-group">
                        <label htmlFor="isAcademic">Course Type</label>
                        <select
                          className="form-control"
                          component="select"
                          name="isAcademic"
                          id="isAcademic"
                          value={values.isAcademic}
                          onChange={handleChange}
                        >
                          <option style={{ color: "gray" }} defaultValue={""}>
                            Select Course Type
                          </option>
                          {courseTypes.map((option, index) => (
                            <option value={option.value} key={index}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors.isAcademic && touched.isAcademic ? (
                          <p className="form-error">{errors.isAcademic}</p>
                        ) : null}
                      </div>
                    </div>
                  </div>
                )
                // add update course fields end
              }
              <div className="row">
                <div className="col-12 text-center">
                  <button type="submit" className="submit mt-2 btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
