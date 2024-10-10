"use client";
import Link from "next/link";
import { useContext, useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { useData } from "../context/DataContext";
import { UserContext } from "../context/UserContext";

const Help = () => {
  const { imgBaseUrl, imgAssetsUrl } = useContext(UserContext);

  const white = "18k-white-gold";
  const yellow = "18k-yellow-gold";
  const rose = "18k-rose-gold";
  const platinum = "platinum";

  const { helpData, setHelpData } = useData();
  const {
    filterData,
    listColor,
    diamond,
    diamond_origin,
    product_type,
    diamond_original,
    ring_size,
    font,
    engraving,
  } = helpData;
  console.log(helpData);

  useEffect(() => {
    const data = JSON.parse(secureLocalStorage.getItem("helpData"));

    if (data) {
      setHelpData(data);
    }
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//js.hsforms.net/forms/embed/v2.js";
    document.body.appendChild(script);

    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: "45427602",
          formId: "3dceaeb5-f341-406d-8d9f-82bddfbd3a0e",
          target: "#needHelpForm",
        });
      }
    };
  }, []);
  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
  };

  console.log(helpData);

  return (
    <>
      <section className="request-help-main">
        <div className="container">
          <div className="request-helped-cnt">
            <h2> Need Help?</h2>
            <p>
              Our jewellery specialists are happy to answer your questions about
              this product.
            </p>
          </div>
          <div className="request-help-inner">
            <div className="request-help-left">
              <div id="needHelpForm"></div>
              <p className="privacy-views">
                Your privacy is important to us.{" "}
                <Link className="td-u" href="/privacy-policy">
                  View Privacy Policy
                </Link>
                .
              </p>
            </div>
            <div className="request-help-middle">
              <div className="product-of-interest text-center pt-30">
                <div class="product-pic">
                  <Link
                    href={
                      filterData && diamond?.gem_type == null && diamond_origin
                        ? `/final_ring/${filterData?.product?.slug}?color=${listColor}&stock_num=${diamond?.stock_num}&diamond_original=${diamond_original}&diamond_origin=${diamond_origin}&ring_size=${ring_size}&font_style=${font}&textEngraving=${engraving}`
                        : filterData &&
                          !diamond?.gem_type != null &&
                          diamond_origin
                        ? `/final_ring_gemstone/${filterData?.product?.slug}?color=${listColor}&stock_num=${diamond?.stock_num}&diamond_original=${diamond_origin}&ring_size=${ring_size}`
                        : !filterData && diamond?.gem_type == null
                        ? `/view_diamond/${diamond?.stock_num}${
                            diamond?.lab_grown === true
                              ? "?diamond_origin=lab_grown"
                              : ""
                          }`
                        : !filterData && diamond?.gem_type != null
                        ? `/gemstones-detail/${diamond?.stock_num}`
                        : product_type === "matching_set"
                        ? `/detail-wedding-band/${filterData?.product?.slug}?color=${listColor}`
                        : filterData && diamond?.gem_type == null
                        ? `/engagement-ring/${
                            filterData?.product?.slug
                          }?color=${listColor}${
                            diamond?.stock_num
                              ? `&stock_num=${diamond?.stock_num}`
                              : ""
                          }`
                        : filterData && !diamond?.gem_type != null
                        ? `/detail-ring-product-gemstone/${filterData?.product?.slug}?color=${listColor}&stock_num=${diamond?.stock_num}`
                        : ""
                    }
                  >
                    <ul className="picture-of-help-page">
                      <li
                        className={listColor === white ? "active" : "displayed"}
                      >
                        <img
                          width="auto"
                          height="auto"
                          src={`${imgBaseUrl}/${filterData?.imgUrl}/${filterData?.imgUrl}.jpg`}
                          alt={filterData?.product?.name}
                          onError={handleError}
                        />
                      </li>
                      <li
                        className={
                          listColor === yellow ? "active" : "displayed"
                        }
                      >
                        <img
                          width="auto"
                          height="auto"
                          src={`${imgBaseUrl}/${filterData?.imgUrl}/${filterData?.imgUrl}.alt.jpg`}
                          alt={filterData?.product?.name}
                          onError={handleError}
                        />
                      </li>
                      <li
                        className={listColor === rose ? "active" : "displayed"}
                      >
                        <img
                          width="auto"
                          height="auto"
                          src={`${imgBaseUrl}/${filterData?.imgUrl}/${filterData?.imgUrl}.alt1.jpg`}
                          alt={filterData?.product?.name}
                          onError={handleError}
                        />
                      </li>
                      <li
                        className={
                          listColor === platinum ? "active" : "displayed"
                        }
                      >
                        <img
                          width="auto"
                          height="auto"
                          src={`${imgBaseUrl}/${filterData?.imgUrl}/${filterData?.imgUrl}.jpg`}
                          alt={filterData?.product?.name}
                          onError={handleError}
                        />
                      </li>
                      {diamond && (
                        <li>
                          <img
                            width="auto"
                            height="auto"
                            src={diamond?.image_url}
                            alt={diamond?.name || diamond?.shape}
                            onError={handleError}
                          />
                        </li>
                      )}
                    </ul>
                  </Link>
                  {Object.keys(helpData).length === 0 && (
                    <Link href="/">
                      <ul>
                        <li>
                          <img
                            width="auto"
                            height="auto"
                            src={`${imgAssetsUrl}/public/Animated-Loader.svg`}
                            alt="logo"
                            onError={handleError}
                          />
                        </li>
                      </ul>
                    </Link>
                  )}
                </div>
                {Object.keys(helpData).length === 0 ? null : (
                  <>
                    <h5>
                      <Link
                        href={
                          filterData &&
                          diamond?.gem_type == null &&
                          diamond_origin
                            ? `/final_ring/${filterData?.product?.slug}?color=${listColor}&stock_num=${diamond?.stock_num}&diamond_original=${diamond_original}&diamond_origin=${diamond_origin}&ring_size=${ring_size}&font_style=${font}&textEngraving=${engraving}`
                            : filterData &&
                              !diamond?.gem_type != null &&
                              diamond_origin
                            ? `/final_ring_gemstone/${filterData?.product?.slug}?color=${listColor}&stock_num=${diamond?.stock_num}&diamond_original=${diamond_origin}&ring_size=${ring_size}`
                            : !filterData && diamond?.gem_type == null
                            ? `/view_diamond/${diamond?.stock_num}${
                                diamond?.lab_grown === true
                                  ? "?diamond_origin=lab_grown"
                                  : ""
                              }`
                            : !filterData && diamond?.gem_type != null
                            ? `/gemstones-detail/${diamond?.stock_num}`
                            : filterData && diamond?.gem_type == null
                            ? `/engagement-ring/${
                                filterData?.product?.slug
                              }?color=${listColor}${
                                diamond?.stock_num
                                  ? `&stock_num=${diamond?.stock_num}`
                                  : ""
                              }`
                            : filterData && !diamond?.gem_type != null
                            ? `/detail-ring-product-gemstone/${filterData?.product?.slug}?color=${listColor}&stock_num=${diamond?.stock_num}`
                            : ""
                        }
                      >
                        {listColor ? listColor?.replace(/-/g, " ") : ""}{" "}
                        {filterData?.product?.name && filterData?.product?.name}
                        {filterData && diamond ? " with " : null}
                        {diamond?.gem_type != null ? (
                          <span> {diamond?.short_title} </span>
                        ) : diamond && diamond?.gem_type == null ? (
                          <span>
                            {diamond?.size} Carat {diamond?.shape} Diamond{" "}
                          </span>
                        ) : null}
                      </Link>
                    </h5>
                    <p>
                      <span>{diamond?.stock_num}</span>{" "}
                      {filterData?.product?.sku}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Help;
