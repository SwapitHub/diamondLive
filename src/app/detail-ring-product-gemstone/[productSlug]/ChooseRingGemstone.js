"use client";
import { DropHint } from "@/app/_componentStatic/DropHint";
import LoaderSpinner from "@/app/_componentStatic/LoaderSpinner";
import NewsLetter from "@/app/_componentStatic/NewsLetter";
import { Tabbing } from "@/app/_componentStatic/Tabbing";
import { useData } from "@/app/context/DataContext";
import { UserContext } from "@/app/context/UserContext";
import { Select } from "antd";
import axios from "axios";
import debounce from "lodash.debounce";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { BiDownArrow, BiSolidPhoneCall, BiUpArrow } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdEmail, MdMarkEmailRead } from "react-icons/md";
import { RiTruckLine } from "react-icons/ri";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-medium-image-zoom/dist/styles.css";
import { useDispatch, useSelector } from "react-redux";
import secureLocalStorage from "react-secure-storage";
import Slider from "react-slick";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { v4 as uuidv4 } from "uuid";
import { addToWishlist, removeToWishlist } from "../../../../store/actions/wishlistAction";
import { RingSizeChart } from "@/app/_componentStatic/RingSizeChart";
import { productList } from "../../../../store/actions/productActions";

export default function ChooseRingGemstone({
  filterData,
  diamondData,
  listColor,
  shapeData,
  fontStyleOptions,
}) {
  const history = useRouter(); // Call useHistory at the top level of the component
  const [urlColor, setUrlColor] = useState("");
  var { productSlug } = useParams();
  const queryParams = useSearchParams();
  const stock_num = queryParams.get("stock_num");
  const diamond_original = queryParams.get("diamond_original");

  // find url area
  const { baseUrl, imgBaseUrl, imgAssetsUrl } = useContext(UserContext);
  const white = "18k-white-gold";
  const yellow = "18k-yellow-gold";
  const rose = "18k-rose-gold";
  const platinum = "platinum";

  const [altColor, setAltColor] = useState();

  useEffect(() => {
    // Update URL color when listColor changes
    if (listColor === white) {
      setUrlColor("white");
      setAltColor("");
    } else if (listColor === yellow) {
      setUrlColor("yellow");
      setAltColor("alt");
    } else if (listColor === rose) {
      setUrlColor("rose");
      setAltColor("alt1");
    } else if (listColor === platinum) {
      setUrlColor("white");
      setAltColor("");
    }
  }, [listColor]);

  const user_id = secureLocalStorage.getItem("formData");
  const [open, setOpen] = useState(false);
  const [changeOver, setChangeOver] = useState(null);
  const [changeClick, setChangeClick] = useState(listColor);
  const [shapeProduct, setShapeProduct] = useState();
  const [selected, setSelected] = useState(null);
  const [selected_2, setSelected_2] = useState(null);
  const [selected_3, setSelected_3] = useState(null);
  const [getPrice, setGetPrice] = useState();
  const [variantSlug, setVariantSlug] = useState();
  const [removeWishList, setRemoveWishList] = useState();
  const [shapeItemId, setShapeItemId] = useState();
  const [diamondTypeClick, setDiamondTypeClick] = useState("natural");

  useEffect(() => {
    if (diamond_original) {
      secureLocalStorage.setItem("diamond_type_ring", diamond_original);
    }
  }, [diamond_original]);
  useEffect(() => {
    const diamondType = secureLocalStorage.getItem("diamond_type_ring");

    if (diamondType) {
      setDiamondTypeClick(diamondType);
    } else if (diamond_original) {
      setDiamondTypeClick(diamond_original);
    }
  }, [diamondTypeClick, diamond_original]);

  const [diamondTypeColr, setDiamondTypeColor] = useState("18kt");
  const [diamondType, setDiamondType] = useState();
  const resultdiamondType = diamondType?.diamondQuality?.split(/\s*,\s*/);
  const [diamondTypeByDefault, setDiamondTypeByDefault] = useState();
  const resultdiamondTypeByDefault =
    diamondTypeByDefault?.diamondQuality?.split(/\s*,\s*/);

  const [ringSize, setRingSize] = useState(false);
  const [typeOfRing, setTypeOfRing] = useState(false);
  useEffect(() => {
    if (ringSize || typeOfRing) {
      document.body.classList.add("email-popup-open");
    } else {
      document.body.classList.remove("email-popup-open");
    }
  }, [ringSize, typeOfRing]);

  const togglePopupRingType = () => {
    setTypeOfRing(!typeOfRing);
    document.body.classList.toggle("email-popup-open", typeOfRing);
  };
  const togglePopup = () => {
    setRingSize(!ringSize);
    document.body.classList.toggle("email-popup-open", ringSize);
  };
  var globalProductImages = [];

  const [similarProducts, setSimilarProducts] = useState([]);

  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlistData);
  const wishListDataBase = useSelector((state) => state.productDataWishlist);

  const handleWishlist = async (
    item,
    product_type,
    user_id,
    ring_id,
    ring_color,
    img_sku,
    ring_price,
    textEngraving,
    selectedFontStyleOption,
    ring_size
  ) => {
    try {
      const newItem = {
        item,
        ring_color,
        ring_price,
        product_type,
        uniqueId: uuidv4(),
        textEngraving,
        font_style: selectedFontStyleOption,
        ring_type: diamondTypeClick,
        ring_size,
        img_sku,
      };
      dispatch(addToWishlist(newItem));

      // Construct URL for API call
      const apiUrl = `${baseUrl}/add_to_wishlist?user_id=${user_id}&product_type=${product_type}&ring_id=${ring_id}&ring_color=${ring_color}&img_sku=${img_sku}&ring_price=${ring_price}&ring_type=${diamondTypeClick}${
        textEngraving ? `&engraving=${textEngraving}` : ""
      }${
        selectedFontStyleOption ? `&font=${selectedFontStyleOption}` : ""
      }&ring_size=${ring_size}`;
      // Make API call
      const response = await axios.get(apiUrl, {});

      if (response.status === 200) {
        // setWishListId(response.data.data);
        dispatch(productList());
      } else {
        console.error(
          "Error adding item to wishlist. Status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleWishlistBand = async (
    ring_price,
    ring_id,
    ring_data,
    ring_img,
    ring_color,
    userId,
    product_type,
    ring_type
  ) => {
    try {
      const newItem = {
        ring_price,
        ring_id,
        ring: ring_data,
        ring_img,
        ring_color,
        userId,
        product_type,
        ring_type,
        uniqueId: uuidv4(),
      };
      dispatch(addToWishlist(newItem));

      const apiUrl = `${baseUrl}/add_to_wishlist?user_id=${user_id}&product_type=${product_type}&ring_id=${ring_id}&ring_color=${ring_color}&img_sku=${ring_img}&ring_price=${ring_price}&ring_type=${ring_type}`;
      // Make API call
      const response = await axios.get(apiUrl, {});

      if (response.status === 200) {
        // setWishListId(response.data.data);
        dispatch(productList());
      } else {
        console.error(
          "Error adding item to wishlist. Status:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  function handleWishlistRemove(belowItem) {
    wishlist.map((item) => {
      if (belowItem?.id === item.item?.id || belowItem.id === item.ring_id) {
        dispatch(removeToWishlist(item));
      }
    });

    const keys = Object.keys(wishListDataBase);
    keys.forEach((key) => {
      const item = wishListDataBase[key];
      if (belowItem?.id === item?.ring_id || belowItem.id === item.ring_id) {
        setRemoveWishList(item?.id);
      }
    });
  }

  useEffect(() => {
    if (open) {
      document.body.classList.add("popup-open");
    } else {
      document.body.classList.remove("popup-open");
    }
  }, [open]);

  useMemo(() => {
    axios
      .get(
        `${baseUrl}/get_product_price?product_id=${
          filterData.product?.id
        }&metalType=${
          listColor === "platinum" ? "Platinum" : "18kt"
        }&metalColor=${urlColor}&diamond_type=${
          diamond_original ? diamond_original : diamondTypeClick
        }`
      )

      .then((response) => {
        if (response.status === 200) {
          setDiamondTypeColor(response.data.data);
          setDiamondTypeByDefault(response.data.data);
          setDiamondType(response.data.data);
          setChangeClick(listColor);
        } else {
          console.error("Error Status:", response.status);
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  }, [urlColor]);

  useEffect(() => {
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

  const DetailsRecommended = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };
  // =====

  // hover change carate color
  const [changePriceColor, setChangePriceColor] = useState([]);
  function changeBackground(color) {
    setChangePriceColor(color);
  }

  // =============

  // var imgUrl = url.split("/").slice(-1).join().split(".").shift();
  const [diamondColor, setDiamondColor] = useState();
  const onChangeOver = (colorName) => {
    setChangeOver(colorName);
  };
  const [iconVideoColor, setIconVideoColor] = useState();
  const onChangeClick = (
    productSku,
    ProductMetalColor,
    productType,
    diamond_type,
    colorName,
    getPrice,
    diamondColor,
    svgIconVideoColor
  ) => {
    setChangeClick(colorName);
    setGetPrice(getPrice);
    setDiamondColor(diamondColor);
    setIconVideoColor(svgIconVideoColor);
    if (svgIconVideoColor) {
      setShapeItemId();
    }
    axios
      .get(
        `${baseUrl}/get_product_price?product_id=${productSku}&metalType=${productType}&metalColor=${diamondColor}&diamond_type=${diamond_type}`
      )

      .then((response) => {
        if (response.status === 200) {
          setDiamondTypeColor(response.data.data);
          // onChangeClickNature(
          //   productSku,
          //   ProductMetalColor,
          //   productType,
          //   diamond_type,
          //   diamondColor
          // );
        } else {
          console.error("Error Status:", response.status);
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      });
    const searchParams = new URLSearchParams(queryParams);
    searchParams.set("color", colorName);
    const newSearchString = searchParams.toString();

    const newURL = `${`/detail-ring-product-gemstone/${variantSlug}`}?${newSearchString}`;
    history.replace(newURL);
  };

  // nature and lab-grown

  const [diamondOrigin, setDiamondOrigin] = useState();
  const handleDiamondOriginHover = (origin) => {
    setDiamondOrigin(origin);
  };

  const onChangeClickNature = (
    productSku,
    ProductMetalColor,
    productType,
    diamond_type
  ) => {
    axios
      .get(
        `${baseUrl}/get_product_price?product_id=${productSku}&metalType=${productType}&metalColor=${
          diamondColor ? diamondColor : urlColor
        }&diamond_type=${diamond_type}`
      )

      .then((response) => {
        if (response.status === 200) {
          setDiamondType(response.data.data);
          setDiamondTypeClick(response.data.data);
        } else {
          console.error("Error Status:", response.status);
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      });

    secureLocalStorage.setItem("diamond_type_ring", diamond_type);
  };

  // nature and lab-grown end

  // ============= shape api
  const [changeOverShape, setChangeOverShape] = useState();

  const onChangeOverShape = (shapeNameItem) => {
    setChangeOverShape(shapeNameItem || "");
  };

  const [shapeNameSelected, setShapeNameSelected] = useState("N/A");
  const shapeOnclick = (shape, shapeName) => {
    setShapeProduct((prevState) => (prevState === shape ? "" : shape));
    setShapeNameSelected((prevState) =>
      prevState === shapeName ? "N/A" : shapeName
    );
  };

  // faq details page
  var index = 1;
  var index_2 = 2;
  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };
  const toggle_2 = (i) => {
    if (selected_2 === i) {
      return setSelected_2(null);
    }
    setSelected_2(i);
  };
  const toggleBridal = (i) => {
    if (selected_3 === i) {
      return setSelected_3(null);
    }
    setSelected_3(i);
  };

  // ===========
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

  const [changeOverVariation, setChangeOverVariation] = useState();

  const onChangeOverVariation = (fraction) => {
    setChangeOverVariation(fraction);
  };

  // variant start here
  const handleVariation = (variantSlug) => {
    const searchParams = new URLSearchParams(queryParams);

    const newSearchString = searchParams.toString();

    const newURL = `${`/detail-ring-product-gemstone/${variantSlug}`}?${newSearchString}`;
    history.replace(newURL);
    setVariantSlug(variantSlug);

    secureLocalStorage.setItem("totalCaratWeight", variantSlug);
  };

  useEffect(() => {
    secureLocalStorage.setItem("totalCaratWeight", productSlug);
  }, [productSlug]);

  useEffect(() => {
    const totalCaratWeight = secureLocalStorage.getItem("totalCaratWeight");
    if (totalCaratWeight) {
      const searchParams = new URLSearchParams(queryParams);
      const newSearchString = searchParams.toString();

      const newURL = `${`/detail-ring-product-gemstone/${productSlug}`}?${newSearchString}`;
      history.replace(newURL);
      setVariantSlug(totalCaratWeight);
    }
  }, [productSlug]);

  const [ftrIcon, setFtrIcon] = useState([]);
  useEffect(() => {
    axios
      .get(`${baseUrl}/siteinfo`)
      .then((res) => {
        setFtrIcon(res.data.data);
      })
      .catch(() => {
        console.log("API error");
      });
  }, []);

  const [FooterData, setFooterData] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/footer-pages`)
      .then((res) => {
        setFooterData(res.data.data);
      })
      .catch(() => {
        console.log("API error");
      });
  }, []);

  const router = useRouter();
  const { setHelpData } = useData();

  const handleClick = (diamond) => {
    secureLocalStorage.setItem(
      "helpData",
      JSON.stringify({
        filterData: filterData,
        listColor: listColor,
        diamond: diamond,
      })
    );
    setHelpData({
      filterData: filterData,
      listColor: listColor,
      diamond: diamond,
    });
    router.push("/help");
  };

  // ==============center stone
  const [centerStoneData, setCenterStoneData] = useState();
  const handleCenterStone = (centerStoneData) => {
    setCenterStoneData(centerStoneData);
  };
  const handleCenterStoneFull = () => {
    if (!selectedOption) {
      toast.error("Please select a ring size.", {
        position: "top-right",
      });
    }
  };

  // ==============center stone end

  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectSize = (options) => {
    setSelectedOption(options);
    document.getElementById("error-message").innerText = "";
  };
  const handleChooseRingSetting = (e) => {
    if (!selectedOption) {
      e.preventDefault();
      document.getElementById("error-message").innerText =
        "Please select a ring size.";
    }
  };

  const [selectedFontStyleOption, setSelectedFontStyleOption] = useState();
  const handleSelectFontStyle = (fontStyleOptions) => {
    setSelectedFontStyleOption(fontStyleOptions);
  };

  const [textEngraving, setTextEngraving] = useState();
  const onchangeEngraving = (event) => {
    setTextEngraving(event.target.value);
  };
  const options = [
    { value: "Less than 3", label: "Less than 3" },
    { value: "3", label: "3" },
    { value: "3 1/2", label: "3 1/2" },
    { value: "4", label: "4" },
    { value: "4 1/2", label: "4 1/2" },
    { value: "5", label: "5" },
    { value: "5 1/2", label: "5 1/2" },
    { value: "6", label: "6" },
    { value: "6 1/2", label: "6 1/2" },
    { value: "7", label: "7" },
    { value: "7 1/2", label: "7 1/2" },
    { value: "8", label: "8" },
    { value: "8 1/2", label: "8 1/2" },
    { value: "9", label: "9" },
    { value: "9 1/2", label: "9 1/2" },
    { value: "10", label: "10" },
    { value: "10 1/2", label: "10 1/2" },
    { value: "11", label: "11" },
    { value: "11 1/2", label: "11 /12" },
    { value: "12", label: "12" },
    { value: "Greater than 12", label: "Greater than 12" },
  ];

  let wishlistIds = [];
  wishListDataBase.map((item) => {
    wishlistIds.push(item.ring_id);
  });
  let beforeLoginWishlistIds = [];
  wishlist.map((item) => {
    beforeLoginWishlistIds.push(item.item?.id);
  });

  let bandWishlistIds = [];
  wishListDataBase.map((item) => {
    bandWishlistIds.push(item.ring_id);
  });
  let bandBeforeLoginWishlistIds = [];
  wishlist.map((item) => {
    bandBeforeLoginWishlistIds.push(item.ring_id);
  });

  const [thumbnailItem, setThumbnailItem] = useState();
  const onchangeThumbnail = (thumbItem) => {
    setThumbnailItem(thumbItem);
  };
  useEffect(() => {
    setThumbnailItem((prevItem) =>
      prevItem === thumbnailItem ? undefined : thumbnailItem
    );
  }, [shapeProduct, changeClick]);

  useEffect(() => {
    setIconVideoColor((prevItem) =>
      prevItem === iconVideoColor ? undefined : iconVideoColor
    );
  }, [thumbnailItem, shapeProduct]);

  const handleImgError = (event) => {
    const parentDiv = event.target.parentNode;
    if (parentDiv) {
      parentDiv.style.display = "none";
    }
  };
  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
  };
  return (
    <>
      {/* <MetaTagDetailsPage
        description={
          filterData?.product?.meta_description
            ? filterData?.product?.meta_description
            : filterData?.product?.description
        }
        keyword={filterData?.product?.meta_keyword}
        titleName={
          filterData?.product?.meta_title
            ? filterData?.product?.meta_title
            : filterData?.product?.name
        }
        image="https://d24ppbhzdyfrur.cloudfront.net/uploads/image_url/s3_image/36274429/1701007RubyCushion1_17ct_3932_77c52f06-f67b-4338-8cd9-abcd817c178c.jpg"
        currentUrl={currentUrl}
      /> */}

      <div
        className={`details-page container ${
          stock_num ? "diamond-bread-crumb-active" : null
        }`}
      >
        <div className="">
          <>
            {/* ====================create your ring start */}
            {/* ====================create your ring start */}
            {stock_num !== null ? (
              <Tabbing
                stock_num={stock_num}
                type="ring-gemstone"
                ringName={`2. Choose Rings`}
                ringLink={`/engagement-rings/start-with-a-setting`}
                diamondName={` 1. Choose Diamonds`}
                diamondLink={`/diamond/start-with-a-diamond/`}
                gemStoneName={`1. Choose Gemstones`}
                gemStoneLink={`/gemstones/start-with-a-gemstone`}
              />
            ) : (
              <>
                <div className="main-arrow-heading">
                  {/* ====================create your ring start */}
                  <Tabbing
                    type="ring"
                    ringName={`1. Choose Setting`}
                    ringLink={`javascript:void(0)`}
                    diamondName={` 2. Choose Diamonds`}
                    diamondLink={`/diamond/start-with-a-diamond/`}
                  />
                </div>
              </>
            )}
            {/* ====================create your ring end */}
            <div className="singleProduct">
              {!shapeData ? (
                <div className="loading-details">
                  <LoaderSpinner />
                </div>
              ) : (
                <>
                  {/* here use  iconVideoColor this is svg video this click only show active all video else click shapeProduct this is shape slider and here use also thumbnailItem*/}
                  <div className="singleProduct-img ">
                    {iconVideoColor ? (
                      <div className="details-videos">
                        <LazyLoadImage
                          width="auto"
                          height="auto"
                          src={`${imgBaseUrl}/${filterData.entity_id}/${
                            filterData.entity_id
                          }${
                            listColor === white || listColor === platinum
                              ? `.jpg`
                              : listColor === yellow
                              ? `.alt.jpg`
                              : listColor === rose && `.alt1.jpg`
                          }`}
                          alt={filterData.product?.name}
                          className="video-poster"
                          effect="blur"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                          }}
                        />
                        <video
                          className={`details-video-common 
    ${changeClick === white ? "active" : ""}
   
`}
                          src={filterData.product?.videos.white}
                          loop
                          autoPlay
                          muted
                          loading="lazy"
                          preload="none"
                          playsInline
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                          }}
                        ></video>

                        <video
                          className={`details-video-common 
${changeClick === yellow ? "active" : ""}

`}
                          src={filterData.product?.videos.yellow}
                          loop
                          autoPlay
                          muted
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                          }}
                        ></video>

                        <video
                          className={`details-video-common 
${changeClick === rose ? "active" : ""}

`}
                          src={filterData.product?.videos.rose}
                          loop
                          autoPlay
                          muted
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                          }}
                        ></video>

                        <video
                          className={`details-video-common 
    ${changeClick === platinum ? "active" : ""}
   
`}
                          src={filterData.product?.videos.white}
                          loop
                          autoPlay
                          muted
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                          }}
                        ></video>
                      </div>
                    ) : shapeProduct ? (
                      thumbnailItem || thumbnailItem?.isEmpty() ? (
                        <div className="details-videos-images-thumbnail">
                          {thumbnailItem === ".jpg" ? (
                            <InnerImageZoom
                              src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.jpg`}
                              imgAttributes={{
                                width: "auto",
                                height: "auto",
                                alt: filterData.product?.name,
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                              }}
                            />
                          ) : (
                            <InnerImageZoom
                              src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}${thumbnailItem}`}
                              imgAttributes={{
                                width: "auto",
                                height: "auto",
                                alt: filterData.product?.name,
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                              }}
                            />
                          )}
                        </div>
                      ) : (
                        <div className="all-images video-place-images details-videos">
                          <LazyLoadImage
                            width="auto"
                            height="auto"
                            src={`${imgBaseUrl}/${filterData.entity_id}/${
                              filterData.entity_id
                            }${
                              listColor === white || listColor === platinum
                                ? `.jpg`
                                : listColor === yellow
                                ? `.alt.jpg`
                                : listColor === rose && `.alt1.jpg`
                            }`}
                            alt={filterData.product?.name}
                            className="video-poster"
                            effect="blur"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                            }}
                          />
                          <div className="detail-images">
                            {/* common image white start */}
                            <div
                              className={`detail-images-common detail-images-default ${
                                changeClick === white ? "active" : ""
                              }`}
                            >
                              {/* =========heart yellow start */}
                              <div
                                className={`heart-shape-img default-img white-common ${
                                  shapeProduct === "he" ? "active" : ""
                                }`}
                              >
                                <div className={`heart-common he-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.he.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========heart white end */}

                              {/* =========radiant white start */}
                              <div
                                className={`radiant-shape-img default-img white-common ${
                                  shapeProduct === ".ra" ? "active" : ""
                                }`}
                              >
                                <div className={`radiant-common radiant-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.ra.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========radiant white end */}

                              {/* =========asscher white start */}
                              <div
                                className={`asscher-shape-img default-img white-common
     ${shapeProduct === "as" ? "active" : ""}`}
                              >
                                <div className={`asscher-common asscher-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.as.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========asscher white end */}

                              {/* =========marquise white start */}
                              <div
                                className={`marquise-shape-img default-img white-common ${
                                  shapeProduct === "mq" ? "active" : ""
                                }`}
                              >
                                <div
                                  className={`marquise-common marquise-set `}
                                >
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.mq.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========marquise white end */}

                              {/* =========emerald white start */}
                              <div
                                className={`emerald-shape-img default-img white-common ${
                                  shapeProduct === "em" ? "active" : ""
                                }`}
                              >
                                <div className={`emerald-common emerald-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.em.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========emerald white end */}
                              {/* =========Oval white start */}
                              <div
                                className={`Oval-shape-img default-img white-common ${
                                  shapeProduct === "ov" ? "active" : ""
                                }`}
                              >
                                <div className={`Oval-common Oval-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.ov.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========Oval white end */}
                              {/* =========Round white start */}
                              <div
                                className={`Round-shape-img default-img white-common ${
                                  shapeProduct === "rd" ? "active" : ""
                                }`}
                              >
                                <div className={`Round-common Round-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.rd.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========Round white end */}

                              {/* =========Cushion white start */}
                              <div
                                className={`Cushion-shape-img default-img white-common ${
                                  shapeProduct === "cu" ? "active" : ""
                                }`}
                              >
                                <div className={`Cushion-common Cushion-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.cu.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========Cushion white end */}

                              {/* =========Pear white start */}
                              <div
                                className={`Pear-shape-img default-img white-common ${
                                  shapeProduct === "pe" ? "active" : ""
                                }`}
                              >
                                <div className={`Pear-common Pear-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.pe.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========Pear white end */}
                            </div>
                            {/* common image white end */}

                            {/* common image yellow start */}
                            <div
                              className={`detail-images-common  detail-images-alt ${
                                changeClick === yellow ? "active" : ""
                              }`}
                            >
                              {/* =========heart yellow start */}
                              <div
                                className={`heart-shape-img default-img yellow-common ${
                                  shapeProduct === "he" ? "active" : ""
                                }`}
                              >
                                <div className={`heart-common he-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.he.set.alt.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========heart yellow end */}

                              {/* =========radiant yellow start */}
                              <div
                                className={`radiant-shape-img default-img yellow-common ${
                                  shapeProduct === ".ra" ? "active" : ""
                                }`}
                              >
                                <div className={`radiant-common radiant-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.ra.set.alt.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========radiant yellow end */}

                              {/* =========asscher yellow start */}
                              <div
                                className={`asscher-shape-img default-img yellow-common
     ${shapeProduct === "as" ? "active" : ""}`}
                              >
                                <div className={`asscher-common asscher-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.as.set.alt.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========asscher yellow end */}

                              {/* =========marquise yellow start */}
                              <div
                                className={`marquise-shape-img default-img yellow-common ${
                                  shapeProduct === "mq" ? "active" : ""
                                }`}
                              >
                                <div
                                  className={`marquise-common marquise-set `}
                                >
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.mq.set.alt.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========marquise yellow end */}

                              {/* =========emerald yellow start */}
                              <div
                                className={`emerald-shape-img default-img yellow-common ${
                                  shapeProduct === "em" ? "active" : ""
                                }`}
                              >
                                <div className={`emerald-common emerald-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.em.set.alt.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========emerald yellow end */}
                              {/* =========Oval yellow start */}
                              <div
                                className={`Oval-shape-img default-img yellow-common ${
                                  shapeProduct === "ov" ? "active" : ""
                                }`}
                              >
                                <div className={`Oval-common Oval-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.ov.set.alt.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========Oval yellow end */}
                              {/* =========Round yellow start */}
                              <div
                                className={`Round-shape-img default-img yellow-common ${
                                  shapeProduct === "rd" ? "active" : ""
                                }`}
                              >
                                <div className={`Round-common Round-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.rd.set.alt.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========Round yellow end */}

                              {/* =========Cushion yellow start */}
                              <div
                                className={`Cushion-shape-img default-img yellow-common ${
                                  shapeProduct === "cu" ? "active" : ""
                                }`}
                              >
                                <div className={`Cushion-common Cushion-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.cu.set.alt.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========Cushion yellow end */}

                              {/* =========Pear yellow start */}
                              <div
                                className={`Pear-shape-img default-img yellow-common ${
                                  shapeProduct === "pe" ? "active" : ""
                                }`}
                              >
                                <div className={`Pear-common Pear-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.pe.set.alt.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========Pear yellow end */}
                            </div>
                            {/* common image yellow end */}

                            {/* common image rose start */}
                            <div
                              className={`detail-images-common detail-images-alt1 ${
                                changeClick === rose ? "active" : ""
                              }`}
                            >
                              {/* =========heart rose start */}
                              <div
                                className={`heart-shape-img default-img rose-common ${
                                  shapeProduct === "he" ? "active" : ""
                                }`}
                              >
                                <div className={`heart-common he-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.he.set.alt1.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========heart rose end */}

                              {/* =========radiant rose start */}
                              <div
                                className={`radiant-shape-img default-img rose-common ${
                                  shapeProduct === ".ra" ? "active" : ""
                                }`}
                              >
                                <div className={`radiant-common radiant-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.ra.set.alt1.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========radiant rose end */}

                              {/* =========asscher rose start */}
                              <div
                                className={`asscher-shape-img default-img rose-common
     ${shapeProduct === "as" ? "active" : ""}`}
                              >
                                <div className={`asscher-common asscher-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.as.set.alt1.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========asscher rose end */}

                              {/* =========marquise rose start */}
                              <div
                                className={`marquise-shape-img default-img rose-common ${
                                  shapeProduct === "mq" ? "active" : ""
                                }`}
                              >
                                <div
                                  className={`marquise-common marquise-set `}
                                >
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.mq.set.alt1.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========marquise rose end */}

                              {/* =========emerald rose start */}
                              <div
                                className={`emerald-shape-img default-img rose-common ${
                                  shapeProduct === "em" ? "active" : ""
                                }`}
                              >
                                <div className={`emerald-common emerald-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.em.set.alt1.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========emerald rose end */}
                              {/* =========Oval rose start */}
                              <div
                                className={`Oval-shape-img default-img rose-common ${
                                  shapeProduct === "ov" ? "active" : ""
                                }`}
                              >
                                <div className={`Oval-common Oval-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.ov.set.alt1.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========Oval rose end */}
                              {/* =========Round rose start */}
                              <div
                                className={`Round-shape-img default-img rose-common ${
                                  shapeProduct === "rd" ? "active" : ""
                                }`}
                              >
                                <div className={`Round-common Round-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.rd.set.alt1.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========Round rose end */}

                              {/* =========Cushion rose start */}
                              <div
                                className={`Cushion-shape-img default-img rose-common ${
                                  shapeProduct === "cu" ? "active" : ""
                                }`}
                              >
                                <div className={`Cushion-common Cushion-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.cu.set.alt1.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========Cushion rose end */}

                              {/* =========Pear rose start */}
                              <div
                                className={`Pear-shape-img default-img rose-common ${
                                  shapeProduct === "pe" ? "active" : ""
                                }`}
                              >
                                <div className={`Pear-common Pear-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.pe.set.alt1.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========Pear rose end */}
                            </div>
                            {/* common image rose end */}
                            {/* common image platinum start */}
                            <div
                              className={`detail-images-common detail-images-default ${
                                changeClick === platinum ? "active" : ""
                              }`}
                            >
                              {/* =========heart platinum start */}
                              <div
                                className={`heart-shape-img default-img white-common ${
                                  shapeProduct === "he" ? "active" : ""
                                }`}
                              >
                                <div className={`heart-common he-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.he.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========heart platinum end */}

                              {/* =========radiant platinum start */}
                              <div
                                className={`radiant-shape-img default-img white-common ${
                                  shapeProduct === ".ra" ? "active" : ""
                                }`}
                              >
                                <div className={`radiant-common radiant-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.ra.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========radiant platinum end */}

                              {/* =========asscher platinum start */}
                              <div
                                className={`asscher-shape-img default-img white-common
     ${shapeProduct === "as" ? "active" : ""}`}
                              >
                                <div className={`asscher-common asscher-side `}>
                                  <img
                                    width="auto"
                                    height="auto"
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.as.side.jpg`}
                                    alt={filterData.product?.name}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                                <div className={`asscher-common asscher-set `}>
                                  <img
                                    width="auto"
                                    height="auto"
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.as.set.jpg`}
                                    alt={filterData.product?.name}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                                <div
                                  className={`asscher-common asscher-angle `}
                                >
                                  <img
                                    width="auto"
                                    height="auto"
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.as.angle.jpg`}
                                    alt={filterData.product?.name}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========asscher platinum end */}

                              {/* =========marquise platinum start */}
                              <div
                                className={`marquise-shape-img default-img white-common ${
                                  shapeProduct === "mq" ? "active" : ""
                                }`}
                              >
                                <div
                                  className={`marquise-common marquise-set `}
                                >
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.mq.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========marquise platinum end */}

                              {/* =========emerald platinum start */}
                              <div
                                className={`emerald-shape-img default-img white-common ${
                                  shapeProduct === "em" ? "active" : ""
                                }`}
                              >
                                <div className={`emerald-common emerald-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.em.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========emerald platinum end */}
                              {/* =========Oval platinum start */}
                              <div
                                className={`Oval-shape-img default-img white-common ${
                                  shapeProduct === "ov" ? "active" : ""
                                }`}
                              >
                                <div className={`Oval-common Oval-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.ov.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========Oval platinum end */}
                              {/* =========Round platinum start */}
                              <div
                                className={`Round-shape-img default-img white-common ${
                                  shapeProduct === "rd" ? "active" : ""
                                }`}
                              >
                                <div className={`Round-common Round-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.rd.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========Round platinum end */}

                              {/* =========Cushion platinum start */}
                              <div
                                className={`Cushion-shape-img default-img white-common ${
                                  shapeProduct === "cu" ? "active" : ""
                                }`}
                              >
                                <div className={`Cushion-common Cushion-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.cu.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========Cushion white end */}

                              {/* =========Pear white start */}
                              <div
                                className={`Pear-shape-img default-img white-common ${
                                  shapeProduct === "pe" ? "active" : ""
                                }`}
                              >
                                <div className={`Pear-common Pear-set `}>
                                  <InnerImageZoom
                                    src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.pe.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      alt: filterData.product?.name,
                                    }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                    }}
                                  />
                                </div>
                              </div>
                              {/* =========Pear platinum end */}
                            </div>
                            {/* common image platinum end */}
                          </div>
                        </div>
                      )
                    ) : thumbnailItem || thumbnailItem?.isEmpty() ? (
                      <div className="details-videos-images-thumbnail">
                        {thumbnailItem === ".jpg" ? (
                          <InnerImageZoom
                            src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}.jpg`}
                            imgAttributes={{
                              width: "auto",
                              height: "auto",
                              alt: filterData.product?.name,
                            }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                            }}
                          />
                        ) : (
                          <InnerImageZoom
                            src={`${imgBaseUrl}/${filterData.entity_id}/${filterData.entity_id}${thumbnailItem}`}
                            imgAttributes={{
                              width: "auto",
                              height: "auto",
                              alt: filterData.product?.name,
                            }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                            }}
                          />
                        )}
                      </div>
                    ) : (
                      <div className="details-videos">
                        <LazyLoadImage
                          width="auto"
                          height="auto"
                          src={`${imgBaseUrl}/${filterData.entity_id}/${
                            filterData.entity_id
                          }${
                            listColor === white || listColor === platinum
                              ? `.jpg`
                              : listColor === yellow
                              ? `.alt.jpg`
                              : listColor === rose && `.alt1.jpg`
                          }`}
                          alt={filterData.product?.name}
                          className="video-poster"
                          effect="blur"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                          }}
                        />
                        <video
                          className={`details-video-common 
                           ${changeClick === white ? "active" : ""}
                          
                       `}
                          src={filterData.product?.videos?.white}
                          loop
                          autoPlay
                          muted
                          loading="lazy"
                          preload="none"
                          playsInline
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                          }}
                        ></video>

                        <video
                          className={`details-video-common 
                       ${changeClick === yellow ? "active" : ""}
                      
                   `}
                          src={filterData.product?.videos?.yellow}
                          loop
                          autoPlay
                          muted
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                          }}
                        ></video>

                        <video
                          className={`details-video-common 
                       ${changeClick === rose ? "active" : ""}
                      
                   `}
                          src={filterData.product?.videos?.rose}
                          loop
                          autoPlay
                          muted
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                          }}
                        ></video>

                        <video
                          className={`details-video-common 
                           ${changeClick === platinum ? "active" : ""}
                          
                       `}
                          src={filterData.product?.videos?.white}
                          loop
                          autoPlay
                          muted
                          loading="lazy"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                          }}
                        ></video>
                      </div>
                    )}

                    <div className="all-images">
                      <div className="detail-images">
                        <div className="white default-img">
                          <div>
                            <img
                              src={`${imgBaseUrl}/${filterData.entity_id}/${
                                filterData.entity_id
                              }${
                                (changeClick === white ||
                                  changeClick === platinum) &&
                                shapeProduct
                                  ? `.${shapeProduct}.side.jpg`
                                  : changeClick === yellow && shapeProduct
                                  ? `.${shapeProduct}.side.alt.jpg`
                                  : changeClick === rose && shapeProduct
                                  ? `.${shapeProduct}.side.alt1.jpg`
                                  : changeClick === white
                                  ? ".jpg"
                                  : changeClick === yellow
                                  ? ".alt.jpg"
                                  : changeClick === rose
                                  ? ".alt1.jpg"
                                  : ".jpg"
                              }`}
                              alt={filterData.product?.name}
                              width="auto"
                              height="auto" 
                              onError={handleError}
                              onClick={() =>
                                onchangeThumbnail(
                                  (changeClick === white ||
                                    changeClick === platinum) &&
                                    shapeProduct
                                    ? `.${shapeProduct}.side.jpg`
                                    : changeClick === yellow && shapeProduct
                                    ? `.${shapeProduct}.side.alt.jpg`
                                    : changeClick === rose && shapeProduct
                                    ? `.${shapeProduct}.side.alt1.jpg`
                                    : changeClick === white
                                    ? ".jpg"
                                    : changeClick === yellow
                                    ? ".alt.jpg"
                                    : changeClick === rose
                                    ? ".alt1.jpg"
                                    : ".jpg"
                                )
                              }
                            />
                          </div>

                          <div>
                            <img
                              src={`${imgBaseUrl}/${filterData.entity_id}/${
                                filterData.entity_id
                              }${
                                (changeClick === white ||
                                  changeClick === platinum) &&
                                shapeProduct
                                  ? `.${shapeProduct}.set.jpg`
                                  : changeClick === yellow && shapeProduct
                                  ? `.${shapeProduct}.set.alt.jpg`
                                  : changeClick === rose && shapeProduct
                                  ? `.${shapeProduct}.set.alt1.jpg`
                                  : changeClick === white
                                  ? ".side.jpg"
                                  : changeClick === yellow
                                  ? ".side.alt.jpg"
                                  : changeClick === rose
                                  ? ".side.alt1.jpg"
                                  : ".side.jpg"
                              }`}
                              alt={filterData.product?.name}
                              width="auto"
                              height="auto" 
                              onError={handleError}
                              onClick={() =>
                                onchangeThumbnail(
                                  (changeClick === white ||
                                    changeClick === platinum) &&
                                    shapeProduct
                                    ? `.${shapeProduct}.set.jpg`
                                    : changeClick === yellow && shapeProduct
                                    ? `.${shapeProduct}.set.alt.jpg`
                                    : changeClick === rose && shapeProduct
                                    ? `.${shapeProduct}.set.alt1.jpg`
                                    : changeClick === white
                                    ? ".side.jpg"
                                    : changeClick === yellow
                                    ? ".side.alt.jpg"
                                    : changeClick === rose
                                    ? ".side.alt1.jpg"
                                    : ".side.jpg"
                                )
                              }
                            />
                          </div>

                          <div>
                            <img
                              src={`${imgBaseUrl}/${filterData.entity_id}/${
                                filterData.entity_id
                              }${
                                (changeClick === white ||
                                  changeClick === platinum) &&
                                shapeProduct
                                  ? `.${shapeProduct}.angle.jpg`
                                  : changeClick === yellow && shapeProduct
                                  ? `.${shapeProduct}.angle.alt.jpg`
                                  : changeClick === rose && shapeProduct
                                  ? `.${shapeProduct}.angle.alt1.jpg`
                                  : changeClick === white
                                  ? ".set.jpg"
                                  : changeClick === yellow
                                  ? ".set.alt.jpg"
                                  : changeClick === rose
                                  ? ".set.alt1.jpg"
                                  : ".set.jpg"
                              }`}
                              alt={filterData.product?.name}
                              width="auto"
                              height="auto" 
                              onError={handleError}
                              onClick={() =>
                                onchangeThumbnail(
                                  (changeClick === white ||
                                    changeClick === platinum) &&
                                    shapeProduct
                                    ? `.${shapeProduct}.angle.jpg`
                                    : changeClick === yellow && shapeProduct
                                    ? `.${shapeProduct}.angle.alt.jpg`
                                    : changeClick === rose && shapeProduct
                                    ? `.${shapeProduct}.angle.alt1.jpg`
                                    : changeClick === white
                                    ? ".set.jpg"
                                    : changeClick === yellow
                                    ? ".set.alt.jpg"
                                    : changeClick === rose
                                    ? ".set.alt1.jpg"
                                    : ".set.jpg"
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="main-svg-icon-video">
                        <div
                          className={`svg-video ${
                            changeClick === white ? "active" : ""
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onChangeClick(
                              filterData.product?.id,
                              filterData.product?.metalColor,
                              "18kt",
                              "natural",
                              white,
                              filterData.product?.white_gold_price,
                              "white",
                              "svgVideoWhite"
                            );
                          }}
                        >
                          <img
                            width="auto"
                            height="auto"
                            src="https://www.overnightmountings.com//js/videoplayer/images/rotatingnew.gif"
                            alt={filterData.product?.name}
                          />
                        </div>

                        <div
                          className={`svg-video ${
                            changeClick === yellow ? "active" : ""
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onChangeClick(
                              filterData.product?.id,
                              filterData.product?.metalColor,
                              "18kt",
                              "natural",

                              yellow,
                              filterData.product?.yellow_gold_price,
                              "yellow",
                              "svgVideoYellow"
                            );
                          }}
                        >
                          <img
                            width="auto"
                            height="auto"
                            src="https://www.overnightmountings.com//js/videoplayer/images/rotatingnew.gif"
                            alt={filterData.product?.name}
                          />
                        </div>

                        <div
                          className={`svg-video ${
                            changeClick === rose ? "active" : ""
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onChangeClick(
                              filterData.product?.id,
                              filterData.product?.metalColor,
                              "18kt",
                              "natural",

                              rose,
                              filterData.product?.rose_gold_price,
                              "rose",
                              "svgVideoRose"
                            );
                          }}
                        >
                          <img
                            width="auto"
                            height="auto"
                            src="https://www.overnightmountings.com//js/videoplayer/images/rotatingnew.gif"
                            alt={filterData.product?.name}
                          />
                        </div>

                        <div
                          className={`svg-video ${
                            changeClick === platinum ? "active" : ""
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onChangeClick(
                              filterData.product?.id,
                              filterData.product?.metalColor,
                              "Platinum",
                              "natural",

                              platinum,
                              filterData.product?.rose_gold_price,
                              "white",
                              "svgVideoPlatinum"
                            );
                          }}
                        >
                          <img
                            width="auto"
                            height="auto"
                            src="https://www.overnightmountings.com//js/videoplayer/images/rotatingnew.gif"
                            alt={filterData.product?.name}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="singleProduct-text">
                    <h4>{filterData.product?.name}</h4>

                    <span>
                      <p>{filterData.product?.description}</p>
                    </span>

                    <div className="shape-diamond">
                      {filterData.product?.images.map(
                        (allProductImg, index) => {
                          const productImages = allProductImg
                            .split(".")
                            .slice(-4, -3)
                            .join()
                            .split(".")
                            .shift();
                          globalProductImages.push(productImages);
                        }
                      )}

                      {shapeData.slice(0, 1).map((ShapeItemSlug) => {
                        const matchingImages = globalProductImages.filter(
                          (element) => element === ShapeItemSlug.slug
                        );

                        const capt2 =
                          filterData.product?.center_stone_options?.toUpperCase();
                        const capt = ShapeItemSlug.shape?.toUpperCase();
                        let result;
                        if (capt2 && capt) {
                          const newStone = capt2.split("/");
                          result = newStone.includes(capt);

                          return (
                            newStone.length > 1 && (
                              <div
                                className="shape-main View-with-diamond-Shape"
                                key={ShapeItemSlug.id}
                              >
                                <span
                                  className={`bold ${
                                    changeOverShape && "active-main-hover"
                                  }`}
                                >
                                  View with diamond Shape :
                                  <span
                                    class={`unbold ${
                                      changeOverShape && "hover-active"
                                    }`}
                                  >
                                    {changeOverShape}
                                  </span>
                                  <span
                                    class={`unbold ${
                                      shapeNameSelected && "active"
                                    }`}
                                  >
                                    {shapeNameSelected}
                                  </span>
                                </span>

                                <div className="View-with-diamond-Shape-list-main">
                                  {shapeData.map((ShapeItem) => {
                                    const capt2 =
                                      filterData.product?.center_stone_options?.toUpperCase();
                                    const capt = ShapeItem.shape?.toUpperCase();
                                    let result;

                                    if (capt2 && capt) {
                                      const a = capt2.split("/");
                                      result = a.includes(capt);
                                      if (result == true) {
                                        return (
                                          <div
                                            className={
                                              shapeItemId === ShapeItem.id
                                                ? "shape shape-active"
                                                : "shape"
                                            }
                                            key={ShapeItem.id}
                                            onClick={() => {
                                              shapeOnclick(
                                                ShapeItem.slug,
                                                ShapeItem.shape
                                              );

                                              setShapeItemId((prevState) =>
                                                ShapeItem.id === prevState
                                                  ? ""
                                                  : ShapeItem.id
                                              );
                                            }}
                                            onMouseEnter={() =>
                                              onChangeOverShape(ShapeItem.shape)
                                            }
                                            onMouseLeave={() =>
                                              onChangeOverShape("")
                                            }
                                          >
                                            <img
                                              width="auto"
                                              height="auto"
                                              src={ShapeItem.icon}
                                              alt={ShapeItem.shape}
                                              onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                              }}
                                            />
                                          </div>
                                        );
                                      }
                                    }
                                  })}
                                </div>
                              </div>
                            )
                          );
                        } else {
                          return (
                            <div className="shape-main N/A">
                              <span class="bold">
                                View with diamond Shape:
                                <span class="unbold">N / A</span>
                              </span>
                            </div>
                          );
                        }
                      })}
                    </div>

                    <div className="detail-metal-main">
                      <div
                        className={`detail-metal ${
                          changeOver ? "active" : ""
                        } `}
                      >
                        <div class="bold"> Metal : </div>
                        <div class="unbold-content">
                          <div
                            className={`metal-common metal-1  ${
                              changeClick === white ? "active" : ""
                            } 
                           `}
                          >
                            <span className="span-click">
                              {changeClick?.replace(/-/g, " ")}
                            </span>
                            <span className="span-over">
                              {" "}
                              {changeOver?.replace(/-/g, " ")}{" "}
                              {changeOver === platinum &&
                                `$(${
                                  (filterData.product?.platinum_price -
                                    filterData.product?.white_gold_price || 0) >
                                  0
                                    ? `+${
                                        filterData.product?.platinum_price -
                                        filterData.product?.white_gold_price
                                      }`
                                    : filterData.product?.platinum_price -
                                      filterData.product?.white_gold_price
                                })`}
                            </span>
                          </div>
                          <div
                            className={`metal-common metal-2  ${
                              changeClick === yellow ? "active" : ""
                            } `}
                          >
                            <span className="span-click">
                              {changeClick?.replace(/-/g, " ")}
                            </span>
                            <span className="span-over">
                              {changeOver?.replace(/-/g, " ")}{" "}
                              {changeOver === platinum &&
                                `$(${
                                  (filterData.product?.platinum_price -
                                    filterData.product?.yellow_gold_price ||
                                    0) > 0
                                    ? `+${
                                        filterData.product?.platinum_price -
                                        filterData.product?.yellow_gold_price
                                      }`
                                    : filterData.product?.platinum_price -
                                      filterData.product?.yellow_gold_price
                                })`}
                            </span>
                          </div>
                          <div
                            className={`metal-common metal-3  ${
                              changeClick === rose ? "active" : ""
                            } `}
                          >
                            <span className="span-click">
                              {changeClick?.replace(/-/g, " ")}
                            </span>
                            <span className="span-over">
                              {" "}
                              {changeOver?.replace(/-/g, " ")}{" "}
                              {changeOver === platinum &&
                                `$(${
                                  (filterData.product?.platinum_price -
                                    filterData.product?.rose_gold_price || 0) >
                                  0
                                    ? `+${
                                        filterData.product?.platinum_price -
                                        filterData.product?.rose_gold_price
                                      }`
                                    : filterData.product?.platinum_price -
                                      filterData.product?.rose_gold_price
                                })`}
                            </span>
                          </div>
                          <div
                            className={`metal-common metal-4  ${
                              changeClick === platinum ? "active" : ""
                            } `}
                          >
                            <span className="span-click">
                              {changeClick?.replace(/-/g, " ")}
                            </span>
                            <span className="span-over">
                              {changeOver?.replace(/-/g, " ")}{" "}
                              {changeClick !== platinum &&
                                changeOver === platinum &&
                                `$(${
                                  (filterData.product?.platinum_price -
                                    filterData.product?.white_gold_price || 0) >
                                  0
                                    ? `+${
                                        filterData.product?.platinum_price -
                                        filterData.product?.white_gold_price
                                      }`
                                    : filterData.product?.platinum_price -
                                      filterData.product?.white_gold_price
                                })`}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="metal-type-color detail-page">
                        <Link
                          href="javascript:void(0);"
                          className={`${changeClick === white ? "active" : ""}`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onChangeClick(
                              filterData.product?.id,
                              filterData.product?.metalColor,
                              "18kt",
                              "natural",

                              white,
                              filterData.product?.white_gold_price,
                              "white"
                            );
                          }}
                          onMouseEnter={() => onChangeOver(white)}
                          onMouseOut={() => onChangeOver()}
                        />
                        <Link
                          href="javascript:void(0);"
                          className={`${
                            changeClick === yellow ? "active" : ""
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onChangeClick(
                              filterData.product?.id,
                              filterData.product?.metalColor,
                              "18kt",
                              "natural",
                              yellow,
                              filterData.product?.yellow_gold_price,
                              "yellow"
                            );
                          }}
                          onMouseEnter={() => onChangeOver(yellow)}
                          onMouseOut={() => onChangeOver()}
                        />
                        <Link
                          href="javascript:void(0);"
                          className={`${changeClick === rose ? "active" : ""}`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onChangeClick(
                              filterData.product?.id,
                              filterData.product?.metalColor,
                              "18kt",
                              "natural",

                              rose,
                              filterData.product?.rose_gold_price,
                              "rose"
                            );
                          }}
                          onMouseEnter={() => onChangeOver(rose)}
                          onMouseOut={() => onChangeOver()}
                        />
                        <Link
                          href="javascript:void(0);"
                          className={`${
                            changeClick === platinum ? "active" : ""
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onChangeClick(
                              filterData.product?.id,
                              filterData.product?.metalColor,
                              "Platinum",
                              "natural",

                              platinum,
                              filterData.product?.platinum_price,
                              "white"
                            );
                          }}
                          onMouseEnter={() => onChangeOver(platinum)}
                          onMouseOut={() => onChangeOver()}
                        />
                      </div>
                    </div>

                    {filterData.product?.SideDiamondNumber > 0 &&
                      (filterData.product?.variants.length > 0 ? (
                        <div className="Diamond-Original-main  Setting-Carat Variation">
                          <span className="bold full-width">
                            Setting Carat Weight (setting only) :{" "}
                            <span className="bold-650">
                              {
                                <span>
                                  {changeOverVariation
                                    ? `${changeOverVariation} ct tw `
                                    : filterData.product
                                        ?.fractionsemimount}{" "}
                                </span>
                              }
                            </span>
                          </span>

                          {filterData.product?.variants.map(
                            (variantItem, index) => {
                              const inputString = variantItem.sku;
                              const regex = /(\d+\/\d+)/;
                              const match = inputString?.match(regex);
                              if (match && match?.length > 0) {
                                const fraction = match[0];

                                return (
                                  <>
                                    <div
                                      className={
                                        variantSlug === variantItem.slug
                                          ? "active-variant variant-outer"
                                          : "variant-outer"
                                      }
                                      key={index}
                                    >
                                      <span
                                        onClick={() =>
                                          handleVariation(variantItem.slug)
                                        }
                                        onMouseEnter={() =>
                                          onChangeOverVariation(fraction)
                                        }
                                        onMouseOut={() =>
                                          onChangeOverVariation()
                                        }
                                      >
                                        {fraction}
                                      </span>
                                    </div>
                                  </>
                                );
                              }
                              return null; // Make sure to return null if the condition is not met
                            }
                          )}
                        </div>
                      ) : (
                        filterData.product?.fractionsemimount && (
                          <div className="Diamond-Original-main  Setting-Carat Variation N/A">
                            <span className=" full-width">
                              <span className="bold">
                                Setting Carat Weight (setting only) :{" "}
                              </span>{" "}
                              <span className="bold-650">
                                {" "}
                                {filterData.product?.fractionsemimount}
                              </span>
                            </span>
                          </div>
                        )
                      ))}

                    <div className="Diamond-Original-main">
                      <span class="bold">
                        Diamond Origin:
                        <span
                          className={
                            diamondTypeClick === "natural"
                              ? "unbold active bold-650"
                              : "unbold bold-650"
                          }
                        >
                          {diamondOrigin
                            ? diamondOrigin
                            : diamondTypeClick === "natural"
                            ? "Natural"
                            : "Lab Grown"}
                        </span>
                        <span
                          className={
                            diamondTypeClick === "lab_grown"
                              ? "unbold active bold-650"
                              : "unbold bold-650"
                          }
                        >
                          {diamondOrigin
                            ? diamondOrigin
                            : diamondTypeClick === "lab_grown"
                            ? "Lab Grown"
                            : "Natural"}
                        </span>
                      </span>
                      <div className="Diamond-Original">
                        <Link
                          href="javascript:void(0)"
                          className={
                            diamondTypeClick === "natural" ? "active" : ""
                          }
                          // onMouseEnter={() => onChangeNature("natural")}
                          // onMouseOut={() => onChangeNature()}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onChangeClickNature(
                              filterData.product?.id,
                              filterData.product?.metalColor,
                              listColor === "platinum" ? "Platinum" : "18kt",
                              "natural"
                            );
                          }}
                          onMouseEnter={() =>
                            handleDiamondOriginHover("Natural")
                          }
                          onMouseOut={() => handleDiamondOriginHover("")}
                        >
                          Natural
                        </Link>
                        <Link
                          href="javascript:void(0)"
                          className={
                            diamondTypeClick === "lab_grown" ? "active" : ""
                          }
                          // onMouseEnter={() => onChangeNature("lab_grown")}
                          // onMouseOut={() => onChangeNature()}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onChangeClickNature(
                              filterData.product?.id,
                              filterData.product?.metalColor,
                              listColor === "platinum" ? "Platinum" : "18kt",
                              "lab_grown"
                            );
                          }}
                          onMouseEnter={() =>
                            handleDiamondOriginHover("Lab Grown")
                          }
                          onMouseOut={() => handleDiamondOriginHover("")}
                        >
                          Lab Grown
                        </Link>
                      </div>
                    </div>

                    {/* <div className="detail-price">
                      <div class="bold"> Price $ </div>
                      <div class="unbold">{diamondType?.price}</div>
                    </div> */}
                    {diamondType?.diamond_type === "lab_grown" ||
                    diamondTypeClick === "lab_grown" ? (
                      <div className="detail-price">
                        <div class="bold"> Price : </div>
                        <div class="unbold">
                          ${Math.round(diamondType?.price)}
                        </div>
                      </div>
                    ) : (
                      <div className="detail-price">
                        <div class="bold"> Price : </div>
                        <div>
                          <div
                            className={`price-common ${
                              changeClick === white ? "active" : ""
                            }`}
                          >
                            <span className="unbold">
                              {/* {matchingBand === true
                              ? `$${
                                  parseFloat(
                                    filterData.product?.white_gold_price
                                  ) +
                                  parseFloat(
                                    filterData?.product?.matching_wedding_band
                                      ?.price
                                  )
                                } `
                              : `$${filterData.product?.white_gold_price}`} */}
                              $
                              {Math.round(filterData.product?.white_gold_price)}
                            </span>
                          </div>
                          <div
                            className={`price-common ${
                              changeClick === yellow ? "active" : ""
                            }`}
                          >
                            <span className="unbold">
                              {/* {matchingBand === true
                              ? `$${
                                  parseFloat(
                                    filterData.product?.yellow_gold_price
                                  ) +
                                  parseFloat(
                                    filterData?.product?.matching_wedding_band
                                      ?.price
                                  )
                                } `
                              : `$${filterData.product?.yellow_gold_price}`} */}
                              $
                              {Math.round(
                                filterData.product?.yellow_gold_price
                              )}
                            </span>
                          </div>
                          <div
                            className={`price-common ${
                              changeClick === rose ? "active" : ""
                            }`}
                          >
                            <span className="unbold">
                              {/* {matchingBand === true
                              ? `$${
                                  parseFloat(
                                    filterData.product?.rose_gold_price
                                  ) +
                                  parseFloat(
                                    filterData?.product?.matching_wedding_band
                                      ?.price
                                  )
                                } `
                              : `$${filterData.product?.rose_gold_price}`} */}
                              ${Math.round(filterData.product?.rose_gold_price)}
                            </span>
                          </div>

                          <div
                            className={`price-common ${
                              changeClick === platinum ? "active" : ""
                            }`}
                          >
                            <span className="unbold">
                              {/* {matchingBand === true
                              ? `$${
                                  parseFloat(
                                    filterData.product?.platinum_price
                                  ) +
                                  parseFloat(
                                    filterData?.product?.matching_wedding_band
                                      ?.price
                                  )
                                } `
                              : `$${filterData.product?.platinum_price}`} */}
                              ${Math.round(filterData.product?.platinum_price)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div class="bold detail-price Engraving">
                      <span> Engraving : </span>{" "}
                      <input
                        type="text"
                        onChange={onchangeEngraving}
                        maxLength={25}
                      />
                    </div>
                    <div class="bold detail-price Engraving">
                      <span> Fonts : </span>{" "}
                      <div className="font-select">
                        <Select
                          defaultValue={selectedFontStyleOption}
                          onChange={handleSelectFontStyle}
                          options={fontStyleOptions}
                          placeholder="Select font Style"
                        />
                      </div>
                    </div>
                    <div className="bold select-custom-size-side">
                    <span>
                        {" "}
                        <div onClick={() => togglePopup()}>
                          <span>
                            <IoInformationCircleOutline />
                          </span>
                          {ringSize && (
                            <div>
                              <RingSizeChart setRingSize={setRingSize} />
                            </div>
                          )}
                        </div>{" "}
                        Size :{" "}
                      </span>{" "}
                      <Select
                        defaultValue={selectedOption}
                        onChange={handleSelectSize}
                        options={options}
                        placeholder="Select Size"
                      />
                    </div>
                    <p
                      id="error-message"
                      className="error"
                      style={{ color: "red" }}
                    ></p>

                    <div className="choose-btnn">
                      {stock_num != null ? (
                        <Link
                          href={`${
                            selectedOption
                              ? `/final_ring_gemstone/${
                                  filterData.product?.slug
                                }/?color=${changeClick}&stock_num=${
                                  stock_num ? stock_num : ""
                                }&diamond_original=${diamondTypeClick}${
                                  selectedFontStyleOption === undefined
                                    ? ""
                                    : `&font_style=${selectedFontStyleOption}`
                                }${
                                  textEngraving === undefined
                                    ? ""
                                    : `&textEngraving=${textEngraving}`
                                }&ring_size=${selectedOption}`
                              : "javascript:void(0);"
                          }`}
                          className="ChooseSetting btn-custom"
                          onClick={handleChooseRingSetting}
                        >
                          Choose This Setting
                        </Link>
                      ) : (
                        <Link
                          href={`${
                            selectedOption
                              ? `/diamond/start-with-a-diamond/${
                                  diamondTypeClick == "lab_grown"
                                    ? "lab_grown"
                                    : ""
                                }/${
                                  filterData.product?.slug
                                }/?color=${changeClick}&diamond_original=${diamondTypeClick}${
                                  typeof centerStoneData === "undefined"
                                    ? ""
                                    : `&center_stone=${centerStoneData}`
                                }${
                                  selectedFontStyleOption === undefined
                                    ? ""
                                    : `&font_style=${selectedFontStyleOption}`
                                }${
                                  textEngraving === undefined
                                    ? ""
                                    : `&textEngraving=${textEngraving}`
                                }&ring_size=${selectedOption}`
                              : "javascript:void(0);"
                          }`}
                          className="ChooseSetting btn-custom"
                          onClick={handleChooseRingSetting}
                        >
                          Choose This Setting
                        </Link>
                      )}
                      <Link href="javascript:void(0);" className="wish-list">
                        <span>
                          {user_id ? (
                            wishlistIds.includes(filterData.product?.id) ? (
                              <IoMdHeart
                                onClick={() =>
                                  handleWishlistRemove(filterData.product)
                                }
                              />
                            ) : (
                              <CiHeart
                                onClick={(e) => {
                                  if (!selectedOption) {
                                    e.preventDefault();
                                    document.getElementById(
                                      "error-message"
                                    ).innerText = "Please select a ring size.";
                                  } else {
                                    handleWishlist(
                                      filterData.product,
                                      "ring",
                                      user_id,
                                      filterData.product?.id,
                                      changeClick,
                                      filterData.entity_id,
                                      diamondType?.diamond_type === "lab_grown"
                                        ? diamondType?.price
                                        : changeClick === white
                                        ? filterData.product?.white_gold_price
                                        : changeClick === yellow
                                        ? filterData.product?.yellow_gold_price
                                        : changeClick === rose
                                        ? filterData.product?.rose_gold_price
                                        : filterData.product?.platinum_price,

                                      textEngraving,
                                      selectedFontStyleOption,
                                      selectedOption
                                    );
                                  }
                                }}
                              />
                            )
                          ) : beforeLoginWishlistIds.includes(
                              filterData.product?.id
                            ) ? (
                            <IoMdHeart
                              onClick={() =>
                                handleWishlistRemove(filterData.product)
                              }
                            />
                          ) : (
                            <CiHeart
                              onClick={(e) => {
                                if (!selectedOption) {
                                  e.preventDefault();
                                  document.getElementById(
                                    "error-message"
                                  ).innerText = "Please select a ring size.";
                                } else {
                                  handleWishlist(
                                    filterData.product,
                                    "ring",
                                    user_id,
                                    filterData.product?.id,
                                    changeClick,
                                    filterData.entity_id,
                                    diamondType?.diamond_type === "lab_grown"
                                      ? diamondType?.price
                                      : changeClick === white
                                      ? filterData.product?.white_gold_price
                                      : changeClick === yellow
                                      ? filterData.product?.yellow_gold_price
                                      : changeClick === rose
                                      ? filterData.product?.rose_gold_price
                                      : filterData.product?.platinum_price,

                                    textEngraving,
                                    selectedFontStyleOption,
                                    selectedOption
                                  );
                                }
                              }}
                            />
                          )}
                        </span>
                      </Link>
                    </div>

                    <div className="contact-us-btn shipping-add">
                      {" "}
                      Still can’t find your perfect ring? Send us a
                      <Link href="/custom-concierge"> customization </Link>{" "}
                      request
                    </div>

                    <div className="shipping-add">
                      <ul>
                        <li>
                          <RiTruckLine />
                        </li>
                        <li>
                          <Link href="javascript:void(0);">
                            Free Shipping, Free 30 Day Returns
                          </Link>
                        </li>
                      </ul>

                      <div className="order-data">
                        <span>
                          <FaRegCalendarAlt />
                        </span>
                        <p>
                          {" "}
                          Order now and your order ships by {currentMonth}{" "}
                          {currentDay}, {currentYear}, {formattedDate} depending
                          on center diamond.
                        </p>
                      </div>
                    </div>
                    {/* ==============email text=========== */}
                    <div className="Need-More-Time-details">
                      <div className="user-detail">
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
                              productColor={listColor}
                            />
                          </Popup>
                        </Link>
                        {stock_num ? (
                          diamondData.map((item) => {
                            return (
                              <Link
                                href="/help"
                                onClick={() => handleClick(item)}
                              >
                                <span>
                                  <MdEmail />
                                </span>
                                Email
                              </Link>
                            );
                          })
                        ) : (
                          <Link
                            href="/help"
                            onClick={() => handleClick()}
                          >
                            <span>
                              <MdEmail />
                            </span>
                            Email
                          </Link>
                        )}
                        <div>
                          <Link href="tel:609-507-0003">
                            <span>
                              <BiSolidPhoneCall />
                            </span>
                            609-507-0003
                          </Link>
                        </div>
                      </div>
                      <div className="Need-More-Time footer">
                        <NewsLetter
                          portalId="45427602"
                          formId="5ada63ac-16ec-4ecb-bca7-21caf983c404"
                          targetId="commonId"
                        />
                      </div>
                    </div>

                    {/* ===================== */}
                    <div className="detail-accordian">
                      <div className="item" key={index}>
                        <div className="title" onClick={() => toggle(index)}>
                          <div>
                            <span>Ring Details</span>
                          </div>
                          <span>
                            {selected === index ? (
                              <BiUpArrow />
                            ) : (
                              <BiDownArrow />
                            )}
                          </span>
                        </div>

                        <div
                          className={
                            selected === index ? "content-show" : "content"
                          }
                        >
                          <div className="ring-info">
                            <span>RING INFORMATION</span>
                            <div>
                              <span>
                                Style: {filterData.product?.internal_sku}
                              </span>
                            </div>
                            <div>
                              <span>
                                Metal:{" "}
                                {diamondTypeColr?.metalType == undefined
                                  ? diamondTypeByDefault?.metalType
                                  : diamondTypeColr?.metalType}
                              </span>
                            </div>
                            {/* <div>
                            <span>
                              Avg. width: {filterData.product?.metalWeight}
                            </span>
                          </div>
                          <div>
                            <span>
                              Centre diamond: {filterData.product?.CenterShape}
                            </span>
                          </div> */}
                          </div>
                          <div className="ring-info">
                            <span>Accent Gemstones (sideStones)</span>
                            <div>
                              <span>
                                Number:{" "}
                                {filterData.product?.SideDiamondNumber
                                  ? filterData.product?.SideDiamondNumber
                                  : 0}
                              </span>
                            </div>
                            <div>
                              <span onClick={() => togglePopupRingType()}>
                                <IoInformationCircleOutline />
                              </span>{" "}
                              <span>
                                Type: Natural or lab depending on center diamond
                                selected.
                              </span>
                            </div>
                            {typeOfRing && (
                              <div className="new-popups">
                                <DiamondType setTypeOfRing={setTypeOfRing} />
                              </div>
                            )}

                            <div>
                              <span>
                                Average Color:{" "}
                                {filterData.product?.SideDiamondNumber
                                  ? diamondTypeClick === "natural"
                                    ? `G`
                                    : `E, F, G`
                                  : `N/A`}
                              </span>
                            </div>
                            <div>
                              <span>
                                Average Clarity:{" "}
                                {filterData.product?.SideDiamondNumber
                                  ? diamondTypeClick === "natural"
                                    ? `SI`
                                    : `VS-SI1`
                                  : `N/A`}
                              </span>
                            </div>
                            <div className="color-clarity-details">
                              <div
                                className={
                                  diamondTypeClick === "natural"
                                    ? "unbold active"
                                    : "unbold"
                                }
                              >
                                {diamondType?.diamondQuality === undefined && (
                                  <>
                                    {resultdiamondTypeByDefault
                                      ?.slice(1, 2)
                                      .map((item) => (
                                        <div
                                          className="color-details"
                                          key={`color-${item}`}
                                        >
                                          Color: {item}
                                        </div>
                                      ))}

                                    {resultdiamondTypeByDefault
                                      ?.slice(0, 1)
                                      .map((item) => (
                                        <div
                                          className="clarity-details"
                                          key={`clarity-${item}`}
                                        >
                                          Clarity: {item.slice(0, 2)}
                                        </div>
                                      ))}
                                  </>
                                )}

                                {diamondType?.diamondQuality !== undefined && (
                                  <>
                                    {resultdiamondType
                                      ?.slice(1, 2)
                                      .map((item) => (
                                        <div
                                          className="color-details"
                                          key={`color-${item}`}
                                        >
                                          Color: {item}
                                        </div>
                                      ))}
                                    {resultdiamondType
                                      ?.slice(0, 1)
                                      .map((item) => (
                                        <div
                                          className="clarity-details"
                                          key={`clarity-${item}`}
                                        >
                                          Clarity: {item.slice(0, 2)}
                                        </div>
                                      ))}
                                  </>
                                )}
                              </div>

                              <div
                                className={
                                  diamondTypeClick === "lab_grown"
                                    ? "unbold active"
                                    : "unbold"
                                }
                              >
                                {diamondType?.diamondQuality === undefined && (
                                  <>
                                    {resultdiamondTypeByDefault
                                      ?.slice(1, 2)
                                      .map((item) => (
                                        <div
                                          className="color-details"
                                          key={`color-${item}`}
                                        >
                                          Color: {item}
                                        </div>
                                      ))}

                                    {resultdiamondTypeByDefault
                                      ?.slice(0, 1)
                                      .map((item) => (
                                        <div
                                          className="clarity-details"
                                          key={`clarity-${item}`}
                                        >
                                          Clarity:{" "}
                                          {item.replace("LAB GROWN", "")}{" "}
                                        </div>
                                      ))}
                                  </>
                                )}

                                {diamondType?.diamondQuality !== undefined && (
                                  <>
                                    {resultdiamondType
                                      ?.slice(1, 2)
                                      .map((item) => (
                                        <div
                                          className="color-details"
                                          key={`color-${item}`}
                                        >
                                          Color: {item}
                                        </div>
                                      ))}
                                    {resultdiamondType
                                      ?.slice(0, 1)
                                      .map((item) => (
                                        <div
                                          className="clarity-details"
                                          key={`clarity-${item}`}
                                        >
                                          Clarity:{" "}
                                          {item.replace("LAB GROWN", "")}{" "}
                                        </div>
                                      ))}
                                  </>
                                )}
                              </div>
                            </div>

                            {/* <div>
                            <span>Style: {filterData.product?.sku}</span>
                          </div>
                          <div>
                            <Link
                              href="javascript:void(0);"
                              onClick={() => setShapeOpen(!shapeOpen)}
                            >
                              <IoInformationCircleOutline />
                              {shapeOpen && (
                                <div className="new-popups">
                                  <ShapePopup setShapeOpen={setShapeOpen} />
                                </div>
                              )}
                            </Link>
                            <span>
                              Shape: {filterData.product?.GemstoneShape1}
                            </span>
                          </div>
                          <div>
                            <Link
                              href="javascript:void(0);"
                              onClick={() => setShapeOpen(!shapeOpen)}
                            >
                              <IoInformationCircleOutline />
                              {shapeOpen && (
                                <div className="new-popups">
                                  <ShapePopup setShapeOpen={setShapeOpen} />
                                </div>
                              )}
                            </Link>
                            <span>
                              Avg. width: {filterData.product?.metalWeight}
                            </span>
                          </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    {filterData?.product?.matching_wedding_band && (
                      <div className="detail-accordian">
                        <div className="item" key={index}>
                          <div
                            className="title"
                            onClick={() => toggleBridal(index)}
                          >
                            <div>
                              <span>Matching Bands</span>
                            </div>
                            <span>
                              {selected_3 === index ? (
                                <BiUpArrow />
                              ) : (
                                <BiDownArrow />
                              )}
                            </span>
                          </div>

                          <div
                            className={
                              selected_3 === index ? "content-show" : "content"
                            }
                          >
                            <div className="ring-info add-match-band">
                              <Link href="javascript:void(0)">
                                add matching band
                              </Link>
                              <div className="add-matchring-column">
                                <div className="inner-matching-bands">
                                  <Link
                                    href={`/detail-wedding-band/${filterData?.product?.matching_wedding_band?.slug}?color=${listColor}`}
                                  >
                                    <img
                                      width="auto"
                                      height="auto"
                                      src={`${imgBaseUrl}/${filterData?.product?.matching_wedding_band?.internal_sku}/${filterData?.product?.matching_wedding_band?.internal_sku}.${altColor}.jpg`}
                                      alt={filterData.product?.name}
                                      onError={handleError}
                                    />
                                    <div className="heart-icon-band">
                                      <Link href="javascript:void(0);">
                                        {user_id ? (
                                          bandWishlistIds.includes(
                                            filterData.product
                                              ?.matching_wedding_band?.id
                                          ) ? (
                                            <IoMdHeart
                                              onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleWishlistRemove(
                                                  filterData.product
                                                    ?.matching_wedding_band
                                                );
                                              }}
                                            />
                                          ) : (
                                            <CiHeart
                                              onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleWishlistBand(
                                                  filterData.product
                                                    ?.matching_wedding_band
                                                    ?.price,
                                                  filterData.product
                                                    ?.matching_wedding_band?.id,
                                                  filterData.product
                                                    ?.matching_wedding_band,
                                                  filterData.product
                                                    ?.matching_wedding_band
                                                    ?.internal_sku,
                                                  listColor,
                                                  user_id,
                                                  "matching_set",
                                                  "natural"
                                                );
                                              }}
                                            />
                                          )
                                        ) : bandBeforeLoginWishlistIds.includes(
                                            filterData.product
                                              ?.matching_wedding_band?.id
                                          ) ? (
                                          <IoMdHeart
                                            onClick={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              handleWishlistRemove(
                                                filterData.product
                                                  ?.matching_wedding_band
                                              );
                                            }}
                                          />
                                        ) : (
                                          <CiHeart
                                            onClick={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              handleWishlistBand(
                                                filterData.product
                                                  ?.matching_wedding_band
                                                  ?.price,
                                                filterData.product
                                                  ?.matching_wedding_band?.id,
                                                filterData.product
                                                  ?.matching_wedding_band,
                                                filterData.product
                                                  ?.matching_wedding_band
                                                  ?.internal_sku,
                                                listColor,
                                                user_id,
                                                "matching_set",
                                                "natural"
                                              );
                                            }}
                                          />
                                        )}
                                      </Link>
                                    </div>

                                    <span>
                                      {
                                        filterData?.product
                                          ?.matching_wedding_band
                                          ?.product_browse_pg_name
                                      }
                                    </span>
                                  </Link>
                                </div>

                                {/* <div className="add-to-ring-bag">
                              <Link
                                href={"/cart"}
                                onClick={() =>
                                  handleCreateAccount(
                                    filterData.product?.matching_wedding_band
                                      ?.price,
                                    filterData.product?.matching_wedding_band
                                      ?.id,
                                    filterData.product?.matching_wedding_band,
                                    filterData.product?.matching_wedding_band
                                      ?.sku,
                                    "18K WHITE GOLD",
                                    user_id,
                                    "matching_set",
                                    "natural"
                                  )
                                }
                              >
                                Add To Bag
                              </Link>
                            </div> */}
                              </div>

                              {/* <div className="show-match-band-data">
                            <span>
                              {
                                filterData?.product?.matching_wedding_band
                                  ?.name
                              }
                            </span>
                            
                            <span>
                              {
                                filterData?.product?.matching_wedding_band
                                  ?.diamondQuality
                              }
                            </span>
                            ,
                            <span>
                              {
                                filterData?.product?.matching_wedding_band
                                  ?.diamondQuality
                              }
                            </span>
                            ,
                            <span>
                              {
                                filterData?.product?.matching_wedding_band
                                  ?.fractioncomplete
                              }
                            </span>
                            , price : $
                            <span>
                              {
                                filterData?.product?.matching_wedding_band
                                  ?.price
                              }
                            </span>
                          </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    {similarProducts?.slice(0, 1).map((item) => {
                      return (
                        <>
                          <div className="detail-accordian detail-accordian_2">
                            <div className="item">
                              <div
                                className="title"
                                onClick={() => toggle_2(index_2)}
                              >
                                <div>
                                  <span>Recommended bridal sets</span>
                                </div>
                                <span>
                                  {selected_2 === index_2 ? (
                                    <BiUpArrow />
                                  ) : (
                                    <BiDownArrow />
                                  )}
                                </span>
                              </div>

                              <div
                                className={
                                  selected_2 === index_2
                                    ? "content-show"
                                    : "content"
                                }
                              >
                                <div className="">
                                  <div className="">
                                    <Slider {...DetailsRecommended}>
                                      <div>
                                        <img
                                          width="auto"
                                          height="auto"
                                          src="https://image.brilliantearth.com/media/cache/da/2b/da2bff20b005b85e43f53badc6769d94.jpg"
                                          alt={filterData.product?.name}
                                        />
                                        <p>
                                          ENGAGEMENT RINGS SINGLE ROW PRONG SET
                                        </p>
                                        <p>Price $ 3271.41</p>
                                      </div>
                                      <div>
                                        <img
                                          width="auto"
                                          height="auto"
                                          src="https://image.brilliantearth.com/media/cache/da/2b/da2bff20b005b85e43f53badc6769d94.jpg"
                                          alt={filterData.product?.name}
                                        />
                                        <p>
                                          ENGAGEMENT RINGS SINGLE ROW PRONG SET
                                        </p>
                                        <p>Price $ 3271.41</p>
                                      </div>
                                      <div>
                                        <img
                                          width="auto"
                                          height="auto"
                                          src="https://image.brilliantearth.com/media/cache/da/2b/da2bff20b005b85e43f53badc6769d94.jpg"
                                          alt={filterData.product?.name}
                                        />
                                        <p>
                                          ENGAGEMENT RINGS SINGLE ROW PRONG SET
                                        </p>
                                        <p>Price $ 3271.41</p>
                                      </div>
                                      <div>
                                        <img
                                          width="auto"
                                          height="auto"
                                          src="https://image.brilliantearth.com/media/cache/da/2b/da2bff20b005b85e43f53badc6769d94.jpg"
                                          alt={filterData.product?.name}
                                        />
                                        <p>
                                          ENGAGEMENT RINGS SINGLE ROW PRONG SET
                                        </p>
                                        <p>Price $ 3271.41</p>
                                      </div>
                                      {/* Add more slides as needed */}
                                    </Slider>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </>
        </div>
      </div>
    </>
  );
}
