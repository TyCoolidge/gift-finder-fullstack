import React from "react";
import Header from "../ui/Header";
import SignUp from "../ui/SignUp";
import LogIn from "../ui/LogIn";

export default function LoginPage() {
  return (
    // Make Title and Logo a component
    <div className="container">
      <div className="row mt-5">
        <div className="col-12">
          <div className="col-xl col-lg mx-4 col-md-12">
            <div className="card-body">
              <div className="row">
                <Header />
              </div>
            </div>
          </div>
        </div>
        {/* <h5 className="col-12">Let's Find the Perfect Gift!</h5> */}

        <div className="col-12 mt-2">
          <div className="">
            <div className="card-body">
              <div className="row">
                {/* TODO fix for mobile */}
                {/* Create Account component */}
                <SignUp />

                {/* Horizontal divider */}
                <div style={{ borderRight: "1px solid" }} />
                {/* LogIn component */}
                <LogIn />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
