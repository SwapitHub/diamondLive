'use client'
import { ContinueShoping } from "@/app/_componentStatic/ContinueShopping";
import { UserContext } from "@/app/context/UserContext";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import secureLocalStorage from "react-secure-storage";


const SuccessPayment = ({orderId, order_id}) => {
  const pdfRef = useRef();
console.log(orderId);

  const { imgAssetsUrl } = useContext(UserContext);
  const cartDetails = useSelector((state) => state.cartReducer);

  // ==================
  // =======================
  const userId = secureLocalStorage.getItem("formData");

  const printReceipt = async (sectionId) => {
    const printContents = document.getElementById(sectionId).innerHTML;

    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.top = "-9999px";
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(
      `<html><head><title>SAMA - Invoice</title><style>
         @media print {
           @page {
             margin: 40px 40px; 
           }
           header, footer, .no-print {
             display: none;
           }
         
         }
       </style></head><body>${printContents}</body></html>`
    );
    iframeDoc.close();

    iframe.contentWindow.focus();
    iframe.contentWindow.print();

    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 100);
  };

  const productCartId = [];
  cartDetails?.forEach((item) => {
    productCartId.push(item?.id);
  });
  const jsonObject = {};
  productCartId?.forEach((value, index) => {
    jsonObject[index.toString()] = value;
  });


  const [displayMessage, setDisplayMessage] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDisplayMessage(true);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  const messageInfo =
    orderId?.msg === "success"
      ? "Your Order Is Confirmed"
      : "Your Order Is Failed";
  // ============ meta tag  =======================//

 

  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = `${imgAssetsUrl}/frontend/images/grayscalelogo.png`;
  };
  return (
    <>
      
      {orderId ? (
        <>
          <div id="print-section" style={{ display: "none" }}>
            <table
              className="order-main"
              border="0"
              width="100%"
              cellSpacing="0"
              cellPadding="0"
              align="left"
            >
              <tbody>
                <tr>
                  <td>
                    <table
                      className="order-width"
                      border="0"
                      width="850"
                      cellSpacing="0"
                      cellPadding="0"
                      align="center"
                    >
                      <tbody>
                        <tr>
                          <td>
                            <table
                              className="order-top-content"
                              border="0"
                              width="100%"
                              cellSpacing="0"
                              cellPadding="0"
                              align="center"
                            >
                              <tbody>
                                {/* <tr>
                                <td align="right">
                                  <Link
                                    style={{
                                      color: "#000",
                                      fontSize: "16px",
                                      fontFamily: "Montserrat, arial",
                                    }}
                                    href="javascript:void(0)"
                                  >
                                    Print Receipt
                                  </Link>
                                </td>
                              </tr> */}
                                <tr>
                                  <td height="15"></td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      fontFamily:
                                        "Sackers Gothic Light AT, arial",
                                      fontSize: "30px",
                                      letterSpacing: "0",
                                      lineHeight: "normal",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    {displayMessage && messageInfo}
                                  </td>
                                </tr>
                                <tr>
                                  <td height="15"></td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      fontFamily: "Montserrat",
                                      fontSize: "14px",
                                    }}
                                  >
                                    <b>Order #: {order_id}</b>
                                  </td>
                                </tr>
                                <tr>
                                  <td height="15"></td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      color: "#000",
                                      fontSize: "16px",
                                      lineHeight: "23px",
                                      fontFamily: "Montserrat, arial",
                                    }}
                                  >
                                    Thank you for choosing SAMA. A
                                    representative will contact you within 24
                                    hours to assist you with completing your
                                    purchase. Your order details will be emailed
                                    to you at{" "}
                                    {
                                      orderId?.order_details?.shipping_address
                                        ?.email
                                    }
                                    . Please note that your order will be
                                    processed only after payment has been made.
                                    If you have any questions, please call us at{" "}
                                    <Link href="tel:609-507-0003">
                                      609-507-0003
                                    </Link>
                                    .
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td className="space" height="20"></td>
                        </tr>
                        <tr>
                          <td>
                            <table
                              className="border-space"
                              bgcolor="#dbdbdb"
                              border="0"
                              width="100%"
                              cellSpacing="0"
                              cellPadding="0"
                              align="center"
                            >
                              <tbody>
                                <tr>
                                  <td height="1"></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td className="space" height="20"></td>
                        </tr>
                        <tr>
                          <td>
                            <table
                              className="order-inner-content"
                              border="0"
                              width="100%"
                              cellSpacing="0"
                              cellPadding="0"
                              align="center"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style={{
                                      fontFamily:
                                        "Sackers Gothic Light AT, arial",
                                      fontSize: "30px",
                                      letterSpacing: "0",
                                      lineHeight: "normal",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    Shipping Address
                                  </td>
                                </tr>
                                <tr>
                                  <td height="15"></td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      color: "#000",
                                      fontSize: "16px",
                                      lineHeight: "23px",
                                      fontFamily: "Montserrat, arial",
                                    }}
                                  >
                                    {
                                      orderId?.order_details?.shipping_address
                                        ?.first_name
                                    }{" "}
                                    {
                                      orderId?.order_details?.shipping_address
                                        ?.last_name
                                    }{" "}
                                    <br />
                                    {
                                      orderId?.order_details?.shipping_address
                                        ?.city
                                    }{" "}
                                    {
                                      orderId?.order_details?.shipping_address
                                        ?.country
                                    }{" "}
                                    <br />
                                    {
                                      orderId?.order_details?.shipping_address
                                        ?.email
                                    }{" "}
                                    <br />
                                    {
                                      orderId?.order_details?.shipping_address
                                        ?.phone
                                    }
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td className="space" height="20"></td>
                        </tr>
                        <tr>
                          <td>
                            <table
                              className="border-space"
                              bgcolor="#dbdbdb"
                              border="0"
                              width="100%"
                              cellSpacing="0"
                              cellPadding="0"
                              align="center"
                            >
                              <tbody>
                                <tr>
                                  <td height="1"></td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td className="space" height="20"></td>
                        </tr>
                        <tr>
                          <td>
                            <table
                              className="order-inner-content"
                              border="0"
                              width="100%"
                              cellSpacing="0"
                              cellPadding="0"
                              align="center"
                            >
                              <tbody>
                                <tr>
                                  <td
                                    style={{
                                      fontFamily:
                                        "Sackers Gothic Light AT, arial",
                                      fontSize: "30px",
                                      letterSpacing: "0",
                                      lineHeight: "normal",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    Order Details
                                  </td>
                                </tr>
                                <tr>
                                  <td height="15"></td>
                                </tr>
                                <tr>
                                  <td
                                    style={{
                                      color: "#000",
                                      fontSize: "16px",
                                      lineHeight: "23px",
                                      fontFamily: "Montserrat, arial",
                                    }}
                                  >
                                    Ordered on{" "}
                                    {orderId?.order_details?.order_date}. <br />
                                    Delivery date may vary based on receipt of
                                    payment.
                                    <br />
                                    Shipping and customs processing times vary
                                    based on location.
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>

                        {/* // Ring and diamond */}
                        {orderId?.data?.length > 0 &&
                          orderId?.data?.map((item, index) => {
                            let ring_details;
                            let diamond_details;
                            let gemstone_details;
                            let order_details;
                            if (item?.ring_detail) {
                              try {
                                ring_details = JSON.parse(item.ring_detail);
                                // Further processing of the parsed JSON data
                              } catch (error) {}
                            } else {
                            }
                            if (item?.diamond_detail) {
                              try {
                                diamond_details = JSON.parse(
                                  item.diamond_detail
                                );
                                // Further processing of the parsed JSON data
                              } catch (error) {}
                            } else {
                            }
                            if (item?.gemstone_detail) {
                              try {
                                gemstone_details = JSON.parse(
                                  item.gemstone_detail
                                );
                                // Further processing of the parsed JSON data
                              } catch (error) {}
                            } else {
                            }
                            if (item?.order_data) {
                              try {
                                order_details = JSON.parse(item.order_data);
                                // Further processing of the parsed JSON data
                              } catch (error) {}
                            } else {
                            }
                            if (
                              ring_details != null &&
                              diamond_details != null
                            ) {
                              return (
                                <>
                                  <tr>
                                    <td className="space" height="20"></td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <table
                                        className="border-space"
                                        width="100%"
                                        cellspacing="0"
                                        cellpadding="0"
                                        border="0"
                                        bgcolor="#dbdbdb"
                                        align="center"
                                      >
                                        <tr>
                                          <td height="1"></td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="space" height="20"></td>
                                  </tr>

                                  <tr key={index}>
                                    <td>
                                      <table
                                        className="order-product-main"
                                        border="0"
                                        width="100%"
                                        cellSpacing="0"
                                        cellPadding="0"
                                        align="center"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              valign="top"
                                              style={{
                                                width: "30%",
                                                paddingRight: "15px",
                                              }}
                                            >
                                              <table
                                                className="order-product-inner"
                                                border="0"
                                                width="100%"
                                                cellSpacing="0"
                                                cellPadding="0"
                                                align="center"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      className="order-pro-image"
                                                      valign="top"
                                                      style={{ width: "130px" }}
                                                    >
                                                      <img
                                                        width="auto"
                                                        height="auto"
                                                        onError={handleError}
                                                        src={
                                                          ring_details?.ring_image
                                                        }
                                                        alt={
                                                          ring_details?.ring_name
                                                        }
                                                        style={{
                                                          width: "100px",
                                                        }}
                                                      />
                                                    </td>
                                                    <td
                                                      className="order-pro-con"
                                                      style={{
                                                        color: "#000",
                                                        fontSize: "16px",
                                                        lineHeight: "23px",
                                                        fontFamily:
                                                          "Montserrat, arial",
                                                        width: "135px",
                                                      }}
                                                      valign="top"
                                                    >
                                                      {ring_details?.ring_name}
                                                      <br />
                                                      {ring_details?.ring_style}
                                                      <br />
                                                      Ring Size :{" "}
                                                      {ring_details?.ring_size}
                                                      <br />
                                                      {order_details.engraving &&
                                                        `Engraving: ${order_details.engraving}`}
                                                      <br />
                                                      {order_details.font &&
                                                        `Font: ${order_details.font}`}
                                                    </td>
                                                    <td
                                                      className="order-pro-con"
                                                      style={{
                                                        color: "#000",
                                                        fontSize: "16px",
                                                        lineHeight: "23px",
                                                        fontFamily:
                                                          "Montserrat, arial",
                                                        textAlign: "right",
                                                      }}
                                                      valign="top"
                                                    >
                                                      $
                                                      {Math.round(
                                                        ring_details?.ring_price
                                                      )}
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                            <td
                                              valign="top"
                                              style={{
                                                width: "30%",
                                                paddingLeft: "15px",
                                              }}
                                            >
                                              <table
                                                className="order-product-inner"
                                                border="0"
                                                width="100%"
                                                cellSpacing="0"
                                                cellPadding="0"
                                                align="center"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      className="order-pro-image"
                                                      valign="top"
                                                      style={{ width: "130px" }}
                                                    >
                                                      <img
                                                        width="auto"
                                                        height="auto"
                                                        onError={handleError}
                                                        style={{
                                                          width: "100px",
                                                        }}
                                                        src={
                                                          diamond_details?.diamond_image
                                                        }
                                                        alt={
                                                          diamond_details?.diamond_shape
                                                        }
                                                      />
                                                    </td>
                                                    <td
                                                      className="order-pro-con"
                                                      style={{
                                                        color: "#000",
                                                        fontSize: "16px",
                                                        lineHeight: "23px",
                                                        fontFamily:
                                                          "Montserrat, arial",
                                                      }}
                                                      valign="top"
                                                    >
                                                      {
                                                        diamond_details?.diamond_carat
                                                      }{" "}
                                                      Carat{" "}
                                                      {
                                                        diamond_details?.diamond_shape
                                                      }{" "}
                                                      Diamond
                                                      <br />
                                                      {
                                                        diamond_details?.diamond_cut
                                                      }{" "}
                                                      {diamond_details?.diamond_cut &&
                                                        `${diamond_details?.diamond_cut} Cut,`}{" "}
                                                      {
                                                        diamond_details?.diamond_color
                                                      }{" "}
                                                      Color,{" "}
                                                      {
                                                        diamond_details?.diamond_clarity
                                                      }{" "}
                                                      Clarity
                                                    </td>
                                                    <td
                                                      className="order-pro-con"
                                                      style={{
                                                        color: "#000",
                                                        fontSize: "16px",
                                                        lineHeight: "23px",
                                                        fontFamily:
                                                          "Montserrat, arial",
                                                        textAlign: "right",
                                                      }}
                                                      valign="top"
                                                    >
                                                      $
                                                      {Math.round(
                                                        diamond_details?.diamond_price
                                                      )}
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </>
                              );
                            }
                            if (
                              ring_details != null &&
                              gemstone_details != null
                            ) {
                              return (
                                <>
                                  <tr>
                                    <td className="space" height="20"></td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <table
                                        className="border-space"
                                        width="100%"
                                        cellspacing="0"
                                        cellpadding="0"
                                        border="0"
                                        bgcolor="#dbdbdb"
                                        align="center"
                                      >
                                        <tr>
                                          <td height="1"></td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="space" height="20"></td>
                                  </tr>

                                  <tr key={index}>
                                    <td>
                                      <table
                                        className="order-product-main"
                                        border="0"
                                        width="100%"
                                        cellSpacing="0"
                                        cellPadding="0"
                                        align="center"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              valign="top"
                                              style={{
                                                width: "30%",
                                                paddingRight: "15px",
                                              }}
                                            >
                                              <table
                                                className="order-product-inner"
                                                border="0"
                                                width="100%"
                                                cellSpacing="0"
                                                cellPadding="0"
                                                align="center"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      className="order-pro-image"
                                                      valign="top"
                                                      style={{ width: "130px" }}
                                                    >
                                                      <img
                                                        width="auto"
                                                        height="auto"
                                                        onError={handleError}
                                                        src={
                                                          ring_details?.ring_image
                                                        }
                                                        alt={
                                                          ring_details?.ring_name
                                                        }
                                                        style={{
                                                          width: "100px",
                                                        }}
                                                      />
                                                    </td>
                                                    <td
                                                      className="order-pro-con"
                                                      style={{
                                                        color: "#000",
                                                        fontSize: "16px",
                                                        lineHeight: "23px",
                                                        fontFamily:
                                                          "Montserrat, arial",
                                                      }}
                                                      valign="top"
                                                    >
                                                      {ring_details?.ring_name}
                                                      <br />
                                                      {ring_details?.ring_style}
                                                      <br />
                                                      Ring Size :{" "}
                                                      {ring_details?.ring_size}
                                                      <br />
                                                      {order_details.engraving &&
                                                        `Engraving: ${order_details.engraving}`}
                                                      <br />
                                                      {order_details.font &&
                                                        `Font: ${order_details.font}`}
                                                    </td>
                                                    <td
                                                      className="order-pro-con"
                                                      style={{
                                                        color: "#000",
                                                        fontSize: "16px",
                                                        lineHeight: "23px",
                                                        fontFamily:
                                                          "Montserrat, arial",
                                                        textAlign: "right",
                                                      }}
                                                      valign="top"
                                                    >
                                                      $
                                                      {Math.round(
                                                        ring_details?.ring_price
                                                      )}
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                            <td
                                              valign="top"
                                              style={{
                                                width: "30%",
                                                paddingLeft: "15px",
                                              }}
                                            >
                                              <table
                                                className="order-product-inner"
                                                border="0"
                                                width="100%"
                                                cellSpacing="0"
                                                cellPadding="0"
                                                align="center"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      className="order-pro-image"
                                                      valign="top"
                                                      style={{ width: "130px" }}
                                                    >
                                                      <img
                                                        width="auto"
                                                        height="auto"
                                                        onError={handleError}
                                                        style={{
                                                          width: "100px",
                                                        }}
                                                        src={
                                                          gemstone_details?.gemstone_image
                                                        }
                                                        alt={
                                                          gemstone_details?.gemstone_name
                                                        }
                                                      />
                                                    </td>
                                                    <td
                                                      className="order-pro-con"
                                                      style={{
                                                        color: "#000",
                                                        fontSize: "16px",
                                                        lineHeight: "23px",
                                                        fontFamily:
                                                          "Montserrat, arial",
                                                      }}
                                                      valign="top"
                                                    >
                                                      {
                                                        gemstone_details?.gemstone_name
                                                      }
                                                    </td>
                                                    <td
                                                      className="order-pro-con"
                                                      style={{
                                                        color: "#000",
                                                        fontSize: "16px",
                                                        lineHeight: "23px",
                                                        fontFamily:
                                                          "Montserrat, arial",
                                                        textAlign: "right",
                                                      }}
                                                      valign="top"
                                                    >
                                                      $
                                                      {Math.round(
                                                        gemstone_details?.gemstone_price
                                                      )}
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </>
                              );
                            }
                            if (
                              diamond_details != null &&
                              ring_details == null &&
                              gemstone_details == null
                            ) {
                              return (
                                <>
                                  <tr>
                                    <td className="space" height="20"></td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <table
                                        className="border-space"
                                        width="100%"
                                        cellspacing="0"
                                        cellpadding="0"
                                        border="0"
                                        bgcolor="#dbdbdb"
                                        align="center"
                                      >
                                        <tr>
                                          <td height="1"></td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="space" height="20"></td>
                                  </tr>
                                  <tr key={index}>
                                    <td>
                                      <table
                                        className="order-product-main"
                                        border="0"
                                        width="100%"
                                        cellSpacing="0"
                                        cellPadding="0"
                                        align="center"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              valign="top"
                                              style={{
                                                width: "30%",
                                                paddingRight: "15px",
                                              }}
                                            >
                                              <table
                                                className="order-product-inner"
                                                border="0"
                                                width="100%"
                                                cellSpacing="0"
                                                cellPadding="0"
                                                align="center"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      className="order-pro-image"
                                                      valign="top"
                                                      style={{ width: "130px" }}
                                                    >
                                                      <img
                                                        width="auto"
                                                        height="auto"
                                                        onError={handleError}
                                                        src={
                                                          diamond_details?.diamond_image
                                                        }
                                                        alt={
                                                          diamond_details?.diamond_name
                                                        }
                                                        style={{
                                                          width: "100px",
                                                        }}
                                                      />
                                                    </td>
                                                    <td
                                                      className="order-pro-con"
                                                      style={{
                                                        color: "#000",
                                                        fontSize: "16px",
                                                        lineHeight: "23px",
                                                        fontFamily:
                                                          "Montserrat, arial",
                                                      }}
                                                      valign="top"
                                                    >
                                                      {
                                                        diamond_details?.diamond_carat
                                                      }{" "}
                                                      Carat{" "}
                                                      {
                                                        diamond_details?.diamond_shape
                                                      }{" "}
                                                      Diamond
                                                      <br />
                                                      {
                                                        diamond_details?.diamond_cut
                                                      }{" "}
                                                      {diamond_details?.diamond_cut &&
                                                        `${diamond_details?.diamond_cut} Cut,`}{" "}
                                                      {
                                                        diamond_details?.diamond_color
                                                      }{" "}
                                                      Color,{" "}
                                                      {
                                                        diamond_details?.diamond_clarity
                                                      }{" "}
                                                      Clarity
                                                    </td>
                                                    <br />

                                                    <br />
                                                    <td
                                                      className="order-pro-con"
                                                      style={{
                                                        color: "#000",
                                                        fontSize: "16px",
                                                        lineHeight: "23px",
                                                        fontFamily:
                                                          "Montserrat, arial",
                                                        textAlign: "right",
                                                      }}
                                                      valign="top"
                                                    >
                                                      $
                                                      {Math.round(
                                                        diamond_details?.diamond_price
                                                      )}
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                            <td
                                              valign="top"
                                              style={{
                                                width: "30%",
                                                paddingLeft: "15px",
                                              }}
                                            ></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </>
                              );
                            }
                            if (
                              gemstone_details != null &&
                              ring_details == null &&
                              diamond_details == null
                            ) {
                              return (
                                <>
                                  <tr>
                                    <td className="space" height="20"></td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <table
                                        className="border-space"
                                        width="100%"
                                        cellspacing="0"
                                        cellpadding="0"
                                        border="0"
                                        bgcolor="#dbdbdb"
                                        align="center"
                                      >
                                        <tr>
                                          <td height="1"></td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="space" height="20"></td>
                                  </tr>
                                  <tr key={index}>
                                    <td>
                                      <table
                                        className="order-product-main"
                                        border="0"
                                        width="100%"
                                        cellSpacing="0"
                                        cellPadding="0"
                                        align="center"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              valign="top"
                                              style={{
                                                width: "30%",
                                                paddingRight: "15px",
                                              }}
                                            >
                                              <table
                                                className="order-product-inner"
                                                border="0"
                                                width="100%"
                                                cellSpacing="0"
                                                cellPadding="0"
                                                align="center"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      className="order-pro-image"
                                                      valign="top"
                                                      style={{ width: "130px" }}
                                                    >
                                                      <img
                                                        width="auto"
                                                        height="auto"
                                                        onError={handleError}
                                                        style={{
                                                          width: "100px",
                                                        }}
                                                        src={
                                                          gemstone_details?.gemstone_image
                                                        }
                                                        alt={
                                                          gemstone_details?.gemstone_shape
                                                        }
                                                      />
                                                    </td>
                                                    <td
                                                      className="order-pro-con"
                                                      style={{
                                                        color: "#000",
                                                        fontSize: "16px",
                                                        lineHeight: "23px",
                                                        fontFamily:
                                                          "Montserrat, arial",
                                                      }}
                                                      valign="top"
                                                    >
                                                      {
                                                        gemstone_details?.gemstone_name
                                                      }
                                                    </td>
                                                    <td
                                                      className="order-pro-con"
                                                      style={{
                                                        color: "#000",
                                                        fontSize: "16px",
                                                        lineHeight: "23px",
                                                        fontFamily:
                                                          "Montserrat, arial",
                                                        textAlign: "right",
                                                      }}
                                                      valign="top"
                                                    >
                                                      $
                                                      {Math.round(
                                                        gemstone_details?.gemstone_price
                                                      )}
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                            <td
                                              valign="top"
                                              style={{
                                                width: "30%",
                                                paddingLeft: "15px",
                                              }}
                                            ></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>{" "}
                                </>
                              );
                            }
                            if (
                              ring_details != null &&
                              diamond_details == null &&
                              gemstone_details == null
                            ) {
                              return (
                                <>
                                  <tr>
                                    <td className="space" height="20"></td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <table
                                        className="border-space"
                                        width="100%"
                                        cellspacing="0"
                                        cellpadding="0"
                                        border="0"
                                        bgcolor="#dbdbdb"
                                        align="center"
                                      >
                                        <tr>
                                          <td height="1"></td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="space" height="20"></td>
                                  </tr>
                                  <tr key={index}>
                                    <td>
                                      <table
                                        className="order-product-main"
                                        border="0"
                                        width="100%"
                                        cellSpacing="0"
                                        cellPadding="0"
                                        align="center"
                                      >
                                        <tbody>
                                          <tr>
                                            <td
                                              valign="top"
                                              style={{
                                                width: "30%",
                                                paddingRight: "15px",
                                              }}
                                            >
                                              <table
                                                className="order-product-inner"
                                                border="0"
                                                width="100%"
                                                cellSpacing="0"
                                                cellPadding="0"
                                                align="center"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      className="order-pro-image"
                                                      valign="top"
                                                      style={{ width: "130px" }}
                                                    >
                                                      <img
                                                        width="auto"
                                                        height="auto"
                                                        onError={handleError}
                                                        src={
                                                          ring_details?.ring_image
                                                        }
                                                        alt={
                                                          ring_details?.ring_name
                                                        }
                                                        style={{
                                                          width: "100px",
                                                        }}
                                                      />
                                                    </td>
                                                    <td
                                                      className="order-pro-con"
                                                      style={{
                                                        color: "#000",
                                                        fontSize: "16px",
                                                        lineHeight: "23px",
                                                        fontFamily:
                                                          "Montserrat, arial",
                                                      }}
                                                      valign="top"
                                                    >
                                                      {ring_details?.ring_name}
                                                      <br />
                                                      {ring_details?.ring_style}
                                                      <br />
                                                      {order_details.engraving &&
                                                        `Engraving: ${order_details.engraving}`}
                                                      <br />
                                                      {order_details.font &&
                                                        `Font: ${order_details.font}`}
                                                    </td>

                                                    {/* <td
                                                  className="order-pro-con"
                                                  style={{
                                                    color: "#000",
                                                    fontSize: "16px",
                                                    lineHeight: "23px",
                                                    fontFamily:
                                                      "Montserrat, arial",
                                                  }}
                                                  valign="top"
                                                >
                                                  Ring Size :{" "}
                                                  {ring_details?.ring_size}
                                                </td> */}
                                                    <td
                                                      className="order-pro-con"
                                                      style={{
                                                        color: "#000",
                                                        fontSize: "16px",
                                                        lineHeight: "23px",
                                                        fontFamily:
                                                          "Montserrat, arial",
                                                        textAlign: "right",
                                                      }}
                                                      valign="top"
                                                    >
                                                      $
                                                      {Math.round(
                                                        ring_details?.ring_price
                                                      )}
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                            <td
                                              valign="top"
                                              style={{
                                                width: "30%",
                                                paddingLeft: "15px",
                                              }}
                                            ></td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>{" "}
                                </>
                              );
                            }
                          })}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
              <tr>
                <td>
                  <table
                    class="total-main"
                    border="0"
                    width="100%"
                    cellspacing="0"
                    cellpadding="0"
                    align="right"
                  >
                    <tr>
                      <td class="space" height="30"></td>
                    </tr>

                    <tr>
                      <td>
                        <table
                          class="total-inner"
                          border="0"
                          width="600"
                          cellspacing="0"
                          cellpadding="0"
                          align="right"
                        >
                          <tr>
                            <td
                              style={{
                                fontFamily: `Montserrat, arial`,
                                fontWeight: `500`,
                                fontSize: `16px`,
                                color: `#000`,
                              }}
                            >
                              Subtotal :
                            </td>
                            <td
                              style={{
                                fontFamily: `Montserrat, arial`,
                                fontWeight: `normal`,
                                fontSize: `16px`,
                                color: `#000`,
                              }}
                            >
                              $
                              {Math.round(orderId?.order_details?.total_amount)}
                            </td>
                          </tr>
                          <tr>
                            <td height="10"></td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                fontFamily: `Montserrat, arial`,
                                fontWeight: `500`,
                                fontSize: `16px`,
                                color: `#000`,
                              }}
                            >
                              Shipping Fees :
                            </td>
                            <td
                              style={{
                                fontFamily: `Montserrat, arial`,
                                fontWeight: `normal`,
                                fontSize: `16px`,
                                color: `#000`,
                              }}
                            >
                              ${Math.round(orderId?.order_details?.shipping)}
                            </td>
                          </tr>
                          <tr>
                            <td height="10"></td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                fontFamily: `Montserrat, arial`,
                                fontWeight: `500`,
                                fontSize: `16px`,
                                color: `#000`,
                              }}
                            >
                              Sales TAX est :
                            </td>
                            <td
                              style={{
                                fontFamily: `Montserrat, arial`,
                                fontWeight: `normal`,
                                fontSize: `16px`,
                                color: `#000`,
                              }}
                            >
                              ${Math.round(orderId?.order_details?.tax)}
                            </td>
                          </tr>
                          <tr>
                            <td height="10"></td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                fontFamily: `Montserrat, arial`,
                                fontWeight: `700`,
                                fontSize: `16px`,
                                color: `#000`,
                              }}
                            >
                              Total Price :
                            </td>
                            <td
                              style={{
                                fontFamily: `Montserrat, arial`,
                                fontWeight: `700`,
                                fontSize: `16px`,
                                color: `#000`,
                              }}
                            >
                              $
                              {Math.round(
                                orderId?.order_details?.payment_amount
                              )}
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <tr>
                      <td class="space" height="20"></td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
          <div
            className="shoping-car-page data-base-cart success-page-order"
            ref={pdfRef}
          >
            <div className="container container-1135-list-pages">
              <div className="success-order">
                <div className="success-order-left">
                  <div className="order-confirmed">
                    <h3 className="confirmation">
                      {displayMessage && messageInfo}
                    </h3>
                    <h5 className="orderId-confirm">Order #: {order_id}</h5>
                    <p className="order-para-confirmed">
                      Thank you for choosing SAMA. A representative will contact
                      you within 24 hours to assist you with completing your
                      purchase. Your order details will be emailed to you at{" "}
                      {orderId?.order_details?.shipping_address?.email}. Please
                      note that your order will be processed only after payment
                      has been made. If you have any questions, please call us
                      at <Link href="tel:609-507-0003"> 609-507-0003</Link>.
                    </p>
                  </div>
                  <hr />
                  {(
                    <div className="shipping-address-payment">
                      <div className="shipping-address-left">
                        <h2>Shipping Address</h2>

                        <p className="user-information-order">
                          {orderId?.order_details?.shipping_address?.first_name}{" "}
                          {orderId?.order_details?.shipping_address?.last_name}{" "}
                          <br />
                          {orderId?.order_details?.shipping_address?.city}{" "}
                          {orderId?.order_details?.shipping_address?.country}{" "}
                          <br />
                          {orderId?.order_details?.shipping_address?.email}{" "}
                          <br />
                          {orderId?.order_details?.shipping_address?.phone}
                        </p>
                      </div>
                    </div>
                  )}

                  <hr />
                  <div className="payment-order-details">
                    <h3 className="order-details-heading">Order Details</h3>
                    <p className="order-details-ship">
                      Ordered on {orderId?.order_details?.order_date}. <br />
                      Delivery date may vary based on receipt of payment. <br />
                      Shipping and customs processing times vary based on
                      location.
                    </p>
                  </div>
                  {(
                    orderId?.data?.length > 0 &&
                    orderId?.data?.map((item) => {
                      let ring_details;
                      let diamond_details;
                      let gemstone_details;
                      let order_details;
                      if (item?.ring_detail) {
                        try {
                          ring_details = JSON.parse(item.ring_detail);
                          // Further processing of the parsed JSON data
                        } catch (error) {}
                      } else {
                      }
                      if (item?.diamond_detail) {
                        try {
                          diamond_details = JSON.parse(item.diamond_detail);
                          // Further processing of the parsed JSON data
                        } catch (error) {}
                      } else {
                      }
                      if (item?.gemstone_detail) {
                        try {
                          gemstone_details = JSON.parse(item.gemstone_detail);
                          // Further processing of the parsed JSON data
                        } catch (error) {}
                      } else {
                      }
                      if (item?.order_data) {
                        try {
                          order_details = JSON.parse(item.order_data);
                          // Further processing of the parsed JSON data
                        } catch (error) {}
                      } else {
                      }
                      // Ring and diamond
                      if (ring_details != null && diamond_details != null) {
                        return (
                          <>
                            <div className="shop-card-inner diamond-ring ">
                              <div className="product-pic ring-only">
                                <div className="diamond-ring-img-text">
                                  <ul className="product-list">
                                    <img
                                      width="auto"
                                      height="auto"
                                      onError={handleError}
                                      src={ring_details?.ring_image}
                                      alt={ring_details?.ring_name}
                                    />
                                  </ul>
                                </div>
                                <div className="product-info-inner">
                                  <div className="product-info-left">
                                    <h2>
                                      <p className="td-n2">
                                        {ring_details?.ring_name}
                                      </p>
                                    </h2>

                                    <div className="ir245-muted">
                                      <div className="code">
                                        {ring_details?.ring_style}
                                      </div>
                                    </div>
                                    {order_details.engraving && (
                                      <div className="ir245-muted">
                                        <div className="code">
                                          Engraving: {order_details?.engraving}
                                        </div>
                                      </div>
                                    )}
                                    {order_details.font && (
                                      <div className="ir245-muted">
                                        <div className="code">
                                          Font: {order_details?.font}
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  <div className="ring-size">
                                    <span>Ring Size : </span>{" "}
                                    <span>{ring_details?.ring_size}</span>
                                  </div>
                                </div>
                                <div className="product-ring-price">
                                  <span
                                    style={{ whiteSpace: "nowrap" }}
                                    id="prodcut_price_17566554"
                                  >
                                    ${Math.round(ring_details?.ring_price)}
                                  </span>
                                </div>
                              </div>

                              <div className="product-info diamond-only">
                                <div className="checkout-name-description">
                                  <div className="diamond-text-img">
                                    <img
                                      width="auto"
                                      height="auto"
                                      onError={handleError}
                                      src={diamond_details?.diamond_image}
                                      alt={diamond_details?.diamond_shape}
                                    />
                                  </div>
                                  <div className="checkout-left-des diamond-name">
                                    <p>
                                      {diamond_details?.diamond_carat}{" "}
                                      {diamond_details?.diamond_shape} Diamond
                                    </p>
                                    <p className="small-text">
                                      {diamond_details?.diamond_cut &&
                                        `${diamond_details?.diamond_cut} Cut,`}{" "}
                                      {diamond_details?.diamond_color} Color,{" "}
                                      {diamond_details?.diamond_clarity} Clarity
                                    </p>
                                  </div>
                                  <div className="checkout-right-price diamond-price product-ring-price">
                                    <span
                                      id="prodcut_price_17566554"
                                      style={{ whiteSpace: "nowrap" }}
                                    >
                                      $
                                      {Math.round(
                                        diamond_details?.diamond_price
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      }
                      // Ring and gemstone
                      if (ring_details != null && gemstone_details != null) {
                        return (
                          <>
                            <div className="ring-gemstone-description shop-card-inner gemstone">
                              <div className="product-pic ring-only">
                                <div className="diamond-ring-img-text">
                                  <ul className="product-list">
                                    <img
                                      width="auto"
                                      height="auto"
                                      onError={handleError}
                                      src={ring_details?.ring_image}
                                      alt={ring_details?.ring_name}
                                    />
                                  </ul>
                                </div>
                                <div className="product-info-inner">
                                  <div className="product-info-left">
                                    <h2>
                                      <p className="td-n2">
                                        {ring_details?.ring_name}
                                      </p>
                                    </h2>

                                    <div className="ir245-muted">
                                      <div className="code">
                                        {ring_details?.ring_style}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="ring-size">
                                    <span>Ring Size : </span>{" "}
                                    <span>{ring_details?.ring_size}</span>
                                  </div>
                                  {order_details.engraving && (
                                    <div className="ir245-muted">
                                      <div className="code">
                                        Engraving: {order_details?.engraving}
                                      </div>
                                    </div>
                                  )}
                                  {order_details.font && (
                                    <div className="ir245-muted">
                                      <div className="code">
                                        Font: {order_details?.font}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <div className="product-ring-price">
                                  <span
                                    style={{ whiteSpace: "nowrap" }}
                                    id="prodcut_price_17566554"
                                  >
                                    ${Math.round(ring_details?.ring_price)}
                                  </span>
                                </div>
                              </div>
                              <div className="product-info gemstone-only">
                                <div className="gemstone-cart">
                                  <div className="gemstone-img-text">
                                    <img
                                      width="auto"
                                      height="auto"
                                      onError={handleError}
                                      src={gemstone_details?.gemstone_image}
                                      alt={gemstone_details?.gemstone_name}
                                    />
                                  </div>

                                  <div className="gemstone-name">
                                    <p>{gemstone_details?.gemstone_name}</p>
                                  </div>
                                  <div className="product-right-price">
                                    <span
                                      id="prodcut_price_17566554"
                                      style={{ whiteSpace: "nowrap" }}
                                    >
                                      $
                                      {Math.round(
                                        gemstone_details?.gemstone_price
                                      )}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      }
                      // Only diamond
                      if (
                        diamond_details != null &&
                        ring_details == null &&
                        gemstone_details == null
                      ) {
                        return (
                          <div className="product-info diamond-only">
                            <div className="checkout-name-description">
                              <div className="diamond-text-img">
                                <img
                                  width="auto"
                                  height="auto"
                                  onError={handleError}
                                  src={diamond_details?.diamond_image}
                                  alt={diamond_details?.diamond_shape}
                                />
                              </div>
                              <div className="checkout-left-des diamond-name">
                                <p>
                                  {diamond_details?.diamond_carat}{" "}
                                  {diamond_details?.diamond_shape} Diamond
                                </p>
                                <p className="small-text">
                                  {diamond_details?.diamond_cut &&
                                    `${diamond_details?.diamond_cut} Cut,`}{" "}
                                  {diamond_details?.diamond_color} Color,{" "}
                                  {diamond_details?.diamond_clarity} Clarity
                                </p>
                              </div>
                              <div className="checkout-right-price diamond-price product-ring-price">
                                <span
                                  id="prodcut_price_17566554"
                                  style={{ whiteSpace: "nowrap" }}
                                >
                                  ${Math.round(diamond_details?.diamond_price)}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      // Only gemstone
                      if (
                        gemstone_details != null &&
                        ring_details == null &&
                        diamond_details == null
                      ) {
                        return (
                          <div className="product-info gemstone-only">
                            <div className="gemstone-cart">
                              <div className="gemstone-img-text single-gemstone">
                                <img
                                  width="auto"
                                  height="auto"
                                  onError={handleError}
                                  src={gemstone_details?.gemstone_image}
                                  alt={gemstone_details?.gemstone_name}
                                />
                              </div>

                              <div className="gemstone-name">
                                <p>{gemstone_details?.gemstone_name}</p>
                              </div>
                              <div className="product-right-price">
                                <span
                                  id="prodcut_price_17566554"
                                  style={{ whiteSpace: "nowrap" }}
                                >
                                  $
                                  {Math.round(gemstone_details?.gemstone_price)}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      //only matching_set
                      if (
                        ring_details != null &&
                        diamond_details == null &&
                        gemstone_details == null
                      ) {
                        return (
                          <div className="shop-card-inner diamond-ring ">
                            <div className="product-pic ring-only">
                              <div className="diamond-ring-img-text">
                                <ul className="product-list">
                                  <img
                                    width="auto"
                                    height="auto"
                                    onError={handleError}
                                    src={ring_details?.ring_image}
                                    alt={ring_details?.ring_name}
                                  />
                                </ul>
                              </div>
                              <div className="product-info-inner">
                                <div className="product-info-left">
                                  <h2>
                                    <p className="td-n2">
                                      {ring_details?.ring_name}
                                    </p>
                                  </h2>

                                  <div className="ir245-muted">
                                    <div className="code">
                                      {ring_details?.ring_style}
                                    </div>
                                  </div>
                                  {order_details.engraving && (
                                    <div className="ir245-muted">
                                      <div className="code">
                                        Engraving: {order_details?.engraving}
                                      </div>
                                    </div>
                                  )}
                                  {order_details.font && (
                                    <div className="ir245-muted">
                                      <div className="code">
                                        Font: {order_details?.font}
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* <div className="ring-size">
                                <span>Ring Size : </span>{" "}
                                <span>{ring_details?.ring_size}</span>
                              </div> */}
                              </div>
                              <div className="product-ring-price">
                                <span
                                  style={{ whiteSpace: "nowrap" }}
                                  id="prodcut_price_17566554"
                                >
                                  ${Math.round(ring_details?.ring_price)}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })
                  )}

                  {/* Item Total */}
                  {orderId?.order_details && (
                    <div className="order-details-description success-payment-details">
                      <div className="order-details-column"></div>
                      <div className="right-des-order">
                        <div className="order-items-right">
                          <div className="fore2" data-title=""></div>
                          <div className="fore3"></div>
                          <div className="fore4 hidden-xs">Subtotal</div>
                          <div className="fore5 hidden-xs">
                            ${Math.round(orderId?.order_details?.total_amount)}
                          </div>
                        </div>

                        <div className="order-items-right">
                          <div className="fore2" data-title=""></div>
                          <div className="fore3"></div>
                          <div className="fore4 hidden-xs">Shipping Fees</div>
                          <div className="fore5 hidden-xs">
                            ${Math.round(orderId?.order_details?.shipping)}
                          </div>
                        </div>
                        <div className="order-items-right">
                          <div className="fore2" data-title=""></div>
                          <div className="fore3"></div>
                          <div className="fore4 hidden-xs">Sales TAX est</div>
                          <div className="fore5 hidden-xs">
                            ${Math.round(orderId?.order_details?.tax)}
                          </div>
                        </div>

                        <div className="order-items-right">
                          <div className="fore2" data-title=""></div>
                          <div className="fore3"></div>
                          <div className="fore4 hidden-xs">
                            <b>Total</b>
                          </div>
                          <div className="fore5 hidden-xs">
                            $
                            {Math.round(orderId?.order_details?.payment_amount)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="refer-friend-box">
                    <h5>Give $100, Get $100</h5>
                    <p className="refer-friend-para">
                      Treat your friends to $100 and receive $100 towards your
                      next purchase when they spend $1,000 or more.
                    </p>
                    <Link href="javascript:void(0);">Refer a Friend</Link>
                  </div>
                </div>
                <div className="success-order-right">
                  {displayMessage && (
                    <Link
                      href="javascript:void(0)"
                      onClick={() => printReceipt("print-section")}
                    >
                      Print Receipt
                    </Link>
                  )}
                </div>
              </div>

              {/* =========== */}
              <ContinueShoping />
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};
export default SuccessPayment