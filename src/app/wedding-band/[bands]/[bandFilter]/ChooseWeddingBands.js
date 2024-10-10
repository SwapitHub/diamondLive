"use client";
import LoaderSpinner from "@/app/_componentStatic/LoaderSpinner";
import { UserContext } from "@/app/context/UserContext";
import axios from "axios";
import $ from "jquery";
import Cookies from "js-cookie";
import debounce from "lodash.debounce";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import secureLocalStorage from "react-secure-storage";
import Select from "react-select";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { v4 as uuidv4 } from "uuid";
import { productList } from "../../../../../store/actions/productActions";
import {
  addToWishlist,
  removeToWishlist,
} from "../../../../../store/actions/wishlistAction";

const ChooseWeddingBands = ({
  weddingBands,
  metalColor,
  filterRoseDataServer,
  newPrevDataServer,
}) => {
  const wishListDataBase = useSelector((state) => state.productDataWishlist);
  const [removeWishList, setRemoveWishList] = useState();
  const dispatch = useDispatch();
  const router = useRouter();

  const queryParams = useSearchParams();
  const menuShapeName = queryParams.get("shape");
  const menuShopStyle = queryParams.get("style");
  const diamond_origin = queryParams?.get("diamond_origin");
  const user_id = secureLocalStorage.getItem("formData");
  const ring = "matching_set";
  const [items, setItems] = useState([]);
  const { baseUrl, imgBaseUrl, imgAssetsUrl } = useContext(UserContext);
  const options = [
    { value: "", label: "Select Option" },
    { value: "best_seller", label: "Best Sellers" },
    { value: "Newest", label: "Newest" },
    { value: "low_to_high", label: "Price (Low to High)" },
    { value: "high_to_low", label: "Price (High to Low)" },
  ];

  const newoption = options.filter(
    (option) => Cookies.get("bandsPrice") === option.value
  );

  const white = "18k-white-gold";
  const yellow = "18k-yellow-gold";
  const rose = "18k-rose-gold";
  const platinum = "platinum";

  const [filterRoseData, setFilterRoseData] = useState([]);
  const [newPrevData, setNewPrevData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [changeName, setChangeName] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [activePage, setActivePage] = useState([]);
  const [activeColor, setActiveColor] = useState(white);
  const [shapeBreadCamb, setShapeBreadCamb] = useState([]);
  const [selectedShopStyleIds, setSelectedShopStyleIds] = useState(() => {
    const savedStyles = secureLocalStorage.getItem("selectedShopStyleIds");
    return savedStyles ? JSON.parse(savedStyles) : [];
  });
  var a = [];
  a.push(menuShopStyle);
  const mergedArray = [...selectedShopStyleIds, ...a];
  const selectedShopStyleIdsString = mergedArray.join(",");

  const [activeStyleIds, setActiveStyleIds] = useState(() => {
    const savedActiveStyles = secureLocalStorage.getItem("activeStyleIds");
    return savedActiveStyles ? JSON.parse(savedActiveStyles) : [];
  });

  const [metalId, setMetalId] = useState([]);
  const [priceShorting, setPriceShorting] = useState();

  // bridal set for start
  const checkedBridalSets = queryParams.get("bridal-sets");

  const getLocalBridalSetsData =
    secureLocalStorage.getItem("bridalSetsData") === "true";
  const [localBridalData, setLocalBridalData] = useState(
    getLocalBridalSetsData || checkedBridalSets
  );

  useEffect(() => {
    secureLocalStorage.setItem("bridalSetsData", localBridalData);
  }, [localBridalData]);

  const getBridalSet = () => {
    setLocalBridalData((prevState) => !prevState);
    const searchParams = useSearchParams();
    searchParams.delete("bridal-sets");
    const newSearchString = searchParams.toString();
    const newURL = `${"/engagement-rings/start-with-a-setting"}${
      newSearchString ? `?${newSearchString}` : ""
    }`;
    router.replace(newURL);
  };

  // bridal set for end

  // gemstone
  const [newData, setNewData] = useState([]);
  const [diamondData, setDiamondData] = useState([]);
  const stock_num = queryParams?.get("stock_num");

  // cont a = bredCramStyleFilter.
  // ===============  shop by price range==============
  const minRange = 800;
  const maxRange = 15000;
  const [minPrice, setMinPrice] = useState(minRange);
  const [maxPrice, setMaxPrice] = useState(maxRange);
  const [range, setRange] = useState([minRange, maxRange]);

  // =============== shop by price range end==============
  // ``${baseUrl}/products?page=${page}&sortby=${priceShorting}&ring_style=${selectedShopStyleIds}&shape=${shapeName}&metal_color=${metalId}&price_range=${minPrice},${maxPrice}`
 
 

  useEffect(() => {
    setLoading(true);
    const fetchWeddingBands = () => {
      const URLNEW = `${baseUrl}/weddingband-products?subcategory=${
        weddingBands === undefined ? "" : weddingBands
      }${priceShorting === undefined ? "" : `&sortby=${priceShorting}`}`;
      axios
        .get(URLNEW)
        .then((res) => {
          if (res.status === 200) {
            setNewPrevData(res.data);

            const updatedProducts = res.data.data.map((product) => ({
              id: product.id,
              sku: product.sku,
              name: product.product_browse_pg_name,
              image: product.default_image_url,
              images: product.default_image_url
                .split("/")
                .slice(-1)
                .join()
                .split(".")
                .shift(),
              slug: product.slug,
              CenterShape: product.CenterShape,
              multiCategory: product.multiCategory,
              imageName: product.default_image_url
                .split("/")
                .slice(-1)
                .join()
                .split(".")
                .shift(),
              white_gold_price: product.white_gold_price,
              yellow_gold_price: product.yellow_gold_price,
              rose_gold_price: product.rose_gold_price,
              platinum_price: product.platinum_price,
            }));

            if (page > 1) {
              setFilterRoseData((prevData) => [
                ...prevData,
                ...updatedProducts,
              ]);
            } else {
              setFilterRoseData(updatedProducts);
            }
            setTimeout(() => {
              setLoading(false);
            }, 3000);
          }
        })
        .catch(() => {
          console.log("API error");
          setLoading(false);
        });
    };
    const debouncedFetchDataGem = debounce(fetchWeddingBands);
    debouncedFetchDataGem();

    return () => {
      debouncedFetchDataGem.cancel();
    };
  }, [baseUrl, weddingBands, priceShorting]);

  //  scroll pagination start============
  const handleInfiniteScroll = () => {
    try {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      const totalPagesNeeded = Math.ceil(newPrevData.product_count / 30);

      if (
        scrollTop + clientHeight >= 0.7 * scrollHeight &&
        !loading &&
        page < totalPagesNeeded
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (page * 30 < newPrevData.product_count && !loading) {
      window.addEventListener("scroll", handleInfiniteScroll);
    }
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [loading]);

  //  =====================scroll pagination end===================

  const onChangeName = (value, id, slug) => {
    setChangeName({ value, id });
    setIsActive(!isActive);
    setActivePage(id);
    const updatedActiveColor = { ...activeColor };

    if (updatedActiveColor[id]) {
      updatedActiveColor[id] = value;
    } else {
      updatedActiveColor[id] = value;
    }

    setActiveColor(updatedActiveColor);
  };

  // ======================metal three color rose yellow white end =============================



 



  useEffect(() => {
    const storedSelectedShopStyleIds =
      JSON.parse(secureLocalStorage.getItem("selectedShopStyleIds")) || [];
    setSelectedShopStyleIds(storedSelectedShopStyleIds);
    setActiveStyleIds(storedSelectedShopStyleIds);
  }, []);


 



  // =============== shop by  style end==============

  // =============== shop by metal start ==============



  // =============== shop by metal end ==============

  // =============== shop by price range==============
 
  // ===============shop by price range end==============

  if (typeof window !== "undefined") {
    $(document).ready(function () {
      $(".resultdata > div.all-pages-data").each(function (i, odiv) {
        $(odiv)
          .find(".main-common-active > div")
          .click(function () {
            var index = $(this).index();
            $(odiv)
              .find(
                ".outerDiv > a > .main-common-active.product-main-img > div"
              )
              .removeClass("active");
            $(odiv).addClass("active");

            $(odiv)
              .find(".main-common-active > div.defaultImg")
              .removeClass("active")
              .eq(index)
              .addClass("active");

            $(odiv)
              .find(".outerDiv > a > div.main-common-active > div")
              .removeClass("active");

            $(odiv)
              .find(".outerDiv > a > div.main-common-active > div")
              .eq(index)
              .addClass("active");

            $(this).addClass("active");

            // Add 'metal-value-active' class to the corresponding .metal-name-item-name
            $(odiv)
              .find(".main-common-active .metal-name-item-name")
              .removeClass("metal-value-active");

            var metalNameItem = $(odiv).find(".metal-name-item-name").eq(index);
            metalNameItem.addClass("metal-value-active");

            // 'price-active' class from all price elements
            $(odiv)
              .find(".main-common-active .product-price")
              .removeClass("price-active");

            var priceElement;
            switch (index) {
              case 0:
                priceElement = $(odiv).find(
                  ".all-img1.product-price.defaultImg"
                );
                break;
              case 1:
                priceElement = $(odiv).find(".all-img1.product-price.img-1");
                break;
              case 2:
                priceElement = $(odiv).find(".all-img1.product-price.img-2");
                break;
              case 3:
                priceElement = $(odiv).find(".all-img1.product-price.img-3");
                break;
              default:
                break;
            }

            priceElement.addClass("price-active");
          });
      });
    });
  }

  // ================

  // ==================== hover effect
  if (typeof window !== "undefined") {
    $(document).ready(function () {
      $(".resultdata > div.all-pages-data").each(function (i, odiv) {
        $(odiv)
          .find(".outerDiv > a .main-common-active > .all-card-four-color")
          .on("mouseenter", function () {
            var index = $(this).index();

            // Add class on hover
            $(odiv).addClass("hover-active");
            $(odiv)
              .find(".main-common-active .metal-name-item-name")
              .eq(index)
              .addClass("metal-hover-active");
            $(odiv)
              .find(".main-common-active > .product-price")
              .eq(index)
              .addClass("price-hover-active");
            $(odiv)
              .find(".main-common-active > .common-img")
              .eq(index)
              .addClass("common-img-hover-active");
          })
          .on("mouseleave", function () {
            var index = $(this).index();

            // Remove class on hover out
            $(odiv).removeClass("hover-active");
            $(odiv)
              .find(".main-common-active .metal-name-item-name")
              .eq(index)
              .removeClass("metal-hover-active");
            $(odiv)
              .find(".main-common-active > .product-price")
              .eq(index)
              .removeClass("price-hover-active");
            $(odiv)
              .find(".main-common-active > .common-img")
              .eq(index)
              .removeClass("common-img-hover-active");
          });
      });
    });
  }
  // ==================sort by price start

  const handlePriceChange = (selectedOption) => {
    Cookies.set("bandsPrice", selectedOption.value, {
      expires: 3650,
      secure: true,
      sameSite: "Strict",
    });
    setPriceShorting(selectedOption.value);
  };
  // ========


  const wishlist = useSelector((state) => state.wishlistData);

  const handleWishlist = async (
    item,
    user_id,
    product_type,
    ring_id,
    ring_color,
    ring_price,
    imgSku,
    tokenData
  ) => {
    try {
      const newItem = {
        item,
        ring_color,
        product_type,
        ring_type: "natural",
        uniqueId: uuidv4(),
      };

      dispatch(addToWishlist(newItem));

      // Construct URL for API call
      const fetchData = async () => {
        try {
          // Construct URL for API call
          setLoading(true);
          const apiUrl = `${baseUrl}/add_to_wishlist?user_id=${user_id}&ring_price=${ring_price}&ring_id=${ring_id}&ring_color=${ring_color}&product_type=${product_type}&img_sku=${imgSku}&ring_type=natural`;
          // Make API call
          const response = await axios.get(apiUrl);

          if (response.status === 200) {
            dispatch(productList());
            setLoading(false);
          } else {
            console.error(
              "Error adding item to wishlist. Status:",
              response.status
            );
            setLoading(false);
          }
        } catch (error) {
          console.error("Error:", error);
          setLoading(false);
        }
      };

      // Debounce fetchData function
      const debouncedFetchData = debounce(fetchData, 50); // Adjust delay as needed (in milliseconds)

      debouncedFetchData();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // =======remove to card
  useMemo(() => {
    if(removeWishList){
    setLoading(true);
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
  }
  }, [removeWishList]);
  // ==================
  // ============
  function handleWishlistRemove(belowItem, itemId) {
    wishlist.forEach((item) => {
      if (belowItem.id === item.item?.id) {
        dispatch(removeToWishlist(item));
      }
    });

    const keys = Object.keys(wishListDataBase);
    keys.forEach((key) => {
      const item = wishListDataBase[key];
      if (belowItem?.id === item?.ring_id) {
        setRemoveWishList(item?.id);
      }
    });
  }

  // ===================get wishList all data

  useEffect(() => {
    const ringIds = wishListDataBase.map((itemss) => {
      return itemss.ring_id;
    });

    setItems(ringIds);
  }, [wishListDataBase]);

  let wishlistIds = [];
  wishListDataBase.map((item) => {
    wishlistIds.push(item.ring_id);
  });
  const [filterbutton, setFilterbutton] = useState(false);
  const filter_button = () => {
    setFilterbutton(!filterbutton);
  };

  let beforeLoginWishlistIds = [];
  wishlist.map((item) => {
    beforeLoginWishlistIds.push(item.item?.id);
  });

  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
  };
  return (
    <>
      {stock_num ? (
        <div className="sticky-gemstone-name">
          {(newData.length > 0 ? newData : diamondData).map((item) => {
            return (
              <React.Fragment key={item.id}>
                <div className="sticky-gemstone-img">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    width="auto"
                    height="auto"
                    onError={handleError}
                  />
                </div>
                <div className="sticky-gemstone-detail">
                  {newData.length > 0
                    ? item.short_title
                      ? `${item.short_title} `
                      : `${item.size} Carat ${item.shape}`
                    : `${item.size} Carat ${item.shape} Diamond `}
                  <span>${item.total_sales_price}</span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      ) : null}
      <div
        className={`container choose-setting-pages-main container-1290-list-pages wedding-band-page ${
          stock_num ? "diamond-bread-crumb-active" : null
        }`}
      >
        <div className="main-content choose-setting-pages ">
          <>
            <h1 className="center">
              {menuShapeName || menuShopStyle
                ? `${menuShapeName || ""} ${
                    menuShopStyle || ""
                  }  Engagement Ring`.trim()
                : `${weddingBands} Bands`}
            </h1>

            {/* ====================create your ring start */}
          </>

          {/* ====================create your ring end */}
        </div>

        <div className="best-seller-main">
          <span>{newPrevDataServer.product_count} WEDDING RINGS</span>

          <div className="best-seller">
            <form>
              <label for="#">Sort : </label>
              <Select
                placeholder={
                  newoption.length > 0
                    ? newoption.map((option) => option.label)
                    : "Select Option"
                }
                onChange={handlePriceChange}
                options={options}
                isSearchable={false}
              />
            </form>
          </div>
        </div>

       

        <div className="resultdata setings-Page-img">
          {filterRoseData.length > 0 &&
            filterRoseData.map((item, index) => (
              <div
                key={item.index}
                className="resultdata all-pages-data "
                onClick={() =>
                  secureLocalStorage.removeItem("diamond_type_ring")
                }
              >
                <div className="outerDiv" id={`items-${item.id}`}>
                  <Link
                    href={
                      newData.length > 0
                        ? `/detail-ring-product-gemstone/${item.slug}?color=${
                            activeColor[item.id] || white
                          }&stock_num=${stock_num ? stock_num : ""}`
                        : `/detail-wedding-band/${item.slug}?color=${
                            activeColor[item.id] || white
                          }${stock_num ? `&stock_num=${stock_num}` : ""}${
                            diamond_origin
                              ? `&diamond_origin=${diamond_origin}`
                              : ""
                          }`
                    }
                  >
                    <div className="main-common-active product-main-img">
                      <div className="all-img1 common-img defaultImg ">
                        <span className="common-stand-img-1">
                          <LazyLoadImage
                            effect="blur"
                            className="lazy-image"
                            src={item.image}
                            alt={item.name}
                            width="auto"
                            height="auto"
                            onError={handleError}
                          />
                        </span>
                        <span className="common-stand-img white-stand-img">
                          <img
                            src={`${imgBaseUrl}/${item.imageName}/${item.imageName}.side.jpg`}
                            alt={item.name}
                            width="auto"
                            height="auto"
                            onError={handleError}
                          />
                        </span>
                        <LazyLoadImage
                          effect="blur"
                          className="video-poster"
                          src="https://www.icegif.com/wp-content/uploads/2023/07/icegif-1260.gif"
                          alt={item.name}
                          width="auto"
                          height="auto"
                          onError={handleError}
                        />
                      </div>

                      <div className="all-img1 img-1 common-img">
                        <span className="common-stand-img-1">
                          <img
                            src={`${imgBaseUrl}/${item.imageName}/${item.imageName}.alt.jpg`}
                            alt={item.name}
                            width="auto"
                            height="auto"
                            onError={handleError}
                          />
                        </span>
                        <span className="common-stand-img yellow-stand-img">
                          <img
                            src={`${imgBaseUrl}/${item.imageName}/${item.imageName}.side.alt.jpg`}
                            alt={item.name}
                            width="auto"
                            height="auto"
                            onError={handleError}
                          />
                        </span>
                      </div>

                      <div className="all-img1 img-2 common-img">
                        <span className="common-stand-img-1">
                          <img
                            src={`${imgBaseUrl}/${item.imageName}/${item.imageName}.alt1.jpg`}
                            alt={item.name}
                            width="auto"
                            height="auto"
                            onError={handleError}
                          />
                        </span>
                        <span className="common-stand-img rose-stand-img">
                          <img
                            src={`${imgBaseUrl}/${item.imageName}/${item.imageName}.side.alt1.jpg`}
                            alt={item.name}
                            width="auto"
                            height="auto"
                            onError={handleError}
                          />
                        </span>
                      </div>
                      <div className="all-img1 img-3 common-img">
                        <span className="common-stand-img-1">
                          <img
                            src={item.image}
                            alt={item.name}
                            width="auto"
                            height="auto"
                            onError={handleError}
                          />
                        </span>
                        <span className="common-stand-img platinum-stand-img">
                          <img
                            src={`${imgBaseUrl}/${item.imageName}/${item.imageName}.side.jpg`}
                            alt={item.name}
                            width="auto"
                            height="auto"
                            onError={handleError}
                          />
                        </span>
                      </div>
                    </div>

                    <div className="heart-icon">
                      <Link href='javascript:void(0);'>
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
                                  ring,
                                  item.id,
                                  white,
                                  item.white_gold_price,
                                  item.imageName
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
                                ring,
                                item.id,
                                white,
                                item.white_gold_price,
                                item.imageName
                              );
                            }}
                          />
                        )}
                      </Link>
                    </div>

                    <div className="main-common-active all-card-four-colors ">
                      {metalColor.map((MetalColor, index) => (
                        <div
                          key={MetalColor.id}
                          className={`all-card-four-color  ${
                            (item.id === activePage &&
                              activeColor === MetalColor.slug) ||
                            MetalColor.slug == "18k-white-gold" ||
                            changeName == MetalColor.slug
                              ? " active"
                              : ""
                          }`}
                        >
                          <Link
                            href="#"
                            style={{
                              background: MetalColor.color,
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onChangeName(MetalColor.slug, item.id);
                            }}
                          ></Link>
                        </div>
                      ))}
                    </div>
                    <div className="main-common-active">
                      <div className="metal-name-by-default">
                        <span>{item.name}</span>
                      </div>
                      {metalColor.map((MetalValue, index) => (
                        <div
                          className={`metal-name-item-name ${MetalValue.name}`}
                          key={MetalValue.id}
                        >
                          <span id="metalValueSpan">{MetalValue.value}</span>
                          <span>{item.name}</span>
                        </div>
                      ))}
                    </div>

                    <div className="main-common-active">
                      <div className="all-img1 product-price defaultImg White">
                        ${Math.round(item.white_gold_price)}
                      </div>
                      <div className="all-img1 product-price img-1 Yellow">
                        ${Math.round(item.yellow_gold_price)}
                      </div>
                      <div className="all-img1 product-price img-2 Pink">
                        ${Math.round(item.rose_gold_price)}
                      </div>
                      <div className="all-img1 product-price img-3 Platinum">
                        ${Math.round(item.platinum_price)}
                      </div>
                    </div>
                  </Link>
                  {/* <div>{item.id}</div> */}
                </div>
              </div>
            ))}
        </div>
        <div className="resultdata setings-Page-img server-side">
          {filterRoseDataServer.length > 0 &&
            filterRoseDataServer.map((item, index) => (
              <div
                key={item.index}
                className="resultdata all-pages-data "
                onClick={() =>
                  secureLocalStorage.removeItem("diamond_type_ring")
                }
              >
                <div className="outerDiv" id={`items-${item.id}`}>
                  <Link
                    href={
                      newData.length > 0
                        ? `/detail-ring-product-gemstone/${item.slug}?color=${
                            activeColor[item.id] || white
                          }&stock_num=${stock_num ? stock_num : ""}`
                        : `/detail-wedding-band/${item.slug}?color=${
                            activeColor[item.id] || white
                          }${stock_num ? `&stock_num=${stock_num}` : ""}${
                            diamond_origin
                              ? `&diamond_origin=${diamond_origin}`
                              : ""
                          }`
                    }
                  >
                    <div className="main-common-active product-main-img">
                      <div className="all-img1 common-img defaultImg ">
                        <span className="common-stand-img-1">
                          <LazyLoadImage
                            effect="blur"
                            className="lazy-image"
                            src={item.image}
                            alt={item.name}
                            width="auto"
                            height="auto"
                            onError={handleError}
                          />
                        </span>
                        <span className="common-stand-img white-stand-img">
                          <img
                            src={`${imgBaseUrl}/${item.imageName}/${item.imageName}.side.jpg`}
                            alt={item.name}
                            width="auto"
                            height="auto"
                            onError={handleError}
                          />
                        </span>
                        <LazyLoadImage
                          effect="blur"
                          className="video-poster"
                          src="https://www.icegif.com/wp-content/uploads/2023/07/icegif-1260.gif"
                          alt={item.name}
                          width="auto"
                          height="auto"
                          onError={handleError}
                        />
                      </div>

                      <div className="all-img1 img-1 common-img">
                        <span className="common-stand-img-1">
                          <img
                            src={`${imgBaseUrl}/${item.imageName}/${item.imageName}.alt.jpg`}
                            alt={item.name}
                            width="auto"
                            height="auto"
                            onError={handleError}
                          />
                        </span>
                        <span className="common-stand-img yellow-stand-img">
                          <img
                            src={`${imgBaseUrl}/${item.imageName}/${item.imageName}.side.alt.jpg`}
                            alt={item.name}
                            width="auto"
                            height="auto"
                            onError={handleError}
                          />
                        </span>
                      </div>

                      <div className="all-img1 img-2 common-img">
                        <span className="common-stand-img-1">
                          <img
                            src={`${imgBaseUrl}/${item.imageName}/${item.imageName}.alt1.jpg`}
                            alt={item.name}
                            width="auto"
                            height="auto"
                            onError={handleError}
                          />
                        </span>
                        <span className="common-stand-img rose-stand-img">
                          <img
                            src={`${imgBaseUrl}/${item.imageName}/${item.imageName}.side.alt1.jpg`}
                            alt={item.name}
                            width="auto"
                            height="auto"
                            onError={handleError}
                          />
                        </span>
                      </div>
                      <div className="all-img1 img-3 common-img">
                        <span className="common-stand-img-1">
                          <img
                            src={item.image}
                            alt={item.name}
                            width="auto"
                            height="auto"
                            onError={handleError}
                          />
                        </span>
                        <span className="common-stand-img platinum-stand-img">
                          <img
                            src={`${imgBaseUrl}/${item.imageName}/${item.imageName}.side.jpg`}
                            alt={item.name}
                            width="auto"
                            height="auto"
                            onError={handleError}
                          />
                        </span>
                      </div>
                    </div>

                    <div className="heart-icon">
                      <Link href='javascript:void(0);'>
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
                                  ring,
                                  item.id,
                                  white,
                                  item.white_gold_price,
                                  item.imageName
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
                                ring,
                                item.id,
                                white,
                                item.white_gold_price,
                                item.imageName
                              );
                            }}
                          />
                        )}
                      </Link>
                    </div>

                    <div className="main-common-active all-card-four-colors ">
                      {metalColor.map((MetalColor, index) => (
                        <div
                          key={MetalColor.id}
                          className={`all-card-four-color  ${
                            (item.id === activePage &&
                              activeColor === MetalColor.slug) ||
                            MetalColor.slug == "18k-white-gold" ||
                            changeName == MetalColor.slug
                              ? " active"
                              : ""
                          }`}
                        >
                          <Link
                            href="#"
                            style={{
                              background: MetalColor.color,
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onChangeName(MetalColor.slug, item.id);
                            }}
                          ></Link>
                        </div>
                      ))}
                    </div>
                    <div className="main-common-active">
                      <div className="metal-name-by-default">
                        <span>{item.name}</span>
                      </div>
                      {metalColor.map((MetalValue, index) => (
                        <div
                          className={`metal-name-item-name ${MetalValue.name}`}
                          key={MetalValue.id}
                        >
                          <span id="metalValueSpan">{MetalValue.value}</span>
                          <span>{item.name}</span>
                        </div>
                      ))}
                    </div>

                    <div className="main-common-active">
                      <div className="all-img1 product-price defaultImg White">
                        ${Math.round(item.white_gold_price)}
                      </div>
                      <div className="all-img1 product-price img-1 Yellow">
                        ${Math.round(item.yellow_gold_price)}
                      </div>
                      <div className="all-img1 product-price img-2 Pink">
                        ${Math.round(item.rose_gold_price)}
                      </div>
                      <div className="all-img1 product-price img-3 Platinum">
                        ${Math.round(item.platinum_price)}
                      </div>
                    </div>
                  </Link>
                  {/* <div>{item.id}</div> */}
                </div>
              </div>
            ))}
        </div>
        {/* <div>
          <ProductListMoreToExplore />
        </div> */}
        {/* <div>
          <ProductListFaq />
        </div> */}
        <h3 className="center">
          {filterRoseDataServer.length > 0 ? null : `data not found`}
        </h3>
        <div>{loading && <LoaderSpinner />}</div>
      </div>
    </>
  );
};

export default ChooseWeddingBands;
