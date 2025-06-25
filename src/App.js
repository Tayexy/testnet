import React, { useEffect } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./component/Navbar";
import Heros from "./component/Heros";
import Section from "./component/Section";
import CookieConsent from "react-cookie-consent";
import Form from "./component/Form";
import TelegramTester from "./component/TelegramTester";
import CheckoutButton from "./component/CheckoutButton";
import Coverart from "./component/Coverart";
import Front from "./component/front";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  useEffect(() => {
    const sendVisitorInfo = async () => {
      try {
        const locationRes = await axios.get("https://ipapi.co/json/");
        const { city, country_name: country, ip } = locationRes.data;
  
        await axios.post("http://localhost:3001/notify-telegram", {
           
          browser: navigator.userAgent,
          ip,
          city,
          country,
        });
  
        console.log("✅ Visitor notification sent!");
        toast.success("✅ Visitor info sent!");
      } catch (error) {
        console.error("❌ Error sending visitor info:", error.message);
        toast.error("❌ Failed to send visitor info.");
      }
    };
  
    sendVisitorInfo();
  }, []);
  

  return (
    <div className="App">
      <Navbar />
      <Heros />
      <Section />
      <CheckoutButton />
      <Form />
      <TelegramTester />
      <Front />
      <Coverart />

      <CookieConsent
        debug={false}
        location="bottom"
        buttonText="Accept"
        cookieName="myAwesomeCookieName2"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={30}
        declineButtonStyle={{ background: "green", color: "#fff", fontSize: "13px" }}
        declineButtonText="Decline"
        enableDeclineButton={true}
        setDeclineCookie={true}
        onDecline={() => {}}
      >
        This website uses cookies to enhance the user experience. See our{" "}
        <a href="link" style={{ color: "#f1c40f" }}>
          privacy policy
        </a>
        . <span>By using this website, you agree to our use of cookies.</span>
      </CookieConsent>

      <ToastContainer />
    </div>
  );
}

export default App;
