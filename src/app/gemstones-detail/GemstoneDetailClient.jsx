"use client";
import axios from "axios";
import debounce from "lodash.debounce";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp, IoMdHeart } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdEmail, MdFamilyRestroom, MdMarkEmailRead } from "react-icons/md";
import { RiTruckLine } from "react-icons/ri";
import { SlLocationPin } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import Popup from "reactjs-popup";
import { v4 as uuidv4 } from "uuid";

import InnerImageZoom from "react-inner-image-zoom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import secureLocalStorage from "react-secure-storage";
import { UserContext } from "../context/UserContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useData } from "../context/DataContext";
import { Tabbing } from "../_componentStatic/Tabbing";
import Link from "next/link";
import { DropHint } from "../_componentStatic/DropHint";
import Image from "next/image";
import { addToCart } from "../../../store/actions/cartActions";

export default function GemstonesDetail({ gemstone }) {
  console.log(gemstone);

  const dispatch = useDispatch();
  const [diamondDetails, setDiamondDetails] = useState(false);
  const [banner, setBanner] = useState({});
  const [open, setOpen] = useState(false);
  const [averagePopup, setAveragePopup] = useState(false);
  const [hiddenContent, setHiddencontent] = useState(false);
  const [data, setData] = useState([]);
  const { baseUrl, imgAssetsUrl } = useContext(UserContext);
  const [removeWishList, setRemoveWishList] = useState();
  const wishListDataBase = useSelector((state) => state.productDataWishlist);
  console.log(data);

  const toggleDiamond = () => {
    setDiamondDetails(!diamondDetails);
  };

  const toggleBanner = (index) => {
    setBanner((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  useEffect(() => {
    if (averagePopup) {
      document.body.classList.add("email-popup-open");
    } else {
      document.body.classList.remove("email-popup-open");
    }
  }, [averagePopup]);

  const searchParams = useSearchParams();
  const stockNum = searchParams.get("stock_num");

  useMemo(() => {
    setData(gemstone);
  }, [gemstone]);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleString("default", {
    month: "long",
  });

  const currentDay = currentDate.getDate();
  const wishlist = useSelector((state) => state.wishlistData);

  const handleWishlist = async (
    item,
    user_id,
    product_type,
    gemstone_id,
    gemstone_price,
    gemstone_stock
  ) => {
    const newItem = { item, product_type: product_type, uniqueId: uuidv4() };
    dispatch(addToWishList(newItem));

    const formData = {
      user_id: user_id,
      product_type: product_type,
      gemstone_id: gemstone_id,
      gemstone_price: gemstone_price,
      gemstone_stock_no: gemstone_stock,
    };

    const urlNew = `${baseUrl}/add_to_wishlist?user_id=${formData.user_id}&product_type=${formData.product_type}&gemstone_price=${formData.gemstone_price}&gemstone_id=${formData.gemstone_id}&gemstone_stock_no=${formData.gemstone_stock_no}`;
    axios
      .get(urlNew, {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": tokenData,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(productList());
        } else {
          console.error("Error Status:", response.status);
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useMemo(() => {
    const fetchData = () => {
      const removeWish = `${baseUrl}/remove_wishlist_item/${removeWishList}`;
      axios
        .get(removeWish)
        .then((res) => {
          dispatch(productList());
        })
        .catch((error) => {
          console.log("CSRF Token API Error:", error);
        });
    };

    const debouncedFetchData = debounce(fetchData, 50); // Adjust delay as needed (in milliseconds)

    debouncedFetchData();

    return () => debouncedFetchData.cancel(); // Cleanup
  }, [removeWishList]);

  function handleWishlistRemove(belowItem) {
    wishlist.forEach((item) => {
      if (belowItem?.id === item.item?.id) {
        dispatch(removeToWishlist(item));
      }
    });

    const values = Object.values(wishListDataBase);
    values.forEach((item) => {
      if (belowItem?.stock_num === item?.gemstone_id) {
        setRemoveWishList(item?.id);
      }
    });
  }
  const user_id = secureLocalStorage.getItem("formData");

  const handleCreateAccount = async (
    userId,
    gemstone_id,
    gemstone_price,
    item,
    gemstone_stock_no,
    only_gemstone
  ) => {
    dispatch(
      addToCart({
        item,
        product_type: only_gemstone,
        uniqueId: uuidv4(),
      })
    );

    const formData = {
      user_id: userId,
      gemstone_id: gemstone_id,
      gemstone_price: gemstone_price,
      gemstone_stock_no: gemstone_stock_no,
      product_type: only_gemstone,
    };

    secureLocalStorage.setItem("cart_data", JSON.stringify(formData));

    var newApi = `${baseUrl}/cart?user_id=${formData.user_id}&gemstone_id=${formData.gemstone_id}&gemstone_price=${formData.gemstone_price}&gemstone_stock_no=${formData.gemstone_stock_no}&product_type=${formData.product_type}`;
    axios
      .get(newApi)
      .then((response) => {
        if (response.status === 200) {
          dispatch(productListCart());
        } else {
          console.error("Error Status:", response.status);
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    if (open) {
      document.body.classList.add("popup-open");
    } else {
      document.body.classList.remove("popup-open");
    }
  }, [open]);
  const navigate = useRouter();
  const { setHelpData } = useData();

  const handleClick = (diamond) => {
    secureLocalStorage.setItem(
      "helpData",
      JSON.stringify({ diamond: diamond })
    );
    setHelpData({ diamond: diamond });
    navigate("/help");
  };

  let wishlistIds = [];
  wishListDataBase.map((item) => {
    wishlistIds.push(parseInt(item.gemstone_stock_no));
  });

  let beforeLoginWishlistIds = [];
  wishlist.map((item) => {
    beforeLoginWishlistIds.push(item.diamond?.id || item.item?.id);
  });
  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
  };

  return (
    <>
      <div className="sticky-right-column gemstone-details-page">
        <div className="container">
          {/* ====================create your ring start */}
          <Tabbing
            gemStoneName={`1. Choose Gemstone`}
            ringName={`2. Choose Rings`}
            gemStoneLink={`/gemstones/start-with-a-gemstone`}
            ringLink={`/engagement-rings/start-with-a-setting`}
            type={"gemstone"}
          />

          {/* ====================create your ring end */}
          <div className="sticky-right-column">
            <div className="sticky-inner-main">
              {data.map((item) => {
                const currentUrl = window.location.href;

                return (
                  <>
                    <div className="left-product-images left-product-details">
                      <div className="main-zoom-iamge">
                        <LazyLoadImage
                          width="auto"
                          height="auto"
                          src={item.image_url}
                          alt={item.short_title}
                          onError={handleError}
                        />
                      </div>
                    </div>

                    <div className="right-product-content ">
                      <h4 className="heading-four">{item.short_title}</h4>
                      <div className="seleted-items-purchage">
                        <div className="setting-price-main">
                          <p className="setting-only-price">
                            <span id="title_price">
                              ${Math.round(item.total_sales_price)}
                            </span>
                          </p>
                          <p>
                            <span className="items-available-only">
                              Only {item.available} Available
                            </span>
                          </p>
                          <p className="right-product-content-gemstones">
                            This 9.0 x 7.0 mm {item.color} {item.shape} Lab
                            Grown Sapphire has been hand selected by our{" "}
                            {item.lab}-certified gemologists for its exceptional
                            characteristics and rarity.
                          </p>
                        </div>
                        <div className="selected-inner-pair caret-rounded">
                          <div className="left-icon-image">
                            <LazyLoadImage
                              width="auto"
                              height="auto"
                              src={`${imgAssetsUrl}/frontend/images/BlackRing.png`}
                              alt={item.short_title}
                              onError={handleError}
                            />
                          </div>
                          <div className="right-purchage-icon-content">
                            <h4 className="media-heading">LAST DAY!</h4>
                            <p className="media-text">
                              Free Diamond Jewellery <br />
                              With Purchase Over $1,000
                            </p>
                          </div>
                        </div>
                        <div className="purchage-select-box">
                          <div className="add-to-ring-bag">
                            <Link
                              href={`/engagement-rings/start-with-a-setting?stock_num=${item.stock_num}`}
                            >
                              Add To Ring
                            </Link>
                            <Link
                              href={"/cart"}
                              onClick={() =>
                                handleCreateAccount(
                                  user_id ? user_id : null,
                                  item.stock_num,
                                  item.total_sales_price,
                                  item,
                                  item.id,
                                  "gemstone"
                                )
                              }
                            >
                              Add To Bag
                            </Link>

                            <span>
                              <Link href="#">
                                {user_id ? (
                                  wishlistIds.includes(item.id) ? (
                                    <IoMdHeart
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleWishlistRemove(item);
                                      }}
                                    />
                                  ) : (
                                    <CiHeart
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleWishlist(
                                          item,
                                          user_id,
                                          "gemstone",
                                          item.stock_num,
                                          item.total_sales_price,
                                          item.id
                                        );
                                      }}
                                    />
                                  )
                                ) : beforeLoginWishlistIds.includes(
                                    item?.id
                                  ) ? (
                                  <IoMdHeart
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handleWishlistRemove(item);
                                    }}
                                  />
                                ) : (
                                  <CiHeart
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handleWishlist(
                                        item,
                                        user_id,
                                        "gemstone",
                                        item.stock_num,
                                        item.total_sales_price,
                                        item.id
                                      );
                                    }}
                                  />
                                )}
                              </Link>
                            </span>
                          </div>
                        </div>
                        <div className="social-icons">
                          <ul>
                            <li>
                              <Link href="javascript:void(0);">
                                <Popup
                                  trigger={
                                    <Link href="javascript:void(0);">
                                      {" "}
                                      <MdMarkEmailRead /> Drop Hint
                                    </Link>
                                  }
                                  open={open}
                                  closeOnDocumentClick
                                  onOpen={() => setOpen(true)}
                                  onClose={() => setOpen(false)}
                                  position="center"
                                >
                                  <DropHint setOpen={setOpen} diamond={item} />
                                </Popup>
                              </Link>
                            </li>
                            <li>
                              <Link
                                href="/help"
                                onClick={() => handleClick(item)}
                              >
                                <span>
                                  <MdEmail />
                                </span>{" "}
                                Email Us
                              </Link>
                            </li>
                            <li>
                              <Link href="tel:609-507-0003">
                                <span>
                                  <BiSolidPhoneCall />
                                </span>
                                609-507-0003
                              </Link>
                            </li>
                            {/* <li>
                              <Link href="javascript:void(0);">
                                <span>
                                  <IoChatbubbleOutline />
                                </span>{" "}
                                chat
                              </Link>
                            </li> */}
                          </ul>
                        </div>
                        <div className="selected-inner-pair caret-rounded">
                          <div className="left-icon-image">
                            <RiTruckLine />
                          </div>
                          <div className="right-purchage-icon-content">
                            <p className="media-text">
                              Free Shipping, Free 30 Day Returns
                            </p>
                          </div>
                        </div>
                        <div className="selected-inner-pair caret-rounded border-botttom">
                          <div className="left-icon-image">
                            <FaRegCalendarAlt />
                          </div>
                          <div className="right-purchage-icon-content">
                            <p className="media-text">
                              Order now and your order ships by {currentDay}{" "}
                              {currentMonth}, {currentYear}
                            </p>
                          </div>
                        </div>

                        <div className="drop-down-dimaond-details">
                          <ul>
                            <li>
                              <Link
                                href="javascript:void(0);"
                                onClick={() => toggleDiamond()}
                              >
                                <span> Gemstone Details</span>
                                <span>
                                  {diamondDetails ? (
                                    <IoIosArrowDown />
                                  ) : (
                                    <IoIosArrowUp />
                                  )}
                                </span>
                              </Link>
                              {diamondDetails && (
                                <ul className="dimaond-details-sub-list">
                                  <li>Stock Number: {item.stock_num}</li>
                                  <li>Gemstone: {item.gem_type}</li>
                                  <li>Origin: Lab Grown</li>
                                  <li>Shape: {item.shape}</li>
                                  <li>
                                    <Link
                                      href="javascript:void(0);"
                                      onClick={() =>
                                        setAveragePopup(!averagePopup)
                                      }
                                    >
                                      <IoInformationCircleOutline />
                                    </Link>
                                    {averagePopup && (
                                      <div className="new-popups">
                                        <AverageDimensionsPopup
                                          setAveragePopup={setAveragePopup}
                                        />
                                      </div>
                                    )}
                                    Average Dimensions: 9.0 x 7.0 mm
                                  </li>
                                  <li>Color: Intense {item.color}</li>
                                  <li>Clarity: Eye Clean</li>
                                </ul>
                              )}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>

            <div className="luxury-conscience-wrapper">
              <div className="inner-wrapper">
                <div className="gemstone-luxury-content">
                  <h4 className="gemstone-heading-luxy">
                    Responsible Gemstone Origins
                  </h4>
                  <p>A Better Standard</p>
                  <div className="gemstone-detail-image-contents">
                    <p>
                      Lab grown gemstones are made of the same chemical crystal
                      as mined gemstones and exhibit the same sparkle and
                      beauty. Because they are grown in controlled environments
                      using advanced technology, they require no mining to
                      produce. Their origins are therefore traceable and
                      responsible.{hiddenContent ? null : <span>...</span>}
                      <Link
                        href="javascript:void(0);"
                        onClick={() => setHiddencontent(true)}
                      >
                        {hiddenContent ? null : <span>Read More</span>}
                      </Link>{" "}
                      {hiddenContent && (
                        <p>
                          {" "}
                          Compared with mined gemstones, lab grown gemstones
                          have a smaller carbon footprint and result in less
                          environmental impact. Fine jewelry made with lab grown
                          gemstones and recycled precious metals provides a
                          responsible choice.
                        </p>
                      )}
                    </p>
                  </div>
                </div>
                <div className="luxury-drop">
                  <div className="order-left-details">
                    <div className="custom-order-faq ">
                      <h4>
                        <Link
                          href="javascript:void(0);"
                          onClick={() => toggleBanner(1)}
                        >
                          <span>
                            <ul className="grop-top-data">
                              <li>
                                <span className="drop-img-ring">
                                  <MdFamilyRestroom />
                                </span>
                              </li>
                              <li className="drop-content-text">
                                <span>
                                  <h5>Giving Back</h5>
                                </span>
                                <span>
                                  Comparison at our core since day one
                                </span>
                              </li>
                            </ul>
                          </span>
                          <span>
                            {banner[1] ? <IoIosArrowDown /> : <IoIosArrowUp />}
                          </span>
                        </Link>
                      </h4>
                      {banner[1] && (
                        <div className="show-order-content">
                          <p>
                            From mines to Main Street, we care about building
                            better communities by compassionately giving back.
                            In 2021, we started the SAMA Foundation to focus and
                            amplify our impact. Since then, we’ve donated $2
                            million towards leaving communities better than we
                            found them – from the areas where precious materials
                            are mined to the communities where our team and
                            customers live.
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="custom-order-faq ">
                      <h4>
                        <Link
                          href="javascript:void(0);"
                          onClick={() => toggleBanner(2)}
                        >
                          <span>
                            <ul className="grop-top-data">
                              <li>
                                <SlLocationPin />
                              </li>
                              <li className="drop-content-text">
                                <span>
                                  <h5>Responsible Gemstone Origin</h5>
                                </span>
                                <span>A Better Standard</span>
                              </li>
                            </ul>
                          </span>
                          <span>
                            {banner[2] ? <IoIosArrowDown /> : <IoIosArrowUp />}
                          </span>
                        </Link>
                      </h4>
                      {banner[2] && (
                        <div className="show-order-content">
                          <p>
                            We strive to offer gemstones sourced in alignment
                            with safe working conditions and environmentally
                            responsible principles. By continually working with
                            our colored gemstone suppliers to improve standards
                            and traceability, we work to promote higher
                            standards for gemstone sourcing to transform
                            dangerous mining conditions and encourage
                            responsible practices.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
