import React from "react";
import { Link } from "react-router-dom";
import actions from "../../store/actions";
import { connect } from "react-redux";
const logo = require("../icons/gift-logo.png");

class Header extends React.Component {
  //if user clicks on logo it will remove stored state
  removeEditableGift() {
    this.props.dispatch({
      type: actions.STORE_EDITABLE_GIFT,
      payload: {},
    });
  }
  render() {
    return (
      <>
        <Link to="/">
          <h2
            className="titleSize"
            onClick={() => {
              this.removeEditableGift();
            }}
          >
            {" "}
            <img
              src={logo}
              alt="Gift Finder logo"
              width="70"
              height="70"
              className="pointer"
            />
            Gift Finder
          </h2>
        </Link>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    editableGift: state.editableGift,
  };
}
export default connect(mapStateToProps)(Header);
