import React from "react";
import { Link } from "react-router-dom";
import Header from "../ui/Header";
import IndividualGift from "../ui/IndividualGift";
import axios from "axios";
import { connect } from "react-redux";
import actions from "../../store/actions";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faSignOutAlt,
  faGift,
} from "@fortawesome/free-solid-svg-icons";

class HomePage extends React.Component {
  constructor() {
    super();

    this.state = {
      displayedGifts: [],
      allGifts: [],
      gender: 0,
      age: 0,
      interest: 0,
      price: 0,
      isLogInAvaliable: true,
      isLogOutAvaliable: false,
      /*set current state of logIn button to true and logOut button to false
      write function if user is not logged in swap the two states*/
    };
  }
  componentDidMount() {
    axios
      .get(
        "https://raw.githubusercontent.com/TyCoolidge/my-app-gift-generator/master/src/mock-data/random-gifts.json"
      )
      .then((res) => {
        console.log(res.data);
        const gifts = res.data;
        this.setState({
          displayedGifts: gifts,
          allGifts: gifts,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setGender(e) {
    this.setState({ gender: Number(e.target.value) }, () => {
      this.setDisplayedGifts();
    });
  }
  setAge(e) {
    this.setState({ age: Number(e.target.value) }, () => {
      this.setDisplayedGifts();
    });
  }
  setInterest(e) {
    this.setState({ interest: Number(e.target.value) }, () => {
      this.setDisplayedGifts();
    });
  }
  setPrice(e) {
    this.setState({ price: Number(e.target.value) }, () => {
      this.setDisplayedGifts();
    });
  }
  setDisplayedGifts() {
    const gifts = [...this.state.allGifts];
    let filteredGifts = gifts;

    // Filter down filtereredGifts based on criteria below
    // Then set state of displayedGifts: filteredGifts

    if (this.state.gender !== 0) {
      //if gender is selected
      filteredGifts = filteredGifts.filter((gift) => {
        return gift.gender === this.state.gender;
      });
    }
    if (this.state.age !== 0) {
      //if age is selected
      filteredGifts = filteredGifts.filter((gift) => {
        return gift.age === this.state.age;
      });
    }
    if (this.state.interest !== 0) {
      //if interest is selected
      filteredGifts = filteredGifts.filter((gift) => {
        return gift.interest === this.state.interest;
      });
    }
    //price ranges start
    if (this.state.price === 1) {
      //if price is selected
      filteredGifts = filteredGifts.filter((gift) => {
        return gift.price < 2500;
      });
    }
    if (this.state.price === 2) {
      //if price is selected
      filteredGifts = filteredGifts.filter((gift) => {
        return gift.price >= 2500 && gift.price <= 5000;
      });
    }
    if (this.state.price === 3) {
      //if price is selected
      filteredGifts = filteredGifts.filter((gift) => {
        return gift.price > 5000 && gift.price <= 7500;
      });
    }
    if (this.state.price === 4) {
      //if price is selected
      filteredGifts = filteredGifts.filter((gift) => {
        return gift.price > 7500 && gift.price <= 10000;
      });
    }
    if (this.state.price === 5) {
      //if price is selected
      filteredGifts = filteredGifts.filter((gift) => {
        return gift.price > 10000 && gift.price <= 20000;
      });
    }
    if (this.state.price === 6) {
      //if price is selected
      filteredGifts = filteredGifts.filter((gift) => {
        return gift.price > 20000;
      });
    }

    this.setState({ displayedGifts: filteredGifts });
  }

  isUserLoggedIn() {
    // https://stackoverflow.com/a/32108184
    //checks if state is empty
    if (
      Object.keys(this.props.currentUser).length === 0 &&
      this.props.currentUser.constructor === Object
    ) {
      return false;
    } else {
      return true;
    }
  }

  checkIfUserLoggedInForShareGiftIdea() {
    if (Object.keys(this.props.currentUser).length === 0) {
      return this.props.history.push("/login-page");
    } else {
      return this.props.history.push("/add-gift-page");
    }
  }
  logOutCurrentUser() {
    this.props.dispatch({
      type: actions.UPDATE_CURRENT_USER,
      payload: {},
    });
  }
  /*TODO clean up code
  this is used so when a user clicks on "my account", once they log in
  they will be redirected back to account page instead of add gift*/

  goBackToAccountPage() {
    const backToAccountPage = "back to account";
    this.props.dispatch({
      type: actions.REDIRECT_TO_ACCOUNT_PAGE,
      payload: backToAccountPage,
    });
  }

  render() {
    return (
      // <!-- Example single danger button -->
      <div className="container">
        <div className="row mt-5">
          <div className="col text-left">
            <Header />
          </div>
          <div className="col text-right mt-4">
            {/* change state, if not logged in direct those to login page */}
            {/* move up to log in view */}
            <Link
              to="#"
              className="mr-4 "
              onClick={() => {
                this.checkIfUserLoggedInForShareGiftIdea();
              }}
            >
              <FontAwesomeIcon icon={faGift} style={{ fontSize: "40px" }} />
              <div className="ml-1 d-inline" style={{ fontSize: "20px" }}>
                Share Gift
              </div>
            </Link>

            {!this.isUserLoggedIn() && (
              <Link
                to="/login-page"
                onClick={() => {
                  this.goBackToAccountPage();
                }}
              >
                <FontAwesomeIcon
                  icon={faSignInAlt}
                  style={{ fontSize: "40px" }}
                />
                <div className="ml-2 d-inline" style={{ fontSize: "20px" }}>
                  Log In
                </div>
              </Link>
            )}
            {this.isUserLoggedIn() && (
              <Link
                to="/login-page"
                className="float-right"
                onClick={() => {
                  this.logOutCurrentUser();
                }}
              >
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  style={{ fontSize: "40px" }}
                  className=""
                />
                <div className="ml-2 d-inline" style={{ fontSize: "20px" }}>
                  Log Out
                </div>
              </Link>
            )}
          </div>
        </div>
        {/* Seperate row for titles of each select menu TODO: clean up code  */}
        <div className="row mt-3">
          <div className="col-3">
            <h5>Gender</h5>
          </div>
          <div className="col-3">
            <h5>Age Group</h5>
          </div>
          <div className="col-3">
            <h5>Interest</h5>
          </div>
          <div className="col-3">
            <h5>Price Range</h5>
          </div>
        </div>
        {/* TODO: add functionality */}
        <div className="row">
          <div className="col-3">
            <select
              className="custom-select"
              id="gender-dropdown"
              value={this.state.gender}
              onChange={(e) => this.setGender(e)}
            >
              <option value={0}>Nothing Selected</option>
              <option value={1}>Male</option>
              <option value={2}>Female</option>
              <option value={3}>Gender Neutral</option>
            </select>
          </div>
          <div className="col-3">
            <select
              className="custom-select"
              id="age-dropdown"
              value={this.state.age}
              onChange={(e) => this.setAge(e)}
            >
              <option value={0}>Nothing Selected</option>
              <option value={1}>Under 12</option>
              <option value={2}>12-17</option>
              <option value={3}>18-24</option>
              <option value={4}>25-34</option>
              <option value={5}>35-44</option>
              <option value={6}>45-54</option>
              <option value={7}>55+</option>
              <option value={8}>All ages</option>
            </select>
          </div>
          {/* Allow multiple selects */}
          <div className="col-3">
            <select
              className="custom-select"
              id="interest-dropdown"
              value={this.state.interest}
              onChange={(e) => this.setInterest(e)}
            >
              <option value={0}>Nothing Selected</option>
              <option value={1}>Arts and Crafts</option>
              <option value={2}>Collectibles</option>
              <option value={3}>Electronics</option>
              <option value={4}>Jewelry</option>
              <option value={5}>Toys</option>
              <option value={6}>Sports & Recreation</option>
              <option value={7}>Outdoors</option>
              <option value={8}>Music</option>
              <option value={9}>Fashion</option>
              <option value={10}>Games</option>
              <option value={11}>Home Appliances</option>
            </select>
          </div>
          {/* Maybe add dragbar to adjust range */}
          <div className="col-3">
            <select
              className="custom-select"
              id="price-dropdown"
              value={this.state.price}
              onChange={(e) => this.setPrice(e)}
            >
              <option value={0}>Nothing Selected</option>
              <option
                value={1}
                // add ranges for prices
              >
                Under $25
              </option>
              <option value={2}>$25-$50</option>
              <option value={3}>$50-$75</option>
              <option value={4}>$75-$100</option>
              <option value={5}>$100-$200</option>
              <option value={6}>$200+</option>
            </select>
          </div>
        </div>
        {/* Todo add style */}
        <div className="mb-2 mt-5 ">
          {/* map method use to iterate through gifts array returning the values shown below from our data */}
          {this.state.displayedGifts.map((gift) => {
            return <IndividualGift gift={gift} key={gift.id} />;
          })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    redirectToAccountPage: state.redirectToAccountPage,
  };
}
export default withRouter(connect(mapStateToProps)(HomePage));
