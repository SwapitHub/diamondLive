import Link from "next/link";
import React from "react";

export const Tabbing = ({
  newData,
  stock_num,
  ringName,
  ringLink,
  diamondName,
  diamondLink,
  type,
  gemStoneLink,
  gemStoneName,
}) => {
  return (
    <>  
      {stock_num ? (
        <div className="ring-choose-setting flex">
          {newData?.length > 0 ? (
            <div className="one-choose-setting first-btn">
              <Link href="/gemstones/start-with-a-gemstone">
                1. Choose Gemstones
              </Link>
            </div>
          ) : type === "ring-gemstone" || type === "gem-final" ? (
            <div className="one-choose-setting first-btn">
              <Link href="/gemstones/start-with-a-gemstone">
                1. Choose Gemstone
              </Link>
            </div>
          ) : type === "ring-detail" || type === "diamond-ring" ? (
            <div className="one-choose-setting first-btn">
              <Link href="/engagement-rings/start-with-a-diamond/">
                1. Choose Diamonds
              </Link>
            </div>
          ) : (
            <div className="one-choose-setting first-btn">
              <Link href="/engagement-rings/start-with-a-setting">
                1. Choose Rings
              </Link>
            </div>
          )}

          <div className="svg-icn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clip-path="url(#clip0_492_13580)">
                <path
                  d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                  stroke="#E8E8E8"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.25 12H15.75"
                  stroke="#D7D7D7"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.75 9L15.75 12L12.75 15"
                  stroke="#D7D7D7"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_492_13580">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="one-choose-setting">
            <Link
              href={
                type === "diamond" || type === "ring-final"
                  ? diamondLink
                  : ringLink
              }
            >
              {type === "diamond" || type === "ring-final"
                ? diamondName
                : ringName}
            </Link>
          </div>
          <div className="svg-icn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clip-path="url(#clip0_492_13575)">
                <path
                  d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                  fill="#310F4C"
                  stroke="#734E90"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.25 12H15.75"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.75 9L15.75 12L12.75 15"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_492_13575">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          <div
            className={`one-choose-setting ${
              type === "ring-final" || type === "gem-final" ? "" : "last-btn"
            } `}
          >
            <span>3. Complete Ring </span>
          </div>
        </div>
      ) : (
        <>
          <div className="ring-choose-setting flex">
            {type === "gemstone" ? (
              <div className="one-choose-setting">
                <Link href={gemStoneLink}>{gemStoneName}</Link>
              </div>
            ) : (
              <div className="one-choose-setting">
                <Link
                  href={
                    type === "ring" || type === "ring-detail"
                      ? ringLink
                      : diamondLink
                  }
                >
                  {type === "ring" || type === "ring-detail"
                    ? ringName
                    : diamondName}
                </Link>
              </div>
            )}

            <div className="svg-icn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clip-path="url(#clip0_492_13575)">
                  <path
                    d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                    fill="#310F4C"
                    stroke="#734E90"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.25 12H15.75"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.75 9L15.75 12L12.75 15"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_492_13575">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="one-choose-setting">
              <Link
                href={
                  type === "diamond" || type === "gemstone"
                    ? ringLink
                    : diamondLink
                }
              >
                {type === "diamond" || type === "gemstone"
                  ? ringName
                  : diamondName}
              </Link>
            </div>
            <div className="svg-icn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clip-path="url(#clip0_492_13580)">
                  <path
                    d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
                    stroke="#E8E8E8"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.25 12H15.75"
                    stroke="#D7D7D7"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12.75 9L15.75 12L12.75 15"
                    stroke="#D7D7D7"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_492_13580">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="one-choose-setting last-btn">
              <span>3. Complete Ring </span>
            </div>
          </div>
        </>
      )}
    </>
  );
};
