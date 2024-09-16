import Link from "next/link";
import React, { useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const LoveBrilliance = ({home}) => {
  return (
    <section className="love-bri-section">
      <div className="container">
        <div
          className="loves-inner"
          style={{ backgroundImage: `url(https://assets.rocksama.com/frontend/images/love-ring-back.png)` }}
        >
          <div className="love-left-image desktop">
            <LazyLoadImage src={home.data.section5?.image_desktop} alt="brilliance"  width="auto"  height="auto"  />
          </div>
          <div className="love-left-image mobile"
          style={{ backgroundImage: `url(https://assets.rocksama.com/frontend/images/love-ring-back.png)` }}
          >
            <LazyLoadImage src={home.data.section5?.image_desktop} alt="brilliance"  width="auto"  height="auto"  />
          </div>

          <div className="love-right-content">
            <h4>{home.data.section5?.subheading}</h4>
            <h3>{home.data.section5?.heading}</h3>
            <p>
            {home.data.section5?.description}
            </p>

            <Link class="btn explore" href={`${home.data.section5?.link}`}>
            {home.data.section5?.btn_name}
            </Link>
          </div>
        </div>


        
      </div>
    </section>
  );
};

export default LoveBrilliance;
