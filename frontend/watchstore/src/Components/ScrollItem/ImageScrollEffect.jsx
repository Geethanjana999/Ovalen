import React, { useState, useEffect } from "react";
import "./ImageScrollEffect.css"; // Add your CSS for the effect
import scrollImage from "../../Assets/hero3.jpg";

function ImageScrollEffect() {
  const [scrollY, setScrollY] = useState(0);

  // Track the scroll position
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  // Use effect to listen to scroll event
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Calculate the scale based on scroll position
  const scaleFactor = 1 - scrollY * 0.0002; // Adjust the scaling speed

  return (
    <div className="image-container">
      <img
        src={scrollImage} // Replace with your image source
        alt="ScrollingImage"
        style={{
          transform: `scale(${scaleFactor})`,
          transition: "transform 0.1s ease-out", // Smooth scaling effect
        }}
        className="scroll-image"
      />
    </div>
  );
}

export default ImageScrollEffect;
