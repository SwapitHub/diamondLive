import Link from "next/link";
import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";

const FlourePopup = ({ setFloureOpen }) => {
  useEffect(() => {
    function handleClickOutside(event) {
      const popupContent = document.querySelector(".popup__content");
      if (popupContent && !popupContent.contains(event.target)) {
        setFloureOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setFloureOpen]);

  const handleClose=(event)=>{
    event.stopPropagation();
  }
  return (
    <>
      <section className="new-popups" onClick={handleClose}>
        <div className="popup__content">
          <div className="need-ass-popup">
            <div className="close-popup-icon">
              <h3 className="modal-title">Flourescene</h3>
              <Link href="javascript:void(0);" onClick={() => setFloureOpen(false)}>
                Close <IoMdClose />
              </Link>
            </div>
            <div className="carat-content">
              The tiny facet at the bottom tip of a gemstone. The optimal culet
              should be pointed or very small (graded "small" or "none").
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default FlourePopup