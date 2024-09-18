"use client"
import React, { useContext } from "react";
import Link from "next/link";
import { UserContext } from "@/app/context/UserContext";

export const RingEducation = () => {
  const {imgAssetsUrl} = useContext(UserContext)
  return (
    <section className="own-engagment education own-pd-control">
      <div className="container">
        <div className="inner-own-eng">
          <div className="heading-sec">
            <h2 className="heading-text">Engagement Ring Education</h2>
          </div>
          <div className="ring-grid-sec">
            <div className="grid-wrapper-bar">
              <Link href="/diamond-buying-guide">
                <div className="img-bar">
                  <img width="auto"  height="auto"  
                    src={`${imgAssetsUrl}/frontend/images/educt3.png`}
                    alt="diamond-buying-guide"
                    
                  />
                </div>
                <div className="contant-bar">
                  <h5>Diamond Buying Guide</h5>
                  {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. make a type
                                    specimen book. </p> */}
                </div>
              </Link>
            </div>
            <div className="grid-wrapper-bar">
              <Link href="/lab-grown-diamonds">
                <div className="img-bar">
                  <img width="auto"  height="auto"  
                   src={`${imgAssetsUrl}/frontend/images/ring3.png`}
                    alt="lab-grown-diamonds"
                    
                  />
                </div>
                <div className="contant-bar">
                  <h5>Lab Grown Diamonds </h5>
                  {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. make a type
                                    specimen book. </p> */}
                </div>
              </Link>
            </div>
            <div className="grid-wrapper-bar">
              <Link href="/jewellery-care">
                <div className="img-bar">
                  <img width="auto"  height="auto"  
                    src={`${imgAssetsUrl}/frontend/images/educt1.png`}
                    alt="jewellery-care"
                    
                  />
                </div>
                <div className="contant-bar">
                  <h5>Jewelry Care </h5>
                  {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. make a type
                                    specimen book. </p> */}
                </div>
              </Link>
            </div>
            <div className="grid-wrapper-bar">
              <Link href="/ring-sizer">
                <div className="img-bar">
                  <img width="auto"  height="auto"  
                    src={`${imgAssetsUrl}/frontend/images/educt4.png`}
                    alt="ring-sizer"
                    
                  />
                </div>
                <div className="contant-bar">
                  <h5>Ring Size Chart</h5>
                  {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. make a type
                                    specimen book. </p> */}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
