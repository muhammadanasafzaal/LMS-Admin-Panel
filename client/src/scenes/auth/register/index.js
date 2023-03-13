import React from "react";
import "../auth.css";
import { useFormik } from "formik";
import { registerSchema } from "schemas";
import { useRegisterMutation } from "state/api";
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [register, response] = useRegisterMutation()
  const navigate = useNavigate();

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

  const initialValues = {
    email: "",
    role: "",
    contactNo:"",
    password: "",
    username: "",
  };

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: registerSchema,
    onSubmit: (values, action) => {
      console.log(values);

      register(values)
      .unwrap()
      .then((res) => { 
        console.log(res)
        alert('Registered successfully')

        navigate('/login')
      })
      .then((error) => {
        if(error){
          console.log(error)
          alert('Registeration error')
          
        }
      })
      
      action.resetForm();
    },
  });

  return (
    <div>
      <div className="container-fluid login">
        <div className="row login_box m-0">
          <div className="col-md-5 p-0">
            <div className="left">
              <div className="contact">
                <form onSubmit={handleSubmit}>
                  <h3 style={{ color: "#333" }}>REGISTER</h3>
                 
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="USERNAME"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                  />
                  {errors.username && touched.username ? (
                    <p className="form-error">{errors.username}</p>
                  ) : null}

                  <input
                    type="email"
                    autoComplete="off"
                    placeholder="EMAIL"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {errors.email && touched.email ? (
                    <p className="form-error">{errors.email}</p>
                  ) : null}

                  {/* <input
                    type="text"
                    autoComplete="off"
                    placeholder="ROLE"
                    name="role"
                    value={values.role}
                    onChange={handleChange}
                  /> */}
                  <select component="select" name="role" id="role" value={values.role} onChange={handleChange}>
                    <option style={{color:'gray'}} defaultValue={""}>SELECT A ROLE</option>
                    {roles.map((option, index) => (
                      <option value={option.value} key={index}>{option.label}</option>
                    ))}
                  </select>
                  {errors.role && touched.role ? (
                    <p className="form-error">{errors.role}</p>
                  ) : null}

                  <input
                    type="number"
                    autoComplete="off"
                    placeholder="CONTACT NO"
                    name="contactNo"
                    value={values.contactNo}
                    onChange={handleChange}
                  />
                  {errors.contactNo && touched.contactNo ? (
                    <p className="form-error">{errors.contactNo}</p>
                  ) : null}

                  <input
                    type="password"
                    autoComplete="off"
                    placeholder="PASSWORD"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  {errors.password && touched.password ? (
                    <p className="form-error">{errors.password}</p>
                  ) : null}

                  <button className="submit">LET'S GO</button>
                  <p className="text-dark mt-2 text-center" style={{fontWeight: 600}}>
                    Already a user? Login 
                    <a href="javascript:;" onClick={()=> navigate('/login')}> here</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-7 p-0 d-xs-none">
            <div className="right">
              <div className="right-text">
                <h2>EDU CONNECT</h2>
                <h5>Learning made easy</h5>
              </div>
              <div className="right-inductor">
                <img
                  src="https://lh3.googleusercontent.com/fife/ABSRlIoGiXn2r0SBm7bjFHea6iCUOyY0N2SrvhNUT-orJfyGNRSMO2vfqar3R-xs5Z4xbeqYwrEMq2FXKGXm-l_H6QAlwCBk9uceKBfG-FjacfftM0WM_aoUC_oxRSXXYspQE3tCMHGvMBlb2K1NAdU6qWv3VAQAPdCo8VwTgdnyWv08CmeZ8hX_6Ty8FzetXYKnfXb0CTEFQOVF4p3R58LksVUd73FU6564OsrJt918LPEwqIPAPQ4dMgiH73sgLXnDndUDCdLSDHMSirr4uUaqbiWQq-X1SNdkh-3jzjhW4keeNt1TgQHSrzW3maYO3ryueQzYoMEhts8MP8HH5gs2NkCar9cr_guunglU7Zqaede4cLFhsCZWBLVHY4cKHgk8SzfH_0Rn3St2AQen9MaiT38L5QXsaq6zFMuGiT8M2Md50eS0JdRTdlWLJApbgAUqI3zltUXce-MaCrDtp_UiI6x3IR4fEZiCo0XDyoAesFjXZg9cIuSsLTiKkSAGzzledJU3crgSHjAIycQN2PH2_dBIa3ibAJLphqq6zLh0qiQn_dHh83ru2y7MgxRU85ithgjdIk3PgplREbW9_PLv5j9juYc1WXFNW9ML80UlTaC9D2rP3i80zESJJY56faKsA5GVCIFiUtc3EewSM_C0bkJSMiobIWiXFz7pMcadgZlweUdjBcjvaepHBe8wou0ZtDM9TKom0hs_nx_AKy0dnXGNWI1qftTjAg=w1920-h979-ft"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
