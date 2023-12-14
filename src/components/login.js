import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import * as commonUtil from "../util/commonUtil.js";
import * as API from "../api/index.js";
import * as c from "../api/constant.js"; 
import Sidebar from "./sidebar.js";
import Header from "./header.js";
import Footer from "./footer.js"; 


const initialData = {
  emailId: "",
  password: "",
};
const initialForgot = {
  emailId: "",
};
const initialOtpData = {
  firstV: "",
  secondV: "",
  thirdV: "",
  fourthV: "",
  fifthV: "",
  sixthV: "",
};
const initialNewPassword = {
  forgotPassword: "",
  confirmPassword: "",
};
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialData);
  // ? FORGOT PASSWORD
  const [isEmail, setIsEmail] = useState(0);
  const [forgotData, setForgotData] = useState(initialForgot);
  const [regopt, setRegopt] = useState(initialOtpData);
  const [newPassword, setNewPassword] = useState(initialNewPassword);
  // ? ERROR MESSAGE
  const [errorEmailid, setErrorEmailid] = useState([]);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [forgotErrorPassword, setForgotErrorPassword] = useState("");
  const [forConfirmErrorPassword, setForConfirmErrorPassword] = useState("");
  const [passwordNew, setPasswordNew] = useState([]);
  // ? Form handler
  const registrationHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "emailId":
        setErrorEmail("");
        break;
      case "password":
        setErrorPassword("");
        break;

      default:
    }
    setFormData({ ...formData, [name]: value });
  };

  localStorage.removeItem("isLogin");
  localStorage.removeItem("userId");

  // ? SUBMIT HANDELAR
  const submitHandler = async () => {
    setLoading(true);
    let flag = validate();
    if (!flag) {
      setLoading(false);
      return;
    }
    try {
      const reqObj = {
        emailId: formData.emailId,
        password: formData.password,
      };
      console.log("reqObj", reqObj);
      const response = await API.user_login(reqObj);
      console.log("response", response);
      setPasswordNew(response.data.msg);
      localStorage.setItem("userId", response.data.data.id);
      localStorage.setItem("token_user_login", response.data.token_code);
      localStorage.setItem("isLogin", true);
      if (response.status === 200) {
        navigate("/post-now");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  // ? FORGOT MAIL HANDELAR
  const forgotHandler = (e) => {
    const { name, value } = e.target;
    setForgotData({ ...forgotData, [name]: value });
  };

  // ? FORGOTEMAIL SUBMIT
  const forgotPassword = async () => {
    try {
      const reqObj = {
        emailId: forgotData.emailId,
      };
      console.log("reqObj", reqObj);
      const response = await API.user_forgot_password(reqObj);
      console.log("response", response);
      if (response.status === 200) {
        setIsEmail(1);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  // ? otp Configeretion
  const otpHandler = (e) => {
    const { name, value } = e.target;
    setRegopt({ ...regopt, [name]: value });
  };

  // ? OTP SUBMIT
  const forgotVarifiOtp = async () => {
    try {
      const reqObj = {
        emailId: forgotData.emailId,
        otp:
          regopt.firstV +
          regopt.secondV +
          regopt.thirdV +
          regopt.fourthV +
          regopt.fifthV +
          regopt.sixthV,
      };
      console.log("reqObj", reqObj);
      const response = await API.user_forgot_password_otp(reqObj);
      console.log("response", response);
      if (response.status === 200) {
        setIsEmail(2);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  // ? user in-popup setpassword hendaler
  const newPasswordHandler = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "forgotPassword":
        setForgotErrorPassword("");
        break;
      case "confirmPassword":
        setForConfirmErrorPassword("");
        break;
      default:
    }
    setNewPassword({ ...newPassword, [name]: value });
  };

  const newpassSetSubmit = async () => {
    let flag = forgotPasswordValidate();
    if (!flag) {
      setLoading(false);
      return;
    }
    try {
      const reqObj = {
        emailId: forgotData.emailId,
        password: newPassword.forgotPassword,
      };
      console.log("reqObj", reqObj);
      const response = await API.user_modify_password(reqObj);
      console.log("response", response);
      if (response.status === 200) {
        setPasswordNew(response.data.msg);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  // ? otp hendel foucs
  const handleKeyUp = (event) => {
    const form = event.target.form;
    const index = Array.prototype.indexOf.call(form, event.target);
    console.log(index);
    if (index < 5) {
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  };

  // ? VALIDATE-INPUT
  const validate = () => {
    const { emailId, password } = formData;
    let flag = true;

    let validateEmail = commonUtil.validateEmail(emailId);
    if (validateEmail === 1) {
      setErrorEmail({
        field: "emailId",
        message: "",
      });
    }
    if (!(validateEmail === 1)) {
      let msg = "";
      if (validateEmail === 0) {
        msg = "Please enter your email address.";
      } else {
        msg = "That doesn't look like an email address.";
      }
      setErrorEmail({
        field: "emailId",
        message: msg,
      });
      flag = false;
    }

    // ? password
    if (password) {
      if (password.length < 8) {
        setErrorPassword({
          field: "password",
          message: "Your password is too short. It needs to be 8+ characters",
        });
        flag = false;
      }
      if (password.length > 8) {
        setErrorPassword({
          field: "password",
          message: "",
        });
        flag = true;
      }
    } else {
      setErrorPassword({
        field: "password",
        message: "Please enter your password.",
      });
      flag = false;
    }

    return flag;
  };

  // ? VALIDATE-INPUT-FORGOTPASSWORD
  const forgotPasswordValidate = () => {
    const { confirmPassword, forgotPassword } = newPassword;
    let flag = true;
    // password
    if (forgotPassword) {
      if (forgotPassword.length < 8) {
        setForgotErrorPassword({
          field: "forgotPassword",
          message: "Your password is too short. It needs to be 8+ characters",
        });
        flag = false;
      }
      if (forgotPassword.length > 8) {
        setForgotErrorPassword({
          field: "forgotPassword",
          message: "",
        });
        flag = true;
      }
    } else {
      setForgotErrorPassword({
        field: "forgotPassword",
        message: "Please enter your password.",
      });
      flag = false;
    }
    // confirmPassword
    if (forgotPassword === "" || forgotPassword !== confirmPassword) {
      setForConfirmErrorPassword({
        field: "confirmPassword",
        message: "Please confirm your password",
      });
      flag = false;
    } else {
      setForConfirmErrorPassword({
        field: "confirmPassword",
        message: "",
      });
      flag = true;
    }

    return flag;
  };

  const btnDisable =
    !regopt.firstV ||
    !regopt.secondV ||
    !regopt.thirdV ||
    !regopt.fourthV ||
    !regopt.fifthV ||
    !regopt.sixthV;

  return (
    <>
      <Header />
      <div className="container homePage">
        <div className="row">
          <div className="col-lg-3 order-md-1 order-2">
            <Sidebar />
          </div>
          <div className="col-lg-6 order-md-2 order-1">
            <div className="userRegistration wow animate__animated animate__bounceInDown">
              <h3 className="text-center regiFormHeading">LOGIN FORM</h3>
              <p className="redError">{passwordNew}</p>
              <div className="row mb-2">
                <div className="col-lg-12">
                  <label className="userRegiForm">
                    Registered Email Id <span className="requeird">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="emailId"
                    placeholder="Enter your email id"
                    onChange={registrationHandler}
                    value={formData.emailId}
                  />
                  {errorEmail.field === "emailId" && (
                    <p className="formErrorAlrt">{errorEmail.message}</p>
                  )}
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-lg-12">
                  <label className="userRegiForm">
                    Password <span className="requeird">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Enter your password"
                    onChange={registrationHandler}
                    value={formData.password}
                  />
                  {errorPassword.field === "password" && (
                    <p className="formErrorAlrt">{errorPassword.message}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <button onClick={submitHandler} className="btn_custom">
                    {loading === false ? (
                      "LOGIN NOW"
                    ) : (
                      <>
                        <span className="spinner-border text-primary"></span>
                        <p className="btnLoading">Loading...</p>
                      </>
                    )}
                  </button>
                  <span className="loginText">
                    Don't have an account ? {""}
                    <Link to="/registration">Sign Up</Link>
                  </span>
                  <span
                    data-toggle="modal"
                    data-target="#forgotPassword"
                    className="loginText cursor loginText text-danger ml-5"
                  >
                    Forgot Password ?
                  </span>
                </div>
              </div>
            </div>
            <div
              class="modal fade"
              id="forgotPassword"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="forgotPassword">
                      Forgotten password
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    {isEmail === 0 ? (
                      <input
                        type="text"
                        className="form-control"
                        name="emailId"
                        placeholder="Enter your email id"
                        onChange={forgotHandler}
                        value={forgotData.emailId}
                      />
                    ) : isEmail === 1 ? (
                      <>
                        <form>
                          <div className="row mb-2">
                            <div className="col-lg-2">
                              <input
                                type="text"
                                className="form-control"
                                name="firstV"
                                maxLength="1"
                                value={regopt.firstV}
                                onChange={otpHandler}
                                onKeyUp={handleKeyUp}
                              />
                            </div>
                            <div className="col-lg-2">
                              <input
                                type="text"
                                className="form-control"
                                name="secondV"
                                maxLength="1"
                                value={regopt.secondV}
                                onChange={otpHandler}
                                onKeyUp={handleKeyUp}
                              />
                            </div>
                            <div className="col-lg-2">
                              <input
                                type="text"
                                className="form-control"
                                name="thirdV"
                                maxLength="1"
                                value={regopt.thirdV}
                                onChange={otpHandler}
                                onKeyUp={handleKeyUp}
                              />
                            </div>
                            <div className="col-lg-2">
                              <input
                                type="text"
                                className="form-control"
                                name="fourthV"
                                maxLength="1"
                                value={regopt.fourthV}
                                onChange={otpHandler}
                                onKeyUp={handleKeyUp}
                              />
                            </div>
                            <div className="col-lg-2">
                              <input
                                type="text"
                                className="form-control"
                                name="fifthV"
                                maxLength="1"
                                value={regopt.fifthV}
                                onChange={otpHandler}
                                onKeyUp={handleKeyUp}
                              />
                            </div>
                            <div className="col-lg-2">
                              <input
                                type="text"
                                className="form-control"
                                name="sixthV"
                                maxLength="1"
                                value={regopt.sixthV}
                                onChange={otpHandler}
                                onKeyUp={handleKeyUp}
                              />
                            </div>
                          </div>
                        </form>
                      </>
                    ) : (
                      <div className="row">
                        <div className="col-lg-6">
                          <input
                            type="password"
                            name="forgotPassword"
                            className="form-control"
                            placeholder="New password"
                            onChange={newPasswordHandler}
                            value={newPassword.password}
                          />
                          {forgotErrorPassword.field === "forgotPassword" && (
                            <p className="formErrorAlrt">
                              {forgotErrorPassword.message}
                            </p>
                          )}
                        </div>
                        <div className="col-lg-6">
                          <input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            placeholder="Confirm Password"
                            onChange={newPasswordHandler}
                            value={newPassword.confirmPassword}
                          />
                          {forConfirmErrorPassword.field ===
                            "confirmPassword" && (
                            <p className="formErrorAlrt">
                              {forConfirmErrorPassword.message}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <div class="modal-footer">
                    {isEmail === 0 ? (
                      <button
                        onClick={forgotPassword}
                        disabled={!forgotData.emailId}
                        type="button"
                        class="btn btn-primary"
                      >
                        Submit
                      </button>
                    ) : isEmail === 1 ? (
                      <button
                        onClick={forgotVarifiOtp}
                        type="button"
                        disabled={btnDisable}
                        class="btn btn-primary"
                      >
                        VERIFY OTP
                      </button>
                    ) : (
                      <button
                        onClick={newpassSetSubmit}
                        type="button"
                        class="btn btn-primary"
                        data-dismiss="modal"
                      >
                        SET NEW PASSWORD
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 order-md-3 order-3 blogRSidebar"> 
          </div>
        </div>
        <div className="row"> 
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
