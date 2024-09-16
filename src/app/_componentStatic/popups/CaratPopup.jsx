import React, { useContext, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import Slider from "react-slider";
import { UserContext } from "../../../App";

const CaratPopup = ({ setIsOpen }) => {
  const {imgAssetsUrl} = useContext(UserContext)
  const [carat, setCarat] = useState(0);

  const handleChange = (value) => {
    setCarat(value);
  };

  useEffect (() => {
    function handleClickOutside(event) {
      const popupContent = document.querySelector(".popup__content");
      if (popupContent && !popupContent.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsOpen]);

  const handleClose=(event)=>{
    event.stopPropagation();
  }
  return (
    <>
      <section className="new-popups" onClick={handleClose}>
        <div className="popup__content">
          <div className="need-ass-popup">
            <div className="close-popup-icon">
              <h3 className="modal-title">Carat</h3>
              <Link to="javascript:void(0);" onClick={() => setIsOpen(false)}>
                Close <IoMdClose />
              </Link>
            </div>
            <div className="carat-content">
              A carat is the unit used to measure a diamond's weight. One carat
              equals 200 milligrams or 0.2 grams. Although carat weight and the
              size of a diamond are related, the carat does not directly measure
              diamond size.
            </div>
            <div className="carat-image">
              <img src={`${imgAssetsUrl}/frontend/images/DiamondHand.png`} alt="hand" width="auto" height="auto"/>
            </div>
            <div className="carat-slider">
              <Slider
                min={0.25}
                max={2.0}
                value={carat}
                onChange={handleChange}
                step={0.01}
              >
              </Slider>
                <div>Selected Carat: {carat} CT</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default CaratPopup