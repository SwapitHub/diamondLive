import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useSelector } from "react-redux";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import { validateCpass, validateEmail } from "./ValidationFunctions";

export const Account = () => {
  const { baseUrl } = useContext(UserContext);
  const router = useRouter();
  const cartData = useSelector((state) => state.cartData);

  const wishlistData = useSelector((state) => state.wishlistData);

  const handleValidationsSignIn = (event) => {
    event.preventDefault();
    const formData = {
      email: document.getElementById("email").value,
      password: document.getElementById("pass").value,
      // newsletter: document.querySelector('input[name="newsletter"]').checked,
    };
    if (formData.email == "" && formData.password == "") {
      validateEmail(
        document.getElementById("email").value,
        "email",
        "Email Address"
      );
      validateCpass(document.getElementById("pass").value, "pass", "Password");
    } else {
      axios
        .get(
          `${baseUrl}/login?email=${formData.email}&password=${formData.password}`
        )
        .then((response) => {
          if (response.status === 200) {
            const user_id = response.data.data.user_id;
            Cookies.set("userIdCookies", response.data.data.user_id, {
              expires: 3650, 
              secure: true,  
              sameSite: 'Strict'
            });
            secureLocalStorage.setItem(
              "formData",
              JSON.stringify(response.data.data.user_id)
            );
           
            cartData.forEach((item) => {
              // ===========
              var URL = `${baseUrl}/cart?user_id=${user_id}
              &ring_price=${
                item?.ring_price !== undefined || item.ringPrice !== undefined
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
              router.push("/accounts");
              // window.location.reload(true);
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
              }&ring_id=${
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
            }&engraving=${item.textEngraving ? item.textEngraving : null}&font=${item.font_style ? item.font_style : null}
            `;

              axios
                .get(wishListURL, {
                 
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
          document.querySelector("#email + .error_1").textContent =
            "Email/Password not match";
        });
    }
  };

 
  return (
    <>
      <div id="user-log" className="login">
        <div className="login-inner">
          <p>Don't have an Account?</p>
          <Link className="btn" href="/login">
            Create An Account
          </Link>
          <p>Sign In to Your Account</p>
          <form enctype="multipart/form-data" method="post" action="">
            <input type="text" placeholder="Email Address" id="email" autoComplete="off"/>
            <div className="error_1"></div>
            <input
              type="password"
              placeholder="Password"
              id="pass"
              maxLength={8}
            />
            <div className="error_1"></div>
          </form>
          <p>
            <Link className="forgot" href="/password_reset">
              Forgot Your Password?
            </Link>
          </p>

          <button
            type="submit"
            className="submit"
            onClick={handleValidationsSignIn}
          >
            SIGN IN
          </button>
        </div>
      </div>
    </>
  );
};
