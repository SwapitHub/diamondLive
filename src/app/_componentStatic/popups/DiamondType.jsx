import Link from "next/link";
import { IoMdClose } from "react-icons/io";

const DiamondType = ({ setTypeOfRing }) => {
  const handleClose=(event)=>{
    event.stopPropagation();
  }

  return (
    <>
      <section className="new-popups" onClick={handleClose}>
        <div className="popup__content">
          <div className="need-ass-popup">
            <div className="close-popup-icon">
              <h3 className="modal-title">Accent Diamond Type</h3>
              <Link href="javascript:void(0);" onClick={() => setTypeOfRing(false)}>
                Close <IoMdClose />
              </Link>
            </div>
            <div className="carat-content">
              <p>The accent diamonds in this engagement ring setting will match the type of center diamond you choose. If you select a natural diamond as the center stone, the accent diamonds will also be natural. If you choose a lab-grown center diamond, the accent diamonds will be lab-grown as well.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DiamondType;