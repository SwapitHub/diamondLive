"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useMemo, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import secureLocalStorage from "react-secure-storage";
import SlickSlider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { v4 as uuidv4 } from "uuid";

import LoaderSpinner from "@/app/_componentStatic/LoaderSpinner";
import { Tabbing } from "@/app/_componentStatic/Tabbing";
import { UserContext } from "@/app/context/UserContext";
import { productList } from "../../../../../store/actions/productActions";
import {
  addToWishlist,
  removeToWishlist,
} from "../../../../../store/actions/wishlistAction";
import Cookies from "js-cookie";

export const ChooseGemstonesPage = ({ gemAttribute, gemFilter,gemstoneFilterData, data, gemCount }) => {
  const gemSlug = useSearchParams();
  let gemColor;
  let gemStyle;
  let gemShape;

  useEffect(() => {
    if (gemAttribute === "style") {
      gemStyle = gemFilter;
    } else if (gemAttribute === "color") {
      gemColor = gemFilter;
    } else if (gemAttribute === "shape") {
      gemShape = gemFilter;
    }
  }, [gemAttribute]);

  const gemstoneColor = gemSlug.get("gemstones");



  const history = useRouter();
  const { baseUrl, imgAssetsUrl } = useContext(UserContext);
  const [removeWishList, setRemoveWishList] = useState(null);
  const wishListDataBase = useSelector((state) => state.productDataWishlist);
  const pageSize = 30;

  //  end all bread crumb

  let gemStyleSlider = "";
  if (gemStyle) {
    gemStyleSlider = `&gem_type[]=${
      gemStyle?.slice(0, 1).toUpperCase() + gemStyle?.slice(1)
    }`;
  }

  let gemColorSlider = "";
  if (gemColor) {
    gemColorSlider = `&color[]=${
      gemColor?.slice(0, 1).toUpperCase() + gemColor?.slice(1)
    }`;
  }

  let gemShapeSlider = "";
  if (gemShape) {
    gemShapeSlider = `&shapes[]=${
      gemShape?.slice(0, 1).toUpperCase() + gemShape?.slice(1)
    }`;
  }

  const gemStyleUrl = gemStyle?.split(" ");
  const [styleDataSlider, setStyleDataSlider] = useState([]);
  useEffect(() => {
    if (gemStyle !== null) {
      setStyleDataSlider(gemStyleUrl);
    }
  }, []);

  const [menuStyleNames, setMenuStyleNames] = useState();

  const [colorDataSlider, setColorDataSlider] = useState();

  function capitalizeFirstLetter(str) {
    if (typeof str !== "string" || str.length === 0) {
      return "";
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  useEffect(() => {
    if (gemStyle) {
      secureLocalStorage.setItem(
        "styleDataSlider",
        JSON.stringify([capitalizeFirstLetter(gemStyle)])
      );
      secureLocalStorage.removeItem("shapeDataSlider");
      secureLocalStorage.removeItem("colorDataSlider");
    }
    if (gemShape) {
      secureLocalStorage.setItem(
        "shapeDataSlider",
        JSON.stringify([capitalizeFirstLetter(gemShape)])
      );
      secureLocalStorage.removeItem("styleDataSlider");
      secureLocalStorage.removeItem("colorDataSlider");
    }
    if (gemColor) {
      secureLocalStorage.setItem(
        "colorDataSlider",
        JSON.stringify([capitalizeFirstLetter(gemColor)])
      );
      secureLocalStorage.removeItem("shapeDataSlider");
      secureLocalStorage.removeItem("styleDataSlider");
    }
  }, [gemStyle, gemShape, gemColor]);

  const [shapeDataSlider, setShapeDataSlider] = useState();

  const dispatch = useDispatch();
  const user_id = secureLocalStorage.getItem("formData");
  const gemstone = "gemstone";

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleShapeClick = (styleItem) => {
    let updatedShapeDataSlider = [...shapeDataSlider];

    if (shapeDataSlider?.includes(styleItem)) {
      updatedShapeDataSlider = shapeDataSlider.filter(
        (item) => item !== styleItem
      );
      const searchParams = useSearchParams();
      searchParams.delete("shape");
      const newSearchString = searchParams.toString();
      const newURL = `${"/gemstones/start-with-a-gemstone"}${
        newSearchString ? `?${newSearchString}` : ""
      }`;
      history.replace(newURL);
    } else {
      updatedShapeDataSlider = [...shapeDataSlider, styleItem];
    }

    // Update state
    setShapeDataSlider(updatedShapeDataSlider);

    // Save to local storage
    secureLocalStorage.setItem(
      "shapeDataSlider",
      JSON.stringify(updatedShapeDataSlider)
    );
  };

  const newShapeSliderData = shapeDataSlider
    ?.map(
      (style) =>
        `&shapes[]=${style?.slice(0, 1).toUpperCase() + style?.slice(1)}`
    )
    .join("");
  // Read from local storage on component mount
  const [gemStyles_uses, setGemStyles_uses] = useState("");
  useEffect(() => {
    const storedStyleData = Cookies.get("gemShape");
    const storedShapeData = secureLocalStorage.getItem("shapeDataSlider");
    const storedColorData = secureLocalStorage.getItem("colorDataSlider");

    const parsedStyleData = storedStyleData ? JSON.parse(storedStyleData) : [];
    const parsedShapeData = storedShapeData ? JSON.parse(storedShapeData) : [];
    const parsedColorData = storedColorData ? JSON.parse(storedColorData) : [];

    setMenuStyleNames(parsedStyleData);
    setShapeDataSlider(parsedShapeData);
    setColorDataSlider(parsedColorData);
  }, [gemStyle, gemShape, gemColor]);

  const handelSettingStyle = (styleItem) => {
        
    let updatedStyleDataSlider = [...menuStyleNames];

    if (menuStyleNames?.includes(styleItem)) {
      updatedStyleDataSlider = menuStyleNames.filter(
        (item) => item !== styleItem
      );
      // const searchParams = useSearchParams();
      // searchParams.delete("style");
      // const newSearchString = searchParams.toString();
      // const newURL = `${"/gemstones/start-with-a-gemstone"}${
      //   newSearchString ? `?${newSearchString}` : ""
      // }`;
      // history.replace(newURL);
    } else {
      updatedStyleDataSlider = [...menuStyleNames, styleItem];
    }

    setMenuStyleNames(updatedStyleDataSlider);
    Cookies.set('gemShape',  JSON.stringify(updatedStyleDataSlider));
    
    window.location.reload();
  };

  const newStyleSliderData = menuStyleNames
    ?.map(
      (style) =>
        `&gem_type[]=${style.slice(0, 1).toUpperCase() + style.slice(1)}`
    )
    .join("");


  const handleColor = (color) => {
    let updatedColorDataSlider = [...colorDataSlider];

    if (colorDataSlider.includes(color)) {
      updatedColorDataSlider = colorDataSlider.filter((item) => item !== color);
      const searchParams = useSearchParams();
      searchParams.delete("color");
      const newSearchString = searchParams.toString();
      const newURL = `${"/gemstones/start-with-a-gemstone"}${
        newSearchString ? `?${newSearchString}` : ""
      }`;
      history.replace(newURL);
    } else {
      updatedColorDataSlider = [...colorDataSlider, color];
    }

    // Update state
    setColorDataSlider(updatedColorDataSlider);

    // Save to local storage
    secureLocalStorage.setItem(
      "colorDataSlider",
      JSON.stringify(updatedColorDataSlider)
    );
  };

  const newColorSliderData = colorDataSlider
    ?.map(
      (style) => `&color[]=${style.slice(0, 1).toUpperCase() + style.slice(1)}`
    )
    .join("");

  // const fetchDataGem = useMemo(
  //   () => async () => {
  //     const url = `https://apiservices.vdbapp.com//v2/gemstones?markup_mode=true&page_number=${page}${
  //       gemStyleSlider ? gemStyleSlider : ""
  //     }${newStyleSliderData ? newStyleSliderData : ""}${
  //       newColorSliderData ? newColorSliderData : ""
  //     }${gemColorSlider ? gemColorSlider : ""}${
  //       newShapeSliderData ? newShapeSliderData : ""
  //     }${gemShapeSlider ? gemShapeSlider : ""}`;

  //     const params = {
  //       stock_item_type: "gemstones",
  //       status: "pending",
  //       page_number: page,
  //       page_size: pageSize,
  //     };

  //     const headers = {
  //       Authorization:
  //         "Token token=CX7r3wiul169qAGnMjzlZm8iEpJIMAgks_IgGD0hywg, api_key=_amT48wMLQ3rh4SP1inCzRQ",
  //     };

  //     try {
  //       setLoading(true);
  //       const response = await axios.get(url, { params, headers });
  //       if (response.status === 200) {
  //         if (page === 1) {
  //           setData(response.data.response.body.gemstones);
  //         } else {
  //           setData((prevData) => [
  //             ...prevData,
  //             ...response.data.response.body.gemstones,
  //           ]);
  //         }
  //         setGemCount(response.data.response.body);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   [
  //     page,
  //     gemStyleSlider,
  //     newStyleSliderData,
  //     gemColorSlider,
  //     newColorSliderData,
  //     gemShapeSlider,
  //     newShapeSliderData,
  //   ]
  // );

  // Call the memoized fetchData function inside useEffect
  // useMemo(() => {
  //   fetchDataGem();
  // }, [fetchDataGem]);

  // useEffect(() => {
  //   setPage(1);
  // }, [
  //   gemStyleSlider,
  //   newStyleSliderData,
  //   gemColorSlider,
  //   newColorSliderData,
  //   gemShapeSlider,
  //   newShapeSliderData,
  // ]);

  // Scroll pagination start
  useEffect(() => {
    const handleInfiniteScroll = () => {
      try {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        const totalPagesNeeded = Math.ceil(
          gemCount.total_gemstones_found / pageSize
        );

        if (
          scrollTop + clientHeight >= 0.7 * scrollHeight &&
          !loading &&
          page < totalPagesNeeded
        ) {
          setPage((prev) => prev + 1);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (page * pageSize < gemCount.total_gemstones_found && !loading) {
      window.addEventListener("scroll", handleInfiniteScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, [loading]);
  // Scroll pagination end

  const style = "style";
  const moreFilter = "moreFilter";
  const [gemstones, setGemstone] = useState(gemstoneColor ? moreFilter : style);
  const GemstonesProduct = (style) => {
    setGemstone(style);
  };
  const gemstonesStyleSlider = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };
  const gemstonesStyleSliderDesktop = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };
  const moreGemstoneSlider = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };
  const moreGemstoneSliderColor = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };

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
    dispatch(addToWishlist(newItem));

    const formData = {
      user_id: user_id,
      product_type: product_type,
      gemstone_id: gemstone_id,
      gemstone_price: gemstone_price,
      gemstone_stock_no: gemstone_stock,
    };

    const urlNew = `${baseUrl}/add_to_wishlist?user_id=${formData.user_id}&product_type=${formData.product_type}&gemstone_price=${formData.gemstone_price}&gemstone_id=${formData.gemstone_id}&gemstone_stock_no=${formData.gemstone_stock_no}`;
    axios
      .get(urlNew)
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
    const removeWishlist = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/remove_wishlist_item/${removeWishList}`
        );
        dispatch(productList());
      } catch (error) {
        console.log("remove_wishlist_item API Error:", error);
      }
    };

    removeWishlist();
  }, [removeWishList]);

  function handleWishlistRemove(belowItem) {
    wishlist.forEach((item) => {
      if (belowItem?.id === item.item?.id) {
        dispatch(removeToWishlist(item));
      }
    });

    // Iterate over the values array
    wishListDataBase.forEach((item) => {
      if (belowItem?.stock_num === item?.gemstone_id) {
        setRemoveWishList(item?.id);
      }
    });
  }

  // loader
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoader(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const handleRemoveStyle = (slug) => {
    setMenuStyleNames((prevSelectedStyles) => {
      const updatedStyles = prevSelectedStyles.filter(
        (selectedStyle) => selectedStyle !== slug
      );

      // Update secureLocalStorage with the new array
      secureLocalStorage.setItem(
        "styleDataSlider",
        JSON.stringify(updatedStyles)
      );
      // if (menuStyleNames?.includes(gemStyle)) {

      const searchParams = useSearchParams();
      searchParams.delete("style");
      const newSearchString = searchParams.toString();
      const newURL = `${"/gemstones/start-with-a-gemstone"}${
        newSearchString ? `?${newSearchString}` : ""
      }`;
      history.replace(newURL);
      // }
      return updatedStyles;
    });
  };

  const handleRemoveShape = (shape) => {
    setShapeDataSlider((prevSelectedStyles) => {
      const updatedStyles = prevSelectedStyles.filter(
        (selectedStyle) => selectedStyle !== shape
      );

      // Update secureLocalStorage with the new array
      secureLocalStorage.setItem(
        "shapeDataSlider",
        JSON.stringify(updatedStyles)
      );
      if (shape == capitalizeFirstLetter(gemShape)) {
        secureLocalStorage.setItem(
          "shapeDataSlider",
          JSON.stringify(updatedStyles)
        );

        const searchParams = useSearchParams();
        searchParams.delete("shape");
        const newSearchString = searchParams.toString();
        const newURL = `${"/gemstones/start-with-a-gemstone"}${
          newSearchString ? `?${newSearchString}` : ""
        }`;
        history.replace(newURL);
      }
      return updatedStyles;
    });
    setShapeDataSlider((prevSelectedStyles) =>
      prevSelectedStyles.filter((selectedShape) => selectedShape !== shape)
    );
    secureLocalStorage.removeItem("shapeDataSlider");
  };

  const handleRemoveColor = (color) => {
    setColorDataSlider((prevSelectedStyles) => {
      const updatedColor = prevSelectedStyles.filter(
        (selectedStyle) => selectedStyle !== color
      );
      // Update secureLocalStorage with the new array
      secureLocalStorage.setItem(
        "colorDataSlider",
        JSON.stringify(updatedColor)
      );

      const searchParams = useSearchParams();
      searchParams.delete("color");
      const newSearchString = searchParams.toString();
      const newURL = `${"/gemstones/start-with-a-gemstone"}${
        newSearchString ? `?${newSearchString}` : ""
      }`;
      history.replace(newURL);

      return updatedColor;
    });
  };

  const handleResetAll = () => {
    setMenuStyleNames([]);
    setColorDataSlider([]);
    setShapeDataSlider([]);
    secureLocalStorage.removeItem("styleDataSlider");
    secureLocalStorage.removeItem("colorDataSlider");
    secureLocalStorage.removeItem("shapeDataSlider");
    const searchParams = useSearchParams();
    searchParams.delete("style");
    searchParams.delete("shape");
    searchParams.delete("color");
    const newSearchString = searchParams.toString();
    const newURL = `${"/gemstones/start-with-a-gemstone"}${
      newSearchString ? `?${newSearchString}` : ""
    }`;
    history.replace(newURL);
  };
  let wishlistIds = [];
  wishListDataBase.map((item) => {
    wishlistIds.push(parseInt(item.gemstone_stock_no));
  });
  const [filterbutton, setFilterbutton] = useState(false);
  const filter_button = () => {
    setFilterbutton(!filterbutton);
  };

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
      <section className="gemstone-main">
        <div className="container container-1290-list-pages">
          <div className="main-content choose-setting-pages">
            <div>
              <h1 className="center">
                {gemStyle || gemColor || gemShape
                  ? `${gemStyle || ""} ${gemColor || ""} ${
                      gemShape || ""
                    } Gemstone`.trim()
                  : "Design your own Gemstone Engagement Ring."}
              </h1>

              {/* ====================create your ring start */}
              {/* ====================create your ring start */}
              <Tabbing
                gemStoneName={`1. Choose Gemstone`}
                ringName={`2. Choose Rings`}
                gemStoneLink={`javascript:void(0)`}
                ringLink={`/engagement-rings/start-with-a-setting`}
                type={"gemstone"}
              />
              {/* ====================create your ring end */}
              <div className="white-wrapper desktop">
                <div className="lab-diamond-btn">
                  <div
                    className={`shop-by-common ShopByStyle ${
                      gemstones === style ? "gemstone-Active" : ""
                    }`}
                  >
                    <Link
                      href="javascript:void(0)"
                      onClick={() => {
                        GemstonesProduct(style);
                      }}
                    >
                      Shop by Gemstone
                    </Link>
                  </div>

                  <div
                    className={`shop-by-common shop-by-shape ${
                      gemstones === moreFilter ? "gemstone-Active" : ""
                    }`}
                  >
                    <Link
                      href="javascript:void(0)"
                      onClick={() => {
                        GemstonesProduct(moreFilter);
                      }}
                    >
                      More Filters
                    </Link>
                  </div>
                </div>

                {/* shop by style filtering start here */}
                <div
                  className={`shop-by-page-common shop-by-shape-style buttons-container filter-button ${
                    gemstones === style ? "gemstone-active" : ""
                  } `}
                >
                  <SlickSlider
                    {...gemstonesStyleSliderDesktop}
                    responsive={[
                      {
                        breakpoint: 1198,
                        settings: {
                          slidesToShow: 5,
                          slidesToScroll: 1,
                          infinite: true,
                        },
                      },

                      {
                        breakpoint: 768,
                        settings: {
                          slidesToShow: 4,
                          slidesToScroll: 1,
                          infinite: true,
                        },
                      },
                      {
                        breakpoint: 375,
                        settings: {
                          slidesToShow: 3,
                          slidesToScroll: 1,
                          infinite: true,
                        },
                      },
                    ]}
                  >
                    {gemstoneFilterData.gemstones?.map((item) => {
                      return (
                        <>
                          <Link
                            href="javascript:void(0);"
                            onClick={() => handelSettingStyle(item.name)}
                            className={` ${
                              menuStyleNames?.includes(item?.name)
                                ? // menuStyleNames === item?.name
                                  // gemStyles_use === item?.name
                                  "style-active-common"
                                : ""
                            }`}
                          >
                            <div className="shop-style-img">
                              <LazyLoadImage
                                width="auto"
                                height="auto"
                                src={item.image}
                                alt={item.name}
                                onError={handleError}
                              />
                            </div>
                            <div className="shop-style-text">
                              <span className="color-name">{item.name}</span>
                            </div>
                          </Link>
                        </>
                      );
                    })}
                  </SlickSlider>
                </div>
                {/* shop by style filtering  end */}

                {/* shop by Shape filtering  start */}
                <div
                  className={`shop-by-page-common shop-by-shape-page ${
                    gemstones === moreFilter ? "gemstone-Active" : ""
                  } `}
                >
                  <div className="style-main">
                    <div className="corusel-diamond">
                      <span className="corusel-diamond-heading">
                        Setting Style
                      </span>
                      {/* <div className="check-text">
                        <span>Bridal Sets Only</span>
                        <span className="corusel-diamond-checkbox">
                          <form action="">
                            <div class="form-group-diamond">
                              <input type="checkbox" id="html2" />
                              <label for="html2"></label>
                            </div>
                          </form>
                        </span>
                      </div> */}
                    </div>
                    <SlickSlider
                      {...gemstonesStyleSlider}
                      responsive={[
                        {
                          breakpoint: 991,
                          settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1,
                            infinite: true,
                          },
                        },

                        {
                          breakpoint: 800,
                          settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            infinite: true,
                          },
                        },
                        {
                          breakpoint: 375,
                          settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            infinite: true,
                          },
                        },
                      ]}
                    >
                      {gemstoneFilterData.gemstones?.map((item) => {
                        return (
                          <>
                            <Link
                              href="javascript:void(0);"
                              onClick={() => handelSettingStyle(item.name)}
                              className={` ${
                                menuStyleNames?.includes(item?.name)
                                  ? // menuStyleNames === item?.name ||
                                    // gemStyles_use === item?.name
                                    "style-active-common"
                                  : ""
                              }`}
                            >
                              <div className="shop-style-img">
                                <LazyLoadImage
                                  width="auto"
                                  height="auto"
                                  src={item.image}
                                  alt={item.name}
                                  onError={handleError}
                                />
                              </div>
                              <div className="shop-style-text">
                                <span className="color-name">{item.name}</span>
                              </div>
                            </Link>
                          </>
                        );
                      })}
                    </SlickSlider>
                  </div>

                  <div className="color-slider">
                    <span>Gemstone Color</span>
                    <SlickSlider
                      {...moreGemstoneSliderColor}
                      responsive={[
                        {
                          breakpoint: 991,
                          settings: {
                            slidesToShow: 4,
                            slidesToScroll: 1,
                            infinite: true,
                          },
                        },

                        {
                          breakpoint: 800,
                          settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            infinite: true,
                          },
                        },
                        {
                          breakpoint: 375,
                          settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1,
                            infinite: true,
                          },
                        },
                      ]}
                    >
                      {gemstoneFilterData?.gemstone_color?.map((item) => {
                        return (
                          <>
                            <Link
                              href="javascript:void(0)"
                              onClick={() => handleColor(item.name)}
                              className={` ${
                                colorDataSlider?.includes(item?.name)
                                  ? // menuColorNames === item?.name ||
                                    // gemColor_use === item?.name
                                    "style-active-common"
                                  : ""
                              }`}
                            >
                              <div className="diamond-image-slider Gemstone_Color">
                                <LazyLoadImage
                                  width="auto"
                                  height="auto"
                                  src={item.image}
                                  alt={item.name}
                                  onError={handleError}
                                />
                              </div>
                              <div className="shop-style-text">
                                <span className="color-name">{item.name}</span>
                              </div>
                            </Link>
                          </>
                        );
                      })}
                    </SlickSlider>
                  </div>

                  <div className="shape-main">
                    <span>Diamond Shape</span>
                    <SlickSlider
                      {...moreGemstoneSlider}
                      responsive={[
                        {
                          breakpoint: 991,
                          settings: {
                            slidesToShow: 6,
                            slidesToScroll: 3,
                            infinite: true,
                          },
                        },

                        {
                          breakpoint: 768,
                          settings: {
                            slidesToShow: 4,
                            slidesToScroll: 2,
                            infinite: true,
                          },
                        },
                        {
                          breakpoint: 375,
                          settings: {
                            slidesToShow: 3,
                            slidesToScroll: 2,
                            infinite: true,
                          },
                        },
                      ]}
                    >
                      {gemstoneFilterData.gemstone_shape?.map((item) => {
                        return (
                          <>
                            <Link
                              href="javascript:void(0);"
                              onClick={() => handleShapeClick(item?.name)}
                              className={` ${
                                shapeDataSlider?.includes(item?.name)
                                  ? // menuShapeNames == item?.name ||
                                    // gemShape_use == item?.name
                                    "style-active-common"
                                  : ""
                              }`}
                            >
                              <div className="diamond-image-slider">
                                <LazyLoadImage
                                  width="auto"
                                  height="auto"
                                  src={item.image}
                                  alt={item.name}
                                  onError={handleError}
                                />
                              </div>
                              <div className="shop-style-text">
                                <span className="color-name">{item.name}</span>
                              </div>
                            </Link>
                          </>
                        );
                      })}
                    </SlickSlider>
                  </div>
                </div>
              </div>
              {/* shop by Shape filtering  end */}
            </div>
          </div>
          {/* ======mobile filter start========= */}
          <div
            className={`mobile-filters mobile ring-list ${
              filterbutton !== false ? "active" : ""
            }`}
          >
            <div
              className="filter-button-mobile"
              onClick={() => filter_button()}
            >
              Filters
            </div>

            <div
              className={`shop-by-page-common shop-by-shape-page ${
                gemstones === moreFilter ? "gemstone-Active" : ""
              } `}
            >
              <div className="style-main">
                <div className="corusel-diamond">
                  <span className="corusel-diamond-heading">Setting Style</span>
                </div>

                <div className="shop-by-shape-style buttons-container filter-button">
                  {gemstoneFilterData?.gemstones?.map((item) => {
                    return (
                      <>
                        <Link
                          href="javascript:void(0);"
                          onClick={() => handelSettingStyle(item.name)}
                          className={` ${
                            menuStyleNames?.includes(item?.name)
                              ? // menuStyleNames === item?.name ||
                                // gemStyles_use === item?.name
                                "style-active-common"
                              : ""
                          }`}
                        >
                          <div className="shop-style-img">
                            <LazyLoadImage
                              width="auto"
                              height="auto"
                              src={item.image}
                              alt={item.name}
                              onError={handleError}
                            />
                          </div>
                          <div className="shop-style-text">
                            <span className="color-name">{item.name}</span>
                          </div>
                        </Link>
                      </>
                    );
                  })}
                </div>
              </div>

              <div className="color-slider style-main">
                <span>Gemstone Color</span>
                <div className="shop-by-shape-style buttons-container filter-button">
                  {gemstoneFilterData?.gemstone_color?.map((item) => {
                    return (
                      <>
                        <Link
                          href="#"
                          onClick={() => handleColor(item.name)}
                          className={` ${
                            colorDataSlider?.includes(item?.name)
                              ? "style-active-common"
                              : ""
                          }`}
                        >
                          <div className="diamond-image-slider Gemstone_Color">
                            <LazyLoadImage
                              width="auto"
                              height="auto"
                              src={item.image}
                              alt={item.name}
                              onError={handleError}
                            />
                          </div>
                          <div className="shop-style-text">
                            <span className="color-name">{item.name}</span>
                          </div>
                        </Link>
                      </>
                    );
                  })}
                </div>
              </div>

              <div className="shape-main style-main">
                <span>Diamond Shape</span>

                <div className="shop-by-shape-style buttons-container filter-button">
                  {gemstoneFilterData.gemstone_shape?.map((item) => {
                    return (
                      <>
                        <Link
                          href="javascript:void(0);"
                          onClick={() => handleShapeClick(item?.name)}
                          className={` ${
                            shapeDataSlider?.includes(item?.name)
                              ? // menuShapeNames == item?.name ||
                                // gemShape_use == item?.name
                                "style-active-common"
                              : ""
                          }`}
                        >
                          <div className="diamond-image-slider">
                            <LazyLoadImage
                              width="auto"
                              height="auto"
                              src={item.image}
                              alt={item.name}
                              onError={handleError}
                            />
                          </div>
                          <div className="shop-style-text">
                            <span className="color-name">{item.name}</span>
                          </div>
                        </Link>
                      </>
                    );
                  })}
                </div>
              </div>

              <div
                className="filter-button-mobile view-results"
                onClick={() => filter_button()}
              >
                VIEW RESULTS
              </div>
            </div>
          </div>

          {/* ======mobile filter end========= */}

          <div className="best-seller-main">
            <span>{gemCount?.total_gemstones_found} Colored Gemstones</span>

            {/* <div className="best-seller">
              <form>
                <label for="#">Sort : </label>
                <select name="sort-price" id="sort">
                  <option value="best_seller">Best Sellers</option>
                  <option value="Newest">Newest</option>
                  <option value="low_to_high">Price (Low to High)</option>
                  <option value="high_to_low">Price (High to Low)</option>
                </select>
              </form>
            </div> */}
          </div>
          <div className="bredCramStyleFilter">
            {menuStyleNames?.map((item) => (
              <div className={`breadCram `}>
                <Link
                  href="javascript:void(0)"
                  onClick={() => handleRemoveStyle(item)}
                >
                  {`Style ` + item}
                  <span>
                    <IoClose />
                  </span>
                </Link>
              </div>
            ))}
            {colorDataSlider?.map((item) => (
              <div className={`breadCram `}>
                <Link
                  href="javascript:void(0)"
                  onClick={() => handleRemoveColor(item)}
                >
                  {`Color ` + item}
                  <span>
                    <IoClose />
                  </span>
                </Link>
              </div>
            ))}
            {shapeDataSlider?.map((item) => (
              <div className="breadCram">
                <Link
                  href="javascript:void(0)"
                  onClick={() => handleRemoveShape(item)}
                >
                  {`Shape ` + item}{" "}
                  <span>
                    <IoClose />
                  </span>
                </Link>
              </div>
            ))}
            {(shapeDataSlider?.length > 0 ||
              colorDataSlider?.length > 0 ||
              menuStyleNames?.length > 0) && (
              <div className="breadCram">
                <Link
                  href="javascript:void(0)"
                  onClick={() => handleResetAll()}
                >
                  Reset All{" "}
                  <span>
                    <IoClose />
                  </span>
                </Link>
              </div>
            )}
          </div>
          {(
            <div className="gemstone-inners">
              {data.map((item) => {
                return (
                  <>
                    {item.image_url !== null && (
                      <div className="gemstone-inner-main">
                        <Link
                          href={`/gemstones-detail/?stock_num=${item.stock_num}`}
                        >
                          <div className="diamoond-gems">
                            <LazyLoadImage
                              width="auto"
                              height="auto"
                              className="lazy-image"
                              src={item.image_url}
                              alt={item?.short_title}
                              onError={handleError}
                            />
                            <div className="dia-gems">
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
                                        gemstone,
                                        item.stock_num,
                                        item.total_sales_price,
                                        item.id
                                      );
                                    }}
                                  />
                                )
                              ) : beforeLoginWishlistIds.includes(item?.id) ? (
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
                                      gemstone,
                                      item.stock_num,
                                      item.total_sales_price,
                                      item.id
                                    );
                                  }}
                                />
                              )}
                            </div>
                          </div>
                          <div className="gems-limit">
                            <Link href={`/gemstones-detail/?stock_num=${item.stock_num}`}>
                              <span> {item.short_title}</span>
                            </Link>
                            <span className="product-price">
                              ${Math.round(item.total_sales_price)}
                            </span>
                          </div>
                        </Link>
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          )}
          {loading && <LoaderSpinner />}
          {data.length < 1 && (
            <h2 className="center">{loading ? null : "Data Not Found"}</h2>
          )}
        </div>
      </section>
    </>
  );
};
