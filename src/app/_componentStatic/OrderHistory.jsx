import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import secureLocalStorage from "react-secure-storage";
import { toast } from 'react-toastify';
import { removeToWishlist } from "../../../store/actions/wishlistAction";
import { removeFromCart } from "../../../store/actions/cartActions";
import { UserContext } from "../context/UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";


export const OrderHistory = ({setFormData}) => {
  const dispatch = useDispatch()
  const cartData = useSelector((state) => state.cartData);
  const wishlistData = useSelector((state) => state.wishlistData);
  const {setToggle} = useContext(UserContext);
 const router = useRouter()
  const signOut = (event) =>{
    event.preventDefault();

    cartData.map((item) => {
      dispatch(removeFromCart(item));
    });
    wishlistData.map((item) => {
      dispatch(removeToWishlist(item));
    });
    setTimeout(() => {
      router.push("/login");
    }, 3000);

    secureLocalStorage.clear();
    secureLocalStorage.removeItem("persist:persist-store");

    toast.success("Sign Out Successfully", {
      position: "top-right"
    });

    
  }
  return (
    <>
      <div className="order-history" id="user-log">
        <div className="container">
          <div className="order-history-main">
            <ul className="list-unstyled">
              <li>
                <Link href="/accounts" onClick={()=>setToggle(1)}>My Account</Link>
              </li>
              <li>
                <Link href="/accounts" onClick={()=>setToggle(2)}>Order History</Link>
              </li>
              <li>
                <Link href="/wishlist">Wish List</Link>
              </li>
            </ul>
            <div className="sign-btn">
              <button className="submit"
              onClick={(event) => signOut(event)}
              >sign out</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
