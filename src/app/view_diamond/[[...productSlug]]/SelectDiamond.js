"use client";
import axios from "axios";
import debounce from "lodash.debounce";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GiMapleLeaf } from "react-icons/gi";
import { IoIosArrowDown, IoIosArrowUp, IoMdHeart } from "react-icons/io";
import { IoDiamond, IoInformationCircleOutline } from "react-icons/io5";
import { MdEmail, MdMarkEmailRead } from "react-icons/md";
import { RiTruckLine } from "react-icons/ri";
import { RxDotFilled } from "react-icons/rx";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import Popup from "reactjs-popup";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../../context/UserContext";
import { DropHint } from "../../_componentStatic/DropHint";
import PricePopup from "../../_componentStatic/popups/PricePopup";
import MeasPopup from "../../_componentStatic/popups/MeasPopup";
import TablePopup from "../../_componentStatic/popups/TablePopup";
import DepthPopup from "../../_componentStatic/popups/DepthPopup";
import SymmetryPopup from "../../_componentStatic/popups/SymmetryPopup";
import PolishPopup from "../../_componentStatic/popups/PolishPopup";
import GirdlePopup from "../../_componentStatic/popups/GirdlePopup";
import CuletPopup from "../../_componentStatic/popups/CuletPopup";
import FlourePopup from "../../_componentStatic/popups/FlourePopup";
import ShapePopup from "../../_componentStatic/popups/ShapePopup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useData } from "../../context/DataContext";
import { Tabbing } from "../../_componentStatic/Tabbing";


const SelectDiamond = ({diamondDetails, productSlug}) => {
  const [banner, setBanner] = useState({});
  const [open, setOpen] = useState(false);
  const [measOpen, setMeasOpen] = useState(false);
  const [bankOpen, setBankOpen] = useState(false);
  const [cutOpen, setCutOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [tableOpen, setTableOpen] = useState(false);
  const [depthOpen, setDepthOpen] = useState(false);
  const [symmetryOpen, setSymmetryOpen] = useState(false);
  const [polishOpen, setPolishOpen] = useState(false);
  const [girdleOpen, setGirdleOpen] = useState(false);
  const [culetOpen, setCuletOpen] = useState(false);
  const [floureOpen, setFloureOpen] = useState(false);
  const [shapeOpen, setShapeOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const [clarityOpen, setClarityOpen] = useState(false);
  const [newData, setNewData] = useState([]);
  const { baseUrl, imgAssetsUrl } = useContext(UserContext);
  const queryParams = new URLSearchParams(location.search);
  const stock_num = queryParams.get("stock_num");
  const diamond_origin = queryParams.get("diamond_origin");
  const diamond_original = queryParams.get("diamond_original");

  const productColor = queryParams.get("color");
  const ring_size = queryParams.get("ring_size");
  const textEngraving = queryParams.get("textEngraving");
  const font_style = queryParams.get("font_style");

  const diamond = "diamond";
  const user_id = secureLocalStorage.getItem("formData");
  const dispatch = useDispatch();

  const wishListDataBase = useSelector((state) => state.productDataWishlist);

  const [removeWishList, setRemoveWishList] = useState();
  useMemo(() => {
    setNewData(diamondDetails)
  }, []);
  
  

  // ===============ring details Api==============

  const [filterData, setFilterData] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);

  useMemo(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/product/${productSlug}`);

        const product = response.data.data;
        const imgUrl = product.default_image_url
          .split("/")
          .slice(-1)
          .join()
          .split(".")
          .shift();

        // Update state with both product and imgUrl
        setFilterData({
          product: product,
          imgUrl: imgUrl,
        });

        const similarProductsData = JSON.parse(product.similar_products);
        setSimilarProducts(similarProductsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [productSlug]);
  // ring api details Api end
  const toggleDiamond = (index) => {
    setDiamondDetails((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const toggleBanner = (index) => {
    setBanner((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (
      isOpen ||
      cutOpen ||
      colorOpen ||
      bankOpen ||
      shapeOpen ||
      culetOpen ||
      depthOpen ||
      floureOpen ||
      girdleOpen ||
      measOpen ||
      polishOpen ||
      priceOpen ||
      shapeOpen ||
      symmetryOpen ||
      tableOpen ||
      clarityOpen
    ) {
      document.body.classList.add("email-popup-open");
    } else {
      document.body.classList.remove("email-popup-open");
    }
  }, [
    isOpen,
    cutOpen,
    colorOpen,
    bankOpen,
    shapeOpen,
    culetOpen,
    depthOpen,
    floureOpen,
    girdleOpen,
    measOpen,
    polishOpen,
    priceOpen,
    symmetryOpen,
    tableOpen,
    clarityOpen,
  ]);

  useEffect(() => {
    if (open) {
      document.body.classList.add("popup-open");
    } else {
      document.body.classList.remove("popup-open");
    }
  }, [open]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  const currentDate = new Date();

  const currentFinalDate = new Date(currentDate);
  currentFinalDate.setDate(
    currentFinalDate.getDate()
    // + parseInt(newData.product?.shippingDay)
  );
  const formattedDate = currentFinalDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const wishlist = useSelector((state) => state.wishlistData);

  const handleWishlist = async (
    item,
    user_id,
    product_type,
    diamond_id,
    diamond_price,
    diamond_stock_no
  ) => {
    const newItem = {
      diamonds: item,
      product_type: product_type,
      diamond_type: diamond_origin === "lab_grown" ? diamond_origin : "natural",
      uniqueId: uuidv4(),
    };
    dispatch(addToWishList(newItem));

    const formData = {
      user_id: user_id,
      product_type: product_type,
      diamond_id: diamond_id,
      diamond_price: diamond_price,
      diamond_stock_no: diamond_stock_no,
    };

    axios
      .get(
        `${baseUrl}/add_to_wishlist?user_id=${formData.user_id}&product_type=${
          formData.product_type
        }&diamond_price=${formData.diamond_price}&diamond_id=${
          formData.diamond_id
        }&diamond_stock_no=${formData.diamond_stock_no}&diamond_id=${
          formData.diamond_id
        }&diamond_type=${
          diamond_origin === "lab_grown" ? "Lab_grown_Diamond" : "Diamond"
        }`
      )
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
  // diamond shape
  const [shapeData, setShapeData] = useState(null);
  useMemo(() => {
    axios
      .get(`${baseUrl}/diamondshape`)
      .then((res) => {
        setShapeData(res.data.data);
      })
      .catch(() => {
        console.log("API error");
      });
  }, []);

  const [tokenData, setTokenData] = useState();
  useMemo(() => {
    axios
      .get(
        "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/csrf-token"
      )
      .then((res) => {
        setTokenData(res.data.csrf_token);
      })
      .catch((error) => {
        console.log("CSRF Token API Error:", error);
      });
  }, []);

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

    if (removeWishList !== null) {
      debouncedFetchData();
    }

    return () => debouncedFetchData.cancel(); // Cleanup
  }, [removeWishList]);

  function handleWishlistRemove(belowItem, itemId) {
    wishlist.forEach((item) => {
      if (belowItem?.id === (item.diamonds?.id || item.diamond?.id)) {
        dispatch(removeToWishlist(item));
      }
    });

    const values = Object.values(wishListDataBase);
    values.forEach((item) => {
      if (belowItem?.stock_num === item?.diamond_id) {
        setRemoveWishList(item?.id);
      }
    });
  }

  const router = useRouter();
  const { setHelpData } = useData();

  const handleClick = (diamond) => {
    secureLocalStorage.setItem(
      "helpData",
      JSON.stringify({ diamond: diamond })
    );
    setHelpData({ diamond: diamond });
    router.push("/help");
  };

  let wishlistIds = [];
  wishListDataBase.map((item) => {
    wishlistIds.push(parseInt(item.diamond_stock_no));
  });

  let beforeLoginWishlistIds = [];
  wishlist.map((item) => {
    beforeLoginWishlistIds.push(item.diamond?.id || item.diamonds?.id);
  });

  // ============ meta tag  =======================//
  const currentUrl = window.location.href;
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);
  const mainCategory = pathSegments[0] || "";

  const [loadedIframes, setLoadedIframes] = useState({});

  const handleIframeLoad = (id) => {
    setLoadedIframes((prevState) => ({ ...prevState, [id]: true }));
  };

  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
  };
  return (
    <>
      

      <div className="sticky-right-column  diamond-view">
        <div className="container">
          {/* ====================create your ring start */}
          <div className="main-arrow-heading">
            {/* ====================create your ring start */}
            <Tabbing
              stock_num={productSlug}
              type={"diamond"}
              ringName={`2. Choose Rings`}
              ringLink={`/engagement-rings/start-with-a-setting`}
              diamondName={`1. Choose Diamonds`}
              diamondLink={`javascript:void(0)`}
            />
          </div>
          <div className="sticky-right-column">
            {newData.map((item) => {
              return (
                <>
                  <div className="sticky-inner-main">
                    <div className="left-product-images left-product-details">
                      <div className="main-zoom-iamge">
                        {!loadedIframes[item.id] && (
                          <LazyLoadImage
                            width="auto"
                            height="auto"
                            src={item.image_url}
                            alt={item.shape}
                            
                            onError={handleError}
                          />
                        )}
                        <iframe
                          src={item.video_url}
                          frameBorder="0"
                          title="video"
                          onLoad={() => handleIframeLoad(item.id)}
                          allow="autoplay"
                          onError={handleError}
                        ></iframe>
                      </div>
                    </div>
                    <div className="right-product-content ">
                      <h5 className="heading-four">
                        {item.size} Carat {item.shape} Diamond
                      </h5>
                      <p>
                        {item.cut && (
                          <>
                            {item.cut} Cut
                            <span>
                              <RxDotFilled />
                            </span>
                          </>
                        )}
                        {item.color} Color
                        <span>
                          <RxDotFilled />
                        </span>{" "}
                        {item.clarity} Clarity{" "}
                        <span>
                          <RxDotFilled />
                        </span>
                        {item.lab}
                      </p>
                      <div className="seleted-items-purchage">
                        <div className="setting-price-main">
                          <p className="setting-only-price">
                            <span id="title_price">
                              ${Math.round(item.base_price)}
                            </span>
                          </p>
                          <p>
                            <span>Only {item.available} Available</span>
                          </p>
                        </div>
                        <div className="selected-inner-pair caret-rounded">
                          <div className="left-icon-image">
                            <LazyLoadImage
                              src={`${imgAssetsUrl}/frontend/images/BlackRing.png`}
                              alt={item.name}
                              
                              width="auto"
                              height="auto"
                              onError={handleError}
                            />
                          </div>
                          <div className="right-purchage-icon-content">
                            <h4 className="media-heading">LAST DAY!</h4>
                            <p className="media-text">
                              Lab Diamond Studs With Purchase Over $1,000.
                              Surprise Earrings With All Other Purchases.
                            </p>
                          </div>
                        </div>
                        <div className="purchage-select-box">
                          <div className="add-to-cart">
                            {productSlug ? (
                              <Link
                                href={`/final_ring/${
                                  filterData.product?.slug
                                }?color=${productColor}&stock_num=${
                                  item.stock_num
                                }&diamond_original=${diamond_original}${
                                  diamond_origin === "lab_grown"
                                    ? `&diamond_origin=lab_grown`
                                    : "&diamond_origin=natural"
                                }&ring_size=${ring_size}${
                                  textEngraving
                                    ? `&textEngraving=${textEngraving}`
                                    : ""
                                }${
                                  font_style ? `&font_style=${font_style}` : ""
                                }`}
                              >
                                Choose this Diamond
                              </Link>
                            ) : (
                              <Link
                                href={`/engagement-rings/start-with-a-setting?${"stock_num"}=${
                                  item.stock_num
                                }${
                                  diamond_origin
                                    ? `&diamond_origin=${diamond_origin}`
                                    : ""
                                }`}
                              >
                                Choose this Diamond
                              </Link>
                            )}

                            <span>
                              <Link href="javascript:void(0);">
                                {user_id ? (
                                  wishlistIds.includes(item.id) ? (
                                    <IoMdHeart
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleWishlistRemove(item, item.id);
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
                                          diamond,
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
                                      handleWishlistRemove(item, item.id);
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
                                        diamond,
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
                              {" "}
                              Order now and your order ships by, {
                                formattedDate
                              }{" "}
                              depending on center diamond.
                            </p>
                          </div>
                        </div>
                        <div className="drop-down-dimaond-details">
                          <ul>
                            <li>
                              <Link
                                href="javascript:void(0);"
                                onClick={() => toggleDiamond(1)}
                              >
                                <span> Diamond Details</span>
                                <span>
                                  {diamondDetails[1] ? (
                                    <IoIosArrowDown />
                                  ) : (
                                    <IoIosArrowUp />
                                  )}
                                </span>
                              </Link>

                              {diamondDetails[1] && (
                                <ul className="dimaond-details-sub-list">
                                  <li>Stock Number: {item.stock_num}</li>
                                  <li>Gemstone: Natural, untreated diamond</li>
                                  <li>Origin: {item.country}</li>
                                  <li>
                                    <Link
                                      href="javascript:void(0);"
                                      onClick={() => setPriceOpen(!priceOpen)}
                                    >
                                      <IoInformationCircleOutline />
                                      {priceOpen && (
                                        <div className="new-popups">
                                          <PricePopup
                                            setPriceOpen={setPriceOpen}
                                          />
                                        </div>
                                      )}
                                    </Link>
                                    Price: ${Math.round(item.base_price)}
                                  </li>

                                  <li>
                                    <Link
                                      href="javascript:void(0);"
                                      onClick={() => setIsOpen(!isOpen)}
                                    >
                                      <IoInformationCircleOutline />
                                    </Link>
                                    Carat Weight: {item.size}
                                  </li>
                                  {item.cut && 
                                  <li>
                                    <Link
                                      href="javascript:void(0);"
                                      onClick={() => setCutOpen(!cutOpen)}
                                      >
                                      <IoInformationCircleOutline />
                                    </Link>
                                    Cut: {item.cut}
                                  </li>
                                    }
                                  <li>
                                    <Link
                                      href="javascript:void(0);"
                                      onClick={() => setColorOpen(!colorOpen)}
                                    >
                                      <IoInformationCircleOutline />
                                    </Link>
                                    Color: {item.color}
                                  </li>
                                  <li>
                                    <Link
                                      href="javascript:void(0);"
                                      onClick={() =>
                                        setClarityOpen(!clarityOpen)
                                      }
                                    >
                                      <IoInformationCircleOutline />
                                    </Link>
                                    Clarity: {item.clarity}
                                  </li>
                                  <li>
                                    <Link
                                      href="javascript:void(0);"
                                      onClick={() => setMeasOpen(!measOpen)}
                                    >
                                      <IoInformationCircleOutline />
                                      {measOpen && (
                                        <div className="new-popups">
                                          <MeasPopup
                                            setMeasOpen={setMeasOpen}
                                          />
                                        </div>
                                      )}
                                    </Link>
                                    Measurements: {item.measurement}
                                  </li>
                                  <li>
                                    <Link
                                      href="javascript:void(0);"
                                      onClick={() => setTableOpen(!tableOpen)}
                                    >
                                      <IoInformationCircleOutline />
                                      {tableOpen && (
                                        <div className="new-popups">
                                          <TablePopup
                                            setTableOpen={setTableOpen}
                                          />
                                        </div>
                                      )}
                                    </Link>
                                    Table: {item.table_percent}%
                                  </li>
                                  <li>
                                    <Link
                                      href="javascript:void(0);"
                                      onClick={() => setDepthOpen(!depthOpen)}
                                    >
                                      <IoInformationCircleOutline />
                                      {depthOpen && (
                                        <div className="new-popups">
                                          <DepthPopup
                                            setDepthOpen={setDepthOpen}
                                          />
                                        </div>
                                      )}
                                    </Link>
                                    Depth: {item.depth_percent}%
                                  </li>
                                  <li>
                                    <Link
                                      href="javascript:void(0);"
                                      onClick={() =>
                                        setSymmetryOpen(!symmetryOpen)
                                      }
                                    >
                                      <IoInformationCircleOutline />
                                      {symmetryOpen && (
                                        <div className="new-popups">
                                          <SymmetryPopup
                                            setSymmetryOpen={setSymmetryOpen}
                                          />
                                        </div>
                                      )}
                                    </Link>
                                    Symmetry: {item.symmetry}
                                  </li>
                                  <li>
                                    <Link
                                      href="javascript:void(0);"
                                      onClick={() => setPolishOpen(!polishOpen)}
                                    >
                                      <IoInformationCircleOutline />
                                      {polishOpen && (
                                        <div className="new-popups">
                                          <PolishPopup
                                            setPolishOpen={setPolishOpen}
                                          />
                                        </div>
                                      )}
                                    </Link>
                                    Polish: {item.polish}
                                  </li>
                                  <li>
                                    <Link
                                      href="javascript:void(0);"
                                      onClick={() => setGirdleOpen(!girdleOpen)}
                                    >
                                      <IoInformationCircleOutline />
                                      {girdleOpen && (
                                        <div className="new-popups">
                                          <GirdlePopup
                                            setGirdleOpen={setGirdleOpen}
                                          />
                                        </div>
                                      )}
                                    </Link>
                                    Girdle: {item.girdle_condition}
                                  </li>
                                  <li>
                                    <Link
                                      href="javascript:void(0);"
                                      onClick={() => setCuletOpen(!culetOpen)}
                                    >
                                      <IoInformationCircleOutline />
                                      {culetOpen && (
                                        <div className="new-popups">
                                          <CuletPopup
                                            setCuletOpen={setCuletOpen}
                                          />
                                        </div>
                                      )}
                                    </Link>
                                    Culet: {item.culet_size}
                                  </li>
                                  <li>
                                    <Link
                                      href="javascript:void(0);"
                                      onClick={() => setFloureOpen(!floureOpen)}
                                    >
                                      <IoInformationCircleOutline />
                                      {floureOpen && (
                                        <div className="new-popups">
                                          <FlourePopup
                                            setFloureOpen={setFloureOpen}
                                          />
                                        </div>
                                      )}
                                    </Link>
                                    Flourescene: {item.fluor_intensity}
                                  </li>
                                  <li>
                                    <Link
                                      href="javascript:void(0);"
                                      onClick={() => setShapeOpen(!shapeOpen)}
                                    >
                                      <IoInformationCircleOutline />
                                      {shapeOpen && (
                                        <div className="new-popups">
                                          <ShapePopup
                                            setShapeOpen={setShapeOpen}
                                          />
                                        </div>
                                      )}
                                    </Link>
                                    Shape: {item.shape}
                                  </li>
                                </ul>
                              )}
                            </li>
                            {item.cert_url === null ? null : (
                              <li>
                                <Link
                                  href="javascript:void(0);"
                                  onClick={() => toggleDiamond(2)}
                                >
                                  <span> Certified By {item.lab}</span>
                                  <span>
                                    {diamondDetails[2] ? (
                                      <IoIosArrowDown />
                                    ) : (
                                      <IoIosArrowUp />
                                    )}
                                  </span>
                                </Link>
                                {diamondDetails[2] && (
                                  <ul className="dimaond-details-sub-list">
                                    <li>
                                      <iframe
                                        src={item.cert_url}
                                        frameborder="0"
                                        title="pdf"
                                      ></iframe>
                                      <Link
                                        href={item.cert_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="pdf_viewer"
                                      >
                                        View Certificate
                                      </Link>
                                    </li>
                                  </ul>
                                )}
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}

            <div className="luxury-conscience-wrapper">
              <div className="inner-wrapper">
                <div className="luxury-content">
                  <h4 className="heading-luxy">
                    Your Diamond’s Ethical Origins
                  </h4>
                  <p>Botswana Sort</p>
                  <div className="image-contents">
                    <img
                      src={`${imgAssetsUrl}/frontend/images/botswana-map.jpg`}
                      alt="map"
                      
                      width="auto"
                      height="auto"
                      onError={handleError}
                    />
                    <p>
                      A ring that evokes the happiness of love and partnership
                      is even more joyful when you know that it was sustainably
                      sourced and mindfully produced. From our mission to our
                      unique jewelry designs, everything at SAMA is held to
                      exceptional standards.
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
                                  <GiMapleLeaf />
                                </span>
                              </li>
                              <li className="drop-content-text">
                                <span>
                                  <h5>
                                    Beyond Conflict Free <sup>TM</sup>
                                  </h5>
                                </span>
                                <span>
                                  Setting the standard in transparency for
                                  nearly two decades
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
                            Our commitment to transparency began with the Beyond
                            Conflict Free™ standard we pioneered. We select
                            diamonds for their ethical and environmentally
                            responsible origins, besting the industry standard
                            of merely “conflict free” — which is narrowly
                            defined as diamonds that finance wars against
                            legitimate governments. Our diamonds provide miners
                            with fair wages and safe working conditions, empower
                            their communities, and never fund wars.
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
                                <IoDiamond />
                              </li>
                              <li className="drop-content-text">
                                <span>
                                  <h5>What Sets Us Apart</h5>
                                </span>
                                <span>Traceable diamond origins</span>
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
                            SAMA goes above and beyond the current industry
                            standards to offer diamonds that were selected for
                            their responsible origins. To improve transparency
                            and traceability, we have developed chain of custody
                            protocols for our natural diamonds to promote
                            tracking and identification of diamonds from their
                            countries of origin.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="cs-your-mind-sec-main">
              <div className="main-head">
                <h3>The Four C’s of Your Diamond</h3>
              </div>
              <div className="cs-your-mind-sec-inner">
                <div className="cs-your-mind-sec">
                  <h4>Diamond Size: 1.27 Ct</h4>
                  <p>
                    The carat is the unit of weight of a diamond. Carat is often
                    confused with size even though it is actually a measure of
                    weight. One carat equals 200 milligrams or 0.2 grams. The
                    scale below illustrates the typical size relationship
                    between diamonds of increasing carat weights. Remember that
                    while the measurements below are typical, every diamond is
                    unique.
                  </p>
                  <Link href="javascript:void(0);" onClick={togglePopup}>
                    Learn more
                    {isOpen && (
                      <div className="new-popups">
                        <CaratPopup setIsOpen={setIsOpen} />
                      </div>
                    )}
                  </Link>
                  <div class="diamond-size-box">
                    <div class="ir312-slider-bar ir312-slider-bar-carat">
                      <div
                        class="data h3 mb10"
                        data-toggle="carat-block"
                        data-carat="1.27"
                        style={{ left: "48.2674%" }}
                      >
                        <div class="nowrap">your diamond</div>
                        <span class="n">1.27 CT</span>
                      </div>
                      <ol>
                        <li class="fore1 fore"></li>
                        <li class="fore2 fore"></li>
                        <li class="fore3 fore"></li>
                        <li class="fore4 fore"></li>
                        <li class="fore5 fore"></li>
                        <li class="fore6 fore"></li>
                        <li class="fore7 fore"></li>
                        <li class="fore8 fore"></li>
                        <li class="fore9 fore"></li>
                      </ol>
                    </div>
                    <LazyLoadImage
                      src="//css.brilliantearth.com/static/img/abtest/detail/diamond-size-ir312.jpg"
                      class="img-responsive"
                      alt="diamond size"
                      
                      width="auto"
                      height="auto"
                    />
                  </div>
                </div>

                <div className="cs-your-mind-sec">
                  <h4>Cut: Super Ideal</h4>
                  <p>
                    The cut refers to the angles and proportions of a diamond.
                    The cut of a diamond - its form and finish, its depth and
                    width, the uniformity of the facets - determines its beauty.
                    The skill with which a diamond is cut determines how well it
                    reflects and refracts light.
                  </p>
                  <Link
                    href="javascript:void(0);"
                    onClick={() => setCutOpen(!cutOpen)}
                  >
                    Learn more
                    {cutOpen && (
                      <div className="new-popups">
                        <CutPopup setCutOpen={setCutOpen} />
                      </div>
                    )}
                  </Link>
                  <div class="ir312-diamond-clarity-box">
                    <div class="pover-data">
                      <div class="item hidden">
                        <div class="data" style={{ left: "20%" }}>
                          <div class="h4">Super Ideal</div>
                          <p>
                            Cut to the most exacting standards. These diamonds
                            have the most desirable dimensions and are
                            proportioned to return the maximum possible light.
                          </p>
                        </div>
                      </div>
                      <div class="item hidden">
                        <div class="data" style={{ left: "36%" }}>
                          <div class="h4">Super Ideal</div>
                          <p>
                            Cut to the most exacting standards. These diamonds
                            have the most desirable dimensions and are
                            proportioned to return the maximum possible light.
                          </p>
                        </div>
                      </div>
                      <div class="item hidden">
                        <div class="data" style={{ left: "50%" }}>
                          <div class="h4">Super Ideal</div>
                          <p>
                            Cut to the most exacting standards. These diamonds
                            have the most desirable dimensions and are
                            proportioned to return the maximum possible light.
                          </p>
                        </div>
                      </div>
                      <div class="item hidden">
                        <div class="data" style={{ left: "auto", right: 0 }}>
                          <div class="h4">Super Ideal</div>
                          <p>
                            Cut to the most exacting standards. These diamonds
                            have the most desirable dimensions and are
                            proportioned to return the maximum possible light.
                          </p>
                        </div>
                      </div>
                      <div class="item ">
                        <div class="data" style={{ left: "auto", right: 0 }}>
                          <div class="h4">Super Ideal</div>
                          <p>
                            Cut to the most exacting standards. These diamonds
                            have the most desirable dimensions and are
                            proportioned to return the maximum possible light.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="ir312-slider-bar ir312-slider-bar-cut">
                      <ol class="fs-13">
                        <li>
                          <span class="cut-level">
                            Poor
                            <br />{" "}
                            <em class="hidden-sm">(not carried by SAMA)</em>
                          </span>
                        </li>
                        <li>
                          <span class="cut-level"> Fair</span>
                        </li>
                        <li>
                          <span class="cut-level"> Good</span>
                        </li>
                        <li>
                          <span class="cut-level"> Very Good</span>
                        </li>
                        <li>
                          <span class="cut-level"> Ideal</span>
                        </li>
                        <li>
                          <span class="cut-level"> Super Ideal</span>
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div className="cs-your-mind-sec">
                  <h4>Color: E</h4>
                  <p>
                    Color is the natural color visible in a diamond and does not
                    change over time. Colorless diamonds allow more light to
                    pass through than a colored diamond, releasing more sparkle
                    and fire. Acting as a prism, a diamond divides light into a
                    spectrum of colors and reflects this light as colorful
                    flashes called fire.
                  </p>
                  <Link
                    href="javascript:void(0);"
                    onClick={() => setColorOpen(!colorOpen)}
                  >
                    Learn more
                    {colorOpen && (
                      <div className="new-popups">
                        <ColorPopup setColorOpen={setColorOpen} />
                      </div>
                    )}
                  </Link>
                  <div class="ir312-diamond-color-box ir312-diamond-fc-box">
                    <div class="data">
                      <div class="h4">
                        E: <span class="rank">Colorless</span>
                      </div>
                      <div class="description">
                        Only miniscule traces of color can be detected by an
                        expert gemologist - a rare, high quality diamond.
                      </div>
                    </div>
                    <span class="arrow" style={{ left: "9%" }}></span>
                    <LazyLoadImage
                      src="//css.brilliantearth.com/static/img/abtest/detail/diamond-color-box-v2.jpg"
                      class="img-responsive"
                      alt="diamond color"
                      
                      width="auto"
                      height="auto"
                    />
                  </div>
                </div>
                <div className="cs-your-mind-sec">
                  <h4>Clarity: IF</h4>
                  <p>
                    A diamond's clarity refers to the presence of impurities on
                    and within the stone. When a rough stone is extracted from
                    carbon deep beneath the earth, tiny traces of natural
                    elements are almost always trapped inside and are called
                    inclusions.
                  </p>
                  <Link
                    href="javascript:void(0);"
                    onClick={() => setClarityOpen(!clarityOpen)}
                  >
                    Learn more
                    {clarityOpen && (
                      <div className="new-popups">
                        <ClarityPopup setClarityOpen={setClarityOpen} />
                      </div>
                    )}
                  </Link>
                  <div className="ir312-diamond-clarity-box">
                    <div className="pover-data">
                      <div className="item hidden">
                        <div className="data" style={{ left: "20%" }}>
                          <div className="h4">IF</div>
                          <p>Internally Flawless. No internal flaws.</p>
                        </div>
                      </div>
                      <div className="item hidden">
                        <div className="data" style={{ left: "36%;" }}>
                          <div className="h4">IF</div>
                          <p>Internally Flawless. No internal flaws.</p>
                        </div>
                      </div>
                      <div className="item hidden">
                        <div className="data" style={{ left: "50%;" }}>
                          <div className="h4">IF</div>
                          <p>Internally Flawless. No internal flaws.</p>
                        </div>
                      </div>
                      <div className="item ">
                        <div
                          className="data"
                          style={{ left: "auto", right: 0 }}
                        >
                          <div className="h4">IF</div>
                          <p>Internally Flawless. No internal flaws.</p>
                        </div>
                      </div>
                      <div className="item hidden">
                        <div
                          className="data"
                          style={{ left: "auto", right: 0 }}
                        >
                          <div className="h4">IF</div>
                          <p>Internally Flawless. No internal flaws.</p>
                        </div>
                      </div>
                    </div>
                    <ol className="btm-slider-bar">
                      <li>
                        <div className="slider-bar-clarity-text">
                          <div className="h5">i1, i2, i3</div>
                          <span className="hidden-sm">
                            included
                            <br />{" "}
                            <em className="tt-n">(not carried by SAMA)</em>
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="slider-bar-clarity-text">
                          <div className="h5">si1, si2</div>
                          <span className="hidden-sm">slightly included</span>
                        </div>
                      </li>
                      <li>
                        <div className="slider-bar-clarity-text">
                          <div className="h5">vs1, vs2</div>
                          <span className="hidden-sm">
                            very slightly included
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="slider-bar-clarity-text">
                          <div className="h5">vvs1, vvs2</div>
                          <span className="hidden-sm">
                            very very slightly included
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="slider-bar-clarity-text">
                          <div className="h5"> if</div>
                          <span className="hidden-sm">internally flawless</span>
                        </div>
                      </li>
                      <li>
                        <div className="slider-bar-clarity-text">
                          <div className="h5"> fl</div>
                          <span>Flawless</span>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectDiamond;