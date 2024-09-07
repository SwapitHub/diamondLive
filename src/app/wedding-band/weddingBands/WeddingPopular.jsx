import Link from "next/link";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const WeddingPopular = ({ covetedWeddingBands }) => {
  return (
    <>
      <section className="own-engagment wedding-style ">
        <div className="container">
          <div className="popular-engagment">
            <div className="heading-sec">
              <h2 className="heading-text">Most Coveted Wedding Bands</h2>
            </div>
            <div className="inner-polular-eng">
              {covetedWeddingBands.map((item, index) => {
                return (
                  <div className="popular-grid-wrapper" key={index}>
                    <Link
                      href={`/detail-wedding-band/${item?.slug}?color=18k-white-gold`}
                    >
                      <div className="imgg-sec">
                        <LazyLoadImage src={item.default_image_url} alt={item.name}  width="auto"  height="auto"  />
                      </div>
                      <div className="text-con">
                        <p>{item.name}</p>
                      </div>
                    </Link>
                  </div>
                );
              })}

             
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
