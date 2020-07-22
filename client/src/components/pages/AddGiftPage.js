import React from "react";
import { withRouter, Link } from "react-router-dom";
import Header from "../ui/Header";
import classnames from "classnames";
import { checkIsOver } from "../utils/helpers";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import { v4 as getUuid } from "uuid";
import users from "../../mock-data/users";
import { connect } from "react-redux";
import actions from "../../store/actions";
// import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

class AddGiftPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //if any errors
      hasBlankInputs: "",

      //title
      titleText: "",
      hasTitleError: false,
      hasTitleSuccess: false,
      //photo
      websiteUrl: "",
      hasPhotoError: false,
      hasPhotoSuccess: false,
      photoUrl: "",
      //url
      hasUrlError: false,
      hasUrlSuccess: false,
      //description
      descText: "",
      hasDescriptionError: false,
      hasDescSuccess: false,
      //gender
      isGenderSelected: false,
      setGender: "",
      setMaleSelectedToTrue: false,
      setFemaleSelectedToTrue: false,
      setNeutralSelectedToTrue: false,

      //interest
      setInterestSelected: "",
      hasInterestError: false,
      hasInterestSuccess: false,
      //age
      setAgeSelected: "",
      hasAgeError: false,
      hasAgeSuccess: false,
      //price
      priceTyped: "",
      priceWarning: "",
      hasPriceError: false,
      hasPriceSuccess: false,
    };
  }

  //sets the state to the values of any editableGift prop
  componentDidMount() {
    if (Object.keys(this.props.editableGift).length !== 0) {
      //word count will be set to its length
      this.setState({
        titleText: this.props.editableGift.title,
        photoUrl: this.props.editableGift.photo,
        websiteUrl: this.props.editableGift.url,
        descText: this.props.editableGift.description,
        setGender: this.props.editableGift.gender,
        setInterestSelected: this.props.editableGift.interest,
        setAgeSelected: this.props.editableGift.age,
        priceTyped: this.props.editableGift.price,
      });
    }
    if (this.props.editableGift.gender === 1) {
      this.setState({ setMaleSelectedToTrue: true });
    }
  }
  removeActiveStateFromBtn() {
    this.setState({
      setMaleSelectedToTrue: false,
      setFemaleSelectedToTrue: false,
      setNeutralSelectedTrue: false,
    });
  }

  setTitleText(e) {
    this.setState({
      titleText: e.target.value,
      // titleText: this.props.editableGift.title,
    });
  }
  setDescText(e) {
    this.setState({ descText: e.target.value });
  }
  setPhotoText(e) {
    this.setState({ photoUrl: e.target.value });
    console.log("photo", this.state.photoUrl);
  }
  setPriceNumber(e) {
    this.setState({ priceTyped: e.target.value });
  }
  setGenderValue(e) {
    this.setState({
      setGender: e.target.value,
    });
    console.log(e.target.value);
  }
  setInterestValue(e) {
    this.setState({ setInterestSelected: e.target.value });
  }
  setAgeValue(e) {
    this.setState({ setAgeSelected: e.target.value });
  }

  async checkForTitleError(titleInput) {
    if (titleInput === "") {
      this.setState({
        hasTitleError: true,
      });
    } else if (checkIsOver(this.state.titleText, 50) === true) {
      this.setState({ hasTitleError: true });
    } else {
      this.setState({
        hasTitleError: false,
        hasTitleSuccess: true,
      });
    }
  }

  async checkForPhotoError(photoUrl) {
    const photoRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

    // var photoData = photoUrl.toString();
    //TODO
    if (this.state.photoUrl === "" || photoRegex.test(photoUrl) === false) {
      this.setState({
        hasPhotoError: true,
      });
    } else {
      this.setState({
        hasPhotoSuccess: true,
        hasPhotoError: false,
      });
    }
    console.log(photoUrl);
  }
  // async isPhotoUploaded() {
  //   //https://sweetalert2.github.io/
  //   const { value: file } = await Swal.fire({
  //     title: "Select image",
  //     input: "file",
  //     inputAttributes: {
  //       accept: "image/*",
  //       "aria-label": "Upload your profile picture",
  //     },
  //   });
  //   console.log({ value: file.name });
  //   const fileName = { value: file.name };
  //   // https://www.javascripttutorial.net/object/convert-an-object-to-an-array-in-javascript/\
  //   // TODO Edit gift photo should have photo value
  //   // TODO fix bug that triggers if image not selected
  //   // May have to revert back to previous input to grab string
  //   this.setState({ photoUrl: Object.values(fileName).toString() });
  //   //photoUrl will show file's name
  //   console.log(this.state.photoUrl);
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       Swal.fire({
  //         title: "Your uploaded picture",
  //         imageUrl: e.target.result,
  //         imageAlt: "The uploaded picture",
  //       });
  //       // this.setState({ photoUrl: photo });
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  async checkForUrlError(urlInput) {
    const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    if (urlRegex.test(urlInput) === false) {
      this.setState({ hasUrlError: true });
    } else if (urlInput === "") {
      this.setState({
        hasUrlError: true,
      });
    } else {
      this.setState({ hasUrlError: false, hasUrlSuccess: true });
    }
  }

  async checkForDescriptionError(descriptionInput) {
    if (descriptionInput === "") {
      this.setState({
        hasDescriptionError: true,
      });
    } else if (checkIsOver(this.state.descText, 200) === true) {
      this.setState({ hasDescriptionError: true });
    } else {
      this.setState({
        hasDescriptionError: false,
        hasDescSuccess: true,
      });
    }
  }

  async checkIfGenderIsSelected(setGender) {
    if (setGender === "") {
      this.setState({ isGenderSelected: true });
    } else {
      this.setState({ isGenderSelected: false });
    }
  }

  async checkForInterestError(setInterestSelected) {
    if (setInterestSelected === "" || setInterestSelected === "0") {
      this.setState({ hasInterestError: true });
    } else {
      this.setState({ hasInterestError: false, hasInterestSuccess: true });
    }
  }

  async checkForAgeError(setAgeSelected) {
    if (setAgeSelected === "" || setAgeSelected === "0") {
      this.setState({ hasAgeError: true });
    } else {
      this.setState({ hasAgeError: false, hasAgeSuccess: true });
    }
  }

  async checkForPriceError(priceInput) {
    const priceRegex = /^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$/g;
    //http://regexlib.com/Search.aspx?k=currency
    if (priceInput === "") {
      this.setState({
        hasPriceError: true,
        priceWarning: "Please enter a price",
      });
    } else if (priceRegex.test(priceInput) === false) {
      this.setState({
        hasPriceError: true,
        priceWarning: "Please enter numbers only",
      });
    } else {
      this.setState({
        hasPriceError: false,
        hasPriceSuccess: true,
      });
    }
  }

  async validateGiftInfo() {
    const titleInput = document.getElementById("title-input").value;
    const photoUrl = document.getElementById("photo-input").value;
    const urlInput = document.getElementById("url-input").value;
    const descriptionInput = document.getElementById("desc-input").value;
    const setGender = this.state.setGender;

    const setInterestSelected = this.state.setInterestSelected;
    const setAgeSelected = this.state.setAgeSelected;

    const priceInput = document.getElementById("price-input").value;
    await this.checkForTitleError(titleInput);
    await this.checkForPhotoError(photoUrl);
    await this.checkForUrlError(urlInput);
    await this.checkForDescriptionError(descriptionInput);
    await this.checkIfGenderIsSelected(setGender);
    await this.checkForInterestError(setInterestSelected);
    await this.checkForAgeError(setAgeSelected);
    await this.checkForPriceError(priceInput);
    if (
      titleInput === "" ||
      photoUrl === "" ||
      urlInput === "" ||
      descriptionInput === "" ||
      setGender === "" ||
      setInterestSelected === "" ||
      setAgeSelected === "" ||
      priceInput === ""
    ) {
      this.setState({
        hasBlankInputs: "All input must be filled out",
      });
    } else {
      this.setState({
        hasBlankInputs: "",
      });
    }
    if (
      this.state.hasTitleError === false &&
      this.state.hasPhotoError === false &&
      this.state.hasUrlError === false &&
      this.state.hasDescriptionError === false &&
      this.state.isGenderSelected === false &&
      this.state.hasInterestError === false &&
      this.state.hasAgeError === false &&
      this.state.hasPriceError === false
    ) {
      const userId = users[0].id;
      const newGift = {
        id: getUuid(),
        createdAt: Date.now(),
        createdByUserId: userId,
        // go back and fix, ask Mike how to grab data
        title: titleInput,
        photo: photoUrl,
        url: urlInput,
        desc: descriptionInput,
        gender: Number(setGender),
        interest: Number(setInterestSelected),
        age: Number(setAgeSelected),
        price: Number(priceInput * 100),
        // price in cents
      };
      console.log(newGift);
      //if all inputs are filled out, lets remove editableGift from store
      //TODO when editing gift, update its state instead of making new gift
      // if editable is not empty lets update it
      this.props.dispatch({
        type: actions.STORE_EDITABLE_GIFT,
        payload: {},
      });
      this.props.history.push("/");
    }
  }

  returnBackToAccountPage() {
    if (
      Object.keys(this.props.editableGift).length === 0 &&
      this.props.editableGift.constructor === Object
    ) {
      return this.props.history.push("/");
    } else {
      return this.props.history.push("/account-page");
    }
  }
  removeEditableGift() {
    this.props.dispatch({
      type: actions.STORE_EDITABLE_GIFT,
      payload: {},
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row mt-5"></div>
        {/* Title form */}
        <div className="col-12 col-sm-12 col-md-12 col-lg-8 offset-lg-2 col-xl-10 offset-xl-1 mb-4">
          <div className="">
            <div className="row">
              <div className="col text-left ">
                <Header />
                {/* TODO make cols a component */}
              </div>
              <div className="col text-right mt-3">
                <Link
                  to="/account-page"
                  className=""
                  onClick={() => {
                    this.removeEditableGift();
                  }}
                >
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    style={{ fontSize: "40px" }}
                    className=""
                  />
                  <div className="ml-1 d-inline" style={{ fontSize: "20px" }}>
                    {this.props.currentUser.userName}
                  </div>
                </Link>
              </div>
            </div>
            <div className="text-center">
              <h2 className="mb-4" style={{ fontSize: "25px" }}>
                Add or Edit Gift
              </h2>
            </div>

            {this.state.hasBlankInputs && (
              <big className="form-text text-danger text-center mt-3">
                All fields need to be filled out
              </big>
            )}

            <div className=" row mt-1">
              <label
                htmlFor="inputPassword"
                className="col-sm-3 col-md-2 col-form-label"
              >
                Title:
              </label>
              <div className="col-sm-9 col-md-10">
                <input
                  type="title"
                  className={classnames({
                    "form-control": true,
                    "is-invalid": this.state.hasTitleError,
                    "is-valid": this.state.hasTitleSuccess,
                  })}
                  defaultValue={this.props.editableGift.title}
                  onChange={(e) => this.setTitleText(e)}
                  id="title-input"
                />
                <span
                  className={classnames({
                    "text-danger": checkIsOver(this.state.titleText, 50),
                    "float-right": true,
                  })}
                >
                  {this.state.titleText.length}/50
                </span>
              </div>
            </div>
            {/* Photo insert */}
            <form className="form-group row mt-1">
              <div className="col-sm-3 col-md-2 col-form-label">
                <label htmlFor="Photo">Photo:</label>
              </div>
              <div className="col-sm-9 col-md-10">
                <input
                  id="photo-input"
                  className={classnames({
                    "form-control": true,
                    "is-invalid": this.state.hasPhotoError,
                    "is-valid": this.state.hasPhotoSuccess,
                  })}
                  placeholder="Insert Photo Url..."
                  defaultValue={this.props.editableGift.photo}
                  onChange={(e) => this.setPhotoText(e)}
                  type="url"
                />
              </div>
            </form>
            {/* Web link */}
            <form className="form-group row mt-3">
              <label
                htmlFor="example-url-input"
                className="col-sm-3 col-md-2 col-form-label"
              >
                URL:
              </label>
              <div className="col-sm-9 col-md-10">
                <input
                  className={classnames({
                    "form-control": true,
                    "is-invalid": this.state.hasUrlError,
                    "is-valid": this.state.hasUrlSuccess,
                  })}
                  type="url"
                  defaultValue={this.props.editableGift.url}
                  id="url-input"
                />
              </div>
            </form>
            {/* desc box */}
            <div className="form-group row mt-4">
              <div className="col-sm-3 col-md-2">
                <label htmlFor="exampleFormControlTextarea1">
                  Description:
                </label>
              </div>
              <div className="col-sm-9 col-md-10">
                <textarea
                  className={classnames({
                    "form-control": true,
                    "is-invalid": this.state.hasDescriptionError,
                    "is-valid": this.state.hasDescSuccess,
                  })}
                  rows="3"
                  defaultValue={this.props.editableGift.description}
                  onChange={(e) => this.setDescText(e)}
                  id="desc-input"
                ></textarea>
                <span
                  className={classnames({
                    "text-danger": checkIsOver(this.state.descText, 200),
                    "float-right": true,
                  })}
                >
                  {this.state.descText.length}/200
                </span>
              </div>
            </div>
            {/* Gender either checkbox or buttons */}
            <div id="">
              <div className="row  ">
                <label
                  htmlFor="inputPassword"
                  className="col-sm-3 col-md-2 col-form-label"
                >
                  Gender:
                </label>
                {/* place in own forms */}

                <ToggleButtonGroup
                  className="col"
                  type="radio"
                  name="options"
                  // defaultValue={this.props.editableGift.gender}
                >
                  <ToggleButton
                    className={classnames({
                      "button-outline": true,
                      "danger-button": this.state.isGenderSelected,
                      "col-5": true,
                      active: this.state.setMaleSelectedToTrue,
                      btn: true,
                      // "btn-outline-primary": true,
                      "mr-2": true,
                      rounded: true,
                    })}
                    value={1}
                    type="radio"
                    name="options"
                    id="option1"
                    checked={this.state.setGender === "option1"}
                    onChange={(e) => this.setGenderValue(e)}
                    onClick={() => {
                      this.checkIfGenderIsSelected();
                      this.removeActiveStateFromBtn();
                    }}
                  >
                    Male
                  </ToggleButton>
                  <ToggleButton
                    className={classnames({
                      "button-outline": true,
                      "danger-button": this.state.isGenderSelected,
                      "col-4": true,
                      btn: true,
                      active: this.state.setFemaleSelectedToTrue,

                      // "btn-outline-primary": true,
                      "mr-2": true,
                      rounded: true,
                    })}
                    value={2}
                    type="radio"
                    name="options"
                    id="option2"
                    checked={this.state.setGender === "option2"}
                    onChange={(e) => this.setGenderValue(e)}
                    onClick={() => {
                      this.checkIfGenderIsSelected();
                      this.removeActiveStateFromBtn();
                    }}
                  >
                    Female
                  </ToggleButton>
                  <ToggleButton
                    className={classnames({
                      "button-outline": true,
                      "danger-button": this.state.isGenderSelected,
                      "col-4": true,
                      btn: true,
                      active: this.state.setNeutralSelectedToTrue,

                      // "btn-outline-primary": true,
                      rounded: true,
                    })}
                    value={3}
                    type="radio"
                    name="options"
                    id="option3"
                    checked={this.state.setGender === "option3"}
                    onChange={(e) => this.setGenderValue(e)}
                    onClick={() => {
                      this.checkIfGenderIsSelected();
                      this.removeActiveStateFromBtn();
                    }}
                  >
                    Neutral
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>
            {/*  */}
            {/* TODO add tag autocomplete*/}
            <div className="form-group row mt-4">
              <label
                htmlFor="inputPassword"
                className="col-sm-3 col-md-2 col-form-label"
              >
                Interest:
              </label>
              <div className="col-sm-5">
                <select
                  className={classnames({
                    "custom-select": true,
                    "is-invalid": this.state.hasInterestError,
                    "is-valid": this.state.hasInterestSuccess,
                  })}
                  id="interest-input"
                  checked={this.state.setInterestSelected === "interest-input"}
                  defaultValue={this.props.editableGift.interest}
                  onChange={(e) => this.setInterestValue(e)}
                >
                  <option value="0">Nothing Selected</option>
                  <option value="1">Arts and Crafts</option>
                  <option value="2">Collectibles</option>
                  <option value="3">Electronics</option>
                  <option value="4">Jewelry</option>
                  <option value="5">Toys</option>
                  <option value="6">Sports & Recreation</option>
                  <option value="7">Outdoors</option>
                  <option value="8">Music</option>
                  <option value="9">Fashion</option>
                  <option value="10">Games</option>
                  <option value="11">Home Appliances</option>
                </select>
              </div>
              {/* TODO add multiselect with tags, need to make a component? */}
              {/* Age */}
              <div className="col-sm-3"></div>
            </div>
            <div className="form-group row mt-4">
              <label
                htmlFor="inputPassword"
                className="col-sm-3 col-md-2 col-form-label"
              >
                Age:
              </label>
              <div className="col-sm-4 col-6 col-md-3 col-lg-3 col-xl-2">
                <select
                  className={classnames({
                    "custom-select": true,
                    "is-invalid": this.state.hasAgeError,
                    "is-valid": this.state.hasAgeSuccess,
                  })}
                  id="age-input"
                  defaultValue={this.props.editableGift.age}
                  checked={this.state.setAgeSelected === "age-input"}
                  onChange={(e) => this.setAgeValue(e)}
                >
                  <option value="0">-----</option>
                  <option value="1">Under 12</option>
                  <option value="2">12-17</option>
                  <option value="3">18-24</option>
                  <option value="4">25-34</option>
                  <option value="5">35-44</option>
                  <option value="6">45-54</option>
                  <option value="7">55+</option>
                </select>
              </div>
            </div>
            {/* Price */}
            <div className="form-group row my-4 ">
              <label
                htmlFor="inputPassword"
                className="col-sm-3 col-md-2 col-form-label"
              >
                Price:
              </label>
              <div className="input-group  col-sm-4 col-6 col-md-3 col-lg-3 col-xl-2 ">
                <div className="input-group-prepend ">
                  <span
                    className={classnames({
                      "border-danger": this.state.hasPriceError,
                      "border-success": this.state.hasPriceSuccess,
                      numberSignBackground: true,
                      "input-group-text": true,
                      "transparent-dollar-sign": true,
                    })}
                  >
                    $
                  </span>
                </div>
                <input
                  type="title"
                  className={classnames({
                    "form-control": true,
                    "is-invalid": this.state.hasPriceError,
                    "is-valid": this.state.hasPriceSuccess,
                  })}
                  placeholder="0.00"
                  id="price-input"
                  defaultValue={(this.props.editableGift.price / 100).toFixed(
                    2
                  )}
                  onChange={(e) => this.setPriceNumber(e)}
                />
              </div>

              {this.state.hasPriceError && (
                <div className="mt-2 text-danger">
                  {this.state.priceWarning}
                </div>
              )}
            </div>
            <Link
              to="#"
              className="btn btn-primary btn-lg btn-block mt-5 mb-3"
              onClick={() => {
                this.validateGiftInfo();
              }}
            >
              Submit Gift
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    editableGift: state.editableGift,
    currentUser: state.currentUser,
  };
}
export default withRouter(connect(mapStateToProps)(AddGiftPage));
