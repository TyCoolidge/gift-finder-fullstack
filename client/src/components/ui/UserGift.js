import React from "react";
import { Link } from "react-router-dom";
// import randomGifts from "../../mock-data/random-gifts";
// import users from "../../mock-data/users";
import { connect } from "react-redux";
import actions from "../../store/actions";
import { withRouter } from "react-router-dom";

class UserGift extends React.Component {
   constructor(props) {
      super(props);

      this.state = {};
   }
   storeEditableGift() {
      console.log("STORE_EDITABLE_GIFT");
      this.props.dispatch({
         type: actions.STORE_EDITABLE_GIFT,
         payload: this.props.gift,
      });

      this.props.history.push("/add-gift-page");
   }
   render() {
      return (
         <div>
            <div className="mb-3 row">
               <div className="col-4 col-sm-4 col-md-3">
                  {/* TODO add linebreaks */}
                  <div>
                     <a href={this.props.gift.url}>
                        <img
                           alt="item"
                           className="containsImage fitToImageContainer pointer"
                           src={this.props.gift.photo}
                        />
                     </a>
                  </div>
               </div>
               {/* fix format of text below */}
               <div className="col mt-2 giftInfoSize">
                  <div className="mb-2" style={{ fontSize: "18px" }}>
                     <b>{this.props.gift.title}</b>
                     <br />
                  </div>
                  <div className="mb-2 d-inline" style={{ fontSize: "16px" }}>
                     {this.props.gift.description}{" "}
                     <a href={this.props.gift.url}>More info</a>
                     <br />
                  </div>
                  <div className="mt-2 mb-2" style={{ fontSize: "16px" }}>
                     Price: ${(this.props.gift.price / 100).toFixed(2)}
                  </div>
               </div>
               <div className="col-2 float-right">
                  {/* when user clicks on edit, the addgiftpage should be prefilled with "clicked" gifts data */}
                  <Link
                     to="/add-gift-page"
                     className="float-right btn-sm btn-primary"
                     onClick={() => {
                        this.storeEditableGift();
                     }}
                  >
                     {/* needs on click that saves its data */}
                     Edit Gift
                  </Link>
                  <br />
                  <br />
                  <Link
                     to="/account-page"
                     className="float-right btn-sm btn-danger"
                  >
                     {/* needs on click that saves its data */}
                     Delete Gift
                  </Link>
               </div>
            </div>

            <hr />
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {
      editableGift: state.editableGift,
   };
}
export default withRouter(connect(mapStateToProps)(UserGift));
