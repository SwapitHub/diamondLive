"use client"
import axios from "axios";
import debounce from "lodash.debounce";
import { useContext, useEffect, useMemo, useState } from "react";
import { BiSolidPhoneCall } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { IoStar } from "react-icons/io5";
import { MdEmail, MdMarkEmailRead } from "react-icons/md";
import { RiTruckLine } from "react-icons/ri";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import { useDispatch, useSelector } from "react-redux";
import Popup from "reactjs-popup";
import { v4 as uuidv4 } from "uuid";


import { DropHint } from "@/app/_componentStatic/DropHint";
import { Tabbing } from "@/app/_componentStatic/Tabbing";
import { useData } from "@/app/context/DataContext";
import { UserContext } from "@/app/context/UserContext";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import secureLocalStorage from "react-secure-storage";
import { addToCart } from "../../../../store/actions/cartActions";
import { addToWishlist } from "../../../../store/actions/wishlistAction";

export default function FinalGemstone({gemstoneDataServer, ringData}){
  const productType = "ring_gemstone";
  const { baseUrl,imgBaseUrl, imgAssetsUrl } = useContext(UserContext);

  const wishListDataBase = useSelector((state) => state.productDataWishlist);

  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const textEngraving = queryParams.get("textEngraving");
  const font_style = queryParams.get("font_style");
  var {productSlug} = useParams();
  
  const productColor = queryParams.get("color");
  const ring_size = queryParams.get("ring_size");
  const stock_num = queryParams.get("stock_num");
  const listColor = queryParams.get("color");
  const diamond_original = queryParams.get("diamond_original");
  const [labGrownDetails, setLabGrownDetails] = useState();

  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [removeWishList, setRemoveWishList] = useState();

  const diamondData = Object.assign({}, ...data);
  useEffect(() => {
    if (open) {
      document.body.classList.add("popup-open");
    } else {
      document.body.classList.remove("popup-open");
    }
  }, [open]);
  useMemo(() => {
   setData(gemstoneDataServer)
  }, []);





  // ===============ring details Api==============

  const [filterData, setFilterData] = useState([]);

  const white = "18k-white-gold";
  const yellow = "18k-yellow-gold";
  const rose = "18k-rose-gold";
  const platinum = "platinum";
  useMemo(() => {
    setFilterData({
      product: ringData.data,
      imgUrl: ringData.data.internal_sku
    })
  }, [productSlug])
  // ring api details Api end

  // =======================
  const userId = secureLocalStorage.getItem("formData");
  
  // ================cart post method
  // ================cart post method
  const [formData, setFormData] = useState();
  const handleCreateAccount = async (
    product_type,
    ring_price,
    ring_id,
    ring_data,
    ring_img,
    ring_color,
    diamond_id,
    gemstone,
    diamond_price,
    userId,
    ring_gemstone,
    ring_size,
    event,
    diamond_stock_no,
    textEngraving,
    font_style
  ) => {
    if (!ring_size) {
      document.getElementById("error-message").innerText =
        "Please select the ring size.";
      event.preventDefault(); // Prevent the default action (navigation)
      return; // Exit the function
    }
    const newItem = {
      product_type: product_type,
      ring_data,
      ring_img,
      ring_color,
      ring_price,
      gemstone,
      ring_size,
      qty: 1,
      diamond_original: diamond_original,
      uniqueId: uuidv4(),
      textEngraving,
      font_style,
      ring_type: diamond_original,
    };

    dispatch(addToCart(newItem));

    const formData = {
      user_id: userId,
      ring_price: ring_price,
      ring_id: ring_id,
      ring_color: ring_color,
      img_sku: ring_img,
      gemstone_id: gemstone.stock_num,
      gemstone_price: gemstone.total_sales_price,
      product_type: ring_gemstone,
      ring_size: ring_size,
      gemstone_stock_num: gemstone.id,
    };

    secureLocalStorage.setItem("cart_data", JSON.stringify(formData) || []);
    const a = secureLocalStorage.getItem("cart_data");

    setFormData(a);
    var newAPI = `${baseUrl}/cart?user_id=${formData.user_id}&ring_price=${formData.ring_price}&ring_id=${formData.ring_id}&ring_color=${formData.ring_color}&gemstone_id=${formData.gemstone_id}&gemstone_stock_no=${formData.gemstone_stock_num}&gemstone_price=${formData.gemstone_price}&img_sku=${formData.img_sku}&product_type=${formData.product_type}&ring_size=${formData.ring_size}&ring_type=${diamond_original}${textEngraving ? `&engraving=${textEngraving}`: ""}${font_style ? `&font=${font_style}`:""}`;

    axios
      .get(
        newAPI
      )
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



  // ===========
  const [ringPrice, setRingPrice] = useState({});

  useEffect(() => {
    // Update active price when productColor changes
    switch (productColor) {
      case "18k-white-gold":
        setRingPrice(filterData.product?.white_gold_price);
        break;
      case "18k-yellow-gold":
        setRingPrice(filterData.product?.yellow_gold_price);
        break;
      case "18k-rose-gold":
        setRingPrice(filterData.product?.rose_gold_price);
        break;
      case "platinum":
        setRingPrice(filterData.product?.platinum_price);
        break;
      default:
        setRingPrice(0);
    }
  });

  
  useMemo(() => {
    const fetchData = () => {
      const removeWish = `${baseUrl}/remove_wishlist_item/${removeWishList}`;

      axios
        .get(removeWish)
        .then((res) => {
          dispatch(productList());
        })
        .catch((error) => {
          console.log("remove_wishlist_item API Error:", error);
        });
    };

    const debouncedFetchData = debounce(fetchData, 50); // Adjust delay as needed (in milliseconds)

    if (removeWishList !== null) {
      debouncedFetchData();
    }

    return () => debouncedFetchData.cancel(); // Cleanup
  }, [removeWishList]);

  function handleWishlistRemove(belowItem, diamondItem) {
    wishlist.map((item) => {
      if (diamondItem?.id === item.diamond?.id) {
        dispatch(removeToWishlist(item));
        
      }
    });
    wishListDataBase?.forEach((item) => {
      if (belowItem?.id === item?.ring_id) {
      
        setRemoveWishList(item?.id);
      }
    });
  }
  const wishlist = useSelector((state) => state.wishlistData);
 

  // wish list page
  const handleWishlist = async (
    productType,
    item,
    diamond,
    diamondItem,
    ringPrice,
    ring_id,
    productColor,
    img_sku,
    gemstone_id,
    gemstone_price,
    userId,
    ring_size,
    gemstone_stock_num,
    textEngraving,
    font_style
  ) => {
    const removingItem = {
      ringPrice: ringPrice,
      product_id: filterData.product?.id,
      ring_data: filterData.product,
      ring_img: filterData.imgUrl,
      ring_color: productColor,
      stock_num: diamondItem.stock_num,
      gemstone: diamondItem,
      totalSalesPrice: diamondItem.total_sales_price,
      uniqueId: uuidv4(),
    };

    const newItem = {
      item,
      diamond,
      removingItem: removingItem,
      product_type: productType,
      ring_size: ring_size,
      ring_type: diamond_original,
      uniqueId: uuidv4(),
      textEngraving,
      font_style,
      ring_price: ringPrice,
      img_sku,
      ring_color : productColor,
    };
    dispatch(addToWishlist(newItem));
    // setDiamondRingToggle((prevState) => ({
    //   ...prevState,
    //   [diamondItem?.id]: true,
    // }));
    // setDiamondRingLocal([...diamondRingLocal, newItem]);

    const formData = {
      user_id: userId,
      product_type: productType,
      ring_id: ring_id,
      ring_color: productColor,
      ring_price: ringPrice,
      img_sku: img_sku,
      gemstone_id: gemstone_id,
      gemstone_price: gemstone_price,
      ring_size: ring_size,
      gemstone_stock_num: gemstone_stock_num,
    };

   

    const gem_URL = `${baseUrl}/add_to_wishlist?user_id=${formData.user_id}&ring_price=${formData.ring_price}&ring_id=${formData.ring_id}&ring_color=${formData.ring_color}&product_type=${formData.product_type}&img_sku=${formData.img_sku}&gemstone_price=${formData.gemstone_price}&gemstone_id=${formData.gemstone_id}&ring_type=${diamond_original}&ring_size=${formData.ring_size}&gemstone_stock_no=${formData.gemstone_stock_num}${textEngraving ? `&engraving=${textEngraving}`: ""}${font_style ? `&font=${font_style}`:""}`;

    axios
      .get(
        gem_URL
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


  // ============ price  lab_grown =======================//
  const [metalColorShow, setMetalColorShow] = useState("white");
  useEffect(() => {
    switch (listColor) {
      case "18k-white-gold":
        setMetalColorShow("white");
        break;
      case "18k-yellow-gold":
        setMetalColorShow("yellow");
        break;
      case "18k-rose-gold":
        setMetalColorShow("rose");
        break;
      case "platinum":
        setMetalColorShow("white");
        break;
      default:
        setMetalColorShow("white");
        break;
    }
  }, [listColor]);
  
  useEffect(() => {
    axios
      .get(
        `${baseUrl}/get_product_price?product_sku=${
          filterData.product?.sku
        }&metalType=${
          listColor === "platinum" ? "platinum" : "18kt"
        }&metalColor=${metalColorShow}&diamond_type=${diamond_original}`
      )

      .then((response) => {
        if (response.status === 200) {
         
          setLabGrownDetails(response.data.data);
        } else {
          console.error("Error Status:", response.status);
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  }, [
    filterData.product?.sku,
    metalColorShow,
    filterData.product?.metalColor,
    diamond_original,
    listColor
  ]);


  

  const navigate = useRouter();
  const { setHelpData } = useData();

  const handleClick = (diamond) => {
    secureLocalStorage.setItem(
      "helpData",
      JSON.stringify({
        filterData: filterData,
        listColor: listColor,
        diamond: diamond,
        diamond_origin: diamond_original,
        ring_size : ring_size,
      })
    );
    setHelpData({
      filterData: filterData,
      listColor: listColor,
      diamond: diamond,
      diamond_origin: diamond_original,
      ring_size : ring_size,
    });
    navigate("/help");
  };


  let wishlistIds = [];
  wishListDataBase.map((item) => {
    wishlistIds.push({
      gemstone_stock_no: parseInt(item.gemstone_stock_no),
      ring_id: parseInt(item.ring_id),
    });
  });

  let beforeLoginWishlistIds = [];
  wishlist.map((item) => {
    beforeLoginWishlistIds.push({
      gemstone_id: parseInt(item.diamond?.id),
      ring_id: parseInt(item.item?.id),
    });
  });

  const [ringSize, setRingSize] = useState(false);
  useEffect(() => {
    if (ringSize) {
      document.body.classList.add("email-popup-open");
    } else {
      document.body.classList.remove("email-popup-open");
    }
  }, [ringSize]);
  const togglePopup = () => {
    setRingSize(!ringSize);
    document.body.classList.toggle("email-popup-open", ringSize);
  };

  // ============ meta tag  =======================//
  const currentUrl = window.location.href;
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment);
  const mainCategory = pathSegments[0] || "";

  //Date
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.toLocaleString("default", {
    month: "long",
  });

  const currentDay = currentDate.getDate();
  const currentFinalDate = new Date(currentDate);
  currentFinalDate.setDate(
    currentFinalDate.getDate() + parseInt(filterData.product?.shippingDay)
  );
  const formattedDate = currentFinalDate.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const handleError =(e)=>{
    e.target.onerror = null;
    e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
  }
 return (
   <>
        {/* <MetaTagCategoryPage mainCategory={mainCategory}  currentUrl={currentUrl}/> */}
    
    <div className="sticky-right-column final-ring">
      <div className="container">
        {data.map((diamondItem, key) => {
          return (
            <>
              {/* ====================create your ring start */}
              <div className="main-arrow-heading" key={diamondItem.id}>
              <Tabbing stock_num={stock_num} ringName={"2. Choose Rings"} ringLink={"/engagement-rings/start-with-a-setting"} gemStoneName={"1. Choose Gemstone"}  gemStoneLink={"/engagement-rings/start-with-a-gemstone"} type="gem-final"/>
              
              </div>
              {/* ====================create your ring end */}
              <div className="sticky-inner-main">
                <div className="left-product-images">
                  <ul className="product-list">
                    <li
                      className={
                        productColor === white ? "active" : "displayed"
                      }
                    >
                      <InnerImageZoom  width="auto"  height="auto" 
                        src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.jpg`}
                        imgAttributes={{alt: filterData.product?.name, onError:handleError}}
                      />
                    </li>
                    <li
                      className={
                        productColor === yellow ? "active" : "displayed"
                      }
                    >
                      <InnerImageZoom  width="auto"  height="auto" 
                        src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.alt.jpg`}
                        imgAttributes={{alt: filterData.product?.name, onError:handleError}}
                      />
                    </li>
                    <li
                      className={productColor === rose ? "active" : "displayed"}
                    >
                      <InnerImageZoom  width="auto"  height="auto" 
                        src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.alt1.jpg`}
                        imgAttributes={{alt: filterData.product?.name, onError:handleError}}
                      />
                    </li>
                    <li
                      className={
                        productColor === platinum ? "active" : "displayed"
                      }
                    >
                      <InnerImageZoom  width="auto"  height="auto" 
                        src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.jpg`}
                        imgAttributes={{alt: filterData.product?.name, onError:handleError}}
                      />
                    </li>
                    <li>
                      <InnerImageZoom  width="auto"  height="auto"  src={diamondItem.image_url} imgAttributes={{alt: diamondItem?.short_title,  onError:handleError}} />
                    </li>

                    
                  </ul>
                </div>
                <div className="right-product-content">
                  <h4 className="heading-four border-botttom">
                    Your One-of-a-Kind Ring
                  </h4>
                  <div className="seleted-items-purchage">
                    <div className="selected-inner-pair">
                      <div className="left-icon-image">
                        <img
                          src={`${imgAssetsUrl}/frontend/images/BlackRing.png`}
                          alt="Ring Icon"
                          width="auto"
                          height="auto"
                          onError={handleError}
                        />
                      </div>
                      <div className="right-purchage-icon-content">
                        <p>
                          {productColor?.replace(/-/g, " ")} {filterData.product?.name}
                        </p>
                        <p>
                          <span className="star-icons">
                            {" "}
                            <span>
                              {" "}
                              <IoStar />
                              <IoStar />
                              <IoStar />
                              <IoStar />
                              <IoStar />
                            </span>{" "}
                            <span>(89)</span>{" "}
                          </span>
                        </p>
                        <div className="name-price">
                          <div>
                            {/* <span>{filterData.product?.name}</span> */}
                          </div>

                          {diamond_original == "lab_grown" ? (
                            <div className={`price-tabbing-common `}>
                              <span>
                                {" "}
                                $
                                {
                                  Math.round(labGrownDetails?.price)}{" "}
                              </span>
                            </div>
                          ) : (
                            <div>
                              <div
                                className={`price-common price-tabbing-common ${
                                  productColor === white ? "active" : ""
                                }`}
                              >
                                <span>
                                  {" "}
                                  $
                                  {
                                    Math.round(
                                      filterData.product?.white_gold_price)}{" "}
                                </span>
                              </div>
                              <div
                                className={`price-common price-tabbing-common ${
                                  productColor === yellow ? "active" : ""
                                }`}
                              >
                                <span>
                                  {" "}
                                  $
                                  {
                                    Math.round(
                                      filterData.product?.yellow_gold_price)}{" "}
                                </span>
                              </div>
                              <div
                                className={`price-common price-tabbing-common ${
                                  productColor === rose ? "active" : ""
                                }`}
                              >
                                <span>
                                  {" "}
                                  $
                                  {
                                    Math.round(
                                      filterData.product?.rose_gold_price)}{" "}
                                </span>
                              </div>

                              <div
                                className={`price-common price-tabbing-common ${
                                  productColor === platinum ? "active" : ""
                                }`}
                              >
                                <span>
                                  {" "}
                                  $
                                  {
                                    Math.round(
                                      filterData.product?.platinum_price)}{" "}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="selected-inner-pair caret-rounded">
                      <div className="left-icon-image">
                        <img
                          src={`${imgAssetsUrl}/frontend/images/spark.png`}
                          alt="Diamond Icon"
                          width="auto"
                          height="auto"
                          onError={handleError}
                        />
                      </div>
                      <div className="right-purchage-icon-content">
                        <p>
                          <span>{diamondItem.short_title}</span>
                        </p>
                        <p>
                          <span>{diamondItem.gem_type}</span>
                        </p>
                        <span>
                          {" "}
                          $
                          {
                            Math.round(diamondItem.total_sales_price)}{" "}
                        </span>
                      </div>
                    </div>

                    <div className="setting-price-main">
                      {diamond_original == "lab_grown" ? (
                        <div className={`price-tabbing-common `}>
                          $
                          {Math.round(
                            parseFloat(labGrownDetails?.price) +
                            parseFloat(diamondItem?.total_sales_price)
                          )}
                        </div>
                      ) : (
                        <div className="setting-only-price">
                          <div
                            className={`price-common price-tabbing-common ${
                              productColor === white ? "active" : ""
                            }`}
                          >
                            <span>
                              $
                              {Math.round(
                                parseFloat(
                                  filterData.product?.white_gold_price
                                ) +
                                parseFloat(diamondItem?.total_sales_price)
                              )}
                            </span>
                          </div>
                          <div
                            className={`price-common price-tabbing-common ${
                              productColor === yellow ? "active" : ""
                            }`}
                          >
                            <span>
                              $
                              {Math.round(
                                parseFloat(
                                  filterData.product?.yellow_gold_price
                                ) +
                                parseFloat(diamondItem.total_sales_price)
                              )}{" "}
                            </span>
                          </div>
                          <div
                            className={`price-common price-tabbing-common ${
                              productColor === rose ? "active" : ""
                            }`}
                          >
                            <span>
                              {" "}
                              $
                              {Math.round(
                                parseFloat(
                                  filterData.product?.rose_gold_price
                                ) +
                                parseFloat(diamondItem.total_sales_price) 
                              )}{" "}
                            </span>
                          </div>

                          <div
                            className={`price-common price-tabbing-common ${
                              productColor === platinum ? "active" : ""
                            }`}
                          >
                            <span>
                              {" "}
                              $
                              {(
                                parseFloat(filterData.product?.platinum_price) +
                                parseFloat(diamondItem.total_sales_price)
                              )}{" "}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="selected-inner-pair caret-rounded">
                      <div className="left-icon-image">
                        <img
                          src={`${imgAssetsUrl}/frontend/images/BlackRing.png`}
                          alt="Ring Icon"
                          width="auto"
                          height="auto"
                          onError= {handleError}
                        />
                      </div>
                      <div className="right-purchage-icon-content">
                        <h4 className="media-heading">ENDS SOON!</h4>
                        <p className="media-text">
                          Lab Diamond Studs With Purchase Over $1,000. Surprise
                          Earrings With All Other Purchases.
                        </p>
                      </div>
                    </div>
                    <div className="purchage-select-box">
                      
                      <div className="add-to-cart">
                        <Link
                        
                          href={"/cart"}
                          onClick={(e) => {
                           
                            handleCreateAccount(
                              productType,
                              diamond_original === "lab_grown"
                                ? labGrownDetails?.price
                                : ringPrice,
                              filterData.product?.id,
                              filterData.product,
                              filterData.imgUrl,
                              productColor,
                              diamondItem.stock_num,
                              diamondItem,
                              diamondItem.total_sales_price,
                              userId ? userId : null,
                              "ring_gemstone",
                              ring_size,
                              labGrownDetails?.diamond_type,
                              diamondItem.id,
                              textEngraving,
                              font_style
                            );
                          }}
                        >
                          Add to bag
                        </Link>
                        <span className="heart-toggle-class">
                          <Link href="javascript:void(0);">
                            {" "}
                            {userId ? (
                              wishlistIds.some(
                                (item) =>
                                  filterData?.product?.id === item.ring_id &&
                                  diamondItem?.id === item?.gemstone_stock_no
                              ) ? (
                                <IoMdHeart
                                  onClick={() =>
                                    handleWishlistRemove(
                                      filterData.product,
                                      diamondData
                                    )
                                  }
                                />
                              ) : (
                                <CiHeart
                                  onClick={() => {
                                    // if (!selectedOption) {
                                    //   document.getElementById(
                                    //     "error-message"
                                    //   ).innerText =
                                    //     "Please select the ring size.";
                                    //   return;
                                    // } else {
                                    handleWishlist(
                                      productType,
                                      filterData.product,
                                      diamondData,
                                      diamondItem,
                                      diamond_original === "lab_grown"
                                          ? labGrownDetails?.price
                                          : productColor === white
                                          ? filterData.product?.white_gold_price
                                          : productColor === yellow
                                          ? filterData.product?.yellow_gold_price
                                          : productColor === rose
                                          ? filterData.product?.rose_gold_price
                                          : filterData.product?.platinum_price,
                                      filterData.product?.id,
                                      productColor,
                                      filterData.imgUrl,
                                      diamondItem.stock_num,
                                      diamondItem.total_sales_price,
                                      userId,
                                      ring_size,
                                      diamondItem?.id,
                                      textEngraving,
                                      font_style
                                    );
                                    // }
                                  }}
                                />
                              )
                            ) : beforeLoginWishlistIds.some(
                                (item) =>
                                  filterData?.product?.id === item?.ring_id &&
                                  diamondItem?.id === item?.gemstone_id
                              ) ? (
                              <IoMdHeart
                                onClick={() =>
                                  handleWishlistRemove(
                                    filterData.product,
                                    diamondData
                                  )
                                }
                              />
                            ) : (
                              <CiHeart
                                onClick={() => {
                                  // if (!selectedOption) {
                                  //   document.getElementById(
                                  //     "error-message"
                                  //   ).innerText =
                                  //     "Please select the ring size.";
                                  //   return;
                                  // } else {
                                  handleWishlist(
                                    productType,
                                    filterData.product,
                                    diamondData,
                                    diamondItem,
                                    diamond_original === "lab_grown"
                                          ? labGrownDetails?.price
                                          : productColor === white
                                          ? filterData.product?.white_gold_price
                                          : productColor === yellow
                                          ? filterData.product?.yellow_gold_price
                                          : productColor === rose
                                          ? filterData.product?.rose_gold_price
                                          : filterData.product?.platinum_price,
                                    filterData.product?.id,
                                    productColor,
                                    filterData.imgUrl,
                                    diamondItem.stock_num,
                                    diamondItem.total_sales_price,
                                    userId,
                                    ring_size,
                                    diamondItem?.id,
                                    textEngraving,
                                    font_style
                                  );
                                  // }
                                }}
                              />
                            )}
                          </Link>
                        </span>
                      </div>
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
                          Order now and your order ships by {currentMonth}{" "}
                          {currentDay}, {currentYear}, {formattedDate} depending on center diamond.
                        </p>
                      </div>
                    </div>
                    <div className="social-icons">
                      <ul>
                        <li>
                          <Link href="javascript:void(0);">
                            <Popup
                              trigger={
                                <Link href="javascript:void(0);">
                                  <MdMarkEmailRead /> Drop Hint
                                </Link>
                              }
                              open={open}
                              closeOnDocumentClick
                              onOpen={() => setOpen(true)}
                              onClose={() => setOpen(false)}
                              position="center"
                            >
                              <DropHint
                                setOpen={setOpen}
                                filterData={filterData}
                                diamondItem={diamondItem}
                                productColor={productColor}
                              />
                            </Popup>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/help"
                            onClick={() => handleClick(diamondItem)}
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
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
    </>
  );
};
