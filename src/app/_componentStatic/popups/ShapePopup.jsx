import { UserContext } from "@/app/context/UserContext";
import React, { useContext, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

const ShapePopup = ({ setShapeOpen }) => {
  const { imgAssetsUrl } = useContext(UserContext);

  useEffect(() => {
    function handleClickOutside(event) {
      const popupContent = document.querySelector(".popup__content");
      if (popupContent && !popupContent.contains(event.target)) {
        setShapeOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShapeOpen]);

  const handleClose = (event) => {
    event.stopPropagation();
  };
  return (
    <>
      <section className="new-popups" onClick={handleClose}>
        <div className="popup__content">
          <div className="need-ass-popup">
            <div className="close-popup-icon">
              <h3 className="modal-title">Shape</h3>
              <Link
                to="javascript:void(0);"
                onClick={() => setShapeOpen(false)}
              >
                Close <IoMdClose />
              </Link>
            </div>
            <div className="carat-content">
              Diamond cut should not be confused with shape. Shape refers to the
              general outward appearance of the diamond, not its reflective
              qualities. SAMA currently carries the following shapes:
            </div>
            <div className="shapes-image">
              <div>
                <img
                  src={`${imgAssetsUrl}/frontend/images/Round.png`}
                  alt="Round"
                  width="auto"
                  height="auto"
                />
                <p className="shapes-name">Round</p>
              </div>
              <div>
                <img
                  src={`${imgAssetsUrl}/frontend/images/Oval.png`}
                  alt="Oval"
                  width="auto"
                  height="auto"
                />
                <p className="shapes-name">Oval</p>
              </div>
              <div>
                <img
                  src={`${imgAssetsUrl}/frontend/images/Pear.png`}
                  alt="Pear"
                  width="auto"
                  height="auto"
                />
                <p className="shapes-name">Pear</p>
              </div>
              <div>
                <img
                  src={`${imgAssetsUrl}/frontend/images/Princess.png`}
                  alt="Princess"
                  width="auto"
                  height="auto"
                />
                <p className="shapes-name">Princess</p>
              </div>
              <div>
                <img
                  src={`${imgAssetsUrl}/frontend/images/Asscher.png`}
                  alt="Asscher"
                  width="auto"
                  height="auto"
                />
                <p className="shapes-name">Asscher</p>
              </div>
              <div>
                <img
                  src={`${imgAssetsUrl}/frontend/images/Cushion.png`}
                  alt="Cushion"
                  width="auto"
                  height="auto"
                />
                <p className="shapes-name">Cushion</p>
              </div>
              <div>
                <img
                  src={`${imgAssetsUrl}/frontend/images/Emerald-2.png`}
                  alt="Emerald"
                  width="auto"
                  height="auto"
                />
                <p className="shapes-name">Emerald</p>
              </div>
              <div>
                <img
                  src={`${imgAssetsUrl}/frontend/images/Marquise.png`}
                  alt="Marquise"
                  width="auto"
                  height="auto"
                />
                <p className="shapes-name">Marquise</p>
              </div>
              <div>
                <img
                  src={`${imgAssetsUrl}/frontend/images/Radiant.png`}
                  alt="Radiant"
                  width="auto"
                  height="auto"
                />
                <p className="shapes-name">Radiant</p>
              </div>
              <div>
                <img
                  src={`${imgAssetsUrl}/frontend/images/Heart.png`}
                  alt="Heart"
                  width="auto"
                  height="auto"
                />
                <p className="shapes-name">Heart</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default ShapePopup