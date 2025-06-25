import React, { useState, useRef } from 'react';
import "./Heros.css";
import { FaBan, FaAdjust, FaCameraRetro, FaStar } from 'react-icons/fa';
import coverart from "../asset/Producer1.jpg";
import coverart2 from "../asset/Producer2.jpg";
import coverart3 from "../asset/Producer3.jpg";

function CoverArtEditor() {
  const [albumName, setAlbumName] = useState("ALBUM NAME");
  const [beatTitle, setBeatTitle] = useState("BEAT TITLE");
  const [filter, setFilter] = useState("none");
  const [color, setColor] = useState("white");
  const [selectedArt, setSelectedArt] = useState(coverart);

  const canvasRef = useRef(null);

  // Positions can use any of top, bottom, left, right
  const albumTextPositions = {
    [coverart]: { top: "10%", left: "30%" },
    [coverart2]: { top: "30%", left: "10%" },
    [coverart3]: { bottom: "10%", right: "15%" },
  };

  const beatTextPositions = {
    [coverart]: { bottom: "10%", left: "30%" },
    [coverart2]: { top: "60%", left: "10%" },
    [coverart3]: { top: "50%", right: "60%" },
  };

  // Fallback positions if none found
  const currentAlbumPosition = albumTextPositions[selectedArt] || { top: "10%", left: "5%" };
  const currentBeatPosition = beatTextPositions[selectedArt] || { top: "30%", left: "5%" };

  const handleKey = (e) => {
    if (e.key === "Enter") e.target.blur();
  };

  const downloadImage = () => {
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const image = new Image();

    image.crossOrigin = "anonymous";
    image.src = selectedArt;
    
    image.onload = () => {
      ctx.filter = filter;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.filter = "none";
     ctx.fillStyle = color;
      


      // Calculate coordinates for album text
      const albumPos = getCoordinatesFromPosition(currentAlbumPosition, canvas);
      ctx.font = "bold 24px Arial";
      ctx.fillText(albumName, albumPos.x, albumPos.y);

      // Calculate coordinates for beat text
      const beatPos = getCoordinatesFromPosition(currentBeatPosition, canvas);
      ctx.font = "bold 18px Arial";
      ctx.fillText(beatTitle, beatPos.x, beatPos.y);

      const link = document.createElement("a");
      link.download = "cover-art.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
  };

  // Helper function to convert CSS position props to canvas x,y coords
  const getCoordinatesFromPosition = (pos, canvas) => {
    // Default to top:0, left:0
    let x = 0;
    let y = 0;

    // Calculate x (left/right)
    if (pos.left !== undefined) {
      x = (parseFloat(pos.left) / 100) * canvas.width;
    } else if (pos.right !== undefined) {
      x = canvas.width - (parseFloat(pos.right) / 100) * canvas.width;
    }

    // Calculate y (top/bottom)
    if (pos.top !== undefined) {
      y = (parseFloat(pos.top) / 100) * canvas.height;
    } else if (pos.bottom !== undefined) {
      y = canvas.height - (parseFloat(pos.bottom) / 100) * canvas.height;
    }

    return { x, y };
  };

  return (
    <div className="coverart-container">
      <div
        className="coverat-row"
        style={{
          backgroundImage: `url(${selectedArt})`,
          filter: filter,
          position: "relative",
          width: "200px",
          maxWidth: "300px",
          height: "300px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          margin: "0 auto",
          border: "1px solid #ccc",
        }}
      >
        <input
          className="editable-text"
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
          onKeyDown={handleKey}
          style={{
            position: "absolute",
            ...currentAlbumPosition,
            fontSize: "1.5rem",
            fontWeight: "bold",
            background: "transparent",
            border: "none",
            outline: "none",
            color: "white",
             color: color,

            

          }}
        />

        <input
          className="editable-text"
          value={beatTitle}
          onChange={(e) => setBeatTitle(e.target.value)}
          onKeyDown={handleKey}
          style={{
            position: "absolute",
            ...currentBeatPosition,
            fontSize: "1rem",
            fontWeight: "bold",
            background: "transparent",
            border: "none",
            outline: "none",
            color: "white",
             color: color,

           
          }}
        />
      </div>

      

      {/* Editor Options */}
      <div className="coverart-row2">
        <h2>Be your own Graphic Designer</h2>
        <p>Create your Cover Art with Layouts, Images, Presets, Filters, Fonts, and Overlays</p>

<div className="icon-row" style={{ display: "flex", gap: "10px", justifyContent: "space-evenly", marginTop: "20px" }}>
      <p style={{ color: "white", marginTop: "20px" }}>Choose Filter</p>
<select
  onChange={(e) => setFilter(e.target.value)}
  value={filter}
  style={{ padding: "8px", fontSize: "1rem", marginBottom: "10px" }}
>
  <option value="none">No Filter</option>
  <option value="grayscale(100%)">Grayscale</option>
  <option value="sepia(100%)">Sepia</option>
  <option value="invert(100%)">Invert</option>
  <option value="hue-rotate(90deg)">Hue Rotate</option>
  <option value="opacity(50%)">Opacity</option>
  <option value="blur(2px)">Blur</option>
  <option value="brightness(0.5)">Dark</option>
  <option value="saturate(50%)">Low Saturation</option>
  <option value="contrast(150%)">High Contrast</option>
  <option value="contrast(50%)">Low Contrast</option>
  <option value="brightness(1.2)">Brighter</option>
</select>

      <p style={{ color: "white", marginTop: "20px" }}>Choose Font Color</p>
<select
  onChange={(e) => setColor(e.target.value)}
  value={color}
  style={{ padding: "5px", fontSize: "1rem", marginBottom: "20px" }}
>
  <option value="white">White</option>
  <option value="black">Black</option>
  <option value="red">Red</option>
  <option value="yellow">Yellow</option>
  <option value="blue">Blue</option>
  <option value="green">Green</option>
</select>
</div>

        {/* Design Picker */}
        <div className="design-picker" style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          {[coverart, coverart2, coverart3].map((img, index) => (
            <button
              key={index}
              style={{ background: "none", cursor: "pointer", padding: 0, border: "none" }}
              onClick={() => setSelectedArt(img)}
            >
              <img
                src={img}
                alt={`Design ${index + 1}`}
                className="design-preview"
                style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px" }}
              />
            </button>
          ))}
        </div>
        {/* Upload Image */}
      <div style={{ marginTop: "10px" }}>
        <label style={{ fontWeight: "bold", color: "white" }}>Or Upload Your Own:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                setSelectedArt(reader.result);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
       
      </div>

        <canvas ref={canvasRef} width={400} height={400} style={{ display: "none" }} />

        <button onClick={downloadImage} style={{ marginTop: "20px" }}>
          Download Cover Art
        </button>
      </div>
    </div>
  );
}

export default CoverArtEditor;
