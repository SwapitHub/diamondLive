import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import Slider from "react-slider";

const GirdlePopup = ({ setGirdleOpen }) => {

  useEffect(() => {
    function handleClickOutside(event) {
      const popupContent = document.querySelector(".popup__content");
      if (popupContent && !popupContent.contains(event.target)) {
        setGirdleOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setGirdleOpen]);

  const handleClose=(event)=>{
    event.stopPropagation();
  }
  return (
    <>
      <section className="new-popups" onClick={handleClose}>
        <div className="popup__content">
          <div className="need-ass-popup">
            <div className="close-popup-icon">
              <h3 className="modal-title">Girdle</h3>
              <Link to="javascript:void(0);" onClick={() => setGirdleOpen(false)}>
                Close <IoMdClose />
              </Link>
            </div>
            <div className="carat-content">
            The narrow rim around the widest part of a diamond, separating the crown from the pavillion.
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default GirdlePopup