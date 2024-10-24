'use client'
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { productListCart } from "../../../store/actions/productActions";
import { UserContext } from "../context/UserContext";
import Cookies from "js-cookie";
import LoaderSpinner from "../_componentStatic/LoaderSpinner";

const PaymentForm = ({userAccountDataShip,cartDetails, metalColor}) => {
  const userParsedData = userAccountDataShip ? JSON.parse(userAccountDataShip) : ""; 
  
  const addressId = userParsedData?.addressId;
  const totalPrice = userParsedData?.totalPrice;
  const shipValue = userParsedData?.shipValue;
  const router = useRouter();
  const white = "18k-white-gold";
  const yellow = "18k-yellow-gold";
  const rose = "18k-rose-gold";
  const platinum = "platinum";
  const dispatch = useDispatch();
  const { baseUrl, imgBaseUrl, imgAssetsUrl } = useContext(UserContext);



  const cartData = useSelector((state) => state.cartData);
  // const cartDetails = useSelector((state) => state.productDataCart);

  const user_id = secureLocalStorage.getItem("formData");

  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoader(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);
  


  const calculateTotalPriceLogin = () => {
    let total = 0;
    cartDetails.forEach((item) => {
      total +=
        parseFloat(Math.round(item?.ring_price || 0)) +
        parseFloat(Math.round(item?.diamond_price || 0)) +
        parseFloat(Math.round(item.gemstone_price || 0)) +
        parseFloat(Math.round(item.matching_wedding_band?.price || 0));
    });
    return total;
  };

  const textPrice =
    totalPrice + calculateTotalPriceLogin() + (shipValue ? 50 : 0);
  const shipAddedPrice = calculateTotalPriceLogin() + (shipValue ? 50 : 0);

  const productCartId = [];
  cartDetails?.forEach((item) => {
    productCartId.push(item?.id);
  });
  const jsonObject = {};
  productCartId?.forEach((value, index) => {
    jsonObject[index.toString()] = value;
  });

  const jsonString = JSON.stringify(jsonObject);
  let jsonStringNew = JSON.parse(jsonString);

  const itemIdsArray = Object.values(jsonStringNew);

  // ============

  const handleOrderProduct = () => {
    setLoader(true);
    if (!isValidExpiryDate(expiryDate)) {
      setLoader(false);
      setError("Invalid expiry date.");
      return;
    }

    const apiUrl = `${baseUrl}/tokenize-card?card_no=${cardNum}&cvv=${cvv}&exp_date=${newExpDate}&zip=${zipCode}`;
    axios
      .get(apiUrl)
      .then((res) => {
        // setErrorTokenize(res.data.res)
        if (cartDetails?.length > 0 && res.data.res == "success") {
          const newUrl = `${baseUrl}/checkout?user_id=${user_id}&order_data=${jsonString}&address=${addressId}&card_token=${res.data.data.token}&tax=${totalPrice}&shipping=${shipValue}`;
          axios
            .get(newUrl)
            .then((res) => {
              // setOrderId(res.data.data?.order_id);

              if (res.data.res === "success") {
                itemIdsArray?.forEach((itemId) => {
                  axios
                    .get(`${baseUrl}/remove-cartitem/${itemId}`)
                    .then((res2) => {
                      dispatch(productListCart());
                      Cookies.remove('userAccountDataShip', { path: '/' })
                router.push(`/success/${res.data.data?.order_id}`);

                    })
                    .catch((error) => {
                      console.log(
                        `Error removing item with ID ${itemId} from cart:`,
                        error
                      );
                    });
                });

              } else {
                alert("Something went wrong");
              }
            })
            .catch((error) => {
              console.log("API call failed:", error);
            });
        }
      })
      .catch((error) => {
        setLoader(false);
        toast.error(error.response.data.msg[0], {
          position: "top-right",
          className: "foo-bar",
        });
      });
  };

  // ==============

  const [zipCode, setZipCode] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const newExpDate = expiryDate.replace(/[% ]/g, "");

  const [cardNum, setCardNum] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [cardNumError, setCardNumError] = useState("");
  const [cvvError, setCvvError] = useState("");
  const [zipCodeError, setZipCodeError] = useState("");

  const handleChange_cardNumber = (e) => {
    const value = e.target.value;
    const reg = /^[0-9]{0,16}$/;
    if (reg.test(value)) {
      setCardNum(value);
      setCardNumError(""); // Clear error if valid
    } else {
      setCardNumError("Card number must be 16 digits");
    }
  };

  const handleChange_cvv = (e) => {
    const value = e.target.value;
    const reg = /^[0-9]{0,4}$/;
    if (reg.test(value)) {
      setCvv(value);
      setCvvError(""); // Clear error if valid
    } else {
      setCvvError("CVV must be 3 or 4 digits");
    }
  };

  const handleChange_zip_code = (e) => {
    const value = e.target.value;
    const reg = /^[0-9]{0,10}$/;
    if (reg.test(value)) {
      setZipCode(value);
      setZipCodeError(""); // Clear error if valid
    } else {
      setZipCodeError("ZIP Code must be 5 to 10 digits");
    }
  };

  const handleChange_exp_date = (e) => {
    const value = e.target.value;
    const formattedValue = formatExpiryDate(value);
    setExpiryDate(formattedValue);

    if (!formattedValue) {
      setError("Card expiry is required.");
    } else if (isValidExpiryDate(formattedValue)) {
      setError("");
    } else {
      setError("Invalid expiry date.");
    }
  };

  const formatExpiryDate = (value) => {
    const cleaned = value.replace(/[^0-9]/g, "");
    let formatted = "";
    if (cleaned.length <= 2) {
      formatted = cleaned;
    } else if (cleaned.length <= 4) {
      formatted = `${cleaned.substring(0, 2)}/${cleaned.substring(2, 4)}`;
    } else {
      formatted = `${cleaned.substring(0, 2)}/${cleaned.substring(2, 6)}`;
    }
    return formatted;
  };

  const isValidExpiryDate = (value) => {
    const parts = value.split("/");
    if (parts.length !== 2) return false;

    const month = parseInt(parts[0], 10);
    let year = parseInt(parts[1], 10);

    if (isNaN(month) || isNaN(year)) return false;

    if (month < 1 || month > 12) return false;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    // Handle two-digit year
    if (year < 100) {
      year += year < 50 ? 2000 : 1900;
    }

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    let valid = true;

    if (cardNum.length !== 16) {
      setCardNumError("Card number must be 16 digits");
      valid = false;
    } else {
      setCardNumError("");
    }

    if (!expiryDate) {
      setError("Card expiry is required.");
      valid = false;
    } else if (!isValidExpiryDate(expiryDate)) {
      setError("Invalid expiry date.");
      valid = false;
    } else {
      setError("");
    }

    if (cvv.length < 3 || cvv.length > 4) {
      setCvvError("CVV must be 3 or 4 digits");
      valid = false;
    } else {
      setCvvError("");
    }

    if (zipCode.length < 5 || zipCode.length > 10) {
      setZipCodeError("ZIP Code must be 5 to 10 digits");
      valid = false;
    } else {
      setZipCodeError("");
    }

    if (valid) {
      // Proceed with form submission
      // Add your form submission logic here
    }
  };
  // ============ meta tag  =======================//

  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
  };
  return (
    <>
      {cartDetails.length > 0 && addressId ? (
        <>
          <div className="payment-form">
            <div className="container">
              <div className="checkout">
                <div className="checkout-left">
                  <form>
                    <div className="form-control">
                      <label htmlFor="cardNumber">Card Number</label>
                      <input
                        className="zipcode-number"
                        type="tel"
                        pattern="\d*"
                        min="0"
                        max="9999999999"
                        maxLength="16"
                        name="cardNumber"
                        id="cardNumber"
                        value={cardNum}
                        onChange={handleChange_cardNumber}
                      />
                      {cardNumError && (
                        <div className="error">{cardNumError}</div>
                      )}
                    </div>
                    <div className="form-control">
                      <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
                      <input
                        type="text"
                        id="inputExpDate"
                        placeholder="MM / YY"
                        maxLength={9}
                        value={expiryDate}
                        onChange={handleChange_exp_date}
                      />
                      {error && <div className="error">{error}</div>}
                    </div>
                    <div className="form-control">
                      <label htmlFor="cvv">CVV</label>
                      <input
                        className="zipcode-number"
                        type="tel"
                        pattern="\d*"
                        min="0"
                        max="9999"
                        maxLength="4"
                        name="cvv"
                        id="cvv"
                        value={cvv}
                        onChange={handleChange_cvv}
                      />
                      {cvvError && <div className="error">{cvvError}</div>}
                    </div>
                    <div className="form-control">
                      <label htmlFor="zip">ZIP Code</label>
                      <input
                        className="zipcode-number"
                        type="text"
                        pattern="\d*"
                        min="0"
                        max="9999999999"
                        maxLength="10"
                        name="zipCode"
                        id="zipCode"
                        value={zipCode}
                        onChange={handleChange_zip_code}
                      />
                      {zipCodeError && (
                        <div className="error">{zipCodeError}</div>
                      )}
                    </div>
                    <div className="Return-to-Shipping">
                      {/* <div className="move-cart">
                  <Link href="/check_out">
                    <MdKeyboardArrowLeft />
                    Return To Shopping Bag
                  </Link>
                </div> */}
                      <div className="continue-payment">
                        <Link
                          href="javascript:void(0)"
                          // href={orderId!=undefined &&`/success?order_id=${orderId}`}
                          // disabled={loader}
                          onClick={(event) => {
                            if (
                              document.getElementById("cardNumber").value ===
                                "" ||
                              document.getElementById("inputExpDate").value ===
                                "" ||
                              document.getElementById("cvv").value === "" ||
                              document.getElementById("zipCode").value === ""
                            ) {
                              handleSubmit();
                            } else {
                              handleOrderProduct();
                            }
                          }}
                        >
                          Continue To Order
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="checkout-right">
                  {cartDetails ? (
                    <div className="checkout-right-scroll">
                      <h3>Order Summary</h3>
                      { (
                        cartDetails?.map((item) => {
                          const selectedMetalColor = metalColor.find(
                            (colorItem) =>
                              colorItem?.slug === item?.active_color
                          );
                          return (
                            <>
                              {cartDetails?.length > 0 ? (
                                <div className="order-summary">
                                  {item.gemstone_id &&
                                  item.ring?.id == null &&
                                  item?.diamond_id == null ? (
                                    item.gemstone?.map((gemstoneItem) => {
                                      return (
                                        <>
                                          <div className="main-cart-inner">
                                            <div className="cart-left-pic">
                                              <img
                                                width="auto"
                                                height="auto"
                                                onError={handleError}
                                                src={gemstoneItem?.image_url}
                                                alt={gemstoneItem?.shape}
                                              />
                                            </div>
                                          </div>
                                          <div className="product-info-inner cart-middle-discription">
                                            <div className="cart-middle-discription-text">
                                              <span>
                                                {gemstoneItem?.short_title}
                                              </span>
                                            </div>

                                            <div className="cart-right-price">
                                              <p>
                                                $
                                                {Math.round(
                                                  gemstoneItem?.total_sales_price
                                                )}
                                              </p>
                                            </div>
                                          </div>
                                        </>
                                      );
                                    })
                                  ) : item.ring?.id &&
                                    (item?.diamond_id || item?.gemstone_id) ? (
                                    <>
                                      <div className="main-cart-inner">
                                        <div className="cart-left-pic">
                                          <Link href="javascript:void(0);">
                                            <ul className="product-list">
                                              <li
                                                className={
                                                  item.active_color === white
                                                    ? "active"
                                                    : "displayed"
                                                }
                                              >
                                                <img
                                                  width="auto"
                                                  height="auto"
                                                  onError={handleError}
                                                  src={`${imgBaseUrl}/${item.ring.entity_id}/${item.ring.entity_id}.jpg`}
                                                  alt={item.ring?.name}
                                                  className="img-responsive center-block"
                                                />
                                              </li>
                                              <li
                                                className={
                                                  item.active_color === yellow
                                                    ? "active"
                                                    : "displayed"
                                                }
                                              >
                                                <img
                                                  width="auto"
                                                  height="auto"
                                                  onError={handleError}
                                                  src={`${imgBaseUrl}/${item.ring.entity_id}/${item.ring.entity_id}.alt.jpg`}
                                                  alt={item.ring?.name}
                                                  className="img-responsive center-block"
                                                />
                                              </li>
                                              <li
                                                className={
                                                  item.active_color === rose
                                                    ? "active"
                                                    : "displayed"
                                                }
                                              >
                                                <img
                                                  width="auto"
                                                  height="auto"
                                                  onError={handleError}
                                                  src={`${imgBaseUrl}/${item.ring.entity_id}/${item.ring.entity_id}.alt1.jpg`}
                                                  alt={item.ring?.name}
                                                  className="img-responsive center-block"
                                                />
                                              </li>
                                              <li
                                                className={
                                                  item.active_color === platinum
                                                    ? "active"
                                                    : "displayed"
                                                }
                                              >
                                                <img
                                                  width="auto"
                                                  height="auto"
                                                  onError={handleError}
                                                  src={`${imgBaseUrl}/${item.ring.entity_id}/${item.ring.entity_id}.jpg`}
                                                  alt={item.ring?.name}
                                                  className="img-responsive center-block"
                                                />
                                              </li>
                                            </ul>
                                          </Link>
                                          {item.diamond_id
                                            ? item.diamond
                                                ?.slice(0, 1)
                                                .map((diamondItem) => {
                                                  return (
                                                    <>
                                                      <div className="cart-left-pic">
                                                        <img
                                                          width="auto"
                                                          height="auto"
                                                          onError={handleError}
                                                          src={
                                                            diamondItem?.image_url
                                                          }
                                                          alt={
                                                            diamondItem?.name
                                                          }
                                                        />
                                                      </div>
                                                    </>
                                                  );
                                                })
                                            : item.gemstone?.map(
                                                (gemstoneItem) => {
                                                  return (
                                                    <>
                                                      <div className="cart-left-pic">
                                                        <img
                                                          width="auto"
                                                          height="auto"
                                                          onError={handleError}
                                                          src={
                                                            gemstoneItem?.image_url
                                                          }
                                                          alt={
                                                            gemstoneItem?.shape
                                                          }
                                                        />
                                                      </div>
                                                    </>
                                                  );
                                                }
                                              )}
                                        </div>
                                      </div>
                                      <div className="product-info cart-middle-discription">
                                        <div className="product-info-inner">
                                          <div className="cart-middle-discription-text">
                                            <div>
                                              {selectedMetalColor && (
                                                <h2>
                                                  <Link
                                                    href="javascript:void(0);"
                                                    className="td-n2"
                                                  >
                                                    {selectedMetalColor.value}{" "}
                                                    {item.ring?.name}
                                                    <div className="ring-size">
                                                      <span>Ring Size : </span>{" "}
                                                      <span>
                                                        {item?.ring_size}
                                                      </span>
                                                    </div>
                                                  </Link>
                                                </h2>
                                              )}
                                            </div>
                                          </div>
                                          <div className="cart-right-price">
                                            <span
                                              style={{ whiteSpace: "nowrap" }}
                                              id="prodcut_price_17566554"
                                            >
                                              ${Math.round(item?.ring_price)}
                                            </span>
                                          </div>
                                        </div>

                                        <div className="ring-size-cart-checkout">
                                          {item.diamond_id
                                            ? item.diamond
                                                ?.slice(0, 1)
                                                .map((diamondItem) => {
                                                  return (
                                                    <>
                                                      <div className="checkout-name-description">
                                                        <div className="cart-middle-discription-text">
                                                          <h2>
                                                            <Link
                                                              href="javascript:void(0);"
                                                              className="td-n2"
                                                            >
                                                              {
                                                                diamondItem?.size
                                                              }{" "}
                                                              Carat{" "}
                                                              {
                                                                diamondItem?.shape
                                                              }{" "}
                                                              Diamond{" "}
                                                              
                                                              {diamondItem?.cut &&
                                                                `${diamondItem?.cut} Cut,`}{" "}
                                                              {
                                                                diamondItem?.color
                                                              }{" "}
                                                              Color,{" "}
                                                              {
                                                                diamondItem?.clarity
                                                              }{" "}
                                                              Clarity
                                                            </Link>
                                                          </h2>
                                                        </div>
                                                        <div className="cart-right-price">
                                                          <p>
                                                            $
                                                            {Math.round(
                                                              diamondItem?.total_sales_price
                                                            )}
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </>
                                                  );
                                                })
                                            : item.gemstone?.map(
                                                (gemstoneItem) => {
                                                  return (
                                                    <>
                                                      <div className="checkout-name-description">
                                                        <div className="cart-middle-discription-text">
                                                          <h2>
                                                            <Link
                                                              href="javascript:void(0);"
                                                              className="td-n2"
                                                            >
                                                              {
                                                                gemstoneItem?.short_title
                                                              }
                                                            </Link>
                                                          </h2>
                                                          <div className="cart-right-price">
                                                            <p>
                                                              $
                                                              {Math.round(
                                                                gemstoneItem?.total_sales_price
                                                              )}
                                                            </p>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </>
                                                  );
                                                }
                                              )}
                                        </div>
                                      </div>
                                    </>
                                  ) : item.ring_id &&
                                    item.diamond_id === null &&
                                    item.gemstone_id === null ? (
                                    <>
                                      <div className="main-cart-inner">
                                        <div className="cart-left-pic">
                                          <ul className="">
                                            <li
                                              className={
                                                item.active_color === white
                                                  ? "active"
                                                  : "displayed"
                                              }
                                            >
                                              <img
                                                width="auto"
                                                height="auto"
                                                onError={handleError}
                                                src={`${imgBaseUrl}/${item?.img_sku}/${item?.img_sku}.jpg`}
                                                alt={item.ring?.name}
                                                className="img-responsive center-block"
                                              />
                                            </li>
                                            <li
                                              className={
                                                item.active_color === yellow
                                                  ? "active"
                                                  : "displayed"
                                              }
                                            >
                                              <img
                                                width="auto"
                                                height="auto"
                                                onError={handleError}
                                                src={`${imgBaseUrl}/${item?.img_sku}/${item?.img_sku}.alt.jpg`}
                                                alt={item.ring?.name}
                                                className="img-responsive center-block"
                                              />
                                            </li>
                                            <li
                                              className={
                                                item.active_color === rose
                                                  ? "active"
                                                  : "displayed"
                                              }
                                            >
                                              <img
                                                width="auto"
                                                height="auto"
                                                onError={handleError}
                                                src={`${imgBaseUrl}/${item?.img_sku}/${item?.img_sku}.alt1.jpg`}
                                                alt={item.ring?.name}
                                                className="img-responsive center-block"
                                              />
                                            </li>
                                            <li
                                              className={
                                                item.active_color === platinum
                                                  ? "active"
                                                  : "displayed"
                                              }
                                            >
                                              <img
                                                width="auto"
                                                height="auto"
                                                onError={handleError}
                                                src={`${imgBaseUrl}/${item?.img_sku}/${item?.img_sku}.jpg`}
                                                alt={item.ring?.name}
                                                className="img-responsive center-block"
                                              />
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div className="product-info-inner cart-middle-discription">
                                        <div className="cart-middle-discription-text">
                                          <span>{item.ring?.name}</span>
                                        </div>
                                        <div className="cart-right-price">
                                          <p>${Math.round(item.ring_price)}</p>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    item.diamond?.map((diamondItem) => {
                                      return (
                                        <>
                                          <div className="main-cart-inner">
                                            <div className="cart-left-pic">
                                              <img
                                                width="auto"
                                                height="auto"
                                                onError={handleError}
                                                src={diamondItem?.image_url}
                                                alt={diamondItem.name}
                                              />
                                            </div>
                                          </div>
                                          <div className="product-info-inner cart-middle-discription">
                                            <div className="cart-middle-discription-text">
                                              <span>
                                                {diamondItem?.size} Carat{" "}
                                                {diamondItem?.shape} Diamond
                                              </span>
                                            </div>
                                            <div className="cart-right-price">
                                              <p>
                                                $
                                                {Math.round(
                                                  diamondItem?.total_sales_price
                                                )}
                                              </p>
                                            </div>
                                          </div>
                                        </>
                                      );
                                    })
                                  )}
                                </div>
                              ) : null}
                            </>
                          );
                        })
                      )}
                    </div>
                  ) : (
                    <div className="checkout-right-scroll">
                      <h3>Order Summary</h3>
                      {cartData?.map((item) => {
                        const selectedMetalColor = metalColor.find(
                          (colorItem) => colorItem.value === item.ring_color
                        );
                        return (
                          <>
                            <div className="order-summary">
                              {item.gemstoneSingle || item.item ? (
                                <>
                                  <div className="main-cart-inner">
                                    <div className="cart-left-pic">
                                      <img
                                        width="auto"
                                        height="auto"
                                        onError={handleError}
                                        src={
                                          item.gemstoneSingle?.image_url
                                            ? item.gemstoneSingle?.image_url
                                            : item.item?.image_url
                                        }
                                        alt={
                                          item.gemstoneSingle?.shape
                                            ? item.gemstoneSingle?.shape
                                            : item.item?.name
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="product-info-inner cart-middle-discription">
                                    <div className="cart-middle-discription-text">
                                      <span>
                                        {item.gemstoneSingle?.short_title
                                          ? item.gemstoneSingle?.short_title
                                          : item.item?.short_title}
                                      </span>
                                    </div>
                                    <div className="cart-right-price">
                                      <p>
                                        $
                                        {Math.round(
                                          item.gemstoneSingle?.total_sales_price
                                            ? item.gemstoneSingle
                                                ?.total_sales_price
                                            : item.item?.total_sales_price
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </>
                              ) : item.ring_data ? (
                                <>
                                  <div className="main-cart-inner">
                                    <div className="cart-left-pic">
                                      <Link href="javascript:void(0);">
                                        <ul className="product-list">
                                          <li
                                            className={
                                              item.ring_color === white
                                                ? "active"
                                                : "displayed"
                                            }
                                          >
                                            <img
                                              width="auto"
                                              height="auto"
                                              onError={handleError}
                                              src={`${imgBaseUrl}/${item.ring_img}/${item.ring_img}.jpg`}
                                              alt={item.ring_data?.name}
                                              className="img-responsive center-block"
                                            />
                                          </li>
                                          <li
                                            className={
                                              item.ring_color === yellow
                                                ? "active"
                                                : "displayed"
                                            }
                                          >
                                            <img
                                              width="auto"
                                              height="auto"
                                              onError={handleError}
                                              src={`${imgBaseUrl}/${item.ring_img}/${item.ring_img}.alt.jpg`}
                                              alt={item.ring_data?.name}
                                              className="img-responsive center-block"
                                            />
                                          </li>
                                          <li
                                            className={
                                              item.ring_color === rose
                                                ? "active"
                                                : "displayed"
                                            }
                                          >
                                            <img
                                              width="auto"
                                              height="auto"
                                              onError={handleError}
                                              src={`${imgBaseUrl}/${item.ring_img}/${item.ring_img}.alt1.jpg`}
                                              alt={item.ring_data?.name}
                                              className="img-responsive center-block"
                                            />
                                          </li>
                                          <li
                                            className={
                                              item.ring_color === platinum
                                                ? "active"
                                                : "displayed"
                                            }
                                          >
                                            <img
                                              width="auto"
                                              height="auto"
                                              onError={handleError}
                                              src={`${imgBaseUrl}/${item.ring_img}/${item.ring_img}.jpg`}
                                              alt={item.ring_data?.name}
                                              className="img-responsive center-block"
                                            />
                                          </li>
                                        </ul>
                                      </Link>

                                      {item.diamondItem ? (
                                        <div className="cart-left-pic">
                                          <img
                                            width="auto"
                                            height="auto"
                                            onError={handleError}
                                            src={item.diamondItem?.image_url}
                                            alt={item.diamondItem?.name}
                                          />
                                        </div>
                                      ) : (
                                        <div className="cart-left-pic">
                                          <img
                                            width="auto"
                                            height="auto"
                                            onError={handleError}
                                            src={item.gemstone?.image_url}
                                            alt={item.gemstone?.shape}
                                          />
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="product-info cart-middle-discription">
                                    <div className="product-info-inner">
                                      <div className="cart-middle-discription-text">
                                        <div>
                                          {selectedMetalColor && (
                                            <h2>
                                              <Link
                                                href="javascript:void(0);"
                                                className="td-n2"
                                              >
                                                {selectedMetalColor.value}{" "}
                                                {item.ring_data?.name} (1/2{" "}
                                                <span
                                                  style={{
                                                    textTransform: "lowercase",
                                                  }}
                                                >
                                                  ct. tw.
                                                </span>
                                                )
                                              </Link>
                                            </h2>
                                          )}
                                        </div>
                                      </div>
                                      <div className="cart-right-price">
                                        <span
                                          style={{ whiteSpace: "nowrap" }}
                                          id="prodcut_price_17566554"
                                        >
                                          ${Math.round(item.ringPrice)}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="ring-size-cart-checkout">
                                      {item.diamondItem ? (
                                        <>
                                          {" "}
                                          <div className="checkout-name-description">
                                            <div className="checkout-left-des">
                                              <p>
                                                <Link href="javascript:void(0);">
                                                  {item.diamondItem?.size} Carat{" "}
                                                  {item.diamondItem?.shape}{" "}
                                                  Diamond
                                                </Link>
                                              </p>
                                              <p className="small-text">
                                                {item.diamondItem?.cut &&
                                                  `${item.diamondItem?.cut}Cut,`}{" "}
                                                {item.diamondItem?.color} Color,{" "}
                                                {item.diamondItem?.clarity}{" "}
                                                Clarity
                                              </p>
                                              <p className="small-text">
                                                5587475AB
                                              </p>
                                            </div>
                                            <div className="cart-right-price">
                                              <p>
                                                $
                                                {Math.round(
                                                  item.diamondItem
                                                    ?.total_sales_price
                                                )}
                                              </p>
                                            </div>
                                          </div>
                                        </>
                                      ) : (
                                        <div className="checkout-name-description">
                                          <div className="cart-left-pic">
                                            <p>
                                              <Link href="javascript:void(0);">
                                                {item.gemstone?.short_title}
                                              </Link>
                                            </p>
                                          </div>
                                          <div className="checkout-right-price">
                                            <p>
                                              $
                                              {Math.round(
                                                item.gemstone?.total_sales_price
                                              )}
                                            </p>
                                          </div>
                                        </div>
                                      )}
                                      {item.diamond ? (
                                        <div className="available-list">
                                          <p>
                                            Only {item.diamondItem?.available}{" "}
                                            Available
                                          </p>
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="main-cart-inner">
                                    <div className="cart-left-pic">
                                      <img
                                        width="auto"
                                        height="auto"
                                        onError={handleError}
                                        src={item.diamonds?.image_url}
                                        alt={item.diamonds?.name}
                                      />
                                    </div>
                                  </div>
                                  <div className="product-info-inner cart-middle-discription">
                                    <div className="cart-middle-discription-text">
                                      <span>
                                        {item.diamonds?.size} Carat{" "}
                                        {item.diamonds?.shape} Diamond
                                      </span>
                                    </div>
                                    <div className="cart-right-price">
                                      <p>
                                        $
                                        {Math.round(
                                          item.diamonds?.total_sales_price
                                        )}
                                      </p>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </>
                        );
                      })}
                    </div>
                  )}

                  {/* {cartData.slice(0, 1).map} */}
                  <div className="table-count">
                    <div className="row">
                      <div className="subtotal">Subtotal</div>
                      <div className="price-right">
                        ${Math.round(calculateTotalPriceLogin())}
                      </div>
                    </div>
                    <div className="row">
                      <div className="subtotal">Shipping Fees.</div>
                      <div className="price-right">${shipValue}</div>
                    </div>
                    <div className="row">
                      <div className="subtotals">
                        <Link href="javascript:void(0);">
                          Sales TAX est {totalPrice > 0 && `(6.625%)`}
                        </Link>
                      </div>
                      <div className="price-right">${totalPrice}</div>
                    </div>

                    <div className="row total">
                      <div className="subtotal">
                        <b>Total</b>
                      </div>
                      <div className="price-right">
                        <b>
                          $
                          {totalPrice > 0
                            ? Math.round(textPrice)
                            : Math.round(shipAddedPrice)}
                        </b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        router.push("/cart")
      )}
      {loader && <LoaderSpinner/>}
    </>
  );
};
export default PaymentForm;
