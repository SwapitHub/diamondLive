import Link from "next/link";
import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";


const SymmetryPopup = ({ setSymmetryOpen }) => {

  useEffect(() => {
    function handleClickOutside(event) {
      const popupContent = document.querySelector(".popup__content");
      if (popupContent && !popupContent.contains(event.target)) {
        setSymmetryOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSymmetryOpen]);
  const handleClose=(event)=>{
    event.stopPropagation();
  }
  return (
    <>
      <section className="new-popups" onClick={handleClose}>
        <div className="popup__content">
          <div className="need-ass-popup">
            <div className="close-popup-icon">
              <h3 className="modal-title">Symmetry</h3>
              <Link href="javascript:void(0);" onClick={() => setSymmetryOpen(false)}>
                Close <IoMdClose />
              </Link>
            </div>
            <div className="carat-content">
            Describes the alignment of the facets of the diamond. If facets are misaligned, the diamond may poorly reflect light. Symmetry is graded from Ideal / Excellent, Very Good, Good, Fair, or Poor. Symmetry grades of Good or higher have the least effect on the brilliance of the diamond and are suitable for the finest quality jewelry. Certain gem labs, such as Gemscan, incorporate Symmetry into an overall Cut grade.
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default SymmetryPopup