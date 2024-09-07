"use client"
import { UserContext } from "@/app/context/UserContext";
import axios from "axios";
import DOMPurify from "dompurify";
import Link from "next/link";
import { useContext, useMemo, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const DiamondSets = () => {
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
            <div className="wedding-page diamond-set" id="dimonds">
                <div className="container">
                    <div className="bridalSets-necklaces flex">
                        <div className="bridalSets flex dmg-lft">
                            <div className="bridalSets-text">
                                <h3>Colored Diamonds</h3>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(bridalSet.ring_promotion_banner_desc_2),
                                    }}
                                ></span>
                                <div className="bridalSets-btn">
                                    <Link className="button" href="/engagement-rings/start-with-a-diamond?diamonds=colored-diamonds">

                                        Shop Now
                                    </Link>
                                </div>
                            </div>
                            <div className="bridalSets-img">
                                <LazyLoadImage  width="auto"  height="auto"   src={`${imgAssetsUrl}/frontend/images/dmgsetwet.png`} alt="ring_promotion_banner_desktop_2"  />
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
                                    <Link className="button" href="/engagement-rings/start-with-a-diamond/lab_grown">
                                        Shop Now
                                    </Link>
                                </div>
                            </div>
                            <div className="bridalSets-img">
                                <LazyLoadImage  width="auto"  height="auto"   src={`${imgAssetsUrl}/frontend/images/diamondSet2.png`} alt="ring_promotion_banner_desktop_2" />
                            </div>
                            
                        </div>
                       
                    </div>
                </div>
            </div>
        </>

    );
};
