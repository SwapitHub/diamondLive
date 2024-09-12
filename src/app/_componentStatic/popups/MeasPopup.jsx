import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";


const MeasPopup = ({ setMeasOpen }) => {

  useEffect(() => {
    function handleClickOutside(event) {
      const popupContent = document.querySelector(".popup__content");
      if (popupContent && !popupContent.contains(event.target)) {
        setMeasOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setMeasOpen]);

  const handleClose=(event)=>{
    event.stopPropagation();
  }
  return (
    <>
      <section className="new-popups" onClick={handleClose}>
        <div className="popup__content">
          <div className="need-ass-popup">
            <div className="close-popup-icon">
              <h3 className="modal-title">Measurement</h3>
              <Link href="javascript:void(0);" onClick={() => setMeasOpen(false)}>
                Close <IoMdClose />
              </Link>
            </div>
            <div className="carat-content">
              <p>Diamonds are given three measurements to specify their dimensions. For fancy shaped diamonds, the measurement specifies length x width x depth. The length is the larger dimension as you view the diamond from the top and the width is the smaller. The depth is the height of a gemstone, from the culet to the table. The measurements determine the length to width ratio and can indicate the quality of cut of the diamond.</p>
              <p>For round diamonds, the measurement specifies diameter 1 x diameter 2 x depth. Round diamonds are never quite perfectly round given they are cut by humans. They are given two measurements for diameter to indicate the maximum and minimum diameter. These two diameters vary slightly, but should not vary by very much.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default MeasPopup