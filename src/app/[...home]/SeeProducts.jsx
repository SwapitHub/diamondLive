"use client";
import Link from "next/link";
import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

export const SeeProducts = ({
  shopbystyleHome
}) => {

  
  return (
    <section className="see-products-main">
      <div className="container">
        <div className="common-row see-products">  
          {
            shopbystyleHome.map((item)=>{
              return(
                <>
                <div className="see-products-img">
            <Link href={`${item?.link}`} className="See-Products">
              <span>{item?.name}</span>
              <span> See Products <MdOutlineKeyboardArrowRight /> </span>
            </Link>
            <div

            ><img src={item?.image} alt={item?.image_alt} /></div>
          </div>
                
                </>
              )
            })
          }        
          
        </div>
      </div>
    </section>
  );
};
