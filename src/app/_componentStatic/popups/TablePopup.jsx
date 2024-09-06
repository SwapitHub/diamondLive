import { UserContext } from "@/app/context/UserContext";
import React, { useContext, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

const TablePopup = ({ setTableOpen }) => {
  const {imgAssetsUrl} = useContext(UserContext)

  useEffect(() => {
    function handleClickOutside(event) {
      const popupContent = document.querySelector(".popup__content");
      if (popupContent && !popupContent.contains(event.target)) {
        setTableOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setTableOpen]);

  const handleClose=(event)=>{
    event.stopPropagation();
  }
  return (
    <>
      <section className="new-popups" onClick={handleClose}>
        <div className="popup__content">
          <div className="need-ass-popup">
            <div className="close-popup-icon">
              <h3 className="modal-title">Table</h3>
              <Link to="javascript:void(0);" onClick={() => setTableOpen(false)}>
                Close <IoMdClose />
              </Link>
            </div>
            <div className="carat-content">
              <p>The largest facet of a gemstone, located at the top. Table % is the table width as a percentage of the girdle diameter.</p>
              
            </div>
            <div className="carat-image">
                <img src={`${imgAssetsUrl}/frontend/images/Bg.jpg`} alt="table" width="auto" height="auto"/>
              </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default TablePopup;