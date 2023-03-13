import React from "react";
import "../auth.css";
import { useFormik } from "formik";
import { loginSchema } from "schemas";
import { useLoginMutation } from "state/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isLoggedIn } from "state";


const Login = () => {
  const [login, response] = useLoginMutation()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: (values, action) => {
      console.log(values);

      login(values)
      .unwrap()
      .then((res) => { 
        localStorage.setItem('token', res.accessToken)
        console.log(res)
        localStorage.setItem('user', JSON.stringify(res))
        alert('Login successful')
        dispatch(isLoggedIn(true))
        navigate('/')
      })
      .then((error) => {
        if(error){
          console.log(error)
          alert('Login error')
          
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
                  <h3 style={{ color: "#333" }}>SIGN IN</h3>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="EMAIL"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {errors.email && touched.email ? (
                    <p className="form-error">{errors.email}</p>
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
                    Not a user? Register 
                    <a href="javascript:;" onClick={()=> navigate('/register')}> here</a>
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

export default Login;
