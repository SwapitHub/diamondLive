import { UserContext } from "@/app/context/UserContext";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import { IoMdClose } from "react-icons/io";


const DepthPopup = ({ setDepthOpen }) => {
  const {imgAssetsUrl} = useContext(UserContext);

  useEffect(() => {
    function handleClickOutside(event) {
      const popupContent = document.querySelector(".popup__content");
      if (popupContent && !popupContent.contains(event.target)) {
        setDepthOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setDepthOpen]);
  const handleClose=(event)=>{
    event.stopPropagation();
  }
  return (
    <>
      <section className="new-popups" onClick={handleClose}>
        <div className="popup__content">
          <div className="need-ass-popup">
            <div className="close-popup-icon">
              <h3 className="modal-title">Depth</h3>
              <Link href="javascript:void(0);" onClick={() => setDepthOpen(false)}>
                Close <IoMdClose />
              </Link>
            </div>
            <div className="carat-content">
              <p>The height of a gemstone, from the culet to the table. Depth % is the height of the diamond as a percentage of the girdle diameter.</p>
              
            </div>
            <div className="carat-image">
                <img src={`${imgAssetsUrl}/frontend/images/Bg.jpg`} alt="depth" width="auto" height="auto"/>
              </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default DepthPopup