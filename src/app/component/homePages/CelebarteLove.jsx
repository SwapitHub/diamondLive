import Link from "next/link";
import React from "react";

export const CelebarteLove = ({ home }) => {
  return (
    <>
      <section className="celebratre-love-sec">
        <div className="container">
          <div
            className="celebrate-inner"
            style={{
              backgroundImage: `url(${home.data.section2?.image})`,
            }}
          >
           <div className="celebrate-content mobile">
            <img src={home.data.section2?.image} alt="love" width="auto"  height="auto"  />
           </div>

              <div className="celebrate-content">
                <h3>{home.data.section2?.heading}</h3>
                <p>
                  {home.data.section2?.description}
                </p>
                <Link className="see-btn btn" href={`/${home.data.section2?.link}`}>
                  {home.data.section2?.btn_name} {`>`}{" "}
                </Link>
              
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
