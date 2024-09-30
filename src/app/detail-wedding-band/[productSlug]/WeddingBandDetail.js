"use client";
import axios from "axios";
import debounce from "lodash.debounce";
import { useContext, useEffect, useMemo, useState } from "react";
import { BiDownArrow, BiSolidPhoneCall, BiUpArrow } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdEmail, MdMarkEmailRead } from "react-icons/md";
import { RiTruckLine } from "react-icons/ri";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { v4 as uuidv4 } from "uuid";
// import { ShapePopup } from "../../popups/ShapePopup";
import LoaderSpinner from "@/app/_componentStatic/LoaderSpinner";
import { UserContext } from "@/app/context/UserContext";
import { Select } from "antd";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import "react-medium-image-zoom/dist/styles.css";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import { addToCart } from "../../../../store/actions/cartActions";

import { DropHint } from "@/app/_componentStatic/DropHint";
import NewsLetter from "@/app/_componentStatic/NewsLetter";
import { useData } from "@/app/context/DataContext";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  productList,
  productListCart,
} from "../../../../store/actions/productActions";
import { addToWishlist, removeToWishlist } from "../../../../store/actions/wishlistAction";

export const WeddingBandsDetail = ({productSlug, filterData, shapeData, fontStyleOptions}) => {

  const router = useRouter(); // Call userouter at the top level of the component
  const [urlColor, setUrlColor] = useState("");
  const searchParams = useSearchParams();
  const queryParams = useSearchParams();
  const listColor = queryParams.get("color");
  const stock_num = queryParams.get("stock_num");
  const diamond_origin = queryParams.get("diamond_origin");
  const diamond_original = queryParams.get("diamond_original");

  // find url area
  const { baseUrl, imgBaseUrl, imgAssetsUrl} = useContext(UserContext);
  const white = "18k-white-gold";
  const yellow = "18k-yellow-gold";
  const rose = "18k-rose-gold";
  const platinum = "platinum";

  useEffect(() => {
    // Update URL color when listColor changes
    if (listColor === white) {
      setUrlColor("white");
    } else if (listColor === yellow) {
      setUrlColor("yellow");
    } else if (listColor === rose) {
      setUrlColor("rose");
    } else if (listColor === platinum) {
      setUrlColor("white");
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
  const [diamondData, setDiamondData] = useState([]);
  const [variantSlug, setVariantSlug] = useState();
  const [changeOverNature, setChangeOverNature] = useState();
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

  const [shapeOpen, setShapeOpen] = useState(false);
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
  var globalProductImages = [];

  const [similarProducts, setSimilarProducts] = useState([]);

  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlistData);
  const wishListDataBase = useSelector((state) => state.productDataWishlist);

  // Add to Bag
  const handleCreateAccount = async (
    ring_price,
    ring_id,
    ring_data,
    ring_img,
    ring_color,

    userId,

    product_type,
    ring_type,
    ring_size,
    textEngraving,
    font_style
  ) => {
    const newItem = {
      ring: ring_data,
      ring_img,
      ring_color,
      ring_price,

      uniqueId: uuidv4(),
      ring_type,
      ring_size,

      product_type,
      textEngraving,
      font_style,
    };

    dispatch(addToCart(newItem));

    const formData = {
      user_id: userId,
      ring_price: ring_price,
      ring_id: ring_id,
      ring_color: ring_color,

      img_sku: ring_img,

      product_type: product_type,
      ring_type: ring_type,
      ring_size: ring_size,
      textEngraving: textEngraving,
      font_style: font_style,
    };
    secureLocalStorage.setItem("cart_data", JSON.stringify(formData));

    const savedWishlist =
      JSON.parse(secureLocalStorage.getItem("cart_data")) || [];

    const URL_2 = `${baseUrl}/cart?user_id=${user_id}&product_type=${
      formData.product_type
    }&ring_id=${formData.ring_id}&ring_color=${formData.ring_color}&img_sku=${
      formData.img_sku
    }&ring_price=${formData.ring_price}&ring_type=${
      formData.ring_type
    }&ring_size=${formData.ring_size}${
      formData.textEngraving ? `&engraving=${formData.textEngraving}` : ""
    }${formData.font_style ? `&font=${formData.font_style}` : ""}`;

    axios
      .get(URL_2)
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
        ring: item,
        ring_color,
        product_type,
        uniqueId: uuidv4(),
        textEngraving,
        font_style: selectedFontStyleOption,
        ring_type: diamondTypeClick,
        ring_size,
        ring_img: img_sku,
        ring_price,
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
      if (belowItem?.id === item.ring?.id || belowItem.id === item.ring_id) {
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
        `${baseUrl}/get_product_price?product_sku=${
          filterData.product?.sku
        }&metalType=${
          listColor === "platinum" ? "Platinum" : "18kt"
        }&metalColor=${urlColor}&diamond_type=${
          diamond_original ? diamond_original : diamondTypeClick
        }`
      )

      .then((response) => {
        if (response.status === 200) {
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
  }, [
    urlColor,
  ]);

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

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,

    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
    ],
  };

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
        `${baseUrl}/get_product_price?product_sku=${productSku}&metalType=${productType}&metalColor=${diamondColor}&diamond_type=${diamond_type}`
      )

      .then((response) => {
        if (response.status === 200) {
          setDiamondTypeColor(response.data.data);
          onChangeClickNature(
            productSku,
            ProductMetalColor,
            productType,
            diamond_type
          );
        } else {
          console.error("Error Status:", response.status);
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      });
    searchParams.set("color", colorName);
    searchParams.delete("diamond_original");
    const newSearchString = searchParams.toString();

    const newURL = `${`/detail-wedding-band/${variantSlug}`}?${newSearchString}`;
    router.replace(newURL);
    // navigate(`/engagement-ring/${variantSlug}`)

    // setVariantSlug(variantSlug);

    // secureLocalStorage.setItem("totalCaratWeight", variantSlug);
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
        `${baseUrl}/get_product_price?product_sku=${productSku}&metalType=${productType}&metalColor=${
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

  const [shapeNameSelected, setShapeNameSelected] = useState("");
  const shapeOnclick = (shape) => {
    setShapeProduct((prevState) => (prevState === shape ? "" : shape));
  };
  // const shapeOnclick = (shapeSlug, shapeName, shapeId) => {
  //   setShapeNameSelected(shapeName);
  //   setShapeItemId((prevState) => (shapeId === prevState ? '' : shapeId));
  // };
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

  // variant start here
  const [changeOverVariation, setChangeOverVariation] = useState()
  
  
  const onChangeOverVariation = (fraction)=>{
    setChangeOverVariation(fraction);
  }

  const handleVariation = (variantSlug) => {
  
    const searchParams = new URLSearchParams(queryParams);

    searchParams.delete("diamond_original");
    const newSearchString = searchParams.toString();
    const newURL = `${`/detail-wedding-band/${variantSlug}`}?${newSearchString}`;
    router.replace(newURL);
    router.push(newURL);

    setVariantSlug(variantSlug);
    setDiamondTypeClick("natural");

    secureLocalStorage.setItem("totalCaratWeight", variantSlug);
  };
  // const handleVariation = (variantSlug) => {
  //   localStorage.setItem("fractionWedding")

  //   const newSearchString = searchParams.toString();

  //   const newURL = `${`/detail-wedding-band/${variantSlug}`}?${newSearchString}`;
  //   router.replace(newURL);
  //   setVariantSlug(variantSlug);

  //   secureLocalStorage.setItem("totalCaratWeight", variantSlug);
  // };

  useEffect(() => {
    secureLocalStorage.setItem("totalCaratWeight", productSlug);
  }, [productSlug]);

  useEffect(() => {
    const totalCaratWeight = secureLocalStorage.getItem("totalCaratWeight");
    if (totalCaratWeight) {

      const newSearchString = searchParams.toString();

      const newURL = `${`/detail-wedding-band/${productSlug}`}?${newSearchString}`;
      router.replace(newURL);
      setVariantSlug(totalCaratWeight);
    }
  }, []);

  const { setHelpData } = useData();

  const handleClick = (diamond, productType) => {
    secureLocalStorage.setItem(
      "helpData",
      JSON.stringify({
        filterData: filterData,
        listColor: listColor,
        diamond: diamond,
        product_type: productType,
      })
    );
    setHelpData({
      filterData: filterData,
      listColor: listColor,
      diamond: diamond,
      product_type: productType,
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
    beforeLoginWishlistIds.push(item.ring?.id);
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
    event.target.onerror = null;
    event.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
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
      <div
        className={`details-page container wedding-bands-detail-page ${
          stock_num ? "diamond-bread-crumb-active" : null
        }`}
      >
        <div className="">
          <>
            {/* ====================create your ring start */}

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
                          src="https://www.icegif.com/wp-content/uploads/2023/07/icegif-1260.gif"
                          alt={filterData.product?.name}
                          className="video-poster"
                          effect="blur"
                          width="auto"
                          height="auto"
                          onError={handleError}
                        />
                        <img
                          width="auto"
                          height="auto"
                          className={`details-video-common 
                                            ${
                                              changeClick === white
                                                ? "active"
                                                : ""
                                            }
                                            
                                            `}
                          src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.jpg`}
                          alt={filterData.product?.name}
                          onError={handleError}
                        />

                        <img
                          width="auto"
                          height="auto"
                          className={`details-video-common 
    ${changeClick === yellow ? "active" : ""}
    
    `}
                          src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.alt.jpg`}
                          alt={filterData.product?.name}
                          onError={handleError}
                        />

                        <img
                          width="auto"
                          height="auto"
                          className={`details-video-common 
                                    ${changeClick === rose ? "active" : ""}
                                    
                                    `}
                          src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.alt1.jpg`}
                          alt={filterData.product?.name}
                          onError={handleError}
                        />

                        <img
                          width="auto"
                          height="auto"
                          className={`details-video-common 
    ${changeClick === platinum ? "active" : ""}
    
    `}
                          src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.jpg`}
                          alt={filterData.product?.name}
                          onError={handleError}
                        />
                      </div>
                    ) : shapeProduct ? (
                      thumbnailItem || thumbnailItem?.isEmpty() ? (
                        <div className="details-videos-images-thumbnail">
                          {thumbnailItem === ".jpg" ? (
                            <InnerImageZoom
                              src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.jpg`}
                              imgAttributes={{
                                width: "auto",
                                height: "auto",
                                onError: handleError,
                                alt: filterData.product?.name,
                              }}
                            />
                          ) : (
                            <InnerImageZoom
                              src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}${thumbnailItem}.jpg`}
                              imgAttributes={{
                                width: "auto",
                                height: "auto",
                                onError: handleError,
                                alt: filterData.product?.name,
                              }}
                            />
                          )}
                        </div>
                      ) : (
                        <div className="all-images video-place-images details-videos">
                          <LazyLoadImage
                            src="https://www.icegif.com/wp-content/uploads/2023/07/icegif-1260.gif"
                            alt={filterData.product?.name}
                            className="video-poster"
                            effect="blur"
                            width="auto"
                            height="auto"
                            onError={handleError}
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.he.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ra.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.as.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.mq.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.em.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ov.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.rd.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.cu.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.pe.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.he.set.alt.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ra.set.alt.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.as.set.alt.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.mq.set.alt.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.em.set.alt.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ov.set.alt.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.rd.set.alt.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.cu.set.alt.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.pe.set.alt.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.he.set.alt1.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ra.set.alt1.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.as.set.alt1.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.mq.set.alt1.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.em.set.alt1.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ov.set.alt1.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.rd.set.alt1.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.cu.set.alt1.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.pe.set.alt1.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.he.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ra.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    onError={handleError}
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.as.side.jpg`}
                                    alt={filterData.product?.name}
                                  />
                                </div>
                                <div className={`asscher-common asscher-set `}>
                                  <img
                                    width="auto"
                                    height="auto"
                                    onError={handleError}
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.as.set.jpg`}
                                    alt={filterData.product?.name}
                                  />
                                </div>
                                <div
                                  className={`asscher-common asscher-angle `}
                                >
                                  <img
                                    width="auto"
                                    height="auto"
                                    onError={handleError}
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.as.angle.jpg`}
                                    alt={filterData.product?.name}
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.mq.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.em.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ov.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.rd.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.cu.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                                    src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.pe.set.jpg`}
                                    imgAttributes={{
                                      width: "auto",
                                      height: "auto",
                                      onError: handleError,
                                      alt: filterData.product?.name,
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
                            src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.jpg`}
                            imgAttributes={{
                              width: "auto",
                              height: "auto",
                              onError: handleError,
                              alt: filterData.product?.name,
                            }}
                          />
                        ) : (
                          <InnerImageZoom
                            src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}${thumbnailItem}.jpg`}
                            imgAttributes={{
                              width: "auto",
                              height: "auto",
                              onError: handleError,
                              alt: filterData.product?.name,
                            }}
                          />
                        )}
                      </div>
                    ) : (
                      <div className="details-videos">
                        <LazyLoadImage
                          src="https://www.icegif.com/wp-content/uploads/2023/07/icegif-1260.gif"
                          alt={filterData.product?.name}
                          className="video-poster"
                          effect="blur"
                          width="auto"
                          height="auto"
                          onError={handleError}
                        />
                        <span
                          className={`details-video-common 
                                          ${
                                            changeClick === white
                                              ? "active"
                                              : ""
                                          }
                                          
                                          `}
                        >
                          <InnerImageZoom
                            imgAttributes={{
                              width: "auto",
                              height: "auto",
                              onError: handleError,
                              alt: filterData.product?.name,
                            }}
                            src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.jpg`}
                          />
                        </span>
                        <span
                          className={`details-video-common 
  ${changeClick === yellow ? "active" : ""}
  
  `}
                        >
                          <InnerImageZoom
                            imgAttributes={{
                              width: "auto",
                              height: "auto",
                              onError: handleError,
                              alt: filterData.product?.name,
                            }}
                            src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.alt.jpg`}
                          />
                        </span>
                        <span
                          className={`details-video-common 
                                  ${changeClick === rose ? "active" : ""}
                                  
                                  `}
                        >
                          <InnerImageZoom
                            imgAttributes={{
                              width: "auto",
                              height: "auto",
                              onError: handleError,
                              alt: filterData.product?.name,
                            }}
                            src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.alt1.jpg`}
                          />
                        </span>
                        <span
                          className={`details-video-common 
  ${changeClick === platinum ? "active" : ""}
  
  `}
                        >
                          <InnerImageZoom
                            imgAttributes={{
                              width: "auto",
                              height: "auto",
                              onError: handleError,
                              alt: filterData.product?.name,
                            }}
                            src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.jpg`}
                          />
                        </span>
                      </div>
                    )}

                    <div className="all-images">
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
                            <div className={`heart-common he-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".he.side")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.he.side.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`heart-common he-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".he.set")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.he.set.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`heart-common he-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".he.angle")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.he.angle.jpg`}
                                alt={filterData.product?.name}
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
                            <div className={`radiant-common radiant-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".ra.side")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ra.side.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`radiant-common radiant-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".ra.set")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ra.set.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`radiant-common radiant-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".ra.angle")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ra.angle.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                          </div>
                          {/* =========radiant white end */}

                          {/* =========asscher white start */}
                          <div
                            className={`asscher-shape-img default-img white-common
                       ${shapeProduct === "as" ? "active" : ""}`}
                          >
                            <div className={`asscher-common asscher-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".as.side")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.as.side.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`asscher-common asscher-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".as.set")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.as.set.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`asscher-common asscher-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".as.angle")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.as.angle.jpg`}
                                alt={filterData.product?.name}
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
                            <div className={`marquise-common marquise-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".mq.side")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.mq.side.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`marquise-common marquise-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".mq.set")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.mq.set.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`marquise-common marquise-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".mq.angle")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.mq.angle.jpg`}
                                alt={filterData.product?.name}
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
                            <div className={`emerald-common emerald-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".em.side")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.em.side.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`emerald-common emerald-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".em.set")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.em.set.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`emerald-common emerald-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".em.angle")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.em.angle.jpg`}
                                alt={filterData.product?.name}
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
                            <div className={`Oval-common Oval-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".ov.side")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ov.side.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Oval-common Oval-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".ov.set")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ov.set.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Oval-common Oval-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".ov.angle")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ov.angle.jpg`}
                                alt={filterData.product?.name}
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
                            <div className={`Round-common Round-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".rd.side")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.rd.side.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Round-common Round-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".rd.set")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.rd.set.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Round-common Round-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".rd.angle")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.rd.angle.jpg`}
                                alt={filterData.product?.name}
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
                            <div className={`Cushion-common Cushion-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".cu.side")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.cu.side.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Cushion-common Cushion-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".cu.set")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.cu.set.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Cushion-common Cushion-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".cu.angle")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.cu.angle.jpg`}
                                alt={filterData.product?.name}
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
                            <div className={`Pear-common Pear-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".pe.side")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.pe.side.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Pear-common Pear-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".pe.set")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.pe.set.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Pear-common Pear-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".pe.angle")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.pe.angle.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                          </div>
                          {/* =========Pear white end */}
                          {/* default with video start */}
                          {!shapeProduct && (
                            <div className="white default-img">
                              <div>
                                <img
                                  width="auto"
                                  height="auto"
                                  onClick={() => onchangeThumbnail(".jpg")}
                                  src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.jpg`}
                                  alt={filterData.product?.name}
                                  onError={handleImgError}
                                />
                              </div>
                              <div>
                                <img
                                  width="auto"
                                  height="auto"
                                  onClick={() => onchangeThumbnail(".side")}
                                  src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.side.jpg`}
                                  alt={filterData.product?.name}
                                  onError={handleImgError}
                                />
                              </div>
                              <div>
                                <img
                                  width="auto"
                                  height="auto"
                                  onClick={() => onchangeThumbnail(".set")}
                                  src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.set.jpg`}
                                  alt={filterData.product?.name}
                                  onError={handleImgError}
                                />
                              </div>
                            </div>
                          )}

                          {/* default white img end */}
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
                            <div className={`heart-common he-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".he.side.alt")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.he.side.alt.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`heart-common he-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".he.set.alt")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.he.set.alt.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`heart-common he-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".he.angle.alt")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.he.angle.alt.jpg`}
                                alt={filterData.product?.name}
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
                            <div className={`radiant-common radiant-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".ra.side.alt")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ra.side.alt.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`radiant-common radiant-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".ra.set.alt")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ra.set.alt.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`radiant-common radiant-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".ra.angle.alt")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ra.angle.alt.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                          </div>
                          {/* =========radiant yellow end */}

                          {/* =========asscher yellow start */}
                          <div
                            className={`asscher-shape-img default-img yellow-common
                       ${shapeProduct === "as" ? "active" : ""}`}
                          >
                            <div className={`asscher-common asscher-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".as.side.alt")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.as.side.alt.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`asscher-common asscher-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".as.set.alt")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.as.set.alt.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`asscher-common asscher-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".as.angle.alt")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.as.angle.alt.jpg`}
                                alt={filterData.product?.name}
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
                            <div className={`marquise-common marquise-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".mq.side.alt")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.mq.side.alt.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`marquise-common marquise-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".mq.set.alt")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.mq.set.alt.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`marquise-common marquise-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".mq.angle.alt")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.mq.angle.alt.jpg`}
                                alt={filterData.product?.name}
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
                            <div className={`emerald-common emerald-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".em.side.alt")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.em.side.alt.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`emerald-common emerald-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".em.set.alt")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.em.set.alt.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`emerald-common emerald-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".em.angle.alt")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.em.angle.alt.jpg`}
                                alt={filterData.product?.name}
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
                            <div className={`Oval-common Oval-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".ov.side.alt")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ov.side.alt.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Oval-common Oval-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".ov.set.alt")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ov.set.alt.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Oval-common Oval-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".ov.angle.alt")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ov.angle.alt.jpg`}
                                alt={filterData.product?.name}
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
                            <div className={`Round-common Round-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".rd.side.alt")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.rd.side.alt.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Round-common Round-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".rd.set.alt")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.rd.set.alt.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Round-common Round-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".rd.angle.alt")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.rd.angle.alt.jpg`}
                                alt={filterData.product?.name}
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
                            <div className={`Cushion-common Cushion-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".cu.side.alt")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.cu.side.alt.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Cushion-common Cushion-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".cu.set.alt")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.cu.set.alt.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Cushion-common Cushion-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".cu.angle.alt")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.cu.angle.alt.jpg`}
                                alt={filterData.product?.name}
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
                            <div className={`Pear-common Pear-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".pe.side.alt")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.pe.side.alt.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Pear-common Pear-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".pe.set.alt")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.pe.set.alt.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Pear-common Pear-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".pe.angle.alt")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.pe.angle.alt.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                          </div>
                          {/* =========Pear yellow end */}

                          {/* default with video img start white*/}
                          {!shapeProduct && (
                            <div className="yellow default-img">
                              <div>
                                <img
                                  width="auto"
                                  height="auto"
                                  onClick={() => onchangeThumbnail(".alt")}
                                  src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.alt.jpg`}
                                  alt={filterData.product?.name}
                                  onError={handleImgError}
                                />
                              </div>
                              <div>
                                <img
                                  width="auto"
                                  height="auto"
                                  onClick={() => onchangeThumbnail(".side.alt")}
                                  src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.side.alt.jpg`}
                                  alt={filterData.product?.name}
                                  onError={handleImgError}
                                />
                              </div>
                              <div>
                                <img
                                  width="auto"
                                  height="auto"
                                  onClick={() => onchangeThumbnail(".set.alt")}
                                  src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.set.alt.jpg`}
                                  alt={filterData.product?.name}
                                  onError={handleImgError}
                                />
                              </div>
                            </div>
                          )}

                          {/* default img start */}
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
                            <div className={`heart-common he-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".he.side.alt1")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.he.side.alt1.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`heart-common he-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".he.set.alt1")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.he.set.alt1.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`heart-common he-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".he.angle.alt1")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.he.angle.alt1.jpg`}
                                alt={filterData.product?.name}
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
                            <div className={`radiant-common radiant-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".ra.side.alt1")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ra.side.alt1.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`radiant-common radiant-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".ra.set.alt1")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ra.set.alt1.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`radiant-common radiant-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".ra.angle.alt1")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ra.angle.alt1.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                          </div>
                          {/* =========radiant rose end */}

                          {/* =========asscher rose start */}
                          <div
                            className={`asscher-shape-img default-img rose-common
                       ${shapeProduct === "as" ? "active" : ""}`}
                          >
                            <div className={`asscher-common asscher-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".as.side.alt1")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.as.side.alt1.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`asscher-common asscher-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".as.set.alt1")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.as.set.alt1.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`asscher-common asscher-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".as.angle.alt1")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.as.angle.alt1.jpg`}
                                alt={filterData.product?.name}
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
                            <div className={`marquise-common marquise-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".mq.side.alt1")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.mq.side.alt1.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`marquise-common marquise-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".mq.set.alt1")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.mq.set.alt1.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`marquise-common marquise-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".mq.angle.alt1")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.mq.angle.alt1.jpg`}
                                alt={filterData.product?.name}
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
                            <div className={`emerald-common emerald-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".em.side.alt1")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.em.side.alt1.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`emerald-common emerald-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".em.set.alt1")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.em.set.alt1.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`emerald-common emerald-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".em.angle.alt1")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.em.angle.alt1.jpg`}
                                alt={filterData.product?.name}
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
                            <div className={`Oval-common Oval-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".ov.side.alt1")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ov.side.alt1.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Oval-common Oval-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".ov.set.alt1")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ov.set.alt1.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Oval-common Oval-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".ov.angle.alt1")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ov.angle.alt1.jpg`}
                                alt={filterData.product?.name}
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
                            <div className={`Round-common Round-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".rd.side.alt1")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.rd.side.alt1.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Round-common Round-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".rd.set.alt1")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.rd.set.alt1.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Round-common Round-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".rd.angle.alt1")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.rd.angle.alt1.jpg`}
                                alt={filterData.product?.name}
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
                            <div className={`Cushion-common Cushion-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".cu.side.alt1")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.cu.side.alt1.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Cushion-common Cushion-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".cu.set.alt1")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.cu.set.alt1.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Cushion-common Cushion-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".cu.angle.alt1")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.cu.angle.alt1.jpg`}
                                alt={filterData.product?.name}
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
                            <div className={`Pear-common Pear-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".pe.side.alt1")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.pe.side.alt1.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Pear-common Pear-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".pe.set.alt1")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.pe.set.alt1.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Pear-common Pear-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() =>
                                  onchangeThumbnail(".pe.angle.alt1")
                                }
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.pe.angle.alt1.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                          </div>
                          {/* =========Pear rose end */}
                          {/* default with video start */}
                          {!shapeProduct && (
                            <div className="rose default-img">
                              <div>
                                <img
                                  width="auto"
                                  height="auto"
                                  onClick={() => onchangeThumbnail(".alt1")}
                                  src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.alt1.jpg`}
                                  alt={filterData.product?.name}
                                  onError={handleImgError}
                                />
                              </div>
                              <div>
                                <img
                                  width="auto"
                                  height="auto"
                                  onClick={() =>
                                    onchangeThumbnail(".side.alt1")
                                  }
                                  src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.side.alt1.jpg`}
                                  alt={filterData.product?.name}
                                  onError={handleImgError}
                                />
                              </div>
                              <div>
                                <img
                                  width="auto"
                                  height="auto"
                                  onClick={() => onchangeThumbnail(".set.alt1")}
                                  src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.set.alt1.jpg`}
                                  alt={filterData.product?.name}
                                  onError={handleImgError}
                                />
                              </div>
                            </div>
                          )}

                          {/* default img start */}
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
                            <div className={`heart-common he-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".he.side")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.he.side.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`heart-common he-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".he.set")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.he.set.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`heart-common he-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".he.angle")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.he.angle.jpg`}
                                alt={filterData.product?.name}
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
                            <div className={`radiant-common radiant-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".ra.side")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ra.side.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`radiant-common radiant-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".ra.set")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ra.set.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`radiant-common radiant-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".ra.angle")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ra.angle.jpg`}
                                alt={filterData.product?.name}
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
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".as.side")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.as.side.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`asscher-common asscher-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".as.set")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.as.set.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`asscher-common asscher-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".as.angle")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.as.angle.jpg`}
                                alt={filterData.product?.name}
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
                            <div className={`marquise-common marquise-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".mq.side")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.mq.side.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`marquise-common marquise-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".mq.set")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.mq.set.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`marquise-common marquise-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".mq.angle")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.mq.angle.jpg`}
                                alt={filterData.product?.name}
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
                            <div className={`emerald-common emerald-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".em.side")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.em.side.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`emerald-common emerald-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".em.set")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.em.set.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`emerald-common emerald-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".em.angle")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.em.angle.jpg`}
                                alt={filterData.product?.name}
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
                            <div className={`Oval-common Oval-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".ov.side")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ov.side.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Oval-common Oval-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".ov.set")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ov.set.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Oval-common Oval-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".ov.angle")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.ov.angle.jpg`}
                                alt={filterData.product?.name}
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
                            <div className={`Round-common Round-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".rd.side")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.rd.side.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Round-common Round-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".rd.set")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.rd.set.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Round-common Round-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".rd.angle")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.rd.angle.jpg`}
                                alt={filterData.product?.name}
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
                            <div className={`Cushion-common Cushion-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".cu.side")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.cu.side.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Cushion-common Cushion-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".cu.set")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.cu.set.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Cushion-common Cushion-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".cu.angle")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.cu.angle.jpg`}
                                alt={filterData.product?.name}
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
                            <div className={`Pear-common Pear-side `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".pe.side")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.pe.side.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Pear-common Pear-set `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".pe.set")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.pe.set.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                            <div className={`Pear-common Pear-angle `}>
                              <img
                                width="auto"
                                height="auto"
                                onError={handleError}
                                onClick={() => onchangeThumbnail(".pe.angle")}
                                src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.pe.angle.jpg`}
                                alt={filterData.product?.name}
                              />
                            </div>
                          </div>
                          {/* =========Pear platinum end */}

                          {/* default with video start */}
                          {!shapeProduct && (
                            <div className="platinum default-img">
                              <div>
                                <img
                                  width="auto"
                                  height="auto"
                                  onClick={() => onchangeThumbnail(".jpg")}
                                  src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.jpg`}
                                  alt={filterData.product?.name}
                                  onError={handleImgError}
                                />
                              </div>
                              <div>
                                <img
                                  width="auto"
                                  height="auto"
                                  onClick={() => onchangeThumbnail(".side")}
                                  src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.side.jpg`}
                                  alt={filterData.product?.name}
                                  onError={handleImgError}
                                />
                              </div>
                              <div>
                                <img
                                  width="auto"
                                  height="auto"
                                  onClick={() => onchangeThumbnail(".set")}
                                  src={`${imgBaseUrl}/${filterData.imgUrl}/${filterData.imgUrl}.set.jpg`}
                                  alt={filterData.product?.name}
                                  onError={handleImgError}
                                />
                              </div>
                            </div>
                          )}

                          {/* default platinum img end */}
                        </div>
                        {/* common image platinum end */}
                      </div>
                      {filterData.product?.videos && (
                        <div className="main-svg-icon-video">
                          <div
                            className={`svg-video ${
                              changeClick === white ? "active" : ""
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onChangeClick(
                                filterData.product?.sku,
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
                              onError={handleError}
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
                                filterData.product?.sku,
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
                              onError={handleError}
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
                                filterData.product?.sku,
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
                              onError={handleError}
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
                                filterData.product?.sku,
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
                              onError={handleError}
                              src="https://www.overnightmountings.com//js/videoplayer/images/rotatingnew.gif"
                              alt={filterData.product?.name}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="singleProduct-text">
                    <h4>{filterData.product?.name}</h4>

                    <span>
                      <p>{filterData.product?.description}</p>
                    </span>

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
                              filterData.product?.sku,
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
                              filterData.product?.sku,
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
                              filterData.product?.sku,
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
                              filterData.product?.sku,
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

                    {
                             
                             filterData.product?.SideDiamondNumber > 0 &&    (
                              filterData.product?.variants.length > 0 ? (
                           
                                                 <div className="Diamond-Original-main  Setting-Carat Variation">
                                                  <span className="bold full-width">
                                                     Setting Carat Weight (setting only) : <span className="bold-650">
                                                     {
                                                              <span>{changeOverVariation ? `${changeOverVariation} ct tw `: filterData.product?.fractionsemimount }  </span>
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
                                                                 onMouseEnter={() => onChangeOverVariation(fraction)}
                           
                                                               
                                                     onMouseOut={() => onChangeOverVariation( )}
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
                                               )
                           
                              )
                                                  }

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
                              filterData.product?.sku,
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
                              filterData.product?.sku,
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
                        <div class="bold">Price : </div>
                        <div class="unbold">
                          ${Math.round(diamondType?.price)}
                        </div>
                      </div>
                    ) : (
                      <div className="detail-price">
                        <div class="bold">Price : </div>
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
                       
                       
                       <Link href="/ring-sizer">
                       <span>

                            <IoInformationCircleOutline />
                       </span>
                       
                       <span> Size :{" "}</span>
                       </Link>
                    </span>
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
                    {filterData.product?.white_gold_price > 0 ||
                    filterData.product?.rose_gold_price > 0 ||
                    filterData.product?.yellow < 0 ||
                    filterData.product?.platinum_price > 0 ? (
                      <div className="choose-btnn">
                        <Link
                          href={"/cart"}
                          onClick={(e) => {
                            if (!selectedOption) {
                              e.preventDefault();
                              document.getElementById(
                                "error-message"
                              ).innerText = "Please select a ring size.";
                            } else {
                              handleCreateAccount(
                                diamondType?.diamond_type === "lab_grown"
                                  ? diamondType?.price
                                  : changeClick === white
                                  ? filterData.product?.white_gold_price
                                  : changeClick === yellow
                                  ? filterData.product?.yellow_gold_price
                                  : changeClick === rose
                                  ? filterData.product?.rose_gold_price
                                  : filterData.product?.platinum_price,
                                filterData.product?.id,
                                filterData.product,
                                filterData.product?.internal_sku,
                                listColor,
                                user_id,
                                "matching_set",
                                diamondTypeClick,
                                selectedOption,
                                textEngraving,
                                selectedFontStyleOption
                              );
                            }
                          }}
                          className="ChooseSetting btn-custom"
                        >
                          Add to Bag
                        </Link>

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
                                      ).innerText =
                                        "Please select a ring size.";
                                    } else {
                                      handleWishlist(
                                        filterData.product,
                                        "matching_set",
                                        user_id,
                                        filterData.product?.id,
                                        changeClick,
                                        filterData.imgUrl,
                                        diamondType?.diamond_type ===
                                          "lab_grown"
                                          ? diamondType?.price
                                          : changeClick === white
                                          ? filterData.product?.white_gold_price
                                          : changeClick === yellow
                                          ? filterData.product
                                              ?.yellow_gold_price
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
                                      "matching_set",
                                      user_id,
                                      filterData.product?.id,
                                      changeClick,
                                      filterData.imgUrl,
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
                    ) : (
                      <span className="product-not-available">
                        product is not available{" "}
                        <Link href="/wedding-band">
                          Choose Another Wedding-band
                        </Link>
                      </span>
                    )}

                    <div className="contact-us-btn shipping-add">
                      {" "}
                      Still can’t find your perfect ring?{" "} Send us a
                      <Link href="/custom-concierge"> customization </Link> request

                    </div>

                    <div className="shipping-add">
                      <ul>
                        <li>
                          <RiTruckLine />
                        </li>
                        <li>
                          <Link href="#">Free Shipping, Free 30 Day Returns</Link>
                        </li>
                      </ul>

                      <div className="order-data">
                        <span>
                          <FaRegCalendarAlt />
                        </span>
                        <p>
                          {" "}
                          Order now and your order ships by {currentDay}{" "}
                          {currentMonth} {currentYear}, {formattedDate}{" "}
                          depending on center diamond.
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
                                href="javascript:void(0);"
                                onClick={() => handleClick(item, undefined)}
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
                            href="javascript:void(0);"
                            onClick={() =>
                              handleClick(undefined, "matching_set")
                            }
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
                          targetId="wishId"
                        />
                      </div>
                    </div>

                    {/* ===================== */}
                    <div className="detail-accordian">
                      <div className="item" key={index}>
                        <div className="title" onClick={() => toggle(index)}>
                          <div>
                            <span>Matching Band Details</span>
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
                            <span>BAND INFORMATION</span>
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
                          </div>
                        </div>
                      </div>
                    </div>

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
                                          onError={handleError}
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
                                          onError={handleError}
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
                                          onError={handleError}
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
                                          onError={handleError}
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
};
