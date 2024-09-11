"use client";
import axios from "axios";
import { React, useState, useEffect, useContext, useMemo } from "react";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import DOMPurify from "dompurify";
import { UserContext } from "@/app/context/UserContext";

export const GemstoneFaq = () => {
  const [selected, setSelected] = useState(null);
  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }

    setSelected(i);
  };
  const { baseUrl } = useContext(UserContext);
  // diamond shape
  const [faqData, setfaqData] = useState([]);
  useMemo(() => {
    axios
      .get(`${baseUrl}/gemstone-faq`)
      .then((res) => {
        setfaqData(res.data.data);
      })
      .catch(() => {
        console.log("API error");
      });
  }, []);
  return (
    <section className="Accordian-main Accordian wedding-page" id="Accordian">
      <div className="container">
        <div class="heading-sec">
          <h2 class="heading-text">Gemstone FAQs</h2>
        </div>
        <div className="faq">
          <div className="accordinan">
            {faqData.map((faqItem, i) => {
              return (
                <div className="item" key={i}>
                  <div className="title" onClick={() => toggle(i)}>
                    <p>{faqItem.question}</p>
                    <span>
                      {selected === i ? <BiUpArrow /> : <BiDownArrow />}
                    </span>
                  </div>

                  <div className={selected === i ? "content-show" : "content"}>
                    <div
                      key={faqItem.id}
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(faqItem.answer),
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
