import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

export const GemstoneReviews = () => {
    return (
        <section className="testimonial-rings">
            <div className="container">
                <div className="textimonial-inner-wrapper">
                    <div className="heading-sec">
                        <h2 className="heading-text">
                            Gemstone Reviews
                        </h2>
                    </div>
                    <div className="testimonial-mian-wrrap">
                        <div className="testy-bar">
                            <div className="top-img-name-bar">
                                <div className="imgg">
                                <LazyLoadImage src="/images/GemReview-1.jpg" alt="kaitie"  width="auto"  height="auto"  />
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
                                <LazyLoadImage src="/images/GemReview-2.jpg" alt="charlie"  width="auto"  height="auto"  />
                                </div>
                                <div className="client-name">
                                    <p>Charlie</p>
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
                                    <LazyLoadImage src="/images/GemReview-3.jpg" alt="dakota"  width="auto"  height="auto"  />
                                </div>
                                <div className="client-name">
                                    <p>Dakota</p>
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
    )
}
