import React, { useContext, useEffect, useState } from "react";
import { BsChat } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import Popup from "reactjs-popup";
import { format } from "date-fns";
import axios from "axios";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import secureLocalStorage from "react-secure-storage";
import { UserContext } from "../context/UserContext";
import LoaderSpinner from "./LoaderSpinner";
import Link from "next/link";

export const OrdersHistoryDashboard = ({ showOrderId, setShowOrderId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [orderId, setOrderId] = useState();
  const [loading, setLoading] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const { baseUrl } = useContext(UserContext);
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("email-popup-open");
    } else {
      document.body.classList.remove("email-popup-open");
    }
  }, [isOpen]);
  const togglePopup = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle("email-popup-open", isOpen);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/order-detail?order_id=${showOrderId}`)
      .then((res) => {
        setOrderId(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        console.log("Order details api not working");
      });
  }, [showOrderId]);

  const user_id = secureLocalStorage.getItem("formData");

  useEffect(() => {
    axios
      .get(`${baseUrl}/order-history?user_id=${user_id}&page=${currentPage}`)
      .then((res) => {
        setShowOrderHistory(res.data);
      })
      .catch(() => {
        console.log("Order details api not working");
      });
  }, [user_id, currentPage]);

  return (
    <>
      <div className="account-right-data">
        <div className="order-hisotry-main">
          {showOrderHistory?.data?.data?.length > 0 ? (
            <div className="order-history-upper-main">
              <div className="orders-history-dashboard">
                <h3 className="orders-heading-history">Order History</h3>
                <p>
                  Thank you for choosing SAMA! Your order history details are
                  below.
                </p>
                <div className="table-ring-chart">
                  <table className="orders-history-table">
                    <tr>
                      <th>Order Date</th>
                      <th>Order Id</th>
                      <th>Order Status</th>
                    </tr>
                    {showOrderHistory?.data?.data?.length > 0 &&
                      showOrderHistory?.data?.data?.map((item) => {
                        const createdAt = new Date(item.created_at);
                        const formattedDate = format(createdAt, "MM/dd/yyyy");
                        return (
                          <tr
                            onClick={() =>
                              setShowOrderId((prevState) =>
                                item.order_id === prevState
                                  ? null
                                  : item.order_id
                              )
                            }
                            className={
                              showOrderId === item.order_id && "active"
                            }
                          >
                            <td>{formattedDate}</td>
                            <td>{item.order_id}</td>
                            <td>{item.status}</td>
                          </tr>
                        );
                      })}
                  </table>
                </div>
                {showOrderHistory?.total_page > 1 && (
                  <ResponsivePagination
                    total={showOrderHistory?.total_page}
                    current={currentPage}
                    onPageChange={setCurrentPage}
                    maxWidth={400}
                  />
                )}
              </div>

              {loading ? (
                <LoaderSpinner />
              ) : (
                orderId?.data?.length > 0 &&
                showOrderId == orderId?.order_details?.order_id && (
                  <div className="order-history">
                    <h3>Order #{orderId?.order_details?.order_id}</h3>
                    <ul class="order-thead">
                      <li>Placed On: {orderId?.order_details?.order_date}</li>
                      <li>
                        Order Status: {orderId?.order_details?.order_status}
                      </li>
                    </ul>
                    {orderId?.data?.length > 0 &&
                      orderId?.data?.map((item) => {
                        let ring_details;
                        let diamond_details;
                        let gemstone_details;
                        let order_details;
                        if (item?.ring_detail) {
                          try {
                            ring_details = JSON.parse(item.ring_detail);
                          } catch (error) {
                            console.error("Error parsing JSON:", error);
                          }
                        } else {
                         
                        }
                        if (item?.diamond_detail) {
                          try {
                            diamond_details = JSON.parse(item.diamond_detail);
                          } catch (error) {
                            console.error("Error parsing JSON:", error);
                          }
                        } else {
                          
                        }
                        if (item?.gemstone_detail) {
                          try {
                            gemstone_details = JSON.parse(item.gemstone_detail);
                          } catch (error) {
                            console.error("Error parsing JSON:", error);
                          }
                        } else {
                         
                        }
                        if (item?.order_data) {
                          try {
                            order_details = JSON.parse(item.order_data);
                          } catch (error) {
                            console.error("Error parsing JSON:", error);
                          }
                        } else {
                         
                        }
                        // Ring and diamond
                        if (ring_details != null && diamond_details != null) {
                          return (
                            <>
                              <div className="ring-gemstone-description">
                                <div className="order-details-description">
                                  <div className="order-details-column">
                                    <LazyLoadImage
                                      width="auto"
                                      height="auto"
                                      src={ring_details?.ring_image}
                                      alt={ring_details?.ring_name}
                                    />
                                  </div>
                                  <div className="right-des-order">
                                    <div className="order-items-right">
                                      <div className="fore2" data-title="">
                                        {" "}
                                        Stock Number:
                                      </div>
                                      <div className="fore3">
                                        {ring_details?.ring_style}
                                      </div>
                                      <div className="fore4 hidden-xs">
                                        Price:
                                      </div>
                                      <div className="fore5 hidden-xs">
                                        ${Math.round(ring_details?.ring_price)}
                                      </div>
                                    </div>
                                    <div className="order-items-right">
                                      <div className="fore2" data-title="">
                                        {" "}
                                        Description:{" "}
                                      </div>
                                      <div className="fore3">
                                        {ring_details?.ring_name}
                                      </div>
                                      <div className="fore2" data-title="">
                                        {" "}
                                        Ring Size:{" "}
                                      </div>
                                      <div className="fore3">
                                        {ring_details?.ring_size}
                                      </div>
                                      
                                    </div>
                                    <div className="order-items-right">
                                      {order_details.engraving && (
                                        <>
                                          <div className="fore2" data-title="">
                                            {" "}
                                            Engraving:{" "}
                                          </div>
                                          <div className="fore3">
                                            {order_details?.engraving}
                                          </div>
                                        </>
                                      )}
                                      {order_details.font && (
                                        <>
                                          <div className="fore2" data-title="">
                                            {" "}
                                            Font:{" "}
                                          </div>
                                          <div className="fore3">
                                            {order_details?.font}
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="order-details-description">
                                  <div className="order-details-column">
                                    <LazyLoadImage
                                      width="auto"
                                      height="auto"
                                      src={diamond_details?.diamond_image}
                                      alt={diamond_details?.diamond_shape}
                                    />
                                  </div>
                                  <div className="right-des-order">
                                    <div className="order-items-right">
                                      <div className="fore2" data-title="">
                                        {" "}
                                        Stock Number:
                                      </div>
                                      <div className="fore3">
                                        {diamond_details?.stock_number}
                                      </div>
                                      <div className="fore4 hidden-xs">
                                        Price:
                                      </div>
                                      <div className="fore5 hidden-xs">
                                        $
                                        {Math.round(
                                          diamond_details?.diamond_price
                                        )}
                                      </div>
                                    </div>
                                    <div className="order-items-right">
                                      <div className="fore2" data-title="">
                                        {" "}
                                        Description:{" "}
                                      </div>
                                      <div className="fore3">
                                        {diamond_details?.diamond_carat}{" "}
                                        {diamond_details?.diamond_shape} Diamond
                                      </div>
                                      <div
                                        className="fore2"
                                        data-title=""
                                      ></div>
                                      <div className="fore3"></div>
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
                              <div className="ring-gemstone-description">
                                <div className="order-details-description">
                                  <div className="order-details-column">
                                    <LazyLoadImage
                                      width="auto"
                                      height="auto"
                                      src={ring_details?.ring_image}
                                      alt={ring_details?.ring_name}
                                    />
                                  </div>
                                  <div className="right-des-order">
                                    <div className="order-items-right">
                                      <div className="fore2" data-title="">
                                        {" "}
                                        Stock Number:
                                      </div>
                                      <div className="fore3">
                                        {ring_details?.ring_style}
                                      </div>
                                      <div className="fore4 hidden-xs">
                                        Price:
                                      </div>
                                      <div className="fore5 hidden-xs">
                                        ${Math.round(ring_details?.ring_price)}
                                      </div>
                                    </div>
                                    <div className="order-items-right">
                                      <div className="fore2" data-title="">
                                        {" "}
                                        Description:{" "}
                                      </div>
                                      <div className="fore3">
                                        {ring_details?.ring_name}
                                      </div>
                                      <div className="fore2" data-title="">
                                        {" "}
                                        Ring Size:{" "}
                                      </div>
                                      <div className="fore3">
                                        {ring_details?.ring_size}
                                      </div>
                                      
                                    </div>
                                    <div className="order-items-right">
                                      {order_details.engraving && (
                                        <>
                                          <div className="fore2" data-title="">
                                            {" "}
                                            Engraving:{" "}
                                          </div>
                                          <div className="fore3">
                                            {order_details?.engraving}
                                          </div>
                                        </>
                                      )}
                                      {order_details.font && (
                                        <>
                                          <div className="fore2" data-title="">
                                            {" "}
                                            Font:{" "}
                                          </div>
                                          <div className="fore3">
                                            {order_details?.font}
                                          </div>
                                        </>
                                      )}
                                    </div>

                                  </div>
                                </div>
                                <div className="order-details-description">
                                  <div className="order-details-column">
                                    <LazyLoadImage
                                      width="auto"
                                      height="auto"
                                      src={gemstone_details?.gemstone_image}
                                      alt={gemstone_details?.gemstone_name}
                                    />
                                  </div>
                                  <div className="right-des-order">
                                    <div className="order-items-right">
                                      <div className="fore2" data-title="">
                                        {" "}
                                        Stock Number:
                                      </div>
                                      <div className="fore3">
                                        {gemstone_details?.stock_number}
                                      </div>
                                      <div className="fore4 hidden-xs">
                                        Price:
                                      </div>
                                      <div className="fore5 hidden-xs">
                                        $
                                        {Math.round(
                                          gemstone_details?.gemstone_price
                                        )}
                                      </div>
                                    </div>
                                    <div className="order-items-right">
                                      <div className="fore2" data-title="">
                                        {" "}
                                        Description:{" "}
                                      </div>
                                      <div className="fore3">
                                        {gemstone_details?.gemstone_name}
                                      </div>
                                      <div
                                        className="fore2"
                                        data-title=""
                                      ></div>
                                      <div className="fore3"></div>
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
                            <div className="order-details-description">
                              <div className="order-details-column">
                                <LazyLoadImage
                                  width="auto"
                                  height="auto"
                                  src={diamond_details?.diamond_image}
                                  alt={diamond_details?.diamond_shape}
                                />
                              </div>
                              <div className="right-des-order">
                                <div className="order-items-right">
                                  <div className="fore2" data-title="">
                                    {" "}
                                    Stock Number:
                                  </div>
                                  <div className="fore3">
                                    {diamond_details?.stock_number}
                                  </div>
                                  <div className="fore4 hidden-xs">Price:</div>
                                  <div className="fore5 hidden-xs">
                                    $
                                    {Math.round(diamond_details?.diamond_price)}
                                  </div>
                                </div>
                                <div className="order-items-right">
                                  <div className="fore2" data-title="">
                                    {" "}
                                    Description:{" "}
                                  </div>
                                  <div className="fore3">
                                    {diamond_details?.diamond_carat}{" "}
                                    {diamond_details?.diamond_shape} Diamond
                                  </div>
                                  <div className="fore2" data-title=""></div>
                                  <div className="fore3"></div>
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
                            <div className="order-details-description">
                              <div className="order-details-column">
                                <LazyLoadImage
                                  width="auto"
                                  height="auto"
                                  src={gemstone_details?.gemstone_image}
                                  alt={gemstone_details?.gemstone_name}
                                />
                              </div>
                              <div className="right-des-order">
                                <div className="order-items-right">
                                  <div className="fore2" data-title="">
                                    {" "}
                                    Stock Number:
                                  </div>
                                  <div className="fore3">
                                    {gemstone_details?.stock_number}
                                  </div>
                                  <div className="fore4 hidden-xs">Price:</div>
                                  <div className="fore5 hidden-xs">
                                    $
                                    {Math.round(
                                      gemstone_details?.gemstone_price
                                    )}
                                  </div>
                                </div>
                                <div className="order-items-right">
                                  <div className="fore2" data-title="">
                                    {" "}
                                    Description:{" "}
                                  </div>
                                  <div className="fore3">
                                    {gemstone_details?.gemstone_name}
                                  </div>
                                  <div className="fore2" data-title=""></div>
                                  <div className="fore3"></div>
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
                            <>
                              <div className="ring-gemstone-description">
                                <div className="order-details-description">
                                  <div className="order-details-column">
                                    <LazyLoadImage
                                      width="auto"
                                      height="auto"
                                      src={ring_details?.ring_image}
                                      alt={ring_details?.ring_name}
                                    />
                                  </div>
                                  <div className="right-des-order">
                                    <div className="order-items-right">
                                      <div className="fore2" data-title="">
                                        {" "}
                                        Stock Number:
                                      </div>
                                      <div className="fore3">
                                        {ring_details?.ring_style}
                                      </div>
                                      <div className="fore4 hidden-xs">
                                        Price:
                                      </div>
                                      <div className="fore5 hidden-xs">
                                        ${Math.round(ring_details?.ring_price)}
                                      </div>
                                    </div>
                                    <div className="order-items-right">
                                      <div className="fore2" data-title="">
                                        {" "}
                                        Description:{" "}
                                      </div>
                                      <div className="fore3">
                                        {ring_details?.ring_name}
                                      </div>
                                      <div className="fore2" data-title="">
                                        {" "}
                                        Ring Size:{" "}
                                      </div>
                                      <div className="fore3">
                                        {ring_details?.ring_size}
                                      </div>
                                    </div>
                                    <div className="order-items-right">
                                      {order_details.engraving && (
                                        <>
                                          <div className="fore2" data-title="">
                                            {" "}
                                            Engraving:{" "}
                                          </div>
                                          <div className="fore3">
                                            {order_details?.engraving}
                                          </div>
                                        </>
                                      )}
                                      {order_details.font && (
                                        <>
                                          <div className="fore2" data-title="">
                                            {" "}
                                            Font:{" "}
                                          </div>
                                          <div className="fore3">
                                            {order_details?.font}
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        }
                      })}

                    {showOrderId && (
                      <>
                        <div className="order-details-description">
                          <div className="order-details-column"></div>
                          <div className="right-des-order">
                            <div className="order-items-right">
                              <div className="fore2" data-title=""></div>
                              <div className="fore3"></div>
                              <div className="fore4 hidden-xs">Subtotal:</div>
                              <div className="hidden-xs">
                                $
                                {Math.round(
                                  orderId?.order_details?.total_amount
                                )}
                              </div>
                            </div>
                            <div className="order-items-right">
                              <div className="fore2" data-title=""></div>
                              <div className="fore3"></div>
                              <div className="fore4 hidden-xs">Shipping Fees:</div>
                              <div className="hidden-xs">$
                                {Math.round(
                                  orderId?.order_details?.shipping
                                )}</div>
                            </div>
                            <div className="order-items-right">
                              <div className="fore2" data-title=""></div>
                              <div className="fore3"></div>
                              <div className="fore4 hidden-xs">
                              Sales TAX est:
                              </div>
                              <div className="hidden-xs">$
                                {Math.round(
                                  orderId?.order_details?.tax
                                )}</div>
                            </div>
                            
                            <div className="order-items-right">
                              <div className="fore2" data-title=""></div>
                              <div className="fore3"></div>
                              <div className="fore5 hidden-xs">Total:</div>
                              <div className="fore5 hidden-xs">
                                $
                                {Math.round(
                                  orderId?.order_details?.payment_amount
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="shipping-details-order">
                          <h2 className="heading">Order Details</h2>
                          <div className="shipping-inner">
                            <div className="shipping-column">
                              <h4 className="heading">Shipping Information</h4>
                              <div className="ohd-body">
                                <p>
                                  Status: {orderId?.order_details?.order_status}
                                </p>
                                <p>
                                  Estimated Delivery Date:{" "}
                                  <br className="visible-xs" />
                                </p>
                                <p>
                                  FedEx Tracking Number:{" "}
                                  <br className="visible-xs" />
                                  Your tracking number will be generated when
                                  your order is ready to ship. Once your order
                                  ships, it should arrive within 1-2 days.
                                </p>
                              </div>
                            </div>
                            <div className="shipping-column">
                              <h4 className="heading">Shipping Address</h4>
                              <div className="ohd-body">
                                <p>
                                  {
                                    orderId?.order_details.billing_address
                                      ?.first_name
                                  }{" "}
                                  {
                                    orderId?.order_details.billing_address
                                      ?.last_name
                                  }
                                </p>
                                <p>
                                  {orderId?.order_details.billing_address
                                    ?.address_line2 !== null &&
                                    orderId?.order_details.billing_address
                                      ?.address_line2 !== null}
                                </p>
                                <p>
                                  {orderId?.order_details.billing_address?.city}{" "}
                                  <br />
                                  {
                                    orderId?.order_details.billing_address
                                      ?.country
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="shipping-details-order">
                          <div className="shipping-inner">
                            <div className="shipping-column">
                              <h4 className="heading">Payment History:</h4>
                              <div className="ohd-body">
                                <p>Payment Method :</p>
                                <br />
                                <p>{orderId?.order_details?.order_method}</p>
                              </div>
                            </div>
                            <div className="shipping-column">
                              <h4 className="heading">Billing Address</h4>
                              <div className="ohd-body">
                                <p>
                                  {
                                    orderId?.order_details.shipping_address
                                      ?.first_name
                                  }{" "}
                                  {
                                    orderId?.order_details.shipping_address
                                      ?.last_name
                                  }
                                </p>
                                <p>
                                  {orderId?.order_details.shipping_address
                                    ?.address_line2 !== null &&
                                    orderId?.order_details.shipping_address
                                      ?.address_line2 !== null}
                                </p>
                                <p>
                                  {
                                    orderId?.order_details.shipping_address
                                      ?.city
                                  }{" "}
                                  <br />
                                  {
                                    orderId?.order_details.shipping_address
                                      ?.country
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="order-hisotry-main">
              <div className="orders-history-dashboard">
                <h3 className="orders-heading-history">Order History</h3>
                <p>You have no Recent Orders.</p>
              </div>
            </div>
          )}

          <h3 className="heading">Contact Us</h3>
          <p>
            We are here to help you with any questions you may have! Our
            customer service hours are Weekdays 6am – 7pm and Weekends 7am – 7pm
            PT.
          </p>

          <div className="chat-us-new">
            <ul>
              {/* <li>
               <Link href="#">
                 <BsChat />
                 <span>Live Chat</span>
               </Link>
             </li> */}
              <li>
                <Link href="/help" className="email-button">
                  {" "}
                  <MdOutlineEmail />
                  <span>Email</span>
                </Link>
              </li>
              <li>
                <Link href="tel:609-507-0003">
                  <IoIosCall />
                  <span>609-507-0003</span>
                </Link>
              </li>
            </ul>
          </div>
          <p>
            By placing an order, you have agreed to SAMA's
            {/* <Link href="#" data-url="">
              Security Policy
            </Link> */}
            <Link href="/privacy-policy"> Privacy Policy</Link>,
            <Link href="/term-of-use"> Terms of Service</Link>.
            {/* <Link href="#">Customer Service Policy</Link>. */}
          </p>
        </div>
      </div>
    </>
  );
};
