
import secureLocalStorage from "react-secure-storage";
import Header from "./Header";

const fetchNavbar = async () => {
    let navData = [];
    try {
      const response = await fetch(
        `https://api.rocksama.com/api/v1/menu`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      navData = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    return navData;
  };


  const userId = secureLocalStorage.getItem("formData");
  const fetchUseAccount = async () => {
    let profileData = [];
    try {
      const response = await fetch(
        `https://api.rocksama.com/api/v1/user-account?user_id=${userId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      profileData = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    return profileData;
  };


  const fetchSiteInfo = async () => {
    let siteInfo = [];
    try {
      const response = await fetch(
        `https://api.rocksama.com/api/v1/siteinfo`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      siteInfo = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    return siteInfo;
  };

export default async function HeaderServer() {
  const navData = await fetchNavbar();  
  const profileData = await fetchUseAccount();
  const siteInfo = await fetchSiteInfo();




  
    
    return (
      <>      
        <div className="home-page">
       <Header navData={navData.data} profileData={profileData.data} siteInfo={siteInfo.data}/>
      
      </div>
      </>
    );
}

