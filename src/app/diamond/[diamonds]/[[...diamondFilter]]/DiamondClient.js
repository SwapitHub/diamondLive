"use client";
import axios from "axios";
import debounce from "lodash.debounce";
import Link from "next/link";
import { useContext, useEffect, useMemo, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import SlickSlider from "react-slick";
import Slider from "react-slider";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import LoaderSpinner from "@/app/_componentStatic/LoaderSpinner";
import { Tabbing } from "@/app/_componentStatic/Tabbing";
import { UserContext } from "@/app/context/UserContext";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { IoClose } from "react-icons/io5";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import secureLocalStorage from "react-secure-storage";

const ChooseDiamondsShape = ({ diamonds, diamondsFilter }) => {
  const router = useRouter();
  var  productSlug  = diamondsFilter;
  const searchParams = useSearchParams();
  const font_style = searchParams.get("font_style");
  const textEngraving = searchParams.get("textEngraving");
  const productColor = searchParams.get("color");
  const [menuShapeName, setMenuShapeName] = useState();
  const listColor = searchParams.get("color");
  const diamond_original = searchParams.get("diamond_original");
  const center_stone = searchParams.get("center_stone");
  const ring_size = searchParams.get("ring_size");
  const diamondColor = searchParams.get("diamonds");
  const history = useRouter();
  const dispatch = useDispatch();
  const compareData = useSelector((state) => state.compareData);
  const pageSize = 30;


  useEffect(()=>{
    if(diamonds === 'shape'){
      setMenuShapeName(diamondsFilter)
    }
  },[])
  let shapeSlider = "";
  if (menuShapeName) {
    shapeSlider = `&shapes[]=${
      menuShapeName?.slice(0, 1).toUpperCase() + menuShapeName?.slice(1)
    }`;
  }
  const conMenuShapeName = menuShapeName?.split(" ");
  const [shapeDataSlider, setShapeDataSlider] = useState([]);

  useEffect(() => {
    const item = secureLocalStorage.getItem("shapeDiamondData");

    let storedData = [];
    if (item) {
      try {
        storedData = JSON.parse(item);
      } catch (error) {
        console.error(
          "Failed to parse shapeDiamondData from secureLocalStorage:",
          error
        );
      }
    }
    setShapeDataSlider(storedData);
  }, []);

  useEffect(() => {
    if (menuShapeName) {
      setShapeDataSlider(conMenuShapeName);
      secureLocalStorage.setItem(
        "shapeDiamondData",
        JSON.stringify(conMenuShapeName)
      );
    }
  }, [menuShapeName]);

  // const [menuShapeNames, setMenuShapeNames] = useState(menuShapeName);
  const [labGrownDetails, setLabGrownDetails] = useState();
  
  const [activeResult, setActiveResult] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");

  const pathSegments = location.pathname.split("/");
  const lastPathSegment = pathSegments[pathSegments.length - 1];
  const initialType = lastPathSegment === "lab_grown" ? "lab_grown" : "natural";
  const [type, setType] = useState(initialType);

  const [newDiamondType, setNewDiamondType] = useState(diamond_original || initialType);

  
  const handleTypeChange = (newType) => {
    setType(newType);
    setNewDiamondType(newType);

    if (!productSlug) {
      history.push(
        `/engagement-rings/start-with-a-diamond${
          newType === "lab_grown" ? "/lab_grown" : ""
        }${location.search}`
      );
    }
  };

  const { baseUrl, imgAssetsUrl } = useContext(UserContext);
  useEffect(() => {
    const newPathSegments = location.pathname.split("/");
    const newLastPathSegment = newPathSegments[newPathSegments.length - 1];
    const newType = newLastPathSegment === "lab_grown" ? "lab_grown" : "natural";
    setNewDiamondType(newType);
    setType(newType);
  }, [location.pathname]);

  const [checked, setChecked] = useState(false);
  const [checkedSecond, setCheckedSecond] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const resultArray = ["D", "F", "H", "K", "O", "R", "U", "Z"];
  const clarityOptions = ["VVS1", "VS1", "SI1", "SI3", "VS", "VVS", "FL", "IF"];
  const cutOptions = [
    "Ideal",
    "Excellent",
    "Very Good",
    "Good",
    "Fair",
    "Poor",
  ];
  let updatedArray = [...resultArray];
  const [sliderValue, setSliderValue] = useState([]);

  const [cutSliderValue, setCutSliderValue] = useState([]);
  const [claritySliderValue, setClaritySliderValue] = useState([]);

  function handleChange() {
    setChecked(!checked);
  }
  function handleChanges() {
    setCheckedSecond(!checkedSecond);
  }

  const shape = "shape";
  const moreFilter = "moreFilter";
  const [filterProduct, setFilterProduct] = useState(moreFilter);
  // range slider==============
  const minCaratRange = 0.01;
  const maxCaratRange = 15.0;
  const [minCarat, setMinCarat] = useState(minCaratRange);
  const [maxCarat, setMaxCarat] = useState(maxCaratRange);
  const [caratRange, setCaratRange] = useState([
    center_stone ? center_stone : 0.01,
    15.0,
  ]);

  const minDiamondPriceRange = 100;
  const maxDiamondPriceRange = 100000;
  const [minDiamondPrice, setMinDiamondPrice] = useState(minDiamondPriceRange);
  const [maxDiamondPrice, setMaxDiamondPrice] = useState(maxDiamondPriceRange);
  const [diamondPriceRange, setDiamondPriceRange] = useState([100, 100000]);

  // color
  const minColorRange = 0;
  const maxColorRange = 100;
  const [colorRange, setColorRange] = useState([minColorRange, maxColorRange]);
  // cut
  const minCutRange = 0;
  const maxCutRange = 100;

  const [cutRange, setCutRange] = useState([minCutRange, maxCutRange]);

  // clarity
  const minClarityRange = 0;
  const maxClarityRange = 100;
  const [clarityRange, setClarityRange] = useState([
    minClarityRange,
    maxClarityRange,
  ]);
  // range slider end========================
  const [data, setData] = useState([]);
  const [totalDiamond, setTotalDiamond] = useState([]);
  const [diamondFilter, setDiamondFilter] = useState(
    diamondColor ? moreFilter : shape
  );
  const [shapeData, setShapeData] = useState([]);
  const [shapeName, setShapeName] = useState([]);
  const [activeStyleIds, setActiveStyleIds] = useState([]);

  useEffect(() => {
    if (shapeDataSlider) {
      try {
        secureLocalStorage?.setItem(
          "shapeDiamondData",
          JSON.stringify(shapeDataSlider)
        );
      } catch (e) {
        console.error("Failed to stringify shape data:", e);
      }
    }
  }, [shapeDataSlider]);

  const handleShapeClick = (styleItem) => {
    // Ensure shapeDataSlider is an array
    const currentShapeDataSlider = Array.isArray(shapeDataSlider)
      ? shapeDataSlider
      : [];

    let updatedShapeDataSlider;

    if (currentShapeDataSlider.includes(styleItem)) {
      // Remove item from array
      updatedShapeDataSlider = currentShapeDataSlider.filter(
        (item) => item !== styleItem
      );
    } else {
      // Add item to array
      updatedShapeDataSlider = [...currentShapeDataSlider, styleItem];
    }

    if (menuShapeName && shapeDataSlider.length == 1) {
      setMenuShapeName("");
    }
    setShapeDataSlider(updatedShapeDataSlider);

    // Save to local storage
    secureLocalStorage.setItem(
      "shapeDiamondData",
      JSON.stringify(updatedShapeDataSlider)
    );
  };

  const handleRemoveShape = (shape) => {
    setShapeDataSlider((prevSelectedStyles) =>
      prevSelectedStyles?.filter((selectedShape) => selectedShape !== shape)
    );
    if(menuShapeName){

      setMenuShapeName('')
    }
    secureLocalStorage.setItem("shapeDiamondData", shapeDataSlider);
  };
  const handleRemoveCarat = () => {
    setCaratRange([minCaratRange, maxCaratRange]);
    secureLocalStorage.removeItem("caratfilter");
  };
  const handleRemovePrice = () => {
    setDiamondPriceRange([minDiamondPriceRange, maxDiamondPriceRange]);
    secureLocalStorage.removeItem("pricefilter");
  };
  const handleRemoveColor = () => {
    setColorRange([minColorRange, maxColorRange]);
    setSliderValue([]);
    secureLocalStorage.removeItem("colorRange");
    secureLocalStorage.removeItem("colorfilter");
  };
  const handleRemoveClarity = () => {
    setClarityRange([minClarityRange, maxClarityRange]);
    setClaritySliderValue([]);
    secureLocalStorage.removeItem("clarityfilter");
    secureLocalStorage.removeItem("clarityRange");
  };
  const handleRemoveCut = () => {
    setCutRange([minCutRange, maxCutRange]);
    setCutSliderValue([]);
    secureLocalStorage.removeItem("cutfilter");
    secureLocalStorage.removeItem("cutRange");
  };
  const handleResetAll = () => {
    const searchParams = new URLSearchParams(location.search);
    if (menuShapeName) {
      setMenuShapeName("");
    }
    setShapeDataSlider([]);
    setCaratRange([minCaratRange, maxCaratRange]);
    setDiamondPriceRange([minDiamondPriceRange, maxDiamondPriceRange]);
    setColorRange([minColorRange, maxColorRange]);
    setClarityRange([minClarityRange, maxClarityRange]);
    setCutRange([minCutRange, maxCutRange]);
    setSliderValue([]);
    setClaritySliderValue([]);
    setCutSliderValue([]);
    setSelectedOption("");
    secureLocalStorage.removeItem("caratfilter");
    secureLocalStorage.removeItem("pricefilter");
    secureLocalStorage.removeItem("colorRange");
    secureLocalStorage.removeItem("colorfilter");
    secureLocalStorage.removeItem("cutfilter");
    secureLocalStorage.removeItem("cutRange");
    secureLocalStorage.removeItem("clarityfilter");
    secureLocalStorage.removeItem("clarityRange");
    secureLocalStorage.removeItem("selectedOption");
    secureLocalStorage.removeItem("shapeDiamondData");
  };

  const newShapeSliderData = shapeDataSlider
    ?.map(
      (shape) => `&shapes[]=${shape.slice(0, 1).toUpperCase() + shape.slice(1)}`
    )
    .join("");

  // Setting filters to secureLocalStorage
  useEffect(() => {
    const savedCaratRange = JSON.parse(
      secureLocalStorage.getItem("caratfilter")
    );
    const savedPriceRange = JSON.parse(
      secureLocalStorage.getItem("pricefilter")
    );
    const savedColorRange = JSON.parse(
      secureLocalStorage.getItem("colorfilter")
    );
    const savedColorValue = JSON.parse(
      secureLocalStorage.getItem("colorRange")
    );
    const savedCutRange = JSON.parse(secureLocalStorage.getItem("cutfilter"));
    const savedCutValue = JSON.parse(secureLocalStorage.getItem("cutRange"));
    const savedClarityRange = JSON.parse(
      secureLocalStorage.getItem("clarityfilter")
    );
    const savedClarityValue = JSON.parse(
      secureLocalStorage.getItem("clarityRange")
    );
    const selectedValue = secureLocalStorage.getItem("selectedOption");
    secureLocalStorage.getItem("diamondType");

    // Handle null values

    if (selectedValue !== null) {
      setSelectedOption(selectedValue);
    }
    if (savedCaratRange !== null) {
      setCaratRange(savedCaratRange);
    }
    if (savedPriceRange !== null) {
      setDiamondPriceRange(savedPriceRange);
    }
    if (savedColorRange !== null && savedColorValue !== null) {
      setSliderValue(
        Array.isArray(savedColorRange)
          ? savedColorRange
          : savedColorRange.split(",").map((item) => item.trim())
      );
      setColorRange(savedColorValue);
    }

    if (savedClarityRange !== null && savedClarityValue) {
      setClarityRange(savedClarityValue);
      setClaritySliderValue(savedClarityRange);
    }

    if (savedCutRange !== null && savedCutValue !== null) {
      setCutRange(savedCutValue);
      setCutSliderValue(savedCutRange);
    }
  }, []);

  if (center_stone) {
    secureLocalStorage.setItem(
      "caratfilter",
      JSON.stringify([center_stone, maxCaratRange])
    );
  }

  useEffect(() => {
    secureLocalStorage.setItem("colorRange", JSON.stringify(colorRange));
    secureLocalStorage.setItem("colorfilter", JSON.stringify(sliderValue));
    secureLocalStorage.setItem("clarityRange", JSON.stringify(clarityRange));
    secureLocalStorage.setItem(
      "clarityfilter",
      JSON.stringify(claritySliderValue)
    );
    secureLocalStorage.setItem("cutRange", JSON.stringify(cutRange));
    secureLocalStorage.setItem("cutfilter", JSON.stringify(cutSliderValue));
    secureLocalStorage.setItem("selectedOption", selectedOption);
    secureLocalStorage.setItem("diamondType", newDiamondType);
  }, [
    colorRange,
    sliderValue,
    clarityRange,
    claritySliderValue,
    cutRange,
    cutSliderValue,
    newDiamondType,
    selectedOption,
  ]);

  useMemo(() => {
    if (activeResult === 1) {
      const fetchData = debounce(async () => {
        const url = `https://apiservices.vdbapp.com//v2/diamonds?type=${
          newDiamondType == "lab_grown" ? "Lab_grown_diamond" : "Diamond"
        }&markup_mode=true${
          diamondPriceRange[1]
            ? `&price_total_to=${
                diamondPriceRange[1] ? diamondPriceRange[1] : ""
              }`
            : ""
        }${
          diamondPriceRange[0]
            ? ` &price_total_from=${
                diamondPriceRange[0] ? diamondPriceRange[0] : ""
              }`
            : ""
        }${
          caratRange[0]
            ? `&size_from=${caratRange[0] ? caratRange[0] : ""}`
            : ""
        }${
          caratRange[1] ? `&size_to=${caratRange[1] ? caratRange[1] : ""}` : ""
        }${
          sliderValue[0]
            ? `&color_from=${sliderValue[0] ? sliderValue[0] : ""}`
            : ""
        }${
          sliderValue[sliderValue.length - 1]
            ? `&color_to=${
                sliderValue[sliderValue.length - 1]
                  ? sliderValue[sliderValue.length - 1]
                  : ""
              }`
            : ""
        }&page_number=${page}${
          cutSliderValue[cutSliderValue.length - 1]
            ? `&cut_from=${
                cutSliderValue[cutSliderValue.length - 1]
                  ? cutSliderValue[cutSliderValue.length - 1]
                  : ""
              }`
            : ""
        }${
          cutSliderValue[0]
            ? `&cut_to=${cutSliderValue[0] ? cutSliderValue[0] : ""}`
            : ""
        }${newShapeSliderData ? newShapeSliderData : ""}${
          shapeSlider ? shapeSlider : ""
        }${
          claritySliderValue[0]
            ? `&clarity_from=${
                claritySliderValue[0] ? claritySliderValue[0] : ""
              }`
            : ""
        }${
          claritySliderValue[claritySliderValue.length - 1]
            ? `&clarity_to=${
                claritySliderValue[claritySliderValue.length - 1]
                  ? claritySliderValue[claritySliderValue.length - 1]
                  : ""
              }`
            : ""
        }&with_images=true`;

        const params = {
          stock_item_type: "Diamond",
          status: "pending",
          page_number: page,
          page_size: pageSize,
        };

        const headers = {
          Authorization:
            "Token token=CX7r3wiul169qAGnMjzlZm8iEpJIMAgks_IgGD0hywg, api_key=_amT48wMLQ3rh4SP1inCzRQ",
        };

        
        try {
          setLoading(true);

          const response = await axios.get(url, { params, headers });
          if (response.status === 200) {
            if (page === 1) {
              setData(response.data.response.body.diamonds);
              setTotalDiamond(response.data.response.body.total_diamonds_found);
            } else {
              setData((prevData) => [
                ...prevData,
                ...response.data.response.body.diamonds,
              ]);
              setTotalDiamond(response.data.response.body.total_diamonds_found);
            }
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      });
      fetchData();

      window.addEventListener("beforeunload", (event) => {
        fetchData();
      });

      window.addEventListener("unload", (event) => {
        fetchData();
      });
    }
  }, [
    diamondPriceRange,
    caratRange,
    claritySliderValue,
    cutSliderValue,
    sliderValue,
    page,
    newDiamondType,
    newShapeSliderData,
    shapeSlider,
  ]);

  useEffect(() => {
    setPage(1);
  }, [
    diamondPriceRange,
    caratRange,
    sliderValue,
    cutSliderValue,
    claritySliderValue,
    newDiamondType,
    newShapeSliderData,
    shapeSlider,
  ]);
  // Scroll pagination start
  useEffect(() => {
    const handleInfiniteScroll = () => {
      try {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        const totalPagesNeeded = Math.ceil(totalDiamond / pageSize);

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

    if (page * pageSize < totalDiamond && !loading) {
      window.addEventListener("scroll", handleInfiniteScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, [loading]);
  // Scroll pagination end

  //  =====================scroll pagination end===================

  // =============== shop by shape start ==============
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

  // =============== shop by shape end ==============
  // =============== shop by price range==============

  const caratHandleChange = (newRange) => {
    secureLocalStorage.setItem("caratfilter", JSON.stringify(newRange));
    setCaratRange(newRange);
    setMinCarat(newRange[0]);
    setMaxCarat(newRange[1]);
  };

  const diamondPriceHandleChange = (newRange) => {
    secureLocalStorage.setItem("pricefilter", JSON.stringify(newRange));
    setDiamondPriceRange(newRange);
    setMinDiamondPrice(newRange[0]);
    setMaxDiamondPrice(newRange[1]);
  };

  const colorHandleChange = (value) => {
    const colorRanges = [
      { label: "D", min: 0, max: 14.7 },
      { label: "F", min: 14.5, max: 29.4 },
      { label: "H", min: 29.2, max: 44.1 },
      { label: "K", min: 44, max: 58.8 },
      { label: "O", min: 58.5, max: 73.5 },
      { label: "R", min: 73.1, max: 88.2 },
      { label: "U", min: 88, max: 100 },
      { label: "Z", min: 100, max: 100 },
    ];

    updatedArray = updatedArray.filter((item) => {
      const range = colorRanges.find((range) => range.label === item);
      return !(value[0] >= range.max || value[1] <= range.min);
    });

    const resultString = updatedArray.join(", ");
    setSliderValue(resultString);
    secureLocalStorage.setItem("colorRange", JSON.stringify(value));
    secureLocalStorage.setItem("colorfilter", JSON.stringify(resultString));

    if (value[0] <= 0 && value[1] >= 100) {
      setSliderValue([]);
      setColorRange([minColorRange, maxColorRange]);
    } else {
      setColorRange(value);
    }
  };

  const cutHandleChange = (newRange) => {
    let updatedCutArray = cutOptions.slice();
    const cutRanges = [
      { label: "Ideal", min: 0, max: 17 },
      { label: "Excellent", min: 17, max: 34 },
      { label: "Very Good", min: 34, max: 51 },
      { label: "Good", min: 51, max: 68 },
      { label: "Fair", min: 68, max: 85 },
      { label: "Poor", min: 85, max: 100 },
    ];

    updatedCutArray = updatedCutArray.filter((item) => {
      const range = cutRanges.find((range) => range.label === item);
      return !(newRange[0] >= range.max || newRange[1] <= range.min);
    });

    setCutSliderValue(updatedCutArray);
    secureLocalStorage.setItem("cutRange", JSON.stringify(newRange));
    secureLocalStorage.setItem("cutfilter", JSON.stringify(updatedCutArray));

    if (newRange[0] <= 0 && newRange[1] >= 100) {
      setCutSliderValue([]);
      setCutRange([0, 100]);
    } else {
      setCutRange(newRange);
    }
  };

  const clarityHandleChange = (newRange) => {
    let updateClarityOptions = clarityOptions.slice();

    const clarityRanges = [
      { label: "VVS1", min: 0, max: 14.7 },
      { label: "VS1", min: 14.5, max: 29.4 },
      { label: "SI1", min: 29.2, max: 44.1 },
      { label: "SI3", min: 44, max: 58.8 },
      { label: "VS", min: 58.5, max: 73.5 },
      { label: "VVS", min: 73.1, max: 88.2 },
      { label: "FL", min: 88, max: 100 },
      { label: "IF", min: 100, max: 100 },
    ];

    updateClarityOptions = updateClarityOptions.filter((item) => {
      const range = clarityRanges.find((range) => range.label === item);
      return !(newRange[0] >= range.max || newRange[1] <= range.min);
    });

    setClaritySliderValue(updateClarityOptions);
    secureLocalStorage.setItem("clarityRange", JSON.stringify(newRange));
    secureLocalStorage.setItem(
      "clarityfilter",
      JSON.stringify(updateClarityOptions)
    );

    if (newRange[0] <= 0 && newRange[1] >= 100) {
      setClaritySliderValue([]);
      setClarityRange([minClarityRange, maxClarityRange]);
    } else {
      setClarityRange(newRange);
    }
  };
  // ===============shop by price range end==============

  const FilterProduct = (filterData) => {
    setDiamondFilter(filterData);
  };

  const [getTableData, setGetTableData] = useState([]);

  const findTableData = (shape, price, carat, color, clarity) => {
    const newData = { shape, price, carat, color, clarity };
    setGetTableData((prevData) => [...prevData, newData]);
  };

  const [activeUL, setActiveUL] = useState(null);
  const handleClick = (ulName) => {
    setActiveUL(ulName === activeUL ? null : ulName);
  };

  // What Matters Filters

  const handleWhatMatters = (e) => {
    setSelectedOption(e.target.value);
    switch (e.target.value) {
      case "optimal_balance":
        setColorRange([14.5, 29.4]);
        setSliderValue(["F", "G", "H"]);
        setCutRange([17, 51]);
        setCutSliderValue(["Excellent", "Very Good"]);
        setClarityRange([14.5, 29.4]);
        setClaritySliderValue(["VS1", "VS2", "SI1"]);
        break;
      case "max_brilliance":
        setCutRange([17, 34]);
        setCutSliderValue(["Excellent"]);
        setColorRange([minColorRange, maxColorRange]);
        setSliderValue([]);
        setClarityRange([minClarityRange, maxClarityRange]);
        setClaritySliderValue([]);
        break;
      case "superior_quality":
        setCutRange([0, 34]);
        setCutSliderValue(["Ideal", "Excellent"]);
        setColorRange([0, 14.5]);
        setSliderValue(["D", "E", "F"]);
        setClarityRange([0, 88]);
        setClaritySliderValue(["VVS2", "FL"]);
        break;
      default:
        setColorRange([minColorRange, maxColorRange]);
        setSliderValue([]);
        setCutSliderValue([]);
        setCutRange([minCutRange, maxCutRange]);
        setClarityRange([minClarityRange, maxClarityRange]);
        setClaritySliderValue([]);
    }
  };
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

  const diamondShape = {
    dots: false,
    infinite: true,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
  };

  // loader
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timeout = setTimeout(() => {
      setLoader(false);
    }, 2000);

    // Cleanup timeout
    return () => clearTimeout(timeout);
  }, []);

  const [clickedCheckboxes, setClickedCheckboxes] = useState([]);
  const [compareClickedItem, setCompareClickedItem] = useState([]);
  useEffect(() => {
    const savedState = secureLocalStorage.getItem("compareCount");
    if (savedState) {
      setClickedCheckboxes(JSON.parse(savedState));
    }
  }, []);

  const trackClick = (id, item) => {
    setClickedCheckboxes((prevState) => {
      let updatedState;
      if (prevState?.includes(id)) {
        updatedState = prevState.filter((presentState) => presentState !== id);
        dispatch(removeToCompare(item));
      } else {
        updatedState = [...prevState, id];
        dispatch(addToCompare(item));
      }
      secureLocalStorage.setItem("compareCount", JSON.stringify(updatedState));
      return updatedState;
    });
  };

  // ============ price  lab_grown =======================//
  useMemo(() => {
    axios
      .get(
        `${baseUrl}/get_product_price?product_sku=${
          filterData.product?.sku
        }&metalType=${
          listColor === "Platinum" ? "Platinum" : "18kt"
        }&metalColor=${
          filterData.product?.metalColor
        }&diamond_type=${diamond_original}`
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
    filterData
  ]);
  useEffect(() => {
    if (center_stone) {
      setColorRange([14.5, 29.4]);
      setSliderValue(["F", "G", "H"]);
      setCutRange([17, 34]);
      setCutSliderValue(["Excellent"]);
      setClarityRange([14.5, 29.4]);
      setClaritySliderValue(["VS1", "VS2", "SI1"]);
    }
  }, []);
  const [filterbutton, setFilterbutton] = useState(false);
  const filter_button = () => {
    setFilterbutton(!filterbutton);
  };
  const pathSegmentsMeta = location.pathname
    .split("/")
    .filter((segment) => segment);
  const mainCategory = pathSegmentsMeta[0] || "";
  const subCategory = pathSegmentsMeta[1] || "";
  const lastCategory = pathSegmentsMeta[2] || "";

  const currentUrl = window.location.href;

  const newSubCategory = location.pathname.substring(1);

  const [loadedIframes, setLoadedIframes] = useState({});

  const handleIframeLoad = (id) => {
    setLoadedIframes((prevState) => ({ ...prevState, [id]: true }));
  };

  return (
    <>
      {/* <HeaderMetaTag
        mainCategory={mainCategory}
        subCategory={newSubCategory}
        // image="https://d24ppbhzdyfrur.cloudfront.net/uploads/image_url/s3_image/36274429/1701007RubyCushion1_17ct_3932_77c52f06-f67b-4338-8cd9-abcd817c178c.jpg"
        currentUrl={currentUrl}
      /> */}

      <div
        className={`container choose-diamonds container-1290-list-pages ${
          productSlug ? "chooseDiamond-active" : null
        }`}
      >
        <h1 className="center">
          {menuShapeName
            ? `${menuShapeName}  Cut Diamonds`.trim()
            : "Design your own Diamond Engagement Ring"}
        </h1>

        {productSlug ? (
          <div className="main-arrow-heading">
            <Tabbing
              stock_num={productSlug}
              type={"diamond"}
              ringName={`1. Choose Rings`}
              ringLink={`/engagement-rings/start-with-a-setting`}
              diamondName={`2. Choose Diamonds`}
              diamondLink={`javascript:void(0)`}
            />
          </div>
        ) : (
          <div className="main-arrow-heading">
            <Tabbing
              stock_num={productSlug}
              type={"diamond"}
              ringName={`2. Choose Rings`}
              ringLink={`/engagement-rings/start-with-a-setting`}
              diamondName={`1. Choose Diamonds`}
              diamondLink={`javascript:void(0)`}
            />
          </div>
        )}

        <div className="diamond-table-btn desktop">
          <div
            className={`diamond-by-common diamondBy-shape  ${
              diamondFilter == shape ? "active" : ""
            }`}
          >
            <Link
              href="javascript:void(0);"
              onClick={() => {
                FilterProduct(shape);
              }}
            >
              Shape, Carat, & Price
            </Link>
          </div>

          <div
            className={`diamond-by-common diamondBy-more-filter ${
              diamondFilter == moreFilter ? "active" : ""
            }`}
          >
            <Link
              href="javascript:void(0);"
              onClick={() => {
                FilterProduct(moreFilter);
              }}
            >
              More Filters
            </Link>
          </div>
        </div>

        <div className="main-diamond-filter desktop">
          <div
            className={`shape-diamond-filter ${
              diamondFilter === "shape" ? "active" : ""
            }`}
          >
            <div className="lab-grown-shape-icons">
              <span>Diamond Shape</span>
              <div className="shape-icons">
                <SlickSlider
                  {...diamondShape}
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
                      breakpoint: 991,
                      settings: {
                        slidesToShow: 6,
                        slidesToScroll: 5,
                        infinite: true,
                      },
                    },
                  ]}
                >
                  {shapeData?.map((styleItem) => {
                    return (
                      <>
                        <Link
                          href="javascript:void(0)"
                          onClick={() => handleShapeClick(styleItem?.shape)}
                          className={`style-active-common-diamond ${
                            shapeDataSlider?.includes(styleItem?.shape)
                              ? "style-active-common"
                              : ""
                          }`}
                          key={styleItem.slug} // Add a unique key for each item in the map function
                        >
                          <div className="diamond-image-slider">
                            <LazyLoadImage
                              width="auto"
                              height="auto"
                              className={`shop-style-image-full`}
                              src={styleItem.icon}
                              alt={styleItem.shape}
                            />
                          </div>

                          <div className="shop-style-text">
                            <span>{styleItem.shape}</span>
                            {/* <span>{capitalizeFirstLetter(styleItem.shape)}</span> */}
                          </div>
                        </Link>
                      </>
                    );
                  })}
                </SlickSlider>
              </div>

              <div className="shape-slider-1">
                <span>Carat</span>
                <div className="slider-carat-slider">
                  <Slider
                    className="slider"
                    onAfterChange={caratHandleChange}
                    value={caratRange}
                    min={minCaratRange}
                    max={maxCaratRange}
                    step={0.01}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                  className="slider-carat-inner-text"
                >
                  <div className="range-slider-show"> {caratRange[0]}</div>
                  <div className="range-slider-show"> {caratRange[1]}</div>
                </div>
              </div>
            </div>
            <div className="shape-slider">
              <div className="Diamond-Original-main">
                <span>Diamond Origin:</span>
                <div className="Diamond-Original">
                  <Link
                    href="javascript:void(0)"
                    className={
                      productSlug
                        ? newDiamondType === "natural"
                          ? "nature-active"
                          : ""
                        : type === "" || type === "natural"
                        ? "nature-active"
                        : ""
                    }
                    onClick={() => handleTypeChange("natural")}
                  >
                    Natural
                  </Link>
                  <Link
                    href="javascript:void(0)"
                    className={
                      productSlug
                        ? newDiamondType === "lab_grown"
                          ? "nature-active"
                          : ""
                        : type === "lab_grown"
                        ? "nature-active"
                        : ""
                    }
                    onClick={() => handleTypeChange("lab_grown")}
                  >
                    Lab Grown
                  </Link>
                </div>
              </div>

              <div className="shape-slider-2">
                <span>Diamond Price</span>
                <div className="slider-diamond-price-slider slider-carat-slider">
                  <Slider
                    className="slider"
                    onAfterChange={diamondPriceHandleChange}
                    value={diamondPriceRange}
                    min={minDiamondPriceRange}
                    max={maxDiamondPriceRange}
                    step={10}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                  className="slider-content-main slider-carat-inner-text"
                >
                  <div className="range-slider-show">
                    ${diamondPriceRange[0]}
                  </div>
                  <div className="range-slider-show">
                    ${diamondPriceRange[1]}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`shape-diamond-more-filter ${
              diamondFilter === "moreFilter" ? "active" : ""
            }`}
          >
            <div className="slider-1">
              <div className="shape-color">
                <span>Color</span>
                <div className="slider-color-slider">
                  <Slider
                    className="slider"
                    onAfterChange={colorHandleChange}
                    value={colorRange}
                    min={minColorRange}
                    max={maxColorRange}
                    minDistance={14.7}
                    marks={[0, 14.6, 29.3, 44.1, 58.6, 73.4, 88.1]}
                    step={14.7}
                    trackStyle={{ backgroundColor: "red" }}
                  />
                </div>

                <div className="color-text">
                  <ul>
                    <li>D-F</li>
                    <li>F-H</li>
                    <li>H-K</li>
                    <li>K-O</li>
                    <li>O-R</li>
                    <li>R-U</li>
                    <li>U-Z</li>
                  </ul>
                </div>
              </div>

              <div className="shape-cut">
                <span>Cut</span>
                <div className="slider-clarity-slider">
                  <Slider
                    min={minCutRange}
                    max={maxCutRange}
                    value={cutRange}
                    onAfterChange={cutHandleChange}
                    minDistance={17}
                    marks={17}
                    step={17}
                  ></Slider>
                </div>

                <div className="cut-list-diamonds">
                  <ul>
                    <li>Ideal</li>
                    <li>
                      Excellent/
                      <br />
                      Super Ideal
                    </li>
                    <li>Very Good</li>
                    <li>Good</li>
                    <li>Fair</li>
                    <li>Poor</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="more-filter">
              <div className="more-filter-clarity">
                <span>Clarity</span>
                <div className="slider-clarity-slider">
                  <Slider
                    className="slider"
                    onAfterChange={clarityHandleChange}
                    min={minClarityRange}
                    max={maxClarityRange}
                    value={clarityRange}
                    minDistance={14.7}
                    marks={[0, 14.6, 29.3, 44.1, 58.6, 73.4, 88.1]}
                    step={14.7}
                    trackStyle={{ backgroundColor: "red" }}
                  />
                </div>

                <div className="color-text">
                  <ul className="clarity">
                    <li>VVS1-VS1</li>
                    <li>VS1-SI1</li>
                    <li>SI1-SI3</li>
                    <li>SI3-VS</li>
                    <li>VS-VVS</li>
                    <li>VVS-FL</li>
                    <li>FL-IF</li>
                  </ul>
                </div>
              </div>

              <div className="center diamond-table-sort">
                <form>
                  <select
                    name="sort-price"
                    id="sort"
                    onChange={handleWhatMatters}
                    value={selectedOption}
                  >
                    <option value="">What Matters Most To You?</option>
                    <option value="optimal_balance">Optimal Balance</option>
                    <option value="max_brilliance">Maximum Brilliance</option>
                    <option value="superior_quality">Superior Quality</option>
                  </select>
                </form>
              </div>
            </div>
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
          <div className="shop-by-page-common shop-by-shape-page  ">
            <div className="lab-grown-shape-icons  style-main">
              <span>Diamond Shape</span>
              <div className="shop-by-shape-style buttons-container filter-button">
                {shapeData.map((styleItem) => {
                  return (
                    <>
                      <Link
                        href="javascript:void(0)"
                        onClick={() => handleShapeClick(styleItem?.shape)}
                        className={`style-active-common-diamond ${
                          shapeDataSlider?.includes(styleItem?.shape) ||
                          menuShapeName === styleItem?.shape
                            ? "style-active-common"
                            : ""
                        }`}
                        key={styleItem.slug} // Add a unique key for each item in the map function
                      >
                        <div className="diamond-image-slider">
                          <LazyLoadImage
                            width="auto"
                            height="auto"
                            className={`shop-style-image-full`}
                            src={styleItem.icon}
                            alt={styleItem.shape}
                          />
                        </div>

                        <div className="shop-style-text">
                          <span>{styleItem.shape}</span>
                          {/* <span>{capitalizeFirstLetter(styleItem.shape)}</span> */}
                        </div>
                      </Link>
                    </>
                  );
                })}
              </div>

              <div className="shape-slider-1">
                <span>Carat</span>
                <div className="slider-carat-slider">
                  <Slider
                    className="slider"
                    onAfterChange={caratHandleChange}
                    value={caratRange}
                    min={minCaratRange}
                    max={maxCaratRange}
                    step={0.01}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                  className="slider-carat-inner-text"
                >
                  <div className="range-slider-show"> {caratRange[0]}</div>
                  <div className="range-slider-show"> {caratRange[1]}</div>
                </div>
              </div>
            </div>
            <div className="shape-slider">
              <div className="Diamond-Original-main">
                <span>Diamond Origin : </span>
                <div className="Diamond-Original">
                  <Link
                    href="javascript:void(0)"
                    className={
                      productSlug
                        ? newDiamondType === "natural"
                          ? "nature-active"
                          : ""
                        : type === "" || type === "natural"
                        ? "nature-active"
                        : ""
                    }
                    onClick={() => handleTypeChange("natural")}
                  >
                    Natural
                  </Link>
                  <Link
                    href="javascript:void(0)"
                    className={
                      productSlug
                        ? newDiamondType === "lab_grown"
                          ? "nature-active"
                          : ""
                        : type === "lab_grown"
                        ? "nature-active"
                        : ""
                    }
                    onClick={() => handleTypeChange("lab_grown")}
                  >
                    Lab Grown
                  </Link>
                </div>
              </div>

              <div className="shape-slider-2">
                <span>Diamond Price</span>
                <div className="slider-diamond-price-slider slider-carat-slider">
                  <Slider
                    className="slider"
                    onAfterChange={diamondPriceHandleChange}
                    value={diamondPriceRange}
                    min={minDiamondPriceRange}
                    max={maxDiamondPriceRange}
                    step={10}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                  className="slider-content-main slider-carat-inner-text"
                >
                  <div className="range-slider-show">
                    ${diamondPriceRange[0]}
                  </div>
                  <div className="range-slider-show">
                    ${diamondPriceRange[1]}
                  </div>
                </div>
              </div>
            </div>
            <div className="slider-1">
              <div className="shape-color">
                <span>Color</span>
                <div className="slider-color-slider">
                  <Slider
                    className="slider"
                    onAfterChange={colorHandleChange}
                    value={colorRange}
                    min={minColorRange}
                    max={maxColorRange}
                    minDistance={14.7}
                    marks={[0, 14.6, 29.3, 44.1, 58.6, 73.4, 88.1]}
                    step={14.7}
                    trackStyle={{ backgroundColor: "red" }}
                  />
                </div>

                <div className="color-text">
                  <ul>
                    <li>D-F</li>
                    <li>F-H</li>
                    <li>H-K</li>
                    <li>K-O</li>
                    <li>O-R</li>
                    <li>R-U</li>
                    <li>U-Z</li>
                  </ul>
                </div>
              </div>

              <div className="shape-cut">
                <span>Cut</span>
                <div className="slider-clarity-slider">
                  <Slider
                    min={minCutRange}
                    max={maxCutRange}
                    value={cutRange}
                    onAfterChange={cutHandleChange}
                    minDistance={17}
                    marks={17}
                    step={17}
                  ></Slider>
                </div>

                <div className="cut-list-diamonds">
                  <ul>
                    <li>Ideal</li>
                    <li>Excellent / Super Ideal</li>
                    <li>Very Good</li>
                    <li>Good</li>
                    <li>Fair</li>
                    <li>Poor</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="more-filter">
              <div className="more-filter-clarity">
                <span>Clarity</span>
                <div className="slider-clarity-slider">
                  <Slider
                    className="slider"
                    onAfterChange={clarityHandleChange}
                    value={clarityRange}
                    minDistance={14.7}
                    marks={[0, 14.6, 29.3, 44.1, 58.6, 73.4, 88.1]}
                    step={14.7}
                    trackStyle={{ backgroundColor: "red" }}
                  />
                </div>

                <div className="color-text">
                  <ul className="clarity">
                    <li>VVS1-VS1</li>
                    <li>VS1-SI1</li>
                    <li>SI1-SI3</li>
                    <li>SI3-VS</li>
                    <li>VS-VVS</li>
                    <li>VVS-FL</li>
                    <li>FL-IF</li>
                  </ul>
                </div>
              </div>

              <div className="center diamond-table-sort">
                <form>
                  <select
                    name="sort-price"
                    id="sort"
                    onChange={handleWhatMatters}
                    value={selectedOption}
                  >
                    <option value="">What Matters Most To You?</option>
                    <option value="optimal_balance">Optimal Balance</option>
                    <option value="max_brilliance">Maximum Brilliance</option>
                    <option value="superior_quality">Superior Quality</option>
                  </select>
                </form>
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
        <div className="data-table-responsive-main-parent">
          <div className="data-table-responsive-main">
            <div className="data-table-responsive">
              <div className="diamonds-table">
                <div className="data-tabs">
                  <ul>
                    <li
                      className={activeResult === 1 ? `active` : ""}
                      onClick={() => setActiveResult(1)}
                    >
                      Result (<span>{totalDiamond}</span>)
                    </li>
                    <li
                      className={activeResult === 2 ? `active` : ""}
                      onClick={() => {
                        if (compareData && compareData.length > 0) {
                          setActiveResult(2);
                        }
                      }}
                      style={
                        compareData?.length === 0
                          ? { cursor: "not-allowed" }
                          : { cursor: "pointer" }
                      }
                    >
                      Compare
                      <span>({compareData?.length})</span>
                    </li>
                  </ul>
                  {(shapeDataSlider?.length > 0 ||
                    caratRange[0] > minCaratRange ||
                    caratRange[1] < maxCaratRange ||
                    diamondPriceRange[0] > minDiamondPriceRange ||
                    diamondPriceRange[1] < maxDiamondPriceRange ||
                    colorRange[0] > minColorRange ||
                    colorRange[1] < maxColorRange ||
                    clarityRange[0] > minClarityRange ||
                    clarityRange[1] < maxClarityRange ||
                    cutRange[0] > minCutRange ||
                    cutRange[1] < maxCutRange) && (
                    <div className="breadCram">
                      <Link
                        href="javascript:void(0);"
                        onClick={() => handleResetAll()}
                      >
                        Reset Filters{" "}
                        <span>
                          <IoClose />
                        </span>
                      </Link>
                    </div>
                  )}
                </div>
                {shapeDataSlider?.length > 0 ||
                caratRange[0] > minCaratRange ||
                caratRange[1] < maxCaratRange ||
                diamondPriceRange[0] > minDiamondPriceRange ||
                diamondPriceRange[1] < maxDiamondPriceRange ||
                colorRange[0] > minColorRange ||
                colorRange[1] < maxColorRange ||
                clarityRange[0] > minClarityRange ||
                clarityRange[1] < maxClarityRange ||
                cutRange[0] > minCutRange ||
                cutRange[1] < maxCutRange ? (
                  <div className="applying-breadCrum">
                    {/* <div className="toggale-data-function">
                  <label className="switch delivery">
                    <div className="toggle-datta">
                      <p>
                        <Switch
                          onChange={() => handleChange()}
                          checked={checked}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          onColor="#232323"
                        />
                        Quick Ship
                      </p>
                      <div className="toggle-icon-img">{<PiVanFill />}</div>
                    </div>
                  </label>
                  <label className="switch">
                    <div className="toggle-datta">
                      <p>
                        <Switch
                          onChange={() => handleChanges()}
                          checked={checkedSecond}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          onColor="#232323"
                        />
                        Real View
                      </p>
                      <div className="toggle-icon-img">
                        <FaCamera />
                      </div>
                    </div>
                  </label>
                </div> */}
                    <div className="bredCramStyleFilter">
                      {shapeDataSlider?.map((item) => (
                        <div className="breadCram" key={item}>
                          <Link
                            href="javascript:void(0);"
                            onClick={() => handleRemoveShape(item)}
                          >
                            {item}
                            <span>
                              <IoClose />
                            </span>
                          </Link>
                        </div>
                      ))}
                      {(caratRange[0] > minCaratRange ||
                        caratRange[1] < maxCaratRange) && (
                        <div className="breadCram">
                          <Link
                            href="javascript:void(0);"
                            onClick={() => handleRemoveCarat()}
                          >
                            {caratRange[0] === caratRange[1]
                              ? `${caratRange[0]} Carat`
                              : `${caratRange[0]} - ${caratRange[1]} Carat `}{" "}
                            <span>
                              <IoClose />
                            </span>
                          </Link>
                        </div>
                      )}
                      {(diamondPriceRange[0] > minDiamondPriceRange ||
                        diamondPriceRange[1] < maxDiamondPriceRange) && (
                        <div className="breadCram">
                          <Link
                            href="javascript:void(0);"
                            onClick={() => handleRemovePrice()}
                          >
                            {diamondPriceRange[0] === diamondPriceRange[1]
                              ? `
                        $${diamondPriceRange[0]} Price`
                              : `$${diamondPriceRange[0]} - $${diamondPriceRange[1]} Price`}{" "}
                            <span>
                              <IoClose />
                            </span>
                          </Link>
                        </div>
                      )}
                      {(colorRange[0] > minColorRange ||
                        colorRange[1] < maxColorRange) && (
                        <div className="breadCram">
                          <Link
                            href="javascript:void(0);"
                            onClick={() => handleRemoveColor()}
                          >
                            {sliderValue[0] ===
                            sliderValue[sliderValue.length - 1]
                              ? `${sliderValue[0]} Color`
                              : `${sliderValue[0]} - ${
                                  sliderValue[sliderValue.length - 1]
                                } Color`}{" "}
                            <span>
                              <IoClose />
                            </span>
                          </Link>
                        </div>
                      )}
                      {(clarityRange[0] > minClarityRange ||
                        clarityRange[1] < maxClarityRange) && (
                        <div className="breadCram">
                          <Link
                            href="javascript:void(0);"
                            onClick={() => handleRemoveClarity()}
                          >
                            {claritySliderValue[0] ===
                            claritySliderValue[claritySliderValue.length - 1]
                              ? `${claritySliderValue[0]} Clarity`
                              : `${claritySliderValue[0]} - ${
                                  claritySliderValue[
                                    claritySliderValue.length - 1
                                  ]
                                } Clarity`}{" "}
                            <span>
                              <IoClose />
                            </span>
                          </Link>
                        </div>
                      )}
                      {(cutRange[0] > minCutRange ||
                        cutRange[1] < maxCutRange) && (
                        <div className="breadCram">
                          <Link
                            href="javascript:void(0);"
                            onClick={() => handleRemoveCut()}
                          >
                            {cutSliderValue[0] ===
                            cutSliderValue[cutSliderValue.length - 1]
                              ? `${cutSliderValue[0]} Cut`
                              : `${cutSliderValue[0]} - ${
                                  cutSliderValue[cutSliderValue.length - 1]
                                } Cut`}{" "}
                            <span>
                              <IoClose />
                            </span>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                ) : null}

                <div className="table-outer">
                  <table id="customers">
                    <tr>
                      <th>
                        Shape
                        <span>
                          <FaAngleDown />
                        </span>
                      </th>
                      <th>
                        Price
                        <span>
                          <FaAngleDown />
                        </span>
                      </th>
                      <th>
                        Carat
                        <span>
                          <FaAngleDown />
                        </span>
                      </th>
                      <th>
                        Cut
                        <span>
                          <FaAngleDown />
                        </span>
                      </th>
                      <th>
                        Color
                        <span>
                          <FaAngleDown />
                        </span>
                      </th>
                      <th>
                        Clarity
                        <span>
                          <FaAngleDown />
                        </span>
                      </th>
                      <th>
                        Compare
                        <span>
                          <FaAngleDown />
                        </span>
                      </th>
                    </tr>
                  </table>
                </div>
              </div>
              {loader ? (
                <LoaderSpinner />
              ) : activeResult === 1 ? (
                data.map((item) => {
                  return (
                    <>
                      <ul
                        className="prodcut-data"
                        onClick={() => handleClick(item.id)}
                      >
                        <li className="heading-data-categery">
                          <div className="main-wrapper">
                            <div className="item-shape-image">
                              <LazyLoadImage
                                width="auto"
                                height="auto"
                                src={item.image_url}
                                alt={item.shape}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                }}
                              />
                            </div>
                            <p>{item.shape}</p>
                          </div>
                        </li>
                        <li className="heading-data-categery">
                          <p>${Math.round(item.total_sales_price)}</p>
                        </li>
                        <li className="heading-data-categery">
                          <p>{item.size}</p>
                        </li>
                        <li className="heading-data-categery">
                          <p>{item.cut}</p>
                        </li>
                        <li className="heading-data-categery">
                          <p>{item.color}</p>
                        </li>
                        <li className="heading-data-categery">
                          <p>{item.clarity}</p>
                        </li>
                        <li className="heading-data-categery campare boder-rt">
                          <form action="">
                            <div className="form-group">
                              <input
                                type="checkbox"
                                id={`html${item.id}`}
                                checked={clickedCheckboxes?.includes(item.id)}
                                onClick={() => trackClick(item.id, item)}
                              />
                              <label htmlFor={`html${item.id}`}></label>
                            </div>
                          </form>
                        </li>
                      </ul>
                      <div className={activeUL === item.id ? "" : "hide-data"}>
                        <div class="inner-dimond-data-stucture">
                          <div class="prodcut-img">
                            {!loadedIframes[item.id] && (
                              <LazyLoadImage
                                width="auto"
                                height="auto"
                                src={item.image_url}
                                alt={item.shape}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                }}
                              />
                            )}
                            <iframe
                              src={item.video_url}
                              frameBorder="0"
                              title="video"
                              onLoad={() => handleIframeLoad(item.id)}
                              allow="autoplay"
                            ></iframe>
                          </div>
                          <div class="pro-cart-data">
                            <div class="pro-data-cart head">
                              {productSlug ? (
                                <Link
                                  href={`/view_diamond?stock_num=${
                                    item.stock_num
                                  }&slug=${
                                    filterData.product?.slug
                                  }&color=${productColor}&diamond_original=${diamond_original}${
                                    newDiamondType === "lab_grown"
                                      ? `&diamond_origin=${newDiamondType}`
                                      : `&diamond_origin=natural`
                                  }&ring_size=${ring_size}${
                                    textEngraving
                                      ? `&textEngraving=${textEngraving}`
                                      : ""
                                  }${
                                    font_style
                                      ? `&font_style=${font_style}`
                                      : ""
                                  }`}
                                >
                                  <p>
                                    {item.size} Carat {item.shape} Diamond
                                  </p>
                                </Link>
                              ) : (
                                <Link
                                  href={`/view_diamond?stock_num=${
                                    item.stock_num
                                  }${
                                    newDiamondType === "lab_grown"
                                      ? `&diamond_origin=${newDiamondType}`
                                      : ""
                                  }`}
                                >
                                  <p>
                                    {item.size} Carat {item.shape} Diamond
                                  </p>
                                </Link>
                              )}
                              {/* <Link href="javascript:void(0);">
                              <p>
                                {item.size} Carat {item.shape} Diamond
                              </p>
                            </Link> */}
                            </div>
                            <div class="pro-data-cart border-btm">
                              <p>
                                Price: ${Math.round(item.total_sales_price)}
                              </p>
                            </div>
                            <div class="pro-data-cart border-btm">
                              <p>Carat: {item.size}</p>
                            </div>
                            {item.cut && (
                              <div class="pro-data-cart border-btm">
                                <p>Cut: {item.cut}</p>
                              </div>
                            )}
                            <div class="pro-data-cart border-btm">
                              <p>Color: {item.color}</p>
                            </div>
                            <div class="pro-data-cart border-btm">
                              <p>Clarity: {item.clarity}</p>
                            </div>
                          </div>
                          <div class="pro-cart-btn">
                            <div class="slect-dimond">
                              {productSlug ? (
                                <Link
                                  href={`/final_ring/${filterData.product?.slug}/?color=${productColor}&stock_num=${item.stock_num}&diamond_original=${labGrownDetails?.diamond_type}&diamond_origin=${newDiamondType}&ring_size=${ring_size}${font_style ? `&font_style=${font_style}`:""}${textEngraving ? `&textEngraving=${textEngraving}`:""}`}
                                >
                                  select diamond
                                </Link>
                              ) : (
                                <Link
                                  href={`/engagement-rings/start-with-a-setting?stock_num=${item.stock_num}&diamond_origin=${newDiamondType}`}
                                >
                                  select diamond
                                </Link>
                              )}
                            </div>
                            <div class="view-dmd">
                              {productSlug ? (
                                <Link
                                  href={`/view_diamond/${
                                    filterData.product?.slug
                                  }?stock_num=${
                                    item.stock_num
                                  }&color=${productColor}&diamond_original=${diamond_original}${
                                    newDiamondType === "lab_grown"
                                      ? `&diamond_origin=${newDiamondType}`
                                      : "&diamond_origin=natural"
                                  }&ring_size=${ring_size}${
                                    textEngraving
                                      ? `&textEngraving=${textEngraving}`
                                      : ""
                                  }${
                                    font_style
                                      ? `&font_style=${font_style}`
                                      : ""
                                  }`}
                                >
                                  view diamond detail
                                </Link>
                              ) : (
                                <Link
                                  href={`/view_diamond?stock_num=${
                                    item.stock_num
                                  }${
                                    newDiamondType === "lab_grown"
                                      ? `&diamond_origin=${newDiamondType}`
                                      : ""
                                  }`}
                                >
                                  view diamond detail
                                </Link>
                              )}
                            </div>
                            <div class="other-btn-bar">
                              <span>quick ship</span>
                              <span>in another user bag</span>
                              <span>only one available</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
              ) : (
                compareData.map((item) => {
                  return (
                    <>
                      <ul
                        className="prodcut-data"
                        onClick={() => handleClick(item.id)}
                      >
                        <li className="heading-data-categery">
                          <div className="main-wrapper">
                            <div className="item-shape-image">
                              <LazyLoadImage
                                width="auto"
                                height="auto"
                                src={item.image_url}
                                alt={item.shape}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                }}
                              />
                            </div>
                            <p>{item.shape}</p>
                          </div>
                        </li>
                        <li className="heading-data-categery">
                          <p>${Math.round(item.total_sales_price)}</p>
                        </li>
                        <li className="heading-data-categery">
                          <p>{item.size}</p>
                        </li>
                        <li className="heading-data-categery">
                          <p>{item.cut}</p>
                        </li>
                        <li className="heading-data-categery">
                          <p>{item.color}</p>
                        </li>
                        <li className="heading-data-categery">
                          <p>{item.clarity}</p>
                        </li>
                        <li className="heading-data-categery campare boder-rt">
                          <form action="">
                            <div className="form-group">
                              <input
                                type="checkbox"
                                id={`html${item.id}`}
                                checked={clickedCheckboxes?.includes(item.id)}
                                onClick={() => trackClick(item.id, item)}
                              />
                              <label htmlFor={`html${item.id}`}></label>
                            </div>
                          </form>
                        </li>
                      </ul>
                      <div className={activeUL === item.id ? "" : "hide-data"}>
                        <div class="inner-dimond-data-stucture">
                          <div class="prodcut-img">
                            {!loadedIframes[item.id] && (
                              <LazyLoadImage
                                width="auto"
                                height="auto"
                                src={item.image_url}
                                alt={item.shape}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
                                }}
                              />
                            )}
                            <iframe
                              src={item.video_url}
                              frameBorder="0"
                              title="video"
                              onLoad={() => handleIframeLoad(item.id)}
                              allow="autoplay"
                            ></iframe>
                          </div>
                          <div class="pro-cart-data">
                            <div class="pro-data-cart head">
                              {productSlug ? (
                                <Link
                                  href={`/view_diamond/${
                                    filterData.product?.slug
                                  }?stock_num=${
                                    item.stock_num
                                  }&color=${productColor}${
                                    item?.type === "lab_grown_diamond"
                                      ? `&diamond_origin=lab_grown`
                                      : ""
                                  }&diamond_original=${diamond_original}${
                                    textEngraving
                                      ? `&textEngraving=${textEngraving}`
                                      : ""
                                  }${
                                    font_style
                                      ? `&font_style=${font_style}`
                                      : ""
                                  }`}
                                >
                                  <p>
                                    {item.size} Carat {item.shape} Diamond
                                  </p>
                                </Link>
                              ) : (
                                <Link
                                  href={`/view_diamond?stock_num=${
                                    item.stock_num
                                  }${
                                    item?.type !== "diamond"
                                      ? `&diamond_origin=lab_grown`
                                      : ""
                                  }`}
                                >
                                  <p>
                                    {item.size} Carat {item.shape} Diamond
                                  </p>
                                </Link>
                              )}
                            </div>
                            <div class="pro-data-cart border-btm">
                              <p>
                                Price: ${Math.round(item.total_sales_price)}
                              </p>
                            </div>
                            <div class="pro-data-cart border-btm">
                              <p>Carat: {item.size}</p>
                            </div>
                            {item.cut && (
                              <div class="pro-data-cart border-btm">
                                <p>Cut: {item.cut}</p>
                              </div>
                            )}
                            <div class="pro-data-cart border-btm">
                              <p>Color: {item.color}</p>
                            </div>
                            <div class="pro-data-cart border-btm">
                              <p>Clarity: {item.clarity}</p>
                            </div>
                          </div>
                          <div class="pro-cart-btn">
                            <div class="slect-dimond">
                              {productSlug ? (
                                <Link
                                  href={`/final_ring/${
                                    filterData.product?.slug
                                  }?color=${productColor}&stock_num=${
                                    item.stock_num
                                  }&diamond_original=${
                                    labGrownDetails?.diamond_type
                                  }${
                                    item?.type === "lab_grown_diamond"
                                      ? `&diamond_origin=lab_grown`
                                      : ""
                                  }${font_style ? `&font_style=${font_style}`:""}${textEngraving ? `&textEngraving=${textEngraving}`:""}`}
                                >
                                  select diamond
                                </Link>
                              ) : (
                                <Link
                                  href={`/engagement-rings/start-with-a-setting?stock_num=${
                                    item.stock_num
                                  }${
                                    item?.type !== "diamond"
                                      ? `&diamond_origin=lab_grown`
                                      : ""
                                  }`}
                                >
                                  select diamond
                                </Link>
                              )}
                            </div>
                            <div class="view-dmd">
                              {productSlug ? (
                                <Link
                                  href={`/view_diamond/${
                                    filterData.product?.slug
                                  }?stock_num=${
                                    item.stock_num
                                  }&color=${productColor}${
                                    item?.type !== "diamond"
                                      ? `&diamond_origin=lab_grown`
                                      : ""
                                  }&diamond_original=${diamond_original}${
                                    textEngraving
                                      ? `&textEngraving=${textEngraving}`
                                      : ""
                                  }${
                                    font_style
                                      ? `&font_style=${font_style}`
                                      : ""
                                  }`}
                                >
                                  view diamond detail
                                </Link>
                              ) : (
                                <Link
                                  href={`/view_diamond?stock_num=${
                                    item.stock_num
                                  }${
                                    item?.type !== "diamond"
                                      ? `&diamond_origin=lab_grown`
                                      : ""
                                  }`}
                                >
                                  view diamond detail
                                </Link>
                              )}
                            </div>
                            <div class="other-btn-bar">
                              <span>quick ship</span>
                              <span>in another user bag</span>
                              <span>only one available</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>{loading && <LoaderSpinner />}</div>
                    </>
                  );
                })
              )}
              <div>{loading && <LoaderSpinner />}</div>
              {data.length < 1 && activeResult === 1 && (
                <h2 className="center">{loading ? null : "Data Not Found"}</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChooseDiamondsShape;
