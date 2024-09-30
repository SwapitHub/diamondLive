import Link from "next/link";

export const EngagementBridal = ({ home }) => {
  // const [isOpen, setIsOpen] = useState(false);


  // const togglePopup = () => {
  //   setIsOpen(true);
  //   document.body.classList.toggle("customize-form-popup-open", isOpen);
  // };
  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.classList.add("customize-form-popup-open");
  //   } else {
  //     document.body.classList.remove("customize-form-popup-open");
  //   }
  // }, [isOpen]);
  return (
    <section className="EngagementBridal-main">
      <div className="container">
        <div className="flex common-row EngagementBridal">
          <div className="EngagementBridal-img">
            <img
              src={home.data.section3?.image}
              alt="bridal"
               width="auto"  height="auto"  
            />
          </div>
          <div className="EngagementBridal-text">
            <h2>{home.data.section3?.heading}</h2>
            <p>{home.data.section3?.description}</p>

            <Link className="button" href={`${home.data.section3?.link}`}>
              {home.data.section3?.btn_name}
            </Link>
          </div>
        </div>

        <div className="flex common-row EngagementBridal-2">
          <div className="EngagementBridal-2-img">
            <img
              src={home.data.section4?.image1}
              alt="bridal"
              
              width="auto"  height="auto"  
            />
          </div>
          <div className="EngagementBridal-2-img text">
            <p>{home.data.section4?.description}</p>
            <span>{home.data.section4?.heading}</span>
            <Link className="button" href="/custom-concierge">
              {home.data.section4?.btn_name}
            </Link>
              
            
          </div>
          <div className="EngagementBridal-2-img">
            <img
              src={home.data.section4?.image2}
              alt="bridal"
              
              width="auto"  height="auto"  
            />
          </div>
        </div>
      </div>
    </section>
  );
};
