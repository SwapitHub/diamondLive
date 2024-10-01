import Link from "next/link";

export const ShopDiamondShape = ({shapeData, icon}) => {
  
  return (
    <>
      <div className="ShopDiamondShape">
        <div className="container">
          <h3>Shop Diamonds by Shape</h3>
          <div className="flex">
          <div className="ShopDiamondShape-img-text" >
                  
                  </div>
            {shapeData?.map((shapeItem, i) => {
              
              return (
               
                  <div className="ShopDiamondShape-img-text" key={i}>                  
                    <Link href={`/diamond/shape/${shapeItem.shape}`}>
                      <div className="own-ring-white">
                      <img src={shapeItem.icon} alt={shapeItem.shape}  width="auto"  height="auto"  />

                      </div>
                      <span>{shapeItem.shape}</span>
                    </Link>
                  </div>
               
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
