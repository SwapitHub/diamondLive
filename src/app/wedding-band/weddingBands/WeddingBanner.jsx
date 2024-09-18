"use client"
import { UserContext } from "@/app/context/UserContext";
import Link from "next/link";
import { useContext } from "react";
import { IoIosArrowForward } from "react-icons/io";

export const WeddingBanner = () => {
  const {imgAssetsUrl} = useContext(UserContext)
  return (
    <>
      <div className="banner-main engment-banner-sec wedding-banner">
        <div className="inner-banner-img">
          <img className="desktop" src={`${imgAssetsUrl}/frontend/images/weddingbanner33.jpg`} alt="wedding-banner"  width="auto"  height="auto"  />
          <img className="mobile"  src={`${imgAssetsUrl}/frontend/images/wedding-band-mob.jpg`} alt="wedding-banner2"  width="auto"  height="auto"  />
        </div>
        <div className="container min-ht">
          <div className=" banner flex min-ht">
            <div className="banner-text min-ht">
              <div className="breadcrum">
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <span>
                      <IoIosArrowForward />
                    </span>
                  </li>
                  <li>
                    <Link href="#"> Wedding Bands</Link>
                  </li>
                </ul>
              </div>

              <h1>Wedding Rings & Bands</h1>
              <span>
                Discover SAMA designs to match your one-of-a-kind style!
              </span>
              <div className="btn-bar">
                <Link className="button" href="/wedding-band/women/curved-bands">
                  Shop Wedding Bands
                </Link>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
};
