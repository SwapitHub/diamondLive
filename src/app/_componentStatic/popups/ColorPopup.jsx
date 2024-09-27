import React, { useContext, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Slider from "react-slider";
import Link from "next/link";
import { UserContext } from "@/app/context/UserContext";

const ColorPopup = ({ setColorOpen }) => {
  const [color, setColor] = useState(0);
  const {imgAssetsUrl} = useContext(UserContext)

  const handleChange = (value) => {
    setColor(value);
  };
  useEffect (() => {
    function handleClickOutside(event) {
      const popupContent = document.querySelector(".popup__content");
      if (popupContent && !popupContent.contains(event.target)) {
        setColorOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setColorOpen]);
  const handleClose=(event)=>{
    event.stopPropagation();
  }
  return (
    <>
      <section className="new-popups" onClick={handleClose}>
        <div className="popup__content">
          <div className="need-ass-popup">
            <div className="close-popup-icon">
              <h3 className="modal-title">Color</h3>
              <Link href="javascript:void(0);" onClick={() => setColorOpen(false)}>
                Close <IoMdClose />
              </Link>
            </div>
            <div className="carat-content">
            Color is the natural color visible in a diamond and does not change over time. Colorless diamonds allow more light to pass through than a colored diamond, releasing more sparkle and fire.
            </div>
            <div className="carat-image">
              <img src={`${imgAssetsUrl}/frontend/images/Shine-5.png`} alt="hand" width="auto" height="auto"/>
            </div>  
            <div className="carat-slider">
              <Slider
                min={0}
                max={100}
                value={color}
                onChange={handleChange}
                marks={[0, 14.6, 29.3, 44.1, 58.6, 73.4, 88.1]}
                    step={14.7}
              >
              </Slider>
            </div>
            <div className="color-list">
            <ul>
                    <li>D-F</li>
                    <li>F-H</li>
                    <li>H-K</li>
                    <li>K-O</li>
                    <li>O-R</li>
                    <li>R-U</li>
                    <li>U-Z</li>
                  </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ColorPopup