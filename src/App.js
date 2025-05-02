import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import Heros from "./component/Heros";
import Section from "./component/Section";
import CookieConsent from "react-cookie-consent";
import CheckoutButton from './component/CheckoutButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useEffect(() => {
    fetch("http://localhost:3000/notify-telegram", { method: "GET" })
      .then(response => response.text())
      .then(data => console.log(data)) // 🔹 Log response for debugging
      .catch(error => console.error("❌ Error:", error)); // 🔹 Handle errors
  }, []);

  toast.success("✅ Saved successfully!");

  return (
    <div className="App">
      <Navbar />
      <Heros />
      <Section />
      <CheckoutButton />
      <CookieConsent
        debug={true}
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
        This website uses cookies to enhance the user experience. See our <a href="link">privacy policy</a>.
        <span>By using this website, you agree to our use of cookies.</span>
      </CookieConsent>
      <ToastContainer />
    </div>
  );
}

export default App;