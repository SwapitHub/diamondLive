"use client"
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export const AnniversaryRings = ({home}) => {

  
  return (
    <>
      <div className="ShopCategory ShopDiamondCotegory Anniversary Rings">
        <div className="container">
          <h3>Shop by Style</h3>

          <div className="flex-container">
            <div className="flex">
              {home.data?.shopbycategory?.map((item,i) => {
                
                return (
                 
                    <div className="column-width" key={i}>
                      <Link href={item.link}>
                        <div className="ShopCategory-img">
                          <LazyLoadImage
                            src={item?.image}
                            alt={item?.title}
                            width="auto"  height="auto"  
                          />
                        </div>
                        <h4>{item?.title}</h4>
                      </Link>
                    </div>
                
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
