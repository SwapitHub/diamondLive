"use client";
import Link from "next/link";

export const RingExclusive = ({
  roseGold,
  yellowGold,
  platinumRings,
  whiteGold,
  bridalSetRing,
}) => {
  return (
    <section className="own-engagment own-pd-control">
      <div className="container">
        <div className="popular-engagment">
          <div className="heading-sec">
            <h2 className="heading-text">Shop Engagement Rings By Style</h2>
          </div>
          <div className="inner-polular-eng">
            <div className="popular-grid-wrapper">
            <Link href={`${whiteGold?.url}`}>
                <div
                  className="imgg-sec"
                  dangerouslySetInnerHTML={{
                    __html: whiteGold?.description,
                  }}
                ></div>

                <div className="text-con">
                  <p>{whiteGold?.name}</p>
                </div>
              </Link>
            </div>
            <div className="popular-grid-wrapper">
             <Link href={`${yellowGold?.url}`}>
                <div
                  className="imgg-sec"
                  dangerouslySetInnerHTML={{
                    __html: yellowGold?.description,
                  }}
                ></div>

                <div className="text-con">
                  <p>{yellowGold?.name}</p>
                </div>
              </Link>
            </div>
            <div className="popular-grid-wrapper">
              <Link href={`${roseGold?.url}`}>
                <div
                  className="imgg-sec"
                  dangerouslySetInnerHTML={{
                    __html: roseGold?.description,
                  }}
                ></div>

                <div className="text-con">
                  <p>{roseGold?.name}</p>
                </div>
              </Link>
            </div>
            <div className="popular-grid-wrapper">
              <Link href={`${platinumRings?.url}`}>
                <div
                  className="imgg-sec"
                  dangerouslySetInnerHTML={{
                    __html: platinumRings?.description,
                  }}
                ></div>

                <div className="text-con">
                  <p>{platinumRings?.name}</p>
                </div>
              </Link>
            </div>
            <div className="popular-grid-wrapper">
            <Link href={`${bridalSetRing?.url}`}>
                <div
                  className="imgg-sec"
                  dangerouslySetInnerHTML={{
                    __html: bridalSetRing?.description,
                  }}
                ></div>

                <div className="text-con">
                  <p>{bridalSetRing?.name}</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
