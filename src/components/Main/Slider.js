import { useState } from "react";

function Slider({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="slider">
      <div className="slide">
        <img src={images[activeIndex]} alt="Картинка" />
      </div>
      <div className="dots">
        {images.map((image, index) => (
          <span
            key={index}
            className={`dot ${index === activeIndex ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Slider;
