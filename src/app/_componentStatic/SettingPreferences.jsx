import Link from "next/link";
import React, { useState } from "react";
import { OrdersContact } from "./OrdersContact";

export const SettingPreferences = ({ profileData }) => {
  const [showUpdateInfo, setShowUpdateInfo] = useState(false);

  const handleClick = () => {
    setShowUpdateInfo(true);
  };
  return (
    <>
      <div className="account-right-data">
        {showUpdateInfo ? (
          <OrdersContact profileData={profileData} />
        ) : (
          <div className="setting-acc-main">
            <h1 className="h2">My Account</h1>
            <h2 className="h3">Settings &amp; Preferences</h2>

            <div className="my-account-info">
              <ul>
                <li>First Name:</li>
                <li>{profileData?.userdata.first_name}</li>
                <li>Last Name:</li>
                <li>{profileData?.userdata.last_name}</li>
                <li>Email Address:</li>
                <li>{profileData?.userdata.email}</li>
                <li>Password:</li>
                <li>******</li>
                <li>Email Preferences:</li>
                <li>Send me SAMA news updates and offers.</li>
              </ul>
            </div>

            <div className="update-info">
              <Link href="#" onClick={handleClick}>
                Update Info
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
