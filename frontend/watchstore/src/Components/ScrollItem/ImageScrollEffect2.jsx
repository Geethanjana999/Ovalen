import React, { useState, useEffect } from "react";
import "./ImageScrollEffect2.css";
import scrollImage from "../../Assets/hero3.jpg"; // Your image source

function ImageScrollEffect2() {
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Define viewport height (vh) and scroll thresholds
  const vh = window.innerHeight;
  const startScalingAt = vh * 2.5; // Start scaling when the section begins
  const endScalingAt = vh * 3.5; // End scaling after scrolling an additional viewport height
  const maxScale = 1.0; // Initial large scale
  const minScale = 0.8; // Minimum scale

  // Calculate the scale factor
  let scaleFactor = maxScale;

  if (scrollY > startScalingAt && scrollY <= endScalingAt) {
    const progress =
      (scrollY - startScalingAt) / (endScalingAt - startScalingAt);
    scaleFactor = maxScale - progress * (maxScale - minScale);
  } else if (scrollY > endScalingAt) {
    scaleFactor = minScale; // Stop shrinking further
  }

  return (
    <div className="outer-container">
      <div className="sticky-container">
        <img
          src={scrollImage}
          alt="ScrollingImage"
          style={{
            transform: `scale(${scaleFactor})`,
            transition: "transform 0.1s ease-out", // Smooth scaling
          }}
          className="scroll-image"
        />
      </div>
    </div>
  );
}

export default ImageScrollEffect2;
