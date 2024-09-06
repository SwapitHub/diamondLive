import React, { useContext, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import Slider from "react-slider";
import { UserContext } from "../../../App";

const ClarityPopup = ({ setClarityOpen }) => {
  const [clarity, setClarity] = useState(0);
  const {imgAssetsUrl} = useContext(UserContext)

  const handleChange = (value) => {
    setClarity(value);
  };
  useEffect (() => {
    function handleClickOutside(event) {
      const popupContent = document.querySelector(".popup__content");
      if (popupContent && !popupContent.contains(event.target)) {
        setClarityOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setClarityOpen]);

  const handleClose=(event)=>{
    event.stopPropagation();
  }
  return (
    <>
      <section className="new-popups" onClick={handleClose}>
        <div className="popup__content">
          <div className="need-ass-popup">
            <div className="close-popup-icon">
              <h3 className="modal-title">Clarity</h3>
              <Link to="javascript:void(0);" onClick={() => setClarityOpen(false)}>
                Close <IoMdClose />
              </Link>
            </div>
            <div className="carat-content">
              A diamond’s clarity refers to the presence of impurities on and
              within the stone. When a rough stone is extracted from carbon deep
              beneath the earth, tiny traces of natural elements are almost
              always trapped inside. These elements are called flaws or
              inclusions because they are formed naturally and are unique to
              each stone.
            </div>
            <div className="carat-image">
              <img src={`${imgAssetsUrl}/frontend/images/Damage-7.png`} alt="hand" width="auto" height="auto"/>
            </div>
            <div className="carat-slider">
              <Slider
                min={0}
                max={100}
                value={clarity}
                onChange={handleChange}
                marks={[0, 14.6, 29.3, 44.1, 58.6, 73.4, 88.1]}
                step={14.7}
              ></Slider>
            </div>
            <div className="clarity-list">
              <ul>
              <li>VVS1-VS1</li>
                    <li>VS1-SI1</li>
                    <li>SI1-SI3</li>
                    <li>SI3-VS</li>
                    <li>VS-VVS</li>
                    <li>VVS-FL</li>
                    <li>FL-IF</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ClarityPopup