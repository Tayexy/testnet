import React, { useState } from "react";
import "./Heros.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Heros() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleLearnMore = () => {
    toast.success("MORE DRIPS ARE COMING YOUR WAY STAY TUNED", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  const toggleChatOptions = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="hero">
      <h2>Your number one store when it comes to driping in style</h2>
      <input type="search" className="srh" placeholder="Enter your search" />
      <p>When it comes to quality, think <b>DRIP</b></p>
      <button onClick={handleLearnMore}>Learn More</button>

      {/* WhatsApp Chat Button */}
      <div id="whatsapp-chat" style={{ position: "fixed", bottom: 20, right: 20, zIndex: 1000 }}>
        <button
          onClick={toggleChatOptions}
          style={{
            backgroundColor: "#25D366",
            color: "white",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            fontSize: "30px",
            textAlign: "center",
            lineHeight: "60px",
            border: "none",
            boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
            cursor: "pointer",
          }}
        >
          💬
        </button>

        {/* Chat options (hidden/show dynamically) */}
        {isChatOpen && (
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              padding: "10px",
              textAlign: "center",
              position: "absolute",
              bottom: 70,
              right: 0,
              width: "200px",
            }}
          >
            <p style={{ margin: 0 }}>Chat with:</p>
            <a href="https://wa.me/2347039426515?text=Hi%20I%20need%20assistance" target="_blank" rel="noopener noreferrer">
              <button style={{ backgroundColor: "#25D366", color: "white", padding: "10px", borderRadius: "5px", margin: "5px" }}>
                Tayexy
              </button>
            </a>
            <a href="https://wa.me/2347011886514?text=Hi%20I%20need%20help%20with%20your%20services" target="_blank" rel="noopener noreferrer">
              <button style={{ backgroundColor: "#25D366", color: "white", padding: "10px", borderRadius: "5px", margin: "5px" }}>
                Lee
              </button>
            </a>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default Heros;