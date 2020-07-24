import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import axios from "axios";
import actions from "../../store/actions";
import { connect } from "react-redux";

class LogIn extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         logInEmailError: "",
         hasEmailError: false,
         hasEmailSuccess: false,
         //
         passwordError: "",
         hasPasswordError: false,
         hasPasswordSuccess: false,
      };
   }

   async validateLoginInputs() {
      const logInEmailInput = document.getElementById("login-email-input")
         .value;
      const logInPasswordInput = document.getElementById("login-password-input")
         .value;

      const logUser = {
         email: logInEmailInput,
         password: logInPasswordInput,
      };
      console.log("created user object", logUser);
      axios
         .post("/api/v1/users/auth", logUser)
         .then((res) => {
            console.log(res.data);
            // Update currentUser in global state with API response
            this.props.dispatch({
               type: actions.UPDATE_CURRENT_USER,
               payload: res.data,
            });
            this.props.history.push("/add-gift-page");
         })
         .catch((err) => {
            const { data } = err.response;
            console.log(data);
            const { emailError, passwordError } = data;
            if (emailError !== "") {
               this.setState({
                  hasEmailError: true,
                  hasEmailSuccess: false,
                  logInEmailError: emailError,
               });
            } else {
               this.setState({
                  hasEmailError: false,
                  hasEmailSuccess: true,
                  logInEmailError: emailError,
               });
            }
            if (passwordError !== "") {
               this.setState({
                  hasPasswordError: true,
                  hasPasswordSuccess: false,
                  passwordError: passwordError,
               });
            } else {
               this.setState({
                  hasPasswordError: false,
                  hasPasswordSuccess: true,
                  passwordError: passwordError,
               });
            }
         });

      // make it where clicking on myAccount makes empty state for currentUser, if has that empty state then redirect
   }

   render() {
      return (
         <div className="col-xl-4 col-lg-4 mx-4 col-md-12">
            {/* change header blue */}
            <h2 style={{ color: "" }} className="card-title">
               Log In
            </h2>
            <small className="form-text text-muted mb-3">
               Are you a returning user?
            </small>
            <form>
               <div className="form-group">
                  <label htmlFor="log-in-email-input">Email or User Name</label>
                  {/* might not have username for MVP */}
                  <input
                     type="email"
                     className={classnames({
                        "form-control": true,
                        "is-invalid": this.state.hasEmailError,
                        "is-valid": this.state.hasEmailSuccess,
                     })}
                     aria-describedby="emailHelp"
                     placeholder="Enter email or username"
                     id="login-email-input"
                  />
                  {this.state.hasEmailError !== "" && (
                     <small className="form-text text-danger">
                        {this.state.logInEmailError}
                     </small>
                  )}
                  {this.state.logInEmailError === "" && (
                     <small className="form-text text-muted">
                        We'll never share your email with anyone else.
                     </small>
                  )}
               </div>
               <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input
                     type="password"
                     className={classnames({
                        "form-control": true,
                        "is-invalid": this.state.hasPasswordError,
                        "is-valid": this.state.hasPasswordSuccess,
                     })}
                     placeholder="Password"
                     id="login-password-input"
                  />
                  {this.state.hasPasswordError && (
                     <small className="form-text text-danger">
                        {this.state.passwordError}
                     </small>
                  )}
               </div>
               {/* disabled button that appears right away, will go away if email parameters are good */}

               <div className="mt-3 float-right">
                  <Link
                     to="#"
                     className="btn btn-primary"
                     onClick={() => {
                        this.validateLoginInputs();
                     }}
                  >
                     Log in
                  </Link>
               </div>
            </form>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {
      editableGift: state.editableGift,
      redirectToAccountPage: state.redirectToAccountPage,
   };
}
export default withRouter(connect(mapStateToProps)(LogIn));
