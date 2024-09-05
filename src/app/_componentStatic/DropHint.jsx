import React, { useContext, useState } from "react";
import { IoIosAdd, IoIosClose } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";
import { validateEmail, validateName } from "./ValidationFunctions";
import { UserContext } from "../context/UserContext";

export const DropHint = ({
  setOpen,
  filterData,
  diamondItem,
  productColor,
  diamond,
}) => {
  const [click, setClick] = useState(false);

  const { baseUrl,imgBaseUrl } = useContext(UserContext);

  function handleDropValidations(color, ringId, diamondId) {
    const recipientEmail = document.getElementById("drop-recipient").value;
    const yourEmail = document.getElementById("drop-first-name").value;
    const yourName = document.getElementById("drop-last-name").value;

    validateEmail(recipientEmail, "drop-recipient", "Recipient's Email");
    validateName(yourEmail, "drop-first-name", "First Name");
    validateName(yourName, "drop-last-name", "Last Name");

    const formData = {
      email: document.getElementById("drop-recipient")?.value,
      first_name: document.getElementById("drop-first-name")?.value,

      last_name: document.getElementById("drop-last-name")?.value,

      message: document.getElementById("contact_input_message")?.value,
    };
    const productData = {
      ringId: ringId,
      productColor: color,
      [diamondItem?.gem_type != null || diamond?.gem_type != null
        ? "gemstoneId"
        : "diamondId"]:
        diamondItem?.gem_type != null || diamond?.gem_type != null
          ? diamondId
          : diamondId,
    };

    if (recipientEmail != "" && yourEmail != "" && yourName != "") {
      const URL = `${baseUrl}/contact?first_name=${
        formData.first_name
      }&last_name=${formData.last_name}&email=${formData.email}&message=${
        formData.message ? formData.message : null
      }&product_data=${JSON.stringify(productData)}&type=product_enquiry`;
      axios
        .get(
          URL,

          {
            headers: {
              "Content-Type": "application/json",
              
            },
          }
        )

        .then((response) => {
          if (response.status === 200) {
            setOpen(false);
            toast.success(response.data?.msg, {
              position: "top-right",
              className: "foo-bar",
            });
          } else {
            console.error("Error Status:", response);
          }
        })

        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
  const white = "18k-white-gold";
  const yellow = "18k-yellow-gold";
  const rose = "18k-rose-gold";
  const platinum = "platinum";


  return (
    <>
      <section class="hintt-drop-popup">
        <div class="popup-hint">
          <div class="popup-cnt-hint">
            <Link href="javascript:void(0);" onClick={() => setOpen(false)}>
              <span>
                <IoIosClose />
              </span>
            </Link>
            <h2>drop a hint</h2>
            <p>Love this design? Share a little hint.</p>
          </div>
          <div class="hint-card-inner">
            <div class="product-pic">
              <ul className="">
                <li className={productColor === white ? "active" : "displayed"}>
                  <img  width="auto"  height="auto"  
                    src={`${imgBaseUrl}/${filterData?.imgUrl}/${filterData?.imgUrl}.jpg`}
                    alt={filterData?.product?.name}
                  />
                </li>
                <li
                  className={productColor === yellow ? "active" : "displayed"}
                >
                  <img  width="auto"  height="auto"  
                    src={`${imgBaseUrl}/${filterData?.imgUrl}/${filterData?.imgUrl}.alt.jpg`}
                    alt={filterData?.product?.name}
                  />
                </li>
                <li className={productColor === rose ? "active" : "displayed"}>
                  <img  width="auto"  height="auto"  
                    src={`${imgBaseUrl}/${filterData?.imgUrl}/${filterData?.imgUrl}.alt1.jpg`}
                    alt={filterData?.product?.name}
                  />
                </li>
                <li
                  className={productColor === platinum ? "active" : "displayed"}
                >
                  <img  width="auto"  height="auto"  
                    src={`${imgBaseUrl}/${filterData?.imgUrl}/${filterData?.imgUrl}.jpg`}
                    alt={filterData?.product?.name}
                  />
                </li>
                <li>
                  {(diamondItem || diamond) && (
                    <img  width="auto"  height="auto"  
                      src={diamondItem?.image_url || diamond?.image_url}
                      alt={diamondItem?.shape || diamond?.shape}
                    />
                  )}
                </li>
              </ul>
            </div>
            <div class="product-info">
              <div class="product-info-inner">
                <div class="product-info-left">
                  <div className="ring-info-drophint">
                    {productColor ? productColor?.replace(/-/g," ") : ""}{" "}
                    {filterData?.product?.name ? (
                      filterData?.product?.name
                    ) : diamond?.gem_type != null ? (
                      <span>{diamond?.short_title}</span>
                    ) : diamond && diamond?.gem_type == null ? (
                      <span>
                        {diamond?.size} Carat {diamond?.shape} Diamond{" "}
                      </span>
                    ) : null}
                  </div>
                  {diamond ? null : (
                    <div className="diamond-info-drophint">
                      {diamondItem?.gem_type !== null ? (
                        diamondItem?.short_title
                      ) : diamondItem?.gem_type == null ? (
                        <span>
                          {diamondItem?.size} Carat {diamondItem?.shape} Diamond{" "}
                        </span>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div class="draft-hint">
            <form>
              <label for="first_emails">Recipient's Email</label>
              <input
                type="text"
                class="form-control"
                name="first_name"
                maxlength="32"
                id="drop-recipient"
              />
              <div className="error_1"></div>
              <label for="your_emails">First Name</label>
              <input
                type="text"
                class="form-control"
                name="last_name"
                maxlength="32"
                id="drop-first-name"
              />
              <div className="error_1"></div>
              <label for="fyour_name">Last Name</label>
              <input
                type="text"
                class="form-control"
                name="email"
                maxlength="128"
                id="drop-last-name"
              />
              <div className="error_1"></div>
              {click ? (
                <>
                  <div className="your-note-drop-icon">
                    <div className="close-drop-icon">
                      <label htmlFor="first_note">Your Note (optional)</label>
                      <Link
                        href="javascript:void(0);"
                        onClick={() => setClick(!click)}
                      >
                        <IoIosClose />
                      </Link>
                    </div>
                    <textarea
                      type="text"
                      className="form-control"
                      id="contact_input_message"
                      style={{ height: "6em" }}
                      name="message"
                      maxLength="400"
                      placeholder="Share details like ring size, metal type, or carat weight preferences to nudge someone in the right direction."
                    ></textarea>
                  </div>
                </>
              ) : (
                <div
                  className="click-function"
                  onClick={() => setClick(!click)}
                >
                  <IoIosAdd />
                  <Link href="javascript:void(0);">Add a Note</Link>{" "}
                  <span>(optional)</span>
                </div>
              )}

              <label>
                <input type="checkbox" />
                <span class="send-text">Send me a Copy of this mail.</span>
              </label>
              <label>
                <input type="checkbox" />
                <span class="send-text">Send me SAMA email updates.</span>
              </label>
              <button
                type="button"
                class="btn btn-success btn-block"
                onClick={() =>
                  handleDropValidations(
                    productColor ? productColor : null,
                    filterData?.product?.id ? filterData?.product?.id : null,
                    diamondItem?.id ? diamondItem?.id : diamond?.id
                  )
                }
              >
                send
              </button>
              <div class="politices-remark">
                <i class="fa-solid fa-xmark"></i>
              </div>
            </form>
          </div>

          <div class="submit-policies">
            <p>
              By submitting this form, you agree that SAMA may use your email
              address in accordance with our Privacy Policy.{" "}
              <Link
                onClick={() => document.body.classList.remove("popup-open")}
                href="/privacy-policy"
              >
                View Privacy Policy.
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
