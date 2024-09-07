import Link from 'next/link'
import React from 'react'

export const RingByStyle = () => {
    return (
        <section className="own-engagment own-pd-control">
            <div className="container">
                <div className="popular-engagment">
                    <div className="heading-sec">
                        <h2 className="heading-text">
                        Shop Engagement Ring Settings 
                        </h2>
                    </div>
                    <div className="inner-polular-eng">
                        <div className="popular-grid-wrapper">
                            <Link href="/engagement-rings/start-with-a-setting">
                                <div className="imgg-sec">
                                    <img  width="auto"  height="auto"   src="/images/popRing1.png" alt="img" />
                                </div>
                                <div className="text-con">
                                    <p>Nature Inspired</p>
                                </div>
                            </Link>
                        </div>
                        <div className="popular-grid-wrapper">
                            <Link href="/engagement-rings/start-with-a-setting">
                                <div className="imgg-sec">
                                    <img  width="auto"  height="auto"   src="/images/popRing2.png" alt="img" />
                                </div>
                                <div className="text-con">
                                    <p>Yellow Gold Rings</p>
                                </div>
                            </Link>
                        </div>
                        <div className="popular-grid-wrapper">
                            <Link href="/engagement-rings/settings?style=hidden-halo-2">
                                <div className="imgg-sec">
                                    <img  width="auto"  height="auto"   src="/images/popRing3.png" alt="img" />
                                </div>
                                <div className="text-con">
                                    <p>Hidden Halo Rings</p>
                                </div>
                            </Link>
                        </div>
                        <div className="popular-grid-wrapper">
                            <Link href="/engagement-rings/settings?style=three-stone">
                                <div className="imgg-sec">
                                    <img  width="auto"  height="auto"   src="/images/popRing4.png" alt="img" />
                                </div>
                                <div className="text-con">
                                    <p>Three Stone Rings</p>
                                </div>
                            </Link>
                        </div>
                        <div className="popular-grid-wrapper">
                            <Link href="/engagement-rings/start-with-a-setting?bridal-sets=true">
                                <div className="imgg-sec">
                                    <img  width="auto"  height="auto"   src="/images/popRing5.png" alt="img" />
                                </div>
                                <div className="text-con">
                                    <p>Bridal Set</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
