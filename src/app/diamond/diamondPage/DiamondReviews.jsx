"use client"
import { UserContext } from '@/app/context/UserContext'
import React, { useContext } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export const DiamondReviews = () => {
    const {imgAssetsUrl} = useContext(UserContext)
    return (
        <>
            <section className="testimonial-rings">
                <div className="container">
                    <div className="textimonial-inner-wrapper">
                        <div className="heading-sec">
                            <h2 className="heading-text">
                                Engagement Ring Reviews
                            </h2>
                        </div>
                        <div className="testimonial-mian-wrrap">
                            <div className="testy-bar">
                                <div className="top-img-name-bar">
                                    <div className="imgg">
                                        <LazyLoadImage  width="auto"  height="auto"   src={`${imgAssetsUrl}/frontend/images/client1.png`} alt="client-img" />
                                    </div>
                                    <div className="client-name">
                                        <p> Kaitie</p>
                                    </div>
                                </div>
                                <div className="comment-sec">
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                        has been the industry's standard dummy text ever since the 1500s, when an unknown
                                        printer took a galley of type and book. </p>
                                </div>
                            </div>
                            <div className="testy-bar">
                                <div className="top-img-name-bar">
                                    <div className="imgg">
                                        <LazyLoadImage  width="auto"  height="auto"   src={`${imgAssetsUrl}/frontend/images/client1.png`} alt="client-img" />
                                    </div>
                                    <div className="client-name">
                                        <p> Kaitie</p>
                                    </div>
                                </div>
                                <div className="comment-sec">
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                        has been the industry's standard dummy text ever since the 1500s, when an unknown
                                        printer took a galley of type and book. </p>
                                </div>
                            </div>
                            <div className="testy-bar">
                                <div className="top-img-name-bar">
                                    <div className="imgg">
                                        <LazyLoadImage  width="auto"  height="auto"   src={`${imgAssetsUrl}/frontend/images/client1.png`} alt="client-img" />
                                    </div>
                                    <div className="client-name">
                                        <p> Kaitie</p>
                                    </div>
                                </div>
                                <div className="comment-sec">
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                        has been the industry's standard dummy text ever since the 1500s, when an unknown
                                        printer took a galley of type and book. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
