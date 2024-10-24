"use client";
import { useContext, useEffect, useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";

import axios from "axios";
import {
  validateAddress,
  validateCpass,
  validateEmail,
  validateName,
  validatePass,
  validatePostCode,
  validateTelephone,
} from "../_componentStatic/ValidationFunctions";

import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import secureLocalStorage from "react-secure-storage";
import { UserContext } from "../context/UserContext";

export const CheckOutPage = ({cartDetails, metalColor}) => {
  
  const { baseUrl, imgBaseUrl, imgAssetsUrl } = useContext(UserContext);
  const router = useRouter();
  const white = "18k-white-gold";
  const yellow = "18k-yellow-gold";
  const rose = "18k-rose-gold";
  const platinum = "platinum";

  const user_id = secureLocalStorage.getItem("formData");

  const [checked, setChecked] = useState(true);
  const [shipValue, setShipValue] = useState(false);

  function handleChange() {
    setChecked(!checked);
  }

  const handleShipData = () => {
    const formData = {
      first_name: document.getElementById("firstName").value,
      last_name: document.getElementById("lastName").value,

      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      postcode: document.getElementById("postcode").value,
      email: document.getElementById("create-email").value,
      telephone: document.getElementById("telephone").value,
      selectCity: document.getElementById("selectCity").value,
      selectState: document.getElementById("selectState").value,
    };

    const addressId = [];

    const URL = `${baseUrl}/save-users-address?user_id=${user_id}&address_type=shipping_address
    &first_name=${formData.first_name}&last_name=${formData.last_name}&address_line1=${formData.address}&address_line2&city=${formData.city}&state=${formData.selectState}&zipcode=${formData.postcode}&country=${formData.selectCity}&email=${formData.email}&phone=${formData.telephone}&send_me_updates=true`;

    axios
      .get(
        URL
      )

      .then((response) => {
        if (response.status === 200) {
          addressId.push(response.data.data?.id);
          const indexString = addressId.join(",");
          const dataToPass = {addressId:indexString,  totalPrice: userAccountData==="new jersey" ? Math.round(totalPrice) : "0",  shipValue: shipValue ? 50 : 0 };
          
          const serializedData = JSON.stringify(dataToPass);

         
        //   router.push({
        //     pathname: '/payment',
        //     query: {data: JSON.stringify("hello")},
        //   });

          //   router.push(`/payment`, { state: dataToPass });
          router.push('/payment');
          Cookies.set('userAccountDataShip', serializedData,{
            expires: 3650, 
            secure: true,  
            sameSite: 'Strict'
          }) 
        } else {
          console.error("Error Status:", response.status);
        }
      })

      .catch((error) => {
        console.error("Error:", error);
      });
    if (!checked) {
      const formData_1 = {
        first_name: document.getElementById("billingfirstName").value,
        last_name: document.getElementById("billinglastName").value,

        address: document.getElementById("billingaddress").value,
        city: document.getElementById("billingcity").value,
        postcode: document.getElementById("billingpostcode").value,
        telephone: document.getElementById("billingtelephone").value,
        selectCity: document.getElementById("billingselectCity").value,
        selectState: document.getElementById("billingselectState").value,
      };

      const URL_1 = `${baseUrl}/save-users-address?user_id=${user_id}&address_type=billing_address&first_name=${formData_1.first_name}&last_name=${formData_1.last_name}&address_line1=${formData_1.address}&address_line2&city=${formData_1.city}&state=${formData_1.selectState}&zipcode=${formData_1?.postcode}&country=${formData_1?.selectCity}&email=${formData?.email}.com&phone=${formData_1.telephone}&send_me_updates=true`;
      axios
        .get(URL_1)

        .then((response) => {
          if (response.status === 200) {
            addressId.push(response.data.data?.id);
          } else {
            console.error("Error Status:", response.status);
          }
        })

        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const [userAccountData, setUserAccountData] = useState();
  console.log(userAccountData);

  useEffect(() => {
    axios
      .get(`${baseUrl}/user-account?user_id=${user_id}`)
      .then((res) => {
        setUserAccountData(res.data);
      })
      .catch((error) => {
        console.log(error, "user account API error");
      });
  }, [user_id]);
  const [stateData, setStateData] = useState();

  const handleChangeUserData = (e) => {
    setUserAccountData(e?.target?.value);
  };
  const handleCountry = (e) => {
    const selectedOption = e.target.options[e.target?.selectedIndex];
    const attributeValue = selectedOption.getAttribute("data-id");

    axios
      .get(`${baseUrl}/getstate-list?country_id=${attributeValue}`)
      .then((res) => {
        setStateData(res?.data.data);
      })
      .catch((error) => {
        console.log(error, "state API error");
      });
  };

  const handleValidations = (event) => {
    event?.preventDefault();

    // ====================
    validateName(
      document.getElementById("firstName").value,
      "firstName",
      "First Name"
    );
    validateName(
      document.getElementById("lastName").value,
      "lastName",
      "Last Name"
    );
    validateAddress(
      document.getElementById("address").value,
      "address",
      "Address"
    );
    validateName(document.getElementById("city").value, "city", "City/Town");
    validatePostCode(
      document.getElementById("postcode").value,
      "postcode",
      "Zip Code"
    );

    validateEmail(
      document.getElementById("create-email").value,
      "create-email",
      "Email Address"
    );
    validateTelephone(
      document.getElementById("telephone").value,
      "telephone",
      "Telephone"
    );
    validateAddress(
      document.getElementById("selectCity").value,
      "selectCity",
      "Country"
    );
    validateAddress(
      document.getElementById("selectState").value,
      "selectState",
      "State"
    );
    !user_id &&
      validatePass(document.getElementById("pass").value, "pass", "Password");
    !user_id &&
      validateCpass(
        document.getElementById("cpass").value,
        "cpass",
        "Confirm Password"
      );

    if (!checked) {
      validateName(
        document.getElementById("billingfirstName").value,
        "billingfirstName",
        "First Name"
      );
      validateName(
        document.getElementById("billinglastName").value,
        "billinglastName",
        "Last Name"
      );
      validateAddress(
        document.getElementById("billingaddress").value,
        "billingaddress",
        "Address"
      );
      validateName(
        document.getElementById("billingcity").value,
        "billingcity",
        "City/Town"
      );
      validatePostCode(
        document.getElementById("billingpostcode").value,
        "billingpostcode",
        "Zip Code"
      );
      validateTelephone(
        document.getElementById("billingtelephone").value,
        "billingtelephone",
        "Telephone"
      );
      validateAddress(
        document.getElementById("billingselectCity").value,
        "billingselectCity",
        "City"
      );
      validateAddress(
        document.getElementById("billingselectState").value,
        "billingselectState",
        "State"
      );
    }
  };
  
  // =============


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

  const totalPrice = (calculateTotalPriceLogin() * 6.625) / 100;

  const perCentTotalPrice =
    totalPrice + calculateTotalPriceLogin() + (shipValue ? 50 : 0);

  const shipAddedPrice = calculateTotalPriceLogin() + (shipValue ? 50 : 0);

  // ============ meta tag  =======================//

  const hasDuplicate = cartDetails.some((item, index) =>
    cartDetails
      .slice(index + 1)
      .some((otherItem) =>
        item.diamond?.some((diamond) =>
          otherItem.diamond?.some(
            (otherDiamond) => parseInt(diamond.id) === parseInt(otherDiamond.id)
          )
        )
      )
  );

  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
  };
  const shipngOverNight = () => {
    setShipValue(!shipValue);
  };

  const [countryData, setCountryData] = useState();
  useEffect(() => {
    axios
      .get(`${baseUrl}/country-list`)
      .then((res) => {
        setCountryData(res.data.data);
        console.log(res);
      })
      .catch((error) => {
        console.log(error, "country API error");
      });
  }, []);

  return (
    <>
      {cartDetails?.length > 0 && !hasDuplicate ? (
        <>
          <div className="checkout-info">
            <div className="container">
              <div className="checkout-info">
                <h3>Shipping information</h3>

                <div className="checkout">
                  <div className="checkout-left">
                    <form action="">
                      <div className="group-fields two-fields">
                        <div className="inputs">
                          <input
                            type="text"
                            placeholder="First Name"
                            maxLength={30}
                            value={
                              userAccountData?.address?.shipping_address
                                ?.first_name
                            }
                            onChange={(e) => {
                              validateName(
                                e.target?.value,
                                "firstName",
                                "First Name"
                              );
                              handleChangeUserData(e);
                            }}
                            id="firstName"
                          />
                          <div className="error_1"></div>
                        </div>
                        <div className="inputs">
                          <input
                            type="text"
                            placeholder="Last Name"
                            id="lastName"
                            value={
                              userAccountData?.address?.shipping_address
                                ?.last_name
                            }
                            onChange={(e) => {
                              validateName(
                                e.target?.value,
                                "lastName",
                                "Last Name"
                              );
                              handleChangeUserData(e);
                            }}
                          />
                          <div className="error_1"></div>
                        </div>
                      </div>
                      <div className="group-fields">
                        <div className="full-width">
                          <input
                            type="text"
                            placeholder="Address Line 1"
                            id="address"
                            value={
                              userAccountData?.address?.shipping_address
                                ?.address_line1
                            }
                            onChange={(e) => {
                              validateAddress(
                                e.target.value,
                                "address",
                                "Address"
                              );
                              handleChangeUserData(e);
                            }}
                          />
                          <div className="error_1"></div>
                        </div>
                        <div className="full-width">
                          <input
                            type="text"
                            placeholder="Address Line 2 (Optional)"
                            value={
                              userAccountData?.address?.shipping_address
                                ?.address_line2
                            }
                          />
                        </div>
                      </div>
                      <div className="group-fields two-fields">
                        <div className="inputs">
                          <input
                            type="text"
                            placeholder="City"
                            value={
                              userAccountData?.address?.shipping_address?.city
                            }
                            onChange={(e) => {
                              validateName(
                                e.target?.value,
                                "city",
                                "City/Town"
                              );
                              handleChangeUserData(e);
                            }}
                            id="city"
                          />
                          <div className="error_1"></div>
                        </div>
                        <div className="inputs">
                          <select
                            name=""
                            id="selectCity"
                            // value={userAccountData?.address?.shipping_address?.country}
                            onChange={(e) => {
                              validateAddress(
                                e.target.value,
                                "selectCity",
                                "City"
                              );
                              handleChangeUserData(e);
                              handleCountry(e);
                            }}
                          >
                            <option value="SelectCountry" data-id="0">
                              Select Country
                            </option>

                            {countryData?.map((item) => {
                              return (
                                <>
                                  <option
                                    value={item?.name}
                                    data-id={item?.order_number}
                                  >
                                    {item?.name}
                                  </option>
                                </>
                              );
                            })}
                          </select>
                          <div className="error_1"></div>
                        </div>
                      </div>
                      <div className="group-fields two-fields">
                        <div className="inputs">
                          <input
                            type="text"
                            placeholder="Zip Code"
                            value={
                              userAccountData?.address?.shipping_address
                                ?.zipcode
                            }
                            id="postcode"
                            onChange={(e) => {
                              validatePostCode(
                                e.target.value,
                                "postcode",
                                "Zip Code"
                              );
                              handleChangeUserData(e);
                            }}
                          />
                          <div className="error_1"></div>
                        </div>
                        <div className="inputs">
                          <select
                            name=""
                            id="selectState"
                            value={
                              userAccountData?.address?.shipping_address?.state
                            }
                            onChange={(e) => {
                              validateAddress(
                                e.target.value,
                                "selectState",
                                "State"
                              );
                              handleChangeUserData(e);
                            }}
                          >
                            <option value="" data-id="0">
                              Select State/Province
                            </option>

                            {userAccountData !== "SelectCountry" &&
                              stateData?.map((item) => {
                                return (
                                  <option value={item?.name}>
                                    {item?.name}
                                  </option>
                                );
                              })}
                          </select>
                          <div className="error_1"></div>
                        </div>
                      </div>
                      <div className="group-fields two-fields">
                        <div className="inputs">
                          <input
                            type="email"
                            className="form-control"
                            maxLength="75"
                            name="email"
                            placeholder="Email Address"
                            id="create-email"
                            value={
                              userAccountData?.address?.shipping_address?.email
                            }
                            onChange={(e) => {
                              validateEmail(
                                e.target.value,
                                "create-email",
                                "Email Address"
                              );
                              handleChangeUserData(e);
                            }}
                          />
                          <div className="error_1"></div>
                        </div>
                        <div className="inputs">
                          <input
                            type="tel"
                            placeholder="Telephone"
                            id="telephone"
                            value={
                              userAccountData?.address?.shipping_address?.phone
                            }
                            maxLength={10}
                            onChange={(e) => {
                              validateTelephone(
                                e.target.value,
                                "telephone",
                                "Telephone Number"
                              );
                              handleChangeUserData(e);
                            }}
                          />
                          <div className="error_1"></div>
                        </div>
                      </div>

                      <div className="checkboxes">
                        <p>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => handleChange()}
                          />
                          Use this address for billing
                        </p>
                        {!checked ? (
                          <div>
                            <h3>Billing Address</h3>
                            <div className="group-fields two-fields">
                              <div className="inputs">
                                <input
                                  type="text"
                                  placeholder="First Name"
                                  maxLength={30}
                                  value={
                                    userAccountData?.address?.billing_address
                                      ?.first_name
                                  }
                                  onChange={(e) => {
                                    validateName(
                                      e.target.value,
                                      "billingfirstName",
                                      "First Name"
                                    );
                                    handleChangeUserData(e);
                                  }}
                                  id="billingfirstName"
                                />
                                <div className="error_1"></div>
                              </div>
                              <div className="inputs">
                                <input
                                  type="text"
                                  placeholder="Last Name"
                                  id="billinglastName"
                                  value={
                                    userAccountData?.address?.billing_address
                                      ?.last_name
                                  }
                                  onChange={(e) => {
                                    validateName(
                                      e.target.value,
                                      "billinglastName",
                                      "Last Name"
                                    );
                                    handleChangeUserData(e);
                                  }}
                                />
                                <div className="error_1"></div>
                              </div>
                            </div>
                            <div className="group-fields">
                              <div className="full-width">
                                <input
                                  type="text"
                                  placeholder="Address Line 1"
                                  id="billingaddress"
                                  value={
                                    userAccountData?.address?.billing_address
                                      ?.address_line1
                                  }
                                  onChange={(e) => {
                                    validateAddress(
                                      e.target.value,
                                      "billingaddress",
                                      "Address"
                                    );
                                    handleChangeUserData(e);
                                  }}
                                />
                                <div className="error_1"></div>
                              </div>
                              <div className="full-width">
                                <input
                                  type="text"
                                  placeholder="Address Line 2 (Optional)"
                                  value={
                                    userAccountData?.address?.billing_address
                                      ?.address_line2
                                  }
                                />
                              </div>
                            </div>
                            <div className="group-fields two-fields">
                              <div className="inputs">
                                <input
                                  type="text"
                                  placeholder="City"
                                  value={
                                    userAccountData?.address?.billing_address
                                      ?.city
                                  }
                                  onChange={(e) => {
                                    validateName(
                                      e.target.value,
                                      "billingcity",
                                      "City/Town"
                                    );
                                    handleChangeUserData(e);
                                  }}
                                  id="billingcity"
                                />
                                <div className="error_1"></div>
                              </div>
                              <div className="inputs">
                                <select
                                  name=""
                                  id="billingselectCity"
                                  // value={userAccountData?.address?.billing_address?.country}

                                  onChange={(e) => {
                                    validateAddress(
                                      e.target.value,
                                      "billingselectCity",
                                      "City"
                                    );
                                    handleChangeUserData(e);
                                    handleCountry(e);
                                  }}
                                >
                                  <option value="" data-id="0">
                                    Select Country
                                  </option>

                                  {countryData?.map((item) => {
                                    return (
                                      <>
                                        <option
                                          value={item?.name}
                                          data-id={item?.order_number}
                                        >
                                          {item?.name}
                                        </option>
                                      </>
                                    );
                                  })}
                                </select>
                                <div className="error_1"></div>
                              </div>
                            </div>
                            <div className="group-fields two-fields">
                              <div className="inputs">
                                <input
                                  type="text"
                                  placeholder="Postcode"
                                  value={
                                    userAccountData?.address?.billing_address
                                      ?.zipcode
                                  }
                                  id="billingpostcode"
                                  maxLength={6}
                                  onChange={(e) => {
                                    validatePostCode(
                                      e.target.value,
                                      "billingpostcode",
                                      "Zip Code"
                                    );
                                    handleChangeUserData(e);
                                  }}
                                />
                                <div className="error_1"></div>
                              </div>
                              <div className="inputs">
                                <select
                                  name=""
                                  id="billingselectState"
                                  value={
                                    userAccountData?.address?.billing_address
                                      ?.state
                                  }
                                  onChange={(e) => {
                                    validateAddress(
                                      e.target.value,
                                      "billingselectState",
                                      "State"
                                    );
                                    handleChangeUserData(e);
                                  }}
                                >
                                  <option value="" data-id="0">
                                    Select State/Province
                                  </option>

                                  {stateData?.map((item) => {
                                    return (
                                      <option value={item?.name}>
                                        {item?.name}
                                      </option>
                                    );
                                  })}
                                </select>
                                <div className="error_1"></div>
                              </div>
                            </div>
                            <div className="group-fields">
                              <div className="inputs">
                                <input
                                  type="tel"
                                  placeholder="Telephone"
                                  value={
                                    userAccountData?.address?.billing_address
                                      ?.phone
                                  }
                                  id="billingtelephone"
                                  maxLength={10}
                                  onChange={(e) => {
                                    validateTelephone(
                                      e.target.value,
                                      "billingtelephone",
                                      "Telephone Number"
                                    );
                                    handleChangeUserData(e);
                                  }}
                                />
                                <div className="error_1"></div>
                              </div>
                            </div>
                          </div>
                        ) : null}

                        <p>
                          <input type="checkbox" />
                          Send me News, updates & offers
                        </p>
                      </div>
                      <p className="account">Save Your Account (Optional)</p>
                      <p className="save-account">
                        Create an account to easily track your order and request
                        a ring resize online.
                      </p>

                      <div className="shipngOverNight">
                        <input type="checkbox" onChange={shipngOverNight} />
                        <span>
                          Requests overnight delivery (1 business day)
                        </span>
                      </div>
                      {!user_id && (
                        <div className="group-fields two-fields">
                          <div className="inputs">
                            <input
                              type="password"
                              placeholder="Password"
                              id="pass"
                              onChange={(e) =>
                                validatePass(e.target.value, "pass", "Password")
                              }
                              maxLength={8}
                            />
                            <div className="error_1"></div>
                          </div>

                          <div className="inputs">
                            <input
                              type="password"
                              placeholder="Confirm Password"
                              id="cpass"
                              maxLength={8}
                              onChange={(e) =>
                                validateCpass(
                                  e.target.value,
                                  "cpass",
                                  "Password"
                                )
                              }
                            />
                            <div className="error_1"></div>
                          </div>
                        </div>
                      )}

                      <div className="move-pages">
                        <div className="move-cart">
                          <Link href="/cart">
                            <MdKeyboardArrowLeft />
                            Return To Shopping Bag
                          </Link>
                        </div>
                        <div className="continue-payment">
                          <Link
                            href="javascript:void(0)"
                            onClick={(e) => {
                              if (
                                document.getElementById("firstName").value ===
                                  "" ||
                                document.getElementById("lastName").value ===
                                  "" ||
                                document.getElementById("address").value ===
                                  "" ||
                                document.getElementById("city").value === "" ||
                                document.getElementById("postcode").value ===
                                  "" ||
                                document.getElementById("create-email")
                                  .value === "" ||
                                document.getElementById("telephone").value ===
                                  "" ||
                                document.getElementById("selectCity").value ===
                                  "" ||
                                document.getElementById("selectState").value ===
                                  ""
                              ) {
                                e.preventDefault();
                                handleValidations();
                              } else {
                                handleShipData();
                              }
                            }}
                          >
                            Continue To Payment
                          </Link>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="checkout-right">
                    {cartDetails ? (
                      <div className="checkout-right-scroll">
                        <h3>Order Summary</h3>
                        {cartDetails?.map((item) => {
                          console.log(item);
                          
                          const selectedMetalColor = metalColor.find(
                            (colorItem) =>
                              colorItem?.slug === item?.active_color
                          );
                          return (
                            <>
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
                                              alt={gemstoneItem.shape}
                                            />
                                          </div>
                                        </div>
                                        <div className="product-info-inner cart-middle-discription">
                                          <div className="cart-middle-discription-text">
                                            <span>
                                              {gemstoneItem?.short_title}
                                            </span>
                                            <span>
                                              {gemstoneItem?.stock_num}
                                            </span>
                                          </div>

                                          <div className="cart-right-price">
                                            <span
                                              id="prodcut_price_17566554"
                                              style={{ whiteSpace: "nowrap" }}
                                            >
                                              $
                                              {Math.round(
                                                gemstoneItem?.total_sales_price
                                              )}
                                            </span>
                                          </div>
                                        </div>
                                      </>
                                    );
                                  })
                                ) : item.ring?.id &&
                                  (item.diamond_id || item.gemstone_id) ? (
                                  <>
                                    <div className="main-cart-inner">
                                      <div className="cart-left-pic">
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
                                                        alt={diamondItem?.shape}
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
                                                {selectedMetalColor.value}{" "}
                                                {item.ring?.name}
                                                <div className="ring-size">
                                                  <span>Ring Size : </span>{" "}
                                                  <span>{item?.ring_size}</span>
                                                </div>
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
                                                          {diamondItem?.size}{" "}
                                                          Carat{" "}
                                                          {diamondItem?.shape}{" "}
                                                          Diamond{" "}
                                                          {diamondItem?.cut}{" "}
                                                          {diamondItem?.cut &&
                                                            `${diamondItem?.cut} Cut,`}{" "}
                                                          {diamondItem?.color}{" "}
                                                          Color,{" "}
                                                          {diamondItem?.clarity}{" "}
                                                          Clarity
                                                        </h2>
                                                      </div>
                                                      <div className="cart-right-price">
                                                        <span
                                                          id="prodcut_price_17566554"
                                                          style={{
                                                            whiteSpace:
                                                              "nowrap",
                                                          }}
                                                        >
                                                          $
                                                          {Math.round(
                                                            diamondItem?.total_sales_price
                                                          )}
                                                        </span>
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
                                                      <div className="checkout-left-des cart-right-price cart-middle-discription-text">
                                                        <h2>
                                                          {
                                                            gemstoneItem?.short_title
                                                          }
                                                        </h2>
                                                        <span
                                                          id="prodcut_price_17566554"
                                                          style={{
                                                            whiteSpace:
                                                              "nowrap",
                                                          }}
                                                        >
                                                          $
                                                          {Math.round(
                                                            gemstoneItem?.total_sales_price
                                                          )}
                                                        </span>
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
                                        <p>{item.ring?.internal_sku}</p>
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
                                              alt={diamondItem.shape}
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
                            </>
                          );
                        })}
                      </div>
                    ) : null}

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
                        <div className="price-right">
                          {shipValue ? "$50" : "$0"}
                        </div>
                      </div>
                      <div className="row">
                        <div className="subtotal">
                          Sales TAX est{" "}
                          {userAccountData === "new jersey" && `(6.625%)`}
                        </div>
                        <div className="price-right">
                          $
                          {userAccountData === "new jersey"
                            ? Math.round(totalPrice)
                            : "0"}
                        </div>
                      </div>

                      <div className="row total">
                        <div className="subtotal">
                          <b>Total</b>
                        </div>
                        <div className="price-right">
                          <b>
                            $
                            {userAccountData === "new jersey"
                              ? Math.round(perCentTotalPrice)
                              : Math.round(shipAddedPrice)}
                          </b>
                        </div>
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
    </>
  );
};
