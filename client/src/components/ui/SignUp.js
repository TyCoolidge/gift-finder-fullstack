import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { v4 as getUuid } from "uuid";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import actions from "../../store/actions";
class SignUp extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         isEmailInputDisplayed: false,
         makeBtnLargeAndCentered: true,
         //email
         emailError: "",
         hasEmailError: false,
         hasEmailSuccess: false,
         //create password
         passwordError: "",
         hasPasswordError: false,
         hasPasswordSuccess: false,
         //repeat passord
         repeatPasswordError: "",
         hasRepeatPasswordError: false,
         hasRepeatPasswordSuccess: false,
         //username
         usernameError: "",
         hasUsernameError: false,
         hasUsernameSuccess: false,
      };
   }

   showCreateAccountInputs() {
      this.setState({
         isEmailInputDisplayed: !this.state.isEmailInputDisplayed,
      });
   }
   changeButtonFromLargeToRegular() {
      //   https://stackoverflow.com/a/53896461
      //  current state is lg button that when onClick changes to regular size Button
      this.setState({
         makeBtnLargeAndCentered: !this.state.makeBtnLargeAndCentered,
      });
   }
   async validateAndCreateUser() {
      const signUpEmailInput = document.getElementById("sign-up-email-input")
         .value;
      const createPasswordInput = document.getElementById(
         "create-password-input"
      ).value;
      const repeatPasswordInput = document.getElementById(
         "repeat-password-input"
      ).value;
      const userNameInput = document.getElementById("user-name-input").value;

      // Create user and post to API
      const createUser = {
         id: getUuid(),
         email: signUpEmailInput,
         username: userNameInput,
         password: createPasswordInput,
         repeatPassword: repeatPasswordInput,
         //confused on how repeated password works, ask mike
         createdAt: Date.now(),
      };
      console.log("created user object for POST", createUser);

      axios
         .post("/api/v1/users", createUser)
         .then((res) => {
            console.log(res.data);
            // Update currentUser in global state with API response
            this.props.dispatch({
               type: actions.UPDATE_CURRENT_USER,
               payload: res.data,
            });
            this.props.history.push("/account-page");
         })
         .catch((err) => {
            const { data } = err.response;
            console.log(data);
            const {
               emailError,
               passwordError,
               repeatPasswordError,
               usernameError,
            } = data;
            if (emailError !== "") {
               this.setState({
                  hasEmailError: true,
                  hasEmailSuccess: false,
                  emailError: emailError,
               });
            } else {
               this.setState({
                  hasEmailError: false,
                  hasEmailSuccess: true,
                  emailError: emailError,
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
            if (repeatPasswordError !== "") {
               this.setState({
                  hasRepeatPasswordError: true,
                  hasRepeatPasswordSuccess: false,
                  repeatPasswordError: repeatPasswordError,
               });
            } else {
               this.setState({
                  hasRepeatPasswordError: false,
                  hasRepeatPasswordSuccess: true,
                  repeatPasswordError: repeatPasswordError,
               });
            }
            if (usernameError !== "") {
               this.setState({
                  hasUsernameError: true,
                  hasUsernameSuccess: false,
                  usernameError: usernameError,
               });
            } else {
               this.setState({
                  hasUsernameError: false,
                  hasUsernameSuccess: true,
                  usernameError: usernameError,
               });
            }
         });
   }

   render() {
      return (
         <div className="mb-5 col-xl col-lg mx-4 col-md-12">
            <h2 style={{ color: "" }} className="card-title">
               Sign Up to Create a Gift Idea
            </h2>
            <small className="form-text text-muted mb-3">
               Are you a new user? Sign up below!
            </small>
            {this.state.isEmailInputDisplayed && (
               <form>
                  <div className="row">
                     <div className="col-xl-6 col-lg-6 col-md-12">
                        <div className="form-group">
                           <label htmlFor="sign-up-email-input">
                              Email address
                           </label>
                           <input
                              type="email"
                              className={classnames({
                                 "form-control": true,
                                 "is-invalid": this.state.hasEmailError,
                                 "is-valid": this.state.hasEmailSuccess,
                              })}
                              aria-describedby="emailHelp"
                              placeholder="Enter email"
                              id="sign-up-email-input"
                           />
                           {this.state.hasEmailError !== "" && (
                              <small className="form-text text-danger">
                                 {this.state.emailError}
                              </small>
                           )}
                           {this.state.emailError === "" && (
                              <small className="form-text text-muted">
                                 We'll never share your email with anyone else.
                              </small>
                           )}
                        </div>
                     </div>
                     <div className="col-xl-6 col-lg-6 col-md-12">
                        <div className="form-group">
                           <label htmlFor="exampleInputPassword1">
                              User Name
                           </label>
                           <input
                              type="userName"
                              className={classnames({
                                 "form-control": true,
                                 "is-invalid": this.state.hasUsernameError,
                                 "is-valid": this.state.hasUsernameSuccess,
                              })}
                              placeholder="Create username"
                              id="user-name-input"
                           />{" "}
                           {this.state.hasUsernameError && (
                              <small className="form-text text-danger">
                                 {this.state.usernameError}
                              </small>
                           )}
                        </div>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-xl-6 col-lg-6 col-md-12">
                        <div className="form-group">
                           <label htmlFor="create-password-input">
                              Create Password
                           </label>
                           <input
                              type="password"
                              className={classnames({
                                 "form-control": true,
                                 "is-invalid": this.state.hasPasswordError,
                                 "is-valid": this.state.hasPasswordSuccess,
                              })}
                              placeholder="Enter password"
                              id="create-password-input"
                           />
                           {this.state.hasPasswordError && (
                              <small className="form-text text-danger">
                                 {this.state.passwordError}
                              </small>
                           )}
                        </div>
                     </div>
                     <div className="col-xl-6 col-lg-6 col-md-12">
                        <div className="form-group">
                           <label htmlFor="repeat-password">
                              Repeat Password
                           </label>
                           <input
                              type="password"
                              className={classnames({
                                 "form-control": true,
                                 "is-invalid": this.state
                                    .hasRepeatPasswordError,
                                 "is-valid": this.state
                                    .hasRepeatPasswordSuccess,
                              })}
                              placeholder="Password"
                              id="repeat-password-input"
                           />{" "}
                           {this.state.hasRepeatPasswordError && (
                              <small className="form-text text-danger">
                                 {this.state.repeatPasswordError}
                              </small>
                           )}
                        </div>
                     </div>
                  </div>
                  <div className="text-center mt-3">
                     <Link
                        to="#"
                        className="btn btn-primary"
                        onClick={() => {
                           this.validateAndCreateUser();
                        }}
                     >
                        Create Account
                     </Link>
                     {/* Link used to stay in React, acts like <a> */}
                  </div>
               </form>
            )}
            {this.state.makeBtnLargeAndCentered && (
               <div className="text-center mt-5 col-12">
                  <Link
                     to="#"
                     className="btn btn-block btn-primary"
                     onClick={() => {
                        this.showCreateAccountInputs();
                        this.changeButtonFromLargeToRegular();
                     }}
                  >
                     Create Account
                  </Link>
                  {/* Link used to stay in React, acts like <a> */}
               </div>
            )}
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {};
}
export default withRouter(connect(mapStateToProps)(SignUp));
