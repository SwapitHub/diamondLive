// pages/wedding-collection.js
import React from "react";
import DOMPurify from "dompurify";
import Link from "next/link";
import axios from "axios"; // Ensure axios is imported

const WeddingCollection = ({ engagementRings, weddingJewelry, weddingCollection }) => {
  return (
    <section className="own-engagment gemstone WeddingCollection">
      <div className="container">
        <div className="inner-own-eng">
          <div className="heading-sec"></div>
          <div className="ring-grid-sec">
            <div className="grid-wrapper-bar">
              <Link href={`${engagementRings?.url}`}>
                <div className="img-bar">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(engagementRings?.description),
                    }}
                  ></div>
                </div>
                <div className="contant-bar">
                  <h5>Natural diamonds</h5>
                </div>
              </Link>
            </div>
            <div className="grid-wrapper-bar">
              <Link href={`${weddingJewelry?.url}`}>
                <div className="img-bar">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(weddingJewelry?.description),
                    }}
                  ></div>
                </div>
                <div className="contant-bar">
                  <h5>Gemstones</h5>
                </div>
              </Link>
            </div>
            <div className="grid-wrapper-bar">
              <Link href={`${weddingCollection?.url}`}>
                <div className="img-bar">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(weddingCollection?.description),
                    }}
                  ></div>
                </div>
                <div className="contant-bar">
                  <h5>Lab Grown Diamonds</h5>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Fetch data using getServerSideProps
export async function getServerSideProps() {
  try {
    // Fetch engagement rings data using environment variable
    const engagementRingsRes = await axios.get(process.env.API_ENGAGEMENT_RINGS);
    const engagementRings = engagementRingsRes.data.data;

    // Fetch wedding jewelry data using environment variable
    const weddingJewelryRes = await axios.get(process.env.API_WEDDING_JEWELRY);
    const weddingJewelry = weddingJewelryRes.data.data;

    // Fetch wedding collection data using environment variable
    const weddingCollectionRes = await axios.get(process.env.API_WEDDING_COLLECTION);
    const weddingCollection = weddingCollectionRes.data.data;

    // Pass fetched data as props to the component
    return {
      props: {
        engagementRings,
        weddingJewelry,
        weddingCollection,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        engagementRings: null,
        weddingJewelry: null,
        weddingCollection: null,
      },
    };
  }
}

export default WeddingCollection;
