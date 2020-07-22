/*Username up top  logout on top left
Your gifts
list of gifts similar to homepage, each gift linked to username
edit buttons next to each gift
edit button takes to to add gift page but parameters are already filled out
saving edited gift reflects on userpage and homepage
*/
import React from "react";
import { Link } from "react-router-dom";
import UserGift from "../ui/UserGift";
import toDisplayDate from "date-fns/format";
import Header from "../ui/Header";
import { connect } from "react-redux";
import actions from "../../store/actions";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

class AccountPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userGifts: [],
      userSinceDate: [],
    };
  }
  componentDidMount() {
    axios
      .get("https://run.mocky.io/v3/624bafeb-1593-4c68-9f9b-5952d2111755")
      .then((res) => {
        const currentUser = res.data[0];
        console.log(currentUser);
        //TODO make render faster && make current user
        this.setState({
          userSinceDate: toDisplayDate(currentUser.createdAt, "MMM. d, y"),
        });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        "https://raw.githubusercontent.com/TyCoolidge/my-app-gift-generator/master/src/mock-data/random-gifts.json"
      )
      .then((res) => {
        console.log(res.data);
        const gifts = res.data;
        this.setState({
          userGifts: gifts,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logOutCurrentUser() {
    this.props.dispatch({
      type: actions.UPDATE_CURRENT_USER,
      payload: {},
    });
  }
  render() {
    return (
      <div className="container">
        <div className="row mt-5"></div>
        <div className="row mt-4">
          <div className="col">
            <Header />
          </div>
          <div className="col text-right mt-3">
            <Link
              to="/login-page"
              className=""
              onClick={() => {
                this.logOutCurrentUser();
              }}
            >
              <FontAwesomeIcon
                icon={faSignOutAlt}
                style={{ fontSize: "40px" }}
                className=""
              />
              <div className="ml-1 d-inline" style={{ fontSize: "20px" }}>
                Log Out
              </div>
            </Link>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <h3 className="">My Account</h3>
            {/* <h2 className="text-muted"></h2> */}
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <h2 className="" style={{ fontSize: "20px" }}>
              Welcome Back: &nbsp;
              <div className="text-muted d-inline">
                {/* d-inline keeps text together inline  */}
                {this.props.currentUser.userName}
              </div>
            </h2>
            {/* <h2 className="text-muted"></h2> */}
          </div>
        </div>
        <h2 className="mb-3" style={{ fontSize: "20px" }}>
          Member since: &nbsp;
          <div className="text-muted d-inline">{this.state.userSinceDate}</div>
        </h2>
        <div className="row mb-5">
          <div className="col">
            <h2 className="" style={{ fontSize: "20px" }}>
              Your created gifts:
            </h2>
          </div>
          <div className="col">
            <div className="float-right">
              <Link
                to="/add-gift-page"
                className="float-right btn-sm btn-primary"
              >
                Create New Gift
              </Link>
            </div>
          </div>
        </div>
        {this.state.userGifts
          .filter((gift) => {
            //filter comes first "higher order"
            return gift.createdByUserId === this.props.currentUser.id;
          })
          .map((gift) => {
            return <UserGift gift={gift} key={gift.id} />;
          })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}
export default connect(mapStateToProps)(AccountPage);
