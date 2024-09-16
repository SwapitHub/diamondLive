import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import Slider from "react-slider";

const AverageDimensionsPopup = ({ setAveragePopup }) => {

  const handleClose=(event)=>{
    event.stopPropagation();
  }
 
  return (
    <>
      <section className="new-popups" onClick={handleClose}>
        <div className="popup__content">
          <div className="need-ass-popup">
            <div className="close-popup-icon">
              <h3 className="modal-title">Dimensions of Gemstone</h3>
              <Link to="javascript:void(0);" onClick={() => setAveragePopup(false)}>
                Close <IoMdClose />
              </Link>
            </div>
            <div className="carat-content">
            For colored gemstones, dimensions are the best way of accurately measuring size. These dimensions are accurate plus or minus 0.2mm.
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AverageDimensionsPopup;
