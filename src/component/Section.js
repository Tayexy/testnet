import React, { useState } from "react";
import { FiBell } from "react-icons/fi"; // Import bell icon
import "./Section.css";
import Swal from "sweetalert2";
import image from "../asset/image 4.jpg";
import images from "../asset/image 2.png";
import imagess from "../asset/image 3.jpg";

const Header = ({ notificationCount }) => {
  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      padding: "20px", 
      backgroundColor: "#f8f8f8",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    }}>
      <h1 style={{ margin: 0 }}>Notification</h1>
      <div style={{ position: "relative", cursor: "pointer" }}>
        <FiBell size={30} />
        {notificationCount > 0 && (
          <span style={{
            position: "absolute",
            top: "-5px",
            right: "-5px",
            backgroundColor: "red",
            color: "white",
            borderRadius: "50%",
            padding: "4px 8px",
            fontSize: "12px",
          }}>
            {notificationCount}
          </span>
        )}
      </div>
    </div>
  );
};

const Subscription = ({ addNotification }) => {
  const [message, setMessage] = useState("");

  const handleSubscribe = () => {
    setMessage("Thank you for subscribing!");
    addNotification("Thank you for subscribing!"); // Add a new notification
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="sub">
      {message && (
        <p className="notification">{message}</p>
      )}
      <h4>Subscribe to our newsletter for more updates</h4>
      <input type="search" className="srh" placeholder="Enter your email" />
      <button className="btn" onClick={handleSubscribe}>Subscribe Now</button>
    </div>
  );
};

const MessagingSystem = ({ addNotification }) => {
  const [userMessage, setUserMessage] = useState("");
  const [adminReply, setAdminReply] = useState("");

  const handleUserSend = () => {
    if (userMessage.trim() === "") return;
    addNotification("You sent a message!");
    setUserMessage("");
  };

  const handleAdminReply = () => {
    if (adminReply.trim() === "") return;
    addNotification("Admin replied to your message!");
    setAdminReply("");
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h3>Messaging System</h3>

      <div style={{ marginTop: "20px" }}>
        <input 
          type="text" 
          placeholder="Type your message..." 
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          style={{ padding: "8px", width: "70%", marginRight: "10px" }}
        />
        <button className="btn" onClick={handleUserSend}>Send Message</button>
      </div>

      <div style={{ marginTop: "20px" }}>
        <input 
          type="text" 
          placeholder="Admin reply..." 
          value={adminReply}
          onChange={(e) => setAdminReply(e.target.value)}
          style={{ padding: "8px", width: "70%", marginRight: "10px" }}
        />
        <button className="btn" onClick={handleAdminReply}>Reply to User</button>
      </div>
    </div>
  );
};

function Section() {
  const [notifications, setNotifications] = useState([]);

  const handleContactUs = () => {
    Swal.fire({
      title: "Contact Us!",
      text: "Our support team will be in touch shortly.",
      icon: "info",
      confirmButtonText: "Okay",
    });
  };

  const addNotification = (message) => {
    setNotifications(prev => [...prev, message]);
  };

  return (
    <div>
      {/* Header with bell and notification number */}
      <Header notificationCount={notifications.length} />

      <div className="hero2">
        <h2>OUR TOP PRODUCTS</h2>
        <div className="product">
          <div className="product1">
            <img src={image} alt="Product 1" className="pro" />
            <h4>Comfortable house rest</h4>
            <p>Enjoy the peace and relaxation <br />of a well-designed space that <br />caters to your comfort.</p>
          </div>
          <div className="product1">
            <img src={images} alt="Product 2" className="pro" />
            <h4>24/7 customer support</h4>
            <p>Our dedicated support team is <br />always available to assist you.</p>
            <button className="btn" onClick={handleContactUs}>Contact us</button>
          </div>
          <div className="product1">
            <img src={imagess} alt="Product 3" className="pro" />
            <h4>Affordable pricing</h4>
            <p>Get premium quality without <br />breaking the bank.</p>
          </div>
        </div>

        {/* Subscription component */}
        <Subscription addNotification={addNotification} />

        {/* Messaging system */}
        <MessagingSystem addNotification={addNotification} />
      </div>
    </div>
  );
}

export default Section;
