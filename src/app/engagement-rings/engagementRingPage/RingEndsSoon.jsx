"use client"
import { UserContext } from "@/app/context/UserContext";
import { useContext } from "react";


export const RingEndsSoon = () => {

  const {baseUrl, imgAssetsUrl} = useContext(UserContext)
  
  return (
    <>
      <div className="endsSoon ends-soon">
        <div className="container">
          <div className="flex">
            <div className="endsSoon-img">
              <img width="auto"  height="auto"   className="desktop" src={`${imgAssetsUrl}/frontend/images/offerEng.jpg`} alt="endSoon" />
              <img width="auto"  height="auto"   className="mobile"  src={`${imgAssetsUrl}/frontend/images/ring-1-mob.jpg`} alt="endSoon" />

             
            </div>
            <div className="endsSoon-text ends-soon-txt">
              <h2>Offer</h2>              
              <p>Enjoy a 10% discount with purchase of over $2000</p>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
