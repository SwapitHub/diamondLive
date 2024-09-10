"use client"
import { UserContext } from "@/app/context/UserContext";
import axios from "axios";
import DOMPurify from "dompurify";
import Link from "next/link";
import { useContext, useMemo, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const WeddingSets = () => {
    const [bridalSet, setBridalSet] = useState([])
    const {baseUrl,imgAssetsUrl} = useContext(UserContext)
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
            <div className="wedding-page ">
                <div className="container">
                    <div className="bridalSets-necklaces flex ">
                        <div className="bridalSets flex">
                            <div className="bridalSets-text">
                                <h3>Women's Wedding Bands</h3>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(bridalSet.ring_promotion_banner_desc_2),
                                    }}
                                ></span>
                                <div className="bridalSets-btn">
                                    <Link className="button" href={`/wedding-band/women/womens-wedding`}>
                                        Shop Now
                                    </Link>
                                </div>
                            </div>
                            <div className="bridalSets-img">
                                <LazyLoadImage src={`${imgAssetsUrl}/frontend/images/hands1.jpg`} alt="ring_promotion_banner_desktop_2" loading="lazy"  width="auto"  height="auto"  />
                            </div>
                          
                        </div>
                        <div className="bridalSets flex">
                            <div className="bridalSets-text">
                                <h3>Men's Wedding Bands</h3>
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(bridalSet.ring_promotion_banner_desc_2),
                                    }}
                                ></span>
                                <div className="bridalSets-btn">
                                    <Link className="button" href={`/wedding-band/men/mens-wedding`}>
                                        Shop Now
                                    </Link>
                                </div>
                            </div>
                            <div className="bridalSets-img">
                                <LazyLoadImage src={`${imgAssetsUrl}/frontend/images/hand3.jpg`} alt="ring_promotion_banner_desktop_2" loading="lazy"  width="auto"  height="auto"  />
                            </div>
                          
                        </div>
                      
                    </div>
                </div>
            </div>
        </>

    );
};
