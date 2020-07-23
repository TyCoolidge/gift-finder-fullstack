import React from "react";
// import randomGift from "../../mock-data/random-gift-data"

export default function IndividualGift(props) {
   return (
      <div>
         <div className="row">
            <div className="col-4 col-sm-4 col-md-3">
               {/* TODO add linebreaks */}
               <div>
                  <a href={props.gift.url}>
                     <img
                        alt="item"
                        className="containsImage fitToImageContainer pointer"
                        src={props.gift.photo}
                     />
                  </a>
               </div>
            </div>
            {/* fix format of text below */}
            <div className="col">
               <div className="giftInfoSize">
                  <div className="mb-2" style={{ fontSize: "18px" }}>
                     <b>{props.gift.title}</b>
                     <br />
                  </div>
                  <div className="mb-2">
                     {/* if too long truncate */}

                     <div className="d-inline" style={{ fontSize: "16px" }}>
                        {" "}
                        {props.gift.description} &nbsp;
                        <a href={props.gift.url}>More info</a>
                     </div>
                     <br />
                  </div>
                  <div className="mb-2" style={{ fontSize: "16px" }}>
                     Price: ${(props.gift.price / 100).toFixed(2)}
                  </div>
               </div>
            </div>
         </div>
         <hr />
      </div>
   );
}
