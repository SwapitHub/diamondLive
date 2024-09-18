"use client";
import $ from "jquery";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import LoaderSpinner from "../_componentStatic/LoaderSpinner";

const ContactUs = ({ FooterData }) => {
  
  const [loader, setLoader] = useState(false);
  const metaDescriptionLimit = 160;
  const pathname  = usePathname();
  // Handle jQuery accordion
  useEffect(() => {
    $(document).ready(function () {
      $(".accordion-item-body").hide();
      $(".accordion-item-header:first")
        .addClass("active")
        .next(".accordion-item-body")
        .slideDown();

      $(".accordion-item-header").click(function () {
        $(this).toggleClass("active");
        $(this).next(".accordion-item-body").slideToggle();
      });
    });
  }, []);

  // Truncate description function
  const truncateMetaDescription = (description) => {
    return description.length > metaDescriptionLimit
      ? description.substring(0, metaDescriptionLimit) + "..."
      : description;
  };

  // Handle HubSpot form embedding
  useEffect(() => {
    setTimeout(() => {
      const script = document.createElement("script");
      script.src = "//js.hsforms.net/forms/shell.js";
      document.body.appendChild(script);

      script.onload = () => {
        if (window.hbspt) {
          window.hbspt.forms.create({
            portalId: "45427602",
            formId: "7a5a4450-ae5b-494d-904a-6c9c111d96e5",
            target: "#request-ring-sizer",
          });
        }
      };
    }, 1000);
  }, [pathname]);

  return (
    <>
      <div className="container">
        
        <div className="footer-all-pages-display">
          {loader ? (
            <LoaderSpinner />
          ) : (
            Array.isArray(FooterData) && FooterData.map((item) => {
              return (
                <>
                  {item.pages.map((innerItem) => {
                    return (
                      <>
                        {pathname  == `/${innerItem.slug}` ? (
                          <>
                            <div
                              className={
                                item.name === "BRAND" ? innerItem?.slug : ""
                              }
                              dangerouslySetInnerHTML={{
                                __html: (innerItem.content)
                              }}
                            ></div>
                            
                          </>
                        ) : null}
                      </>
                    );
                  })}
                </>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default ContactUs;
