"use client"
import { UserContext } from "@/app/context/UserContext";
import Link from "next/link";
import { useContext } from "react";

export const WeddingByStyle = () => {
  const {imgAssetsUrl} = useContext(UserContext)
  return (
    <section className="own-engagment wedding-style ">
      <div className="container">
        <div className="popular-engagment">
          <div className="heading-sec">
            <h2 className="heading-text">Shop Wedding Bands By Style</h2>
          </div>
          <div className="inner-polular-eng">
            <div className="popular-grid-wrapper">
              <Link href="/wedding-band/women/eternity-bands">
                <div className="imgg-sec">
                  <img  width="auto"  height="auto"   src={`${imgAssetsUrl}/frontend/images/Eternity.png`} alt="eternity" />
                </div>
                <div className="text-con">
                  <p>Eternity </p>
                </div>
              </Link>
            </div>
            <div className="popular-grid-wrapper">
              <Link href="/wedding-band/women/curved-bands">
                <div className="imgg-sec">
                  <img  width="auto"  height="auto"   src={`${imgAssetsUrl}/frontend/images/Curved.png`} alt="curved" />
                </div>
                <div className="text-con">
                  <p>Curved</p>
                </div>
              </Link>
            </div>
            <div className="popular-grid-wrapper">
              <Link href="/wedding-band/women/chevron">
                <div className="imgg-sec">
                  <img  width="auto"  height="auto"   src={`${imgAssetsUrl}/frontend/images/Channel-Set.png`} alt="channel-set" />
                </div>
                <div className="text-con">
                  <p>Chevron Bands</p>
                </div>
              </Link>
            </div>
            <div className="popular-grid-wrapper">
              <Link href="/wedding-band/women/twisted">
                <div className="imgg-sec">
                  <img  width="auto"  height="auto"   src={`${imgAssetsUrl}/frontend/images/Twisted.png`} alt="twisted" />
                </div>
                <div className="text-con">
                  <p>Twisted </p>
                </div>
              </Link>
            </div>
            <div className="popular-grid-wrapper">
              <Link href="/wedding-band/women/womens-wedding-ring">
                <div className="imgg-sec">
                  <img  width="auto"  height="auto"   src={`${imgAssetsUrl}/frontend/images/Baguette.png`} alt="baguette" />
                </div>
                <div className="text-con">
                  <p>All Women Rings</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
