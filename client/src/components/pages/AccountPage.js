/*Username up top  logout on top left
Your gifts
list of gifts similar to homepage, each gift linked to username
edit buttons next to each gift
edit button takes to to add gift page but parameters are already filled out
saving edited gift reflects on userpage and homepage
*/
import React from "react";
import toDisplayDate from "date-fns/format";
import { Link } from "react-router-dom";
import UserGift from "../ui/UserGift";

import Header from "../ui/Header";
import { connect } from "react-redux";
import actions from "../../store/actions";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faGift } from "@fortawesome/free-solid-svg-icons";

class AccountPage extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         userGifts: [],

         // currentUser: {},
      };
   }
   componentDidMount() {
      axios
         .get("/api/v1/gifts")
         .then((res) => {
            console.log(res.data);
            const gifts = res.data;
            //change created_by_user_id to camelCase
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
                     to="#"
                     className="mr-4 "
                     onClick={() => {
                        this.checkIfUserLoggedInForShareGiftIdea();
                     }}
                  >
                     <FontAwesomeIcon
                        icon={faGift}
                        style={{ fontSize: "25px" }}
                     />
                     <div
                        className="ml-1 d-inline"
                        style={{ fontSize: "25px" }}
                     >
                        Share Gift
                     </div>
                  </Link>
                  <Link
                     to="/login-page"
                     className=""
                     onClick={() => {
                        this.logOutCurrentUser();
                     }}
                  >
                     <FontAwesomeIcon
                        icon={faSignOutAlt}
                        style={{ fontSize: "25px" }}
                        className=""
                     />
                     <div
                        className="ml-1 d-inline"
                        style={{ fontSize: "25px" }}
                     >
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
                        {this.props.currentUser.username}
                     </div>
                  </h2>
                  {/* <h2 className="text-muted"></h2> */}
               </div>
            </div>
            <h2 className="mb-3" style={{ fontSize: "20px" }}>
               Member since: &nbsp;
               <div className="text-muted d-inline">
                  {toDisplayDate(
                     this.props.currentUser.createdAt,
                     "MMMM do, y"
                  )}
               </div>
            </h2>
            <div className="row mb-5">
               <div className="col">
                  <h2 className="" style={{ fontSize: "20px" }}>
                     Your created gifts:
                  </h2>
               </div>
            </div>
            {this.state.userGifts
               .filter((gift) => {
                  //filter comes first "higher order"
                  return gift.created_by_user_id === this.props.currentUser.id;
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
