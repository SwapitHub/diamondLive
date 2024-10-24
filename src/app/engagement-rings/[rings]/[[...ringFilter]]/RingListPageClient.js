"use client";
import axios from "axios";
import $ from "jquery";
import debounce from "lodash.debounce";
import { useContext, useEffect, useMemo, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import SlickSlider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { v4 as uuidv4 } from "uuid";

import LoaderSpinner from "@/app/_componentStatic/LoaderSpinner";
import { Tabbing } from "@/app/_componentStatic/Tabbing";
import { UserContext } from "@/app/context/UserContext";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import secureLocalStorage from "react-secure-storage";
import { productList } from "../../../../../store/actions/productActions";
import {
  addToWishlist,
  removeToWishlist,
} from "../../../../../store/actions/wishlistAction";

import Cookies from "js-cookie";

const StartWithASetting = ({
  rings,
  ringFilter,
  filterRoseDatas,
  ShopByStyle,
  shapeData,
  metalColor,
}) => {
  const user_id = secureLocalStorage.getItem("formData");

  const searchParams = useSearchParams();
  const wishListDataBase = useSelector((state) => state?.productDataWishlist);
  const [removeWishList, setRemoveWishList] = useState();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const [pathSegments, setPathSegments] = useState([]);
  const [queryParams, setQueryParams] = useState({});
  useEffect(() => {
    if (pathname) {
      const segments = pathname.split("/").filter((segment) => segment);
      setPathSegments(segments);
    }
    setQueryParams(searchParams);
  }, [pathname]);

  const mainCategory = pathSegments[0] || "";
  const subCategory = pathSegments;

  let menuShapeName, menuShopStyle;
  const [trellisRing, setTrellisRing] = useState();
  const [metalColorName, setMetalColorName] = useState("White");
  console.log(metalColorName);

  useEffect(() => {
    if (rings === "shape") {
      menuShapeName = ringFilter;
    } else if (rings === "style") {
      menuShopStyle = ringFilter;
    } else if (rings === "metal") {
      setMetalColorName(ringFilter);
    } else {
      setTrellisRing(rings);
    }
  }, []);

  const menuMetal = pathSegments[2] || "";
  console.log(menuMetal);

  const diamond_origin = searchParams.get("diamond_origin");
  const ring = "ring";
  const [items, setItems] = useState([]);

  const { baseUrl, imgAssetsUrl, imgBaseUrl } = useContext(UserContext);
  const options = [
    { value: " ", label: "Select Option" },
    { value: "best_seller", label: "Best Sellers" },
    { value: "Newest", label: "Newest" },
    { value: "low_to_high", label: "Price (Low to High)" },
    { value: "high_to_low", label: "Price (High to Low)" },
  ];

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
  const [activeColor, setActiveColor] = useState({});
  const [shapeName, setShapeName] = useState([]);
  const [activeStyleIds, setActiveStyleIds] = useState([]);
  const [shapeBreadCamb, setShapeBreadCamb] = useState([]);
  const [selectedShopStyleIds, setSelectedShopStyleIds] = useState(() => {
    const savedStyles = secureLocalStorage.getItem("selectedShopStyleIds");
    return savedStyles ? JSON.parse(savedStyles) : [];
  });
  var a = [];
  a.push(menuShopStyle);
  const mergedArray = [...activeStyleIds, ...a];
  const selectedShopStyleIdsString = mergedArray.join(",");
  const [metalId, setMetalId] = useState();
  const [priceShorting, setPriceShorting] = useState();

  const [metalColorValue, setMetalColorValue] = useState(
    getMetalColorValue(menuMetal)
  );

  function getMetalColorValue(menuMetal) {
    switch (menuMetal) {
      case "Yellow":
        return yellow;
      case "Pink":
        return rose;
      case "White":
        return white;
      case "Platinum":
        return platinum;
      default:
        return white;
    }
  }

  useEffect(() => {
    setMetalColorValue(getMetalColorValue(menuMetal));
  }, [menuMetal]);

  useEffect(() => {
    if (menuShapeName) {
      secureLocalStorage.setItem("clickedShape", menuShapeName);
      Cookies.set("clickedShape", menuShapeName, {
        expires: 3650,
        secure: true,
        sameSite: "Strict",
      });
      setGetLocalStoreShape(menuShapeName);
    }
  }, [menuShapeName]);

  const [getLocalStoreShape, setGetLocalStoreShape] = useState(
    secureLocalStorage.getItem("clickedShape") || "",
    Cookies.get("clickedShape") || ""
  );

  const [getLocalStoreMetal, setGetLocalStoreMetal] = useState();
  useEffect(() => {
    let metalLocalData = secureLocalStorage.getItem("metaColorIds");
    if (metalLocalData) {
      setGetLocalStoreMetal(metalLocalData);
    }
  }, [menuMetal]);

  // bridal set for start
  const checkedBridalSets = searchParams.get("bridalSets");
  let checkedBridalSetsNew = checkedBridalSets === "true";

  const [localBridalData, setLocalBridalData] = useState(checkedBridalSetsNew);
  useEffect(() => {
    setLocalBridalData(checkedBridalSetsNew);
  }, [checkedBridalSetsNew]);

  useEffect(() => {
    secureLocalStorage.setItem("bridalSetsData", localBridalData);
  }, [localBridalData]);

  const getBridalSet = () => {
    if (checkedBridalSets === "true") {
      router.push("/engagement-rings/start-with-a-setting");
    } else {
      router.push("/engagement-rings/start-with-bridal-set?bridalSets=true");
    }
    setLocalBridalData((prevState) => !prevState);
  };

  // bridal set for end

  // gemstone
  const [newData, setNewData] = useState([]);
  const [diamondData, setDiamondData] = useState([]);
  const stock_num = searchParams.get("stock_num");

  useMemo(() => {
    const fetchData = async () => {
      const url = `${baseUrl}/sama-gemstones?markup_mode=true&stock_num=${stock_num}`;
      const params = {
        stock_item_type: "gemstones",
        status: "pending",
        page_number: 1,
        page_size: 30,
      };

      try {
        const response = await axios.get(url, { params });
        setNewData(response.data.response.body.gemstones);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [stock_num]);

  // Diamond api
  useMemo(() => {
    const fetchData = async () => {
      const url = `${baseUrl}/sama-diamonds?type=${
        diamond_origin == "lab_grown" ? "Lab_grown_Diamond" : "Diamond"
      }&stock_num=${stock_num}`;

      const params = {
        stock_item_type: "Diamond",
        status: "pending",
      };

      try {
        const response = await axios.get(url, { params });
        setDiamondData(response.data.response.body.diamonds);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  // cont a = bredCramStyleFilter.
  // ===============  shop by price range==============

  // =============== shop by price range end==============
console.log(filterRoseData);

  useMemo(() => {
    const fetchData = () => {
      setLoading(true);

      const URLNEW = `${baseUrl}/products?page=${page}${
        priceShorting
          ? `&sortby=${priceShorting == undefined ? "" : priceShorting}`
          : ""
      }${
        selectedShopStyleIdsString
          ? `&ring_style=${selectedShopStyleIdsString}`
          : ""
      }${shapeName ? `&shape=${shapeName ? shapeName : ""}` : ""}${
        localBridalData
          ? `&bridal_sets=${localBridalData == null ? "" : localBridalData}`
          : ""
      }${
        trellisRing
          ? `&subcategory=${trellisRing == null ? "" : trellisRing}`
          : ""
      }`;

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
                .shift(),
              slug: product.slug,
              CenterShape: product.CenterShape,
              multiCategory: product.multiCategory,
              imageName:product.entity_id,
              white_gold_price: product.white_gold_price,
              yellow_gold_price: product.yellow_gold_price,
              rose_gold_price: product.rose_gold_price,
              platinum_price: product.platinum_price,
              entity_id: product.entity_id
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
            }, 5500);
          }
        })
        .catch(() => {
          console.log("API error");
          setLoading(false);
        });
    };
    fetchData();

    // window.addEventListener("beforeunload", (event) => {
    //   fetchData();
    // });
    ``;
    // window.addEventListener("unload", (event) => {
    //   fetchData();
    // });
    const timeoutColor = setTimeout(() => {
      commonMetalColor(metalColorName || "White");
    }, 1500);

    return () => clearTimeout(timeoutColor);
  }, [
    page,
    selectedShopStyleIdsString,
    priceShorting,
    localBridalData,
    shapeName,
    getLocalStoreMetal,
    metalColorName,
  ]);

  useEffect(() => {
    setPage(1);
  }, [
    selectedShopStyleIdsString,
    shapeName,
    metalId,
    priceShorting,
    metalColorName,
  ]);
  //  scroll pagination start============

  useEffect(() => {
    const handleInfiniteScroll = () => {
      try {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        const totalPagesNeeded = Math.ceil(newPrevData.product_count / 30);

        if (
          scrollTop + clientHeight >= 0.7 * scrollHeight &&
          page < totalPagesNeeded &&
          !loading
        ) {
          setLoading(true);
          setPage((prev) => prev + 1);
          setTimeout(() => {
            setLoading(false);
          }, 4000);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (page * 30 < newPrevData.product_count && !loading) {
      window.addEventListener("scroll", handleInfiniteScroll);
    }
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [loading]);

  //  =====================scroll pagination end===================
  // ===========metal three color rose yellow white  =============================

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

  // filter shape
  const style = "style";
  const shape = "shape";

  const [styleFilter, setStyleFilter] = useState(style);
  const FilterProduct = (styleData) => {
    setStyleFilter(styleData);
  };

  // =============== shop by shape start ==============

  const shapeOnclick = (shapeNameItem) => {
    const clickedShape = secureLocalStorage.getItem("clickedShape");
    const clickedShapeCookies = Cookies.get("clickedShape");

    if (clickedShape == shapeNameItem || clickedShapeCookies == shapeNameItem) {
      // If the clicked shape is already active, remove the filter

      secureLocalStorage.removeItem("clickedShape");
      Cookies.remove("clickedShape", { path: "/" });

      setShapeBreadCamb("");
      setShapeName("");
      setGetLocalStoreShape("");
    } else {
      // searchParams.delete("shape");
      // const newSearchString = searchParams.toString();
      // const newURL = `${"/engagement-rings/start-with-a-setting"}${
      //   newSearchString ? `?${newSearchString}` : ""
      // }`;
      // router.replace(newURL);
      setShapeName(shapeNameItem);

      Cookies.set("clickedShape", shapeNameItem, {
        expires: 3650,
        secure: true,
        sameSite: "Strict",
      });
      secureLocalStorage.setItem("clickedShape", shapeNameItem);
    }
  };

  // =============== shop by metal start ==============
  const metalOnclick = (metaColorId, metalValueColor, MetalColorName) => {
    setMetalColorValue(metalValueColor);
    if (metaColorId === metalId) {
      setMetalId();
    } else {
      setMetalId(metaColorId);
    }
    setMetalColorName(MetalColorName);

    // const searchParams = new URLSearchParams(window.location.search);
    // searchParams.delete("metal");
    // const newSearchString = searchParams.toString();
    // const newURL = `${"/engagement-rings/start-with-a-setting"}${
    //   newSearchString ? `?${newSearchString}` : ""
    // }`;
    // router.replace(newURL);
  };

  // =============== shop by metal end ==============
  // =============== shop by shape end ==============

  // =============== shop by  style ==============

  useEffect(() => {
    const storedSelectedShopStyleIdsCoo = Cookies.get("selectedShopStyleIds");

    const storedSelectedShopStyleIds =
      JSON.parse(secureLocalStorage.getItem("selectedShopStyleIds")) || [];
    setSelectedShopStyleIds(storedSelectedShopStyleIds);
    setActiveStyleIds(storedSelectedShopStyleIds);

    if (storedSelectedShopStyleIdsCoo) {
      try {
        const parsedShopStyleIds = storedSelectedShopStyleIds;
        setSelectedShopStyleIds(parsedShopStyleIds);
        setActiveStyleIds(parsedShopStyleIds);
      } catch (error) {
        console.error("Error parsing selectedShopStyleIds:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (menuShopStyle) {
      secureLocalStorage.setItem(
        "selectedShopStyleIds",
        JSON.stringify([menuShopStyle])
      );
      Cookies.set("selectedShopStyleIds", JSON.stringify([menuShopStyle]), {
        expires: 3650,
        secure: true,
        sameSite: "Strict",
      });
      Cookies.remove("clickedShape", { path: "/" });
      secureLocalStorage.removeItem("clickedShape");
    }
    if (menuShapeName) {
      secureLocalStorage.setItem("clickedShape", menuShapeName);
      secureLocalStorage.removeItem("selectedShopStyleIds");
      Cookies.set("clickedShape", menuShapeName, {
        expires: 3650,
        secure: true,
        sameSite: "Strict",
      });
      Cookies.remove("selectedShopStyleIds", { path: "/" });
    }
  }, [menuShopStyle, menuShapeName]);
  useEffect(() => {
    const storedStyleData = secureLocalStorage.getItem("selectedShopStyleIds");
    const storedShapeData = secureLocalStorage.getItem("clickedShape");
    const storedStyleDataC = Cookies.get("selectedShopStyleIds");
    const storedShapeDataC = Cookies.get("clickedShape");
    // const storedColorData = secureLocalStorage.getItem("colorDataSlider");

    const parsedStyleData = storedStyleData ? JSON.parse(storedStyleData) : [];
    const parsedStyleDataC = storedStyleDataC
      ? JSON.parse(storedStyleDataC)
      : [];

    // const parsedColorData = storedColorData ? JSON.parse(storedColorData) : [];

    setActiveStyleIds(parsedStyleData || parsedStyleDataC);
    setShapeName(storedShapeData || storedShapeDataC);
    // setColorDataSlider(parsedColorData);
  }, [menuShopStyle, shapeName]);

  const ShopStyle = (styleItem) => {
    let updatedStyleDataSlider = [...activeStyleIds];

    if (activeStyleIds?.includes(styleItem)) {
      updatedStyleDataSlider = activeStyleIds.filter(
        (item) => item !== styleItem
      );
    } else {
      updatedStyleDataSlider = [...activeStyleIds, styleItem];
    }

    // Update state
    setActiveStyleIds(updatedStyleDataSlider);
    Cookies.set(
      "selectedShopStyleIds",
      JSON.stringify(updatedStyleDataSlider),
      {
        expires: 3650,
        secure: true,
        sameSite: "Strict",
      }
    );

    secureLocalStorage.setItem(
      "selectedShopStyleIds",
      JSON.stringify(updatedStyleDataSlider)
    );
  };

  const getBridalSetData = () => {
    setLocalBridalData(false);
    secureLocalStorage.removeItem("bridalSetsData");
  };

  const resetAllShape = () => {
    Cookies.remove("selectedShopStyleIds", { path: "/" });
    Cookies.remove("ring_style", { path: "/" });
    Cookies.remove("clickedShape", { path: "/" });
    commonMetalColor("White");
    setActiveStyleIds([]);
    setShapeName();
    setMetalId();
    setMetalColorValue(white);
    setMetalColorName("White");
    secureLocalStorage.removeItem("selectedShopStyleIds");
    secureLocalStorage.removeItem("clickedShape");
    secureLocalStorage.removeItem("metaColorIds");
  };

  const resetAllColor = () => {
    commonMetalColor("White");
    metalOnclick();
    setMetalColorName("White");
    setMetalColorValue();
    setMetalId();
    setGetLocalStoreMetal("");
    setMetalColorValue(white);
    secureLocalStorage.removeItem("metaColorIds");
  };

  // =============== shop by  style end==============

  // =============== shop by price range==============

  // ===============shop by price range end==============

  function commonMetalColor(idMetal) {
    $(
      ".all-pages-data, .all-img1.common-img, .main-common-active.all-card-four-colors > div"
    ).removeClass("active");
    $(".main-common-active > div").removeClass("metal-value-active");
    $(".main-common-active > div").removeClass("price-active active");
    $("." + idMetal).addClass("active");
    $(".metal-name-item-name." + idMetal).addClass("metal-value-active");
    $(".resultdata > div.all-pages-data").each(function (i, sdiv) {
      if ($(sdiv).find(".all-img1.common-img").hasClass("active")) {
        $(sdiv).addClass("active");
      }
    });
  }

  if (typeof window !== "undefined") {
    $(document).ready(function () {
      $(".resultdata > div.all-pages-data").each(function (i, odiv) {
        $(".shop-by-metal-color > .metal-all-color").on("click", function () {
          var idMetal = $(this).attr("id");

          if (metalId) {
            commonMetalColor("White");
          } else {
            commonMetalColor(idMetal);
          }
        });

        // if (menuMetal) {
        //   var idMetal = menuMetal;
        //   commonMetalColor(idMetal);
        // }

        // if(metalColorName){
        // commonMetalColor(metalColorName);
        // }
        // onclick four color circle

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
    setPriceShorting(selectedOption.value);

    Cookies.set("PriceShorting", selectedOption.value, {
      expires: 3650,
      secure: true,
      sameSite: "Strict",
    });
  };
  // ========
  const ShopStyleSlider = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };
  const ShopShapeSlider = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };
  const ShopStyleSliderOuter = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };

  const wishlist = useSelector((state) => state.wishlistData);

  const handleWishlist = async (
    item,
    user_id,
    product_type,
    ring_id,
    ring_color,
    ring_price,
    imgSku,
    sku
  ) => {
    try {
      const newItem = {
        item,
        ring_color,
        product_type,
        ring_type: "natural",
        uniqueId: uuidv4(),
        img_sku: sku,
        ring_price,
      };

      // Dispatch action to add item to Redux store
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
    setLoading(true);
    const fetchData = () => {
      const removeWish = `${baseUrl}/remove_wishlist_item/${removeWishList}`;

      axios
        .get(removeWish)
        .then((res) => {
          setTimeout(() => {
            
            setLoading(false);
          }, 4000);
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
  const handleRemoveStyle = (slug) => {
    setActiveStyleIds((prevSelectedStyles) => {
      const updatedStyles = prevSelectedStyles.filter(
        (selectedStyle) => selectedStyle !== slug
      );

      // Update secureLocalStorage with the new array
      Cookies.set("selectedShopStyleIds", JSON.stringify(updatedStyles), {
        expires: 3650,
        secure: true,
        sameSite: "Strict",
      });
      secureLocalStorage.setItem(
        "selectedShopStyleIds",
        JSON.stringify(updatedStyles)
      );
      // if (menuStyleNames?.includes(gemStyle)) {

      // }
      return updatedStyles;
    });
  };
  const handleShapeRemove = () => {
    setShapeName();
    Cookies.remove("clickedShape", { path: "/" });

    secureLocalStorage.removeItem("clickedShape");
  };

  return (
    <>
      {stock_num ? (
        <div className="sticky-gemstone-name">
          {(newData.length > 0 ? newData : diamondData).map((item, i) => {
            return (
              <div key={i}>
                <div className="sticky-gemstone-img">
                  <LazyLoadImage
                    width="auto"
                    height="auto"
                    effect="blur"
                    src={item.image_url}
                    alt={item.shape}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                    }}
                  />
                </div>
                <div className="sticky-gemstone-detail">
                  {newData.length > 0
                    ? item.short_title
                      ? `${item.short_title} `
                      : `${item.size} Carat ${item.shape}`
                    : `${item.size} Carat ${item.shape} Diamond `}
                  <span>${Math.round(item.total_sales_price)}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
      <div
        className={`container choose-setting-pages-main container-1290-list-pages ${
          stock_num ? "diamond-bread-crumb-active" : null
        }`}
      >
        <div className="main-content choose-setting-pages ">
          {stock_num ? (
            <Tabbing
              newData={newData}
              stock_num={stock_num}
              type="diamond-ring"
              ringName={`2. Choose Rings`}
              ringLink={`javascript:void(0)`}
              diamondName={` 1. Choose Diamonds`}
              diamondLink={`/diamond/start-with-a-diamond/`}
              gemStoneName={`1. Choose Gemstones`}
              gemStoneLink={`/gemstone/start-with-a-gemstone`}
            />
          ) : (
            <>
              <h1 className="center">
                {menuShapeName || menuShopStyle
                  ? `${menuShapeName || ""} ${
                      menuShopStyle || ""
                    }  Engagement Ring`.trim()
                  : "Engagement Ring Setting"}
              </h1>

              {/* ====================create your ring start */}
              <Tabbing
                newData={newData}
                type="ring"
                ringName={`1. Choose Setting`}
                ringLink={`javascript:void(0)`}
                diamondName={` 2. Choose Diamonds`}
                diamondLink={`/diamond/start-with-a-diamond/`}
              />
            </>
          )}
          {/* ====================create your ring end */}
          <div className="desktop">
            <div className="white-wrapper">
              <div className="lab-diamond-btn">
                <div
                  className={`shop-by-common ShopByStyle ${
                    styleFilter === "style" ? "active" : ""
                  }`}
                >
                  <Link
                    href="javascript:void(0)"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      FilterProduct(style);
                    }}
                  >
                    Shop by Style
                  </Link>
                </div>

                <div
                  className={`shop-by-common shop-by-shape ${
                    styleFilter === "shape" ? "active" : ""
                  }`}
                >
                  <Link
                    href="javascript:void(0)"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      FilterProduct(shape);
                    }}
                  >
                    More Filters
                  </Link>
                </div>
              </div>
              {/* shop by style filtering start here */}
              <div
                className={`shop-by-page-common shop-by-shape-style buttons-container filter-button  ${
                  styleFilter === "style" ? "active" : ""
                }`}
              >
                <SlickSlider
                  {...ShopStyleSliderOuter}
                  responsive={[
                    {
                      breakpoint: 991,
                      settings: {
                        slidesToShow: 5,
                        slidesToScroll: 3,
                        infinite: true,
                      },
                    },
                    {
                      breakpoint: 639,
                      settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                      },
                    },

                    {
                      breakpoint: 375,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                      },
                    },
                  ]}
                >
                  {ShopByStyle.map((styleItem, i) => {
                    return (
                      <Link
                        href="javascript:void(0)"
                        onClick={(e) => {
                          ShopStyle(styleItem.slug);
                        }}
                        className={`${
                          activeStyleIds?.includes(styleItem.slug)
                            ? "style-active-common"
                            : ""
                        } `}
                        key={i}
                      >
                        <div className="shop-style-img">
                          <LazyLoadImage
                            width="auto"
                            height="auto"
                            effect="blur"
                            src={styleItem.image}
                            alt={styleItem?.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                            }}
                          />
                        </div>
                        <div className="shop-style-text">
                          <span>{styleItem.name}</span>
                        </div>
                      </Link>
                    );
                  })}
                </SlickSlider>
              </div>
              {/* shop by style filtering  end */}

              {/* shop by Shape filtering  start */}
              <div
                className={`shop-by-page-common shop-by-shape-page Bridal-Sets-Only-setting-style mobile
                ${styleFilter === "shape" ? "active" : ""}`}
              >
                <div className="style-main">
                  <div className="corusel-diamond">
                    <span className="corusel-diamond-heading">
                      Setting Style
                    </span>
                    <div className="check-text">
                      <span>Bridal Sets Only</span>
                      <span className="corusel-diamond-checkbox">
                        <form action="">
                          <div class="form-group-diamond">
                            <input
                              type="checkbox"
                              id="html2"
                              onChange={getBridalSet}
                              checked={localBridalData}
                            />
                            <label for="html2"></label>
                          </div>
                        </form>
                      </span>
                    </div>
                  </div>
                  {/* shop by style filtering start here */}
                  <div
                    className={` shop-by-shape-style buttons-container filter-button 
                }`}
                  >
                    <SlickSlider
                      {...ShopStyleSlider}
                      responsive={[
                        {
                          breakpoint: 1198,
                          settings: {
                            slidesToShow: 4,
                            slidesToScroll: 4,
                            infinite: true,
                          },
                        },
                        {
                          breakpoint: 800,
                          settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                          },
                        },
                        {
                          breakpoint: 639,
                          settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                          },
                        },

                        {
                          breakpoint: 375,
                          settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            infinite: true,
                          },
                        },
                      ]}
                    >
                      {ShopByStyle.map((styleItem, i) => {
                        return (
                          <Link
                            href="javascript:void(0)"
                            onClick={(e) => {
                              ShopStyle(styleItem.slug);
                            }}
                            className={`${
                              activeStyleIds?.includes(styleItem.slug)
                                ? "style-active-common"
                                : ""
                            } `}
                            key={i}
                          >
                            <div className="shop-style-img">
                              <LazyLoadImage
                                width="auto"
                                height="auto"
                                effect="blur"
                                src={styleItem.image}
                                alt={styleItem?.name}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                }}
                              />
                            </div>
                            <div className="shop-style-text">
                              <span>{styleItem.name}</span>
                            </div>
                          </Link>
                        );
                      })}
                    </SlickSlider>
                  </div>
                  {/* shop by style filtering  end */}
                </div>

                <div className="shape-main">
                  <span>Diamond Shape</span>
                  <SlickSlider
                    {...ShopShapeSlider}
                    responsive={[
                      {
                        breakpoint: 1198,
                        settings: {
                          slidesToShow: 4,
                          slidesToScroll: 4,
                          infinite: true,
                        },
                      },
                      {
                        breakpoint: 800,
                        settings: {
                          slidesToShow: 3,
                          slidesToScroll: 3,
                          infinite: true,
                        },
                      },
                      {
                        breakpoint: 639,
                        settings: {
                          slidesToShow: 3,
                          slidesToScroll: 3,
                          infinite: true,
                        },
                      },
                      {
                        breakpoint: 375,
                        settings: {
                          slidesToShow: 2,
                          slidesToScroll: 2,
                          infinite: true,
                        },
                      },
                    ]}
                  >
                    {shapeData.map((ShapeItem, i) => (
                      <div key={ShapeItem.id}>
                        <Link
                          href="javascript:void(0)"
                          className={`shape ${
                            shapeName === ShapeItem.shape
                              ? "style-active-common"
                              : ""
                          }`}
                          onClick={(e) => {
                            shapeOnclick(ShapeItem.shape);
                          }}
                          key={i}
                        >
                          <div className="diamond-image-slider">
                            <LazyLoadImage
                              width="auto"
                              height="auto"
                              effect="blur"
                              src={ShapeItem.icon}
                              alt={ShapeItem.shape}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                              }}
                            />
                          </div>
                          <div className="shape-text">
                            <span>{ShapeItem.shape}</span>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </SlickSlider>
                </div>
                <div
                  className={`shop-by-metal-page ${
                    styleFilter === "metal" ? "active" : ""
                  }`}
                >
                  <div className="metal-variants">
                    <div className="metal-text">Metal</div>
                    <div className="metal-variant-list">
                      {metalColor.map((MetalColor, index) => (
                        <div
                          key={index}
                          className={`shop-by-metal-color ${
                            metalId === MetalColor.id ||
                            getLocalStoreMetal == MetalColor?.id ||
                            MetalColor.name === metalColorName
                              ? "metal-color-active"
                              : ""
                          }`}
                        >
                          <div
                            className={`metal-all-color`}
                            id={MetalColor.name}
                          >
                            <Link
                              href="javascript:void(0);"
                              type="button"
                              style={{
                                background: MetalColor.color,
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                metalOnclick(
                                  MetalColor.id,
                                  MetalColor.slug,
                                  MetalColor.name
                                );
                              }}
                            ></Link>
                          </div>
                          <div className="shop-by-metal-color-name">
                            <div>{MetalColor.name}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* shop by Shape filtering  end */}

            {/* <ShopByStyleMobileSlider /> */}
          </div>
        </div>
        {/* ======mobile filter start========= */}
        <div
          className={`mobile-filters mobile ring-list ${
            filterbutton !== false ? "active" : ""
          }`}
        >
          <div className="filter-button-mobile" onClick={() => filter_button()}>
            Filters
          </div>

          <div
            className={`shop-by-page-common shop-by-shape-page Bridal-Sets-Only-setting-style
                ${styleFilter === "shape" ? "active" : ""}`}
          >
            <div className="style-main">
              <div className="corusel-diamond">
                <span className="corusel-diamond-heading">Setting Style</span>
                <div className="check-text">
                  <span>Bridal Sets Only</span>
                  <span className="corusel-diamond-checkbox">
                    <form action="">
                      <div class="form-group-diamond">
                        <input
                          type="checkbox"
                          id="html2"
                          onChange={getBridalSet}
                          checked={localBridalData}
                        />
                        <label for="html2"></label>
                      </div>
                    </form>
                  </span>
                </div>
              </div>
              {/* shop by style filtering start here */}
              <div
                className={` shop-by-shape-style buttons-container filter-button 
                }`}
              >
                {ShopByStyle.map((styleItem, i) => {
                  return (
                    <Link
                      href="javascript:void(0)"
                      onClick={(e) => {
                        ShopStyle(styleItem.slug);
                      }}
                      className={`${
                        activeStyleIds?.includes(styleItem.slug)
                          ? "style-active-common"
                          : ""
                      } `}
                      key={i}
                    >
                      <div className="shop-style-img">
                        <LazyLoadImage
                          width="auto"
                          height="auto"
                          effect="blur"
                          src={styleItem.image}
                          alt={styleItem?.name}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                          }}
                        />
                      </div>
                      <div className="shop-style-text">
                        <span>{styleItem.name}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
              {/* shop by style filtering  end */}
            </div>

            <div className="shape-main">
              <span>Diamond Shape</span>

              <div className="shapeData">
                {shapeData.map((ShapeItem, i) => (
                  <div key={i}>
                    <Link
                      href="javascript:void(0)"
                      className={`shape ${
                        shapeName === ShapeItem.shape
                          ? "style-active-common"
                          : ""
                      }`}
                      onClick={(e) => {
                        shapeOnclick(ShapeItem.shape);
                      }}
                    >
                      <div className="diamond-image-slider">
                        <LazyLoadImage
                          width="auto"
                          height="auto"
                          effect="blur"
                          src={ShapeItem.icon}
                          alt={ShapeItem.shape}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                          }}
                        />
                      </div>
                      <div className="shape-text">
                        <span>{ShapeItem.shape}</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div
              className={`shop-by-metal-page ${
                styleFilter === "metal" ? "active" : ""
              }`}
            >
              <div className="metal-variants">
                <div className="metal-text">Metal</div>
                <div className="metal-variant-list">
                  {metalColor.map((MetalColor, index) => (
                    <div
                      key={index}
                      className={`shop-by-metal-color  ${
                        metalId === MetalColor.id ||
                        getLocalStoreMetal === MetalColor.id
                          ? "metal-color-active"
                          : ""
                      }`}
                    >
                      <div className={`metal-all-color `}>
                        <Link
                          href="javascript:void(0);"
                          type="button"
                          style={{
                            background: MetalColor.color,
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            metalOnclick(MetalColor.id, MetalColor.slug);
                          }}
                        ></Link>
                      </div>
                      <div className="shop-by-metal-color-name">
                        <div>{MetalColor.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
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
          <span>
            {newPrevData.product_count}
            {newPrevData.product_count > 1
              ? " ENGAGEMENT RINGS"
              : " ENGAGEMENT RING"}
          </span>

          <div className="best-seller">
            <form>
              <label for="#">Sort : </label>
              <Select
                placeholder={
                  options.length < 0
                    ? options.map((item) => {
                        item.label;
                      })
                    : "Select Option"
                }
                onChange={handlePriceChange}
                options={options}
                isSearchable={false}
              />
            </form>
          </div>
        </div>

        <div className={`bredCramStyleFilter`}>
          {activeStyleIds?.map((item, i) => (
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
          {shapeName && (
            <div className={`breadCram `}>
              <Link
                href="javascript:void(0)"
                onClick={() => handleShapeRemove()}
              >
                {`Shape ` + shapeName}
                <span>
                  <IoClose />
                </span>
              </Link>
            </div>
          )}

          {localBridalData === true && (
            <>
              <span
                onClick={getBridalSetData}
                className={`Bridal-Sets-Only-bread-crumb ${
                  localBridalData === true ? "active" : ""
                }`}
              >
                <span> Bridal Sets Only</span>{" "}
                <span>
                  <IoClose />
                </span>
              </span>
            </>
          )}

          <Link
            href="javascript:void(0);"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              resetAllColor();
            }}
            className={`${
              getLocalStoreMetal == 1 || metalId == 1
                ? "style-active-common color"
                : "color"
            }`}
          >
            <span>
              White Color
              <IoClose />
            </span>
          </Link>
          <Link
            href="javascript:void(0);"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              resetAllColor();
            }}
            className={`${
              getLocalStoreMetal == 2 || metalId == 2
                ? "style-active-common color"
                : "color"
            }`}
          >
            <span>
              Yellow Color
              <IoClose />{" "}
            </span>
          </Link>
          <Link
            href="javascript:void(0);"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              resetAllColor();
            }}
            className={`${
              getLocalStoreMetal == 3 || metalId == 3
                ? "style-active-common color"
                : "color"
            }`}
          >
            <span>
              Pink Color
              <IoClose />{" "}
            </span>
          </Link>
          <Link
            href="javascript:void(0);"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              resetAllColor();
            }}
            className={`${
              getLocalStoreMetal == 7 || metalId == 7
                ? "style-active-common color"
                : "color"
            }`}
          >
            <span>
              Platinum Color
              <IoClose />{" "}
            </span>
          </Link>
          {(activeStyleIds.length > 0 || shapeName || metalId) && (
            <div className="breadCram">
              <Link
                href="javascript:void(0);"
                onClick={(e) => {
                  resetAllShape();
                }}
              >
                <span>
                  Reset All
                  <IoClose />
                </span>
              </Link>
            </div>
          )}
        </div>

        <div className="resultdata setings-Page-img">
          {filterRoseData.length > 0 &&
            filterRoseData.map((item, index) => (
              <div
                key={index}
                className="resultdata all-pages-data "
                onClick={() =>
                  secureLocalStorage.removeItem("diamond_type_ring")
                }
              >
                <div className="outerDiv" id={`items-${item.id}`}>
                  <Link
                    href={`${
                      newData.length > 0
                        ? `/detail-ring-product-gemstone/${item.slug}/?color=${
                            activeColor[item?.id] || metalColorValue
                          }&stock_num=${stock_num ? stock_num : ""}`
                        : `/engagement-ring/${item.slug}/?color=${
                            activeColor[item.id] || metalColorValue
                          }${stock_num ? `&stock_num=${stock_num}` : ""}${
                            diamond_origin
                              ? `&diamond_origin=${diamond_origin}`
                              : ""
                          }`
                    }`}
                  >
                    <div className="main-common-active product-main-img">
                      <div className="all-img1 common-img defaultImg White">
                        <span className="common-stand-img-1">
                          <LazyLoadImage
                            width="auto"
                            height="auto"
                            effect="blur"
                            className="lazy-image"
                            src={item.image}
                            alt={item.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                            }}
                          />
                        </span>
                        <span className="common-stand-img white-stand-img">
                          <LazyLoadImage
                            width="auto"
                            height="auto"
                            effect="blur"
                            src={`${imgBaseUrl}/${item.imageName}/${item.imageName}.side.jpg`}
                            alt={item.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                            }}
                          />
                        </span>
                        <LazyLoadImage
                          width="auto"
                          height="auto"
                          effect="blur"
                          className="video-poster"
                          src="https://www.icegif.com/wp-content/uploads/2023/07/icegif-1260.gif"
                          alt={item.name}
                        />
                      </div>

                      <div className="all-img1 img-1 common-img Yellow">
                        <span className="common-stand-img-1">
                          <LazyLoadImage
                            width="auto"
                            height="auto"
                            effect="blur"
                            src={`${imgBaseUrl}/${item.imageName}/${item.imageName}.alt.jpg`}
                            alt={item.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                            }}
                          />
                        </span>
                        <span className="common-stand-img yellow-stand-img">
                          <LazyLoadImage
                            width="auto"
                            height="auto"
                            effect="blur"
                            src={`${imgBaseUrl}/${item.imageName}/${item.imageName}.side.alt.jpg`}
                            alt={item.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                            }}
                          />
                        </span>
                      </div>

                      <div className="all-img1 img-2 common-img Pink">
                        <span className="common-stand-img-1">
                          <LazyLoadImage
                            width="auto"
                            height="auto"
                            effect="blur"
                            src={`${imgBaseUrl}/${item.imageName}/${item.imageName}.alt1.jpg`}
                            alt={item.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                            }}
                          />
                        </span>
                        <span className="common-stand-img rose-stand-img">
                          <LazyLoadImage
                            width="auto"
                            height="auto"
                            effect="blur"
                            src={`${imgBaseUrl}/${item.imageName}/${item.imageName}.side.alt1.jpg`}
                            alt={item.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                            }}
                          />
                        </span>
                      </div>
                      <div className="all-img1 img-3 common-img Platinum">
                        <span className="common-stand-img-1">
                          <LazyLoadImage
                            width="auto"
                            height="auto"
                            effect="blur"
                            src={item.image}
                            alt={item.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                            }}
                          />
                        </span>
                        <span className="common-stand-img platinum-stand-img">
                          <LazyLoadImage
                            width="auto"
                            height="auto"
                            effect="blur"
                            src={`${imgBaseUrl}/${item.imageName}/${item.imageName}.side.jpg`}
                            alt={item.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                            }}
                          />
                        </span>
                      </div>
                    </div>

                    <div className="heart-icon">
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
                                  ring,
                                  item.id,
                                  white,
                                  item.white_gold_price,
                                  item.imageName,
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
                                item.imageName,
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
                          key={index}
                          className={`all-card-four-color ${MetalColor.name}${
                            (item.id === activePage &&
                              activeColor === MetalColor.slug) ||
                            MetalColor.slug == "18k-white-gold" ||
                            changeName == MetalColor.slug
                              ? " active"
                              : ""
                          }`}
                        >
                          <Link
                            href="javascript:void(0)"
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
                          key={index}
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
          {filterRoseData.length < 1 && (
            <h3 className="center">
              {loading ? <LoaderSpinner /> : "Data Not Found"}
            </h3>
          )}
        </div>

        {/* =================server side */}
        <div className="resultdata setings-Page-img server-side">
          {filterRoseDatas.length > 0 ? (
            filterRoseDatas.map((item, index) => (
              <div
                key={index}
                className="resultdata all-pages-data "
                onClick={() =>
                  secureLocalStorage.removeItem("diamond_type_ring")
                }
              >
                <div className="outerDiv" id={`items-${item.id}`}>
                  <Link
                    href={`${
                      newData.length > 0
                        ? `/detail-ring-product-gemstone/${item.slug}/?color=${
                            activeColor[item?.id] || metalColorValue
                          }&stock_num=${stock_num ? stock_num : ""}`
                        : `/engagement-ring/${item.slug}/?color=${
                            activeColor[item.id] || metalColorValue
                          }${stock_num ? `&stock_num=${stock_num}` : ""}${
                            diamond_origin
                              ? `&diamond_origin=${diamond_origin}`
                              : ""
                          }`
                    }`}
                  >
                    <div className="main-common-active product-main-img">
                      <div className="all-img1 common-img defaultImg White">
                        <span className="common-stand-img-1">
                          <LazyLoadImage
                            width="auto"
                            height="auto"
                            effect="blur"
                            className="lazy-image"
                            src={item.default_image_url}
                            alt={item.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                            }}
                          />
                        </span>
                        <span className="common-stand-img white-stand-img">
                          <LazyLoadImage
                            width="auto"
                            height="auto"
                            effect="blur"
                            src={`${imgBaseUrl}/${item.internal_sku}/${item.internal_sku}.side.jpg`}
                            alt={item.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                            }}
                          />
                        </span>
                        <LazyLoadImage
                          width="auto"
                          height="auto"
                          effect="blur"
                          className="video-poster"
                          src="https://www.icegif.com/wp-content/uploads/2023/07/icegif-1260.gif"
                          alt={item.name}
                        />
                      </div>

                      <div className="all-img1 img-1 common-img Yellow">
                        <span className="common-stand-img-1">
                          <LazyLoadImage
                            width="auto"
                            height="auto"
                            effect="blur"
                            src={`${imgBaseUrl}/${item.internal_sku}/${item.internal_sku}.alt.jpg`}
                            alt={item.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                            }}
                          />
                        </span>
                        <span className="common-stand-img yellow-stand-img">
                          <LazyLoadImage
                            width="auto"
                            height="auto"
                            effect="blur"
                            src={`${imgBaseUrl}/${item.internal_sku}/${item.internal_sku}.side.alt.jpg`}
                            alt={item.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                            }}
                          />
                        </span>
                      </div>

                      <div className="all-img1 img-2 common-img Pink">
                        <span className="common-stand-img-1">
                          <LazyLoadImage
                            width="auto"
                            height="auto"
                            effect="blur"
                            src={`${imgBaseUrl}/${item.internal_sku}/${item.internal_sku}.alt1.jpg`}
                            alt={item.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                            }}
                          />
                        </span>
                        <span className="common-stand-img rose-stand-img">
                          <LazyLoadImage
                            width="auto"
                            height="auto"
                            effect="blur"
                            src={`${imgBaseUrl}/${item.internal_sku}/${item.internal_sku}.side.alt1.jpg`}
                            alt={item.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                            }}
                          />
                        </span>
                      </div>
                      <div className="all-img1 img-3 common-img Platinum">
                        <span className="common-stand-img-1">
                          <LazyLoadImage
                            width="auto"
                            height="auto"
                            effect="blur"
                            src={item.default_image_url}
                            alt={item.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                            }}
                          />
                        </span>
                        <span className="common-stand-img platinum-stand-img">
                          <LazyLoadImage
                            width="auto"
                            height="auto"
                            effect="blur"
                            src={`${imgBaseUrl}/${item.internal_sku}/${item.internal_sku}.side.jpg`}
                            alt={item.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                            }}
                          />
                        </span>
                      </div>
                    </div>

                    <div className="heart-icon">
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
                                  ring,
                                  item.id,
                                  white,
                                  item.white_gold_price,
                                  item.internal_sku,
                                  item.internal_sku
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
                                item.internal_sku,
                                item.internal_sku
                              );
                            }}
                          />
                        )}
                      </Link>
                    </div>

                    <div className="main-common-active all-card-four-colors ">
                      {metalColor.map((MetalColor, index) => (
                        <div
                          key={index}
                          className={`all-card-four-color ${MetalColor.name}${
                            (item.id === activePage &&
                              activeColor === MetalColor.slug) ||
                            MetalColor.slug == "18k-white-gold" ||
                            changeName == MetalColor.slug
                              ? " active"
                              : ""
                          }`}
                        >
                          <Link
                            href="javascript:void(0)"
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
                          key={index}
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
            ))
          ) : (
            <h3 className="center">{loading ? null : "Data Not Found"}</h3>
          )}
        </div>
        {/* =================server side end */}
        {/* <div>
          <ProductListMoreToExplore />
          </div> */}
        <div>{/* <ProductListFaq /> */}</div>
      </div>
    </>
  );
};

export default StartWithASetting;
