"use clint"
import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { UserContext } from "@/app/context/UserContext";
import Link from "next/link";

export const GemstoneSets = () => {
    const [bridalSet, setBridalSet] = useState([])
    const {baseUrl, imgAssetsUrl} = useContext(UserContext)

    useMemo(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get(
                    `${baseUrl}/homecontent`
                );
                const data = response.data.data;

                setBridalSet(data);


            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    return (
        <>
            <div className="wedding-page diamond-set">
                <div className="container">
                    <div className="bridalSets-necklaces flex diamond-wrp">
                        <div className="bridalSets flex dmg-lft">
                            <div className="bridalSets-text">
                                <h3>Colored Diamonds</h3>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(bridalSet.ring_promotion_banner_desc_2),
                                    }}
                                ></span>
                                <div className="bridalSets-btn">
                                    <Link className="button" href="/gemstone/style/Colored Diamond">
                                        Shop Now
                                    </Link>
                                </div>
                            </div>
                            <div className="bridalSets-img dsk-bridalSets-img">
                                <LazyLoadImage src={`${imgAssetsUrl}/frontend/images/dimondlft.png`} alt="ring_promotion_banner_desktop_2"  width="auto"  height="auto"  />
                            </div>
                            <div className="mb-bridalSets-img">
                                <LazyLoadImage src={`${imgAssetsUrl}/frontend/images/dimondlft.png`} alt="ring_promotion_banner_mobile_2"  width="auto"  height="auto"  />
                            </div>
                        </div>
                        <div className="bridalSets flex dmd-rgt">
                            <div className="bridalSets-text">
                                <h3>Lab Diamonds</h3>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(bridalSet.ring_promotion_banner_desc_2),
                                    }}
                                ></span>
                                <div className="bridalSets-btn">
                                    <Link className="button" href="/gemstones/gemstone-shop-all">
                                        Shop Now
                                    </Link>
                                </div>
                            </div>
                            <div className="bridalSets-img dsk-bridalSets-img">
                                <LazyLoadImage src={`${imgAssetsUrl}/frontend/images/diamond2.jpg`} alt="ring_promotion_banner_desktop_2"  width="auto"  height="auto"  />
                            </div>
                            <div className="mb-bridalSets-img">
                                <LazyLoadImage src={`${imgAssetsUrl}/frontend/images/diamond2.jpg`} alt="ring_promotion_banner_mobile_2"  width="auto"  height="auto"  />
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </>

    );
};
