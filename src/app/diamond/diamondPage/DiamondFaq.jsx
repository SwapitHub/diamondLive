
"ise client"
import { UserContext } from "@/app/context/UserContext";
import axios from "axios";
import DOMPurify from "dompurify";
import { useContext, useMemo, useState } from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";

export const DiamondFaq = () => {
    const [selected, setSelected] = useState(null);
    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null)
        }

        setSelected(i)
    }
    const {baseUrl} = useContext(UserContext)

    // diamond shape
    const [shapeData, setShapeData] = useState([]);
    useMemo(() => {
        axios
            .get(
                `${baseUrl}/faq`
            )
            .then((res) => {
                setShapeData(res.data.data);
            })
            .catch(() => {
                console.log("API error");
            });
    }, []);
    return (
        <section className="Accordian-main Accordian wedding-page" id="Accordian">
            <div className="container">
                <div class="heading-sec">
                    <h2 class="heading-text">Diamond FAQs</h2>
                </div>
                <div className="faq">
                    <div className="accordinan">
                        {shapeData.map((faqItem, i) => {
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
