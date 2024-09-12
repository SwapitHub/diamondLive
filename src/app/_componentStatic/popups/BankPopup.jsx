import Link from "next/link";
import { IoMdClose } from "react-icons/io";

const BankPopup = ({ setBankOpen }) => {
  const handleClose=(event)=>{
    event.stopPropagation();
  }

  return (
    <>
      <section className="new-popups" onClick={handleClose}>
        <div className="popup__content">
          <div className="need-ass-popup">
            <div className="close-popup-icon">
              <h3 className="modal-title">Bank Wire</h3>
              <Link href="javascript:void(0);" onClick={() => setBankOpen(false)}>
                Close <IoMdClose />
              </Link>
            </div>
            <div className="carat-content">
              <p>You may use a bank wire to pay for Brilliant Earth purchases of $500 or more. For US, Canadian, and Australian bank wires only, Brilliant Earth provides a 1.5% discount to your order. For Canadian, Australian, and other international bank wires, a $35 processing fee will apply to your order. Some financial institutions may also charge a fee for using a bank wire.</p>
              <p>After you submit your order, Brilliant Earth will give you the account information you will need to provide to your bank to transfer funds from your account directly to a Brilliant Earth account. It may take a few days for your bank to process the bank wire. Once your bank has transferred the funds, Brilliant Earth is immediately notified and your purchase is processed. If you have any questions about the process involved in a bank wire, contact your bank or call Brilliant Earth at 800.691.0952.</p>
              <p>Please note an ACH transfer is not the same as a wire transfer. At this time, Brilliant Earth does not accept ACH transfers.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BankPopup;