"use client";
import axios from "axios";
import Link from "next/link";
import { useContext } from "react";
import { validateEmail } from "../_componentStatic/ValidationFunctions";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

const ForgetPass = () => {

  const {baseURl} = useContext(UserContext)

  
  function handleValidation () {
let emailData = document.getElementById("forget-email").value

    validateEmail(
      document.getElementById("forget-email").value,
      "forget-email",
      "Email Address"
    );  
    
if(emailData!==""){
  axios.post(`https://api.rocksama.com/api/v1/password/email`,{
    email: emailData
  })
  .then((res)=>{
    console.log(res);
    toast.success(res.data.msg,{
      position: "top-right"
    })
    
  })
  
  .catch((error)=>{
    console.log("error",error);
    toast.error(error.response.data.errors.email[0],{
          position: "top-right",
        })
  })
}

    // try {
    //   const response = await axios.post('https://api.rocksama.com/api/v1/password/email', {
    //     email: emailData
    //   });
  
    //   console.log('Response:', response.data);
    // } catch (error) {
    //   console.log("error",error);
    //   toast.error(error.response.data.errors.email[0],{
    //         position: "top-right",
    //       })
  
    // }
  }
   
  
  return (
    <>
   
      <section className="password-rest">
        <div className="container">
          
          <div className="password-inner">
            <div className="psswd-reset-content">
              <h2>My Account</h2>
              <h3>account assistance</h3>
              <p>
                Enter the email address you used to create your SAMA
                account.{" "}
              </p>
            </div>
            <div className="recieve-password">
              <ul>
                <li>
                  You will receive an email shortly to reset your password.
                </li>
                <li>
                  If you do not receive an email, please{" "}
                  <Link href="/contact-us">contact us</Link> for assistance.
                </li>
              </ul>
            </div>
            <div className="reset-forms">
              <form className="form-inline">
                <div className="input-group">
                  <input
                    type="text"
                    className="zip-code"
                    placeholder="Email Address"
                    name="email"
                    id="forget-email"
                  />
                  <div className="error_1"></div>
                  <span className="input-group-btn">
                    <button type="button" onClick={()=>handleValidation()}>
                      submit
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      
    </>
  );
};

export default ForgetPass;