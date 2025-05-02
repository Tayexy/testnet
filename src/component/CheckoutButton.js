import React from 'react';

function CheckoutButton() {
  const handleClick = async () => {
    const res = await fetch('http://localhost:4242/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await res.json();
    window.location.href = data.url;
  };

  return <button onClick={handleClick}>Buy Now</button>;
}

export default CheckoutButton;
