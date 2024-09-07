"use client"
import { UserContext } from '@/app/context/UserContext'
import React, { useContext } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export const DiamondEdu = () => {
    const {imgAssetsUrl} = useContext(UserContext)
    return (
        <>
            <section className="own-engagment education">
                <div className="container">
                    <div className="inner-own-eng">
                        <div className="heading-sec">
                            <h2 className="heading-text">
                                Engagement Ring Education
                            </h2>
                        </div>
                        <div className="ring-grid-sec">
                            <div className="grid-wrapper-bar">
                                <div className="img-bar">
                                    <LazyLoadImage  width="auto"  height="auto"   src={`${imgAssetsUrl}/frontend/images/educt1.png`} alt="client-img" />
                                </div>
                                <div className="contant-bar">
                                    <h5>How to Buy an Engagement
                                        Ring
                                    </h5>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. make a type
                                        specimen book. </p>
                                </div>
                            </div>
                            <div className="grid-wrapper-bar">
                                <div className="img-bar">
                                    <LazyLoadImage  width="auto"  height="auto"   src={`${imgAssetsUrl}/frontend/images/educt2.png`} alt="client-img" />
                                </div>
                                <div className="contant-bar">
                                    <h5>Start with a Natural Diamond</h5>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. make a type
                                        specimen book. </p>
                                </div>
                            </div>
                            <div className="grid-wrapper-bar">
                                <div className="img-bar">
                                    <LazyLoadImage  width="auto"  height="auto"   src={`${imgAssetsUrl}/frontend/images/educt3.png`} alt="client-img" />
                                </div>
                                <div className="contant-bar">
                                    <h5>Start with a Lab Diamond</h5>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. make a type
                                        specimen book. </p>
                                </div>
                            </div>
                            <div className="grid-wrapper-bar">
                                <div className="img-bar">
                                    <LazyLoadImage  width="auto"  height="auto"   src={`${imgAssetsUrl}/frontend/images/educt4.png`} alt="client-img" />
                                </div>
                                <div className="contant-bar">
                                    <h5>Start with a Gemstone</h5>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. make a type
                                        specimen book. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
