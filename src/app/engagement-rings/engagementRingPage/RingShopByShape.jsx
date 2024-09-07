"use client"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { UserContext } from "@/app/context/UserContext";

export const RingShopByShape = () => {
  // diamond shape
  const [shapeData, setShapeData] = useState([]);
  const {baseUrl} = useContext(UserContext)
  useEffect(() => {
    axios
      .get(`${baseUrl}/diamondshape`)
      .then((res) => {
        setShapeData(res.data.data);
      })
      .catch(() => {
        console.log("API error");
      });
  }, []);
  return (
    <>
      <div className="ShopDiamondShape">
        <div className="container">
          <h2>Shop diamonds by shape</h2>
          <div className="flex">
            {shapeData.map((shapeItem) => {
              return (
                <>
                  <div className="ShopDiamondShape-img-text">
                    <Link href="#">
                      <img width="auto"  height="auto"   src={shapeItem.icon} alt={shapeItem.shape} />
                      <span>{shapeItem.shape}</span>
                    </Link>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
