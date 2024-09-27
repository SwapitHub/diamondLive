import Link from "next/link";

export const BridalJewellery = ({home}) => {
  return (
    <>
      <div className="menRings Bridal-Jewellery">
        <div className=" container">
          <div className="flex menRings-main">
            <div className="menRings-text">
              <h2>{home.data.section1?.heading}</h2>
              <p>
                {home.data.section1?.description}
              </p>
              <div>
                <Link
                  className="button"
                  href={`/${home.data.section1?.link}`}
                >
                {home.data.section1?.btn_name}
                </Link>
              </div>
            </div>
            <div className="menRings-img">
              <img
                src={home.data.section1?.image}
                alt="bridal"
              
              width="auto"  height="auto"  
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
