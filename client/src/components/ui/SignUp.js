import React from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import hash from "object-hash";
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
      signUpEmailError: "",
      hasEmailError: false,
      hasEmailSuccess: false,
      //create password
      createPasswordError: "",
      hasCreatePasswordError: false,
      hasCreatePasswordSuccess: false,
      //repeat passord
      repeatPasswordError: "",
      hasRepeatPasswordError: false,
      hasRepeatPasswordSuccess: false,
      //username
      userNameError: "",
      hasUserNameError: false,
      hasUserNameSuccess: false,
    };
  }

  showCreateAccountInputs() {
    this.setState({ isEmailInputDisplayed: !this.state.isEmailInputDisplayed });
  }
  changeButtonFromLargeToRegular() {
    //   https://stackoverflow.com/a/53896461
    //  current state is lg button that when onClick changes to regular size Button
    this.setState({
      makeBtnLargeAndCentered: !this.state.makeBtnLargeAndCentered,
    });
  }

  async checkForEmailError(signUpEmailInput) {
    // eslint-disable-next-line
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const lowerCaseSignUpEmailInput = signUpEmailInput.toLowerCase();
    // const createPasswordInput = document.getElementById("create-password-input")
    //   .value;
    // const repeatPassword = document.getElementById("repeat-password")
    //   .value;
    if (signUpEmailInput === "")
      this.setState({
        signUpEmailError: "Please enter your address",
        hasEmailError: true,
      });
    else if (emailRegex.test(lowerCaseSignUpEmailInput) === false) {
      this.setState({
        signUpEmailError: "Please enter a valid email",
        hasEmailError: true,
      });
    } else {
      this.setState({
        signUpEmailError: "",
        hasEmailError: false,
        hasEmailSuccess: true,
      });
    }
  }

  async checkForUserNameError(userNameInput) {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const lowerCaseUserNameInput = userNameInput.toLowerCase();
    if (userNameInput === "") {
      this.setState({
        userNameError: "Please create a username",
        hasUserNameError: true,
      });
    } else if (usernameRegex.test(lowerCaseUserNameInput) === false) {
      this.setState({
        userNameError: "Username can only contain numbers and letters",
        hasUserNameError: true,
      });
    } else {
      this.setState({
        userNameError: "",
        hasUserNameError: false,
        hasUserNameSuccess: true,
      });
    }
  }

  async checkForPasswordError(createPasswordInput, signUpEmailInput) {
    const uniqChars = [...new Set(createPasswordInput)];
    //array of unique characters
    if (createPasswordInput === "") {
      this.setState({
        createPasswordError: "Please create a password",
        hasCreatePasswordError: true,
      });
    } else if (createPasswordInput.length < 9) {
      this.setState({
        createPasswordError: "Your password must be at least 9 characters",
        hasCreatePasswordError: true,
      });
    } else if (this.checkHasLocalPart(createPasswordInput, signUpEmailInput)) {
      // returns boolean
      this.setState({
        createPasswordError:
          "Your email address cannot be used in your password.",
        hasCreatePasswordError: true,
      });
    } else if (uniqChars.length < 3) {
      this.setState({
        createPasswordError:
          "Your password must contain at least 3 unique characters",
        hasCreatePasswordError: true,
      });
    } else {
      this.setState({
        createPasswordError: "",
        hasCreatePasswordError: false,
        hasCreatePasswordSuccess: true,
      });
    }
  }

  checkHasLocalPart(createPasswordInput, signUpEmailInput) {
    const localPart = signUpEmailInput.split("@")[0];
    if (localPart === "") return false;
    //removes bug of displaying uniqChars error message
    else if (localPart.length < 4) return false;
    else return createPasswordInput.includes(localPart); // returns boolean(true)
  }
  async checkIfPasswordsMatch(repeatPasswordInput, createPasswordInput) {
    if (repeatPasswordInput === "") {
      this.setState({
        repeatPasswordError: "Please repeat your created password",
        hasRepeatPasswordError: true,
      });
    } else if (repeatPasswordInput !== createPasswordInput) {
      this.setState({
        repeatPasswordError: "Your passwords do not match, please try again",
        hasRepeatPasswordError: true,
      });
    } else {
      this.setState({
        repeatPasswordError: "",
        hasRepeatPasswordError: false,
        hasRepeatPasswordSuccess: true,
      });
    }
  }

  //checkIfPasswordRepeats if createpassword === repeatpassword error returns false
  async validateUserInputs() {
    const signUpEmailInput = document.getElementById("sign-up-email-input")
      .value;
    const createPasswordInput = document.getElementById("create-password-input")
      .value;
    const repeatPasswordInput = document.getElementById("repeat-password-input")
      .value;
    const userNameInput = document.getElementById("user-name-input").value;
    await this.checkForEmailError(signUpEmailInput);
    await this.checkForUserNameError(userNameInput);
    await this.checkForPasswordError(createPasswordInput, signUpEmailInput);
    await this.checkIfPasswordsMatch(repeatPasswordInput, createPasswordInput);
    if (
      this.state.hasEmailError === false &&
      this.state.hasCreatePasswordError === false &&
      this.state.hasRepeatPasswordError === false &&
      this.state.hasUserNameError === false
    ) {
      const createUser = {
        id: getUuid(),
        email: signUpEmailInput,
        username: userNameInput,
        password: hash(createPasswordInput),
        createdAt: Date.now(),
      };
      console.log("created user object", createUser);
      axios
        .get("https://run.mocky.io/v3/624bafeb-1593-4c68-9f9b-5952d2111755")
        .then((res) => {
          const currentUser = res.data;
          console.log(currentUser);
          this.props.dispatch({
            type: actions.UPDATE_CURRENT_USER,
            payload: res.data,
          });
        })
        .catch((error) => {
          console.log(error);
        });
      this.props.history.push("/account-page");
    }
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
                  <label htmlFor="sign-up-email-input">Email address</label>
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
                      {this.state.signUpEmailError}
                    </small>
                  )}
                  {this.state.signUpEmailError === "" && (
                    <small className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  )}
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12">
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">User Name</label>
                  <input
                    type="userName"
                    className={classnames({
                      "form-control": true,
                      "is-invalid": this.state.hasUserNameError,
                      "is-valid": this.state.hasUserNameSuccess,
                    })}
                    placeholder="Create username"
                    id="user-name-input"
                  />{" "}
                  {this.state.hasUserNameError && (
                    <small className="form-text text-danger">
                      {this.state.userNameError}
                    </small>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-12">
                <div className="form-group">
                  <label htmlFor="create-password-input">Create Password</label>
                  <input
                    type="password"
                    className={classnames({
                      "form-control": true,
                      "is-invalid": this.state.hasCreatePasswordError,
                      "is-valid": this.state.hasCreatePasswordSuccess,
                    })}
                    placeholder="Enter password"
                    id="create-password-input"
                  />
                  {this.state.hasCreatePasswordError && (
                    <small className="form-text text-danger">
                      {this.state.createPasswordError}
                    </small>
                  )}
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12">
                <div className="form-group">
                  <label htmlFor="repeat-password">Repeat Password</label>
                  <input
                    type="password"
                    className={classnames({
                      "form-control": true,
                      "is-invalid": this.state.hasRepeatPasswordError,
                      "is-valid": this.state.hasRepeatPasswordSuccess,
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
                  this.validateUserInputs();
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
