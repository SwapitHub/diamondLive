"use client"
import { UserContext } from "@/app/context/UserContext";
import axios from "axios";
import Link from "next/link";
import { useContext, useMemo, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SlickSlider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export const GemstoneShopByShape = () => {
  const [gemstoneFilterData, setGemstoneFilterData] = useState([]);
  const {baseUrl} = useContext(UserContext)
  // =========shape api
  useMemo(() => {
    axios
      .get(
        `${baseUrl}/gemstone-attributes`
      )
      .then((res) => {
        setGemstoneFilterData(res.data.data);
      })
      .catch(() => {
        console.log("shape API error gemstone");
      });
  }, []);

  const gemstonesStyleSliderDesktop = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <div className="ShopDiamondShape gemstone diamond-sec">
        <div className="container">
          <h3>Shop by Gemstone</h3>
          <div className="flex">
            <div className="ShopDiamondShape-img-text diamond gemstone-slide page">

              <SlickSlider
                {...gemstonesStyleSliderDesktop}
                responsive={[
                  {
                    breakpoint: 1199,
                    settings: {
                      slidesToShow: 5,
                      slidesToScroll: 3,
                      infinite: true,
                    },
                  },
                  {
                    breakpoint: 991,
                    settings: {
                      slidesToShow: 4,
                      slidesToScroll: 3,
                      infinite: true,
                    },
                  },

                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 4,
                      slidesToScroll: 2,
                      infinite: true,
                    },
                  },
                  {
                    breakpoint: 639,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 2,
                      infinite: true,
                    },
                  },
                  {
                    breakpoint: 375,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                      infinite: true,
                    },
                  },
                ]}
              >
                {gemstoneFilterData.gemstones?.map((item, i) => {
                  
                  return (
                    <>
                      <Link
                        href={`/gemstone/style/${item.name}`}
                        key={i}
                      >
                        <div className="gemstone-slider-main">
                          <div className="gemstone-diamond-img">
                          <LazyLoadImage src={item.image} alt={item.name}  width="auto"  height="auto"  />
                          </div>
                          <span className="color-name">{item.name}</span>
                        </div>
                      </Link>
                    </>
                  );
                })}
              </SlickSlider>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};
