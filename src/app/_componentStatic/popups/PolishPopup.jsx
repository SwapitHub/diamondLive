import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";


const PolishPopup = ({ setPolishOpen }) => {

  useEffect(() => {
    function handleClickOutside(event) {
      const popupContent = document.querySelector(".popup__content");
      if (popupContent && !popupContent.contains(event.target)) {
        setPolishOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setPolishOpen]);

  const handleClose=(event)=>{
    event.stopPropagation();
  }
  return (
    <>
      <section className="new-popups" onClick={handleClose}>
        <div className="popup__content">
          <div className="need-ass-popup">
            <div className="close-popup-icon">
              <h3 className="modal-title">Polish</h3>
              <Link href="javascript:void(0);" onClick={() => setPolishOpen(false)}>
                Close <IoMdClose />
              </Link>
            </div>
            <div className="carat-content">
            Describes the finish of the facets of the diamond. Polish is graded from Ideal, Excellent, Very Good, Good, Fair, or Poor. Polish grades of Good or higher have the least effect on the brilliance of the diamond and are suitable for the finest quality jewelry. Certain gem labs, such as Gemscan, incorporate Polish into an overall cut grade.
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default PolishPopup