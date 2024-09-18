"use client";
import { UserContext } from "@/app/context/UserContext";
import Link from "next/link";
import { useContext } from "react";

export const DiamondEdu = () => {
  const { imgAssetsUrl } = useContext(UserContext);
  return (
    <>
      <section className="own-engagment education">
        <div className="container">
          <div className="inner-own-eng">
            <div className="heading-sec">
              <h2 className="heading-text">Engagement Ring Education</h2>
            </div>
            <div className="ring-grid-sec">
              <div className="grid-wrapper-bar">
                <Link href="/diamond-buying-guide">
                  <div className="img-bar">
                    <img
                      width="auto"
                      height="auto"
                      src={`${imgAssetsUrl}/frontend/images/Diamond-buying-guide.jpg`}
                      alt="client-img"
                      
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
                    <img
                      width="auto"
                      height="auto"
                      src={`${imgAssetsUrl}/frontend/images/Lab-grow-diamond.jpg`}
                      alt="client-img"
                      
                    />
                  </div>
                  <div className="contant-bar">
                    <h5>Lab Grown Diamonds Guide </h5>
                    {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. make a type
                                        specimen book. </p> */}
                  </div>
                </Link>
              </div>
              <div className="grid-wrapper-bar">
                <Link href="/engagement-ring-buying-guide">
                  <div className="img-bar">
                    <img
                      width="auto"
                      height="auto"
                      src={`${imgAssetsUrl}/frontend/images/Engagement-ring-faq.jpg`}
                      alt="client-img"
                      
                    />
                  </div>
                  <div className="contant-bar">
                    <h5>Engagement Ring FAQ’s </h5>
                    {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. make a type
                                        specimen book. </p> */}
                  </div>
                </Link>
              </div>
              <div className="grid-wrapper-bar">
                <Link href="/jewellery-care">
                  <div className="img-bar">
                    <img
                      width="auto"
                      height="auto"
                      src={`${imgAssetsUrl}/frontend/images/Jewwelry-care.png`}
                      alt="client-img"
                      
                    />
                  </div>
                  <div className="contant-bar">
                    <h5>Jewelry Care </h5>
                    {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. make a type
                                        specimen book. </p> */}
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
