import React from 'react'
import "./Heros.css";
import sound from "../asset/Producer3.jpg";
function front() {
  return (
    <div className="distribute">
        <div className="distribute-container">
         <h2>Sell your beats and your <br></br>soundpacks—all under one platform!</h2> 
         <p>Offer drum kits, presets, exclusive samples,<br></br> and more alongside your instrumentals.</p>  
       <button className="sound"> Sign Up!</button>
        </div>
<div className="distribute-container">
    <img src={sound} alt="soundpacks" className="packs" />
</div>
        </div>
  )
}

export default front