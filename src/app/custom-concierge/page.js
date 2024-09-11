'use client'
import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Helmet } from "react-helmet";

const CustomizationForm = () => {
  const { imgAssetsUrl } = useContext(UserContext);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//js.hsforms.net/forms/shell.js";
    document.body.appendChild(script);

    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: "45427602",
          formId: "6435ac88-6953-4197-ad8b-0b3a4eac846e",
          target: "#customizationForm",
        });
      }
    };
  }, []);

  return (
    <>
      <Helmet>
        <script
          charset="utf-8"
          type="text/javascript"
          src="//js.hsforms.net/forms/v2.js"
        >
          {" "}
        </script>
      </Helmet>
      <div className="container">
        <div className="customization-form">
          <img
            src={`${imgAssetsUrl}/public/Animated-Loader.svg`}
            alt="logo"
            width="auto"
            height="auto"
          />
          <h1 className="center">Custom Concierge</h1>
          <p>
            Designing your dream engagement ring is now easier than ever with
            our 'Custom Concierge.' Simply share your vision and we'll craft a
            ring as unique as your love story.
          </p>
          <div id="customizationForm"></div>
        </div>
      </div>
    </>
  );
};

export default CustomizationForm;
