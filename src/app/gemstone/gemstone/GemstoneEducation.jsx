
import DOMPurify from "dompurify";
import Link from "next/link";
import React from "react";

export const GemstoneEducation = ({
  birthStone,
  gemstoneMeaning,
  sapphireBuying,
  diamondGuide,
}) => {
  return (
    <section className="own-engagment education">
      <div className="container">
        <div className="inner-own-eng gemstone">
          <div className="heading-sec">
            <h2 className="heading-text">Gemstone Education</h2>
          </div>
          <div className="ring-grid-sec">
            <div className="grid-wrapper-bar">
              <Link href="javascript:void(0);">
                <div className="img-bar">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(birthStone?.description),
                    }}
                  ></div>
                </div>
                <div className="contant-bar">
                  <h5>{birthStone?.name}</h5>
                </div>
              </Link>
            </div>
            <div className="grid-wrapper-bar">
              <Link href="javascript:void(0);">
                <div className="img-bar">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(gemstoneMeaning?.description),
                    }}
                  ></div>
                </div>
                <div className="contant-bar">
                  <h5>{gemstoneMeaning?.name}</h5>
                </div>
              </Link>
            </div>
            <div className="grid-wrapper-bar">
              <Link href="javascript:void(0);">
                <div className="img-bar">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(sapphireBuying?.description),
                    }}
                  ></div>
                </div>
                <div className="contant-bar">
                  <h5>{sapphireBuying?.name}</h5>
                </div>
              </Link>
            </div>
            <div className="grid-wrapper-bar">
              <Link href="javascript:void(0);">
                <div className="img-bar">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(diamondGuide?.description),
                    }}
                  ></div>
                </div>
                <div className="contant-bar">
                  <h5>{diamondGuide?.name}</h5>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
