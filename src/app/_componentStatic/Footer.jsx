"use client";
import axios from "axios";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FooterMobile } from "./FooterMobile";
import NewsLetter from "./NewsLetter";
import { UserContext } from "../context/UserContext";

export const Footer = ({ftrIcon, FooterData}) => {
  const [selected, setSelected] = useState(null);
  const toggle = (i) => {
    if (selected === i) {
      setSelected(null);
    } else {
      setSelected(i);
    }
  };

  // icon url



  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <div className="ftr-desktop">
              <div className="ftr-contact flex">
                {Array.isArray(FooterData) &&
                  FooterData.map((item) => (
                    <ul className="ftr-contact-ul" key={item.id} >
                      <h4>
                        <Link href="javascript:void(0);">{item.name}</Link>
                      </h4>
                      {item.pages.map((innerItem) => (
                        <li key={innerItem.id}>
                          <Link href={`/${innerItem.slug}`}>
                            {innerItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ))}

                <ul className="ftr-contact-form">
                  <h4>Stay connected</h4>

                  <p>
                    Join our mailing list for the latest products, news, and
                    offers!
                  </p>

                  <div className="news-letter">
                    <NewsLetter
                      portalId="45427602"
                      formId="5ada63ac-16ec-4ecb-bca7-21caf983c404"
                      targetId="ftrId"
                    />
                  </div>

                  <div className="ftr-icons flex">
                    <span>
                      <Link href={`tel:+${ftrIcon.phone}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.33824 2.93384H16.1436C18.5718 2.93384 20.5404 4.90243 20.5404 7.33066V16.1409C20.5404 18.5682 18.5718 20.5368 16.1436 20.5368H7.33432C4.9061 20.5368 2.9375 18.5682 2.9375 16.14V7.33457C2.9375 4.90439 4.90805 2.93384 7.33824 2.93384V2.93384Z"
                            stroke="#080909"
                            stroke-width="1.46691"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9.43653 14.0294C11.5714 16.1652 14.2764 17.5265 15.8851 15.9246L16.2753 15.5344C16.7955 15.0151 16.7232 14.1546 16.1188 13.735C15.7384 13.47 15.3296 13.1854 14.8778 12.8676C14.4103 12.539 13.7698 12.5908 13.3639 12.9928L12.9229 13.4309C12.3762 13.0847 11.8354 12.6397 11.3328 12.138L11.3308 12.1361C10.8291 11.6344 10.3842 11.0926 10.038 10.546L10.4761 10.1049C10.879 9.70003 10.9289 9.0585 10.6013 8.59105C10.2824 8.13924 9.99786 7.73046 9.73382 7.35004C9.31428 6.74665 8.45369 6.67428 7.93441 7.19357L7.54421 7.58377C5.94332 9.19248 7.30364 11.8955 9.43848 14.0323"
                            stroke="#080909"
                            stroke-width="1.46691"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </Link>
                    </span>
                    <span>
                      <Link href={`mailto:${ftrIcon.email}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M14.2654 16.7053C13.5916 16.984 12.8933 17.114 12.2068 17.114C9.23679 17.114 6.82812 14.7054 6.82812 11.7354C6.82812 8.76536 9.23679 6.35669 12.2068 6.35669C15.1768 6.35669 17.5855 8.76536 17.5855 11.7354V12.6312C17.5855 13.5592 16.8325 14.3113 15.9054 14.3113C14.9783 14.3113 14.2253 13.5583 14.2253 12.6312V11.7354C14.2253 10.6205 13.3226 9.71885 12.2088 9.71885V9.71885C11.0939 9.71885 10.1922 10.6215 10.1922 11.7354C10.1922 12.8492 11.0949 13.7519 12.2088 13.7519C13.3226 13.7519 14.2253 12.8502 14.2253 11.7354"
                            stroke="#080909"
                            stroke-width="1.46691"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.2013 21.5146C17.6023 21.5146 21.9807 17.1362 21.9807 11.7352C21.9807 6.3342 17.6023 1.95581 12.2013 1.95581C6.80027 1.95581 2.42188 6.3342 2.42188 11.7352C2.42188 17.1362 6.80027 21.5146 12.2013 21.5146Z"
                            stroke="#080909"
                            stroke-width="1.46691"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </Link>
                    </span>
                    <span>
                      <Link href={`${ftrIcon.instagram}`} target="_blank">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.27182 2.93384H17.0821C19.5093 2.93384 21.4779 4.90146 21.4779 7.33066V16.1409C21.4779 18.5682 19.5103 20.5368 17.0811 20.5368H8.27182C5.8436 20.5368 3.875 18.5692 3.875 16.14V7.33066C3.875 4.90243 5.84262 2.93384 8.27182 2.93384V2.93384Z"
                            stroke="#080909"
                            stroke-width="1.46691"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M17.5119 6.56492C17.33 6.5659 17.1824 6.71357 17.1824 6.89547C17.1824 7.07736 17.331 7.22503 17.5129 7.22503C17.6948 7.22503 17.8425 7.07736 17.8425 6.89547C17.8434 6.71259 17.6948 6.56492 17.5119 6.56492"
                            stroke="#080909"
                            stroke-width="1.46691"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M15.1585 9.24576C16.5333 10.6206 16.5333 12.8497 15.1585 14.2246C13.7836 15.5995 11.5545 15.5995 10.1796 14.2246C8.80472 12.8497 8.80472 10.6206 10.1796 9.24576C11.5545 7.87088 13.7836 7.87088 15.1585 9.24576"
                            stroke="#080909"
                            stroke-width="1.46691"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </Link>
                    </span>
                    <span>
                      <Link href={`${ftrIcon.facebook}`} target="_blank">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M9.88281 11.0644H14.4117"
                            stroke="#080909"
                            stroke-width="1.46691"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M14.4173 7.29053H13.6252C12.3959 7.29053 11.3984 8.28803 11.3984 9.5173V10.3094V16.18"
                            stroke="#080909"
                            stroke-width="1.46691"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.1466 21.5146C17.5476 21.5146 21.926 17.1362 21.926 11.7352C21.926 6.3342 17.5476 1.95581 12.1466 1.95581C6.74558 1.95581 2.36719 6.3342 2.36719 11.7352C2.36719 17.1362 6.74558 21.5146 12.1466 21.5146Z"
                            stroke="#080909"
                            stroke-width="1.46691"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </Link>
                    </span>
                    <span>
                      <Link href={`${ftrIcon.pinterest}`} target="_blank">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.6154 21.5146C18.0164 21.5146 22.3948 17.1362 22.3948 11.7352C22.3948 6.3342 18.0164 1.95581 12.6154 1.95581C7.21433 1.95581 2.83594 6.3342 2.83594 11.7352C2.83594 17.1362 7.21433 21.5146 12.6154 21.5146Z"
                            stroke="#080909"
                            stroke-width="1.46691"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8.78257 11.7188C8.6349 11.3393 8.53906 10.9384 8.53906 10.513C8.53906 8.48767 10.3639 6.8457 12.6141 6.8457C14.8644 6.8457 16.6892 8.48767 16.6892 10.513C16.6892 12.5383 15.0473 14.1803 13.0219 14.1803C12.2151 14.1803 11.4758 13.9123 10.8705 13.4703"
                            stroke="#080909"
                            stroke-width="1.46691"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M11.6192 10.0825L10.1719 16.6249"
                            stroke="#080909"
                            stroke-width="1.46691"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </Link>
                    </span>
                  </div>
                </ul>
              </div>
            </div>

            {/* =================mobile start============== */}
            <FooterMobile
              FooterData={FooterData}
              toggle={toggle}
              selected={selected}
              ftrIcon={ftrIcon}
            />
            {/* =================mobile end============== */}
          </div>
        </div>
      </footer>
      <div className="copy-right">
        <p>{ftrIcon.copyright}</p>
      </div>
    </>
  );
};
