import { Suspense } from "react";
import Header from "./Header";
import LoaderSpinner from "./LoaderSpinner";

const headerData = async () => {
  let header = [];
  try {
    const response = await fetch(`${process.env.BASE_URL}/menu`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    header = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return header;
};
const siteInfo = async () => {
  let siteInfo = [];
  try {
    const response = await fetch(`${process.env.BASE_URL}/siteinfo`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    siteInfo = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  return siteInfo;
};


const HeaderServer = async () => {
  const header = await headerData();
  const site = await siteInfo();

  return (
    <>
    <Suspense  fallback={<LoaderSpinner/>}>
      <Header navData={header.data} siteInfo={site.data}/>

    </Suspense>
    </>
  );
};

export default HeaderServer;
