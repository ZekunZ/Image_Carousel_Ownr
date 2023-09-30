import React from "react";
import { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const Slider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  // handle next slide button
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  // handle previous slide button
  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  // if image is array with one empty object
  if (length === 1)
    return (
      <div data-testid="no-photo" className="slider">
        No photo displayed
      </div>
    );

  return (
    <div className="slider">
      {current !== 0 && (
        <FaArrowAltCircleLeft
          data-testid="left-arrow"
          className="left-arrow"
          onClick={prevSlide}
        />
      )}
      {current !== length - 1 && (
        <FaArrowAltCircleRight
          data-testid="right-arrow"
          className="right-arrow"
          onClick={nextSlide}
        />
      )}
      {slides.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <img src={slide.image} alt="images" className="image" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
