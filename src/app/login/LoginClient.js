"use client";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import secureLocalStorage from "react-secure-storage";
import { validateEmail, validatePass } from "../_componentStatic/ValidationFunctions";
import { UserContext } from "../context/UserContext";
export const LoginSignup = () => {
  const router = useRouter();

  const cartData = useSelector((state) => state.cartData);
  const wishlistData = useSelector((state) => state.wishlistData);
  const { baseUrl } = useContext(UserContext);
  function validatedCpass(value, id, error) {
    const element = document.querySelector(`#${id} + .error_1`);
    const passwordValue = document.getElementById("create-pass").value;

    if (value.length < 8) {
      element.textContent = `${error} should contain atleast 8 characters`;
    } else if (value !== passwordValue) {
      element.textContent = `${error} do not match`;
    } else {
      element.textContent = "";
    }
  }

  // const previousPath = location.state?.from || '';
  // console.log(previousPath);
  
  const handleValidationsSignIn = (event) => {
    event.preventDefault();
    const formData = {
      email: document.getElementById("sign-email").value,
      password: document.getElementById("sign-pass").value,
    };

    if (formData.email == "" && formData.password == "") {
      validateEmail(
        document.getElementById("sign-email").value,
        "sign-email",
        "Email Address"
      );
      validatePass(
        document.getElementById("sign-pass").value,
        "sign-pass",
        "Password"
      );
    } else {
      axios
        .get(
          `${baseUrl}/login?email=${formData.email}&password=${formData.password}`
        )
        .then((response) => {
          if (response.status === 200) {
            const user_id = response.data.data.user_id;
            secureLocalStorage.setItem(
              "formData",
              JSON.stringify(response.data.data.user_id)
            );
            
            cartData.forEach((item) => {
              // ===========
              var URL = `${baseUrl}/cart?user_id=${user_id}
              &ring_price=${
                item.product_type === "matching_set"
                  ? item.ring_price
                  : item?.ring_price !== undefined ||
                    item.ringPrice !== undefined
                  ? item?.ring_price || item?.ringPrice
                  : ""
              }&ring_id=${
                item.ring_data?.id !== undefined || item.ring?.id
                  ? item.ring_data?.id || item.ring?.id
                  : ""
              }&ring_color=${
                item?.ring_color !== undefined ? item?.ring_color : ""
              }&diamond_id=${
                item.diamonds
                  ? item.diamonds?.stock_num !== undefined
                    ? item.diamonds?.stock_num
                    : ""
                  : item.diamondItem?.stock_num !== undefined
                  ? item.diamondItem?.stock_num
                  : ""
              }
              &diamond_stock_no=${
                item.diamonds
                  ? item.diamonds?.id !== undefined
                    ? item.diamonds?.id
                    : ""
                  : item.diamondItem?.id !== undefined
                  ? item.diamondItem?.id
                  : ""
              }&diamond_price=${
                item.diamonds
                  ? item.diamonds?.total_sales_price !== undefined
                    ? item.diamonds?.total_sales_price
                    : ""
                  : item.diamondItem?.total_sales_price !== undefined
                  ? item.diamondItem?.total_sales_price
                  : ""
              }&img_sku=${
                item?.ring_img !== undefined ? item?.ring_img : ""
              }         

            &gemstone_price=${
              item.gemstone
                ? item.gemstone?.total_sales_price !== undefined
                  ? item.gemstone?.total_sales_price
                  : ""
                : item.item?.total_sales_price !== undefined
                ? item.item?.total_sales_price
                : ""
            }&gemstone_id=${
                item.gemstone
                  ? item.gemstone?.stock_num !== undefined
                    ? item.gemstone?.stock_num
                    : ""
                  : item.item?.stock_num !== undefined
                  ? item.item?.stock_num
                  : ""
              }&gemstone_stock_no=${
                item.gemstone
                  ? item.gemstone?.id !== undefined
                    ? item.gemstone?.id
                    : ""
                  : item.item?.id !== undefined
                  ? item.item?.id
                  : ""
              }&product_type=${
                item.product_type === "gemstone"
                  ? "gemstone"
                  : item.product_type === "ring"
                  ? "ring"
                  : item.product_type === "diamond"
                  ? "diamond"
                  : item.product_type === "ring_diamond"
                  ? "ring_diamond"
                  : item.product_type === "ring_gemstone"
                  ? "ring_gemstone"
                  : item.product_type === "matching_set"
                  ? "matching_set"
                  : ""
              }&ring_size=${
                item?.ring_size === undefined ? null : item?.ring_size
              } &ring_type=${item.ring_type ? item.ring_type : null}${
                (item.type_diamond !== null || item.diamond_type !== null) &&
                (item.type_diamond === "lab_grown" ||
                  item.diamond_type === "lab_grown")
                  ? "&diamond_type=Lab_grown_Diamond"
                  : item.type_diamond === "natural" ||
                    item.diamond_type === "natural"
                  ? "&diamond_type=Diamond"
                  : `&diamond_type=`
              }&engraving=${item.textEngraving ? item.textEngraving : null}&font=${item.font_style ? item.font_style : null}`;

              axios
                .get(
                  URL,

                  {
                    headers: {
                      "Content-Type": "application/json",
                      "X-CSRF-TOKEN": shapeData,
                    },
                  }
                )
                .then((response) => {
                  if (response.status === 200) {
                    
                  } else {
                    console.error("Error Status:", response.status);
                  }
                })

                .catch((error) => {
                  console.error("Error:", error);
                });
              // ============
            });

            toast.success("Login Successfully !", {
              position: "top-right",
            });

            setTimeout(() => {
              // router.push(previousPath==="" ? "/accounts" : "/cart");
              router.push('/accounts')
            }, 3000);

            wishlistData.forEach((item) => {
              var wishListURL = `${baseUrl}/add_to_wishlist?user_id=${user_id}&ring_price=${
                item.product_type === "ring"
                  ? item.item?.white_gold_price
                  : item.product_type === "ring_diamond"
                  ? item.removingItem.ring_data.white_gold_price
                  : item.product_type === "ring_gemstone"
                  ? item.removingItem.ring_data.white_gold_price
                  : item.product_type === "matching_set"
                  ? item.ring_price
                  : ""
              }&ring_size=${item?.ring_size}
              &ring_id=${
                item.product_type === "ring"
                  ? item.item?.id
                  : item.product_type === "ring_diamond"
                  ? item.removingItem.ring_data.id
                  : item.product_type === "ring_gemstone"
                  ? item.removingItem.ring_data.id
                  : item.product_type === "matching_set"
                  ? item.ring?.id
                  : ""
              }&ring_color=${
                item.product_type === "ring" && item?.ring_color !== undefined
                  ? item?.ring_color
                  : item.product_type === "ring_diamond"
                  ? item.removingItem.ring_color
                  : item.product_type === "ring_gemstone"
                  ? item.removingItem.ring_color
                  : item.product_type === "matching_set"
                  ? item.ring_color
                  : ""
              }
            &img_sku=${
              item.product_type === "ring" && item.item?.images !== undefined
                ? item.item?.images
                : item.product_type === "ring_diamond"
                ? item.removingItem.ring_img
                : item.product_type === "ring_gemstone"
                ? item.removingItem.ring_img
                : item.product_type === "matching_set"
                ? item.ring_img
                : ""
            } 
           
            &diamond_id=${
              item.product_type === "diamond"
                ? item.diamonds?.stock_num
                : item.product_type === "ring_diamond"
                ? item.diamond?.stock_num
                : ""
            }&diamond_price=${
                item.product_type === "diamond"
                  ? item.diamonds?.total_sales_price
                  : item.product_type === "ring_diamond"
                  ? item.diamond?.total_sales_price
                  : ""
              }      
            &diamond_stock_no=${
              item.product_type === "diamond"
                ? item.diamonds?.id
                : item.product_type === "ring_diamond"
                ? item.diamond?.id
                : ""
            }&product_type=${
                item.product_type === "gemstone"
                  ? "gemstone"
                  : item.product_type === "ring"
                  ? "ring"
                  : item.product_type === "diamond"
                  ? "diamond"
                  : item.product_type === "ring_diamond"
                  ? "ring_diamond"
                  : item.product_type === "ring_gemstone"
                  ? "ring_gemstone"
                  : item.product_type === "matching_set"
                  ? "matching_set"
                  : ""
              }
            &gemstone_price=${
              item.product_type === "gemstone" ||
              item.product_type === "ghemstone"
                ? item.item?.total_sales_price
                : item.product_type === "ring_gemstone"
                ? item.diamond?.total_sales_price
                : ""
            }&gemstone_id=${
                item.product_type === "gemstone" ||
                item.product_type === "ghemstone"
                  ? item.item.stock_num
                  : item.product_type === "ring_gemstone"
                  ? item.diamond.stock_num
                  : ""
              }
               &gemstone_stock_no=${
                 item.product_type === "gemstone" ||
                 item.product_type === "ghemstone"
                   ? item.item.id
                   : item.product_type === "ring_gemstone"
                   ? item.diamond.id
                   : ""
               }
            &ring_type=${item.ring_type ? item.ring_type : null}
            ${
              (item.type_diamond !== null || item.diamond_type !== null) &&
              (item.type_diamond === "lab_grown" ||
                item.diamond_type === "lab_grown")
                ? "&diamond_type=Lab_grown_Diamond"
                : item.type_diamond === "natural" ||
                  item.diamond_type === "natural"
                ? "&diamond_type=Diamond"
                : `&diamond_type=`
            }&engraving=&font=
            `;

              axios
                .get(wishListURL, {
                  headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": shapeData,
                  },
                })
                .then((response) => {
                  if (response.status === 200) {
                   
                  } else {
                    console.error("Error Status:", response.status);
                  }
                })

                .catch((error) => {
                  console.error("Error:", error);
                });
            });
          } else {
            console.error("Error Status:", response.status);
          }
        })

        .catch((error) => {
          document.querySelector("#sign-email + .error_1").textContent =
            "Email/Password not match";
        });
    }
  };

  const handleCreateAccount = async (event) => {
    validateName(document.getElementById("fname").value, "fname", "First Name");
    validateName(document.getElementById("lname").value, "lname", "Last Name");
    validateEmail(
      document.getElementById("create-email").value,
      "create-email",
      "Email Address"
    );
    validatePass(
      document.getElementById("create-pass").value,
      "create-pass",
      "Password"
    );
    validatedCpass(
      document.getElementById("create-cpass").value,
      "create-cpass",
      "Confirm Password"
    );

    event.preventDefault();
    try {
      const formData = {
        first_name: document.getElementById("fname").value,
        last_name: document.getElementById("lname").value,
        email: document.getElementById("create-email").value,
        password: document.getElementById("create-pass").value,
        c_password: document.getElementById("create-cpass").value,
        newsletter: document.querySelector('input[name="newsletter"]').checked,
      };
      if (
        formData.first_name != "" &&
        formData.last_name != "" &&
        formData.email != "" &&
        formData.password != "" &&
        formData.c_password != ""
      ) {
        if (formData.password === formData.c_password) {
          const response = await axios.post(
            `${baseUrl}/user-registration`,
            formData,
            {
              headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": shapeData,
                // Add other headers if needed
              },
            }
          );

          if (response.status === 200) {
            toast.success(response.data?.msg, {
              position: "top-right",
            });
          } else {
            console.error("Error:", response.statusText);
            toast.error("This email already exist", {
              position: "top-right",
            });
          }
        }
      }
    } catch (error) {
      toast.error(error.response.data.msg[0], {
        position: "top-right",
      });
      console.error("Error:", error);
    }
    // sighup form code end here

    // ========================================

    // history.push("/");
  };

  const [shapeData, setShapeData] = useState([]);
  useEffect(() => {
    axios
      .get(
        "http://ec2-3-18-62-57.us-east-2.compute.amazonaws.com/admin/api/csrf-token"
      )
      .then((res) => {
        setShapeData(res.data.csrf_token);
      })
      .catch((error) => {
        console.log("CSRF Token API Error:", error);
      });
  }, []);

  // The rest of your component code...

  // The rest of your component code...
   // ============ meta tag  =======================//
  //  const currentUrl = window.location.href;
  //  const pathSegments = location.pathname
  //    .split("/")
  //    .filter((segment) => segment);
  //  const mainCategory = pathSegments[0] || "";
  return (
    <>
     {/* <MetaTagCategoryPage mainCategory={mainCategory}  currentUrl={currentUrl}/> */}
   
      <div className="my-accout-section">
        <div className="container container-1290-list-pages">
          
          <div className="title">
            <h2>My Account</h2>
          </div>

          <div className="accout-inner">
            <div className="sign-in-accout form-layout">
              <h3>Sign In</h3>
              <p>If you have a Sama customer account, please sign in.</p>

              <form
                enctype="multipart/form-data"
                // method="post"
                action=""
                className="form-search"
              >
                <input
                  type="text"
                  name="first_name"
                  placeholder="Email Address"
                  id="sign-email"
                  className="form-control"
                />
                <div className="error_1"></div>

                <input
                  type="password"
                  placeholder="Password"
                  id="sign-pass"
                  maxLength={8}
                  className="form-control"
                />
                <div className="error_1"></div>

                <p>
                  <Link className="forget" href="/password_reset">
                    Forgot your password?
                  </Link>
                </p>

                <button
                  type="submit"
                  className="btn"
                  onClick={handleValidationsSignIn}
                >
                  sign in
                </button>
              </form>
            </div>

            <div className="create-accout form-layout">
              <h3>Create an Account</h3>
              <p>Enjoy the benefits of a Sama account:</p>
              <ul className="acc-list">
                <li>Save items to Wish List and Shopping Cart</li>
                <li>Request a ring resize online</li>
                <li>Faster check out</li>
                <li>Exclusive offers</li>
                <li>View Order History</li>
              </ul>

              <form
                className="form-search"
                enctype="multipart/form-data"
                method="post"
                action=""
              >
                <input
                  className="form-control"
                  type="text"
                  maxLength="30"
                  name="first_name"
                  placeholder="First Name"
                  id="fname"
                />
                <div className="error_1"></div>

                <input
                  className="form-control"
                  type="text"
                  maxLength="30"
                  name="last_name"
                  placeholder="Last Name"
                  id="lname"
                />
                <div className="error_1"></div>

                <input
                  type="email"
                  className="form-control"
                  maxLength="75"
                  name="email"
                  placeholder="Email Address"
                  id="create-email"
                />
                <div className="error_1"></div>

                <input
                  className="form-control"
                  type="password"
                  maxLength="8"
                  name="password"
                  placeholder="Password"
                  id="create-pass"
                />
                <div className="error_1"></div>

                <input
                  className="form-control"
                  type="password"
                  maxLength="8"
                  name="c_password"
                  placeholder="Confirm Password"
                  id="create-cpass"
                />
                <div className="error_1"></div>

                <p>
                  Passwords are case sensitive and must be at least 8 characters
                  long.
                </p>
               
                <p className="pt-10">
                  <button
                    className="btn btn-success btn-lg btn-block"
                    type="submit"
                    onClick={handleCreateAccount}
                  >
                    create account
                  </button>
                </p>
                <p className="mt-30 fs-12">
                SAMA needs the contact information you provide to us to contact you about our products and services. You may unsubscribe from these communications at any time. For information on how to unsubscribe, as well as our privacy practices and commitment to protecting your privacy, please review our
                  
                  <Link className="td-u" href="/privacy-policy">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
};
