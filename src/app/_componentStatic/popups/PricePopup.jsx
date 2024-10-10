import Link from "next/link";
import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";


const PricePopup = ({ setPriceOpen }) => {
  useEffect (() => {
    function handleClickOutside(event) {
      const popupContent = document.querySelector(".popup__content");
      if (popupContent && !popupContent.contains(event.target)) {
        setPriceOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setPriceOpen]);

  const handleClose=(event)=>{
    event.stopPropagation();
  }
  return (
    <>
      <section className="new-popups" onClick={handleClose}>
        <div className="popup__content">
          <div className="need-ass-popup">
            <div className="close-popup-icon">
              <h3 className="modal-title">Price</h3>
              <Link href="javascript:void(0);" onClick={() => setPriceOpen(false)}>
               <IoMdClose />
              </Link>
            </div>
            <div className="carat-content">
            All of our prices are in US$.
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default PricePopup