"use client"
import React from "react";
import Link from "next/link";

export const WeddingCollection = ({engagementRingMain,weddingJewelry,weddingCollection}) => {
  
    
  return (
    <section className="own-engagment gemstone WeddingCollection">
      <div className="container">
        <div className="inner-own-eng">
          <div className="heading-sec"></div>
          <div className="ring-grid-sec">
            <div className="grid-wrapper-bar">
              <Link href={`${engagementRingMain?.url}`}>
                <div className="img-bar">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: engagementRingMain?.description
                    }}
                  ></div>
                </div>
                <div className="contant-bar">
                  <h5>Natural diamonds</h5>
                </div>
              </Link>
            </div>
            <div className="grid-wrapper-bar">
              <Link href={`${weddingJewelry?.url}`}>
                <div className="img-bar">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: weddingJewelry?.description
                    }}
                  ></div>
                </div>
                <div className="contant-bar">
                  <h5>Gemstones</h5>
                </div>
              </Link>
            </div>
            <div className="grid-wrapper-bar">
              <Link href={`${weddingCollection?.url}`}>
                <div className="img-bar">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: weddingCollection?.description
                    }}
                  ></div>
                </div>
                <div className="contant-bar">
                  <h5>Lab Grown Diamonds</h5>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
