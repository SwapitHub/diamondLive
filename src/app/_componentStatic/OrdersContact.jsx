import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import secureLocalStorage from "react-secure-storage";
import { UserContext } from "../context/UserContext";
import { validateEmail, validateName, validatePass } from "./ValidationFunctions";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const OrdersContact = ({ profileData }) => {
  const [firstName, setFirstName] = useState(
    profileData?.userdata.first_name || ""
  );
  const [lastName, setLastName] = useState(
    profileData?.userdata.last_name || ""
  );

  const { baseUrl } = useContext(UserContext);
  const dispatch = useDispatch();
  const router = useRouter();
  const cartData = useSelector((state) => state.cartData);
  const wishlistData = useSelector((state) => state.wishlistData);
  function validatedPass(value, id, error) {
    const element = document.querySelector(`#${id} + .error_1`);
    if (element.length < 8) {
      element.textContent = `${error} should contain atleast 8 characters`;
    } else {
      element.textContent = "";
    }
  }

  function validatedCpass(value, id, error) {
    const element = document.querySelector(`#${id} + .error_1`);
    const passwordValue = document.getElementById("new_password")?.value;

    if (value.length < 8) {
      element.textContent = `${error} should contain atleast 8 characters`;
    } else if (value !== passwordValue) {
      element.textContent = `${error} do not match`;
    } else {
      element.textContent = "";
    }
  }

 
  const user_id = secureLocalStorage.getItem("formData");
  // =============
  const handleChangePassword = (event) => {
    event.preventDefault();

    // sighup form code end here
    const formData = {
      first_name: document.getElementById("fname").value,
      last_name: document.getElementById("lname").value,
      email: document.getElementById("create-email").value,
      current_password: document.getElementById("create-pass").value,
      password: document.getElementById("new_password").value,
      c_password: document.getElementById("create-cpass").value,
      newsletter: document.querySelector('input[name="newsletter"]').checked,
    };

    if (formData.first_name) {
      validateName(formData.first_name, "fname", "First Name");
    }

    if (formData.last_name) {
      validateName(formData.last_name, "lname", "Last Name");
    }

    if (formData.email) {
      validateEmail(formData.email, "create-email", "Email Address");
    }

    if (formData.current_password) {
      validatePass(formData.current_password, "create-pass", "Password");
    }
    if (formData.password) {
      validatePass(formData.password, "new_password", "Password");

      validatedCpass(formData.c_password, "create-cpass", "Confirm Password");
    }

    if (
      formData.first_name ||
      formData.last_name ||
      formData.email ||
      formData.current_password ||
      (formData.password && formData.c_password)
    ) {
      if (formData.password && !formData.c_password) {
        return;
      }
      axios
        .get(
          `${baseUrl}/update_preferences/${user_id}?first_name=${formData.first_name}&last_name=${formData.last_name}&email=${formData.email}&current_password=${formData.current_password}&password=${formData.password}&c_password=${formData.c_password}&send_updates=${formData.send_updates}&newsletter=${formData.newsletter}`
        )
        .then((res) => {

          if (formData.password && formData.c_password) {
            cartData.map((item) => {
              dispatch(removeToCart(item));
            });
            wishlistData.map((item) => {
              dispatch(removeToWishlist(item));
            });
            setTimeout(() => {
              router.push("/login");
            }, 3000);

            secureLocalStorage.clear();
            secureLocalStorage.removeItem("persist:persist-store");

            toast.success("Successfully Updated!", {
              position: "top-right",
            });
          } else {
            toast.success("Successfully Updated!", {
              position: "top-right",
            });
          }
        })
        .catch((err) => {
          toast.error("Error While Updating", {
            position: "top-right",
          });
          console.log(err, "profile api error");
        });
    }
    // history.push("/");
  };

  // ========================================
 
  return (
    <>
      
        <div class="setting-acc-main">
          <h1 class="h2">My Account</h1>
          <h2 class="h3">Update Account Information </h2>

          <div class="update-acc-form">
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
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  validateName(e.target.value, "fname", "First Name");
                }}
              />
              <div className="error_1"></div>

              <input
                className="form-control"
                type="text"
                maxLength="30"
                name="last_name"
                placeholder="Last Name"
                id="lname"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  validateName(e.target.value, "lname", "Last Name");
                }}
              />
              <div className="error_1"></div>

              <input
                type="email"
                className="form-control"
                maxLength="75"
                name="email"
                placeholder="Email Address"
                id="create-email"
                value={profileData?.userdata.email}
                readOnly
                onChange={(e) =>
                  validateEmail(e.target.value, "create-email", "Email Address")
                }
              />
              <div className="error_1"></div>

              <input
                className="form-control"
                type="password"
                maxLength="8"
                name="password"
                placeholder="Current Password"
                id="create-pass"
                onChange={(e) =>
                  validatePass(e.target.value, "create-pass", "Password")
                }
              />
              <div className="error_1"></div>
              <input
                className="form-control"
                type="password"
                maxLength="8"
                name="c_password"
                placeholder="New Password"
                id="new_password"
                onChange={(e) =>
                  validatePass(e.target.value, "new_password", "Password")
                }
              />
              <div className="error_1"></div>

              <input
                className="form-control"
                type="password"
                maxLength="8"
                name="c_password"
                placeholder="Conform Password"
                id="create-cpass"
                onChange={(e) =>
                  validatedCpass(e.target.value, "create-cpass", "Password")
                }
              />
              <div className="error_1"></div>

              <p>
                Passwords are case sensitive and must be at least 8 characters
                long.
              </p>
              <div className="checkbox">
                <label>
                  <input type="checkbox" name="newsletter" />
                  Email me SAMA news, updates and offers.
                </label>
              </div>
              <p className="pt-10">
                <button
                  className="btn btn-success btn-lg btn-block"
                  type="submit"
                  onClick={handleChangePassword}
                >
                  Update & Save Changes
                </button>
              </p>
              <p className="mt-30 fs-12">
                Your privacy is important to us. By Clicking “Create Account”,
                you agree to our{" "}
                <Link className="td-u" href="/term-of-use">
                  Terms
                </Link>{" "}
                and{" "}
                <Link className="td-u" href="/privacy-policy">
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      
    </>
  );
};
