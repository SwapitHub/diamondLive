import React, { useContext, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Slider from "react-slider";
import Link from "next/link";
import { UserContext } from "@/app/context/UserContext";

const CutPopup = ({ setCutOpen }) => {
  const [carat, setCarat] = useState(0);
  const {imgAssetsUrl} = useContext(UserContext)

  const handleChange = (value) => {
    setCarat(value);
  };
  useEffect (() => {
    function handleClickOutside(event) {
      const popupContent = document.querySelector(".popup__content");
      if (popupContent && !popupContent.contains(event.target)) {
        setCutOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setCutOpen]);

  const handleClose=(event)=>{
    event.stopPropagation();
  }
  return (
    <>
      <section className="new-popups" onClick={handleClose}>
        <div className="popup__content">
          <div className="need-ass-popup">
            <div className="close-popup-icon">
              <h3 className="modal-title">Cut</h3>
              <Link href="javascript:void(0);" onClick={() => setCutOpen(false)}>
                Close <IoMdClose />
              </Link>
            </div>
            <div className="carat-content">
            The cut refers to the angles and proportions of a diamond. The cut of a diamond — its depth and width, and the uniformity of the facets — determines its beauty. The skill with which a diamond is cut determines how well it reflects and refracts light.
            </div>
            <div className="carat-image">
              <img src={`${imgAssetsUrl}/frontend/images/Diamond-5.png`} alt="hand" width="auto" height="auto"/>
            </div>
            <div className="carat-slider">
              <Slider
                min={0}
                max={100}
                value={carat}
                onChange={handleChange}
                marks={17}
                    step={17}
              >
              </Slider>
            </div>
            <div className="cut-list">
            <ul>
                    <li>Ideal</li>
                    <li>
                      Excellent/
                      <br />
                      Super Ideal
                    </li>
                    <li>Very Good</li>
                    <li>Good</li>
                    <li>Fair</li>
                    <li>Poor</li>
                  </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default CutPopup