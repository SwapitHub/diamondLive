"use client";
import { useState } from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";

export const GemstoneFaq = ({faqData}) => {
  const [selected, setSelected] = useState(null);
  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }

    setSelected(i);
  };
 
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
                        __html: faqItem.answer,
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
